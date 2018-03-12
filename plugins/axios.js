export default function ({ app, store }) {

  app.$axios.onRequest(config => {
    const token = store.getters['auth/getToken'] || ''
    config.headers.common['Authorization'] = 'Bearer ' + token
  })
}
