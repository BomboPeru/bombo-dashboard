import Vuex from 'vuex'
import team from './teams'

const store = () => {
  return new Vuex.Store({
    state: {
      signOutDialog: false,
      loginDialog: false
    },
    getters: {
      isSignoutDialog (state) {
        return state.signOutDialog
      },
      loginDialog (state) {
        return state.loginDialog
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
      }
    },
    modules: {
      team
    }
  })
}

export default store
