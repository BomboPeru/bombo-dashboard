import Vuex from 'vuex'
import team from './teams'
import createteam from './createteam'
import auth from './auth'
import dashboard from './dashboard'
import payment from './payment'
import axios from 'axios'
import Cookie from 'js-cookie'

// import Cookie from 'js-cookie'

var cookieparser = require('cookieparser')


export const state = () => ({

  BASE_URL: 'https://api.bombo.pe/',

  signOutDialog: false,
  termsAndConditionsDialog: false,
  bomboPayments: false,
  snackbar: false,
  snackbarDuration: 5000,
  snackbarMessage: '',
  menuSidebar: false,

  isLoading: false,
  isShortLoading: false,

  current_credit: 0,
  current_won_credit: 0,

  notifications: [],
  userId: '',
  user: null,
  userUrlImage: '',

  leagues: []
})

export const getters = {
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
    return state.user
  },
  userId (state) {
    return state.userId
  }
}


export const mutations = {
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
}


export const actions = {
  nuxtServerInit ({ commit, state }, { req }) {

    console.log('nuxtServerInit')
    console.log('req.headers', req.headers)

    // init
    state.userId = ''
    commit('auth/setToken', null)

    if (req.headers.cookie) {
      let cookieParsed = cookieparser.parse(req.headers.cookie)

      // console.log(cookieParsed)
      if (cookieParsed.token !== undefined && cookieParsed.userId !== undefined) {
        // console.log('parsed.token', cookieParsed)
        let token = null
        token = cookieParsed.token
        console.log('token', token)
        state.userId = cookieParsed.userId
        commit('auth/setToken', token)

      } else {

        state.userId = ''
        commit('auth/setToken', null)
      }

    }
  },
  turnOnSnackbar (context, message) {
    context.commit('turnOnSnackbar', message)
    setTimeout(() => {
      context.state.snackbar = false
    }, context.state.snackbarDuration)
  },
  updateUser (context, data) {

    if (context.state.userId === '') {

      context.state.userId = data.id
      Cookie.set('userId', data.id)
    }
    // context.state.userId = data.id
    context.state.user = data
    context.state.notifications = data.notifications
    context.state.current_credit = data.current_credit
    context.state.current_won_credit = data.current_won_credit
  },
  async fetchUser (context) {

    const token = context.state.auth.token

    if (token === null || token === undefined) {
      throw new Error("not token")
    }

    try {
      const response = await axios.get(context.state.BASE_URL + 'auth/verify', { headers: { 'Authorization': 'Bearer ' + token }})

      const userId = response.data.data.user.id

      context.state.userId = userId
      Cookie.set('userId', userId)

      const response2 = await axios.get(context.state.BASE_URL + 'api/v2.0/users/' + userId,
        { headers: { 'Authorization': 'Bearer ' + token }})

      context.state.userId = userId
      context.state.user = response2.data.data
      context.state.current_credit = response2.data.data.current_credit
      context.state.current_won_credit = response2.data.data.current_won_credit
      context.state.notifications = response2.data.data.notifications

      return response2.data.data
    } catch (e) {
      // console.log(e)
      throw new Error(e)
    }
  }
}

const store = () => {
  return new Vuex.Store({
    state,
    getters,
    mutations,
    actions,

    modules: {
      team,
      createteam,
      dashboard,
      auth,
      payment
    }
  })
}

export default store
