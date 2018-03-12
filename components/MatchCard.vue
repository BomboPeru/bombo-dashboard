<template>
    <div id="match-card" class="rounded-sm elevation-2">
      <table style="width: 100%" class="table-content">
        <thead>
          <tr>
            <th style="width: 40%;">CHELSEA</th>
            <th style="width: 20%;"></th>
            <th style="width: 40%;">MAN UTD</th>
          </tr>
        </thead>
        <tbody>
          <tr style="height: 60px;">
            <td style="width: 40%;"></td>
            <td style="width: 20%;">vs</td>
            <td style="width: 40%;"></td>
          </tr>
        </tbody>
      </table>
      <div class="info-container">
        <div class="date">Lunes, Marzo 18</div>
        <div class="time">9:10 PM</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'match-card'
  }
</script>

<style scoped lang="stylus">
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


</style>
