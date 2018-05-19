<template>
    <div id="dialog-container">
      <slot id="slot"/>
    </div>
</template>

<script>
  export default {
    name: 'dialog-container',
    props: {
      fixed: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      clickEventHandler: function (e) {
        let self = this
        if (!document.getElementById('dialog-container').children[0].contains(e.target)) {
          self.$emit('closeDialog', true)
        }
      }
    },
    mounted () {
      // let self = this
      if (this.fixed === false) {
        window.addEventListener('click', this.clickEventHandler)
      }
      document.getElementById('cover-layout').style.filter = 'blur(5px)'
    },
    beforeDestroy () {
      window.removeEventListener('click', this.clickEventHandler)
      document.getElementById('cover-layout').style.filter = 'none'
    }
  }
</script>

<style scoped lang="stylus">

  #dialog-container
    position fixed
    background rgba(36, 50, 55, 0.5)
    top 0
    left 0
    width 100%
    height 100vh
    z-index: 800
    display flex
    justify-content center
    align-items center
</style>
