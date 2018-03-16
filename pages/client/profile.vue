<template>
  <div id="profile">
    <div class="container">
      <div class="profile-section">
        <div style="display: flex; justify-content: center;">
          <cc-avatar square src="/profile_photo.png"/>
        </div>
        <div style="text-align: center">
          <div>
            <input-text solid placeholder="Nombres y Apellidos" v-model="user.name" big/>
          </div>
          <div>
            <input-text solid placeholder="Email" v-model="user.email" big/>
          </div>
          <div>
            <input-text solid placeholder="DNI" v-model="user.identity_document" big/>
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
</template>

<script>
  // import IconButton from '../../components/IconButton'
  import InputText from '../../components/InputText'
  import CcAvatar from '../../components/CcAvatar'

  export default {
    layout: 'dashboard',
    name: 'profile',
    components: {
      CcAvatar, InputText
    },
    computed: {
    },
    data () {
      return {
        date: '',
        birthdayFake: '',
        user: {
          name: '',
          email: '',
          identity_document: '',
          birthday: undefined
        }
      }
    },
    methods: {
      async fetchUser() {
        const user = this.$store.getters['auth/getUser']

        if (user === null) return

        this.user.name = user.name
        this.user.email = user.email
        this.user.identity_document = user.identity_document

        let birthdayFake = new Date(user.birthday)
        let formatMonth = (((birthdayFake.getMonth() + 1).toString()).padStart(2, '0'))
        let formatBirthday = birthdayFake.getFullYear() + '-' +
          formatMonth + '-' +
          birthdayFake.getDate()
        this.birthdayFake = formatBirthday
      },
      async updateUser () {
        const userId = this.$store.getters['auth/getUserId']

        this.user.birthday = (new Date(this.birthdayFake)).toISOString()
        this.$axios.post('http://api.bombo.pe/api/v2.0/users/'+ userId +'/update-profile',
          { user: this.user })
          .then(res => {
            console.log(res)
            this.$store.dispatch('turnOnSnackbar', 'Perfil Actualizado')
          })
          .catch(e => {
            console.log(e)
            this.$store.dispatch('turnOnSnackbar', 'Ocurrio un error. Intentalo mas tarde.')
          })
      }
    },
    mounted () {
      this.fetchUser()
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
