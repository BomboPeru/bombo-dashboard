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

    <sign-out-dialog @onCollapse="onCollapseSignoutDialog"
                     :is-open="isSignoutDialog"/>

    <select-league-dialog
      :is-open="isSelectLeagueDialog"
      @onCollapse="onCollapseSelectLeagueDialog"/>
  </div>
</template>

<script>
  import Toolbar from '~/components/Toolbar.vue'
  import Sidebar from '~/components/Sidebar.vue'
  import FloatingContainer from '~/components/FloatingContainer'
  import IconButton from '~/components/IconButton'
  import SelectLeagueDialog from '~/components/SelectLeagueDialog'
  import SignOutDialog from '~/components/SignOutDialog'

  export default {
    components: {
      Toolbar, Sidebar, FloatingContainer, IconButton, SelectLeagueDialog, SignOutDialog
    },
    computed: {
      sidebarAndNavbar () {
        let notAllowed = []
        return notAllowed.indexOf(this.$route.path) === -1
      },
      isSignoutDialog () {
        return this.$store.getters['isSignoutDialog']
      },
      isSelectLeagueDialog () {
        return this.$store.getters['team/isSelectLeagueDialog']
      },
      sidebar () {
        let notAllowed = ['/client/profile', '/client/createteam', '/client/dashboard']
        return notAllowed.indexOf(this.$route.path) === -1
      }
    },
    methods: {
      onCollapseSignoutDialog () {
        this.$store.commit('turnOffSignoutDialog')
      },
      onCollapseSelectLeagueDialog () {
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


::-webkit-scrollbar-trackx
  background-color: #000000;
  height: 6px;
  width: 3px;
::-webkit-scrollbar
  width: 3px;
  height: 6px;
  background-color: rgba(227, 222, 245, 0);
::-webkit-scrollbar-thumb
  width: 3px;
  height: 6px;
  background-color: #7d7d80

</style>
