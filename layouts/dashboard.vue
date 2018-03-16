<template>
  <div class="background">
    <div id="cover-layout">

      <toolbar/>

      <nuxt/>

      <floating-container bottom-right class="fab" v-if="showFABBomboPayments">
        <icon-button :text="'S/ ' + saldo"
                     icon-direction="right"
                     color="#EA504C"
                     @click="toggleBomboPayments"
                     icon="plus"/>
      </floating-container>
    </div>

    <sign-out-dialog @onCollapse="onCollapseSignoutDialog"
                     :is-open="isSignoutDialog"/>

    <select-league-dialog
      :is-open="isSelectLeagueDialog"
      @onCollapse="onCollapseSelectLeagueDialog"/>

    <select-time-dialog :is-open="isSelectTimeDialog"
                        @onCollapse="onCollapseSelectTimeDialog"/>

    <!--:is-open="true"-->
    <bombo-payments
      :is-open="bomboPayments"
      @onCollapse="toggleBomboPayments"/>

    <snackbar :show="snackbar" :message="snackbarMessage"/>

    <mobile-menu-sidebar/>

    <transition name="loading">
      <loading-screen v-if="isLoading"/>
    </transition>

    <transition name="loading">
      <short-loading-screen v-if="isShortLoading"/>
    </transition>
  </div>
</template>

<script>
  import Toolbar from '~/components/Toolbar.vue'
  import Snackbar from '~/components/Snackbar.vue'
  import FloatingContainer from '~/components/FloatingContainer'
  import IconButton from '~/components/IconButton'
  import SelectLeagueDialog from '~/components/SelectLeagueDialog'
  import SignOutDialog from '~/components/SignOutDialog'
  import BomboPayments from '~/components/BomboPayments'
  import SelectTimeDialog from '~/components/SelectTimeDialog'
  import MobileMenuSidebar from '~/components/MobileMenuSidebar'
  import LoadingScreen from '~/components/LoadingScreen'
  import ShortLoadingScreen from '~/components/ShortLoadingScreen'

  import auth from '~/utils/auth'


  export default {
    components: {
      Toolbar, FloatingContainer, IconButton,
      SelectLeagueDialog, SignOutDialog, Snackbar, BomboPayments,
      SelectTimeDialog, MobileMenuSidebar, LoadingScreen, ShortLoadingScreen
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      isShortLoading () {
        return this.$store.state.isShortLoading
      },
      isSignoutDialog () {
        return this.$store.getters['isSignoutDialog']
      },
      bomboPayments () {
        return this.$store.state.bomboPayments
      },
      isSelectLeagueDialog () {
        return this.$store.getters['team/isSelectLeagueDialog']
      },
      isSelectTimeDialog () {
        return this.$store.getters['team/isSelectTimeDialog']
      },
      showFABBomboPayments () {
        const routesDisallowed = ['/client/createteam']
        return routesDisallowed.indexOf(this.$route.path)
      },
      snackbar () {
        return this.$store.getters.snackbar
      },
      snackbarMessage () {
        return this.$store.getters.snackbarMessage
      },
      saldo () {
        if (process.server) return

        const user = this.$store.getters['auth/getUser']
        if ( user === null) {
          return 0
        } else {
          return user.current_credit
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      onCollapseSignoutDialog () {
        this.$store.commit('turnOffSignoutDialog')
      },
      onCollapseSelectLeagueDialog () {
        this.$store.commit('team/turnOffSelectLeageDialog')
      },
      onCollapseSelectTimeDialog () {
        this.$store.commit('team/turnOffSelectTimeDialog')
      },
      toggleBomboPayments () {
        this.$store.state.bomboPayments = !this.$store.state.bomboPayments
      }
    },
    beforeCreate () {
      const user = this.$store.getters['auth/getUser']
      if (user === null) {
        console.log('null data in localStorage')
        this.$router.push('/login')
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
  /*background url(../assets/background/background_desktop.png)*/
  background-size cover
.fab
  display block

@media screen and (max-width: 1023px)
  .background
    /*background url(../assets/background/background_mobile.png)*/
  .content
    margin-left 0px
  .fab
    display none


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

.loading-enter-active, .loading-leave-active {
  transition: opacity .2s;
}
.loading-enter, .loading-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
