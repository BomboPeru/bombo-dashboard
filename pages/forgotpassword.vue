<template>
    <div id="forgotpassword">
      <div class="title-bar elevation">Opciones de Recuperacion de cuenta</div>
      <div class="container">
        <p class="instructions">Escribe la direccion de correo afiliada a tu cuenta, para poder enviarte el <br> formato de renovacion de contraseña</p>
        <input-text v-model="email" placeholder="Correo Electronico"/>
        <p class="message">{{message}}</p>
        <div class="btn-container">
          <div class="send-btn elevation" @click="send">Enviar</div>
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
    data () {
      return {
        email: '',
        message: ''
      }
    },
    methods: {
      send () {
        this.$axios.$post('https://api.bombo.pe/auth/password-forgot', {
          email: this.email
        })
      }
    }
  }
</script>

<style scoped lang="stylus">

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
    margin-top 37px
    margin-bottom 32px
    font-family: Titillium Web;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 18px;
    text-align: center;
    color: #000000;
  .send-btn
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;

    cursor pointer
    margin-top 48px
    display inline-block
    color white
    font-weight: 600
    font-family: Titillium Web;
    padding 6px 41px 6px 41px
    background: #67A6F0;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
  .message
    margin-top 12px
    margin-bottom 12px
    font-family: Titillium Web;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 18px;
    text-align: center;
    color: #000000;
</style>
