<template>
    <div id="new-team-card" class="round-card rounded elevation">

      <div class="header elevation tabs">
        <div :class="['header-title']">
          <span class="">{{ team.name===''?'PON UN NOMBRE A TU EQUIPO':team.name }}</span>
        </div>
        <div class="saldo">
          <span :class="['points-value', statusSaldo]">{{saldo}} M</span>
        </div>
      </div>

      <div class="line elevation"></div>

      <div class="form-name">
        <!-- fa-shield-alt -->
        <input-text v-model="team.name"
                    width="45%"
                    solid class="input-text"
                    prepend-icon="fa-shield-alt"
                    placeholder="Nombre de tu equipo" big/>

        <div class="tabs-container">
          <button :class="['tab', 'elevation', activeTab===i?'activeTab':'inactiveTab', 'tab-'+i]"
                  v-for="(tab, i) in tabs"
                  @click="toggleTab(i)"
                  :key="i+'-tab'">
            <i :class="['fas', tab.icon]"></i>
            <span class="tab-text">{{ tab.name }}</span>
          </button>
        </div>

        <!--<progress-bar vertical :current-number="saldo" :max-number="100" height="50px" class="progress-bar" />-->

      </div>

      <!--<div class="points">-->
        <!--<span class="points-label">Saldo restante:</span>-->
      <!--</div>-->

      <div class="">
      </div>

      <template v-if="tabs[activeTab].name === 'LISTA'">

        <div
          v-if="team.players.goal_keeper.length === 0 && team.players.defender.length === 0 && team.players.mid_fielder.length === 0 && team.players.forward.length === 0"
          class="empty-players">
          Escoge jugadores!
        </div>
        <div v-else class="player-list">
          <player-row-card v-for="(player, key) in team.players.goal_keeper"
                           :key="key+'-arquero'"
                           mode="selected"
                           :captain-id="isCaptain"
                           :player="player"
                           position="ARQUERO"
                           @onPlayerSelected="deletePlayer(player, 'goal_keeper')"/>

          <player-row-card v-for="(player, key) in team.players.defender"
                           :key="key+'-defensa'"
                           :captain-id="isCaptain"
                           mode="selected"
                           :player="player"
                           position="DEFENSA"
                           @onPlayerSelected="deletePlayer(player, 'defender')"/>

          <player-row-card v-for="(player, key) in team.players.mid_fielder"
                           :key="key+'-centrocampista'"
                           :captain-id="isCaptain"
                           mode="selected"
                           :player="player"
                           position="CENTROCAMPISTA"
                           @onPlayerSelected="deletePlayer(player, 'mid_fielder')"/>

          <player-row-card v-for="(player, key) in team.players.forward"
                           :key="key+'-delantero'"
                           :captain-id="isCaptain"
                           mode="selected"
                           :player="player"
                           position="DELANTERO"
                           @onPlayerSelected="deletePlayer(player, 'forward')"/>
        </div>
      </template>

      <template v-else-if="tabs[activeTab].name === 'FORMACION'">
        <div class="ground-container">
          <div class="captain-indication">
            <div class="captain-icon"> <i class="fas fa-info-circle"></i> </div>
            <div class="captain-indication-text">
              Escoge al capitán haciendo click sobre la camiseta del jugador.
            </div>
          </div>

          <div class="stadium-container">

            <img src="/team_resources/soccer_field.png" alt="" class="soccer-ground-full" width="100%" height="90%">
            <img src="/team_resources/half_soccer_field_b.png" alt="" class="soccer-ground-half" width="100%" height="90%">

          </div>

          <div class="players-layer" ref="playersLayer">

            <div class="portero-section">
              <div v-for="(player, key) in team.players.goal_keeper" :key="key+'-arquero2'" :player="player" class="portero-in-ground">
                <span class="player-container">

                  <div class="captain-band"
                       v-if="captainId === player.internal_id">
                    <img
                      src="/team_resources/captain_band_stadium.png"
                      height="22px" alt="">
                  </div>
                  <squad-number ground
                                @click="selectCaptain(player)"
                                :img="BASE_URL + 'api/v2.0/shirts/' + player.team.toLowerCase().replace(' ','_')" :number="player.j_number"/>
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="30px" alt="" @click="deletePlayer(player, 'goal_keeper')">
                  </div>
                  <div class="player-info">
                    <div><span class="player-name">{{ player.name }}</span></div>
                  </div>
                </span>
              </div>
            </div>
            <div class="defensa-section">
              <div v-for="(player, key) in team.players.defender" :key="key+'-defensa2'" :player="player" class="defensa-in-ground">
                <span class="player-container">
                  <div class="captain-band"
                       v-if="captainId === player.internal_id">
                    <img
                      src="/team_resources/captain_band_stadium.png"
                      height="22px" alt="">
                  </div>
                  <squad-number ground
                                @click="selectCaptain(player)"
                                :img="BASE_URL + 'api/v2.0/shirts/' + player.team.toLowerCase().replace(' ','_')" :number="player.j_number"/>

                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="30px" alt="" @click="deletePlayer(player, 'defender')">
                  </div>
                  <div class="player-info">
                    <div><span class="player-name">{{ player.name }}</span></div>
                  </div>

                </span>
              </div>
            </div>
            <div class="centrocampista-section">
              <div v-for="(player, key) in team.players.mid_fielder" :key="key+'-centrocampista2'" :player="player" class="centrocampista-in-ground">
                <span class="player-container">
                  <div class="captain-band"
                       v-if="captainId === player.internal_id">
                    <img
                      src="/team_resources/captain_band_stadium.png"
                      height="22px" alt="">
                  </div>
                  <squad-number ground
                                @click="selectCaptain(player)"
                                :img="BASE_URL + 'api/v2.0/shirts/' + player.team.toLowerCase().replace(' ','_')" :number="player.j_number"/>
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="30px" alt="" @click="deletePlayer(player, 'mid_fielder')">
                  </div>
                  <div class="player-info">
                    <div><span class="player-name">{{ player.name }}</span></div>
                  </div>

                </span>
              </div>
            </div>
            <div class="delantero-section">
              <div v-for="(player, key) in team.players.forward" :key="key+'-delantero2'" :player="player" class="delantero-in-ground">
                <span class="player-container">
                  <div class="captain-band"
                       v-if="captainId === player.internal_id">
                    <img
                      src="/team_resources/captain_band_stadium.png"
                      height="22px" alt="">
                  </div>
                  <squad-number ground
                                @click="selectCaptain(player)"
                                :img="BASE_URL + 'api/v2.0/shirts/' + player.team.toLowerCase().replace(' ','_')"
                                :number="player.j_number"/>
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="30px" alt="" @click="deletePlayer(player, 'forward')">
                  </div>
                  <div class="player-info">
                    <div><span class="player-name">{{ player.name }}</span></div>
                  </div>
                </span>
              </div>
            </div>

          </div>
        </div>
      </template>
    </div>
