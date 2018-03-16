<template>
    <div id="new-team-card" class="round-card rounded elevation">

      <div class="header elevation tabs">
        <div :class="['header-title']">
          <span class="">{{ team.date===''?'PON UN NOMBRE A TU EQUIPO':team.date }}</span>
        </div>
      </div>

      <div class="line elevation"></div>

      <div class="form-name">
        <!-- fa-shield-alt -->
        <input-text v-model="team.date"
                    width="360px"
                    solid class="input-text"
                    prepend-icon="fa-shield-alt"
                    placeholder="Nombre de tu equipo" big/>
      </div>
      <div class="points">
        <span class="points-label">Saldo restante:</span>
        <span class="points-value">{{saldo}} M</span>
      </div>
      <div class="progressbar">
        <progress-bar :current-number="saldo" :max-number="100" />
      </div>
      <div class="tabs-container">
        <button :class="['tab', 'elevation', activeTab===i?'activeTab':'inactiveTab', 'tab-'+i]"
                v-for="(tab, i) in tabs"
                @click="toggleTab(i)"
                :key="i+'-tab'">{{ tab }}</button>
      </div>

      <template v-if="tabs[activeTab] === 'LISTA'">

        <div
          v-if="team.players.goal_keeper.length === 0 && team.players.defender.length === 0 && team.players.mid_fielder.length === 0 && team.players.forward.length === 0"
          class="empty-players">
          Escoge jugadores!
        </div>
        <div v-else class="player-list">
          <player-row-card v-for="(player, key) in team.players.goal_keeper"
                           :key="key+'-arquero'"
                           mode="selected"
                           @onSelectCaptain="onSelectCaptain"
                           :captain-id="isCaptain"
                           :player="player"
                           position="ARQUERO"
                           @onPlayerSelected="deletePlayer(player, 'goal_keeper')"/>

          <player-row-card v-for="(player, key) in team.players.defender"
                           :key="key+'-defensa'"
                           @onSelectCaptain="onSelectCaptain"
                           :captain-id="isCaptain"
                           mode="selected"
                           :player="player"
                           position="DEFENSA"
                           @onPlayerSelected="deletePlayer(player, 'defender')"/>

          <player-row-card v-for="(player, key) in team.players.mid_fielder"
                           :key="key+'-centrocampista'"
                           @onSelectCaptain="onSelectCaptain"
                           :captain-id="isCaptain"
                           mode="selected"
                           :player="player"
                           position="CENTROCAMPISTA"
                           @onPlayerSelected="deletePlayer(player, 'mid_fielder')"/>

          <player-row-card v-for="(player, key) in team.players.forward"
                           :key="key+'-delantero'"
                           @onSelectCaptain="onSelectCaptain"
                           :captain-id="isCaptain"
                           mode="selected"
                           :player="player"
                           position="DELANTERO"
                           @onPlayerSelected="deletePlayer(player, 'forward')"/>
        </div>
      </template>

      <template v-else-if="tabs[activeTab] === 'FORMACION'">
        <div class="ground-container">
          <div style="text-align: center; overflow: hidden;" class="ground-container">
            <img src="/team_resources/cancha_4.png" alt="" class="soccer-ground" width="130%" height="140%">
            <!--<img src="../assets/img/cancha.png" alt="" width="100%">-->
          </div>
          <div class="players-layer" ref="playersLayer">
            <div class="portero-section">
              <div v-for="(player, key) in team.players.goal_keeper" :key="key+'-arquero2'" :player="player" class="portero-in-ground">
                <span class="player-container">
                  <squad-number ground :img="'http://api.bombo.pe/api/v2.0/shirts/' + player.team.toLowerCase().replace(' ','_')" :number="player.j_number"/>
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="20px" alt="" @click="deletePlayer(player, 'goal_keeper')">
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
                  <squad-number ground :img="'http://api.bombo.pe/api/v2.0/shirts/' + player.team.toLowerCase().replace(' ','_')" :number="player.j_number"/>
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="20px" alt="" @click="deletePlayer(player, 'defender')">
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
                  <squad-number ground :img="'http://api.bombo.pe/api/v2.0/shirts/' + player.team.toLowerCase().replace(' ','_')" :number="player.j_number"/>
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="20px" alt="" @click="deletePlayer(player, 'mid_fielder')">
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
                  <squad-number ground :img="'http://api.bombo.pe/api/v2.0/shirts/' + player.team.toLowerCase().replace(' ','_')" :number="player.j_number"/>
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="20px" alt="" @click="deletePlayer(player, 'forward')">
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
      shirtUrl () {
        const teamName = this.player.team.toLowerCase().replace(' ','_')
        return 'http://api.bombo.pe/api/v2.0/shirts/' + teamName
      },
      saldo () {
        let saldo = this.maxLimitCost - this.totalPoints
        return Math.round(saldo * 100) / 100
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
        activeTab: 0,
        tabs: ['LISTA', 'FORMACION'],
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
      onSelectCaptain (playerId) {
        this.isCaptain = playerId
        this.$emit()
      },
      deletePlayer (player, type) {
        let index = this.team.players[type].indexOf(player)
        if (index !== -1) {
          this.team.players[type].splice(index, 1)
        }
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

  .header span
    padding 0px 0px
  .tabs-container
    text-align: center;
    margin 8px 2px
  .tab
    background #243237
    border 0px solid white
    cursor pointer
    color white
    font-family Titillium Web
    font-size 14px
    outline none
    width: 92px;
  .tab-0
    border-top-left-radius 6px
    border-bottom-left-radius 6px
  .tab-1
    border-top-right-radius 6px
    border-bottom-right-radius 6px

  .activeTab
    color #fafafa
    background #243237
  .inactiveTab
    color #fafafa
    background #445F69

  .progressbar
    padding 4px 20px

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

  .line
    width 100%
    background #25BF89
    height 4px

  .empty-players
    padding 20px 5px
    font-family Titillium Web
    text-align center
    // height calc(45.5vh)

  .player-list
    margin-top 14px
    height calc(100vh - 457px)
    // height calc(45.5vh)
    /*height: 416px;*/
    /*height 363px*/
    overflow-y: auto;
  .input-text
    display inline-block
  .points
  .form-name
    margin-top 15px
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

  .ground-container
    padding 15px 15px
    position relative
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
    height 68px
    justify-content center
    align-items center
    text-align center
  .portero-section
    margin-top: 50px;

  .centrocampista-section
    height 100px !important
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
    top: -22px
    left: 76%
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
    left: -50px;
  @media screen and (max-width: 1023px)
    .close-icon
      display block
    .round-card
      width 100%
    /*.soccer-ground*/
      /*width 80%*/

  @media screen and (max-width: 415px)
    .close-icon
      left: 20px

    /*
    .soccer-ground
      width: 141%;
      position: relative;
      left: -43px;
    */
    .round-card
      overflow-x hidden
      overflow-y auto
    .ground-container
      overflow-x: hidden;
      width: 100%;
    .centrocampista-section
      height 80px !important

</style>
