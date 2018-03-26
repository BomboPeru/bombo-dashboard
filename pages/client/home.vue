<template>
    <div id="home">
      <div class="grid-container">
        <div class="best-player-card custom-elevation">
          <svg class="svg"
               width="100%"
               height="100%"
               version="1.1"
               viewBox="0 0 100 100">
            <circle cx="-100" cy="-40" r="120" fill="#594EEC" />
          </svg>

          <img src="/home/player.png" alt="" class="player-img">

          <div class="text-container" v-if="rankingPlayers.length > 0">
            <p>
              JUGADOR DE LA SEMANA
            </p>
            <p class="top-player-name">
              {{ rankingPlayers[0].name }}
            </p>
            <p>
              COSTO
            </p>
            <p class="top-player-points">
              {{ rankingPlayers[0].points || 0 }} Pts
            </p>
          </div>

        </div>
        <div class="current-points-card custom-elevation">

          <svg class="svg"
               width="100%"
               height="100%"
               version="1.1"
               preserveAspectRatio="none"
               viewBox="0 0 100 100">

            <polygon points="60,100 95,0 100,0 100,100"  :style="{ fill: '#FF6565' }"/>
          </svg>

          <div class="points-container">
            <p class="title-points">TOTAL DE PUNTOS BONUS</p>
            <div class="points">
              <div class="points-value">{{ user.current_bombo_coins }} <span class="b-points">B</span> </div>
              <div class="btn-play elevation-2">JUGAR</div>
            </div>
          </div>
        </div>

        <div class="ranking-top-players custom-elevation">
          <!--<svg class="svg"-->
               <!--width="100%"-->
               <!--height="100%"-->
               <!--version="1.1"-->
               <!--preserveAspectRatio="none"-->
               <!--viewBox="0 0 100 100">-->

            <!--<polygon points="0,100 0,60 80,20 100,80 100,100"  :style="{ fill: '#ffffff' }"/>-->
          <!--</svg>-->

          <div class="ranking-container">
            <div class="header-section">
              <p class="top-players">Top 10 jugadores de la semana</p>
            </div>

            <div class="ranking-list-container">
              <div style="text-align: center;" v-for="(player, i) in rankingPlayers" :key="i+'-player-ranking'">
                <ranking-player-row-card :player="player"
                                         :index="i"
                                         width="90%"
                                         class="ranking-player"/>
              </div>
            </div>
          </div>
        </div>

        <div class="next-matches-card custom-elevation">

          <!--<svg class="svg"-->
               <!--width="100%"-->
               <!--height="100%"-->
               <!--version="1.1"-->
               <!--preserveAspectRatio="none"-->
               <!--viewBox="0 0 100 100">-->

            <!--<polygon points="50,10 58,0 100,0 100,30 90,45"  :style="{ fill: '#FF6565' }"/>-->
          <!--</svg>-->

          <div class="next-matches-container">
            <div class="header-section">
              <p class="title-next-matches">Próxima fecha de </p>
              <select v-model="league" class="league-select">
                <option disabled :value="null">Selecciona una liga</option>

                <option :value="league" v-for="(league, i) in leagues"
                        :key="i+'-league'">{{ league.name }}</option>
              </select>

              <div class="time-number">{{ number }}</div>
            </div>

            <div class="matches-card-section">
              <div v-for="(match, i) in matches" :key="i"
                   class="mini-match-card elevation"
                   :style="{ background: '#fafafa' }">

                <div class="mmc-top-title">{{ formatDate(match.playing_day) }}</div>
                <div class="mmc-background">
                  <svg class="svg"
                       width="100%"
                       height="100%"
                       version="1.1"
                       preserveAspectRatio="none"
                       viewBox="0 0 100 100">
                    <polygon points="80,100 100,80 100,100"  :style="{ fill: teamColors[match.home_name] || '#6697a5' }"/>
                  </svg>
                  <svg class="svg"
                       width="100%"
                       height="100%"
                       version="1.1"
                       preserveAspectRatio="none"
                       viewBox="0 0 100 100">
                    <polygon points="0,0 0,20 20,0"  :style="{ fill: teamColors[match.away_name] || '#6697a5' }"/>
                  </svg>

                </div>
                <div class="mmc-title">
                  <table width="100%">
                    <tbody>
                    <tr>
                      <td style="width: 40%">{{ match.away_name }} </td>
                      <td style="width: 20%" class="vs">vs</td>
                      <td style="width: 40%">{{ match.home_name }}</td>
                    </tr>
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import MatchCard from '../../components/MatchCard'
  import TeamColors from '../../assets/json/premier_league_colors'
  import RankingPlayerRowCard from '../../components/RankingPlayerRowCard'

  export default {
    name: 'home',
    layout: 'dashboard',
    components: { MatchCard, RankingPlayerRowCard },
    computed: {
      leagues () {
        return this.$store.state.leagues
      },
      league: {
        get () {
          return this.leagueObj
        },
        set (value) {
          this.leagueObj = value
          this.fetchLastMatches()
        }
      }
    },
    data () {
      return {
        user: {},
        leagueObj: null,
        player: { name: 'No Name', points: 24 },
        number: 0,
        matches: [],
        rankingPlayers: [],
        teamColors: {}
      }
    },
    methods: {
      formatDate (value) {
        const date = new Date(value)
        const day = (date.getDate().toString()).padStart(2, '0')
        const month = ((date.getMonth() + 1).toString()).padStart(2, '0')
        return `${day} / ${month} / ${date.getFullYear()}`
      },
      async fetchLastMatches () {
        const leagueId = this.leagueObj.id
        {
          let response = await this.$axios.$get(`api/v2.0/matches/${leagueId}/current-time`)
          this.number = response.data.number
        }
        {
          let response = await this.$axios.$get(`api/v2.0/matches/${leagueId}/current-matches`)
          this.matches = response.data
        }
      },
      async fetchRankingPlayers () {
        {
          let response = await this.$axios.$get('api/v2.0/players/top-ten')
          this.rankingPlayers = response.data
        }

      }
    },
    beforeCreate() {

      this.$axios.get('api/v2.0/leagues/all')
        .then(res => {
          this.$store.state.leagues = res.data.data
          this.leagueObj = res.data.data[0]

          this.fetchLastMatches()
          this.fetchRankingPlayers()

        })
        .catch(e => {
          // window.$nuxt.error({ statusCode, message })
          console.log('>> e ', e.toString())
        })
    },
    mounted () {
      this.user = this.$store.getters['user']
      const self = this
      // console.log(TeamColors)
      this.teamColors = TeamColors
    }
  }
