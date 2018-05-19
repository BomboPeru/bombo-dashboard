<template>
  <div>
    <div id="cover-layout">
      <basic-toolbar v-if="toolbar"/>
      <nuxt/>
    </div>

    <transition name="loading">
      <loading-screen v-if="isLoading"/>
    </transition>
    <transition name="loading">
      <short-loading-screen v-if="isShortLoading"/>
    </transition>

    <terms-conditions-dialog :is-open="termsAndConditions" @onCollapse="closeTermsConditionsDialog"/>
  </div>
</template>

<script>
  import BasicToolbar from '../components/BasicToolbar'
  import TermsConditionsDialog from '../components/TermsConditionsDialog'
  import LoadingScreen from '~/components/LoadingScreen'
  import ShortLoadingScreen from '~/components/ShortLoadingScreen'

  export default {
    name: 'default',
    components: {
      BasicToolbar, TermsConditionsDialog, LoadingScreen, ShortLoadingScreen
    },
    computed: {
      toolbar() {
        const routesWithToolbar = ['/', '/forgotpassword', '/faq']
        return routesWithToolbar.indexOf(this.$route.path) !== -1
      },
      isLoading () {
        return this.$store.state.isLoading
      },
      isShortLoading () {
        return this.$store.state.isShortLoading
      },
      termsAndConditions () {
        return this.$store.getters['termsAndConditionsDialog']
      }
    },
    methods: {
      closeTermsConditionsDialog () {
        this.$store.commit('closeTermsConditionsDialog')
      }
    }
  }
</script>

<style lang="stylus">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

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
  background-color: #5d5d5d

.loading-enter-active, .loading-leave-active {
  transition: opacity .5s;
}
.loading-enter, .loading-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
