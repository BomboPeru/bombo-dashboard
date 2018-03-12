<template>
    <div id="progressbar">
      <span :class="['bar', colorBar]" :style="{width: currentBar  + '%'}"></span>
    </div>
</template>

<script>
  export default {
    name: 'progress-bar',
    props: {
      maxNumber: {
        type: Number,
        default: 100
      },
      currentNumber: {
        type: Number,
        default: 100
      }
    },
    computed: {
      currentBar () {
        return (this.currentNumber / this.maxNumber) * 100
      },
      colorBar () {
        // let currentBar = (this.currentNumber / this.maxNumber) * 100
        if (this.currentBar > (this.maxNumber*2)/3) {
          return 'bar-full'
        } else if (this.currentBar < (this.maxNumber*1)/3) {
          return 'bar-empty'
        } else {
          return 'bar-middle'
        }

      }
    }
  }
</script>

<style scoped lang="stylus">
  #progressbar
    height 8px
    border-radius 4px
    background white
    /*width 100%*/
  .bar
    border-radius 4px
    display block
    background #00BE8C
    height 100%
    transition .5s all ease-in
  .bar-full
    background #00BE8C
  .bar-middle
    background #FFC400
  .bar-empty
    background #EA504C

</style>
