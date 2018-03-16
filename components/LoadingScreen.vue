<template>
    <div id="loading-screen">
      <div class="loading-text">
        CARGANDO...
      </div>
    </div>
</template>

<script>
  export default {
    name: 'loading-screen',
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      }
    }
  }
</script>

<style scoped lang="stylus">

  #loading-screen
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    z-index 999
    background #243237
  .loading-text
    color #25BF89
    font-size 22px
    font-family: Titillium Web;
    font-weight bold
    position absolute
    top 50%
    left 50%
    transform translateX(-50%) translateY(-50%)

</style>
