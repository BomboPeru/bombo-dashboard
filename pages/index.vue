<template>
  <div id="index">
    <div class="header">
      <div class="background">
        <img src="/landing/background_landing_2x.png" alt="">
      </div>
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

    <div class="first section padding-section">
      <div class="svg">
        <svg
              width="100%"
              height="800px"
              version="1.1"
              preserveAspectRatio="none"
              viewBox="0 0 100 100">
          <polygon points="0,0 40,50 0,150" style="fill: rgba(120,183,249,0.12); stroke-linejoin: round;"></polygon>
        </svg>
      </div>
      <div class="cards-container">

        <div class="card-1 card">
          <div class="card-img-container">
            <img src="/landing/registrate_2x.png" alt="">
          </div>
          <div class="title-card">REGISTRATE</div>
          <div class="text-card">Entra a crearte una cuenta en esta página, es gratuito.</div>
        </div>
        <div class="card-2 card">
          <div class="card-img-container">
            <img src="/landing/jugadores_2x.png" alt="">
          </div>
          <div class="title-card"> ARMA TU <span class="once">11</span> IDEAL</div>
          <div class="text-card">Es gratuito armar tus equipos prueba todas las combinaciones que quieras</div>
        </div>
        <div class="card-3 card">
          <div class="card-img-container">
            <img src="/landing/copa_2x.png" alt="">
          </div>
          <div class="title-card">COMPITE</div>
          <div class="text-card">Con los equipos que más prefieras compite
            fecha por fecha y gana premios en efectivo (ganan los primeros 50).</div>
        </div>
      </div>
    </div>

    <div class="section online-section padding-section">
      <div class="online-title">
        <span class="ball"></span> JUGANDO AHORA MISMO
      </div>
      <div class="online-grid">
        <div class="online-table">

        </div>
        <div class="online-text">
          <p>Muchos de nuestros usuarios están jugando ahora mismo,
            que esperas para ser el siguiente, ademas recuerda que por esta semana <span class="highlight">tu primera compra viene con una jugada gratis!</span></p>
          <div class="img-online">
            <img src="/landing/quality_2x.png" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="section padding-section">
      <div class="premier-league-title">
        <p>
          CUBRIMOS LA PREMIER LEAGUE Y EL MUNDIAL
        </p>
      </div>
    </div>

    <div class="section padding-section">
      <div class="premier-league-content">
        <div class="premier-logo">
          <img src="/landing/premier_2x.png" alt="">
        </div>
        <div class="premier-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do ei
          smod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
    </div>

    <div class="section plans-section padding-section">
      <div class="plans-content">
        <div class="plans-title">
          <p>
            NUESTROS COSTOS Y PLANES
          </p>
        </div>
        <div class="plans-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </p>
        </div>
        <div class="cc-container">
          <img src="/payment/b_card_copy_4.png" class="b-card-1" alt="">
          <img src="/payment/b_card_copy_3.png" class="b-card-2" alt="">
          <img src="/payment/b_card_copy_2.png" class="b-card-3" alt="">
          <img src="/payment/b_card.png" class="b-card-4" alt="">
        </div>
      </div>
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
  .background
    position absolute
    top 0
    right 0
    z-index 1
  .background img
    width 100%

  .header
    margin-top -92px
    height 90vh
    background: white
    position relative
    z-index 1
  .grid-container
    display grid
    grid-template-columns 50% 50%
    grid-template-rows auto auto auto auto
    width 100%
    position relative
    z-index 4

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
  .phrase-2
  .phrase-3
    color #131251

  .phrase-container
    text-align: center;
    display: inline-block;
    align-self: end;

  .phrase
    width 85%
    display inline-block
    text-align center
    font-size: 42px;
    font-family 'Campton Bold Demo'

  .phrase-2-container
    text-align: center;
    display: inline-block;
    align-self: end;
  .phrase-2
    width 70%
    display inline-block
    font-size 22px
    font-family 'Campton Light Demo'
  .phrase-3-container
    text-align: center;
    display: inline-block;
    align-self: center;
  .phrase-3
    width 60%
    display inline-block
    text-align center
    font-weight 500
    font-family Raleway
    font-size 24px
  .phrase-4-container
    justify-self center
    align-self start
    display inline-block


  .cards-container
    display flex
    flex-wrap wrap
    justify-content center

  .card
    margin 8px
    position relative
    z-index 4
    background white
    display grid
    grid-template-columns 100%
    grid-template-rows 120px 80px 100px
    width 300px
    height 360px
    border-radius: 11px;
    box-shadow: 0 0 42px 0 rgba(222,227,255,0.60);
    padding 10px 10px

  .player-container
    text-align center
  .player
    width 64%
  .first
    margin-top 150px

  .section
    position relative
  .padding-section
    padding: 0 133px;

  .svg
    position absolute
    z-index: 3;
    top -100px
    left 0
    width 100%

  .card-img-container
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1
    grid-row-end: 2
  .title-card
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2
    grid-row-end: 3
  .text-card
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 3
    grid-row-end: 4

  .title-card
  .text-card
    color #131251
    text-align center
  .title-card
    align-self center
    font-size 28px
    font-family 'Campton Bold Demo'
  .text-card
    padding 4px 15px
    align-self center
    font-size 16px
    font-family Raleway
  .once
    color #01E19F
  .card-img-container
    align-self end
    text-align center
  .card-img-container img
    height 100px


  .premier-league-title
  .plans-title
  .online-title
    font-size 42px
    color #131251
    font-family 'Campton Bold Demo'

  .plans-section
    height 1000px

  .ball
    display inline-block
    width 20px
    height 20px
    background #FE5567
    border-radius 20px
    position relative
    top -4px

  .online-section
    margin-top 150px
    height: 700px;

  .online-grid
    display grid
    width 100%
    grid-template-columns 50% 50%
    grid-template-rows: 500px
  .online-table
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1
    grid-row-end: 2
  .online-text
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1
    grid-row-end: 2
    width 60%
    display inline-block
    font-family Raleway
    align-self center
    justify-self center
  .online-text  p
    text-align center
  .img-online
    margin-top 40px
    text-align center
  .img-online img
    height 120px

  .premier-league-title
    text-align right
  .premier-league-title p
    width 50%
    display inline-block
  .premier-league-content
    display flex
    flex-wrap wrap
    justify-content space-around
    align-items center
    height 600px
  .premier-logo
    display inline-block
    text-align center
  .premier-logo img
    height 200px
  .premier-text
    display inline-block
    text-align center
    width 350px
    color #131251
    font-family Raleway

  .plans-title
    text-align left
  .plans-title p
    width 50%
    display inline-block
  .plans-text
    height 400px
    text-align center
    display flex
    justify-content center
    align-items center
  .plans-text p
    display inline-block
    width 70%
    font-family Raleway
    font-size 18px
    color #010045
  .cc-container img
    width 250px
  .b-card-1
    position relative
    z-index 9
    right -150px
  .b-card-2
    position relative
    z-index 8
    top -60px
    right -20px
  .b-card-3
    left -80px
    z-index 7
    position relative
  .b-card-4
    z-index 8
    top -60px
    left -150px
    position relative


  .player-container
    height: 100%;

  .highlight
    color #01E19F
    font-weight: bold;

  .btn-login
    color white
    font-family 'Nunito Sans'
    cursor pointer
    padding-left 15px
    font-weight bold
    height 50px
    line-height 50px
    background #FE5567
    width 200px
    border-radius 50px
    box-shadow: 0 12px 20px 0 rgba(0,0,0,0.42)

  .arrow
    position relative
    top 1px
    left 8px
  .arrow img
    width 12px

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



  @media screen and (min-width: 1500px)
    .grid-container
      width 80%
      margin 0 10%
      padding-top 10%
    .player
      width 50%
      position relative
      top 50px
      left 50px
    .first
      margin-top 50px
    .card
      margin 10px 30px
    .padding-section
      padding: 0 20%;

  @media screen and (max-width: 1023px)
    .player-container
      display none

    .grid-container
      display grid
      grid-template-columns 100%
      grid-template-rows 150px 150px 150px auto

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
    .header
      height auto
    .plans-title p
    .premier-league-title p
      display block
      width 100%
      text-align center
    .plans-section
      height 600px

    .plans-text
      height 300px
    .cc-container img
      width 150px
    .b-card-1
      right -90px
    .b-card-2
      top -30px
      right -20px
    .b-card-3
      left -20px
    .b-card-4
      top -30px
      left -50px


  @media screen and (max-width: 800px)
    .player-container
      display none

    .phrase
      font-size 32px
    .highlight
      display block
    .btn-login
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    .padding-section
      padding: 0 20px;

  @media screen and (max-width: 500px)
    .grid-container
      padding-top 40px

    .cc-container
      text-align center
    .b-card-1
    .b-card-2
    .b-card-3
    .b-card-4
      top 0
      left 0
      right 0
    .online-grid
      width 100%
      grid-template-columns 100%
      grid-template-rows: 50% 50%
    .online-table
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1
      grid-row-end: 2
    .online-text
      margin-top 40px
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 2
      grid-row-end: 3
      width 60%
    .premier-league-title
    .plans-title
    .online-title
      font-size 28px
      text-align center
    .ball
      top 0px

  @media screen and (max-width: 360px)
    .phrase
      font-size 22px
    .phrase-2
      font-size 16px
    .phrase-3
      font-size 16px




</style>
