import axios from 'axios'
export default {
  refreshToken: function () {
  },
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
  setToken: function (value) {
    if (process.server) return
    window.localStorage.setItem('token', value)
  },
  getToken: function () {
    if (process.server) return
    const token = window.localStorage.getItem('token')
    return token
  }
}
