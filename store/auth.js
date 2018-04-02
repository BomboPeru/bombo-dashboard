import Cookie from 'js-cookie'

export const state = () => ({
  token: null
})

export const getters = {
  getToken (state) {
    return state.token
  }
}

export const mutations = {
  setToken (state, value) {
    state.token = value
    Cookie.set('token', value)
  }
}

export const actions = {
  removeAuth (context) {
    Cookie.remove('userId')
    Cookie.remove('token')
    context.state.token = null
  }
}

const auth = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default auth
