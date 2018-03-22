<template>
    <div id="cc-avatar" :class="['avatar-container', sm?'sm':'']" :style="{ borderRadius: square? '0px':'50px' }">
      <span class="shadow" :style="{ borderRadius: square? '0px':'50px' }" @click="updatePhoto"></span>
      <img class="avatar-img" :src="src" :style="{ borderRadius: square? '0px':'50px' }" alt="">
    </div>
</template>

<script>
  export default {
    name: 'cc-avatar',
    props: {
      src: String,
      square: {
        type: Boolean,
        default: false
      },
      sm: Boolean
    },
    methods: {
      updatePhoto () {
        this.$emit('clickAvatar', true)
      }
    },
    mounted () {

    }
  }
</script>

<style scoped lang="stylus">
  #cc-avatar
    width 150px
    height 150px
    overflow hidden
    border-radius: 50%
    position relative

  .shadow
    border-radius 50%
    position: absolute
    top 0
    left 0
    background-color rgba(0, 0, 0, 0)
    width: 100%
    height: 100%
    z-index 10
  .shadow:hover
    background-color rgba(0, 0, 0, 0.27)
  .avatar-container
    position relative
    width 150px
    /*left 50%*/
    // transform translateX(-50%)
  .sm
    display inline-block
    width 100px !important
    height 100px !important
    overflow hidden

  .sm img
    height 100px
  .sm .shadow
    width 100px
    height 100px
  .avatar-img
    position absolute
    top 50%
    left 50%
    transform translateX(-50%) translateY(-50%)
    height: 100%;

</style>
