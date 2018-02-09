<template>
    <div id="toolbar" class="elevation">
      <div class="img-container">
        <img src="../assets/bombo_transparency.png" alt="">
      </div>
      <ul class="nav-section">
        <li v-for="(item, i) in navbarItems" :key="i">
          <nav-item
            :is-active="i === isActive"
            :text="item.name"
            :url="item.name"/>
        </li>
      </ul>
      <status-bar/>
    </div>
</template>

<script>
  import NavItem from './NavItem'
  import StatusBar from './StatusBar'

  export default {
    name: 'toolbar',
    components: {
      NavItem, StatusBar
    },
    data () {
      return {
        isActive: 0,
        navbarItems: [
          { name: 'MIS EQUIPOS', url: 'https://www.google.com' },
          { name: 'PROXIMAS FECHAS', url: 'https://www.google.com' },
          { name: 'DASHBOARD', url: 'https://www.google.com' },
          { name: 'HISTORIAL', url: 'https://www.google.com' }
        ]
      }
    }
  }
</script>

<style scoped lang="stylus">
toolbar-height = 76px

#toolbar
  background #243237
  width 100%
  position absolute
  top 0
  left 0
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
.nav-section
  list-style-type none
  overflow hidden
  padding 0
  //min-height toolbar-height
  /*margin-left 211px*/
  display inline-block
  left: 50%
  position: relative
  transform: translateX(-50%)
.nav-section li
  float left

@media screen and (max-width: 1023px)
  .img-container
    display none
</style>
