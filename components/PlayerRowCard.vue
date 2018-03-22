<template>
    <div id="player-row-card" class="card-player">

      <template v-if="mode === 'bank'">
        <table class="row-table" style="width: 100%;">
          <tbody>
            <tr>
              <td class="responsive-squadnumber-bk" style="width: 10%;">
                <squad-number :img="shirtUrl" :number="player.j_number"/>
              </td>
              <td class="responsive-playername-bk" style="width: 30%;">
                {{ player.name }}
              </td>
              <td class="responsive-status-bk" style="width: 10%;" :style="{ 'color': statusPlayer.color }">
                <i class="fas fa-xs fa-circle"></i>
                <div class="tooltip-status">{{ statusPlayer.text }}</div>
              </td>
              <td class="responsive-popularity-bk" style="width: 15%;">
                {{ player.popularity }} %
              </td>
              <td class="responsive-cost-bk" style="width: 20%;">
                <i class="far fa-money-bill-alt"></i>
                {{ player.cost }} M
              </td>
              <td style="width: 15%;" class="position-action responsive-action-bk" @click="selectPlayer(player)">
                <span>{{ positionInShort }}</span>
                <span>
                  <i class="fas fa-plus add-action"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="right-cover" :style="{ 'background': kind[position].color, 'width': '15%' }"></div>
      </template>

      <template v-else-if="mode === 'selected'">
          <div class="hover-select-captain" @click="selectCaptain()">
          <span class="select-text">SELECCIONAR COMO CAPITAN</span>
        </div>

        <table class="row-table" style="width: 100%;">
          <tbody>
          <tr>
            <td style="width: 12%;">
              <div class="captain-band"
                   v-if="captainId === player.internal_id">
                <img
                     src="/team_resources/c_band.png"
                     height="42px" alt="">
              </div>
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
            <td style="width: 25%;" class="position-action" @click="selectPlayer(player)">
              <span>{{ positionInShort }}</span>
              <span>
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
              <div class="captain-band"
                   v-if="player.is_captain === true">
                <img
                  src="/team_resources/c_band.png"
                  height="42px" alt="">
              </div>

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

      </template>

      <template v-else-if="mode === 'small-b'">
        <table class="row-table" style="width: 100%;">
          <tbody>
          <tr>
            <td style="width: 12%;">
              <squad-number :img="shirtUrl" :number="player.j_number"/>
            </td>
            <td style="width: 40%;">
              <div class="title" style="margin-top: -7px;">{{ player.date }}</div>
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
      captainId () {
        return this.$store.state.createteam.captainId
      },
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
      statusPlayer () {
        let status = {
          color: '#fff',
          text: ''
        }
        switch (this.player.status) {
          case 'semi-active':
            status = {
              color: 'yellow',
              text: 'Lesionado, 50% de prop. de jugar'
            }
            break
          case 'not-active':
            status = {
              color: 'red',
              text: 'Lesionado, poca probabilidad de jugar'
            }
            break
          case 'suspended':
            status = {
              color: 'black',
              text: 'Suspendido, imposible que juegue'
            }
            break
          default:
            status = {
              color: '#3dde00',
              text: ''
            }
            break
        }
        return status
      }
    },
    // active semi-active not-active suspended
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
      },
      selectCaptain() {
        this.$store.state.createteam.captainId = this.player.internal_id
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
    cursor pointer
  .add-action
    position relative
    top 4px
    right 10px
    float right

  .captain-band
    width: 41px;
    top: -6px;
    position: absolute;
    z-index: 400;
    left: -8px;

  .hover-select-captain
    position absolute
    z-index 10
    top 0
    left 0
    height 45px
    width 75%
    border-top-left-radius 6px
    border-bottom-left-radius 6px
    background rgba(0, 0, 0, 0)
    cursor pointer

    font-family: Titillium Web;
    font-weight bold
    font-size 14px
    color white
  .hover-select-captain:hover
    background #232323ab
  .hover-select-captain:hover .select-text
    color white
  .responsive-status-bk:hover .tooltip-status
    display inline-block
  .tooltip-status
    display none
    padding 4px 4px
    position absolute
    top 0
    left -50%
    background rgba(0, 0, 0, 0.51)
    color white

  .select-text
    display inline-block
    position relative
    top 50%
    left 50%
    transform translateX(-50%) translateY(-50%)
    color rgba(35, 35, 35, 0)

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

  @media screen and (max-width: 500px)
    .position-action
      text-align center
      padding-left 5px
    .add-action
      right -2px

    .responsive-squadnumber-bk
      width 8% !important
    .responsive-playername-bk
      width 22% !important
      font-size 12px
    .responsive-status-bk
      position relative
      width 4% !important
    .responsive-popularity-bk
      width 8% !important
      font-size 12px
    .responsive-cost-bk
      width 13% !important
      font-size 12px
      text-align right
    .fa-money-bill-alt
      display none
    .right-cover
      width 21% !important
    .title
      font-size 12px
    .subtitle
      font-size 10px

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
