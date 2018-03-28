<template>
    <div id="tooltip-menu" class="elevation rounded-sm" :style="{ 'right': rightOffset }">

      <div class="title-notifications" v-if="listNotifications">
        {{ title }}
      </div>
      <!--<p class="title" v-else-if="">{{ title }}</p>-->

      <div class="body">
        <!--<div class="divider"></div>-->

        <template v-if="listSupport">
          <ul class="ul-support">
            <li v-for="(link, i) in listSupportItems" :key="i+'-support'">
              <nuxt-link :to="link.url">{{ link.name }}</nuxt-link>
            </li>
          </ul>
        </template>

        <template v-else-if="listNotifications">
          <ul class="ul-notification">

            <li v-if="notifications.length === 0">
              <div style="text-align: center;">
                <!--<i class="fas fa-circle-notch fa-spin"></i>-->
                No tienes nuevas notificaciones
              </div>
            </li>

            <li v-for="(notification, i) in notifications"
                :key="i+'-notif'" style="position: relative;">

              <div class="delete-icon" @click="deleteNotification(notification)">
                <i class="far fa-trash-alt"></i>
              </div>

              <div :class="['subject']">
                {{ notification.title }}
              </div>

              <div class="message">
                {{ notification.description }}
              </div>
              <div class="divider" v-if="i !== (notifications.length - 1)"></div>
            </li>
          </ul>
        </template>

        <template v-else-if="profile">
          <p class="username">{{ user.name }}</p>
          <p class="coins">{{ user.current_bombo_coins }} B /
            <span class="credit">{{ user.current_credit }} <i class="far fa-money-bill-alt"></i></span>

          </p>
          <div class="divider"></div>
          <ul class="ul-profile">
            <li v-for="(profileLink, i) in listProfileItems" :key="i+'-profile'" @click="profileLink.action">
              <!--<nuxt-link :to="profileLink.url">-->
                {{ profileLink.name }}
              <!--</nuxt-link>-->
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
      notifications: Array,
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
      }
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
      },
      user () {
        return this.$store.getters['user']
      }
    },
    data () {
      return {
        profileData: {
          name: 'No Name',
          coins: '0B'
        },
        listProfileItems: [
          { name: 'Mi Perfil', url: '/client/profile', action: () => {
              this.$router.push('/client/profile')
              this.$emit('onClose', 'profile')
            }
          },
          { name: 'Transferencias', url: '/client/billing', action: () => {
              this.$router.push('/client/billing')
              this.$emit('onClose', 'profile')
            }
          },
          { name: 'FAQ', url: '/faq', action: () => {
              this.$router.push('/faq')
              this.$emit('onClose', 'profile')
            }
          }
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
        this.$store.state.signOutDialog = true
      },
      async deleteNotification (item) {
        const userId = this.$store.getters['auth/getUserId']
        this.$store.dispatch('turnOnSnackbar', 'Eliminando notificación')

        try {
          let response = await this.$axios.post(`api/v2.0/users/${userId}/delete-notification`, {
            notification_id: item.id
          })

          // console.log(response)
          this.$store.dispatch('updateUser', response.data.data)
          this.$store.dispatch('turnOnSnackbar', 'Notificación eliminada')
        } catch (e) {
           console.log(e)
          this.$store.dispatch('turnOnSnackbar', 'Problemas al eliminar notificación, intente más tarde')
        }
      },
      clickEventHandler: function (e) {
        let self = this

        if (self.listNotifications){
          if (!(document.getElementById('tooltip-menu').children[0].contains(e.target) ||
              document.getElementById('tooltip-menu').children[1].contains(e.target))) {
            self.$emit('onClose', 'notification')
          }
        } else if (self.profile) {
          if (!document.getElementById('tooltip-menu').children[0].contains(e.target)) {
            self.$emit('onClose', 'profile')
          }
        }

      }
    },
    mounted () {
      // let self = this

      window.addEventListener('click', this.clickEventHandler)
    },
    beforeDestroy () {
      window.removeEventListener('click', this.clickEventHandler)
    }
  }
</script>

<style scoped lang="stylus">

  #tooltip-menu
    position absolute
    z-index: 800
    top 67px
    right 100px
    width: 246px;
    background #fafafa
    font-family Titillium Web

  @media screen and (max-width: 1023px)
    #tooltip-menu
      right 17px !important

  .title
    font-weight: bold;
    margin-top: 12px;
    margin-bottom: 4px;
    font-size 18px
    font-family Titillium Web
    color #243237
    text-align center
  .title-notifications
    width 100%
    background #1b282b
    text-align: center;
    height: 50px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    color: white;
    font-weight: bold;
    line-height: 50px;

  .divider
    margin-bottom 12px
  .body
    padding 8px
  .body
    max-height: 50vh;
    overflow-y: auto;

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

  .message
  .subject
    padding-left: 10px;
    padding-right: 10px;

  .subject
    color: #445F69
    font-size: 16px;
  .message
    color: #9a9a9a
    font-size: 14px;
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
  .credit
    color: #FFC400;

  .signout-item
    margin-top 23px
    font-weight: 600;
    line-height: normal;
    font-size: 14px;
    text-align: center;
    color: #EA504C;
    cursor pointer
  .ul-profile
    text-align center
    font-size 16px
    cursor pointer
  /*.ul-profile a*/

  .delete-icon
    position absolute
    top 5px
    right 5px
    color #243337
    cursor pointer
  .delete-icon i
    font-size: 15px;
  @media screen and (max-width: 1023px)
    #tooltip-menu
      top 56px

</style>
