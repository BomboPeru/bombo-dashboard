<template>
    <div>
      <sidebar mode="createteam" @onCreateTeamClick="createTeam"/>
      <div id="createteam">
        <player-bank-card :class="['player-bank-card', activeTabView === 0?'show':'hide']" @onPlayerSelected="onPlayerSelected"/>
        <div :class="['new-team-section', (activeTabView === 1)?'show':'hide']">
          <div class="mobile-btn-container">
            <div class="button-create rounded elevation" @click="createTeam">CREAR EQUIPO</div>
          </div>
          <new-team-card :team="team" @isCaptain="isCaptain"/>
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
    computed: {
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
      isCaptain (playerId) {
        this.captain_id = playerId
      },
      createTeam () {
        const self = this
        const playerPositions = [
          'goal_keeper', 'defender', 'mid_fielder', 'forward'
        ]
        let total = 0
        total += this.team.players.goal_keeper.length
        total += this.team.players.defender.length
        total += this.team.players.mid_fielder.length
        total += this.team.players.forward.length

        if (this.team.date === '') {
          this.$store.dispatch('turnOnSnackbar', 'Debes darle un nombre a tu equipo')
          return false
        }
        if (total !== 11) {
          console.log('empty')
          this.$store.dispatch('turnOnSnackbar', 'No puedes crear un equipo con menos de 11 jugadores')
          return
        }


        let teamToCreate = []
        let totalCaptain = 0


        let totalGoalKeeper = this.team.players.goal_keeper.length
        let totalDefender = this.team.players.defender.length
        let totalMidFielder = this.team.players.mid_fielder.length
        let totalForward = this.team.players.forward.length

        playerPositions.map(positionName => {
          this.team.players[positionName].map(player => {
            if (player.internal_id === self.captain_id) {
              player.is_captain = true
              totalCaptain += 1
            } else {
              player.is_captain = false
            }
            teamToCreate.push(player)
          })
        })
        if (totalGoalKeeper < this.constraints.goal_keeper[0] ||
          totalGoalKeeper > this.constraints.goal_keeper[1]) {
          this.$store.dispatch('turnOnSnackbar', 'Debes escoger al menos un arquero')
          return
        }
        if (totalDefender < this.constraints.defender[0] ||
          totalDefender> this.constraints.defender[1]) {
          this.$store.dispatch('turnOnSnackbar', 'Debes escoger al menos a un defensa')
          return
        }
        if (totalMidFielder < this.constraints.mid_fielder[0] ||
          totalMidFielder> this.constraints.mid_fielder[1]) {
          this.$store.dispatch('turnOnSnackbar', 'Debes escoger al menos a un centrocampista')
          return
        }
        if (totalForward < this.constraints.forward[0] ||
          totalForward > this.constraints.forward[1]) {
          this.$store.dispatch('turnOnSnackbar', 'Debes escoger al menos a un delantero')
          return
        }



        if (totalCaptain < this.constraints.totalCaptains) {
          this.$store.dispatch('turnOnSnackbar', 'Debes escoger a un capitan')
          return
        }
        if (totalCaptain > this.constraints.totalCaptains) {
          this.$store.dispatch('turnOnSnackbar', 'Solo puedes escoger a un capitan')
          return
        }

        const userId = this.$store.getters['auth/getUserId']
        const leagueId = this.$store.getters['createteam/leagueid']

        console.log(userId, leagueId)

        this.$store.state.isShortLoading = true
        this.$axios.$post('http://api.bombo.pe/api/v2.0/users/'+ userId + '/create-team', {
          team: {
            league_id: leagueId,
            name: this.team.date,
            players: teamToCreate
          }
        }).then(res => {
          this.$store.state.isShortLoading = false
          this.$store.dispatch('turnOnSnackbar', 'Equipo Creado!. Visita Mis Equipos para jugar')
          console.log(res)
          setTimeout(() => {
            this.$router.push('/client/teams')
          }, 1000)

        }).catch(e => {
          this.$store.state.isShortLoading = false
          this.$store.dispatch('turnOnSnackbar', 'Error al crear Equipo, pruebalo mas tarde.')
          console.log(e)
        })
      },
      onPlayerSelected (data) {
        let currentTotal = 0
        currentTotal = this.team.players.goal_keeper.length +
                      this.team.players.defender.length +
                      this.team.players.mid_fielder.length +
                      this.team.players.forward.length

        let playerTypes = ['goal_keeper', 'defender', 'mid_fielder', 'forward']
        let teamToEvaluate = data.player.team
        let sameTeamCount = 0

        if ((this.totalCost + data.player.cost) > this.saldo) {
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

        if (currentTotal >= 11) {
          this.$store.dispatch('turnOnSnackbar', 'No puedes agregar mas de 11 jugadores a tu equipo')
          return false
        }


        if (sameTeamCount >= this.constraints.maxPlayersSameTeam) {
          this.$store.dispatch('turnOnSnackbar', 'No puedes agregar mas de 3 jugadores del mismo equipo')
          return false
        }

        if (sameTeamCount < this.constraints.maxPlayersSameTeam) {

          if ( (this.constraints[data.type][1] > this.team.players[data.type].length) &&
            ( this.constraints.total > currentTotal )
          ) {

            let lengthPlayers = this.team.players[data.type].length
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
              }
            } else {

              this.team.players[data.type].push(data.player)
            }
          } else {
            let playerType = {
              'goal_keeper': 'portero',
              'defender': 'defensa',
              'mid_fielder': 'mediocampista',
              'forward': 'delantero'
            }
            this.$store.dispatch('turnOnSnackbar', `No puedes agregar mas de ${this.constraints[data.type][1]} ${playerType[data.type]}(s)`)
          }
        }


      }
    },
    data () {
      return {
        team: {
          date: '',
          players: {
            goal_keeper: [],
            defender: [],
            mid_fielder: [],
            forward: []
          }
        },
        captain_id: '',
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
        this.$router.push('/client/teams')
      }
    },
    beforeDestroy () {
      this.$store.commit('createteam/unsetleagueid')
    },
    mounted () {
    }
  }
</script>

<style scoped lang="stylus">
  #createteam
    padding 23px 10px 0 10px
    height calc(100vh - 128px)
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
      min-height calc(100vh - 116px)
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
  @media screen and (max-width: 400px)
    #createteam
      display block


</style>
