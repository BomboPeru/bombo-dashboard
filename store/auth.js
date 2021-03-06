import axios from 'axios'

const auth = {
  namespaced: true,
  state: {},
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
    removeAuth (context) {
      if (process.server) return

      localStorage.removeItem('user')
      localStorage.removeItem('userId')
      localStorage.removeItem('token')
    },
    setUser (context, user) {
      if (process.server) return
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('userId', user.id)
    },
    async fetchUser (context, token) {
      if (process.server) return

      // const token = window.localStorage.getItem('token')
      if (token === null || token === undefined) return false

      try {
        console.log('BASE_URL', context.rootState.BASE_URL)

        const response = await axios.get(context.rootState.BASE_URL + 'auth/verify', { headers: { 'Authorization': 'Bearer ' + token }})
        const userId = response.data.data.user.id

        window.localStorage.setItem('userId', userId)

        const response2 = await axios.get(context.rootState.BASE_URL + 'api/v2.0/users/' + userId,
          { headers: { 'Authorization': 'Bearer ' + token }})

        window.localStorage.setItem('user', JSON.stringify(response2.data.data))

        context.rootState.userUrlImage = context.rootState.BASE_URL + 'api/v2.0/storage/users/' + userId + '/profile-photo'
        context.rootState.user = response2.data.data
        return true
      } catch (e) {

        console.log(e)
        return e
      }
    }
  }
}

export default auth
