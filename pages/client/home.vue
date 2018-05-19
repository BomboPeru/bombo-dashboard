<template>
    <div id="home">
      <div class="grid-container">

        <div class="status-card custom-elevation">
          <div class="points-container">

            <div class="header">
              <p class="title-card">ESTADO ACTUAL</p>

              <div class="btn-play elevation-2" @click="clickPlay">JUEGA YA</div>
            </div>

            <div class="status-card-content">

              <div class="status-card-section-1">
                <div class="points">
                  <div class="points-value">{{ user.current_bombo_coins }} <i class="fas fa-bold fa-xs"></i></div>
                  <span class="slash-value">&nbsp;/&nbsp;</span>
                  <div class="credit-value">{{ saldo }} <i class="fas fa-money-bill-alt fa-xs"></i> </div>
                </div>
                <div class="stats-teams">
                  <div>Equipos en juego: {{ playing_teams }}</div>
                  <div>Equipos guardados: {{ saved_teams }}</div>
                  <div>Equipos pasados: {{  old_teams }}</div>
                </div>
              </div>

              <div class="status-card-section-2">
                <i class="fas fa-3x fa-trophy"></i>
                <div class="status-card-prices">PUESTO EN <br>TU ÚLTIMO JUEGO: {{ lastRanking === 0? '-':lastRanking }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="prices-card custom-elevation">
          <div class="header">
            <p class="title-card title-card-center">PREMIOS DE LA FECHA</p>
          </div>

          <div v-if="pricesList.length > 0"
               :class="['price-item-first']">

            <div class="first-price-cup">
              <i class="fas fa-2x fa-trophy"></i>
            </div>

            <div class="first-price-text">
              <div>{{ pricesList[0].place }}</div>
              <div>{{ pricesList[0].price }}</div>
            </div>

          </div>

          <div v-for="(item, i) in pricesList"
               v-if="i !== 0"
               :key="i+'-price-item'"
               :class="[i%2?'price-pair':'price-nopair', 'price-item']">
            <span class="place">{{ item.place }}</span>
            <span class="price">{{ item.price }}</span>
          </div>

          <div class="prices-card-note">
            *1 entrada = S/ 10 o 10 Bombo coins
          </div>

        </div>

        <div class="ranking-top-players custom-elevation">

          <div class="ranking-container">
            <div class="header">
              <p class="title-card title-card-center">TOP JUGADORES DE LA SEMANA</p>
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

        <div class="tutorial-card custom-elevation">

          <div class="header">
            <p class="title-card">TUTORIALES</p>
          </div>

          <div style="text-align: center">
            <iframe class="iframe-video"
                    src="https://www.youtube.com/embed/aQqvMNxEDlo?rel=0"
                    frameborder="0"
                    allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <!--<div class="empty-tutorial-items">-->
              <!--Pronto agregaremos las guías de juego ;)-->
            <!--</div>-->
          </div>
        </div>


        <div class="next-matches-card custom-elevation">

          <div class="next-matches-container">
            <div class="header">
              <p class="title-card">PRÓXIMOS ENCUENTROS</p>
              <select v-model="league" class="league-select">
                <option disabled :value="null">Selecciona una liga</option>

                <option :value="league" v-for="(league, i) in leagues"
                        :key="i+'-league'">{{ league.name }}</option>
              </select>
            </div>

            <div class="matches-card-section">
              <div v-for="(match, i) in matches" :key="i"
                   class="mini-match-card custom-elevation-2"
                   :style="{ background: '#fff' }">

                <div class="mmc-top-title">{{ formatDate(match.playing_day) }}</div>
                <div class="mmc-background">
                  <svg class="svg"
                       width="100%"
                       height="100%"
                       version="1.1"
                       preserveAspectRatio="none"
                       viewBox="0 0 100 100">
                    <polygon points="0,0 0,70 25,0"  :style="{ fill: '#00FF87' }"/>
                  </svg>

                  <img :src="leagueImgs[league.name] || '/leagues/default_league_icon.svg'" alt="" class="league-icon">

                </div>
                <div class="mmc-title">
                  <table width="100%">
                    <tbody>
                    <tr>
                      <td style="width: 40%">
                        <svg version="1.1"
                             id="Capa_1"
                             height="40px"
                             xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             :style="{ 'enable-background': 'new 0 0 512.001 512.001', fill: teamColors[match.home_name] || '#6697a5' }"
	 viewBox="0 0 512.001 512.001" xml:space="preserve">
