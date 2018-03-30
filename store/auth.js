import Cookie from 'js-cookie'

const auth = {
  namespaced: true,
  state: {
    // user: null,
    token: null
  },
  getters: {
    getToken (state) {
      return state.token
    }
  },
  mutations: {
    setToken (state, value) {
      state.token = value
      Cookie.set('token', value)
    }
  },
  actions: {

    removeAuth (context) {
      Cookie.remove('userId')
      Cookie.remove('token')
      context.state.token = null
    }
  }
}

export default auth
