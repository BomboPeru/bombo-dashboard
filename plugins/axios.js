export default function ({ app, store, redirect }) {

  app.$axios.onRequest(config => {
    const token = store.getters['auth/getToken'] || ''
    config.headers.common['Authorization'] = 'Bearer ' + token
  })

  app.$axios.interceptors.response.use(
    undefined,
    (error) => {
      if (error.response.status === 401) {
        redirect('/')
      }
    })
}
