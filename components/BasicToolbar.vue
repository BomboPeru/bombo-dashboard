<template>
    <div id="toolbar">
      <div class="img-container">
        <img src="../assets/bombo_transparency.png" alt="">
      </div>
      <div class="links uppercase">
        <nuxt-link to="/login">COMO JUGAR</nuxt-link>
        <nuxt-link to="/register">PROXIMAS FECHAS</nuxt-link>
      </div>
      <div class="links right">
        <nuxt-link to="/register" class="register">Registrate</nuxt-link>
        <span @click="openLoginDialog">Inicia sesion</span>
      </div>
    </div>
</template>

<script>

  export default {
    name: 'basic-toolbar',
    methods: {
      openLoginDialog () {
        this.$store.commit('openLoginDialog')
      }
    }
  }
</script>

<style scoped lang="stylus">

  toolbar-height = 76px

  #toolbar
    background #243237
    width 100%
    position relative
    /*top 0*/
    /*left 0*/
    height toolbar-height
  .img-container
    float left
    margin-left 23px
    min-height toolbar-height
    display inline-block
    position relative
  .img-container img
    position absolute
    top 50%
    transform translateY(-50%)
  .links
    display inline-block
    margin-left 150px
    height 100%
  .links span
    cursor pointer
  .links span
  .links a
    line-height 76px
    margin 0 15px
    text-decoration none
    color white
    font-family Titillium Web
    font-weight bold
    font-size 18px
  .right
    float right
    margin 0 5px !important
    margin-right 10px
  .uppercase
    text-transform uppercase
  .register
    color #EA504C !important
</style>
