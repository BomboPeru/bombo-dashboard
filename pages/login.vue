<template>
   <div id="login">
     <div class="bombo-home">
       <nuxt-link to="/">
         <img src="/landing/bombo_purple.png" width="100px" alt="">
       </nuxt-link>
     </div>
     <div class="card-login rounded-sm">
       <div class="content">
         <div style="text-align: center; margin-top: 20px;">
           <img src="/landing/bombo_all_white.svg" width="180px" alt="">
         </div>
         <div class="title-container">
           <p class="title-login">INGRESA TUS DATOS</p>
         </div>
         <div class="group-form">
           <div class="label" > Username </div>
           <input class="input-text" type="text" v-model="username" placeholder="Username">
         </div>
         <div class="group-form">
           <div class="label" > Register </div>
           <input class="input-text" type="password" v-model="password" placeholder="Password">
         </div>

         <div class="btn-login" @click="login">
           INGRESAR
         </div>
         <div class="forgot-password">
           <nuxt-link to="/">
             Olvidé mi contraseña
           </nuxt-link>
         </div>
         <div class="error">
           {{message}}
         </div>
       </div>

       <div class="signup-section">
         <div style="width: 50%; display: inline-block;" class="signup-info">
           Si no tienes una cuenta, registrate ahora y disfruta de una experiencia de jugar en bombo
         </div>
         <div style="display: inline-block; float: right">
           <div class="signup-btn">
             <nuxt-link to="/register">
               REGISTRARSE
             </nuxt-link>
           </div>
         </div>
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
      login () {
        // loading on
        this.$store.state.isLoading = true

        this.$axios.post('http://api.bombo.pe/auth/login', {
          username: this.username,
          password: this.password
        }).then(res => {

          // this.$axios.setToken(res.data.token, 'Bearer')
          // this.$store.commit('auth/setToken', res.data.token)
          // this.fetchUser(res.data.token)
          this.$router.push('/wait')
        })
        .catch(err => {
          // loading off
          console.log('err?', err)

          this.$store.state.isLoading = false
          console.log(err)
          this.message = 'username y/o password no es correcto.'
        })
      },
      fetchUser (token) {

        this.$store.dispatch('auth/fetchUser', token).then(done => {
          console.log('done', done)
          if (done) {
            this.$router.push('/client/home')
          } else {
            this.$store.state.isLoading = false
          }
        }, err => {
          console.log(err)
          this.message = 'username y/o password no es correcto.'
          this.$store.state.isLoading = false
        })

      }
    }
  }
</script>

<style scoped lang="stylus">

  .bombo-home
    position absolute
    top 20px
    left 30px

  .card-login
    font-family Raleway
    width 415px
    background #0F202D
    box-shadow: 0 8px 24px 0 rgba(0,0,0,0.82);
    border-radius: 13px;

  .content
    padding-left 60px
    padding-right 60px
    padding-top 20px
    padding-bottom 20px

  @media screen and (max-width: 1023px)
    .card-login
      padding-left 10px
      padding-right 10px

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1; /* Firefox */
  }
  .input-text
    outline none
    width 75%
    color white
    font-family 'Nunito Sans'
    margin-top 10px
    margin-bottom 20px
    margin-left 12.5%
    margin-right 12.5%
    background transparent
    border 0
    border-bottom 0.5px solid rgba(255, 255, 255, 0.44)
    font-size 14px
    padding-bottom: 3px;

  // .group-form

  .label
    color rgba(255, 255, 255, 0.56)
    font-family 'Nunito Sans'
    font-size 12px
    margin-left 12.5%
    margin-right 12.5%

  .title-container
    margin-top 37px
    margin-bottom 60px

  .title-login
    font-family: Raleway;
    font-weight: 500;
    color white
    font-size 16px
    text-align center

  .signup-section
    margin-top 22px
    margin-bottom 32px
    margin-left 31px
    margin-right 31px

  .signup-btn
    border 1px solid white
    border-radius 18px
    margin-left 20px
    padding 6px 19px
    font-size 10px
    text-align center
  .signup-btn a
    text-decoration none
    color white
  .signup-info
    color white
    font-size 10px

  .btn-login
    width 60%
    margin-left 20%
    margin-right 20%

    background #FE5567
    height 40px
    border-radius 25px
    margin-top: 14px;
    cursor pointer

    line-height 40px
    text-align center
    color white
    font-size 14px
    font-weight: 600;
    font-family: Raleway;
  .error
    padding-top 10px
    font-size 18px
    font-family: Raleway;
    font-weight bold
    color #ec6a1f
  .forgot-password
    margin-top 12px
    margin-bottom 4px
    font-size 12px
    text-align center
  .forgot-password a
    color cornflowerblue

  #login
    background url(/landing/background_login_register.jpg)
    background-size cover
    height 100vh
    // height calc(100vh - 76px)

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
    .content
      padding-left 25px
      padding-right 25px
      padding-top 20px
      padding-bottom 20px
    .label
      margin-left 0
      margin-right 0
    .input-text
      width 100%
      margin-top 10px
      margin-bottom 20px
      margin-left 0
      margin-right 0
    .signup-section
      margin-top 22px
      margin-bottom 32px
      margin-left 10px
      margin-right 10px


  @media screen and (min-height: 501px)
    .card-login
      position absolute
      top 50%
      left 50%
      transform translateX(-50%) translateY(-50%)


</style>
