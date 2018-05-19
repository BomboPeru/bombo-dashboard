<template>
    <div id="ranking-board" :class="['elevation', 'rounded', 'ranking-card', landing?'perspective':'']">

      <div class="tabs" v-if="landing === false">

        <select v-model="leagueObj" class="league-select">
          <option disabled :value="undefined">Selecciona una liga</option>

          <option :value="league"
                  v-for="(league, i) in leagues"
                  :key="i+'-league'">{{ league.name }}</option>
        </select>

        <select v-model="timeObj" class="time-select">
          <option disabled :value="undefined">Selecciona una fecha</option>

          <option :value="time" v-for="(time, i) in times"
                  :key="i+'-time'">Fecha {{time.number }} - {{ formatDate(time.start) }}</option>
        </select>

      </div>
      <div class="tabs tab-landing" v-else>
        RANKING DE NUESTROS JUGADORES
      </div>

      <div class="header-table">
        <!--<table>-->
          <!--<thead>-->
            <!--<tr>-->
              <!--<th v-for="(item, i) in headers"-->
                  <!--:key="i+'-ranking-header'"-->
                  <!--class="header-item">-->
                <!--{{ item }}-->
              <!--</th>-->
            <!--</tr>-->
          <!--</thead>-->
        <!--</table>-->
      </div>

      <template v-if="landing">
        <div :class="[landing?'content-table-landing':'content-table']" v-if="ranking.length > 0">
          <ranking-row-card class="ranking-row-card"
                            :landing="landing"
                            v-for="(item, i) in ranking"
                            :key="i+'-ranking-user'"
                            :user="item"/>
        </div>
        <div class="empty-ranking" v-else>
          Aun no sale los resultados para esta fecha
        </div>
      </template>
      <template v-else>
        <template v-if="isRanking">
          <div :class="[landing?'content-table-landing':'content-table']" v-if="ranking.length > 0">
            <ranking-row-card class="ranking-row-card"
                              :landing="landing"
                              v-for="(item, i) in ranking"
                              :key="i+'-ranking-user'"
                              :user="item"/>
          </div>
          <div class="empty-ranking" v-else>
            Aun no sale los resultados para esta fecha
          </div>

        </template>
        <template v-else-if="!isRanking">
          <div :class="landing?'empty-ranking-landing':'empty-ranking'">
            Selecciona una fecha para visualizar las posiciones
          </div>
        </template>

      </template>
    </div>
</template>

<script>
  import RankingRowCard from './RankingRowCard'

  export default {
    name: 'ranking-board',
    components: {
      RankingRowCard
    },
    props: {
      landing: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      times () {
        if (this.leagueObj === undefined) {
          return []
        } else {
          // let times = []
          return this.leagueObj.times
        }
      },
      isRanking: {
        get () {
          if (this.timeObj === undefined) {
            return false
          }
          this.$emit('onSelectLeague', { league_id: this.leagueObj.id, time: this.timeObj  })
          this.fetchRanking()
          return true
        }
      }
    },
    data () {
      return {
        leagueObj: undefined,
        timeObj: undefined,
        leagues: [],
        activeTab: 0,
        headers: [
          'LUGAR',
          'USUARIO',
          'NOMBRE DE EQUIPO',
          'PUNTAJE'
        ],
        ranking: []
      }
    },
    methods: {
      formatDate (timeStart) {
        const date = new Date(timeStart)
        return '' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      },
      async fetchRanking () {
        const timeId = this.timeObj.id
        const leagueId = this.leagueObj.id
        this.$store.state.isShortLoading = true

        try {
          let response = await this.$axios.$get(`api/v2.0/global/ranking/${leagueId}/${timeId}`)
          this.ranking = response.data.reverse()

          this.$store.state.isShortLoading = false
        } catch (e) {
          console.log(e)
          this.$store.state.isShortLoading = false
        }
      },
      async fetchRankingForLanding() {
        let response = await this.$axios.$get('api/v2.0/global/ranking/for-landing')
        this.ranking = response.data.reverse()

      },
      async fetchLeagues () {
        let response = await this.$axios.$get('api/v2.0/leagues/all')
        // leagues

        this.leagues = response.data

        // init ranking
        if (response.data.length === 0) {
          return
        }
        let response2 = await this.$axios.$get(`api/v2.0/matches/${response.data[0].id}/current-time`)
        this.leagueObj = response.data[0]
        this.leagueObj.times.map(time => {
          if (time.number === response2.data.number) {
            this.timeObj = time
          }
        })

      }
    },
    mounted () {
      if (this.landing === true) {
        this.fetchRankingForLanding()
      } else {
        this.fetchLeagues()
      }
    }
  }
</script>

<style scoped lang="stylus">

  #ranking-board
    width 100%
  .ranking-card
    background #fafafa
    min-height 50px
    border-radius: 4px
    overflow: hidden;
  .perspective
    transform: perspective(61em) rotateY(36deg)
  .tabs
    display flex
    height 60px
    justify-content: space-around;
    align-items: center;
    background: #0e212d;
  .tabs:last-child
    border-radius: 0px 10px 0px 0px;
  .tab-landing
    color white
  .tab
    font-family Titillium Web
    font-weight bold
    flex-grow 1
    padding 5px
    background #E2E2E2
    text-align center
    height 100%
    line-height 50px
    box-shadow: inset 1px 0px 4px rgba(0, 0, 0, 0.25)
  .active-tab
    background #fafafa
  .header-table
    padding-left 8px
    padding-right 10px
    margin-bottom 10px
  .header-table table
    width 100%
  .header-item
    font-size 12px
    color: #445F69;
    font-family Titillium Web
    font-weight bold

  .empty-ranking
    width 100%
    background #fafafa
    font-family Titillium Web
    font-weight bold
    text-align center
    color #445F69
    line-height calc(100vh - 300px)
    height calc(100vh - 300px)
  .empty-ranking-landing
    line-height 500px
    height 400px

  .content-table
    padding-left 8px
    padding-right 10px
    // height calc(100vh - 300px)
    height calc(100vh - 226px)
    overflow-y auto

  /*.league-select*/
    /*background red*/
  /*.time-select*/
    /*background red*/
  .content-table-landing
    height 400px
    overflow-y auto

  .league-select
  .time-select
    outline none
    font-family Titillium Web
    font-weight bold
    text-align center
    color #fff
    background: #0e212d;
    border: none;
    font-size: 14px;
    padding: 5px;
    height: 40px;

</style>
