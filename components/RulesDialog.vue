<template>
    <div id="select-league-dialog">
      <dialog-container @closeDialog="closeDialog" :fixed="false">
        <div class="elevation rounded card-container">
          <div class="card-header--primary header-content-center elevation">
            Reglas del juego
          </div>
          <div class="card-header-line elevation"></div>
          <div class="title-rule">
            Reglas:
          </div>

          <div class="content">

            <div class="rules">
              <ul>
                <li v-for="(item, i) in rules" :key="i+'-rule'">{{item}}</li>
              </ul>
            </div>
            <table>
              <thead>
              <tr>
                <th colspan="2">PUNTAJE DE CADA JUGADOR</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Gol (ARQ o DEF)</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Gol (MED)</td>
                <td>7</td>
              </tr>
              <tr>
                <td>Gol (DEL)</td>
                <td>6</td>
              </tr>
              <tr>
                <td>Asistencia</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Jugó el partido</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Jugó todo el partido</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Amarilla</td>
                <td>-1</td>
              </tr>
              <tr>
                <td>Roja</td>
                <td>-2</td>
              </tr>
              <tr>
                <td>Autogol</td>
                <td>-3</td>
              </tr>
              <tr>
                <td>Arco en 0 (DEF)</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Arco en 0 (ARQ)</td>
                <td>6</td>
              </tr>
              <tr>
                <td>Penal fallado</td>
                <td>-3</td>
              </tr>
              <tr>
                <td>Penal tapado</td>
                <td>4</td>
              </tr>
              </tbody>
            </table>
            <table>
              <thead>
              <tr>
                <th colspan="2">MULTIPLICADOR</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Ganó</td>
                <td>1.1</td>
              </tr>
              <tr>
                <td>Empató</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Perdió</td>
                <td>0.9</td>
              </tr>
              </tbody>
            </table>

            <!--<div class="tables">-->
            <!--</div>-->

          </div>
          <div class="content-2">
            Puntaje del jugador = Puntaje de cada jugador x Multiplicador <br>
            *Puntaje del capitán se multiplica x2
          </div>

        </div>
      </dialog-container>
    </div>
</template>

<script>
  import DialogContainer from './DialogContainer'

  export default {
    name: 'rules-dialog',
    components: {
      DialogContainer
    },
    data () {
      return {
        rules: [
          'Máximo de 3 jugadores del mismo equipo',
          'Solo un arquero',
          'Defensores: mínimo 3, máximo 5',
          'Centrocampista: mínimo 3, máximo 5',
          'Delanteros: mínimo 1, máximo 3',
          'Tienes que elegir a un capitán',
          'Total de 11 jugadores'
        ]
      }
    },
    methods: {
      closeDialog () {
        this.$store.state.createteam.rulesDialog = false
      },
    }
  }
</script>

<style scoped lang="stylus">
  .header-content-center
    height 50px
    line-height 50px
    text-align center
    background #243237
  .card-header--primary
    padding 0px 15px
    position relative
    font-size 24px
    font-weight bold
    border-radius: 10px 10px 0px 0px
  .card-header-line
    background #5657ea
  /*.content*/
    /*display flex*/
    /*flex-wrap wrap*/
    /*justify-content center*/

  .blurred
    filter blur(0.4)
  .card-container
    max-width 80vw
  .content
    max-height 80vh
    overflow-y auto
    padding 10px 20px 20px 20px

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: start;
  .content-2
    color #243237
    text-align center
    padding 10px 20px 20px 20px
    font-size 14px
  .content table
    color #243237
    padding 0 10px 0 10px
    font-size 14px

  .title-rule
    color #243237
    text-align center
    font-weight bold
    font-family Titillium Web
    font-size 22px
    padding 8px 20px

  .rules ul
    color #243237
    font-family Titillium Web
    /*list-style-type none*/
    /*padding-left 0*/
    font-size 14px
    padding 4px 40px
  .rules li
    padding-bottom 4px
  /*.tables*/
    /*text-align center*/
  /*.tables table*/
    /*display inline-block*/

  @media screen and (max-width: 1023px)
    .card-container
      min-width 300px
    .content
      max-height none
      height auto
      overflow-y auto

  @media screen and (max-width: 500px)
    .card-container
      max-width 100wv !important
      border-radius 0
    .card-container .card-header--primary
      border-radius: 0




</style>
