<template>
    <div id="createteam">
      <player-bank-card :class="['player-bank-card', activeTabView === 0?'show':'hide']" @onPlayerSelected="onPlayerSelected"/>
      <div :class="['new-team-section', (activeTabView === 1)?'show':'hide']">
        <new-team-card :team="team"/>
        <div class="btn-container">
          <div class="button-create rounded elevation" @click="createTeam">Crear</div>
          <!--<div class="button-create rounded elevation">Crear</div>-->
        </div>
      </div>
    </div>
</template>

<script>
  import PlayerBankCard from '../../components/PlayerBankCard'
  import NewTeamCard from '../../components/NewTeamCard'

  export default {
    layout: 'dashboard',
    name: 'createteam',
    components: {
      PlayerBankCard, NewTeamCard
    },
    computed: {
      activeTabView () {
        return this.$store.getters['createteam/activeTabView']
      },
      testUserId () {
        return this.$store.getters.testUserId
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
      createTeam () {
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
        console.log(this.team)

        let temporalTeam = []
        let totalCaptain = 0

        playerPositions.map(positionName => {
          this.team.players[positionName].map(player => {
            if (player.is_captain === true) {
              totalCaptain += 1
            }

            temporalTeam.push(player)
          })
        })


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
        this.$axios.$post('http://api.bombo.pe/api/v2.0/users/'+ userId + '/create-team', {
          team: {
            league_id: leagueId,
            name: this.team.date,
            players: temporalTeam
          }
        }).then(res => {
          this.$store.dispatch('turnOnSnackbar', 'Equipo Creado!. Visita Mis Equipos para jugar')
          console.log(res)
        }).catch(e => {
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
      if (this.$store.getters['createteam/leagueid'] === null) {
        this.$router.push('/client/teams')
        return
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
    min-height calc(100vh - 128px)
    display flex
    flex-flow row
    justify-content center
    align-items: flex-start;
    flex-wrap nowrap
    overflow-x scroll
  .player-bank-card
    flex-grow 1
  .new-team-section
    flex-grow 1
  .player-bank-card
  .new-team-section
    margin 5px 10px
    /*flex 0 0 auto*/
  .hide
    display block
  .show
    display block
  .btn-container
    margin-top 18px
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
