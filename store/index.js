import Vuex from 'vuex'
import team from './teams'

const store = () => {
  return new Vuex.Store({
    state: {
      signOutDialog: false
    },
    getters: {
      isSignoutDialog (state) {
        return state.signOutDialog
      }
    },
    mutations: {
      turnOffSignoutDialog (state) {
        state.signOutDialog = false
      },
      turnOnSignoutDialog (state) {
        state.signOutDialog = true
      }
    },
    modules: {
      team
    }
  })
}

export default store
