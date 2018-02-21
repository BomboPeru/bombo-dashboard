<template>
    <div id="login-dialog" v-if="isOpen">
      <dialog-container @closeDialog="closeDialog" :fixed="false">
        <div class="container">
          <div class="signin-card elevation rounded">
            <div class="header elevation">
              {{ title }}
            </div>
            <div class="line"></div>

            <div class="form">
              <input-text v-model="username" placeholder="nombre@correo.com"/>
              <input-text v-model="password" placeholder="****"/>
            </div>

            <div class="bottom-button-container">
              <div class="button-login elevation" @click="login">
                ACCEDER
              </div>
            </div>
            <p class="message">{{messageForgotPass}}</p>
          </div>
        </div>
      </dialog-container>
    </div>
</template>

<script>
  import DialogContainer from './DialogContainer'
  import InputText from './InputText'

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
        password: ''
      }
    },
    methods: {
      closeDialog () {
        this.$emit('onCollapse', false)
      },
      login () {
      //  ...
      }
    }
  }
</script>

<style scoped lang="stylus">

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
</style>
