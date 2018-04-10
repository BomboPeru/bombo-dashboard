<template>
    <div id="match-card" :style="{ width: width }" :class="['rounded-sm', 'elevation-2', flexible?'flexible':'']">
      <table style="width: 100%" class="table-content">
        <thead v-if="!notPlayed">
          <tr class="team_names">
            <th style="width: 40%;">{{ match.home_name }}</th>
            <th style="width: 20%;"></th>
            <th style="width: 40%;">{{ match.away_name}}</th>
          </tr>
        </thead>
        <tbody>
          <tr style="height: 60px;">
            <td style="width: 40%;" :class="[notPlayed?'name-row':'score-row']">{{ notPlayed?match.home_name:match.home_score }}</td>
            <td style="width: 20%;" class="vs">vs</td>
            <td style="width: 40%;" :class="[notPlayed?'name-row':'score-row']">{{ notPlayed?match.away_name:match.away_score }}</td>
          </tr>
        </tbody>
      </table>
      <div :class="['info-container', match.match_state === 'ended'?'finalized':'']">
        <div class="date">{{ dateStart }}</div>
        <div class="match-state"> {{ MatchStates[match.match_state] }} </div>
        <div class="time">Fecha {{ time }}</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'match-card',
    props: {
      match: Object,
      time: Number,
      date: String,
      flexible: Boolean,
      notPlayed: Boolean,
      width: {
        type: String,
        default: '300px'
      }
    },
    computed: {
      dateStart () {
        const date = new Date(this.date)
        const month = date.getMonth() + 1
        return date.getDate() + '/' + month + '/' + date.getFullYear()
      }
    },
    data () {
      return {
        MatchStates: {
          'programmed': 'Por Jugar',
          'ended': 'Finalizado'
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .flexible
    width 100% !important
  #match-card
    display inline-block
    // width 300px
    background white
    font-weight bold
    font-family Titillium Web
  .info-container
    background #00BE8C
    height 40px
    width 100%
    color white
    padding 0px 10px
    position relative
  .finalized
    background #FFC400
  .time
    float right
  .date
    float left
  .match-state
    position absolute
    top 8px
    left 50%
    transform translateX(-50%)
    text-align center
  .date
  .time
    line-height 40px
    display inline-block
  .table-content th, td
    text-align center
  .score-row
    font-size: 38px;
  .name-row
    color #747474
    font-weight normal
    font-size: 20px;
    font-family 'Nunito Sans'
  .vs
    color #747474
    font-weight normal
    font-size: 18px;

  .team_names th
    text-transform uppercase


</style>
