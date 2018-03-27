<template>
    <div id="floating-container" :class="[location]">
      <slot/>
    </div>
</template>

<script>
  export default {
    name: 'floating-container',
    props: {
      bottomRight: { type: Boolean, default: false},
      bottomLeft: { type: Boolean, default: false},
      upLeft: { type: Boolean, default: false},
      upRight: { type: Boolean, default: false}
    },
    computed: {
      location () {
        if (this.bottomRight) {
          return 'bottom-right'
        } else if (this.bottomLeft) {
          return 'bottom-left'
        } else if (this.upLeft) {
          return 'up-left'
        } else if (this.upRight) {
          return 'up-right'
        } else {
          return ''
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

  #floating-container
    // position absolute
    position fixed
    margin 34px 28px
    z-index 54
  .bottom-right
    bottom 0
    right 0
  .bottom-left
    bottom 0
    left 0
  .up-left
    top 0
    left 0
  .up-right
    top 0
    right 0
</style>
