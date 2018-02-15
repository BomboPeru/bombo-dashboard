<template>
    <div id="player-row-card" class="card-player elevation">
      <template v-if="mode === 'bank'">
        <span class="shirt"><img src="../assets/icons/soccer_jersey.svg" width="24px" alt=""></span>
        <span class="name1">{{ player.name }}</span>
        <span class="prom1">{{ player.yellows }}</span>
        <span class="up1">{{ player.played }}</span>
        <span class="costo1">{{ player.played }}</span>
        <div :class="['posicion1', kind[position]]">
          <span>{{position}}</span>
        </div>
        <span class="add" @click="selectPlayer(player)"><img src="../assets/icons/plus_black.svg" alt=""></span>
      </template>
      <template v-else-if="mode === 'selected'">
        <span class="shirt"><img src="../assets/icons/soccer_jersey.svg" width="27px" alt=""></span>
        <span class="name1">{{ player.name }}</span>
        <span class="costo1">{{ player.played }}</span>
        <div :class="['posicion1', kind[position]]">
          <span>{{position}}</span>
        </div>
        <!--<span class="add" @click="selectPlayer(player)"><img src="../assets/icons/plus_black.svg" alt=""></span>-->
      </template>
    </div>
</template>

<script>
  export default {
    name: 'player-row-card',
    props: {
      player: Object,
      position: String,
      mode: {
        type: String,
        default: 'bank'
      }
    },
    data () {
      return {
        kind: {
          'ARQUERO': 'portero',
          'DEFENSA': 'defensa',
          'CENTROCAMPISTA': 'centrocampista',
          'DELANTERO': 'delantero'
        }
      }
    },
    methods: {
      selectPlayer (player) {
        this.$emit('onPlayerSelected', player)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .card-player
    border-radius 2px
    height 30px
    margin 4px 10px
    background #fafafa
  .card-player span
    display inline-block
    text-align center
    vertical-align: middle
    font-family: Titillium Web;
    font-size 14px
  .shirt
    margin-top 4px
    margin-bottom 2px
    margin-left 8px
    margin-right 8px
  .name1
    text-align left !important
    width 31.5%
  .prom1
    width 12.5%
  .up1
    width 12.5%
  .costo1
    width 12.5%
  .posicion1
    width 18%
    display inline-block
    text-align center
  .posicion1 span
    border-radius 4px
    padding 0px 4px
    color white
  .portero span
    background #67A6F0
  .defensa span
    background #DBE889
  .centrocampista span
    background #A789E8
  .delantero span
    background #FDA237
  .add
    padding-left 5px
    width 36px
    cursor pointer

</style>