<g>
	<g>
		<path d="M49.862,249.093c1.522,10.031,3.481,19.945,5.869,29.716l410.267-142.015v-31.747L49.862,249.093z"/>
	</g>
</g>
<g>
	<g>
		<polygon points="46.003,0 46.003,139.317 448.475,0 		"/>
	</g>
</g>
<g>
	<g>
		<path d="M134.076,426.292c31.709,34.959,70.931,63.549,115.948,83.111l5.978,2.598l5.978-2.598
			c85.275-37.055,149.786-106.492,181.738-190.294L134.076,426.292z"/>
	</g>
</g>
<g>
	<g>
		<path d="M46.003,171.064v26.88c0,6.878,0.218,13.72,0.626,20.523L465.998,73.3V25.681L46.003,171.064z"/>
	</g>
</g>
<g>
	<g>
		<path d="M88.544,362.688c7.495,13.53,15.91,26.527,25.172,38.907l341.389-118.174c4.291-16.541,7.35-33.507,9.114-50.774
			L88.544,362.688z"/>
	</g>
</g>
<g>
	<g>
		<path d="M64.147,307.641c3.235,9.498,6.888,18.826,10.932,27.962l390.897-135.311c0.005-0.783,0.022-1.565,0.022-2.349v-29.405
			L64.147,307.641z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

                      </td>
                      <td style="width: 20%" class="vs">vs</td>
                      <td style="width: 40%">

                        <svg version="1.1"
                             id="Capa_1"
                             height="40px"
                             xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             :style="{ 'enable-background': 'new 0 0 512.001 512.001', fill: teamColors[match.away_name] || '#6697a5' }"
	 viewBox="0 0 512.001 512.001" xml:space="preserve">
<g>
	<g>
		<path d="M49.862,249.093c1.522,10.031,3.481,19.945,5.869,29.716l410.267-142.015v-31.747L49.862,249.093z"/>
	</g>
</g>
<g>
	<g>
		<polygon points="46.003,0 46.003,139.317 448.475,0 		"/>
	</g>
</g>
<g>
	<g>
		<path d="M134.076,426.292c31.709,34.959,70.931,63.549,115.948,83.111l5.978,2.598l5.978-2.598
			c85.275-37.055,149.786-106.492,181.738-190.294L134.076,426.292z"/>
	</g>
</g>
<g>
	<g>
		<path d="M46.003,171.064v26.88c0,6.878,0.218,13.72,0.626,20.523L465.998,73.3V25.681L46.003,171.064z"/>
	</g>
</g>
<g>
	<g>
		<path d="M88.544,362.688c7.495,13.53,15.91,26.527,25.172,38.907l341.389-118.174c4.291-16.541,7.35-33.507,9.114-50.774
			L88.544,362.688z"/>
	</g>
