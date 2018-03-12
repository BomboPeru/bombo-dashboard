const auth = {
  namespaced: true,
  state: {
  },
  getters: {
    getToken () {
      if (process.server) return
      let token = window.localStorage.getItem('token')
      return token
    }
  },
  mutations: {
    setToken (state, value) {
      if (process.server) return
      window.localStorage.setItem('token', value)
    }
  },
  actions: {
    isAuthenticated: async function () {
      if (process.server) return
      const token = window.localStorage.getItem('token')
      if (token === null) return false
      try {
        const res = await axios.get('http://api.bombo.pe/auth/verify', { headers: { 'Authorization': 'Bearer ' + token }})
        // console.log(res.data.data.exp)
        const currentTimeInSeconds = new Date().getTime() / 1000
        return res.data.data.exp > currentTimeInSeconds;
      } catch (e) {
        console.log(e)
      }
    },
  }
}

export default auth
