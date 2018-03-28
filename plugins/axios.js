export default function ({ app, store, redirect, error }) {

  app.$axios.setToken(store.getters['auth/getToken'], 'Bearer')

  // app.$axios.onRequest(config => {
  //   // const token = store.getters['auth/getToken'] || ''
  //   //
  //   // config.headers.common['Authorization'] = 'Bearer ' + token
  // })

  app.$axios.onError(e => {
    console.log('request error <<<', typeof e)
    console.log('request error <<<', e.message)
    console.log('request error <<<', e.status)

    if (store.state.isLoading) store.state.isLoading = false

    console.log('request error <<<', e.response)

    if (e.response === undefined) {
      error({ message : e.message, statusCode: 500 })
      return
    }

    if (e.response.status === 401) {
      redirect('/')
    }

  })
}
