<template>
    <div id="toolbar" :class="[nonLanding?'dark':'transparent']">
      <div class="img-container">
        <nuxt-link :to="bomboLogoUrl">
          <img :src="nonLanding? '/landing/bombo_all_white.svg':'/landing/bombo_purple.png'" alt="">
        </nuxt-link>
      </div>


      <template v-if="!sessionVerified"></template>
      <template v-else-if="alreadySigned">
        <div class="reenter-username" @click="goToHome">
          <i class="far fa-user"></i>
          Hola, <span class="user-hello"> {{ username }}</span>
        </div>
      </template>
      <template v-else>
        <div class="links uppercase">
          <div :class="['flex', nonLanding?'white-link':'dark-link']" >
            <!--<nuxt-link to="/">COMO JUGAR</nuxt-link>-->
            <!--<nuxt-link to="/">CONTÁCTANOS</nuxt-link>-->
            <nuxt-link to="/register" class="register">Regístrate</nuxt-link>
            <nuxt-link to="/login" class="login elevation">INICIAR SESIÓN</nuxt-link>
          </div>
        </div>
        <div :class="['menu-btn', !nonLanding?'dark-menu':'white-menu']" >
          <i class="fas fa-bars fa-2x" @click="openMenu"></i>
        </div>
      </template>

      <transition name="menu">
        <div v-if="menu" class="menu-container">
          <div class="menu elevation">
            <ul :class="['list']">
              <li v-for="(link, i) in links"
                  :key="i+'-link'">
                <nuxt-link :to="link.url">{{ link.name }}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>

  export default {
    name: 'basic-toolbar',
    data () {
      return {
        sessionVerified: false,
        alreadySigned: false,
        username: '',
        menu : false,
        links: [
          { url: '/register', name: 'REGÍSTRATE' },
          { url: '/login', name: 'INICIA SESIÓN' }
          // { url: '/', name: 'COMO JUGAR' },
          // { url: '/', name: 'CONTÁCTENOS' }
        ]
      }
    },
    computed: {
      nonLanding () {
        // return (this.$route.path === '/register')
        return this.$route.path !== '/'
      },
      bomboLogoUrl () {
        return (this.$route.path === '/forgotpassword' || this.$route.path === '/faq') ? '/client/home':'/'
      }
    },
    methods: {
      openMenu () {
        this.menu = !this.menu
      },
      goToHome () {
        this.$router.push('/client/home')
      },
      async verifyToken (token) {
        const BASE_URL = this.$store.state.BASE_URL

        try {
          const response = await this.$axios.get(BASE_URL + 'auth/verify', { headers: { 'Authorization': 'Bearer ' + token }})
          return true
        } catch (e) {
          return false
        }
      }
    },
    mounted () {

      if (this.$store.getters['auth/getToken'] !== null) {
        this.verifyToken(this.$store.getters['auth/getToken']).then(isValid => {
          if (isValid) {
            if (this.$store.getters['user'] !== null) {
              this.alreadySigned = true
              this.username = this.$store.getters['user'].username
            }
          } else {

            this.$store.dispatch('auth/removeAuth')
          }
          this.sessionVerified = true
        })
      } else {
        this.sessionVerified = true
      }

    }
  }
</script>

<style scoped lang="stylus">

  toolbar-height = 92px

  #toolbar
    background #24323700
    width 100%
    position relative
    /*top 0*/
    /*left 0*/
    height toolbar-height
    z-index 10
  .transparent
    background #24323700
  .dark
    background #243237 !important

  .img-container
    float left
    margin-left 50px
    min-height toolbar-height
    display inline-block
    position relative
  .img-container img
    position absolute
    top 60%
    transform translateY(-50%)
    width 116px

  .reenter-username
    float right
    position absolute
    top 44px
    right 50px
    cursor pointer
  .reenter-username .fa-user
    padding-right 10px

  .reenter-username .user-hello
    font-size 20px
    font-weight 700
    font-family 'Nunito Sans'

  @media screen and (max-width: 1023px)
    .reenter-username
      top 44px
      right 20px
      font-size 12px
    .reenter-username .user-hello
      font-size 14px
    .img-container img
      width 70px




  .links
    display block
    margin-left 150px
    padding-top 37px

    /*
    display: flex;
    width: 79%;
    flex-wrap: wrap;
    justify-content: space-around;
    */
  .flex
    display: flex
    width: 40%
    justify-content: space-around
    float right

  .links span
    cursor pointer
  .links span
  .links a
    margin 0 15px
    text-decoration none
    color #131251
    font-family 'Nunito Sans'
    font-weight 600
    font-size 14px
    padding: 10px 19px
  .white-link a
    color white !important
  .dark-link
    color #24313A

  .uppercase
    text-transform uppercase
  .register
    border 1px solid black
    border-radius 30px
    padding 10px 30px
  .login
    border-radius 18px
    background #01E19F
    // border 2px solid white
    color white !important
  // .custom-elevation


  .menu-btn
    cursor pointer
    float right
    display none
    position relative
    top 29px
    right 31px
  .dark-menu
    color #243237 !important
  .white-menu
    color white !important
  .menu-btn i
    font-size: 24px !important;
  .menu-container
    position absolute
    top 72px
    right 0
    z-index 10
  .menu
    margin-right 10px
    padding 4px 10px
    background #131251
  .menu ul
    list-style-type none
    padding 4px 10px
  .menu li
    font-family Titillium Web
    font-weight bold
    padding-bottom 14px
  .list a
    color white
    text-decoration none

  .menu-enter-active {
    transition: all .3s ease;
  }
  .menu-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .menu-enter, .menu-leave-to {
    transform: translateY(-50px);
    opacity: 0;
  }

  @media screen and (max-width: 1023px)
    .menu-btn
      display inline
    .img-container
      margin-left 20px
  @media screen and (max-width: 1023px)
    .links
      display none
</style>
