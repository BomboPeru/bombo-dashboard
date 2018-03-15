<template>
    <div id="signout-dialog" v-if="isOpen">
      <dialog-container @closeDialog="closeDialog" :fixed="false">
        <div class="container">
          <div class="logout-card elevation rounded">
            <div class="header elevation">
              {{ title }}
            </div>
            <div class="line"></div>
            <p class="message">{{message}}</p>
            <div class="bottom-button-container">
              <div class="button-cancel" @click="collapse">
                Cancelar
              </div>
              <div class="button-exit" @click="logout">
                Salir
              </div>
            </div>
          </div>
        </div>
      </dialog-container>
    </div>
</template>

<script>
  import DialogContainer from './DialogContainer'

  export default {
    name: 'sign-out-dialog',
    components: {
      DialogContainer
    },
    props: {
      isOpen: { type: Boolean, default: false }
    },
    data () {
      return {
        title: 'CERRAR SESSION',
        message: 'RECUERDA QUE AL CERRAR SESION DEJARAN DE LLEGARTE NOTIFICACIONES SOBRE TUS EQUIPOS.'
      }
    },
    methods: {
      closeDialog () {
        this.$emit('onCollapse', false)
      },
      collapse () {
        this.$store.commit('turnOffSignoulogouttDialog')
      },
      logout () {
        localStorage.removeItem('user')
        localStorage.removeItem('userAccess')
        localStorage.removeItem('userId')
        localStorage.removeItem('token')

        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .container
    border-radius: 12px
    background #FAFAFA
  .logout-card
    width 375px
    overflow hidden
    font-family Titillium Web
  .message
    margin 20px 12px 34px 12px
    color black
    font-size: 14px;
    text-align: center
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
    background: #FFC400;
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
  .button-cancel
    background: #25BF89;
    border-radius: 12px;
    padding 4px 28px 4px 28px
    cursor pointer
  .button-exit
    padding 4px 28px 4px 28px
    background: #FFC400;
    border-radius: 12px;
    cursor pointer

</style>