</template>

<script>
  import PlayerRowCard from './PlayerRowCard'
  import InputText from './InputText'
  import SquadNumber from './SquadNumber'
  import ProgressBar from './ProgressBar'

  // TO DO SAVE TEAM
  export default {
    name: 'new-team-card',
    components: {
      PlayerRowCard, InputText, SquadNumber, ProgressBar
    },
    props: {
      team: Object
    },
    computed: {
      BASE_URL () {
        return this.$store.state.BASE_URL
      },
      captainId () {
        return this.$store.state.createteam.captainId
      },
      shirtUrl () {
        const teamName = this.player.team.toLowerCase().replace(' ','_')
        return this.BASE_URL + 'api/v2.0/shirts/' + teamName
      },
      saldo () {
        let saldo = this.maxLimitCost - this.totalPoints
        return Math.round(saldo * 100) / 100
      },
      statusSaldo () {
        if ((this.maxLimitCost * 2 / 3)  < this.saldo) {
          return 'green-status'
        } else if ((this.maxLimitCost / 3)  < this.saldo) {
          return 'yellow-status'
        } else {
          return 'red-status'
        }
      },
      totalPoints () {
        let total = 0

        const playerPositions = ['goal_keeper', 'defender', 'mid_fielder', 'forward']
        playerPositions.map(position => {
          this.team.players[position].map(item => total += item.cost)
        })

        total = Math.round(total * 100)/100
        return total
      }
    },
    data () {
      return{
        maxLimitCost: 100,
        activeTab: 1,
        tabs: [{ name: 'LISTA', icon: 'fa-list-alt' }, {name: 'FORMACION', icon: 'fa-align-center'} ],
        title: 'MI EQUIPO',
        isCaptain: ''
      }
    },
    methods: {
      toggleTab (i) {
        // if () {
        //
        // }
        this.activeTab = i
        // if (this.tabs.length === (this.activeTab + 1)) {
        //   this.activeTab = 0
        // } else {
        //   this.activeTab++
        // }
      },
      deletePlayer (player, type) {
        let index = this.team.players[type].indexOf(player)
        if (index !== -1) {
          this.team.players[type].splice(index, 1)
          this.$store.state.createteam.playersList.push(player)
        }
      },
      selectCaptain (player) {

        console.log('captain selected !')
        this.$store.state.createteam.captainId = player.internal_id
      }
    }
  }
</script>

