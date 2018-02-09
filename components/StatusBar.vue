<template>
  <ul id="status-bar" class="left-side">
    <li class="help">
        <span>
          <img src="../assets/icons/help.svg" width="20px" alt="">
        </span>
    </li>
    <li class="notification">
        <div class="indicator" v-if="indicator > 0"><span>{{ indicator }}</span></div>
        <span>
          <img src="../assets/icons/notification.svg" width="20px" alt="">
        </span>
    </li>
    <li class="avatar">
        <span>
          <img src="../assets/icons/avatar.png" width="40px" alt="">
        </span>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'status-bar',
    data () {
      return {
        indicator: 1
      }
    }
  }
</script>

<style scoped lang="stylus">
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
