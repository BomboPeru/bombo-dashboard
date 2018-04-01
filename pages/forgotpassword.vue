<template>
    <div id="forgotpassword">
      <div class="card-forgotpass card-container elevation-2">
        <div class="container">
          <p class="instructions">Escribe la direccion de correo afiliada a tu cuenta, para poder enviarte el formato de renovacion de contraseña</p>

          <form v-on:submit.prevent="send">
            <div class="group-form">
              <div class="label" > Email </div>
              <input class="input-text" type="text" v-model="email" placeholder="Correo Electrónico">
            </div>
            <p class="message">{{message}}</p>
            <div class="btn-container">
              <div class="send-btn elevation" @click="send">ENVIAR</div>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
  import InputText from '../components/InputText'

  export default {
    name: 'forgotpassword',
    components: {
      InputText
    },
    middleware: 'notAuthenticated',
    data () {
      return {
        email: '',
        message: ''
      }
    },
    methods: {
      isValidEmail (a) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(a)
      },
      send () {

        if (!this.isValidEmail(this.email)) {
          this.message = 'Insertar email válido'
          return
        }

        this.$axios.$post('auth/password-forgot', {
          email: this.email
        }).then(res => {
          this.message = 'En unos momentos te llegará un correo para restaurar tu contraseña'
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

  #forgotpassword
    background url(/landing/background_login_register.jpg)
    background-size cover
    height 100vh
    // height calc(100vh - 76px)
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position relative

  .label
    color rgba(255, 255, 255, 0.56)
    font-family 'Nunito Sans'
    font-size 12px
    margin-left 12.5%
    margin-right 12.5%
    text-align left
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

  .card-forgotpass
    font-family Raleway
    width 415px
    background #0F202D
    border-radius 8px
    color white
    padding 8px

  .title-bar
    width 100%
    height 52px
    background #67A6F0

    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: 52px;
    font-size: 24px;
    text-align: center;
    color: #FAFAFA;
  .container
    text-align center
  .instructions
    margin-top 22px
    margin-bottom 32px
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 14px;
    text-align: center;

  .send-btn
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;

    cursor pointer
    margin-top 12px
    margin-bottom 12px
    display inline-block
    color white
    padding 10px 41px 10px 41px
    background: #67A6F0;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    font-family: 'Nunito Sans';
    font-weight: 600;
    font-size: 14px;

  .message
    margin-top 12px
    margin-bottom 12px
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 14px;
    text-align: center;
    color: orangered;
</style>
