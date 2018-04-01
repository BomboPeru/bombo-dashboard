module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Bombo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Bombo, es una plataforma para el juego en la cual puedes jugar con tus once la liga inglesa y el mundial. Podrás ganar hasta 5 veces de tu inversión inicial. Qué esperas!? Arma tus once y juega!' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Titillium+Web:400,600' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Raleway:400,500,900' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Nunito+Sans:400,600,700' },

      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.8/css/all.css'}
      // { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' }
    ],
    script: [
      { src: '/js/drift.js' }
    ]
  },
  modules: [
    '@nuxtjs/axios',
    // '@nuxtjs/pwa'
  ],
  axios: {
    baseURL: 'https://api.bombo.pe/'
  },
  // manifest: {
  //   name: 'Bombo',
  //   lang: 'en-US',
  //   display: "standalone"
  // },
  // meta: {
  //   theme_color: '#0F202D'
  // },
  // icon: {
  //   iconSrc: '/favicon.png'
  // },
  plugins: [
    { src: '~/plugins/axios', ssr: false }
  ],
  css: ['@/assets/styles/main.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#FF6565' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    vendor: ['vue-the-mask', 'vue-content-loader'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
