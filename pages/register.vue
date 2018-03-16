<template>
    <div id="register" class="background">
      <div class="title-bar elevation">REGISTRATE CON NOSOTROS PARA DIFRUTAR DE TODA LA EXPERIENCIA BOMBO</div>

      <div class="center">
        <div class="card-container elevation rounded-sm">
          <p class="title">Datos personales</p>
          <form-alert onlytext label="Nombre"
                      :message="constraints['name'].message"
                      :correct="constraints['name'].minLength <= user.name.length"/>
          <div>
            <input-text placeholder="Nombre" v-model="user.name" big solid/>
          </div>
          <form-alert onlytext label="Correo electronico"
                      :message="constraints['email'].message"
                      :correct="constraints['email'].minLength <= user.email.length"/>
          <div>
            <input-text placeholder="Correo electronico" v-model="user.email" big solid/>
          </div>
          <form-alert onlytext  label="Documento de identidad (DNI)"
                      :message="constraints['identity_document'].message"
                      :correct="constraints['identity_document'].minLength <= user.identity_document.length"/>
          <div>
            <input-text placeholder="Documento de identidad (DNI)" big solid v-model="user.identity_document"/>
          </div>
          <div class="birthday-label-container">
            <label class="birthday-label">Fecha de nacimiento</label>
          </div>
          <div class="birthday-container">
            <input-text placeholder="Fecha de nacimiento" big solid v-model="user.birthday_fake" type="date"/>
            <!--<form-alert :message="constraints['identity_document'].message"-->
                        <!--:correct="constraints['identity_document'].minLength <= user.identity_document.length"/>-->
          </div>
          <p class="title">Datos de la cuenta</p>
          <form-alert onlytext  label="Username"
                      :message="constraints['username'].message"
                      :correct="constraints['username'].minLength <= user.username.length"/>
          <div>
            <input-text placeholder="Nombre de usuario" big solid v-model="user.username"/>
            <!--<input-text placeholder="Nombre de usuario" square flat v-model="user.username" class="form-input"/>-->
          </div>
          <form-alert onlytext  label="Password"
                      :message="constraints['password'].message"
                      :correct="constraints['password'].minLength <= user.password.length"/>
          <div>
            <input-text placeholder="Contrasena" big solid v-model="user.password" type="password"/>
          </div>

          <div style="margin-top: 4px">
            <cc-checkbox v-model="termsChecked"/>
            <p class="terms-conditions">
              <!--<input type="checkbox" v-model="termsChecked">-->
              HE LEIDO Y ACEPTO LOS <span @click="openTermsConditionsDialog">TERMINOS Y CONDICIONES</span>
            </p>

          </div>

          <div>
            <div class="btn-continue elevation" @click="createUser"
                 :style="{ 'background': isValidToSubmit?'#25BF89':'#969696' }">
              Registrar
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-container">
        <div class="link-login">
          Ya eres usuario? <span @click="openLoginDialog">Inicia Sesion</span>
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
        termsChecked: false,
        constraints: {
          name: {
            minLength: 3,
            message: '3 letras como minimo e inserta tu nombre completo',
            hasSpaces: true
          },
          email: {
            minLength: 3,
            message: '3 letras como minimo.'
          },
          username: {
            minLength: 3,
            message: '3 letras como minimo.'
          },
          password: {
            minLength: 3,
            message: '3 letras como minimo.'
          },
          identity_document: {
            minLength: 9,
            message: '9 letras como minimo.'
          },
          terms: {
            checked: true,
            message: 'Debe aceptar los terminos y condiciones'
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
          password: ''
        }
      }
    },
    methods: {
      openLoginDialog () {
        this.$store.commit('openLoginDialog')
      },
      openTermsConditionsDialog () {
        this.$store.commit('openTermsConditionsDialog')
      },
      async createUser () {
        if (this.isValidToSubmit) {
          if (this.user.date !== '' && this.user.email !== ''
            && this.user.username !== '' && this.user.password!== '') {

            let birthdayDate = new Date(this.user.birthday_fake)
            this.user.birthday = birthdayDate.toISOString()

            try {
              let response = await this.$axios.$post('http://api.bombo.pe/auth/signup', this.user )
              if (response.error !== null) {
                this.$store.dispatch('turnOnSnackbar', 'Hubo un problema al momento del registro.')
              } else {
                setTimeout(() => {
                  // this.$router.push('/')
                  this.$store.dispatch('turnOnSnackbar', 'Usuario regitrado!')
                }, 300)
                // response.data.token
                // response.data.user.username
                // response.data.user.password

                this.$axios.post('http://api.bombo.pe/auth/login', {
                  username: this.user.username,
                  password: this.user.password
                })
                  .then(res => {
                    auth.setToken(res.data.token)
                    this.$router.push('/client/teams')
                  })
                  .catch(err => {
                    console.log(err)
                  })
              }
            } catch (e) {
              this.$store.dispatch('turnOnSnackbar', 'Hubo un problema al momento del registro.')
            }
          } else {
            console.log('invalid data')
          }
        }
        console.log(this.isValidToSubmit)
      }
    },
    computed: {
      isValidToSubmit () {
        let isValid = true
        for (let key in this.constraints) {
          if ( this.constraints[key].minLength !== undefined ) {
            isValid = this.constraints[key].minLength <= this.user[key].length
            if (isValid === false) {
              break
            }
          }
          if ( this.constraints[key].checked !== undefined ) {
            isValid = this.constraints[key].checked === this.termsChecked
            if (isValid === false) {
              break
            }
          }
          if ( this.constraints[key].hasSpaces !== undefined ) {
            isValid = /\s/.test(this.user[key])
            if (isValid === false) {
              break
            }
          }
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
  @media screen and (max-width: 1023px)
    .title-bar
      font-size 16px
  @media screen and (max-width: 500px)
    .title-bar
      font-size 10px
</style>
