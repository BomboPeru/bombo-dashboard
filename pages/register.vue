<template>
    <div id="register" class="background">

      <div class="bombo-home">
        <nuxt-link to="/">
          <img src="/landing/bombo_purple.png" width="100px" alt="">
        </nuxt-link>
      </div>

      <div class="card-container elevation rounded-sm">

        <!--<div class="banner-side">-->
          <!--<p class="title-register">REGISTRATE</p>-->
          <!--<p class="phrase-register">No esperes para ser parte de bombo</p>-->
        <!--</div>-->

        <div class="window-title">
        </div>

        <div class="grid-content grid-content-side">

          <div class="avatar-section">
              <input type="file" style="display: none;" ref="inputFileImage" @change="atPhotoLoaded">
              <cc-avatar :src="urlImage" @clickAvatar="clickAvatar" sm class="avatar"/>
              <div class="upload-photo-indication">Selecciona tu foto de perfil</div>
          </div>

          <!--<div class="column-a">-->

          <div class="group-form item-1">

            <div class="inner-item">
              <div class="warning" v-if="!isValidInput(constraints.name.rules, user.name) && hasSubmit">
                {{ constraints.name.message }}
              </div>
              <div class="label" v-else> Nombre </div>
              <div>
                <input-text big solid v-model="user.name" width="100%" placeholder="Ex. Juan"/>
                <!--<input type="text"-->
                <!--:class="['input-form', (!isValidInput(constraints.name.rules, user.name) && hasSubmit)?'input-warning':'']"-->
                <!--placeholder="" v-model="user.name">-->
              </div>
            </div>
          </div>

          <div class="group-form last-item-col-a item-2">
            <div class="inner-item">
              <div class="warning" v-if="!isValidInput(constraints.email.rules, user.email) && hasSubmit">
                {{ constraints.email.message }}
              </div>
              <div class="label" v-else> Email </div>

              <div>
                <input-text big solid v-model="user.email" width="100%" placeholder="Ex. juan@example.com"/>
                <!--<input type="text"-->
                <!--:class="['input-form', (!isValidInput(constraints.email.rules, user.email) && hasSubmit)?'input-warning':'']" -->
                <!--placeholder="" v-model="user.email">-->
              </div>
            </div>
          </div>


          <div class="group-form item-3">

            <div class="inner-item">
              <div class="warning" v-if="wrongBirthday && hasSubmit">
                {{ constraintBirthdayMessage }}
              </div>
              <div class="label birthday-label">
                Fecha de nacimiento
              </div>

              <div class="birthday-container">

                <input-date-select big solid flex v-model="user.birthday_fake"/>

                <!--<input type="date" :class="['input-form', (wrongBirthday && hasSubmit)?'input-warning':'']" class="input-form" placeholder="yyyy-mm-dd" v-model="user.birthday_fake">-->

              </div>
            </div>
          </div>

          <div class="group-form item-4">
            <div class="inner-item">
              <div class="warning" v-if="!isValidInput(constraints.username.rules, user.username) && hasSubmit">
                {{ constraints.username.message }}
              </div>
              <div class="label" v-else> Nombre de usuario </div>
              <div>
                <input-text big solid width="100%" v-model="user.username" placeholder="Ex. juanperez1234"/>
                <!--<input type="text"-->
                <!--:class="['input-form', (!isValidInput(constraints.username.rules, user.username) && hasSubmit)?'input-warning':'']"-->
                <!--placeholder="" v-model="user.username">-->
              </div>
            </div>
          </div>

          <!--</div>-->

          <!--<div class="column-b">-->

          <div class="group-form item-5">
            <div class="inner-item">
              <div class="warning" v-if="!isValidInput(constraints.surname.rules, user.surname) && hasSubmit">
                {{ constraints.surname.message }}
              </div>
              <div class="label" v-else> Apellidos </div>
              <div>
                <input-text big solid v-model="user.surname" width="100%" placeholder="Ex. Perez"/>
                <!--<input type="number"-->
                <!--:class="['input-form', (!isValidInput(constraints.identity_document.rules, user.identity_document) && hasSubmit)?'input-warning':'']"-->
                <!--placeholder=""-->
                <!--v-model="user.identity_document">-->
              </div>

            </div>
          </div>

          <div class="group-form last-item-col-a item-6">
            <div class="inner-item">
              <div class="warning" v-if="!isValidInput(constraints.identity_document.rules, user.identity_document) && hasSubmit">
                {{ constraints.identity_document.message }}
              </div>
              <div class="label" v-else> Documento de identidad </div>
              <div>
                <select name="" id="" v-model="user.document_type" class="select-type-id">
                  <option value="DNI">DNI</option>
                </select>
                <input-text big solid v-model="user.identity_document" width="70%" type="number" placeholder="Ex. 23423423"/>
                <!--<input type="number"-->
                <!--:class="['input-form', (!isValidInput(constraints.identity_document.rules, user.identity_document) && hasSubmit)?'input-warning':'']"-->
                <!--placeholder=""-->
                <!--v-model="user.identity_document">-->
              </div>
            </div>
          </div>


          <div class="group-form item-7">
            <div class="inner-item">
              <div class="warning" v-if="!isValidInput(constraints.password.rules, user.password) && hasSubmit">
                {{ constraints.password.message }}
              </div>
              <div class="label" v-else> Contraseña </div>
              <div>
                <input-text big solid v-model="user.password" width="100%" type="password" placeholder="*********"/>
                <!--<input type="password"-->
                <!--:class="['input-form', (!isValidInput(constraints.password.rules, user.password) && hasSubmit)?'input-warning':'']"-->
                <!--placeholder="" v-model="user.password">-->
              </div>
            </div>
          </div>

          <div class="group-form item-8">
            <div class="inner-item">
              <div class="warning" v-if="!isValidInput(constraints.repassword.rules, user.repassword) && hasSubmit">
                {{ constraints.repassword.message }}
              </div>
              <div class="label" v-else> Repetir Contraseña </div>
              <div>
                <input-text big solid v-model="user.repasswordpassword" width="100%" type="password" placeholder="*********"/>
                <!--<input type="password"-->
                <!--:class="['input-form', (!isValidInput(constraints.repassword.rules, user.repassword) && hasSubmit)?'input-warning':'']"-->
                <!--placeholder="" v-model="user.repassword">-->
              </div>

            </div>
          </div>

          <div class="signup-btn-section">

            <!-- :style="{ 'background': isValidForm?'#25BF89':'#969696' }" -->
            <!--  openTermsConditionsDialog -->
            <div class="info-terms">

              <div class="warning" v-if="!isValidInput(constraints.terms_checked.rules, user.terms_checked) && hasSubmit">
                {{ constraints.terms_checked.message }}
              </div>
              <cc-checkbox2 v-model="user.terms_checked" solid big class="checkbox-input"/>
              <!--<input class="check-terms" type="checkbox" v-model="user.terms_checked">-->
              Leí y acepto los
              <a href="/terms" target="_blank" class="terms-link">
                términos y condiciones
              </a>
              <!--<span class="terms-link" @click="openTermsConditionsDialog">términos y condiciones</span>-->
            </div>

            <div class="warning"> {{message}} </div>

            <div style="text-align: center">
              <div class="btn-continue" @click="createUser">
                Registrarse
              </div>
            </div>

          </div>
        </div>

      </div>


    </div>
