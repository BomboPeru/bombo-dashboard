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
      testUserId: null,
      testUser: {}
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

        if(process.browser){
          console.log('process.browser')
          let id = window.localStorage.getItem('testuserid')
          if (id !== null) {
            state.testUserId = id
          }
        }
        return state.testUserId
      },
      testUser (state) {

        if(process.browser){
          console.log('process.browser')
          let user = window.localStorage.getItem('testuser')
          if (user !== null) {
            state.testUser = JSON.parse(user)
          }
        }
        return state.testUser
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
        // let id = localStorage.getItem('testuserid')
        if (process.browser) {
          console.log('process.browser')
          console.log(localStorage.getItem('testuserid'))
          let id = localStorage.getItem('testuserid')
        }
        if (id !== null) {
          state.testUserId = id
        }
      },
      setUserId (state, user) {
        if (process.browser) {
          console.log('process.browser')
          localStorage.setItem('testuserid', user.id)
          localStorage.setItem('testuser', JSON.stringify(user))
        }
        state.testUser = user
        state.testUserId = user.id
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
