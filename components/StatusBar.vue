<template>
  <div class="status-bar-container">
    <ul id="status-bar" class="left-side">
      <li class="help" @click="openTooltip('help')">
        <span>
          <img src="../assets/icons/help.svg" width="20px" alt="">
        </span>
      </li>
      <li class="notification"  @click="openTooltip('notification')">
        <!--<div class="indicator" v-if="indicator > 0"><span>{{ indicator }}</span></div>-->
        <span>
          <img src="../assets/icons/notification.svg" width="20px" alt="">
        </span>
      </li>
      <li class="avatar" @click="openTooltip('profile')" >
        <span>
          <img src="../assets/icons/avatar.png" width="40px" alt="">
        </span>
      </li>
    </ul>
    <tooltip-menu listSupport v-if="help"/>
    <tooltip-menu listNotifications v-if="notification" :notifications="[]" right-offset="70px"/>
    <tooltip-menu profile v-if="profile" right-offset="30px"/>
  </div>
</template>

<script>
  import TooltipMenu from './TooltipMenu'

  export default {
    name: 'status-bar',
    components: {
      TooltipMenu
    },
    data () {
      return {
        indicator: 1,
        help: false,
        notification: false,
        profile: false,
        statusBarItems: ['help', 'notification', 'profile'],
        notifications: [
        ]
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
      }
    }
  }
</script>

<style scoped lang="stylus">
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
@media screen and (max-width: 1023px)
  .help
  .avatar
    display none


</style>
