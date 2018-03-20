<template>
    <div id="register" class="background">

      <div class="bombo-home">
        <nuxt-link to="/">
          <img src="/landing/bombo_outline2_3x.png" width="100px" alt="">
        </nuxt-link>
      </div>

      <div class="card-container elevation rounded-sm">
        <div class="banner-side">
          <p class="title-register">REGISTRATE</p>
          <p class="phrase-register">No esperes para ser parte de bombo</p>
        </div>
        <div class="grid-content grid-content-side">
          <div class="avatar-section">
            <div>
              <cc-avatar src="/landing/avatar_default.png" sm class="avatar"/>
              <div class="upload-photo-indication">Selecciona tu foto de perfil</div>
            </div>
          </div>
          <div class="column-a">

            <div class="group-form">
              <div class="label" v-if="!isValidInput(constraints.name.rules, user.name)">
                {{ constraints.name.message }}
              </div>
              <div>
                <input type="text" class="input-form" placeholder="Nombre Completo" v-model="user.name">
              </div>
            </div>

            <div class="group-form">
              <div class="label">
                Fecha de nacimiento
              </div>
              <div class="birthday-container">
                <input type="date" class="input-form" placeholder="Fecha de nacimiento" v-model="user.birthday_fake">
              </div>
            </div>

            <div class="group-form">
              <div class="label" v-if="!isValidInput(constraints.identity_document.rules, user.identity_document)">
                {{ constraints.identity_document.message }}
              </div>
              <div>
                <input type="number" class="input-form" placeholder="Documento de identidad (DNI)" v-model="user.identity_document">
              </div>
            </div>

          </div>
          <div class="column-b">

            <div class="group-form">
              <div class="label" v-if="!isValidInput(constraints.email.rules, user.email)">
                {{ constraints.email.message }}
              </div>
              <div>
                <input type="text" class="input-form" placeholder="Correo electronico" v-model="user.email">
              </div>
            </div>

            <div class="group-form">
              <div class="label" v-if="!isValidInput(constraints.username.rules, user.username)">
                {{ constraints.username.message }}
              </div>
              <div>
                <input type="text" class="input-form" placeholder="Nombre de usuario" v-model="user.username">
              </div>
            </div>

            <div class="group-form">
              <div class="label" v-if="!isValidInput(constraints.password.rules, user.password)">
                {{ constraints.password.message }}
              </div>
              <div>
                <input type="password" class="input-form" placeholder="Contraseña">
              </div>
            </div>

            <div class="group-form">
              <div class="label" v-if="!isValidInput(constraints.password.rules, user.password)">
                {{ constraints.password.message }}
              </div>
              <div>
                <input type="password" class="input-form" placeholder="Repetir Contraseña" v-model="user.password">
              </div>
            </div>
          </div>
          <div class="signup-btn-section">

            <!-- :style="{ 'background': isValidForm?'#25BF89':'#969696' }" -->
            <div class="btn-continue elevation" @click="createUser">
              Registrarse
            </div>

            <div class="warning"> {{message}} </div>

          </div>
        </div>

      </div>


    </div>
</template>

<script>
  import InputText from '../components/InputText'
  import InputSelect from '../components/InputSelect'
  import CcAvatar from '../components/CcAvatar'

  import auth from '../utils/auth'

  export default {
    name: 'register',
    components: {
      InputText, InputSelect, CcAvatar
    },
    data () {
      return {
        message: '',
        constraints: {
          name: {
            message: 'Ingresa tu nombre y apellidos',
            rules: [
              a => a.length > 3,
              a => /\s/.test(a)
            ]
          },
          email: {
            message: 'Inserta tu email',
            rules: [
              a => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(a)
            ]
          },
          username: {
            message: 'Más de 6 caracteres',
            rules: [
              a => a.length >= 6
            ]
          },
          password: {
            message: 'Más de 8 caracteres',
            rules: [
              a => a.length >= 8
            ]
          },
          identity_document: {
            message: 'Ingresa tu DNI',
            rules: [
              a => a.length === 8
            ]
          },
          terms: {
            message: 'Debes aceptar los terminos y condiciones',
            rules: [
              a => a === true
            ]
          }
        },
        user: {
          name: '',
          birthday_fake: '',
          birthday: '',
          document_type: 'DNI',
          identity_document: '',
          email: '',
          username: '',
          password: '',
          terms: false
        }
      }
    },
    methods: {
      isValidInput: function (rules, input) {
        let isValid = true

        for (let i = 0; i < rules.length; i++) {
          let fn = rules[i]
          isValid = fn(input)
          if (isValid === false) break
        }

        return isValid
      },
      validateRule: function (fn, input) {
        return fn(input)
      },
      goToLogin () {
        this.$router.push('/login')
      },
      openTermsConditionsDialog () {
        this.$store.commit('openTermsConditionsDialog')
      },
      async createUser () {
        if (this.isValidForm) {
          if (this.user.name !== '' && this.user.email !== ''
            && this.user.username !== '' && this.user.password!== '') {

            let birthdayDate = new Date(this.user.birthday_fake)
            this.user.birthday = birthdayDate.toISOString()

            let minYearsOld = 18
            let currentDate = (new Date ()).getTime()
            const age = (currentDate - birthdayDate.getTime())/(1000*60*60*24*30*12)

            if (age < minYearsOld) {
              this.message = 'No eres mayor de edad'
              return
            }

            // loading on
            this.$store.state.isLoading = true
            try {
              let response = await this.$axios.$post('http://api.bombo.pe/auth/signup', this.user )

              let responseLogin = await this.$axios.post('http://api.bombo.pe/auth/login', {
                username: this.user.username,
                password: this.user.password
              })

              this.$axios.setToken(responseLogin.data.token, 'Bearer')
              auth.setToken(responseLogin.data.token)
              auth.setUserId(response.user.id)

              // loading off
              this.$store.state.isLoading = false

              this.$router.push('/client/teams')

            } catch (e) {
              // loading off
              this.$store.state.isLoading = false
              console.log(e)
              this.message = e.response.data.error
            }
          } else {
            console.log('invalid data')
          }
        }
        console.log('isValidForm', this.isValidForm)
      }
    },
    computed: {
      isValidForm () {
        const self = this
        let isValid = true
        for (let key in this.constraints) {
          isValid = this.isValidInput(self.constraints[key].rules, self.user[key])
          if (!isValid) break
        }
        return isValid
      }
    }
  }
