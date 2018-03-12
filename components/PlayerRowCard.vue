<template>
    <div id="player-row-card" class="card-player">

      <template v-if="mode === 'bank'">
        <table class="row-table" style="width: 100%;">
          <tbody>
            <tr>
              <td style="width: 10%;">
                <squad-number :img="shirtUrl" :number="player.j_number"/>
              </td>
              <td style="width: 30%;">
                {{ player.name }}
              </td>
              <td style="width: 10%;" :style="{ 'color': colorStatus }">
                <i class="fas fa-xs fa-circle"></i>
              </td>
              <td style="width: 15%;">
                {{ player.popularity }} %
              </td>
              <td style="width: 20%;">
                <i class="far fa-money-bill-alt"></i>
                {{ player.cost }} M
              </td>
              <td style="width: 15%;" class="position-action">
                <span>{{ positionInShort }}</span>
                <span @click="selectPlayer(player)">
                  <i class="fas fa-plus add-action"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="right-cover" :style="{ 'background': kind[position].color, 'width': '15%' }"></div>
      </template>

      <template v-else-if="mode === 'selected'">
        <table class="row-table" style="width: 100%;">
          <tbody>
          <tr>
            <td style="width: 12%;">
              <squad-number :img="shirtUrl" :number="player.j_number"/>
            </td>
            <td style="width: 40%;">
              <div class="title" style="margin-top: -7px;">{{ player.name }}</div>
              <div class="subtitle" style="margin-top: -5px;">{{ player.team }}</div>
            </td>
            <td style="width: 25%;">
              <i class="far fa-money-bill-alt"></i>
              {{ player.cost }} M
            </td>
            <td style="width: 25%;" class="position-action">
              <span>{{ positionInShort }}</span>
              <span @click="selectPlayer(player)">
                <i class="far fa-trash-alt add-action"></i>
              </span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="right-cover" :style="{ 'background': kind[position].color, 'width': '25%'  }"></div>
      </template>

      <template v-else-if="mode === 'small-a'">
        <table class="row-table" style="width: 100%;">
          <tbody>
          <tr>
            <td style="width: 20%;">
              <squad-number :img="shirtUrl"
                            style="top: 3px;"
                            :number="player.j_number"/>
            </td>
            <td style="width: 32%;">
              <div class="title" style="margin-top: -3px;">{{ player.name }}</div>
              <div class="subtitle" style="margin-top: -5px;">{{ player.team }}</div>
            </td>
            <td style="width: 25%; text-align: center">
              <div class="subtitle" style="margin-top: -3px;">Puntos</div>
              <div class="title" style="margin-top: -7px;">{{ player.points }}</div>
            </td>
            <td style="width: 25%;" class="position-action">
              <span>{{ positionInShort }}</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="right-cover" :style="{ 'background': kind[position].color, 'width': '21%'  }"></div>

        <!--<div class="name-team3">-->
          <!--<div class="name3">{{ player.name }}</div>-->
          <!--<div class="team3">{{ player.team }}</div>-->
        <!--</div>-->
        <!--<div :class="['posicion3', kind[position].label]">-->
          <!--<span>{{position.substring(0,3)}}</span>-->
        <!--</div>-->
        <!--<div class="points3-container">-->
          <!--<span>Puntos</span>-->
          <!--<span class="points3">{{ player.points }}</span>-->
        <!--</div>-->
      </template>

      <template v-else-if="mode === 'small-b'">
        <table class="row-table" style="width: 100%;">
          <tbody>
          <tr>
            <td style="width: 12%;">
              <squad-number :img="shirtUrl" :number="player.j_number"/>
            </td>
            <td style="width: 40%;">
              <div class="title" style="margin-top: -7px;">{{ player.name }}</div>
              <div class="subtitle" style="margin-top: -5px;">{{ player.team }}</div>
            </td>
            <td style="width: 25%; text-align: center">
              <div class="subtitle" style="margin-top: -3px;">Puntos</div>
              <div class="title" style="margin-top: -7px;">{{ player.points }}</div>
            </td>
            <td style="width: 25%;" class="position-action">
              <span>{{ positionInShort }}</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="right-cover" :style="{ 'background': kind[position].color, 'width': '21%'  }"></div>

        <!--<squad-number :img="'/shirt_placeholder.svg'" :number="player.j_number"/>-->
        <!--<span class="name1">{{ player.name }}</span>-->
        <!--<span class="costo1">{{ player.cost }} M</span>-->
        <!--<div :class="['posicion1', kind[position].label ]">-->
          <!--<span>{{position}}</span>-->
        <!--</div>-->
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
    computed: {
      shirtUrl () {
        if (this.player.team !== undefined ) {
          const teamName = this.player.team.toLowerCase().replace(' ','_')
          return 'http://api.bombo.pe/api/v2.0/shirts/' + teamName
        } else {
          return ''
        }
      },
      positionInShort () {
        return this.position.substring(0,3)
      },
      colorStatus () {
        let color = '#fff'
        switch (this.player.status) {
          case 'semi-active':
            color = 'yellow'
            break
          case 'not-active':
            color = 'red'
            break
          case 'suspended':
            color = 'black'
            break
          default:
            color = '#3dde00'
            break
        }
        return color
      }
    },
    data () {
      return {
        kind: {
          'ARQUERO': { label: 'portero', color: '#67A6F0' },
          'DEFENSA': { label: 'defensa', color: '#A789E8' },
          'CENTROCAMPISTA': { label: 'centrocampista', color: '#CDE344' },
          'DELANTERO': { label: 'delantero', color: '#FDA237' }
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
    border-radius 6px
    padding-top: 4px
    padding-bottom: 4px
    padding-right: 5px
    padding-left: 5px
    margin 8px 10px
    background #fafafa
    font-family: Titillium Web;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
    position: relative

  /*.card-player span*/
    /*display inline-block*/
    /*text-align center*/
    /*vertical-align: middle*/
    /*font-size 14px*/
  .right-cover
    background red
    z-index 1
    position: absolute;
    border-top-right-radius 6px
    border-bottom-right-radius 6px
    /*border-radius: 6px;*/
    right: 0;
    top: 0;
    width: 15%;
    height: 100%;
  .position-action
    font-weight bold
    text-align center
    color white
  .add-action
    position relative
    top 4px
    right 10px
    float right
    cursor pointer
  .row-table
    position: relative
    z-index: 2

  .title
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  .subtitle
    font-size 12px

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
    font-size 13px !important
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
    width 30%
  .costo2
    width 12.5%
    font-size 13px !important
  .posicion2
    /*float right*/
    display inline-block
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
    font-size 10px !important
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
  .delete
  .add
    visibility hidden
    padding-left 5px
    width 36px !important
    cursor pointer
  .add img
    width 18px !important
  .delete img
    width 18px !important
  #player-row-card:hover .delete
    visibility visible
  @media screen and (max-width: 1023px)
    .delete
      visibility visible

</style>
