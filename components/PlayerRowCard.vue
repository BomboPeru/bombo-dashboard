<template>
    <div id="player-row-card" class="card-player elevation">
      <template v-if="mode === 'bank'">
        <span class="shirt"><img src="../assets/icons/soccer_jersey.svg" width="27px" alt=""></span>
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
    margin-left 8px
    margin-right 8px
  .name1
    width 30%
  .prom1
    width 14%
  .up1
    width 12%
  .costo1
    width 12%
  .posicion1
    width 20%
    display inline-block
    text-align right
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
    width 36px
    cursor pointer

</style>
