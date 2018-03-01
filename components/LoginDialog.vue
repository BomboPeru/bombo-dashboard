<template>
    <div id="login-dialog" v-if="isOpen">
      <dialog-container @closeDialog="closeDialog" :fixed="false">
        <div class="container">
          <div class="signin-card elevation rounded">
            <div class="header elevation">
              {{ title }}
            </div>
            <div class="line"></div>

            <div class="content">
              <div class="form">
                <div class="message" v-if="message.length > 0">
                  <img src="../assets/icons/warning_icon.png" alt="" width="24px" height="24px">
                  <div class="warning-message">
                    {{ message }}
                  </div>
                </div>
                <p class="label">Nombre de usuario o Correo electronico</p>
                <input-text class="input-text" v-model="username" placeholder="nombre@correo.com" square width="300px"/>
                <p class="label">Contraseña</p>
                <input-text class="input-text" v-model="password" placeholder="****" square width="300px" type="password"/>
                <p class="link-forgotpass"><span @click="goToForgotPassword">olvide mi contraseña</span></p>
              </div>

            </div>

            <div class="bottom-button-container">
              <div class="button-login elevation" @click="login">
                ACCEDER
              </div>
            </div>
            <p class="messageForgotPass">{{messageForgotPass}} <span class="link-register" @click="goToRegister">AQUI</span></p>
          </div>
        </div>
      </dialog-container>
    </div>
</template>

<script>
  import DialogContainer from './DialogContainer'
  import InputText from './InputText'

  let users = []

  export default {
    name: 'login-dialog',
    components: {
      DialogContainer, InputText
    },
    props: {
      isOpen: { type: Boolean, default: false }
    },
    data () {
      return {
        title: 'CERRAR SESSION',
        messageForgotPass: 'Aun no tienes una cuenta?, Registrate',
        username: '',
        password: '',
        message: ''
      }
    },
    methods: {
      closeDialog () {
        this.$emit('onCollapse', false)
      },
      login () {
      //  ...
        if (users.length === 0) {
          console.log('empty bank of users')
        }
        if (this.username !== '' && this.password !== '') {
          console.log('non empty')
          for (let i = 0; i < users.length; i++) {
            if ( users[i].username === this.username && users[i].password === this.password) {
              this.$store.commit('setUserId', users[i].id)
              this.$router.push({path: '/client/teams'})
              break
            }
          }
        }
      },
      async fetchAllUsers () {
        let response = await this.$axios.$get('http://api.bombo.pe/api/v1.0/user/all')
        users = response.data
        // response.data
      },
      goToForgotPassword () {
        this.$store.commit('closeLoginDialog')
        this.$router.push({path: '/forgotpassword'})
      },
      goToRegister () {
        this.$store.commit('closeLoginDialog')
        this.$router.push({path: '/register'})
      }
    },
    mounted () {
      this.fetchAllUsers()
    }
  }
</script>

<style scoped lang="stylus">

  .content
    display flex
    flex-wrap wrap
    justify-content center
  .container
    border-radius: 12px
    background #E8E8E8
  .signin-card
    width 375px
    overflow hidden
    font-family Titillium Web
  .header
    background: #243237;
    height 56px
    color white
    text-align: center
    line-height 56px
    font-weight: 600;
    font-size: 18px;
    position: relative;
  .line
    widows: 100%;
    height 10px
    background: #25BF89;
  .form
    padding-top 12px
    width 300px
  .link-forgotpass
    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 12px;
    text-align: right;
    color: #EA504C;
    margin-bottom 35px
  .link-forgotpass span
    cursor pointer
  .bottom-button-container
    display flex
    justify-content space-around
    padding-left 15px
    padding-right 15px
    padding-bottom 9px
    text-transform uppercase

    font-weight: 600;
    line-height: normal;
    font-size: 14px;
    text-align: center;
    color: #FAFAFA;
  .button-login
    background: #25BF89;
    border-radius: 12px;
    padding 4px 28px 4px 28px
    cursor pointer
  .messageForgotPass
    text-align center
    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 14px;
    color: #445F69;
    margin-bottom 21px
    margin-top 27px
  .link-register
    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 14px;
    color: #EA504C;
    cursor pointer
  .label
    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 14px;
    color: #445F69;
  .input-text
    margin-top: 4px !important;
  .warning-message
    background #FFC400
    border-radius: 12px;
    padding-top 4px
    padding-bottom 4px
    padding-left 10px
    padding-right 10px
    margin-left 12px
    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 12px;
    color: #243237;
  .message
    display flex
    justify-content center
    align-items center
    margin-bottom 20px
</style>
