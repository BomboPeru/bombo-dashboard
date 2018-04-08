<template>
    <div>
      <sidebar mode="createteam" @onCreateTeamClick="createTeam" @onEditTeamClick="editTeam" :editMode="editMode"/>

      <div id="createteam">
        <player-bank-card :class="['player-bank-card', activeTabView === 0?'show':'hide']" @onPlayerSelected="onPlayerSelected"/>

        <div :class="['new-team-section', (activeTabView === 1)?'show':'hide']">
          <div class="mobile-btn-container">

            <div v-if="editMode === false" class="button-create rounded elevation" @click="createTeam">CREAR EQUIPO</div>
            <div v-else class="button-create rounded elevation" @click="editTeam">ACTUALIZAR EQUIPO</div>

          </div>
          <new-team-card :team="team"/>
        </div>
      </div>
    </div>
</template>

<script>
  import PlayerBankCard from '../../components/PlayerBankCard'
  import NewTeamCard from '../../components/NewTeamCard'
  import Sidebar from '~/components/Sidebar.vue'

  export default {
    layout: 'dashboard',
    name: 'createteam',
    components: {
      PlayerBankCard, NewTeamCard, Sidebar
    },
    middleware: 'authenticated',
    async fetch ({ store }) {
      await store.dispatch('fetchUser')
    },
    computed: {
      captain_id () {
        return this.$store.state.createteam.captainId
      },
      activeTabView () {
        return this.$store.getters['createteam/activeTabView']
      },
      totalCost () {
        const types = ['goal_keeper', 'mid_fielder', 'defender', 'forward']
        let cost = 0
        for (let i = 0; i < types.length; i++) {
          this.team.players[types[i]].map(player => cost += player.cost)
        }
        return cost
      }
    },
    methods: {
      isValidTeam () {
        // TOTAL PLAYERS = 11 CONSTRAINT
        {
          const total = this.team.players.goal_keeper.length +
            this.team.players.defender.length +
            this.team.players.mid_fielder.length +
            this.team.players.forward.length

          if (total !== 11) {
            this.$store.dispatch('turnOnSnackbar', 'No puedes crear un equipo con menos de 11 jugadores')
            return false
          }
        }

        // TEAM NAME CONSTRAINT
        if (this.team.name === '') {
          this.$store.dispatch('turnOnSnackbar', 'Debes darle un nombre a tu equipo')
          return false
        }

        // TOTAL PLAYERS BY POSITION CONSTRAINT
        {
          const totalGoalKeeper = this.team.players.goal_keeper.length
          const totalDefender = this.team.players.defender.length
          const totalMidFielder = this.team.players.mid_fielder.length
          const totalForward = this.team.players.forward.length

          if (totalGoalKeeper < this.constraints.goal_keeper[0] ||
            totalGoalKeeper > this.constraints.goal_keeper[1]) {
            this.$store.dispatch('turnOnSnackbar', 'Debes escoger al menos un arquero')
            return false
          }
          if (totalDefender < this.constraints.defender[0] ||
            totalDefender > this.constraints.defender[1]) {
            this.$store.dispatch('turnOnSnackbar', `Debes escoger entre ${this.constraints.defender[0]} y ${this.constraints.defender[1]} defensa(s)`)
            return false
          }
          if (totalMidFielder < this.constraints.mid_fielder[0] ||
            totalMidFielder > this.constraints.mid_fielder[1]) {
            this.$store.dispatch('turnOnSnackbar', `Debes escoger entre ${this.constraints.mid_fielder[0]} y ${this.constraints.mid_fielder[1]} centrocampista(s)`)
            return false
          }
          if (totalForward < this.constraints.forward[0] ||
            totalForward > this.constraints.forward[1]) {
            this.$store.dispatch('turnOnSnackbar', `Debes escoger entre ${this.constraints.forward[0]} y ${this.constraints.forward[1]} delantero(s)`)
            return false
          }
        }

        let teamToCreate = []

        {
          let isCaptain = false
          const self = this
          const playerPositions = [
            'goal_keeper', 'defender', 'mid_fielder', 'forward'
          ]

          playerPositions.map(positionName => {

            this.team.players[positionName].map(player => {

              if (player.internal_id === self.captain_id) {
                player.is_captain = true
                isCaptain = true
              } else {
                player.is_captain = false
              }
              teamToCreate.push(player)
            })
          })

          if (isCaptain === false) {
            this.$store.dispatch('turnOnSnackbar', 'Debes escoger a un capitan')
            return false
          }
        }

        return teamToCreate
      },
      editTeam () {

        const teamToEdit = this.isValidTeam()

        if (teamToEdit === false) {
          return null
        }

        const userId = this.$store.getters['userId']
        const leagueId = this.$store.getters['createteam/leagueid']

        this.$store.state.isShortLoading = true
        const oldTeamName = this.oldTeamName

        this.$axios.$post('api/v2.0/users/'+ userId + '/edit-team', {
          old_team_name: oldTeamName,
          team: {
            league_id: leagueId,
            name: this.team.name,
            players: teamToEdit
          }
        }).then(res => {

          // console.log(res)
          this.$store.dispatch('updateUser', res.data)
          this.$store.state.isShortLoading = false
          this.$store.dispatch('turnOnSnackbar', 'Equipo Editado!. Visita Mis Equipos para jugar')

          setTimeout(() => {
            this.$store.state.createteam.captainId = null
            this.$router.push('/client/teams')
          }, 800)

        }).catch(e => {
          this.$store.state.isShortLoading = false
          if (e.response !== undefined) {
            this.$store.dispatch('turnOnSnackbar', `Error: ${e.response.data.error}`)
          } else {
            this.$store.dispatch('turnOnSnackbar', `Error al crear Equipo, intente más tarde.`)
          }
          console.log(e)
        })

      },
      createTeam () {

        const teamToCreate = this.isValidTeam()

        if (teamToCreate === false) {
          return null
        }

        const userId = this.$store.getters['userId']
        const leagueId = this.$store.getters['createteam/leagueid']
        console.log(userId, leagueId)
        this.$store.state.isShortLoading = true

        this.$axios.$post('api/v2.0/users/'+ userId + '/create-team', {
          team: {
            league_id: leagueId,
            name: this.team.name,
            players: teamToCreate
          }
        }).then(res => {

          this.$store.dispatch('updateUser', res.data)
          this.$store.state.isShortLoading = false
          this.$store.dispatch('turnOnSnackbar', 'Equipo Creado!. Visita Mis Equipos para jugar')
          console.log(res)
          setTimeout(() => {
            this.$store.state.createteam.captainId = null
            this.$router.push('/client/teams')
          }, 800)

        }).catch(e => {
          this.$store.state.isShortLoading = false

          if (e.response !== undefined) {
            this.$store.dispatch('turnOnSnackbar', `Error: ${e.response.data.error}`)
          } else {
            this.$store.dispatch('turnOnSnackbar', `Error al crear Equipo, intente más tarde.`)
          }
          console.log(e)
        })
      },
      onPlayerSelected (data) {

        const playerTypes = ['goal_keeper', 'defender', 'mid_fielder', 'forward']
        let teamToEvaluate = data.player.team
        let sameTeamCount = 0

        if ((this.totalCost + data.player.cost) >= this.saldo) {
          this.$store.dispatch('turnOnSnackbar', 'Sin saldo suficiente para adquirir a este jugador')
          return false
        }

        for (let i = 0; i < playerTypes.length; i++) {
          let type = playerTypes[i]

          for (let j = 0; j < this.team.players[type].length; j++) {
            let player = this.team.players[type][j]
            if (player.team === teamToEvaluate) {
              sameTeamCount++
            }
          }
          if (sameTeamCount === 4) {
            break
          }
        }

        if (sameTeamCount >= this.constraints.maxPlayersSameTeam) {
          this.$store.dispatch('turnOnSnackbar', 'No puedes agregar mas de 3 jugadores del mismo equipo')
          return false
        }

        const currentTotal = this.team.players.goal_keeper.length +
          this.team.players.defender.length +
          this.team.players.mid_fielder.length +
          this.team.players.forward.length

        if (currentTotal >= 11) {
          this.$store.dispatch('turnOnSnackbar', 'No puedes agregar mas de 11 jugadores a tu equipo')
          return false
        }

        if ( (this.constraints[data.type][1] > this.team.players[data.type].length)) {

          const lengthPlayers = this.team.players[data.type].length
          if (lengthPlayers > 0) {

            let isAlreadyAdded = false
            for (let i = 0; i < lengthPlayers; i++) {
              if ((data.player.internal_id === this.team.players[data.type][i].internal_id)) {
                isAlreadyAdded = true
                break
              }
            }

            if (isAlreadyAdded === false) {


              this.team.players[data.type].push(data.player)
              this.$store.state.createteam.playersList.splice(data.i, 1)
            }
          } else {

            this.team.players[data.type].push(data.player)
            this.$store.state.createteam.playersList.splice(data.i, 1)
          }
        } else {
          const playerType = {
            'goal_keeper': 'portero',
            'defender': 'defensa',
            'mid_fielder': 'mediocampista',
            'forward': 'delantero'
          }
          this.$store.dispatch('turnOnSnackbar', `No puedes agregar mas de ${this.constraints[data.type][1]} ${playerType[data.type]}(s)`)
        }

      }
    },
    data () {
      return {
        oldTeamName: '',
        editMode: false,
        team: {
          name: '',
          players: {
            goal_keeper: [],
            defender: [],
            mid_fielder: [],
            forward: []
          }
        },
        saldo: 100,
        constraints: {
          total: 11,
          totalCaptains: 1,
          goal_keeper: [1, 1],
          defender: [3, 5],
          mid_fielder: [3, 5],
          forward: [1, 3],
          maxPlayersSameTeam: 3,
          maxCost: 100
        }
      }
    },
    beforeCreate () {
      if (process.server) return

      if (this.$store.getters['createteam/leagueid'] === null) {
        console.log(this.$store.getters['createteam/leagueid'], 'league id')
        setTimeout(() => {
          this.$router.push('/client/teams')
        }, 200)
      }
    },
    beforeDestroy () {
      this.$store.commit('createteam/unsetTeamName')
    },
    mounted () {
      const teamName = this.$store.getters['createteam/editTeamName']
      if (teamName !== null) {
        this.editMode = true
        const savedTeams = this.$store.getters['user'].saved_teams
        this.oldTeamName = teamName

        let savedTeamIndex = null
        for ( let i = 0; i < savedTeams.length; i++) {
          if (savedTeams[i].name === teamName) {
            savedTeamIndex = i
            this.team.name = savedTeams[i].name

            // this.team.players[] = savedTeams[i].name
            // this.team.name = savedTeams[i].name
            break
          }
        }

        const playerTypes = ['goal_keeper', 'defender', 'mid_fielder', 'forward']

        for (let j = 0; j < playerTypes.length; j++) {
          savedTeams[savedTeamIndex].players.map(player => {
            if (player.position === playerTypes[j]) {
              this.team.players[playerTypes[j]].push(player)
            }
          })
        }


      }
    }
  }
