<template>
    <div id="nav-bar">
      <ul class="nav-section-desktop">
        <li v-for="(item, i) in navbarItems" :key="i">
          <nav-item
            :is-active="i === isActive"
            :text="item.name"
            :url="item.name"/>
        </li>
      </ul>
      <div class="nav-section-mobile dropdown">
        <div @click="openNavItems" class="nav-title">
          {{ navbarItems[isActive].name }}
          <span class="icon"> <img src="../assets/icons/arrow_down.png" width="20px" alt=""></span>
        </div>
      </div>
      <div class="dropdown-content elevation" :style="{ 'visibility': isMenuNavItemOpen? 'visible' : 'collapse'}">
        <ul class="dropdown-list">
          <li v-for="(item, i) in navbarItems" :key="i" class="dropdown-item">
            <a :href="item.url">{{ item.name }}</a>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import NavItem from './NavItem'

  export default {
    name: 'nav-bar',
    components: {
      NavItem
    },
    data () {
      return {
        isActive: 0,
        navbarItems: [
          { name: 'MIS EQUIPOS', url: 'https://www.google.com' },
          { name: 'PROXIMAS FECHAS', url: 'https://www.google.com' },
          { name: 'DASHBOARD', url: 'https://www.google.com' },
          { name: 'HISTORIAL', url: 'https://www.google.com' }
        ],
        isMenuNavItemOpen: false
      }
    },
    methods: {
      openNavItems () {
        console.log('click')
        this.isMenuNavItemOpen = !this.isMenuNavItemOpen
      }
    }
  }
</script>

<style scoped lang="stylus">
toolbar-height = 76px
toolbar-height-mobile = 56px

#nav-bar
  display inline-block
  left: 50%
  position: relative
  transform: translateX(-50%)
.nav-section-desktop
  list-style-type none
  overflow hidden
  padding 0
  //min-height toolbar-height
  /*margin-left 211px*/
.nav-section-desktop li
  float left
.nav-section-mobile
  display none
.dropdown-content
  display: block;
  position absolute
  background-color: #f9f9f9;
  top toolbar-height
  left -50%
  width 200px
  padding: 12px 0px;
  z-index: 1;
  background #243237
  visibility collapse
.dropdown-content ul
  padding-left  0
  list-style-type none
  text-align center
.dropdown-content li
  padding-bottom 12px
  text-decoration none
  font-family Titillium Web
.dropdown-content li a
  text-decoration none
  color #fafafa
.dropdown-content li:hover
  background #445F69
/*.dropdown:hover .dropdown-content*/
  /*display: block;*/


/* TABLET */
@media screen and (max-width: 1023px)
  .nav-section-desktop
    display none
  .nav-section-mobile
    position relative
    left -30%
    height 100%
    display inline-block
    text-align center
  .nav-title
    height: 100%
    line-height: toolbar-height-mobile
    font-family Titillium Web
    font-size 16px
    color white
  .dropdown-content
    top toolbar-height-mobile
  .nav-title .icon
    margin-left 15px
</style>
