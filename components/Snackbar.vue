<template>
  <transition name="snackbar">
    <div id="snackbar" v-if="show">
      <div class="sb-card elevation">
        <p>{{message}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'snackbar',
    props: {
      message: String,
      show: Boolean
    }
  }
</script>

<style scoped lang="stylus">
  .snackbar-enter-active, .snackbar-leave-active {
    transition: opacity 0.25s ease-out;
  }

  .snackbar-enter, .snackbar-leave-to {
    opacity: 0;
  }

  #snackbar
    position absolute
    top 128px
    right 0
    padding 12px
    z-index 800
  .sb-card
    width 280px
    min-height 50px
    background #243237de
    border-radius: 10px
    padding 12px
  .sb-card p
    color white
    font-family: Titillium Web
    text-align center
    font-weight 100

</style>