</script>

<style scoped lang="stylus">
  #createteam
    padding 23px 10px 0 10px
    height calc(100vh - 116px)
    // height calc(100vh - 99px)
    display flex
    flex-flow row
    justify-content center
    align-items: flex-start;
    flex-wrap nowrap
    overflow-x scroll
  .player-bank-card
    width: 100%;
    flex-grow 1
  .new-team-section
    width: 100%;
    flex-grow 1
  .player-bank-card
  .new-team-section
    margin 5px 10px
    /*flex 0 0 auto*/
  .hide
    display block
  .show
    display block
  .mobile-btn-container
    display none
    margin-bottom 18px
    text-align center

  .button-create
    /*width 100px*/
    width: 100%;
    cursor pointer
    font-family: Titillium Web
    text-align center
    font-weight bold
    font-size 18px
    line-height 50px
    display inline-block
    background #25bf89
    height 50px
    color white
  @media screen and (min-width: 1700px)
    #createteam
      padding-left 200px
      padding-right 200px
  @media screen and (max-width: 1023px)
    #createteam
      min-height calc(100vh - 112px)
    .mobile-btn-container
      display block
    .hide
      display none
    .show
      display block
    .player-bank-card
    .new-team-card
      margin 0
    /*.new-team-card*/
    /*margin 0 !important*/
  @media screen and (max-width: 500px)
    #createteam
      display block
      padding 10px 0 0 0
    .button-create
      height 30px
      line-height 32px
      font-size 16px
      width: 96%;
      margin-left 2%
      margin-right 2%
    .mobile-btn-container
      margin-bottom 8px
    .new-team-section
      margin 0 0





</style>
