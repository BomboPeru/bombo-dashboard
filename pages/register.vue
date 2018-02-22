<template>
    <div id="register" class="background">
      <div class="title-bar elevation">REGISTRATE CON NOSOTROS PARA DIFRUTAR DE TODA LA EXPERIENCIA BOMBO</div>

      <div class="center">
        <div class="card-container">
          <p class="title">Datos personales</p>
          <input-text placeholder="Nombre" square/>
          <input-text placeholder="Apellidos" square/>
          <p class="title">Fecha de nacimiento</p>
          <input-text type="date" square/>
          <p class="title">Documento de identidad</p>
          <input-text type="text" square/>
          <input-select :items="['DNI']" square/>
          <p class="title">Datos de la cuenta</p>
          <input-text placeholder="Correo electronico" square/>
          <input-text placeholder="Nombre de usuario" square/>
          <input-text placeholder="Contrasena" square/>
          <input-text placeholder="Repetir Contrasena" square/>

          <p class="terms-conditions">
            <input type="checkbox">
            HE LEIDO Y ACEPTO LOS <span @click="openTermsConditionsDialog">TERMINOS Y CONDICIONES</span>
          </p>
        </div>
      </div>
      <div class="bottom-container">
        <div class="btn-continue elevation">Continuar</div>
        <div class="link-login">
          Ya eres usuario? <span @click="openLoginDialog">Inicia Sesion</span>
        </div>
      </div>
    </div>
</template>

<script>
  import InputText from '../components/InputText'
  import InputSelect from '../components/InputSelect'

  export default {
    name: 'register',
    components: {
      InputText, InputSelect
    },
    methods: {
      openLoginDialog () {
        this.$store.commit('openLoginDialog')
      },
      openTermsConditionsDialog () {
        this.$store.commit('openTermsConditionsDialog')
      }
    }
  }
</script>

<style scoped lang="stylus">
  toolbar_height = 76px
  #register
    min-height calc(100vh - 76px)
    background #fafafa
    /*
  .background
    background rgba(255, 0, 0, 0.45) url(../assets/background/background_login.png)
    background-blend-mode multiply
    background-size cover
    */
  .center
    padding-top 50px
    display: flex;
    justify-content: center;
    align-items: center;
  .title
    color #445F69
    font-family: Titillium Web;
    font-style: normal;
    line-height: normal;
    font-size: 14px;
    padding-bottom 4px
    font-weight bold

  .title-bar
    width 100%
    height 52px
    background #EA504C

    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: 52px;
    font-size: 24px;
    text-align: center;
    color: #FAFAFA;
  .terms-conditions
    font-family: Titillium Web;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 14px;
    color: #445F69;
  .terms-conditions span
    font-weight: bold;
    color #25BF89
    cursor pointer
  .bottom-container
    margin-top 59px
    margin-bottom 59px
    text-align center
  .btn-continue
    display: inline-block
    background: #EA504C;
    border-radius: 12px;
    padding 4px 28px 4px 28px
    cursor pointer
    color white

    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 18px;
    margin-bottom 6px
  .link-login
    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 18px;
    text-align: center;
    color: #445F69;
  .link-login span
    color #25BF89
    cursor pointer
</style>
