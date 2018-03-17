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
          <div class="rules">
            <ul>
              <li v-for="(item, i) in rules" :key="i+'-rule'">{{item}}</li>
            </ul>
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
  .content ul
    list-style-type none
  .content ul
    padding-left 37px
    padding-right 37px
    padding-top: 19px
    padding-bottom 19px
    text-align center

  .card-league
    overflow hidden
    cursor pointer
    background #fafafa
    width 250px
    /*height 200px*/
    height 122px
    display inline-block
    position relative
    margin 5px 5px
  .blurred
    filter blur(0.4)
  .card-league img
    width 250px
  .card-container
    max-width 820px
    max-height 80vh
    overflow-y auto

  @media screen and (max-width: 1023px)
    .card-league
      width 80px
      height 50px
    .card-league img
      width 80px
    .card-container
      max-width 300px

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
    font-size 18px
    padding 8px 40px
  .rules li
    padding-bottom 4px

</style>