</template>

<script>
  import InputText from '../components/InputText'
  import InputSelect from '../components/InputSelect'
  import CcAvatar from '../components/CcAvatar'
  import InputDateSelect from '../components/InputDateSelect'
  import CcCheckbox2 from '../components/CcCheckbox2'

  export default {
    name: 'register',
    components: {
      InputText, InputSelect, CcAvatar, InputDateSelect, CcCheckbox2
    },
    head () {
      return {
        title: 'Bombo - Regístrate!',
        meta: [
          { hid: 'description', name: 'description', content: 'Bombo, Regístrate' }
        ]
      }
    },
    middleware: 'notAuthenticated',
    data () {
      return {
        urlImage: '/landing/avatar_default.png',
        message: '',
        hasSubmit: false,
        wrongBirthday: false,
        constraintBirthdayMessage: 'Ingrese fecha',
        hasPhotoToUpload: false,
        constraints: {
          name: {
            message: 'Ingresa tu nombre',
            rules: [
              a => a.length > 1
            ]
          },
          surname: {
            message: 'Ingresa tus apellidos',
            rules: [
              a => a.length > 1
            ]
          },
          email: {
            message: 'Inserta tu email',
            rules: [
              a => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(a)
            ]
          },
          username: {
            message: 'Username debe tener más de 6 caracteres',
            rules: [
              a => a.length >= 6
            ]
          },
          password: {
            message: 'Password con más de 8 caracteres',
            rules: [
              a => a.length >= 8
            ]
          },
          repassword: {
            message: 'Debe volver a escribir su password',
            rules: [
              a => a === this.user.password
            ]
          },
          identity_document: {
            message: 'DNI: Ingresa tu DNI',
            rules: [
              a => a.length === 8
            ]
          },
          terms_checked: {
            message: 'Debes de aceptar los términos y condiciones',
            rules: [
              a => a === true
            ]
          }
        },
        user: {
          name: '',
          surname: '',
          birthday_fake: '2000-01-01',
          birthday: '',
          document_type: 'DNI',
          identity_document: '',
          email: '',
          username: '',
          password: '',
          terms_checked: false
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
      clickAvatar: function (_) {

        this.$refs.inputFileImage.click()
      },
      atPhotoLoaded () {

        const self = this

        let reader = new FileReader()
        reader.onload = function(e) {
          self.urlImage = e.target.result
        }
        reader.readAsDataURL(this.$refs.inputFileImage.files[0])

        this.hasPhotoToUpload = true

      },
      goToLogin () {
        this.$router.push('/login')
      },
      openTermsConditionsDialog () {
        this.$router.push('/terms')
        // this.$store.commit('openTermsConditionsDialog')
      },
      async createUser () {
        this.hasSubmit = true
        if (this.isValidForm && ( this.user.password === this.user.repassword )) {

          {
            console.log('this.user.birthday_fake', this.user.birthday_fake)

            if ( isNaN(Date.parse(this.user.birthday_fake) ) ) {

              this.wrongBirthday = true
              return
            } else {
              this.wrongBirthday = false
            }

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

            this.user.name += ' ' + this.user.surname

            try {
              let response = await this.$axios.$post('auth/signup', this.user )

              if ( this.hasPhotoToUpload )
              {
                let formData = new FormData()
                formData.append('photo', this.$refs.inputFileImage.files[0])

                const userId = response.user.id
                let request = new XMLHttpRequest()

                request.open('POST', 'api/v2.0/users/'+ userId +'/update-profile-photo')
                request.setRequestHeader('Authorization', 'Bearer ' + response.token)
                request.send(formData)
              }

              this.$store.state.isLoading = false

              this.$axios.setToken(response.token, 'Bearer')
              this.$store.commit('auth/setToken', response.token)
              this.$store.dispatch('updateUser', response.user)


              // loading off
              this.message = 'Cuenta registrada con éxito'
              setTimeout( () => {

                this.$router.push('/client/home')
                // this.$router.push('/')
              }, 3000)


            } catch (e) {
              // loading off
              this.$store.state.isLoading = false
              console.log(e)
              if (e.response.data.error === 'already exists') {
                this.message = 'Usuario con el mismo username y/o email ya existe'
              } else {
                this.message = e.response.data.error || e
              }
            }

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
          console.log('key',key)
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


  @font-face {
    font-family 'Campton Bold Demo'
    src url(/Campton-BoldDEMO.otf)
  }
  @font-face {
    font-family 'Campton Light Demo'
    src url(/Campton-LightDEMO.otf)
  }

  #register
    min-height 100vh
    background: url(/landing/background_login_register.jpg) center
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
  .window-title
    background #0F202D
    position absolute
    top 0
    left 0
    right 0
    height 30px

  .card-container
    overflow visible
    // background #0F202D
    background #fff
    border-radius 4px
    padding 8px 20px
    position absolute
    top 53%
    left 50%
    transform translateX(-50%) translateY(-50%)
    // height 600px
    height auto
    width 560px
    box-shadow: 0 8px 24px 0 rgba(0,0,0,0.82);

  .grid-content
    display grid
    width 100%
    height: 100%;

    grid-template-columns: 50% 50%;
    grid-template-rows: 60px auto auto auto auto auto 20%;

  .grid-content-side
    // width 70%
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

  .title-register
    margin-top 40px
    font-size 29px
    font-family 'Campton Bold Demo'
    font-weight bold
  .phrase-register
    font-size 13px
    font-family 'Campton Light Demo'

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
    grid-row-end: 7
  .column-b
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2
    grid-row-end: 7
  .signup-btn-section
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 7
    grid-row-end: 8

    justify-self center
    align-self center

  .last-item-col-a
    align-self: center


  .column-a
    padding 4px 20px 0px 60px
  .column-b
    padding 4px 60px 0px 20px

  /*.column-a*/
  /*.column-b*/
    /*display: subgrid*/
    // grid-template-columns: 100%;
    // grid-template-rows: auto auto auto auto auto auto;
    // flex-wrap: wrap;

  .item-1
  .item-2
  .item-3
  .item-4
  .item-5
  .item-6
  .item-7
  .item-8
    text-align center

  .item-1
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2
    grid-row-end: 3
  .item-2
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 3
    grid-row-end: 4
  .item-3
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 4
    grid-row-end: 5
  .item-4
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 5
    grid-row-end: 6
  .item-5
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2
    grid-row-end: 3
  .item-6
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 4
    grid-row-end: 5
  .item-7
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 6
    grid-row-end: 7
  .item-8
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 6
    grid-row-end: 7

  .inner-item
    margin 0 12px
  .birthday-container
    text-align left

  .item-6
    text-align: left

  .avatar
    position absolute !important
    top -60px
    left 50%
    transform translateX(-50%)
    box-shadow: 0 2px 18px 0 rgba(0,0,0,0.63);
  // z-index 20

  .upload-photo-indication
    color #A6A5FF
    font-family 'Nunito Sans'
    font-size 10px
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
    font-size 16px
    border-bottom 0.5px solid rgba(255, 255, 255, 0.44)
    font-family 'Nunito Sans'
    color white
    padding-bottom: 4px;

  .input-warning
    border-bottom 0.5px solid rgb(187, 54, 89)


  .btn-continue
    display: inline-block
    position relative
    padding 15px 48px
    text-align center
    background: #01E19F;
    border-radius: 40px;
    cursor pointer
    color white
    box-shadow: 0 2px 18px 0 rgba(0,0,0,0.23)

    font-family: Raleway;
    font-weight: 100;
    font-size: 16px;
    margin-bottom 6px
    text-transform uppercase

    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;



  .birthday-label
    margin-bottom 0px

  .select-type-id
    height 40px
    font-size 16px
    background white
    color #424242
    border-radius 0px
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.50)
    margin 10px 6px 10px 0px
    outline none
    border 0
    width 26%
    position: relative;
    top: -1px;
    font-family 'Nunito Sans'
    padding: 0 4px


  .label
    // color rgba(255, 255, 255, 0.86)
    color #4A48D2
    font-weight: 100
    font-family 'Nunito Sans'
    font-size 13px
    text-align: left
    margin-top 10px

  .warning
    color #f14066
    font-family 'Nunito Sans'
    font-size 12px
    text-align left
    font-weight 700
  .info-terms
    // color #fafafa
    color #4A48D2
    font-size 16px
    text-align center
    padding-bottom: 10px
    margin-top 40px
    margin-bottom 16px
  .btn-continue
    margin-bottom 40px

  .checkbox-input
    position relative
    top 4px
    left -4px
  .terms-link
    cursor pointer
    color #4A48D2

  .check-terms
    position relative
    top 2px
   @media screen and (max-width: 1300px)
    .info-terms
      margin-top 10px
      margin-bottom 8px
    .btn-continue
      margin-bottom 10px

  @media screen and (max-width: 1023px)

    .card-container
      width 500px
      //height 100vh
      margin-top 0
      overflow auto
    .grid-content-side
      width 100%
      float left
    .banner-side
      display none

    .grid-content
      grid-template-columns: 100%;
      grid-template-rows: 120px auto auto auto auto auto auto auto auto auto;

    .avatar
      position absolute
      top 0
      left 50%
      transform translateX(-50%)
      box-shadow: 0 2px 18px 0 rgba(0,0,0,0.63);

    .upload-photo-indication
      position absolute
      top 110px !important
      left 50%
      transform translateX(-50%)

    .avatar-section
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1
      grid-row-end: 2
    .item-1
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 2
      grid-row-end: 3
    .item-2
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 3
      grid-row-end: 4
    .item-3
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 5
      grid-row-end: 6
    .item-4
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 6
      grid-row-end: 7
    .item-5
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 7
      grid-row-end: 8
    .item-6
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 4
      grid-row-end: 5
    .item-7
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 8
      grid-row-end: 9
    .item-8
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 9
      grid-row-end: 10

    .signup-btn-section
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 10
      grid-row-end: 11

      padding-top: 8px;

  @media screen and (max-width: 500px)
    .card-container
      height 100vh
      width 100%
      margin-top 0
      overflow auto
      border-radius 0
      top: 49.5%
      left: 50%
    .signup-btn-section
      padding-top 12px
    .grid-content
      grid-template-columns: 100%;
      grid-template-rows: auto auto auto auto auto auto auto auto auto auto auto;

    .avatar
      position relative !important
      top 0px
      left 50%
      transform translateX(-50%)

    .upload-photo-indication
      position relative
      top 0 !important

    .group-form
      padding 8px 0px
    .column-a
      padding: 4px 12px;

    .column-b
      padding: 4px 12px;

</style>
