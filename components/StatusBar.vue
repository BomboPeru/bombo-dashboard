<template>
  <div class="status-bar-container">
    <ul id="status-bar" class="left-side">
      <!--<li class="help" @click="openTooltip('help')">-->
        <!--<span>-->
          <!--<img src="../assets/icons/help.svg" width="20px" alt="">-->
        <!--</span>-->
      <!--</li>-->
      <li class="notification"  @click="openTooltip('notification')">
        <div class="indicator" v-if="indicator > 0"><span>{{ indicator }}</span></div>
        <span>
          <img src="../assets/icons/notification.svg" width="20px" alt="">
        </span>
      </li>
      <li class="avatar" @click="openTooltip('profile')" >
        <span>
          <img :src="userUrlImage" v-if="userUrlImage !== ''" class="avatar-img" width="40px" height="40px" alt="">
        </span>
      </li>
    </ul>
    <!--<tooltip-menu listSupport v-if="help"/>-->
    <tooltip-menu listNotifications :notifications="notifications" v-if="notification"  right-offset="70px" @onClose="closeMenu"/>
    <tooltip-menu profile v-if="profile" right-offset="30px" @onClose="closeMenu"/>
  </div>
</template>

<script>
  import TooltipMenu from './TooltipMenu'

  export default {
    name: 'status-bar',
    components: {
      TooltipMenu
    },
    computed: {
      notifications () {
        let notifications = this.$store.state.notifications
        return notifications
      },
      indicator () {
        return this.$store.state.notifications.length
      },
      BASE_URL () {
        return this.$store.state.BASE_URL
      },
      userUrlImage () {
        return this.$store.state.userUrlImage
      }
    },
    data () {
      return {
        help: false,
        notification: false,
        profile: false,
        statusBarItems: ['help', 'notification', 'profile']
      }
    },
    methods: {
      closeTooltip() {
        this.statusBarItems.map((item) => {
          this[item] = false
        })
      },
      openTooltip(name) {
        let i = this.statusBarItems.indexOf(name)
        this.statusBarItems.map((item, _i) => {
          if (i !== _i) {
            if (this[item] === true) {
              this[item] = false
            }
          }
        })
        this[name] = !this[name]
      },
      closeMenu (key) {
        this[key] = false
      }
    },
    mounted () {
      if (this.$store.state.userUrlImage === '') {
        const userId = this.$store.getters['userId']
        this.$store.state.userUrlImage = this.BASE_URL + 'api/v2.0/storage/users/' + userId + '/profile-photo'
      }
    }
  }
</script>

<style scoped lang="stylus">
.avatar-img
  border-radius 40px
  overflow hidden
.status-bar-container
  display inline
#status-bar
  margin-right 10px
.left-side
  height 100%
  float right
  list-style-type none
  display: flex
  align-items: center
.left-side li
  position relative
  float left
  margin 0 12px
  cursor pointer
.indicator
  position absolute
  top -10px
  right -8px
  width 18px
  height 18px
  padding 0 5px
  border-radius 10px
  color white
  font-family Titillium Web
  font-weight bold
  background #EA504C
  text-align center
.indicator span
  font-size 12px
  position: relative
  top -5px
#status-bar li
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;

@media screen and (max-width: 1023px)
  .help
  .avatar
    display none


</style>
