import Vuex from 'vuex'
import team from './teams'
import createteam from './createteam'
import auth from './auth'
import dashboard from './dashboard'
import axios from 'axios'

const store = () => {
  return new Vuex.Store({
    state: {
      signOutDialog: false,
      termsAndConditionsDialog: false,
      bomboPayments: false,
      snackbar: false,
      snackbarDuration: 5000,
      snackbarMessage: '',
      menuSidebar: false,
      isLoading: false,
      isShortLoading: false,

      BASE_URL: 'https://api.bombo.pe/',
      current_credit: 0,
      current_won_credit: 0,

      notifications: [],
      user: null,

      leagues: []
    },
    getters: {
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
      },
      user (state) {
        if (process.server) return
        if (state.user === null) {

          state.user = JSON.parse(localStorage.getItem('user'))
          return state.user
        }
        return state.user
      }
    },
    mutations: {
      openTermsConditionsDialog (state) {
        state.termsAndConditionsDialog = true
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
      },
      updateUser (context, data) {
        context.state.user = data
        context.state.notifications = data.notifications
        context.state.current_credit = data.current_credit
        context.state.current_won_credit = data.current_won_credit


        window.localStorage.setItem('userId', data.id)
        window.localStorage.setItem('user', JSON.stringify(data))
      },
      async fetchUser (context) {
        if (process.server) return

        const token = window.localStorage.getItem('token')
        // console.log('token', token)
        if (token === null || token === undefined) {
          throw new Error("not token")
        }

        try {
          const response = await axios.get(context.state.BASE_URL + 'auth/verify', { headers: { 'Authorization': 'Bearer ' + token }})
          const userId = response.data.data.user.id

          window.localStorage.setItem('userId', userId)

          const response2 = await axios.get(context.state.BASE_URL + 'api/v2.0/users/' + userId,
            { headers: { 'Authorization': 'Bearer ' + token }})


          context.state.user = response2.data.data
          context.state.current_credit = response2.data.data.current_credit

          context.state.current_won_credit = response2.data.data.current_won_credit

          context.state.notifications = response2.data.data.notifications

          window.localStorage.setItem('user', JSON.stringify(response2.data.data))

          return response2.data.data
        } catch (e) {

          // console.log(e)
          throw new Error(e)
        }
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
