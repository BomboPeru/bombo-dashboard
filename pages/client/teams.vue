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
          :style="{ 'flex-grow': mteams[0].length > 3 ? '1':'0' }"
          v-for="(team, i) in mteams[0]"
          :key="i+'card'"
          :id="team.id"
          :team="team"
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
          class="teamcard"
          :style="{ 'flex-grow': mteams[1].length > 3 ? '1':'0' }"
          v-for="(team, i) in mteams[1]"
          :key="i+'card'"
          :id="team.id"
          :team="team"
          :title="team.name"
          :cost="team.total_points.toString()"
          :status="'DISPONIBLE'"
          type-card="guardado"
          :league-img="team.leagueImg"
          :players="team.players"
        />
      </template>
      <!-- PASADOS -->
      <template v-else-if="activeTypeTeam === 2">
        <team-card
          class="teamcard"
          :style="{ 'flex-grow': mteams[2].length > 3 ? '1':'0' }"
          v-for="(team, i) in mteams[2]"
          :key="i+'card'"
          :team="team"
          :id="team.id"
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
        // testUserId: '58e87f29-3b46-45a1-8069-5c7189bfa805',
        typeTeams: this.$store.state.team.typeTeams,
        mteams: {
          0: [],
          1: [],
          2: []
        }
      }
    },
    methods: {
      goToCreateTeam () {
        // this
        this.$store.commit('team/turnOnSelectLeageDialog')
      }
    },
    mounted () {
      // console.log('fetch teams')
      // const userId = this.$store.getters['auth/userId']
      // this.$axios.get('http://api.bombo.pe/api/v2.0/users/' + userId)
      setTimeout(() => {
        this.$store.dispatch('team/fetchUserData')
          .then(res=> {
            this.mteams = res
          })
      }, 500)
    }
  }
</script>

<style scoped lang="stylus">

  .container
    overflow-x auto
    overflow-y hidden
    min-height: calc(100vh - 190px)
    // min-height: calc(100vh - 280px)
    display: flex
    flex-wrap nowrap
    justify-content flex-start
    /*margin-top 62px*/
    margin-top: 26px
    padding-left 18px
    /*align-items: flex-start;*/
    align-items: stretch;
    /*padding-bottom 50px*/
    padding-bottom 12px

  .teamcard
    flex-shrink 0
    /*display: inline-block*/
    // height calc(100vh - 300px)
    overflow-y auto
  .create-team-btn
    width 280px
  .empty-teams-message
    text-align: center
    width: 100%;
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
