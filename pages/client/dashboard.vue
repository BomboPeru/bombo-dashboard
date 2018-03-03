<template>
  <div id="dashboard">
    <div class="content">
      <div :class="['section', activeTab === 0?'show':'hide']">
        <ranking-card/>
      </div>
      <div :class="['section', 'matches-container', activeTab === 1?'show':'hide']">
        <historic-match-card v-for="(item, i) in matches"
                             :key="i+'-match-card'"
                             :match="item"/>
      </div>
      <div :class="['section', 'teams-container', activeTab === 2?'show-flex':'hide']">
        <ul>
          <li v-for="(team, i) in teams"
              :key="i+'-team'">
            <div>
              <team-card class="team-card"
                         :key="i+'-team'"
                         :title="team.name"
                         :ranking="team.ranking"
                         :points="team.points"
                         :created-at="team.createdAt"
                         :players="team.players"
                         :collapsable="true"
                          width="100%"/>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import RankingCard from '../../components/RankingBoard'
  import HistoricMatchCard from '../../components/HistoricMatchCard'
  import TeamCard from '../../components/TeamCard'

  export default {
    layout: 'dashboard',
    name: 'dashboard',
    components: {
      RankingCard, HistoricMatchCard, TeamCard
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
        matches: [
          { teamAImg: '', teamBImg: '',
            info: { teamA: 'FCB', teamB: 'RMFC', date: '12/02/18' },
            facts: [
              { min: '12\'', event:'GOL', player: 'Jugador Name', score: '+100', yellow: true, green: false },
              { min: '12\'', event:'GOL', player: 'Jugador Name', score: '+100', yellow: false, green: true }
            ]
          }
        ],
        teams: [
        ]
      }
    },
    methods: {
      async fetchMyTeams () {
        let response = await this.$axios.$get('http://api.bombo.pe/api/v1.0/user/' + this.testUserId)
        console.log(response.data.playing_teams[0])
        this.teams = response.data.playing_teams
      },
      async fetchPastMatches () {
        let response = await this.$axios.$get('http://159.65.238.89:8500/manager/get-works')
        this.matches = response.data
      }
    },
    mounted () {
      this.fetchMyTeams()
      this.fetchPastMatches()
    }
  }
</script>

<style scoped lang="stylus">
  /*#matches*/

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
</style>
