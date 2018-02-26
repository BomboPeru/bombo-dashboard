<template>
    <div id="player-row-card" class="card-player">

      <template v-if="mode === 'bank'">
        <squad-number :img="'/shirt_placeholder.svg'" :number="player.j_number"/>
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
        <squad-number :img="'/shirt_placeholder.svg'" :number="player.j_number"/>
        <span class="name2">{{ player.name }}</span>
        <span class="costo2">{{ player.played }}</span>
        <div :class="['posicion2', kind[position]]">
          <span>{{position}}</span>
        </div>
        <!--<span class="add" @click="selectPlayer(player)"><img src="../assets/icons/plus_black.svg" alt=""></span>-->
      </template>

      <template v-else-if="mode === 'small-a'">
        <squad-number class="dorsal3" :img="'/shirt_placeholder.svg'" :number="player.j_number"/>
        <div class="name-team3">
          <div class="name3">{{ player.name }}</div>
          <div class="team3">{{ 'REAL MADRID' }}</div>
        </div>
        <div :class="['posicion3', kind[position]]">
          <span>{{position.substring(0,3)}}</span>
        </div>
        <div class="points3-container">
          <span>Puntos</span>
          <span class="points3">{{ player.points }}</span>
        </div>
        <!--<span class="add" @click="selectPlayer(player)"><img src="../assets/icons/plus_black.svg" alt=""></span>-->
      </template>
      <template v-else-if="mode === 'small-b'">
        <squad-number :img="'/shirt_placeholder.svg'" :number="player.j_number"/>
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
  import SquadNumber from './SquadNumber'

  export default {
    name: 'player-row-card',
    components: {
      SquadNumber
    },
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
    padding-top: 5px
    padding-right: 5px
    padding-left: 5px
    /*height 30px*/
    margin 4px 10px
    background #fafafa
    font-family: Titillium Web;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);

  .card-player span
    display inline-block
    text-align center
    vertical-align: middle
    font-size 14px
  .name1
    text-align left !important
    width 31.5%
  .prom1
    width 12.5%
    font-size 10px !important
  .up1
    width 12.5%
    font-size 10px !important
  .costo1
    width 12.5%
    font-size 10px !important
  .posicion1
    width 18%
    display inline-block
    text-align center
  .posicion1 span
    border-radius 4px
    color white
    font-size 10px
    padding 0px 7px


  .name2
    text-align left !important
    width 45%
  .costo2
    width 12.5%
    font-size 10px !important
  .posicion2
    float right
    width 98px
    text-align center
    margin-top 7px
    margin-right 8px
  .posicion2 span
    font-size 10px
    padding 0px 7px
    border-radius 4px
    color white

  .dorsal3
    margin-top -5px !important
    position: relative;
    top: -2px;
  .name-team3
    display inline-block
    font-size 10px !important
    text-align left !important
    width 42%
    margin-right 3px
  .name3
    text-overflow ellipsis
    white-space: nowrap;
    overflow: hidden;
    color #4A4A4A
    font-weight bold
    font-size 12px !important
  .team3
    font-size 8px !important
  .posicion3
    display inline-block
    text-align center
    margin-top 7px
    margin-right 1px
    top: -4px
    position: relative
  .posicion3 span
    font-size 10px
    padding 0px 7px
    border-radius 4px
    color white
  .points3-container
    float right
    margin-top 3px
    margin-right 5px
  .points3-container span
    font-size 8px
    display block
  /*.points3*/
    /*font-size 10px !important*/


  .portero span
    background #67A6F0
  .defensa span
    background #CDE344
  .centrocampista span
    background #A789E8
  .delantero span
    background #FDA237
  .add
    visibility hidden
    padding-left 5px
    width 36px
    cursor pointer
  #player-row-card:hover .add
    visibility visible
  @media screen and (max-width: 1023px)
    .add
      visibility visible

</style>
