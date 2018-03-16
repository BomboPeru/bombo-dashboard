import Vuex from 'vuex'
import team from './teams'
import createteam from './createteam'
import auth from './auth'
import dashboard from './dashboard'

const store = () => {
  return new Vuex.Store({
    state: {
      signOutDialog: false,
      loginDialog: false,
      termsAndConditionsDialog: false,
      isBomboPaymentsDialog: false,
      snackbar: false,
      snackbarDuration: 5000,
      snackbarMessage: '',
      menuSidebar: false,
      isLoading: false,
      isShortLoading: false
    },
    getters: {
      isSignoutDialog (state) {
        return state.signOutDialog
      },
      loginDialog (state) {
        return state.loginDialog
      },
      termsAndConditionsDialog (state) {
        return state.termsAndConditionsDialog
      },
      isBomboPaymentsDialog (state) {
        return state.isBomboPaymentsDialog
      },
      snackbar (state) {
        return state.snackbar
      },
      snackbarMessage (state) {
        return state.snackbarMessage
      }
    },
    mutations: {
      turnOffSignoutDialog (state) {
        state.signOutDialog = false
      },
      turnOnSignoutDialog (state) {
        state.signOutDialog = true
      },
      openLoginDialog (state) {
        state.loginDialog = true
      },
      openBomboPaymentsDialog (state) {
        state.isBomboPaymentsDialog = true
      },
      closeLoginDialog (state) {
        state.loginDialog = false
      },
      openTermsConditionsDialog (state) {
        state.termsAndConditionsDialog = true
      },
      turnOffBomboPaymentsDialog (state) {
        state.isBomboPaymentsDialog = false
      },
      closeTermsConditionsDialog (state) {
        state.termsAndConditionsDialog = false
      },
      turnOnSnackbar (state, message) {
        state.snackbarMessage = message
        state.snackbar = true
      }
    },
    actions: {
      turnOnSnackbar (context, message) {
        context.commit('turnOnSnackbar', message)
        setTimeout(() => {
          context.state.snackbar = false
        }, context.state.snackbarDuration)
      }
    },
    modules: {
      team,
      createteam,
      dashboard,
      auth
    }
  })
}

export default store
