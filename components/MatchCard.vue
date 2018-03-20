<template>
    <div id="match-card" :class="['rounded-sm', 'elevation-2', flexible?'flexible':'']">
      <table style="width: 100%" class="table-content">
        <thead>
          <tr>
            <th style="width: 40%;">{{ match.away_name }}</th>
            <th style="width: 20%;"></th>
            <th style="width: 40%;">{{ match.home_name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr style="height: 60px;">
            <td style="width: 40%;" class="score-row">{{ match.away_score }}</td>
            <td style="width: 20%;">vs</td>
            <td style="width: 40%;" class="score-row">{{ match.home_score }}</td>
          </tr>
        </tbody>
      </table>
      <div class="info-container">
        <div class="date">{{ dateStart }}</div>
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
      flexible: Boolean
    },
    computed: {
      dateStart () {
        const date = new Date(this.date)
        const month = date.getMonth() + 1
        return date.getDate() + '/' + month + '/' + date.getFullYear()
      }
    }
  }
</script>

<style scoped lang="stylus">
  .flexible
    width 100% !important
  #match-card
    display inline-block
    width 300px
    font-weight bold
    font-family Titillium Web
  .info-container
    background #00BE8C
    height 40px
    width 100%
    color white
    padding 0px 10px
  .time
    float right
  .date
  .time
    line-height 40px
    display inline-block
  .table-content th, td
    text-align center
  .score-row
    font-size: 38px;


</style>
