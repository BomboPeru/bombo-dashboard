<template>
    <div id="nav-item" :class="{ active: isActive }">
      <nuxt-link :to="url">{{ text }}</nuxt-link>
    </div>
</template>

<script>
  export default {
    name: 'nav-item',
    props: {
      text: String,
      url: String,
      isActive: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="stylus" scoped>
nav_item_width = 148px
nav_item_height = 81px
nav_item_height_inactive = 76px


#nav-item:hover
  background #445F69
#nav-item
  // width nav_item_width
  height nav_item_height_inactive
  text-align center
  margin 0 7px 14px 7px
#nav-item a
  color #fafafa
  text-decoration none
  position relative
  top 36%
  padding 0 15px
  font-family Titillium Web
  font-weight normal
  font-size 16px
.active
  background #fafafa !important
  border-radius: 0px 0px 12px 12px
  box-shadow 0px 2px 4px rgba(0, 0, 0, 0.25)
  height nav_item_height !important
.active a
  padding 0 29px !important
  color #445F69 !important


</style>