</g>
<g>
	<g>
		<path d="M64.147,307.641c3.235,9.498,6.888,18.826,10.932,27.962l390.897-135.311c0.005-0.783,0.022-1.565,0.022-2.349v-29.405
			L64.147,307.641z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 40%">{{ match.home_name }} </td>
                      <td style="width: 20%" class="vs"></td>
                      <td style="width: 40%">{{ match.away_name }}</td>
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
    components: { MatchCard, RankingPlayerRowCard},
    middleware: 'authenticated',
    async fetch ({ store }) {
      await store.dispatch('fetchUser')
    },
    head () {
      return {
        title: 'Bombo - Inicio'
      }
    },
    computed: {
      leagues () {
        return this.$store.state.leagues
      },
      lastRanking () {
        if (this.$store.getters['user'].old_teams === null) {
          return 0
        } else {
          const oldTeams = this.$store.getters['user'].old_teams
          return oldTeams[oldTeams.length - 1].position
        }

      },
      league: {
        get () {
          return this.leagueObj
        },
        set (value) {
          this.leagueObj = value
          this.fetchLastMatches()
        }
      },
      saldo () {
        return Math.round( 100 * (this.$store.state.current_credit + this.$store.state.current_won_credit) ) / 100
      }
    },
    data () {
      return {
        user: {},
        leagueObj: null,
        leagueImgs: {
          'Premier League': '/leagues/premier_league_icon.png'
        },
        player: { name: 'No Name', points: 24 },
        number: 0,
        matches: [],
        rankingPlayers: [],
        teamColors: {},
        playing_teams: 0,
        saved_teams: 0,
        old_teams: 0,
        pricesList: [
          { price: 's/ 200.00', place: 'PRIMER PUESTO' },
          { price: 's/ 125.00', place: '2do ' },
          { price: 's/ 75.00', place: '3er ' },
          { price: 's/ 55.00', place: '4to ' },
          { price: 's/ 45.00', place: '5to ' },
          { price: 's/ 30.00', place: '6 a 10 ' },
          { price: 's/ 20.00', place: '11 a 20 ' },
          { price: '10 BOMBO COINS', place: '21 a 35 ' },
          { price: '5 BOMBO COINS', place: '35 a 50 ' }
        ],
        tutorialImages: [],
        tutorialImagesIndex: null
      }
    },
    methods: {
      clickPlay () {
        // this.$router.push('/client/teams')
        this.$store.state.team.selectLeagueDialog = true
      },
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
          console.log('>> e home', e.toString())
        })
    },
    mounted () {
      this.user = this.$store.getters['user']
      if (this.user.playing_teams === null) this.playing_teams = 0
      else this.playing_teams = this.user.playing_teams.length

      if (this.user.saved_teams === null) this.saved_teams = 0
      else this.saved_teams = this.user.saved_teams.length

      if (this.user.old_teams === null) this.old_teams = 0
      else this.old_teams = this.user.old_teams.length

      const self = this
      // console.log(TeamColors)
      this.teamColors = TeamColors
    }
  }
</script>

