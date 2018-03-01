<template>
    <div id="new-team-card" class="round-card rounded elevation">

      <div class="header elevation tabs desktop">
        <div v-for="(item, i) in tabs" :key="i"
             @click="toggleTab(i)"
             :class="['tab', activeTab === i ?'':'inactive-tab']">
          <span class="">{{ item }}</span>
        </div>
      </div>
      <div class="header elevation tabs mobile">
        <div :class="['tab']">
          <span class="">{{ tabs[activeTab] }}</span>
        </div>
      </div>


      <div class="line elevation"></div>

      <template v-if="tabs[activeTab] === 'LISTA'">
        <div class="form-name">
          <span class="name-label">Nombre</span>
          <input-text v-model="team.name" width="200px" class="input-text"
                      placeholder="Nombre de tu equipo"/>
        </div>
        <div class="points">
          <span class="points-label">Costo Acumulado</span>
          <span class="points-value">{{totalPoints}} M</span>
        </div>

        <div
          v-if="team.players.goal_keeper.length === 0 && team.players.defender.length === 0 && team.players.mid_fielder.length === 0 && team.players.forward.length === 0"
          class="empty-players">
          Escoge jugadores!
        </div>
        <div v-else class="player-list">
          <player-row-card v-for="(player, key) in team.players.goal_keeper"
                           :key="key+'-arquero'"
                           mode="selected"
                           :player="player"
                           position="ARQUERO"
                           @onPlayerSelected="deletePlayer(player, 'goal_keeper')"/>

          <player-row-card v-for="(player, key) in team.players.defender"
                           :key="key+'-defensa'"
                           mode="selected"
                           :player="player"
                           position="DEFENSA"
                           @onPlayerSelected="deletePlayer(player, 'defender')"/>

          <player-row-card v-for="(player, key) in team.players.mid_fielder"
                           :key="key+'-centrocampista'"
                           mode="selected"
                           :player="player"
                           position="CENTROCAMPISTA"
                           @onPlayerSelected="deletePlayer(player, 'mid_fielder')"/>

          <player-row-card v-for="(player, key) in team.players.forward"
                           :key="key+'-delantero'"
                           mode="selected"
                           :player="player"
                           position="DELANTERO"
                           @onPlayerSelected="deletePlayer(player, 'forward')"/>
        </div>
      </template>
      <template v-else-if="tabs[activeTab] === 'FORMACION'">
        <div class="ground-container">
          <div>
            <img src="../assets/img/cancha.png" alt="" width="100%">
          </div>
          <div class="players-layer" ref="playersLayer">
            <div class="portero-section">
              <div v-for="(player, key) in team.players.goal_keeper" :key="key+'-arquero2'" :player="player" class="portero-in-ground">
                <span class="player-container">
                  <squad-number ground :number="player.j_number"/>
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="20px" alt="" @click="deletePlayer(player, 'goal_keeper')">
                  </div>
                  <div class="player-info">
                    <div><span class="player-name">{{ player.name }}</span></div>
                    <div><span>{{ player.player_age }}</span></div>
                  </div>
                </span>
              </div>
            </div>
            <div class="defensa-section">
              <div v-for="(player, key) in team.players.defender" :key="key+'-defensa2'" :player="player" class="defensa-in-ground">
                <span class="player-container">
                  <squad-number ground :number="player.j_number"/>
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="20px" alt="" @click="deletePlayer(player, 'defender')">
                  </div>
                  <div class="player-info">
                    <div><span class="player-name">{{ player.name }}</span></div>
                    <div><span>{{ player.player_age }}</span></div>
                  </div>

                </span>
              </div>
            </div>
            <div class="centrocampista-section">
              <div v-for="(player, key) in team.players.mid_fielder" :key="key+'-centrocampista2'" :player="player" class="centrocampista-in-ground">
                <span class="player-container">
                  <squad-number ground :number="player.j_number"/>
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="20px" alt="" @click="deletePlayer(player, 'mid_fielder')">
                  </div>
                  <div class="player-info">
                    <div><span class="player-name">{{ player.name }}</span></div>
                    <div><span>{{ player.player_age }}</span></div>
                  </div>

                </span>
              </div>
            </div>
            <div class="delantero-section">
              <div v-for="(player, key) in team.players.forward" :key="key+'-delantero2'" :player="player" class="delantero-in-ground">
                <span class="player-container">
                  <squad-number ground :number="player.j_number"/>
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="20px" alt="" @click="deletePlayer(player, 'forward')">
                  </div>
                  <div class="player-info">
                    <div><span class="player-name">{{ player.name }}</span></div>
                    <div><span>{{ player.player_age }}</span></div>
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

  // TO DO SAVE TEAM
  export default {
    name: 'new-team-card',
    components: {
      PlayerRowCard, InputText, SquadNumber
    },
    props: {
      team: Object
    },
    computed: {
      // IN A SYSTEM WHERE THE THIRD TAB TURNS INTO THE FIRST ONE
      activeTab: {
        get () {
          if (this.$store.getters['createteam/activeTabView'] === 0) {
            return 0
          } else {
            return this.$store.getters['createteam/activeTabView'] - 1
          }
        },
        set (i) {
          this.$store.commit('createteam/setActiveTabView', i + 1)
        }
      },
      totalPoints () {
        let total = 0

        console.log(this.team.players)
        this.team.players['goal_keeper'].map((item) => {
          item.j_number = ''+item.j_number
          total+= (item.cost)
        })

        this.team.players['defender'].map((item) => {
          item.j_number = ''+item.j_number
          total+= (item.cost)
        })

        this.team.players['mid_fielder'].map((item) => {
          item.j_number = ''+item.j_number
          total+= (item.cost)
        })

        this.team.players['forward'].map((item) => {
          item.j_number = ''+item.j_number
          total+= (item.cost)
        })

        total = Math.round(total * 100)/100

        return total
      }
    },
    data () {
      return{
        // activeTab: 0,
        tabs: ['LISTA', 'FORMACION'],
        title: 'MI EQUIPO',
        teamName: ''
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
    width 400px
    max-height calc(100vh - 200px)
    overflow auto
    background #fafafa
  .header
    width 100%
    height 50px
    background #445F69
    padding 0px 0px
  .header span
    padding 0px 0px
  .tabs
    display flex
    justify-content space-between
  .inactive-tab
    background #243237
  .tab
    flex-grow 1
    display inline-block
    height 100%
    line-height 34px
    padding 8px 15px
    cursor pointer
  .tab:hover
    background #445F69

  .tab span
    text-align left
    color white
    font-size 18px
    font-weight bold
    font-family Titillium Web
  .line
    width 100%
    background #25BF89
    height 8px

  .empty-players
    margin 20px 5px
    font-family Titillium Web
    text-align center
    height calc(100vh - 450px)

  .player-list
    margin-top 14px
  .input-text
    display inline-block
  .points
  .form-name
    text-align center
  .name-label
  .points-value
  .points-label
    font-size 18px
    color #445F69
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
  .centrocampista-section
    height 100px !important
  .defensa-section
    margin-left 90px
    margin-right 90px
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

  .desktop
    display flex
  .mobile
    display none
    text-align left
  @media screen and (max-width: 1023px)
    .close-icon
      display block
    .round-card
      width 100%
    .desktop
      display none
    .mobile
      text-align center
      display flex

</style>
