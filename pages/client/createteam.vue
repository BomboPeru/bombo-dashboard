<template>
    <div id="createteam">
      <player-bank-card :class="['player-bank-card', activeTabView === 0?'show':'hide']" @onPlayerSelected="onPlayerSelected"/>
      <div :class="['new-team-card', (activeTabView === 1 || activeTabView === 2)?'show':'hide']">
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
      }
    },
    methods: {
      createTeam () {
        console.log('create')
        let total = 0
        total += this.team.players.goal_keeper.length
        total += this.team.players.defender.length
        total += this.team.players.mid_fielder.length
        total += this.team.players.forward.length
        if (this.team.name === '') {
          this.$store.dispatch('turnOnSnackbar', 'Debes darle un nombre a tu equipo')
          return false
        }
        if (total !== 11) {
          console.log('empty')
          this.$store.dispatch('turnOnSnackbar', 'No puedes crear un equipo con menos de 11 jugadores')
        } else {
          console.log(this.team)

          let temporalTeam = this.team

          temporalTeam.players.goal_keeper.map((player) => {
            player.j_number = player.j_number.toString()
            delete player.cost
          })
          temporalTeam.players.defender.map((player) => {
            player.j_number = player.j_number.toString()
            delete player.cost
          })
          temporalTeam.players.mid_fielder.map((player) => {
            player.j_number = player.j_number.toString()
            delete player.cost
          })
          temporalTeam.players.forward.map((player) => {
            player.j_number = player.j_number.toString()
            delete player.cost
          })

          this.$axios.$post('http://api.bombo.pe/api/v1.0/user/add-team/' + 'saved', {
            user_id: this.testUserId,
            team: temporalTeam
          }).then(res => {
            this.$store.dispatch('turnOnSnackbar', 'Equipo Creado!. Visita Mis Equipos para jugar')
            console.log(res)
          }).catch(e => {
            this.$store.dispatch('turnOnSnackbar', 'Error al crear Equipo, pruebalo mas tarde.')
            console.log(e)
          })
        }
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
                if ((data.player.name === this.team.players[data.type][i].name)) {
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
        // testUserId: '58e87f29-3b46-45a1-8069-5c7189bfa805',
        team: {
          name: '',
          players: {
            goal_keeper: [],
            defender: [],
            mid_fielder: [],
            forward: []
          }
        },
        constraints: {
          total: 11,
          goal_keeper: [1, 1],
          defender: [3, 5],
          mid_fielder: [3, 5],
          forward: [1, 3],
          maxPlayersSameTeam: 3,
          maxCost: 100
        }
      }
    },
    mounted () {
      // if (this.testUserId === null) {
      //   this.$router.push('/')
      // }
    }
  }
</script>

<style scoped lang="stylus">
  #createteam
    padding 23px 10px 0 10px
    min-height calc(100vh - 128px)
    display flex
    flex-flow row
    align-items: flex-start;
    flex-wrap nowrap
    overflow-x scroll
  .player-bank-card
  .new-team-card
    margin 5px 10px
    flex 0 0 auto
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
  @media screen and (max-width: 1023px)
    #createteam
      min-height calc(100vh - 56px)
    .hide
      display none
    .show
      display block
    .player-bank-card
    .new-team-card
      margin 0
    /*.new-team-card*/
    /*margin 0 !important*/
</style>
