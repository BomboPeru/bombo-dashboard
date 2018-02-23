import Vuex from 'vuex'
import team from './teams'
import createteam from './createteam'

const store = () => {
  return new Vuex.Store({
    state: {
      signOutDialog: false,
      loginDialog: false,
      termsAndConditionsDialog: false
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
      closeLoginDialog (state) {
        state.loginDialog = false
      },
      openTermsConditionsDialog (state) {
        state.termsAndConditionsDialog = true
      },
      closeTermsConditionsDialog (state) {
        state.termsAndConditionsDialog = false
      }
    },
    modules: {
      team,
      createteam
    }
  })
}

export default store
