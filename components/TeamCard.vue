<template>
    <div id="round-card" class="elevation rounded">
      <div class="header" :style="{ background: typeColorCards[typeCard] }">
        <div :style="{ 'text-align': typeCard !== 'en_juego'?'center':'left' }">
          <span class="title" :style="{ 'text-align': typeCard !== 'en_juego'?'center':'left' }">{{ title }}</span>
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
      <div class="league-background">
        <img :src="leagueImg" alt="" width="100%">
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
      <p class="subheader selected-players-title">JUGADORES SELECCIONADOS</p>
      <div class="list-players-container">
        <player-row-card v-for="(item, i) in players.porteros" :key="i+'prc-portero'" mode="small-a" :player="item" position="ARQUERO"/>

        <player-row-card v-for="(item, i) in players.defensas" :key="i+'prc-defensa'" mode="small-a" :player="item" position="DEFENSA"/>

        <player-row-card v-for="(item, i) in players.centrocampistas" :key="i+'prc-centrocampista'" mode="small-a" :player="item" position="CENTROCAMPISTA"/>

        <player-row-card v-for="(item, i) in players.delanteros" :key="i+'prc-delantero'" mode="small-a" :player="item" position="DELANTERO"/>
      </div>

      <div class="bottom-button-container" v-if="typeCard !== 'en_juego'">
        <div class="button-play-again" v-if="typeCard === 'guardado'">
          JUEGA YA!
        </div>
        <div class="button-delete" v-if="typeCard === 'pasados'">
          Borrar
        </div>
        <div class="button-save" v-if="typeCard === 'pasados'">
          Guardar
        </div>
      </div>
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
      title: String,
      points: Number,
      leagueImg: String,
      createdAt: String,
      ranking: Number,
      players: Object,
      cost: String,
      status: String
    },
    data () {
      return {
        isFavoriteSaved: true,
        typeColorCards: {
          en_juego: '#EA504C',
          guardado: '#25BF89',
          pasados: '#67A6F0'
        }
      }
    },
    methods: {
      toggleFavorite() {
        this.isFavoriteSaved = !this.isFavoriteSaved
      }
    }
  }
</script>

<style scoped lang="stylus">
#round-card
  width 240px
  height 64vh
  overflow hidden
  background #fafafa
  margin-left 24px
  margin-right 24px
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
  height 58px
  background #8d82fa
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

.list-players-container
  height 200px
  overflow-y: auto
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
.button-play-again
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
  display inline-block
  padding 4px 28px 4px 28px
  color #FAFAFA
  font-weight bold
  font-family Titillium Web
  font-size 14px
  background #25BF89
  border-radius 12px
.button-delete
  display inline-block
  margin-right 12px
  padding 4px 12px 4px 12px
  color #FAFAFA
  font-weight bold
  font-family Titillium Web
  font-size 14px
  background #FFC400
  border-radius 12px

</style>
