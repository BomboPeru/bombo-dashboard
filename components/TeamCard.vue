<template>
    <div id="round-card" class="elevation rounded" :style="{ 'padding-bottom': collapsable?'0px':'5px', 'width': width }">
      <div class="header" :style="{ background: typeColorCards[typeCard] }">
        <div :style="{ 'text-align': typeCard !== 'en_juego'?'center':'left' }">
          <span class="title" :style="{ 'text-align': typeCard !== 'en_juego'?'center':'left' }">{{ team.name }}</span>
          <span class="right" v-if="typeCard === 'en_juego'">{{ points }}</span>
          <span class="right guardados" v-if="typeCard === 'guardado'">
            <template v-if="isFavoriteSaved">
              <img src="../assets/icons/star_on.png" alt="" @click="toggleFavorite">
            </template>
            <template v-else>
              <img src="../assets/icons/star_off.png" alt="" @click="toggleFavorite">
            </template>
          </span>
          <!--<span class="right pasados" v-if="typeCard === 'pasados'">{{ points }}</span>-->
        </div>
      </div>
      <div class="league-background" style="padding-top: 10px;">
        <img :src="'/leagues/premier_league.png'" alt="" height="100px">
      </div>
      <p class="created-at subheader">FECHA DE CREACION: {{ createdAt }}</p>
      <div class="table-container">
        <table class="table-points-ranking" v-if="typeCard === 'en_juego' || typeCard === 'pasados'">
          <tbody>
            <tr>
              <td>PUESTO EN EL BOMBO:</td>
              <td class="table-value">{{ranking}}</td>
            </tr>
            <tr>
              <td>PUNTAJE ACUMULADO:</td>
              <td class="table-value">{{points}}</td>
            </tr>
          </tbody>
        </table>
        <table class="table-saved-card" v-if="typeCard === 'guardado'">
          <tbody>
            <tr>
              <td>COSTO PROMEDIO:</td>
              <td class="table-value-cost">{{cost}}</td>
            </tr>
            <tr>
              <td>ESTADO EN EL EQUIPO:</td>
              <td class="table-value-status">
                <span>{{status}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="divider"></div>
      <!-- COLLAPSABLE -->
      <template v-if="collapsable">
        <div v-if="!isCollapsed" class="btn-expand" @click="expand">
          M&Aacute;S DETALLES
        </div>
      </template>
      <template v-if="collapsable === false || isCollapsed === true">
        <p class="subheader selected-players-title">JUGADORES SELECCIONADOS</p>
        <!-- PLAYERS -->
        <div>
          <div :class="['list-players-container', typeCard === 'guardado'||typeCard === 'pasados'?'list-players-container-b':'']">
            <player-row-card v-for="(item, i) in players" :key="i+'prc-player'" mode="small-a" :player="item" :position="playerPositions[item.position]"/>

            <!--<player-row-card v-for="(item, i) in players.goal_keeper" :key="i+'prc-portero'" mode="small-a" :player="item" position="ARQUERO"/>-->

            <!--<player-row-card v-for="(item, i) in players.defender" :key="i+'prc-defensa'" mode="small-a" :player="item" position="DEFENSA"/>-->

            <!--<player-row-card v-for="(item, i) in players.mid_fielder" :key="i+'prc-centrocampista'" mode="small-a" :player="item" position="CENTROCAMPISTA"/>-->

            <!--<player-row-card v-for="(item, i) in players.forward" :key="i+'prc-delantero'" mode="small-a" :player="item" position="DELANTERO"/>-->
          </div>
        </div>

        <div class="bottom-button-container" v-if="typeCard !== 'en_juego'">
          <div class="button-play-again" v-if="typeCard === 'guardado'" @click="putInGameTeam(team)">
            JUEGA YA!
          </div>
          <div class="button-delete" v-if="typeCard === 'pasados'">
            Borrar
          </div>
          <div class="button-save" v-if="typeCard === 'pasados'">
            Guardar
          </div>
        </div>
      </template>
      <template v-if="collapsable">
        <div v-if="isCollapsed" class="btn-expand" @click="collapse">
          MINIMIZAR
        </div>
      </template>


    </div>
</template>

<script>
  import PlayerRowCard from './PlayerRowCard'

  export default {
    name: 'card',
    components: {
      PlayerRowCard
    },
    props: {
      typeCard: {
        type: String,
        default: 'en_juego'
      },
      team: Object,
      id: String,
      title: String,
      points: Number,
      leagueImg: String,
      createdAt: String,
      ranking: Number,
      players: Array,
      cost: String,
      status: String,
      collapsable: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: '420px'
      }
    },
    data () {
      return {
        isCollapsed: false,
        isFavoriteSaved: true,
        playerPositions: {
          'goal_keeper':'ARQUERO',
          'defender':'DEFENSA',
          'mid_fielder':'CENTROCAMPISTA',
          'forward':'DELANTERO'
        },
        typeColorCards: {
          en_juego: '#EA504C',
          guardado: '#25BF89',
          pasados: '#67A6F0'
        }
      }
    },
    created () {
      if (this.collapsable === true) {
        this.isCollapsed = false
      }
    },
    methods: {
      toggleFavorite() {
        this.isFavoriteSaved = !this.isFavoriteSaved
      },
      expand () {
        this.isCollapsed = true
      },
      collapse () {
        this.isCollapsed = false
      },
      async putInGameTeam (team) {
        this.$store.state.team.selectedLeague = team.league_id
        this.$store.state.team.teamNameToMakePlay = team.name
        this.$store.commit('team/turnOnSelectTimeDialog')
      }
    },
    mounted () {
    }
  }
