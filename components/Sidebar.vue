<template>
    <div id="sidebar" class="elevation">

      <!-- DESKTOP -->
      <div class="title-bar desktop">
        <span class="title-menu-section">{{ activeSection }}</span>
        <div class="search-input" v-if="activeSection === 'MIS EQUIPOS'">
          <input type="text" placeholder="Busca equipos">
          <span class="icon-input"><img src="../assets/icons/search.svg" alt=""></span>
        </div>
      </div>
      <div class="sidebar elevation">
        <div>
          <div v-for="(item, i) in itemsForEachPath[activeSection].items"
               :key="i"
               v-if="item.type === 'normal'"
               class="sidebar-item elevation">
            <div class="line" :style="{ background: item.color }"></div>
            <span class="text">{{ item.name }}</span>
          </div>
          <div class="bottom-side">
            <div>
              <template
                v-for="(item, i) in itemsForEachPath[activeSection].items"
                v-if="item.type === 'bottom'">
                <icon-button :key="i"
                             :text="item.name"
                             icon-direction="left"
                             :color="item.color"
                             :icon="item.icon"
                             class="bottom-btn"/>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- MOBILE -->
      <div v-for="(item, i) in itemsForEachPath[activeSection].items" :key="i" class="mobile sub-nav-btn elevation">
        <div class="line" :style="{ background: item.color }"></div>
        <span class="text">{{ item.name }}</span>
      </div>

    </div>
</template>

<script>
  import IconButton from './IconButton'

  export default {
    name: 'sidebar',
    components: {
      IconButton
    },
    computed: {
      activeSection () {
        for (let i = 0; i < this.navbarItems.length; i++ ) {
          if (this.navbarItems[i].urlPath === this.$route.path) {
            return this.navbarItems[i].name
          }
        }
        return ''
      }
    },
    data () {
      return {
        items: [
          {name: 'EN JUEGO', color: '#EA504C'},
          {name: 'GUARDADOS', color:'#25BF89'},
          {name: 'JUGADOS', color:'#67A6F0'}
        ],
        navbarItems: [
          { name: 'MIS EQUIPOS', urlPath: '/client/teams' },
          { name: 'PROXIMAS FECHAS', urlPath: '/client/matches' },
          { name: 'DASHBOARD', urlPath: '/client/dashboard' },
          { name: 'HISTORIAL', urlPath: '/client/history' }
        ],
        itemsForEachPath: {
          'MIS EQUIPOS': {
            items: [
              {name: 'EN JUEGO', color: '#EA504C', type: 'normal'},
              {name: 'GUARDADOS', color:'#25BF89', type: 'normal'},
              {name: 'JUGADOS', color:'#67A6F0', type: 'normal'},
              {name: '¡CREAR EQUIPO!', color:'#25BF89', type: 'bottom', icon: 'plus'}
            ]
          },
          'PROXIMAS FECHAS': {
            items: [
            ]
          },
          'DASHBOARD': {
            items: [
              {name: 'POSICIONES', color: '#EA504C', type: 'normal'},
              {name: 'PARTIDOS', color:'#25BF89', type: 'normal'},
              {name: 'TU EQUIPOS', color:'#67A6F0', type: 'normal'}
            ]
          },
          'HISTORIAL': {
            items: [
            ]
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

  sidebar_height = 52px
  sidebar_height_mobile = 56px
  sub_nav_height = 60px

  #sidebar
    width 100%
    height sidebar_height
    background white
  .desktop
    display block
  .title-bar
    height sidebar_height
    z-index 999
  .sidebar
    display block
    height: calc(100% - 128px)
    width: 232px;
    z-index 1
    position: absolute;
    top: (52px + 76px);
    left: 0;
    background-color: #243237;
    padding-top: 20px;
  .sidebar-item
    position: relative
    width 240px
    height 56px
    margin-top 4px
    background-color: #243237;
    border-radius: 0px 12px 12px 0px;
  .sidebar-item .line
    position absolute
    top 0
    left 0
    height 100%
    width 15px
  .sidebar-item .text
    margin-left 36px
    color #fafafa
    line-height 56px
    font-size 18px
    font-weight bold
    font-family Titillium Web
  .bottom-side
    position absolute
    bottom 29px
    left 0
    width 200px
    padding 10px 15px

  .mobile
    display none
  .title-menu-section
    float left
    font-size 24px
    color #243237
    font-family Titillium Web
    margin 8px 0px 7px 21px
  .search-input
    float right
    margin 8px 21px 7px 0px
    position relative
  .search-input input
    padding 5px 29px 6px 12px
    border-radius 4px
    width 272px
    font-size 12px
    font-family Titillium Web
  .icon-input
    position: absolute
    top: 9px
    right: 7px
    font-size: 15px
  .bottom-btn
    margin 8px 1px

  @media screen and (max-width: 1023px)
    #sidebar
      width 100%
      height sidebar_height_mobile
      background #243237
      display flex
      justify-content space-around
    .sidebar
      display none
    .sub-nav-btn .text
      color white
      font-size 12px
      line-height sub_nav_height
      font-family Titillium Web
    .sub-nav-btn
      background #243237
      flex-grow 1
      height sub_nav_height
      margin 0px 3px
      border-radius: 0px 0px 12px 12px;
      text-align center
    .mobile .line
      width 100%
      height 5px
      background palevioletred
    .mobile
      display block
    .desktop
      display none

</style>
