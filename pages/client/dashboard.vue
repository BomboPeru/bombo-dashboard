<template>
  <div id="dashboard">
    <sidebar mode="dashboard"/>
    <div class="content">
      <div :class="['section', activeTab === 0?'show':'hide']">
        <ranking-card @onSelectLeague="onSelectLeague"/>
      </div>
      <div :class="['section', 'matches-container', activeTab === 1?'show':'hide']">
        <match-card flexible
                    class="match-card"
                    v-for="(item, i) in matches"
                    :key="i+'-match-card'"
                    :match="item"
                    :date="date"
                    :time="time"/>
      </div>
      <div :class="['section', 'teams-container', activeTab === 2?'show-flex':'hide']">
        <ul>
          <li v-for="(team, i) in teams"
              :key="i+'-team'">
            <div style="text-align: center;">
              <team-card class="team-card"
                         :collapsable="true"
                         :team="team"
                         :players="team.players"
              />
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  import RankingCard from '../../components/RankingBoard'
  // import HistoricMatchCard from '../../components/HistoricMatchCard'
  import TeamCard from '../../components/TeamCard'
  import Sidebar from '~/components/Sidebar.vue'
  import MatchCard from '../../components/MatchCard'

  export default {
    layout: 'dashboard',
    name: 'dashboard',
    components: {
      RankingCard, TeamCard, Sidebar, MatchCard
    },
    middleware: 'authenticated',
    async fetch ({ store }) {
      await store.dispatch('fetchUser')
    },
    computed: {
      activeTab () {
        return this.$store.getters['dashboard/activeTabView']
      },
      testUserId () {
        console.log(this.$store.getters.testUserId)
        return this.$store.getters.testUserId
      }
    },
    data () {
      return {
        league_id: '',
        time: 0,
        date: '',
        matches: [],
        teams: []
      }
    },
    methods: {
      onSelectLeague (matchesFromTime) {
        this.league_id = matchesFromTime.league_id
        this.date = matchesFromTime.time.start
        this.time = matchesFromTime.time.number
        this.fetchMatchesFromTime()
      },
      async fetchMatchesFromTime () {
        const self = this
        const leagueId = this.league_id
        const time = this.time

        try {
          let response = await this.$axios({
            method: 'get',
            url: 'api/v2.0/matches/' + leagueId + '/time/' + time
          })
          this.matches = response.data.data
        } catch (e) {
          console.log('dashboard', e)
          this.$store.dispatch('turnOnSnackbar', e.response.data.error)
        }
      }
    },
    mounted () {
      // this.fetchAllMatches()
      this.teams = this.$store.getters['user'].playing_teams
    }
  }
</script>

<style scoped lang="stylus">
  /*#matches*/

  .match-card
    margin-top 12px
    margin-bottom 12px
  .content
    display flex
    justify-content space-around
    height calc(100vh - 128px)
  .section
    width 100%
    overflow-y auto
    padding-top 15px
    padding-left 7.5px
    padding-right 7.5px
  .matches-container
    padding-left 24px
    padding-right 24px
  /*.teams-container*/
    /*display flex*/
    /*flex-wrap wrap*/
    /*justify-content space-around*/
    /*align-content flex-start*/
  .teams-container ul
    list-style-type none
    padding-left 0

  .team-card
    /*flex-shrink 0*/
    margin-bottom 26px

  /*.show*/
    /*display block*/
  /*.hide*/
    /*display block*/
  /*.show-flex*/
    /*display flex*/
  @media screen and (max-width: 1023px)
    .show
      display block
    .hide
      display none
    .show-flex
      display flex
    .teams-container
      justify-content: center
</style>
