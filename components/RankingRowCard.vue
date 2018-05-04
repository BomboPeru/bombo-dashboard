<template>
  <!--
  @mouseover="rankingRowCardHover"
  @mouseleave="rankingRowCardLeave"
  -->
    <div id="ranking-row-card" class="elevation rounded">

      <table class="ranking-row-card-table">
        <tbody>
          <tr>
            <td id="position">{{user.position}}</td>
            <td id="photo">
              <div class="">
                <img :src="`${BASE_URL}api/v2.0/storage/users/${user.creator}/profile-photo`" alt="" height="32px">
              </div>
            </td>
            <td id="team-name">
              <template v-if="landing">
                <div class="username">{{user.creator}}</div>
                <div class="ellipsis teamname">
                  Equipo: {{user.name}}
                </div>
              </template>
              <template v-else>
                <div class="username">{{user.name}}</div>
                <div class="ellipsis teamname">
                  {{user.creator}}
                </div>
              </template>
            </td>

            <td id="earning">
              <div class="label-earnings">Premio</div>
              <div class="earnings">
                {{ Math.round(user.prize_b_coins * 100) / 100 }} <i class="fas fa-bold fa-xs"></i> /
                {{ Math.round(user.prize_money * 100)/100 }} <i class="fas fa-money-bill-alt fa-xs"></i>
              </div>
            </td>

            <td id="score">
              <div class="label-points">Puntos</div>
              <div class="points">
                {{Math.round(user.total_points * 100)/100}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!--<div class="userteam-container" ref="userteamContainer">-->
        <!--<div class="userteam-card">-->
          <!--<div class="userteam-card-header">-->
            <!--<div class="header-title userteam-team-name">{{ user.name }}</div>-->
            <!--<div class="header-title userteam-creator">{{ user.creator }}</div>-->
          <!--</div>-->
          <!--<ul>-->
            <!--<li class="userteam-row" v-for="(item, i) in user.players" :key="i">-->
              <!--<div class="player-shirt">-->
                <!--<squad-number :img="shirtUrl(item)" :number="item.j_number"/>-->
              <!--</div>-->
              <!--<div class="player-names">-->
                <!--<div class="player-name">{{ item.name }}</div><div class="player-teamname">{{ item.team }}</div>-->
              <!--</div>-->
              <!--<div class="player-points">-->
                <!--<div class="player-point-title">Puntos</div><div class="player-point">{{ item.points }}</div>-->
              <!--</div>-->
              <!--<div class="player-position" :style="{ background: kindPlayer[item.position].color }">-->
                <!--{{ formatPosition(playerTypesConversions[item.position]) }}-->
              <!--</div>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
      <!--</div>-->

    </div>
</template>

<script>
  import SquadNumber from './SquadNumber'

  export default {
    name: 'ranking-row-card',
    props: {
      user: Object,
      landing: Boolean
    },
    components: {
      SquadNumber
    },
    computed: {
      BASE_URL () {
        return this.$store.state.BASE_URL
      }
    },
    data () {
      return {
        playerTypesConversions: {
          'goal_keeper': 'ARQUERO',
          'defender': 'DEFENSA',
          'mid_fielder': 'CENTROCAMPISTA',
          'forward': 'DELANTERO'
        },
        kindPlayer: {
          'goal_keeper': { label: 'portero', color: '#67A6F0' },
          'defender': { label: 'defensa', color: '#A789E8' },
          'mid_fielder': { label: 'centrocampista', color: '#CDE344' },
          'forward': { label: 'delantero', color: '#FDA237' }
        }
      }
    },
    methods: {
      rankingRowCardHover () {
        this.$refs.userteamContainer.style.display = "block"
      },
      rankingRowCardLeave () {
        this.$refs.userteamContainer.style.display = "none"
      },
      formatPosition (value) {
        return (value.substring(0,3)).toUpperCase()
      },
      shirtUrl (player) {
        if (player.team !== undefined ) {
          const teamName = player.team.toLowerCase().replace(' ','_')
          return this.BASE_URL + 'api/v2.0/shirts/' + teamName
        } else {
          return ''
        }
      }
    },
    mounted () {
    }
  }
</script>

<style scoped lang="stylus">
  .ellipsis
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  #ranking-row-card
    background #fafafa
    /*height 30px*/
    width 100%
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    margin-bottom 12px
    color: #4A4A4A;
    font-family 'Nunito Sans'
    position relative
    /*font-weight bold*/
  #ranking-row-card > table
    width 100%

  #position
    // width 30px
    width 10%
    text-align center
    font-size: 24px;
    font-weight: bold;
    color #594eec
  #photo
    // width 36px
    width 10%
    font-size: 14px;
  #photo div
    display block
  #photo img
    overflow: hidden;
    border-radius: 30px;
    width 32px
    object-fit: cover;

  #team-name
    width 30%
    //width 132px
    font-size: 12px;
    text-transform uppercase
  #team-name div
    display block
    width 120px
  #earning
    width 30%
    // width 129px
    font-size: 12px;
  #score
    width 15%
    // width 60px
    font-weight bold
    font-size: 12px;
    text-align center

  .label-earnings
    text-align center
    font-size 10px
  .label-earnings
  .earnings
    color #594eec
    font-weight: bold;
    text-align: center;
  .earnings
    font-size 14px

  .username
    font-size 14px
    font-weight: bold;
  .teamname
    font-size 10px

  .label-points
    color #594eec
    font-size 10px
    font-weight: bold;
  .points
    color #594eec
    font-size 18px
    font-weight: bold;

  .userteam-card-header
    background url('/team_resources/ranking_background_img.png') center
    background-color #00000033
    background-blend-mode multiply
    background-size cover
    height 80px

  .header-title
    /*background black*/
    color white
    font-family 'Nunito Sans'
    padding 0 20px

  .userteam-team-name
    font-size 24px
    padding-top 10px
  .userteam-creator
    font-size 16px

  .userteam-container
    position fixed
    top 130px
    left 33vw
    display none
    z-index 10
    width auto

  .userteam-card
    background white
    width 320px
    box-shadow 0 2px 12px 0 rgba(0,0,0,.7)
    overflow auto
    border-radius 8px

  .userteam-card ul
    list-style-type none
    padding-left 0
    margin-top 10px
  .userteam-row
    position relative
    width 300px
    margin 4px 10px
    border-radius 4px
    overflow hidden
    background #f4f4f4


  .player-shirt
  .player-names
  .player-points
  .player-position
    display inline-block

  .player-shirt
    width 50px
    position relative
    top -10px
  .player-names
    width 120px
  .player-points
    width 80px
    text-align center
  .player-position
    width 50px
    position absolute
    top 0
    bottom 0
    right 0
    color white
    font-weight 600
    line-height 40px
    text-align center
    font-size 14px
  .player-name
    font-size 14px
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  .player-teamname
    font-size 12px
  .player-point-title
    font-size 12px
  .player-point
    font-size 14px

</style>
