<template>
    <div id="new-team-card" class="round-card rounded elevation">
      <div class="header elevation tabs">
        <div v-for="(item, i) in tabs" :key="i"
             @click="toggleTab"
             :class="['tab', activeTab === i ?'':'inactive-tab']">
          <span class="">{{ item }}</span>
        </div>
      </div>

      <div class="line elevation"></div>

      <template v-if="tabs[activeTab] === 'LISTA'">
        <div class="form-name">
          <span class="name-label">Nombre</span>
          <input-text v-model="teamName" width="200px" class="input-text"
                      placeholder="Nombre de tu equipo"/>
        </div>
        <div class="points">
          <span class="points-label">Costo Acumulado</span>
          <span class="points-value">{{points}}</span>
        </div>

        <div
          v-if="team.porteros.length === 0 && team.defensas.length === 0 && team.centrocampistas.length === 0 && team.delanteros.length === 0"
          class="empty-players">
          Escoge jugadores!
        </div>
        <div v-else class="player-list">
          <player-row-card v-for="(player, key) in team.porteros" :key="key+'-arquero'" :player="player" position="ARQUERO"/>

          <player-row-card v-for="(player, key) in team.defensas" :key="key+'-defensa'" :player="player" position="DEFENSA"/>

          <player-row-card v-for="(player, key) in team.centrocampistas" :key="key+'-centrocampista'" :player="player" position="CENTROCAMPISTA"/>

          <player-row-card v-for="(player, key) in team.delanteros" :key="key+'-delantero'" :player="player" position="DELANTERO"/>
        </div>
      </template>
      <template v-else-if="tabs[activeTab] === 'FORMACION'">
        <div class="ground-container">
          <div>
            <img src="../assets/img/cancha.png" alt="" width="100%">
          </div>
          <div class="players-layer" ref="playersLayer">
            <div class="portero-section">
              <div v-for="(player, key) in team.porteros" :key="key+'-arquero2'" :player="player" class="portero-in-ground">
                <span class="player-container">
                  <img src="../assets/icons/shirt.svg" width="27px" alt="">
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="20px" alt="" @click="deletePlayer(player, 'porteros')">
                  </div>
                </span>
              </div>
            </div>
            <div class="defensa-section">
              <div v-for="(player, key) in team.defensas" :key="key+'-defensa2'" :player="player" class="defensa-in-ground">
                <span class="player-container">
                  <img src="../assets/icons/shirt.svg" width="27px" alt="">
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="20px" alt="" @click="deletePlayer(player, 'defensas')">
                  </div>
                </span>
              </div>
            </div>
            <div class="centrocampista-section">
              <div v-for="(player, key) in team.centrocampistas" :key="key+'-centrocampista2'" :player="player" class="centrocampista-in-ground">
                <span class="player-container">
                  <img src="../assets/icons/shirt.svg" width="27px" alt="">
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="20px" alt="" @click="deletePlayer(player, 'centrocampistas')">
                  </div>
                </span>
              </div>
            </div>
            <div class="delantero-section">
              <div v-for="(player, key) in team.delanteros" :key="key+'-delantero2'" :player="player" class="delantero-in-ground">
                <span class="player-container">
                  <img src="../assets/icons/shirt.svg" width="27px" alt="">
                  <div class="close-icon">
                    <img src="../assets/icons/close_ground.svg" width="20px" alt="" @click="deletePlayer(player, 'delanteros')">
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

  export default {
    name: 'new-team-card',
    components: {
      PlayerRowCard, InputText
    },
    props: {
      team: Object
    },
    data () {
      return{
        activeTab: 0,
        tabs: ['LISTA', 'FORMACION'],
        title: 'MI EQUIPO',
        teamName: '',
        points: 0
      }
    },
    methods: {
      toggleTab () {
        if (this.tabs.length === (this.activeTab + 1)) {
          this.activeTab = 0
        } else {
          this.activeTab++
        }
      },
      deletePlayer (player, type) {
        let index = this.team[type].indexOf(player)
        if (index !== -1) {
          this.team[type].splice(index, 1)
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
    width 700px
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
    height calc(100vh - 400px)

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
    height 100px
    justify-content center
    align-items center
    text-align center
  .centrocampista-section
    height 200px !important
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
</style>
