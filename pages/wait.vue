<template>
    <div id="wait">
      <div class="bombo-logo">
        <nuxt-link to="/">
          <img src="/landing/bombo_purple.png" alt="">
        </nuxt-link>
      </div>
      <div class="background">
        <img src="/landing/background_wait_3x.png" alt="">
      </div>
      <div class="card-await">
        <div class="title">!PREPÁRATE!</div>
        <div class="message">A partir del lunes 26 de Marzo podrás armar tu equipo para competir en la fecha 32 de la <span style="color: #01E19F;">PREMIER</span>.</div>
        <div class="img-container">
          <img src="/landing/premier_2x_2.png" alt="" height="70px">
          <img src="/landing/b_2x.png" alt="" height="70px">
          <img src="/landing/football_2x.png" alt="" height="70px">
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'wait',
    mounted () {
      this.$store.state.isLoading = false
    }
  }
</script>

<style scoped lang="stylus">

  .background
    position absolute
    z-index 1
    top: -50px;
    right 0

  #wait
    height 100vh
    display flex
    flex-wrap wrap
    justify-content center
    align-items center

  .card-await
    position relative
    z-index 4
    background white
    width 400px
    padding 10px 20px
    box-shadow: 0 0 42px 0 rgba(222,227,255,0.60);
    border-radius: 8px;

  .title
    text-align center
    font-size 28px
    font-family Raleway
    font-weight 500
    padding-bottom 10px
  .message
    text-align center
    font-family 'Nunito Sans'
    font-size 18px
  .img-container
    display flex
    justify-content center
    align-items center
    padding-top 20px
    padding-bottom 50px
  .img-container img
    margin 2px 10px

  .bombo-logo
    position absolute
    top 20px
    left 20px
    z-index 2
  .bombo-logo img
    width 100px

</style>