<style scoped lang="stylus">
  #new-team-card
    background #fafafa
    padding-bottom 14px
  .round-card
    // width 100%
    // max-height calc(100vh - 100px)
    // max-height calc(100vh - 227px)
    overflow auto
    background #fafafa
  .header
    width 100%
    height 68px
    background #243337
    padding 0px 0px


  .progress-bar
    margin 8px 2px

  .green-status
    color #00BE8C !important
  .yellow-status
    color #FFC400 !important
  .red-status
    color #EA504C !important



  .header span
    padding 0px 0px

  .tabs-container
    display inline-block
    text-align: center;
    margin 8px 12px

  @media screen and (max-width: 360px)
    margin 8px 0px

  @media screen and (max-width: 1023px)
    .tabs-container
      margin 8px 4px

  .tab
    background #243237
    border 0px solid white
    cursor pointer
    color white
    font-family Titillium Web
    font-size 14px
    outline none
    height 40px
    width 110px

  .tab-0
    border-top-left-radius 2px
    border-bottom-left-radius 2px
  .tab-1
    border-top-right-radius 2px
    border-bottom-right-radius 2px

  .activeTab
    color #fafafa
    background #243237
  .inactiveTab
    color #fafafa
    background #445F69

  .header-title
    flex-grow 1
    display inline-block
    height 100%
    line-height 54px
    padding 8px 15px
    cursor pointer
  .header-title span
    text-align left
    color white
    font-size 18px
    font-weight bold
    font-family Titillium Web

  .tab-text
    display inline-block

  .empty-players
    padding 20px 5px
    font-family Titillium Web
    text-align center
    height calc(100vh - 340px)
    // height calc(100vh - 457px)

  .player-list
    // margin-top 14px
    height calc(100vh - 340px)
    // height calc(100vh - 457px)
    overflow-y: auto;


  .ground-container
    padding 15px 15px
    position relative
    height calc(100vh - 340px)
    // height calc(100vh - 457px)
    overflow-y: auto;

  .captain-indication
    position absolute
    top 0
    left 10px
    z-index 4
    height 24px
    font-family Titillium Web
    font-size 14px
    padding 0 0px 0 6px
    background #393939
    border-radius 10px
    color white


  .captain-indication:hover
    padding 0 12px 0 6px
  .captain-indication:hover .captain-indication-text
    display inline-block
  .captain-icon
    margin-right 4px
    display: inline-block;
    color white
  .captain-indication-text
    display none

  .input-text
    display inline-block
  .points
  .form-name
    margin-top 4px
    text-align center
  .name-label
  .points-value
  .points-label
    font-size 18px
    color #445F69
    font-weight bold
    font-family Titillium Web
  .name-label
  .points-label
    padding-right 15px
  .points-value
    font-weight bold
  .saldo
    float right
    position relative
    top 20px
    right 20px
  .saldo span
    color white


  .captain-band
    width: 41px;
    top: -6px;
    position: absolute;
    z-index: 400;
    left: -8px;

  @media screen and (max-width: 1023px)
    .player-list
      height calc(100vh - 310px)
      // height calc(100vh - 398px)
      // height calc(100vh - 509px)
    .empty-players
      height calc(100vh - 310px)
      // height calc(100vh - 398px)
      // height calc(100vh - 509px)
    .ground-container
      height calc(100vh - 309px)

  @media screen and (min-width: 1700px)
    .ground-container
      margin-top 50px
      height calc(100vh - 390px)


  @media screen and (max-width: 500px)
    .ground-container
      height calc(100vh - 310px)


  @media screen and (max-width: 500px)
    .header-title span
      font-size 12px
    .tab-text
      display none
    .tab
      width auto

    .line
      width 100%
      background #25BF89
      height 4px


  .players-layer
    position absolute
    top 0
    left 0
    right 0
    height 100%
    background rgba(241, 227, 255, 0.15)
  .defensa-section
  .portero-section
  .centrocampista-section
  .delantero-section
    display flex
    flex-wrap wrap
    height 60px
    justify-content center
    align-items center
    text-align center
  .portero-section
    margin-top: 30px;
    height 80px !important

  .centrocampista-section
    height 80px !important
    margin-left: 110px;
    margin-right: 110px;
  .defensa-section
    margin-left: 110px;
    margin-right: 110px;
  .delantero-section
    margin-left: 90px;
    margin-right: 90px;

  .portero-in-ground
  .centrocampista-in-ground
  .delantero-in-ground
  .defensa-in-ground
    flex-grow 1
  .close-icon
    position absolute
    display none
    top: -32px
    left: 200%
    width 27px
    height 27px
    cursor pointer
  .player-container
    position relative
  .player-container:hover .close-icon
    display block
  .player-info
    position absolute
    top: 20px
    left: 0
    transform: translateX(-25%);
    font-size 10px
    font-family Titillium Web

  .player-name
    white-space:nowrap;
    padding 3px 6px
    background white
    border-radius 8px

  .player-info div
    margin-bottom 4px
    width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  .soccer-ground
    position: relative;
  .fas
    margin-right 2px

  .soccer-ground-half
    display block
  .soccer-ground-full
    display none

  @media screen and (max-width: 1023px)
    .close-icon
      display block
    .soccer-ground-half
      display none
    .soccer-ground-full
      display block


  @media screen and (max-width: 600px)
    .centrocampista-section
      margin-left: 10px;
      margin-right: 10px;
    .defensa-section
      margin-left: 10px;
      margin-right: 10px;
    .delantero-section
      margin-left: 10px;
      margin-right: 10px;

  @media screen and (max-width: 500px)
    #new-team-card
      border-radius 0
    .header
      height 40px
    .header-title
      line-height 28px
    .saldo
      top 8px
    .tab
      width 50px
      font-size 12px

  @media screen and (max-width: 415px)
    .close-icon
      left: 20px

    .round-card
      overflow-x hidden
      overflow-y auto
    .ground-container
      overflow-x: hidden;
      width: 100%;
    .centrocampista-section
      height 80px !important

</style>
