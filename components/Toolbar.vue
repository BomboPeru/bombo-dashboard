<template>
    <div id="toolbar" class="elevation">
      <div class="img-container">
        <nuxt-link to="/client/home">
          <img src="/landing/bombo_all_white.svg" alt="">
        </nuxt-link>
      </div>
      <div class="menu-btn">
        <img src="../assets/icons/menu.png" alt="" width="32px" height="32px" @click="openMenuSidebar">
      </div>
      <nav-bar/>
      <status-bar/>
    </div>
</template>

<script>
  import NavBar from './NavBar'
  import StatusBar from './StatusBar'

  export default {
    name: 'toolbar',
    components: {
      NavBar, StatusBar
    },
    data () {
      return {
        isActive: 0
      }
    },
    methods: {
      openMenuSidebar () {
        this.$store.state.menuSidebar = true
      }
    }
  }
</script>

<style scoped lang="stylus">
toolbar-height = 64px
toolbar-height-mobile = 56px

#toolbar
  background #0F202D
  width 100%
  position relative
  height toolbar-height
  z-index: 99

.menu-btn
  display none
.img-container
  float left
  margin-left 23px
  min-height toolbar-height
  display inline-block
  position relative
.img-container img
  height: 35px
  position absolute
  top 50%
  transform translateY(-50%)

@media screen and (min-width: 1700px)
  .img-container img
    height 42px

@media screen and (max-width: 1023px)
  .img-container
    display none
  .menu-btn
    margin-left 18px
    float left
    align-items: center
    height 100%
    display flex
  #toolbar
    height toolbar-height-mobile
</style>