</script>

<style scoped lang="stylus">

  .custom-elevation
    box-shadow 0 3px 16px rgba(0, 0, 0, .16), 0 10px 32px rgba(0, 0, 0, 0.02)


  .best-player-card
    background #fff
  .text-container
    position relative
    z-index 3
    margin 12px 10px
    color black
  .text-container p
    text-align right
    padding-right 20px
    font-size 12px
  .text-container .top-player-name
    padding-right 20px
    font-size 24px
  .text-container .top-player-points
    font-size 44px
    font-weight bold

  #home
    width 100%
    display flex
    flex-wrap wrap
    justify-content center
    height calc(100vh - 76px)

  .grid-container
    margin-top 20px
    width 80vw
    height calc(100vh - 128px)
    display grid
    grid-template-columns 50% 50%
    grid-template-rows 30% 70%


  .best-player-card
  .current-points-card
  .ranking-top-players
  .next-matches-card
    margin 10px
    position relative
    font-family 'Nunito Sans'
    border-radius 6px
    overflow hidden


  .best-player-card
    grid-column-start 1
    grid-column-end 2
    grid-row-start 1
    grid-row-end 2
  .current-points-card
    grid-column-start 2
    grid-column-end 3
    grid-row-start 1
    grid-row-end 2
  .ranking-top-players
    grid-column-start 1
    grid-column-end 2
    grid-row-start 2
    grid-row-end 3
  .next-matches-card
    grid-column-start 2
    grid-column-end 3
    grid-row-start 2
    grid-row-end 3



  .svg
    position absolute
    top 0
    left 0
    z-index 1
  .player-img
    position absolute
    z-index 2
    top -30px
    left -20px
    width 180px

  .next-matches-container
  .points-container
    position relative
    z-index 3

  .title-points
    text-align center
    margin-top 20px
    font-size 14px
  .points-value
    font-family Titillium Web
    font-weight bold
    font-size 122px
    display inline-block
    color #594EEC
  .b-points
    font-weight bold
    font-size 75px
  .points
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    position relative
    top -40px
    left -20px
  .btn-play
    display inline-block
    background #594EEC
    cursor pointer
    padding 10px 38px
    border-radius 40px
    color white

  .header-section
    background white
    height 40px
    line-height 40px
    color dimgrey
    padding 8px 20px


  .title-next-matches
  .league-select
  .time-number
    font-family Raleway
    font-weight 500
    color dimgrey


  .title-next-matches
    font-size 14px
    display inline-block

  .league-select
    margin-left 10px
    outline none
    font-size 14px
    border 0
    color #272727
    background white

  .time-number
    position absolute
    top 8px
    right 20px
    font-weight bold
    font-size 22px

  .matches-card-section
    width 100%
    display flex
    flex-wrap wrap
    justify-content: center

    height calc(70vh - 153px)
    overflow auto
    margin-top: 17px;


  .mini-match-card
    background #f26465
    font-family 'Raleway'
    display inline-block
    padding 4px 4px
    border-radius 4px
    margin 4px 4px
    width 220px
    text-align center
    position relative

  /*.mmc-background*/
    /*position relative*/

  .mmc-title
  .mmc-top-title
    text-transform uppercase
    position relative
    z-index 10
    color black

  .mmc-top-title
    margin-bottom 4px
    padding-bottom 4px
    margin-top 4px
    font-size 12px


  .mmc-title
    font-weight: 500;
    font-size 13px

  .vs
    font-size 12px
    text-transform lowercase
  .ranking-player
    margin 4px 2px

  .ranking-list-container
    overflow auto
    text-align center
    height calc(70vh - 152px)

  .top-players
    text-align left
    font-size 14px
    font-family 'Raleway'
    color dimgrey !important
    font-weight: 500;


  @media screen and (min-width: 1700px)
    .points
      top 0px
      left 0px

  @media screen and (max-width: 1023px)
    .grid-container
      width 100%
      display grid
      grid-template-columns 50% 50%
      grid-template-rows 30% 70%
    .points-value
      font-size 72px
    .points
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      position relative
      top 0px
      left 0px
    .ranking-list-container
      height auto
    .ranking-container
      height: 100%;
      overflow: auto;
      position relative
      z-index 3



  @media screen and (max-width: 600px)
    #home
      height auto

    .grid-container
      margin-top 0
      width 100%
      display grid
      grid-template-columns 100%
      grid-template-rows 200px 400px 600px

    .ranking-top-players
      overflow auto

    .best-player-card
      display none

    .next-matches-card
      height: 100%;

    .matches-card-section
      overflow: auto;
      height 525px
      margin-top 31px

    .current-points-card
      grid-column-start 1
      grid-column-end 2
      grid-row-start 1
      grid-row-end 2
    .ranking-top-players
      grid-column-start 1
      grid-column-end 2
      grid-row-start 2
      grid-row-end 3
    .next-matches-card
      grid-column-start 1
      grid-column-end 2
      grid-row-start 3
      grid-row-end 4
</style>
