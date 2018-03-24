<template>
  <div>
    <sidebar mode="simple"/>

    <div id="profile">
      <div class="container">
        <div class="profile-section">
          <div style="display: flex; justify-content: center;">
            <input type="file" style="display: none;" ref="inputFileImage" @change="atPhotoLoaded">
            <cc-avatar square :src="urlImage!==''?urlImage:'/avatar.png'" @clickAvatar="clickAvatar"/>
          </div>
          <div style="text-align: center">
            <div>
              <input-text solid placeholder="Nombres y Apellidos" v-model="user.name" big/>
            </div>
            <div>
              <input-text solid placeholder="Email" v-model="user.email" big/>
            </div>
            <div>
              <input-text solid placeholder="DNI" type="number" v-model="user.identity_document" big/>
            </div>
            <div>
              <input-text solid placeholder="Cumpleaños" v-model="birthdayFake" type="date" big/>
            </div>
            <!--<div>-->
            <!--<input-text solid placeholder="Email" v-model="user.email" big/>-->
            <!--</div>-->
            <div class="btn-container" style="display: flex; justify-content: center;">
              <div class="update-btn elevation" @click="updateUser">ACTUALIZAR PERFIL</div>
            </div>
          </div>
        </div>
        <div class="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
  // import IconButton from '../../components/IconButton'
  import InputText from '../../components/InputText'
  import CcAvatar from '../../components/CcAvatar'
  import Sidebar from '~/components/Sidebar.vue'

  export default {
    layout: 'dashboard',
    name: 'profile',
    components: {
      CcAvatar, InputText, Sidebar
    },
    computed: {
      birthdayFake: {
        get () {
          const user = this.user
          const birthdayFake = new Date(user.birthday)

          const formatMonth = (((birthdayFake.getMonth() + 1).toString()).padStart(2, '0'))
          let formatBirthday = formatMonth + '/' +
            birthdayFake.getDate() + '/' +
            birthdayFake.getFullYear()

          return formatBirthday
        },
        set (value) {
          this.user.birthday = (new Date(value)).toISOString()
        }
      }
    },
    data () {
      return {
        urlImage: '',
        user: {
          name: '',
          email: '',
          identity_document: '',
          birthday: ''
        }
      }
    },
    methods: {
      clickAvatar (_) {
        this.$refs.inputFileImage.click()
      },
      atPhotoLoaded () {

        const self = this
        console.log(this.$refs.inputFileImage.files)

        let reader = new FileReader()
        reader.onload = function(e) {
          self.urlImage = e.target.result
        }
        reader.readAsDataURL(this.$refs.inputFileImage.files[0])

        {
          let formData = new FormData()
          formData.append('photo', this.$refs.inputFileImage.files[0])

          const userId = this.$store.getters['auth/getUserId']
          const token = this.$store.getters['auth/getToken']
          let request = new XMLHttpRequest()

          request.open('POST', 'http://api.bombo.pe/api/v2.0/users/'+ userId +'/update-profile-photo')
          request.setRequestHeader('Authorization', 'Bearer ' + token)
          request.send(formData)

          this.$store.dispatch('turnOnSnackbar', 'Avatar actualizado')
        }

      },
      async updateUser () {
        // const userId = this.$store.getters['auth/getUserId']
        // this.user.birthday = (new Date(this.birthdayFake)).toISOString()

        this.$axios.post('http://api.bombo.pe/api/v2.0/users/'+ this.user.id +'/update-profile',
          { user: this.user })
          .then(res => {
            console.log(res)
            // res.data.data
            this.$store.dispatch('updateUser', res.data.data)
            this.$store.dispatch('turnOnSnackbar', 'Perfil Actualizado')
          })
          .catch(e => {
            console.log(e)
            this.$store.dispatch('turnOnSnackbar', 'Ocurrio un error. Intentalo mas tarde.')
          })
      }
    },
    mounted () {
      // console.log('profile', this.$store.getters['user'])
      const user = this.$store.getters['user']
      // console.log('profile', this.user)
      this.user = user

      const userId = this.$store.getters['auth/getUserId']
      // const token = this.$store.getters['auth/getToken']
      const url = 'http://api.bombo.pe/api/v2.0/storage/users/' + userId + '/profile-photo'
      this.urlImage = url
    }
  }
</script>

<style scoped lang="stylus">
  /*#matches*/
  #profile
    height calc(100vh - 128px)
    display flex
    justify-content center
  .container
    width 80%
    padding 24px 12px 4px 15px
  /*.profile-section*/
    /*display flex*/
    /*justify-content center*/
  .card-profile
    background #fafafa
    padding-top 12px
  .info-section
    padding 12px 24px 12px 24px
    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 14px;
    color: #445F69;
  .info-section p
    margin-bottom 6px
  .username
  .coins
    text-align center
  .coins
    color #25BF89
  .coins
    margin-bottom 46px !important
  .btn-container
    margin-top 12px
    margin-bottom  12px
    margin-right 12px
    margin-left 12px
  .center
    text-align center
  .right
    text-align right
  .add-phone-btn
    display inline-block
    background #25BF89
    color white
    border-radius: 10px;
    padding 1px 10px 1px 10px
    font-weight: normal
    height 24px
    cursor pointer
  .country span
    margin-right 10px
  .edit-btn
    display inline-block
    background #445F69
    color white
    border-radius: 10px;
    padding 1px 10px 1px 10px
    font-weight: normal
    height 24px
    cursor pointer
    font-family: Titillium Web;
    font-size: 14px;
    margin-bottom  12px
  .icon-edit
    position: relative;
    top: 3px;
  .update-btn
    cursor pointer
    background #13BBB6
    color white
    height 50px
    line-height 50px
    border-radius 4px
    font-weight: bold
    width 340px
    font-family: Titillium Web;

  @media screen and (max-width: 1023px)
    .container
      display block
      width 100%
    /*.profile-section*/
      /*width 100%*/
</style>
