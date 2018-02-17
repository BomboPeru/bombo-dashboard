<template>
  <div class="background">
    <div id="dashboard-layout">
      <toolbar/>
      <sidebar v-if="sidebarAndNavbar" :sidebar="sidebar"/>
      <nuxt :class="{ 'margin-sidebar': sidebar }"/>
      <floating-container bottom-right class="fab">
        <icon-button text="$ 0000.00"
                     icon-direction="right"
                     color="#EA504C"
                     icon="plus"/>
      </floating-container>
    </div>

    <select-league-dialog
      :is-open="isSelectLeagueDialog"
      @onCollapse="onCollapseDialog"/>
  </div>
</template>

<script>
  import Toolbar from '~/components/Toolbar.vue'
  import Sidebar from '~/components/Sidebar.vue'
  import FloatingContainer from '~/components/FloatingContainer'
  import IconButton from '~/components/IconButton'
  import SelectLeagueDialog from '~/components/SelectLeagueDialog'

  export default {
    components: {
      Toolbar, Sidebar, FloatingContainer, IconButton, SelectLeagueDialog
    },
    computed: {
      sidebarAndNavbar () {
        let notAllowed = []
        return notAllowed.indexOf(this.$route.path) === -1
      },
      isSelectLeagueDialog () {
        return this.$store.getters['team/isSelectLeagueDialog']
      },
      sidebar () {
        let notAllowed = ['/client/profile', '/client/createteam']
        return notAllowed.indexOf(this.$route.path) === -1
      }
    },
    methods: {
      onCollapseDialog () {
        this.$store.commit('team/turnOffSelectLeageDialog')
      }
    }
  }
</script>

<style lang="stylus">
/*html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}*/

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.background
  background url(../assets/background/background_desktop.png)
  background-size cover
.margin-sidebar
  margin-left 232px
.fab
  display block

@media screen and (max-width: 1023px)
  .background
    background url(../assets/background/background_mobile.png)
  .content
    margin-left 0px
  .fab
    display none
  .margin-sidebar
    margin-left 0

</style>
