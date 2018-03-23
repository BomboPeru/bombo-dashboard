<template>
  <div id="index">
    <div class="header">
      <div class="grid-container">

        <div class="phrase-container">
          <p class="phrase">
            TE BRINDAMOS UNA <span class="highlight">JUGADA GRATIS</span> POR EL PRIMER DEPOSITO!
          </p>
        </div>
        <div class="phrase-2-container">
          <p class="phrase-2">
            ARMA TU ONCE IDEAL EN BOMBO DE LA PREMIER LEAGUE Y COMPITE CONTRA OTROS
          </p>
        </div>
        <div class="phrase-3-container">
          <p class="phrase-3">
            El rendimiento de los once que elijas te hará ganar
          </p>
        </div>
        <div class="phrase-4-container">
          <div class="btn-login"  @click="goToLogin">
            COMIENZA A GANAR
          </div>
        </div>

        <div class="player-container">
          <img src="/landing/player_2x.png" alt="" class="player">
        </div>

      </div>
    </div>

    <div class="section">
      <p class="text-bg">GANA HASTA 20 VECES</p>
      <div class="blue-bar"></div>
      <p class="text-md">los 35 primeros ganan</p>

    </div>
  </div>
</template>

<script>

  export default {
    // layout: 'dashboard',
    methods: {
      goToLogin() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped lang="stylus">

  @font-face {
    font-family 'Campton Bold Demo'
    src url(/Campton-BoldDEMO.otf)
  }
  @font-face {
    font-family 'Campton Light Demo'
    src url(/Campton-LightDEMO.otf)
  }

  #index
    font-family: Titillium Web;
  .header
    margin-top -76px
    height 90vh
    background: #F3F5FC
  .grid-container
    display grid
    grid-template-columns 50% 50%
    grid-template-rows auto auto auto auto
    width 100%

  .player-container
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1
    grid-row-end: 5
  .phrase-container
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1
    grid-row-end: 2
  .phrase-2-container
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2
    grid-row-end: 3
  .phrase-3-container
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3
    grid-row-end: 4
  .phrase-4-container
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 4
    grid-row-end: 5


  .phrase
    width 300px
    display inline-block
    text-align center
    font-size 32px
    font-family 'Campton Bold Demo'
  .phrase-2
    font-size 32px
    font-family 'Campton Light Demo'
  .phrase-3
    font-weight: bold
    font-family Raleway
    font-size 32px


  .player-container
    text-align center
  .player
    width 64%



  @media screen and (min-width: 1300px)
    .player
      width 50%
      position relative
      top 200px
      left 50px

  .player-container
    height: 100%;
    overflow-y: hidden;

  .highlight
    color #01E19F
    font-weight: bold;

  .btn-login
    color white
    font-family 'Nunito Sans'
    cursor pointer
    padding-left 15px
    font-weight bold
    height 42px
    line-height 42px
    background #FE5567
    width 200px
    border-radius 40px
    box-shadow: 0 15px 20px 0 rgba(0,0,0,0.32);

  .arrow
    position relative
    top 1px
    left 8px
  .arrow img
    width 12px

  .section
    padding-top 30px
    padding-bottom 30px
  .text-md
  .text-bg
    font-family Raleway
    text-align center
    text-transform uppercase
    color #484848
  .text-bg
    font-size 24px
  .text-md
    font-size 16px
  .blue-bar
    margin 20px 0
    width 80px
    height 10px
    background #30DADF
    border-radius 10px
    position relative
    top 0
    left 50%
    transform translateX(-50%)

  @media screen and (max-width: 1200px) and (min-width: 801px)
    .header
      height 80vh
    .content-container
      right 0%
    .player
      top 40%


  @media screen and (max-width: 800px)
    .header
      height 70vh

    .player-container
      display none
    .content-container
      top 350px
      left 0
      width: 100%;
      padding-right 0
      // transform translateX(-50%) translateY(-50%)
    .phrase
      font-size 18px
      margin-bottom 40px
      text-align: center;
      padding: 4px 30px;
    .highlight
      display block
    .btn-login
      position: relative;
      left: 50%;
      transform: translateX(-50%);
</style>
