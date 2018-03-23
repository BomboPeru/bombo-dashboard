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

          <div class="text-container">
            <p>
              JUGADOR DE LA SEMANA
            </p>
            <p class="top-player-name">
              {{ player.name }}
            </p>
            <p>
              PUNTOS
            </p>
            <p class="top-player-points">
              {{ player.points }}
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
          <svg class="svg"
               width="100%"
               height="100%"
               version="1.1"
               preserveAspectRatio="none"
               viewBox="0 0 100 100">

            <polygon points="0,100 0,60 80,20 100,80 100,100"  :style="{ fill: '#81A4AC' }"/>
          </svg>

          <div class="ranking-container">
            <p class="top-players">TOP 10 JUGADORES DE LA SEMANA</p>
            <div class="ranking-list-container">
              <div style="text-align: center;" v-for="(player, i) in rankingPlayers" :key="i+'-player-ranking'">
                <ranking-player-row-card :player="player"
                                         class="ranking-player"/>
              </div>
            </div>
          </div>
        </div>
        <div class="next-matches-card custom-elevation">
          <svg class="svg"
               width="100%"
               height="100%"
               version="1.1"
               preserveAspectRatio="none"
               viewBox="0 0 100 100">

            <polygon points="50,10 58,0 100,0 100,30 90,45"  :style="{ fill: '#C8FF74' }"/>
          </svg>

          <div class="next-matches-container">
            <p class="title-next-matches">PROXIMAS FECHAS</p>
            <div class="time-number">{{ number }}</div>
            <div class="matches-card-section">
              <match-card v-for="(match, i) in matches" :key="i"
                          :match="match" :time="match.time"
                          width="250px"
                          :date="match.playing_day"
                          class="match-card"
                          notPlayed/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import MatchCard from '../../components/MatchCard'
  import RankingPlayerRowCard from '../../components/RankingPlayerRowCard'

  export default {
    name: 'home',
    layout: 'dashboard',
    components: { MatchCard, RankingPlayerRowCard },
    data () {
      return {
        user: {},
        leagues: [],
        player: { name: 'No Name', points: 24 },
        number: 0,
        matches: [],
        rankingPlayers: [
          { position: 'goal_keeper', name: 'Julito Sans', points: 23, ranking: 1 },
          { position: 'defender', name: 'Julito Sans', points: 13, ranking: 1 },
          { position: 'mid_fielder', name: 'Julito Sans', points: 48, ranking: 1 },
          { position: 'forward', name: 'Julito Sans', points: 33, ranking: 1 },
          { position: 'forward', name: 'Julito Sans', points: 33, ranking: 1 },
          { position: 'forward', name: 'Julito Sans', points: 33, ranking: 1 },
          { position: 'forward', name: 'Julito Sans', points: 33, ranking: 1 },
          { position: 'forward', name: 'Julito Sans', points: 33, ranking: 1 },
          { position: 'forward', name: 'Julito Sans', points: 33, ranking: 1 },
          { position: 'forward', name: 'Julito Sans', points: 33, ranking: 1 }
        ]
      }
    },
    mounted () {
      this.user = this.$store.getters['user']
      const self = this

      this.$axios.get('http://api.bombo.pe/api/v2.0/leagues/all')
        .then(res => {
          const leagues = res.data.data
          this.$store.state.leagues = res.data.data

          const currentDate = new Date()
          const premier_league = leagues[0]
          let time = 0

          for (let i = 0; i < premier_league.matches.length; i++) {
            const playingDate = new Date(premier_league.matches[i].playing_day)
            if (playingDate.getTime() > currentDate.getTime()) {
              time = premier_league.matches[i].time
              self.number = time
              break
            }
          }
          for (let i = 0; i < premier_league.matches.length; i++) {
            if (time === premier_league.matches[i].time) {
              self.matches.push(premier_league.matches[i])
            }
          }

        })
        .catch(e => {
          // window.$nuxt.error({ statusCode, message })
          console.log('>> e ', e.toString())
        })
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
  .text-container p
    text-align right
  .text-container .top-player-name
    padding-right 130px
  .text-container .top-player-points
    font-size 44px
    font-weight bold

  #home
    width 100%
    display flex
    flex-wrap wrap
    justify-content center

  .grid-container
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

  .title-next-matches
    margin-top 20px
    margin-left 20px

  .time-number
    position absolute
    top -20px
    right 20px
    color black
    font-family 'Nunito Sans'
    font-weight bold
    font-size 120px

  .matches-card-section
    width 100%
    display flex
    flex-wrap wrap
    justify-content: center
    align-items start
    height calc(70vh - 280px)
    overflow auto
    margin-top 120px
  .match-card
    margin 10px 20px


  .ranking-player
    margin 4px 2px

  .ranking-list-container
    overflow auto
    text-align center
    height calc(70vh - 200px)

  .top-players
    text-align left
    margin-top 20px
    margin-bottom 40px
    margin-left 20px


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


  @media screen and (max-width: 600px)
    .grid-container
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
    .time-number
      font-size 55px

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
