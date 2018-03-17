import axios from 'axios'

export default {
  refreshToken: function () {
  },
  async saveUser() {
    const token = window.localStorage.getItem('token')
    if (token === null) return false

    try {
      const res = await axios.get('http://api.bombo.pe/auth/verify', { headers: { 'Authorization': 'Bearer ' + token }})

      const userId = res.data.data.user.id
      window.localStorage.setItem('userId', userId)

      const response = await axios.get('http://api.bombo.pe/api/v2.0/users/' + userId,
        { headers: { 'Authorization': 'Bearer ' + token }})
      window.localStorage.setItem('user', JSON.stringify(response.data.data))

      return true
    } catch (e) {
      console.log(e)
      return e
    }

  },
  isAuthenticated: async function () {
    if (process.server) return

    const token = window.localStorage.getItem('token')
    if (token === null) return false
    try {
      const res = await axios.get('http://api.bombo.pe/auth/verify', { headers: { 'Authorization': 'Bearer ' + token }})

      const currentTimeInSeconds = new Date().getTime() / 1000
      window.localStorage.setItem('userId', res.data.data.user.id)
      window.localStorage.setItem('userAccount', JSON.stringify(res.data.data.user))

      return res.data.data.exp > currentTimeInSeconds;
    } catch (e) {
      console.log(e)
    }
  },
  setToken: function (value) {
    if (process.server) return
    window.localStorage.setItem('token', value)
  },
  setUserId: function (value) {
    if (process.server) return
    window.localStorage.setItem('userId', value)
  },
  getToken: function () {
    if (process.server) return
    const token = window.localStorage.getItem('token')
    return token
  }
}
