export default function ({ app, store, redirect }) {

  console.log('RE :: ','setting setToken each time reloads, executed in client side (apparently)')
  app.$axios.setToken(store.getters['auth/getToken'], 'Bearer')

  // app.$axios.onRequest(config => {
  //   // const token = store.getters['auth/getToken'] || ''
  //   //
  //   // config.headers.common['Authorization'] = 'Bearer ' + token
  // })

  app.$axios.onError(error => {
    console.log('request error <<<', error.response.status)
    if (store.state.isLoading) store.state.isLoading = false

    if (error.response.status === 401) {
      redirect('/')
    }
  })
}
