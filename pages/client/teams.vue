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
          class="teamcard"
          v-for="(team, i) in mteams[0]"
          :key="i+'card'"
          :title="team.name"
          :points="team.points"
          :ranking="team.ranking"
          type-card="en_juego"
          :league-img="team.leagueImg"
          :players="team.players"
        />
      </template>
      <!-- GUARDADOS -->
      <template v-else-if="activeTypeTeam === 1">
        <team-card
          v-for="(team, i) in mteams[1]"
          :key="i+'card'"
          :title="team.name"
          :cost="team.points.toString()"
          :status="'DISPONIBLE'"
          type-card="guardado"
          :league-img="team.leagueImg"
          :players="team.players"
        />
      </template>
      <!-- PASADOS -->
      <template v-else-if="activeTypeTeam === 2">
        <team-card
          v-for="(team, i) in mteams[1]"
          :key="i+'card'"
          :title="team.name"
          :points="team.points"
          :ranking="team.ranking"
          type-card="pasados"
          :league-img="team.leagueImg"
          :players="team.players"
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
      },
      activeTypeTeam () {
        return this.$store.getters['team/activeTypeTeam']
      }
    },
    data () {
      return {
        typeTeams: this.$store.state.team.typeTeams,
        mteams: {
          0: [
            { name: 'NOmbre de equipo sadadasdsa sadasdasdasd',
              balance: +23.0,
              leagueImg: '',
              createdAt: '23/02/2018',
              ranking: 2,
              points: 233,
              players: {
                porteros: [ { name: 'NOmbre Plyaer', j_number: '23', points: 23 } ],
                defensas: [
                  { name: 'NOmbre Plyae sdsds dsd s dsdsds dsdsds sdsdsd dsds dsds r', j_number: '23' },
                  { name: 'NOmbre Plyaer', j_number: '23' },
                  { name: 'NOmbre Plyaer', j_number: '23' },
                  { name: 'NOmbre Plyaer', j_number: '23' },
                  { name: 'NOmbre Plyaer', j_number: '23' },
                  { name: 'NOmbre Plyaer', j_number: '23' },
                  { name: 'NOmbre Plyaer', j_number: '23' },
                  { name: 'NOmbre Plyaer', j_number: '23' },
                  { name: 'NOmbre Plyaer', j_number: '23' }
                ],
                centrocampistas: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
                delanteros: [ { name: 'NOmbre Plyaer', j_number: '23' } ]
              }
            },
            { name: 'NOmbre de equipo',
              balance: +23.0,
              leagueImg: '',
              createdAt: '23/02/2018',
              ranking: 2,
              points: 233,
              players: {
                porteros: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
                defensas: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
                centrocampistas: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
                delanteros: [ { name: 'NOmbre Plyaer', j_number: '23' } ]
              }
            },
            { name: 'NOmbre de equipo',
              balance: +23.0,
              leagueImg: '',
              createdAt: '23/02/2018',
              ranking: 2,
              points: 233,
              players: {
                porteros: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
                defensas: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
                centrocampistas: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
                delanteros: [ { name: 'NOmbre Plyaer', j_number: '23' } ]
              }
            },
            { name: 'NOmbre de equipo',
              balance: +23.0,
              leagueImg: '',
              createdAt: '23/02/2018',
              ranking: 2,
              points: 233,
              players: {
                porteros: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
                defensas: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
                centrocampistas: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
                delanteros: [ { name: 'NOmbre Plyaer', j_number: '23' } ]
              }
            }
          ],
          1: [
            { name: 'NOmbre de NOmbre de equipo sadadasdsa sadasdasdasd',
              balance: +23.0,
              leagueImg: '',
              createdAt: '23/02/2018',
              ranking: 2,
              points: 233,
              players: {
                porteros: [
                  {
                    name: 'NOmbre Plyaer',
                    j_number: '23',
                    points: 23
                  }
                ],
                defensas: [
                  {
                    name: 'NOmbre Plyaer',
                    j_number: '23'
                  }
                ],
                centrocampistas: [
                  {
                    name: 'NOmbre Plyaer',
                    j_number: '23'
                  }
                ],
                delanteros: [
                  {
                    name: 'NOmbre Plyaer',
                    j_number: '23'
                  }
                ],
              }
            },
            { name: 'NOmbre de equipo',
              balance: +23.0,
              leagueImg: '',
              createdAt: '23/02/2018',
              ranking: 2,
              points: 233,
              players: {
                porteros:  [
                  {
                    name: 'NOmbre Plyaer',
                    j_number: '23'
                  }
                ],
                defensas: [
                  {
                    name: 'NOmbre Plyaer',
                    j_number: '23'
                  }
                ],
                centrocampistas: [
                  {
                    name: 'NOmbre Plyaer',
                    j_number: '23'
                  }
                ],
                delanteros: [
                  {
                    name: 'NOmbre Plyaer',
                    j_number: '23'
                  }
                ]
              }
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
    overflow-x auto
    overflow-y hidden
    min-height: calc(100vh - 190px)
    display: flex
    flex-wrap nowrap
    justify-content flex-start
    margin-top 62px
    padding-left 18px
    align-items: flex-start;

  .teamcard
    flex-shrink 0
    /*display: inline-block*/
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

  @media screen and (max-width: 1023px)
    .container
      overflow-x auto
      overflow-y hidden
      height: calc(100vh - 174px)
      display: flex;
      //justify-content flex-start
      margin-top 62px
      margin-left 0
      //min-height: calc(100vh - 128px)

</style>
