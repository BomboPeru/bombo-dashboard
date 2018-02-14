<template>
    <div id="register" class="background">
      <div class="center">
        <div class="card-container rounded">
          <p class="title">DATOS PERSONALES</p>
          <input-text placeholder="Nombre"/>
          <input-text placeholder="Apellidos"/>
          <p class="title">DATOS DE LA CUENTA</p>
          <input-text placeholder="Correo electronico"/>
          <input-text placeholder="Nombre de usuario"/>
          <input-text placeholder="Contrasena"/>
          <input-text placeholder="Repetir Contrasena"/>
          <input-select :items="['aa', 'bbb']"/>
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
    }
  }
</script>

<style scoped lang="stylus">
  toolbar_height = 76px
  #register
    min-height calc(100vh - 76px)
  .background
    background rgba(255, 0, 0, 0.45) url(../assets/background/background_login.png)
    background-blend-mode multiply
    background-size cover
  .center
    padding-top 50px
    display: flex;
    justify-content: center;
    align-items: center;
  .title
    color #445F69
    font-family: Titillium Web;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 18px;
    padding-bottom 4px
</style>
