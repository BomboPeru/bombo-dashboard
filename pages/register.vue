<template>
    <div id="register" class="background">
      <div class="title-bar elevation">REGISTRATE CON NOSOTROS PARA DIFRUTAR DE TODA LA EXPERIENCIA BOMBO</div>

      <div class="center">
        <div class="card-container elevation rounded-sm">
          <p class="title">Datos personales</p>

          <div class="warning" v-if="!isValidInput(constraints.name.rules, user.name)">
            {{ constraints.name.message }}
          </div>
          <div>
            <input-text placeholder="Nombre" v-model="user.name" big solid/>
          </div>

          <div class="warning" v-if="!isValidInput(constraints.email.rules, user.email)">
            {{ constraints.email.message }}
          </div>
          <div>
            <input-text placeholder="Correo electronico" v-model="user.email" big solid/>
          </div>

          <div class="warning" v-if="!isValidInput(constraints.identity_document.rules, user.identity_document)">
            {{ constraints.identity_document.message }}
          </div>
          <div>
            <input-text placeholder="Documento de identidad (DNI)" big solid v-model="user.identity_document"/>
          </div>
          <div class="birthday-label-container">
            <label class="birthday-label">Fecha de nacimiento</label>
          </div>

          <div class="birthday-container">
            <input-text placeholder="Fecha de nacimiento" big solid v-model="user.birthday_fake" type="date"/>
          </div>
          <p class="title">Datos de la cuenta</p>

          <div class="warning" v-if="!isValidInput(constraints.username.rules, user.username)">
            {{ constraints.username.message }}
          </div>
          <div>
            <input-text placeholder="Nombre de usuario" big solid v-model="user.username"/>
          </div>

          <div class="warning" v-if="!isValidInput(constraints.password.rules, user.password)">
            {{ constraints.password.message }}
          </div>
          <div>
            <input-text placeholder="Contrasena" big solid v-model="user.password" type="password"/>
          </div>

          <div class="warning" v-if="!isValidInput(constraints.terms.rules, user.terms)">
            {{ constraints.terms.message }}
          </div>
          <div style="margin-top: 4px">
            <cc-checkbox v-model="user.terms"/>
            <p class="terms-conditions">
              <!--<input type="checkbox" v-model="termsChecked">-->
              HE LEÍDO Y ACEPTO LOS <span @click="openTermsConditionsDialog">TERMINOS Y CONDICIONES</span>
            </p>
          </div>

          <div>
            <div class="btn-continue elevation" @click="createUser"
                 :style="{ 'background': isValidForm?'#25BF89':'#969696' }">
              Registrar
            </div>
          </div>

          <div class="warning"> {{message}} </div>

        </div>
      </div>
      <div class="bottom-container">
        <div class="link-login">
          Ya eres usuario? <span @click="goToLogin">Inicia Sesion</span>
        </div>
      </div>
    </div>
</template>

<script>
  import InputText from '../components/InputText'
  import InputSelect from '../components/InputSelect'
  import FormAlert from '../components/FormAlert'
  import CcCheckbox from '../components/CcCheckbox'

  export default {
    name: 'register',
    components: {
      InputText, InputSelect, FormAlert, CcCheckbox
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
            message: 'Inserta un e-mail valido',
            rules: [
              a => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(a)
            ]
          },
          username: {
            message: 'Mayor a 6 caracteres',
            rules: [
              a => a.length >= 6
            ]
          },
          password: {
            message: 'Mayor a 8 caracteres',
            rules: [
              a => a.length >= 8
            ]
          },
          identity_document: {
            message: 'Mayor a 8 caracteres',
            rules: [
              a => a.length > 8
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

            // loading on
            this.$store.state.isLoading = true
            try {
              let response = await this.$axios.$post('http://api.bombo.pe/auth/signup', this.user )

                // setTimeout(() => {
                //   this.$router.push('/login')
                // }, 500)

              this.$axios.post('http://api.bombo.pe/auth/login', {
                username: this.user.username,
                password: this.user.password
              }).then(res => {
                auth.setToken(res.data.token)
                this.$router.push('/client/teams')

                // loading off
                this.$store.state.isLoading = false
              })
              .catch(e => {
                // loading off
                this.$store.state.isLoading = false
                console.log(e)
                this.message = e.response.data.error
              })
            } catch (e) {
              // loading off
              this.$store.state.isLoading = false
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
  toolbar_height = 76px
  #register
    min-height calc(100vh - 76px)
    /*background #fafafa*/
    background: url(/signup_background.jpeg) center
    background-size cover
    /*
  .background
    background rgba(255, 0, 0, 0.45) url(../assets/background/background_login.png)
    background-blend-mode multiply
    background-size cover
    */
  .center
    padding-top 12px
    display: flex;
    justify-content: center;
    align-items: center;
  .card-container
    overflow visible
    padding 8px 20px
  .title
    color #445F69
    font-family: Titillium Web;
    font-style: normal;
    line-height: normal;
    font-size: 16px;
    padding-bottom 4px
    margin-top 12px
    font-weight bold

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
  .terms-conditions
    display inline-block
    margin-left 8px
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
    padding-top 8px
    padding-bottom 8px
    text-align center
  .btn-continue
    /*display: inline-block*/
    position relative
    display: block
    margin-top 46px
    text-align center
    background: #25BF89;
    border-radius: 3px;
    padding 4px 28px 4px 28px
    cursor pointer
    color white

    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 22px;
    margin-bottom 6px
    text-transform uppercase
    transition all .2s ease-out
  .btn-continue:hover
    transform translateY(-4px)

  .link-login
    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 18px;
    text-align: center;
    color: #fafafa;
  .link-login span
    color #25BF89
    cursor pointer
  .form-input
    display inline-block
  .birthday-label-container
    position relative
    margin-top 16px
  .birthday-label
    position: absolute;
    top: -5px;
    left: 0;
    font-size: 11px;
    z-index: 9;
  .warning
    color orangered
    font-family: Titillium Web;
    font-weight: bold;
    font-size 16px

  @media screen and (max-width: 1023px)
    .title-bar
      font-size 16px
  @media screen and (max-width: 500px)
    .title-bar
      font-size 10px
</style>
