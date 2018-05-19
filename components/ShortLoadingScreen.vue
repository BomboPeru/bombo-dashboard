<template>
    <div id="loading-screen">
      <div class="loading-card">
        <div class="loading-text">
          CARGANDO...
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'short-loading-screen',
    computed: {
      isLoading () {
        return this.$store.state.isShortLoading
      }
    }
  }
</script>

<style scoped lang="stylus">

  #loading-screen
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 999
    background rgba(36, 50, 55, 0.63)
  .loading-card
    width 300px
    height 200px
    position absolute
    top 50%
    left 50%
    transform translateX(-50%) translateY(-50%)
    background rgba(36, 50, 55, 1)
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
