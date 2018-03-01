import Vuex from 'vuex'
import team from './teams'
import createteam from './createteam'
import dashboard from './dashboard'

const store = () => {
  return new Vuex.Store({
    state: {
      signOutDialog: false,
      loginDialog: false,
      termsAndConditionsDialog: false,
      snackbar: false,
      snackbarDuration: 5000,
      snackbarMessage: '',
      testUserId: 'ada51b19-ddf2-406f-97eb-9f0571aa6409'
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
      snackbar (state) {
        return state.snackbar
      },
      snackbarMessage (state) {
        return state.snackbarMessage
      },
      testUserId (state) {
        // let id = localStorage.getItem('testuserid')
        // if (id !== null) {
        //   state.testUserId = id
        // }
        return state.testUserId
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
      },
      turnOnSnackbar (state, message) {
        state.snackbarMessage = message
        state.snackbar = true
      },
      getUserId (state) {
        console.log(localStorage.getItem('testuserid'))
        let id = localStorage.getItem('testuserid')
        if (id !== null) {
          state.testUserId = id
        }
      },
      setUserId (state, id) {
        state.testUserId = id
        localStorage.setItem('testuserid', id)
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
      dashboard
    }
  })
}

export default store
