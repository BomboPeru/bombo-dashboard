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
    // isAuthenticated: async function () {
    //   if (process.server) return
    //   const token = window.localStorage.getItem('token')
    //   if (token === null) return false
    //   try {
    //     const res = await axios.get('http://api.bombo.pe/auth/verify', { headers: { 'Authorization': 'Bearer ' + token }})
    //     const currentTimeInSeconds = new Date().getTime() / 1000
    //     return res.data.data.exp > currentTimeInSeconds;
    //   } catch (e) {
    //     console.log(e)
    //   }
    // },
  }
}

export default auth