</script>

<style scoped lang="stylus">
#round-card
  /*width 240px*/
  /*width 350px*/
  width 420px
  flex-grow 1
  /*height 64vh*/
  overflow hidden
  background #fafafa
  /*margin-left 24px*/
  /*margin-right 24px*/

  /*height: 72%;*/
  /*padding-bottom: 12px;*/

/*
.rounded
  border-radius 10px
.elevation
  box-shadow 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
  */
.header
  width 100%
  height 38px
  background #fff
  padding 10px 0px
.header div
  padding 0px 18px
.title
  text-align left
  color white
  font-size 12px
  font-weight bold
  font-family Titillium Web
  text-transform uppercase
  text-overflow: ellipsis;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  width: 150px;
.right
  float right
  color white
  font-size 12px
  font-weight bold
  font-family Titillium Web
  text-transform uppercase
.guardados
  margin-top 2px
  margin-right -4px
  cursor pointer
.league-background
  width 100%
  height 128px
  background #fafafa
  text-align center
.subheader
  font-size 10px
  color #A6A6A6
  font-family Titillium Web
  text-align center
.created-at
  margin-top 6px
.selected-players-title
  margin-top 6px

.table-container
  text-align center
  font-family Titillium Web
  font-size 12px
.table-saved-card
.table-points-ranking
  margin-left auto
  margin-right auto
.table-saved-card
  font-size 10px
.table-value
  font-weight bold
  color #25BF89
  text-align center
.table-value-cost
  text-align center
.table-value-status span
  text-align center
  font-weight bold
  font-size 8px
  border-radius 6.5px
  color white
  background #25BF89
  padding-top 1px
  padding-bottom 1px
  padding-left 10px
  padding-right 10px

.divider
  margin-top 8px
  height 0px
  border 1px solid #E8E8E8
  width 90%
  position: relative
  left: 50%
  transform: translateX(-50%)

//  NOTE: MANAGED TO BE FILL THE HEIGHT AND STILL BE RESPONSIVE
//  STILL MUTABLE
.list-players-container
  // height 200px
  height calc(100vh - 450px)
  //height calc(100vh - 500px)
  /*height 40vh*/
  overflow-y: auto
.list-players-container-b
  height calc(100vh - 500px) !important

@media screen and (max-width: 1023px)
  #round-card
    min-width 300px
    height 64vh
    overflow hidden
    background #fafafa
    margin-left 10px
    margin-right 8px
  .list-players-container
    overflow-y: scroll
    height: 50%

@media screen and (max-width: 500px)
  #round-card
    min-width 90%

.bottom-button-container
  display flex
  justify-content space-around
  padding-left 15px
  padding-right 15px
  padding-bottom 9px
  padding-top 22px
  height 67px
  line-height 27px
.button-play-again
  cursor pointer
  display inline-block
  padding 4px 20px 4px 20px
  color #FAFAFA
  font-weight bold
  font-family Titillium Web
  font-size 18px
  background #EA504C
  border-radius 12px
.button-save
  float right
  text-align center
  display inline-block
  padding 4px 28px 4px 28px
  color #FAFAFA
  font-weight bold
  font-family Titillium Web
  font-size 14px
  background #25BF89
  border-radius 12px
  flex-grow 2
.button-delete
  display inline-block
  text-align center
  margin-right 12px
  padding 4px 12px 4px 12px
  color #FAFAFA
  font-weight bold
  font-family Titillium Web
  font-size 14px
  background #FFC400
  border-radius 12px
  flex-grow 1

.btn-expand
  background #445F69
  border-radius: 0px 0px 12px 12px;
  height 30px
  font-family Titillium Web
  text-align center
  color white
  font-size 14px
  line-height 30px
  cursor pointer
</style>
