<template>
  <div id="teams">
    <sidebar mode="teams"/>

    <div v-if="teams[activeTypeTeam].length === 0" class="container margin-sidebar">
      <div class="empty-teams-message">
        <p>Aun no tienes ningun equipo
          {{ indexTypeTeams[activeTypeTeam] === 'en_juego' ? ' en juego' : indexTypeTeams[activeTypeTeam] }}
          <br> <span v-if="indexTypeTeams[activeTypeTeam] !== 'pasado' ">¡Crea uno YA!</span>
        </p>

        <icon-button v-if="indexTypeTeams[activeTypeTeam] === 'guardado' || indexTypeTeams[activeTypeTeam] === 'en_juego'"
                     text="CREAR EQUIPO!"
                     icon-direction="left"
                     color="#25BF89"
                     icon="plus"
                     class="create-team-btn"
                     @click="goToCreateTeam"
        />
      </div>
    </div>

    <div v-else class="container margin-sidebar">

      <!-- EN JUEGO -->
      <!-- GUARDADOS -->
      <!--&lt;!&ndash; PASADOS &ndash;&gt;-->
      <!--<template v-if="activeTypeTeam === 1">-->
        <team-card
          class="teamcard"
          :style="{ 'flex-grow': teams[activeTypeTeam].length > 3 ? '1':'0' }"
          v-for="(team, i) in teams[activeTypeTeam]"
          :key="i+'card'"
          :id="team.id"
          :team="team"
          :title="team.name"
          :points="team.points"
          :ranking="team.ranking"
          :type-card="indexTypeTeams[activeTypeTeam]"
          :league-img="team.leagueImg"
          :players="team.players"
        />
    </div>
  </div>
</template>

<script>
  import IconButton from '../../components/IconButton'
  import TeamCard from '../../components/TeamCard'
  import Sidebar from '~/components/Sidebar.vue'

  export default {
    layout: 'dashboard',
    name: 'myteams',
    components: {
      IconButton, TeamCard, Sidebar
    },
    computed: {
      activeTypeTeam () {
        return this.$store.getters['team/activeTypeTeam']
      },
      teams () {
        if (this.$store.getters['user'] === null || this.$store.getters['user'] === undefined) {
          return {
            0: [],
            1: [],
            2: []
          }
        } else {
          return {
            0: this.$store.getters['user'].saved_teams === null ? [] : this.$store.getters['user'].saved_teams,
            1: this.$store.getters['user'].playing_teams === null ? [] : this.$store.getters['user'].playing_teams,
            2: this.$store.getters['user'].old_teams === null ? [] : this.$store.getters['user'].old_teams
          }
        }
      }
    },
    data () {
      return {
        indexTypeTeams: this.$store.state.team.indexTypeTeams,
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
        this.$store.state.team.selectLeagueDialog = true
      }
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

  .margin-sidebar
    margin-left 232px
  .teamcard
    flex-shrink 0
    /*display: inline-block*/
    // height calc(100vh - 300px)
    overflow-y auto
    margin-right 8px
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
    .margin-sidebar
      margin-left 0

</style>
