<template>
  <div id="index">
    <div class="landing">
      <p class="extra-big-title">Preparate para ser el mejor</p>
      <div class="bottom-part">
        <p class="big-title">En Bombo tu eres el experto nosotros te alentamos</p>
        <div class="btn-container">
          <div class="juega-ya">Juega Ya!</div>
        </div>
      </div>
    </div>

    <div class="block-content">
      <p class="big-title">GANA HASTA 20 VECES LO INVERTIDO</p>
      <p class="semi-big-title">LOS 35 PRIMEROS SIEMPRE GANAN</p>
      <p class="big-title">JUEGA EN TODAS LAS TEMPORADAS</p>
    </div>
  </div>
</template>

<script>

  export default {
    // layout: 'dashboard',

  }
</script>

<style scoped lang="stylus">
  #index
    font-family: Titillium Web;
  .landing
    height 640px
    width 100%
    background: linear-gradient(0deg, rgb(19, 145, 191), rgb(216, 255, 0))
    color white
    text-align center
    padding 27px 42px 12px 42px
    position relative
  .bottom-part
    position absolute
    bottom 0
    left 0
    width 100%
    padding 12px 161px 25px 161px
  .semi-big-title
    font-size 36px !important
  .big-title
    font-size 48px !important
  .extra-big-title
    font-size 72px !important
  .btn-container
    text-align center
  .juega-ya
    margin-top 48px
    display inline-block
    color white
    font-weight: 600
    font-family: Titillium Web;
    padding 6px 41px 6px 41px
    background: #EA504C;
    border-radius: 12px;

  .block-content
    background white
    color black
    text-align center
    padding 21px 120px 12px 120px
    height 350px
    font-weight:bold
</style>
