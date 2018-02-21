<template>
    <div id="cc-avatar" class="avatar-container">
      <span class="shadow"></span>
      <img class="avatar-img" :src="src" alt="">
    </div>
</template>

<script>
  export default {
    name: 'cc-avatar',
    props: {
      src: String
    }
  }
</script>

<style scoped lang="stylus">
  .avatar-img
    width 150px
    height 150px
    border-radius: 50%
  .shadow
    border-radius 50%
    position: absolute
    top 0
    left 0
    background-color rgba(0, 0, 0, 0)
    width: 100%
    height: 100%
  .shadow:hover
    background-color rgba(0, 0, 0, 0.27)
  .avatar-container
    position relative
    width 150px
    left 50%
    transform translateX(-50%)
</style>
