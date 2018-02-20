<template>
    <div id="tooltip-menu" class="elevation rounded" :style="{ 'right': rightOffset }">
      <div class="body">
        <p class="title">{{ title }}</p>
        <template v-if="listSupport">
          <ul class="ul-support">
            <li v-for="(link, i) in listSupportItems" :key="i+'-support'">
              <nuxt-link :to="link.url">{{ link.name }}</nuxt-link>
            </li>
          </ul>
        </template>
        <template v-else-if="listNotifications">
          <ul class="ul-notification">
            <li v-for="(notification, i) in notifications"
                :key="i+'-notif'">
              <div :class="['subject', notification.subject==='Incongruencias'?'warning':'']">
                {{ notification.subject }}
              </div>
              <div class="message">
                {{ notification.message }}
              </div>
            </li>
          </ul>
        </template>
        <template v-else-if="profile">
          <p class="username">{{ profileData.name }}</p>
          <p class="coins">{{ profileData.coins }}</p>
          <div class="divider"></div>
          <ul class="ul-profile">
            <li v-for="(profileLink, i) in listProfileItems" :key="i+'-profile'">
              <nuxt-link :to="profileLink.url">{{ profileLink.name }}</nuxt-link>
            </li>
          </ul>
          <p class="signout-item" @click="logOut">Cerrar session</p>
        </template>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'tooltip-menu',
    props: {
      listSupport: {
        type: Boolean,
        default: false
      },
      listNotifications: {
        type: Boolean,
        default: false
      },
      profile: {
        type: Boolean,
        default: false
      },
      rightOffset: {
        type: String,
        default: '100px'
      },
      notifications: Array
    },
    computed: {
      title () {
        if (this.listSupport) {
          return 'Soporte'
        } else if (this.listNotifications) {
          return 'Notificaciones'
        } else if (this.profile){
          return 'Mi Perfil'
        } else {
          return ''
        }
      }
    },
    data () {
      return {
        profileData: {
          name: 'Jaime Bustamante',
          coins: '45B'
        },
        listProfileItems: [
          { name: 'Mi Perfil', url: '' },
          { name: 'Transferencias', url: '' }
        ],
        listSupportItems: [
          { name: 'FAQ', url: '' },
          { name: 'Asistencia tecnica', url: '' },
          { name: 'Reportar un problema', url: '' }
        ]
      }
    },
    methods: {
      logOut () {
        console.log('clcik')
        this.$store.commit('turnOnSignoutDialog')
      }
    }
  }
</script>

<style scoped lang="stylus">

  #tooltip-menu
    position absolute
    z-index: 998
    top 76px
    right 100px
    background #fafafa
    font-family Titillium Web

  .title
    font-size 12px
    font-family Titillium Web
    color #243237
    text-align center
  .body
    padding 8px
  .body ul
    list-style-type none
    padding 0
  .body a
    text-decoration none
    font-size 12px
    font-family Titillium Web
    color #243237
    font-weight bold
  .ul-notification
    font-size 12px
  .subject
    color: #445F69
    font-size: 9px;
    text-align center
  .message
    color: #25BF89
    font-size: 12px;
    text-align center
  .warning
    color: #FFC400
  .username
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 14px;
    text-align: center;
    color: #445F69;
  .coins
    font-weight: 600;
    line-height: normal;
    font-size: 14px;
    text-align: center;
    color: #25BF89;
  .signout-item
    margin-top 23px
    font-weight: 600;
    line-height: normal;
    font-size: 14px;
    text-align: center;
    color: #FFC400;
    cursor pointer


  @media screen and (max-width: 1023px)
    #tooltip-menu
      top 56px

</style>
