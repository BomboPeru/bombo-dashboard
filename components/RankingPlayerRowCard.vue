<template>
    <div id="ranking-player-row-card" class="elevation-2" :style="{ width: width }">
      <table width="98%" class="table">
        <tbody>
          <tr class="tr">
            <td style="width: 10%" class="ranking">{{ index + 1 }}</td>
            <td style="width: 40%" class="name">{{ player.name }}</td>
            <td style="width: 25%" class="cost">$ {{ player.cost }} M</td>
            <td style="width: 25%" class="position">{{ position }}</td>
          </tr>
        </tbody>
      </table>
      <div class="cover-color" :style="{ background: color }"></div>
    </div>
</template>

<script>
  export default {
    name: 'ranking-player-row-card',
    props: {
      index: Number,
      player: Object,
      width: {
        type: String,
        default: '300px'
      }
    },
    computed: {
      position () {
        const positionType = {
          'goal_keeper': 'ARQ',
          'defender': 'DEF',
          'mid_fielder': 'MED',
          'forward': 'DEL'
        }
        return positionType[this.player.position]
      },
      color () {
        const positionType = {
          'goal_keeper': '#67A6F3',
          'defender': '#CDE344',
          'mid_fielder': '#A789E8',
          'forward': '#FDA237'
        }
        return positionType[this.player.position]
      }
    }
  }
</script>

<style scoped lang="stylus">
  #ranking-player-row-card
    background #fafafa
    border-radius 6px
    font-family Titillium Web
    overflow hidden
    display inline-block
    position relative
    z-index 3

  .ranking
    font-size 22px
    font-weight bold
    font-family 'Nunito Sans'
    color #445dcc
  .cost
    font-weight bold

  .table
    position relative
    z-index 2
    margin-left 1%
    margin-right 1%
    height 42px
  .tr
    text-align center
  .name
    text-align left
  .position
    font-weight bold
    color white
  .cover-color
    position absolute
    z-index 1
    top 0
    right 0
    bottom 0
    width 25%
</style>
