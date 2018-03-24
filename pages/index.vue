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
          <div class="text-card">Entra y registrate. No pierdas la oportunidad de ser parte de esta increíble experiencia.</div>
        </div>
        <div class="card-2 card">
          <div class="card-img-container">
            <img src="/landing/jugadores_2x.png" alt="">
          </div>
          <div class="title-card"> ARMA TU <span class="once">11</span> IDEAL</div>
          <div class="text-card">Prueba todas las combinaciones que quieras de manera gratuita. </div>
        </div>
        <div class="card-3 card">
          <div class="card-img-container">
            <img src="/landing/copa_2x.png" alt="">
          </div>
          <div class="title-card">COMPITE Y GANA</div>
          <div class="text-card">El rendimiento de los 11 jugadores que escojas te hará ganar dinero.</div>
        </div>
      </div>
    </div>

    <div class="section online-section padding-section">
      <div class="online-title">
        <span class="ball"></span> COMPITE A TIEMPO REAL
      </div>
      <div class="online-grid">
        <div class="online-table">
          <img src="/landing/rectangle_2_2x.png" height="500px" alt="">
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

    <div class="section padding-section premier-league-section">
      <div class="premier-text">
        Bombo cubre, por ahora, el resto de la temporada de la Premier League Inglesa
        y el Mundial. En el futuro cubriremos más ligas como La Liga Peruana y La Liga Española.
      </div>
      <div class="premier-league-content premier-logo">
        <img src="/landing/premier_2x.png" alt="">
        <img src="/landing/copa_mundial_logo_2x.png" alt="">
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
            Una vez creada la cuenta y los equipos puedes competir.
            La entrada a cada competencia cuesta 10 soles.
            Las recargas de cada cuenta se pueden hacer con 4 diferentes montos: 20, 30, 50 y 100 soles.
            Con el primer depósito regalamos una jugada gratis.
          </p>
          <p class="plans-short-text">
            Aceptamos <span><img src="/landing/visa_2x.png" alt=""><img src="/landing/master_card_2x.png" alt=""></span>
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

    <div class="footer">
      <div class="footer-container">
        <div class="right-side">
          <div class="bombo-footer">
            <img src="/landing/bombo_all_white.svg" width="100px" alt="">
          </div>
          <div class="social-images">
            <img src="/landing/twitter_logo_2x.png" width="30px" alt="">
            <img src="/landing/instagram_logo_2x.png" width="30px" alt="">
            <img src="/landing/facebook_logo_2x.png" width="30px" alt="">
          </div>
        </div>
        <div class="left-side">

          <div class="other-images">
            <img src="/landing/plus_18_movie_2x.png" width="30px" alt="">
            <img src="/landing/cer_file_format_2x.png" width="30px" alt="">
          </div>
          <div class="contact-section">
            <div class="raleway-bold">CONTACTO</div>
            <div>hello@bombo.pe</div>
          </div>
        </div>
      </div>
      <div class="footer-text">
        El cliente acepta que al usar y navegar en BOMBO utilizamos ciertas cookies de navegación para mejorar su experiencia. BOMBO solo utilizará cookies que mejoren su experiencia y no aquellas que interfieran, afecten o atenten en contra de su privacidad. Encontrará más información sobre el uso de cookies si lo desea registrándose y leyendo los Términos y Condiciones.
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
    text-align center !important
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
    margin-top 50px
    display grid
    width 100%
    grid-template-columns 50% 50%
    grid-template-rows: 500px
  .online-table
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1
    grid-row-end: 2
    align-self center
    justify-self center
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
    height 400px
  .premier-logo img
    height 200px
  .premier-league-section
    text-align right
  .premier-text
    display inline-block
    width 50%
    padding-top 100px
    height 200px
    color #131251
    font-family Raleway

  .plans-title
    text-align left
  .plans-title p
    display inline-block
  .plans-text
    padding-top 100px
    height 400px
    text-align center
  .plans-text p
    display inline-block
    width 70%
    font-family Raleway
    font-size 18px
    color #010045
  .plans-short-text
    padding-top 50px
    text-align right
  .plans-short-text img
    width 50px
  .plans-short-text span
    margin-left 10px
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
    left -190px
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

  .footer
    background #3E3E3E
    width 100%
    height 300px
    text-align center
  .footer-container
    width 80%
    display flex
    flex-wrap wrap
    justify-content space-between
    margin-left 10%
    margin-right 10%
    padding-top 20px

  .footer-text
    color white
    font-family Raleway
    padding 0 10%

  .right-side
    display inline-block
    width 300px
    height: 120px;
  .left-side
    float right
    display inline-block
    width 300px
    height: 120px;
  .other-images img
    margin 0 10px
  .other-images
    margin-bottom 10px

  .social-images
    margin-top 20px
    text-align center
  .social-images img
    margin 0 10px

  .contact-section
    color white
    font-family Raleway
    font-size 17px
  .raleway-bold
    margin-bottom 8px
    font-size 17px
    font-weight 700

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

    .online-grid
      margin-top 0
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
    .b-card-2
    .b-card-3
    .b-card-4
      width 100px
      top 0
      left 0
      right 0

    /*
    .b-card-1
      right -90px
    .b-card-2
      top -30px
      right -20px
    .b-card-3
      left -20px
    .b-card-4
      top -30px
      left -50px*/


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
    .right-side
      width 200px
    .left-side
      width 200px


  @media screen and (max-width: 500px)
    .online-text
      margin-top 0
    .online-text
      width 100% !important
    .online-table img
      height 300px
    .footer-container
      display flex
      justify-content center
    .footer
      height auto
    .footer-text
      padding-bottom 20px
    .grid-container
      padding-top 40px
    .plans-text
      padding-top 12px
    .plans-text p
      font-size 12px

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

    .premier-league-title
    .plans-title
    .online-title
      font-size 28px
      text-align center
    .ball
      top 0px
    .premier-text
      width 100%
      padding-top 20px
      text-align center
      height auto

  @media screen and (max-width: 360px)
    .phrase
      font-size 22px
    .phrase-2
      font-size 16px
    .phrase-3
      font-size 16px




</style>
