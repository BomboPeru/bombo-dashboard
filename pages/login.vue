<template>
   <div id="login">
     <div class="card-login rounded-sm">
       <div>
         <p class="title-login">Iniciar sesion</p>
       </div>
       <input-text big solid width="280px" v-model="username" placeholder="Username"/>
       <input-text big solid width="280px" type="password" v-model="password" placeholder="Password"/>
       <div class="btn-login" @click="login">
         ENTRAR
       </div>
       <div class="error">
         {{message}}
       </div>
     </div>
   </div>
</template>

<script>
  import InputText from '../components/InputText'
  import auth from '../utils/auth'

  export default {
    name: 'login',
    components: { InputText },
    data () {
      return {
        username: '',
        password: '',
        message: ''
      }
    },
    methods: {
      fetchUser () {
        auth.saveUser().then(done => {
          console.log('done', done)
          if (done) {
            this.$router.push('/client/teams')
          }
        }, err => {
          console.log(err)
          this.message = 'username y/o password no es correcto.'
        })
      },
      login () {

        // loading on
        this.$store.state.isLoading = true

        this.$axios.post('http://api.bombo.pe/auth/login', {
          username: this.username,
          password: this.password
        }).then(res => {

            console.log('res?', res)

            this.$axios.setToken(res.data.token, 'Bearer')
            this.$store.commit('auth/setToken', res.data.token)

            this.fetchUser()
          })
          .catch(err => {
            // loading off
            console.log('err?', err)

            this.$store.state.isLoading = false
            console.log(err)
            this.message = 'username y/o password no es correcto.'
          })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .card-login
    width 360px
    padding-left 40px
    padding-top 20px
    padding-bottom 40px
    background #243237
  .title-login
    font-family: Titillium Web;
    font-weight bold
    color white
    font-size 22px
    display inline
  .btn-login
    width 280px
    background #25BF89
    height 50px
    margin-top: 10px;
    cursor pointer

    line-height 48px
    text-align center
    color white
    font-size 22px
    font-family: Titillium Web;
    font-weight bold
  .error
    padding-top 10px
    font-size 18px
    font-family: Titillium Web;
    font-weight bold
    color #ec6a1f

  #login
    background url(/login_background.jpeg)
    background-size cover
    height calc(100vh - 76px)

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: start;
    position relative

  @media screen and (max-width: 1023px)
    .card-login
      width 320px
      padding-left 20px
  @media screen and (max-height: 500px)
    .card-login
      position relative
      margin-top 50px
      margin-bottom 50px
    #login
      height 100%
  @media screen and (min-height: 501px)
    .card-login
      position absolute
      top 50%
      left 50%
      transform translateX(-50%) translateY(-50%)


</style>
