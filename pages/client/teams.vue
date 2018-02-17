<template>
  <div id="teams">
    <div v-if="hasNotTeams" class="container">
      <div class="empty-teams-message">
        <p>Aun no tienes ningun equipo <br>Que esperas para crear uno?!</p>
        <icon-button text="CREAR EQUIPO!"
                     icon-direction="left"
                     color="#25BF89"
                     icon="plus"
                     class="create-team-btn"
                     @click="goToCreateTeam"
        />
      </div>
    </div>
    <div v-else class="container">
      <!-- EN JUEGO -->
      <template v-if="activeTypeTeam === 0">
        <team-card
          v-for="(item, i) in mteams[0]"
          :key="i+'card'"
          :title="item.name"
          :points="item.points"
          type-card="pasados"
        />
      </template>
      <!-- GUARDADOS -->
      <template v-else-if="activeTypeTeam === 1">
        <team-card
          title="nombre equipo"
          type-card="pasados"
        />
      </template>
      <!-- PASADOS -->
      <template v-else-if="activeTypeTeam === 2">
        <team-card
          title="nombre equipo"
          type-card="pasados"
        />
      </template>

    </div>
  </div>
</template>

<script>
  import IconButton from '../../components/IconButton'
  import TeamCard from '../../components/TeamCard'

  export default {
    layout: 'dashboard',
    name: 'myteams',
    components: {
      IconButton, TeamCard
    },
    computed: {
      hasNotTeams () {
        return (this.mteams['0'].length === 0) && (this.mteams['1'].length === 0) && (this.mteams['2'].length === 0)
      }
    },
    created () {
      console.log(this.$store.state.activeTypeTeam)
    },
    data () {
      return {
        typeTeams: this.$store.state.typeTeams,
        activeTypeTeam: this.$store.state.activeTypeTeam,
        mteams: {
          0: [
            { name: 'NOmbre de equipo',
              balance: +23.0,
              leagueImg: '',
              createdAt: '23/02/2018',
              ranking: 2,
              points: 233,
              players: [
                { name: 'NOmbre Plyaer' }
              ]
            },
            { name: 'NOmbre de equipo',
              balance: +23.0,
              leagueImg: '',
              createdAt: '23/02/2018',
              ranking: 2,
              points: 233,
              players: [
                { name: 'NOmbre Plyaer' }
              ]
            },
            { name: 'NOmbre de equipo',
              balance: +23.0,
              leagueImg: '',
              createdAt: '23/02/2018',
              ranking: 2,
              points: 233,
              players: [
                { name: 'NOmbre Plyaer' }
              ]
            }
          ],
          1: [
            { name: 'NOmbre de equipo',
              balance: +23.0,
              leagueImg: '',
              createdAt: '23/02/2018',
              ranking: 2,
              points: 233,
              players: [
                { name: 'NOmbre Plyaer' }
              ]
            },
            { name: 'NOmbre de equipo',
              balance: +23.0,
              leagueImg: '',
              createdAt: '23/02/2018',
              ranking: 2,
              points: 233,
              players: [
                { name: 'NOmbre Plyaer' }
              ]
            }
          ],
          2: [
            { name: 'NOmbre de equipo',
              balance: +23.0,
              leagueImg: '',
              createdAt: '23/02/2018',
              ranking: 2,
              points: 233,
              players: [
                { name: 'NOmbre Plyaer' }
              ]
            }
          ]
        }
      }
    },
    methods: {
      goToCreateTeam () {
        // this
        this.$store.commit('team/turnOnSelectLeageDialog')
      }
    }
  }
</script>

<style scoped lang="stylus">

  .container
    min-height: calc(100vh - 128px)
    display: flex;
    justify-content flex-start
    /*align-items: center;*/
    margin-top 62px
    margin-left 18px
  .create-team-btn
    width 200px
  .empty-teams-message
    text-align: center
  .empty-teams-message p
    color #445F69
    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 24px;
    text-align: center;
    padding-bottom 15px
</style>
