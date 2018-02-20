<template>
    <div id="historic-match-card" class="elevation">
      <div class="header">
        <table>
          <thead>
            <tr>
              <th id="team-a" class="team-logo">
                <img v-if="match.teamAImg !== '' || match.teamAImg === null" :src="match.teamAImg"/>
                <img v-else src="../assets/icons/placeholder_team_icon.svg" width="20px"/>
              </th>
              <th class="match-info">
                <div class="date">
                  <span>{{ match.info.date }}</span>
                </div>
                <div class="match-team">
                  <span>{{ match.info.teamA }}</span>
                  vs
                  <span>{{ match.info.teamB }}</span>
                </div>
              </th>
              <th id="team-b" class="team-logo">
                <img v-if="match.teamBImg !== '' || match.teamBImg === null" :src="match.teamBImg"/>
                <img v-else src="../assets/icons/placeholder_team_icon.svg" width="20px"/>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="content">
        <table>
          <thead>
            <tr>
              <th class="green-dot"></th>
              <th class="min">Min</th>
              <th class="event">Evento</th>
              <th class="player">Jugador</th>
              <th class="score">Puntos</th>
              <th class="yellow-dot"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="content-tr" v-for="(item, i) in match.facts" :key="i+'-match-fact'">
              <td class="green-dot"> <span class="green-ball" v-if="item.green"></span></td>
              <td class="min">{{ item.min }}</td>
              <td class="event"> {{ item.event }} </td>

              <td class="player"> {{ item.player }}</td>
              <td :class="['score', item.yellow?'score-yellow':'score-green']">{{ item.score }} </td>
              <td class="yellow-dot"> <span class="yellow-ball" v-if="item.yellow"></span> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'historic-match-card',
    props: {
      match: Object
    }
  }
</script>

<style scoped lang="stylus">
  #historic-match-card
    background #fafafa
    border-radius: 12px;
  .header
    background #243237
    height 56px
    border-radius: 12px 12px 0px 0px;
    padding-left 15px
    padding-right 15px
  .header table
    width 100%
    height 56px
  .team-logo
    width 10%
    padding-top 20px
  .match-info
    width 50%
    color white
    font-family Titillium Web
  .date
    font-size 10px
  .match-team
    display flex
    justify-content space-around
    font-size 14px
  .content
    padding-bottom 18px
  .content table
    width 100%
  .content thead
    width 100%
    font-size: 10px
    color: #707070
    font-family Titillium Web
    font-weight lighter

  .content-tr
    font-size: 13px
    text-align center
    font-family Titillium Web
  .green-dot
    width 10%
  .yellow-dot
    width 10%
  .min
    width 10%
  .event
    width 10%
  .player
    width 50%
  .content-tr .player
    padding-left 14px
    text-align left
  .score
    width 10%
  .score-yellow
    color #FFC400
  .score-green
    color #3FA707

  .green-ball
  .yellow-ball
    width: 10px;
    display: inline-block;
    height: 10px;
    border-radius: 5px;
  .yellow-ball
    background #FFC400
  .green-ball
    background #3FA707
</style>
