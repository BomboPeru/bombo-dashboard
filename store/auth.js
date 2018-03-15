const auth = {
  namespaced: true,
  state: {
  },
  getters: {
    getToken () {
      if (process.server) return
      let token = window.localStorage.getItem('token')
      return token
    },
    getUserId () {
      if (process.server) return
      let userId = window.localStorage.getItem('userId')
      return userId
    },
    getUser () {
      if (process.server) return
      let userInString = window.localStorage.getItem('user')
      return JSON.parse(userInString)
    }
  },
  mutations: {
    setToken (state, value) {
      if (process.server) return
      window.localStorage.setItem('token', value)
    }
  },
  actions: {
    setUser (context, user) {
      if (process.server) return
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('userId', user.id)
    }
  }
}

export default auth