<style scoped lang="stylus">

  .custom-elevation
    box-shadow 0 3px 16px rgba(0, 0, 0, .16), 0 10px 32px rgba(0, 0, 0, 0.02)


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
    margin-top 10px
    width 80vw
    height calc(100vh - 74px)
    display grid
    grid-template-columns 20% 20% 20% 20% 20%
    grid-template-rows 33% 33% 33%


  .tutorial-card
  .prices-card
  .status-card
  .ranking-top-players
  .next-matches-card
    margin 10px
    position relative
    font-family 'Nunito Sans'
    border-radius 2px
    overflow hidden
    background #fff

  .status-card
    grid-column-start 1
    grid-column-end 3
    grid-row-start 1
    grid-row-end 2
  .prices-card
    grid-column-start 3
    grid-column-end 5
    grid-row-start 1
    grid-row-end 3
  .ranking-top-players
    grid-column-start 5
    grid-column-end 6
    grid-row-start 1
    grid-row-end 3
  .next-matches-card
    grid-column-start 1
    grid-column-end 3
    grid-row-start 2
    grid-row-end 4
  .tutorial-card
    grid-column-start 3
    grid-column-end 6
    grid-row-start 3
    grid-row-end 4

  .iframe-video
    width 95%
    height 140px

  .prices-card-note
    font-family Titillium Web
    font-size 12px
    color #535353
    text-align center


  .empty-tutorial-items
    background #E7EDFF
    width: 80%;
    margin auto
    line-height 100px
    height:100px
    text-align center
    color #5a53f2
    font-weight 700
    font-family 'Nunito Sans'

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

  .title-card
    display inline-block
    color #594EEC
    font-family Raleway
    font-weight 900
    margin 12px 20px 10px 16px
    font-size 16px

  .title-card-center
    text-align center

  .title-points
    text-align center
    margin-top 20px
    font-size 14px

  .points
    font-size 22px
    font-weight 700

  .credit-value
  .points-value
  .slash-value
    display inline-block
    color #707271

  .b-points
    font-weight bold

  .status-card-section-1
  .status-card-section-2
    display inline-block
    text-align center

  .status-card-section-2 .fa-trophy
    color #C6C6C6
  .first-price-cup .fa-trophy
    color #E7EDFF
  .first-price-cup
  .price-item-first
    display flex
    flex-wrap wrap
    justify-content space-around
    margin-bottom 10px
  .first-price-text
    display inline-block
  .first-price-text
    display inline-block
    font-size 12px
    text-align center

  .price-item-first
    font-family Titillium Web
    font-size 22px
  .price-item
    background #f0f4ff
    border-radius 6px
    font-family Titillium Web
    overflow hidden
    display block
    margin 0 2px
    position relative

    font-size 14px
    color #535353
    height 25px
    line-height 24px

  .price-pair
    background #F0F4FF
  .price-nopair
    background white
  .place
    display inline-block
    width 30%
    text-align right
  .price
    width 70%
    display inline-block
    text-align center


  .status-card-prices
    margin-top 4px
    font-size 10px

  .stats-teams
    text-align left

  .status-card-content
    display flex
    flex-wrap wrap
    align-items flex-end
    justify-content space-around
    color #535353

  .status-card-
    display: inline-block

  .btn-play
    display inline-block
    background #f26465
    cursor pointer
    padding 6px 28px
    border-radius 20px
    color white
    font-family Raleway
    font-weight 900
    float: right
    margin: 10px 10px 0 0

  .header-section
    background white
    height 40px
    line-height 40px
    color dimgrey
    padding 8px 20px


  .league-select
    width 133px
    outline none
    font-size 14px
    border 0
    background white
    color #594EEC
    font-family Raleway
    font-weight 900


  .matches-card-section
    width 100%
    display flex
    flex-wrap wrap
    justify-content: center

    height calc(70vh - 161px)
    overflow auto
    margin-top: 17px;


  .mini-match-card
    font-family 'Raleway'
    display inline-block
    padding 4px 4px
    border-radius: 2px
    margin 10px 4px
    text-align center
    position relative
    width: 80%

  .custom-elevation-2
    box-shadow 0 3px 13px rgba(0, 0, 0, .16), 0 3px 5px rgba(0, 0, 0, 0)
  .league-icon
    height 30px
  .mmc-background .league-icon
    position absolute
    top 10px
    left 10px
    z-index 5

  .mmc-title
  .mmc-top-title
    text-transform uppercase
    position relative
    z-index 10
    color black
    font-family Titillium Web

  .mmc-top-title
    margin-bottom 4px
    padding-bottom 4px
    margin-top 4px
    font-size 12px


  .mmc-title
    font-weight: 500;
    font-size 13px
    color: #6f7171

  .vs
    font-size 22px
    text-transform lowercase
  .shield-team
  .shield-team polygon
    fill #a46163
    /*background-color #a46163*/



  .ranking-player
    margin 4px 2px

  .ranking-list-container
    overflow auto
    text-align center
    height calc(70vh - 192px)


  @media screen and (min-width: 1700px)
    .points
      top 0px
      left 0px

    .status-card-content
      margin-top 40px

    .text-container
      margin 48px 10px
    .first-price-cup
      margin-top 10px
      font-size 30px
    .first-price-text
      font-size 28px
    .price-item
      font-size 22px
      height 50px
      line-height 50px
    .empty-tutorial-items
      height 200px
      line-height 200px
    .iframe-video
      width 90%
      height 260px


  @media screen and (max-width: 1023px)
    .grid-container
      width 100%
      display grid
      grid-template-columns 100%
      grid-template-rows 200px 400px 600px 400px

    .status-card
      grid-column-start 1
      grid-column-end 2
      grid-row-start 1
      grid-row-end 2
    .prices-card
      grid-column-start 1
      grid-column-end 2
      grid-row-start 2
      grid-row-end 3
    .next-matches-card
      grid-column-start 1
      grid-column-end 2
      grid-row-start 3
      grid-row-end 4
    .ranking-top-players
      grid-column-start 1
      grid-column-end 2
      grid-row-start 4
      grid-row-end 5

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

    .status-card-content
      margin-top 8px
    .title-card
      margin 8px 4px
    .btn-play
      margin: 4px 4px 0 0;
    .league-icon
      height 20px
    .mmc-background .league-icon
      position absolute
      top 8px
      left 8px


    .grid-container
      margin-top 0
      width 100%
      display grid
      grid-template-columns 100%
      grid-template-rows 200px 400px 600px 400px

    .ranking-top-players
      overflow auto

    .next-matches-card
      height: auto;

    .matches-card-section
      overflow: auto;
      height 525px
      margin-top 31px

    .status-card
      grid-column-start 1
      grid-column-end 2
      grid-row-start 1
      grid-row-end 2
    .prices-card
      grid-column-start 1
      grid-column-end 2
      grid-row-start 2
      grid-row-end 3
    .next-matches-card
      grid-column-start 1
      grid-column-end 2
      grid-row-start 3
      grid-row-end 4
    .ranking-top-players
      grid-column-start 1
      grid-column-end 2
      grid-row-start 4
      grid-row-end 5

</style>
