<template>
  <div id="index">
    <div class="header">
      <div class="player-container">
        <img src="/landing/jugador2.png" alt="" class="player">
      </div>
      <div class="content-container">
        <p class="phrase">
          El primer daily fantasy peruano donde podrás <span class="highlight">ganar dinero</span>
        </p>
        <div class="btn-login">
          COMIENZA A GANAR <span class="arrow"> <img src="/landing/arrow_right.svg" alt=""> </span>
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
    }
  }
</script>

<style scoped lang="stylus">
  #index
    font-family: Titillium Web;
  .header
    margin-top -76px
    height 90vh
    background linear-gradient(62deg, #89F7FE 0%, #66A6FF 100%);
    /*overflow hidden*/
  .player
    width 50%
    position relative
    top 100px
    left 50px
  @media screen and (min-width: 1300px)
    .player
      width 50%
      position relative
      top 200px
      left 50px

  .player-container
    height: 100%;
    overflow-y: hidden;

  .content-container
    position absolute
    top 50%
    transform translateY(-80%)
    right 10%
    padding-right 50px
    width 360px
  .phrase
    color black
    font-family Raleway
    font-size 26px
    padding-bottom 24px
  .highlight
    font-weight: bold;
    font-style: italic;
  .btn-login
    padding-left 15px
    font-weight bold
    height 42px
    line-height 42px
    background white
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