</script>

<style scoped lang="stylus">

  input[type='number'] {
    appearance: textfield;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']:hover::-webkit-inner-spin-button,
  input[type='number']:hover::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  #register
    min-height 100vh
    background: url(/landing/background_login_register.png) center
    background-size cover
    /*
  .background
    background rgba(255, 0, 0, 0.45) url(../assets/background/background_login.png)
    background-blend-mode multiply
    background-size cover
    */

  .bombo-home
    position absolute
    top 20px
    left 30px

  .center
    padding-top 12px
    display: flex;
    justify-content: center;
    align-items: center;
  .card-container
    overflow visible
    background #0F202D
    border-radius 15px
    padding 8px 20px
    position absolute
    top 50%
    left 50%
    transform translateX(-50%) translateY(-50%)
    height 500px
    width 70vw

  .grid-content
    display grid

    width 100%
    height: 100%;

    grid-template-columns: 50% 50%;
    grid-template-rows: 20% 60% 20%;

  .grid-content-side
    width 70%
    float right
  .banner-side
    float left
    background white
    position absolute
    width 30%
    top 0
    left 0
    bottom 0
    border-bottom-left-radius  15px
    border-top-left-radius 15px
    z-index: 3
  .phrase-register
  .title-register
    text-align center
    color #72808a
    font-family 'Nunito Sans'
    font-weight bold

  .title-register
    margin-top 40px
    font-size 22px
  .phrase-register
    font-size 14px

  .avatar-section
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1
    grid-row-end: 2

    position relative

  .column-a
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2
    grid-row-end: 3
  .column-b
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2
    grid-row-end: 3
  .signup-btn-section
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 3
    grid-row-end: 4

    justify-self center
    align-self center


  .column-a
    padding 4px 20px 0px 60px
  .column-b
    padding 4px 60px 0px 20px

  .column-a
  .column-b
    display: flex;
    flex-wrap: wrap;


  .avatar
    position absolute
    top -60px
    left 50%
    transform translateX(-50%)
  // z-index 20

  .upload-photo-indication
    color #bbb
    font-family Raleway
    font-size 12px
    text-align center

    position absolute
    top 50px
    left 50%
    transform translateX(-50%)

  .group-form
    width 100%

  .input-form
    outline none
    width 100%
    border 0
    background transparent
    border-bottom 0.5px solid white
    font-family Raleway
    color white
    padding-bottom: 4px;

  .btn-continue
    display: inline-block
    position relative
    padding 12px 60px
    text-align center
    background: #25BF89;
    border-radius: 20px;
    cursor pointer
    color white

    font-family: Raleway;
    font-weight: 100;
    font-size: 16px;
    margin-bottom 6px
    text-transform uppercase


  .birthday-label-container
    position relative
    margin-top 16px
  .birthday-label
    position: absolute;
    top: -5px;
    left: 0;
    font-size: 11px;
    z-index: 9;
  .label
    color #bbbbbb
    font-family Raleway
    font-size 12px

  .warning
    color orangered
    font-family Raleway
    // font-weight: bold;
    font-size 14px

  @media screen and (max-width: 1023px)
    .card-container
      width 90vw
    .grid-content-side
      width 100%
      float left
    .banner-side
      display none

    .grid-content
      grid-template-columns: 100%;
      grid-template-rows: 20% 30% 30% 20%;

    .avatar-section
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1
      grid-row-end: 2

    .column-a
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 2
      grid-row-end: 3

      padding: 4px 50px;

    .column-b
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 3
      grid-row-end: 4

      padding: 4px 50px;

    .signup-btn-section
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 4
      grid-row-end: 5

      padding-top: 22px;

  @media screen and (max-width: 500px)
    .card-container
      height 80vh
      margin-top 30px
      overflow auto
    .grid-content
      grid-template-columns: 100%;
      grid-template-rows: auto auto auto 20%;
    .avatar
      position absolute
      top 0px
      left 50%
      transform translateX(-50%)

    .upload-photo-indication
      position relative
      top 0

    .group-form
      padding 8px 0px
    .column-a
      padding: 4px 12px;

    .column-b
      padding: 4px 12px;
</style>
