<template>
    <div id="register" class="background">
      <div class="title-bar elevation">REGISTRATE CON NOSOTROS PARA DIFRUTAR DE TODA LA EXPERIENCIA BOMBO</div>

      <div class="center">
        <div class="card-container">
          <p class="title">Datos personales</p>
          <div class="form-row">
            <input-text placeholder="Nombre" square flat v-model="user.name" class="form-input"/>
            <form-alert :message="constraints['name'].message"
                        :correct="constraints['name'].minLength <= user.name.length"/>
          </div>
          <div class="form-row">
            <input-text placeholder="Correo electronico" square flat v-model="user.email" class="form-input"/>
            <form-alert :message="constraints['email'].message"
                        :correct="constraints['email'].minLength <= user.email.length"/>
          </div>
          <div class="form-row">
            <input-text placeholder="Documento de identidad (DNI)" square flat v-model="user.identity_document" class="form-input"/>
            <form-alert :message="constraints['identity_document'].message"
                        :correct="constraints['identity_document'].minLength <= user.identity_document.length"/>
          </div>
          <div class="birthday-container">
            <label class="birthday-label">Fecha de nacimiento</label>
          </div>
          <div class="form-row">
            <input-text placeholder="Fecha de nacimiento" square flat v-model="user.birthday_fake" class="form-input" type="date"/>
            <!--<form-alert :message="constraints['identity_document'].message"-->
                        <!--:correct="constraints['identity_document'].minLength <= user.identity_document.length"/>-->
          </div>
          <p class="title">Datos de la cuenta</p>
          <div class="form-row">
            <input-text placeholder="Nombre de usuario" square flat v-model="user.username" class="form-input"/>
            <form-alert :message="constraints['username'].message"
                        :correct="constraints['username'].minLength <= user.username.length"/>
          </div>
          <div class="form-row">
            <input-text placeholder="Contrasena" square flat v-model="user.password" type="password" class="form-input"/>
            <form-alert :message="constraints['password'].message"
                        :correct="constraints['password'].minLength <= user.password.length"/>
          </div>
          <!--<input-text placeholder="Repetir Contrasena" square type="password"/>-->

          <div class="form-row">

            <!--<form-alert :message="constraints['terms'].message"-->
                        <!--:correct="constraints['terms'].checked === termsChecked"/>-->
            <p class="terms-conditions">
              <input type="checkbox" v-model="termsChecked">
              HE LEIDO Y ACEPTO LOS <span @click="openTermsConditionsDialog">TERMINOS Y CONDICIONES</span>
            </p>

          </div>

          <div class="form-row">
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

  export default {
    name: 'register',
    components: {
      InputText, InputSelect, FormAlert
    },
    data () {
      return {
        termsChecked: false,
        constraints: {
          name: {
            minLength: 3,
            message: '3 letras como minimo.'
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
        // "name": "Luis Carrasco",
        // "username": "luis.carrasco",
        // "email": "luis.carrasco@fake.com",
        // "birthday": "2000-03-11T00:39:48.037Z",
        // "password": "12345678",
        // "document_type": "DNI",
        // "identity_document": "7986542"
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
          if (this.user.name !== '' && this.user.email !== ''
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
                    this.message = 'username y/o password no es correcto.'
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
  .card-container
    overflow visible
  .title
    color #445F69
    font-family: Titillium Web;
    font-style: normal;
    line-height: normal;
    font-size: 16px;
    padding-bottom 4px
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
    color: #445F69;
  .link-login span
    color #25BF89
    cursor pointer
  .form-row
    margin-top 10px
    margin-bottom 20px
  .form-input
    display inline-block
  .birthday-container
    position relative
  .birthday-label
    position: absolute;
    top: -5px;
    left 0
    font-size: 12px;
</style>
