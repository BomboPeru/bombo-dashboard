<template>
    <div id="nav-item" :class="{ active: isActive }">
      <nuxt-link :to="url" class="item">{{ text }}</nuxt-link>
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
nav_item_height = 78px // 81px
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
  padding 0 15px
  font-family 'Nunito Sans'
  font-weight normal
  font-size 14px
.active
  background #ea504c !important
  border-radius: 0px 0px 6px 6px
  //border-radius 0
  box-shadow 0px 2px 4px rgba(0, 0, 0, 0.25)
  height nav_item_height !important
.active a
  padding 0 29px !important
  color white !important

.item
  height: 76px;
  display: inline-block;
  line-height: 76px;

  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;

</style>
