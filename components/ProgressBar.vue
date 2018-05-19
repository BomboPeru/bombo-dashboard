<template>
    <div id="progressbar" :class="vertical? 'vertical':'horizontal'" :style="{ height: height}">
      <template v-if="vertical === true">
        <span :class="['bar-y', colorBar]" :style="{height: currentBar  + '%'}"></span>
      </template>
      <template v-else>
        <span :class="['bar', colorBar]" :style="{width: currentBar  + '%'}"></span>
      </template>
    </div>
</template>

<script>
  export default {
    name: 'progress-bar',
    props: {
      height: {
        type: String,
        default: '8px'
      },
      vertical: Boolean,
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
    background white
    /*width 100%*/
  .horizontal
    height 8px
    border-radius 4px
  .vertical
    display inline-block
    width 20px
    height: 40px

  .bar-y
    display block
    background #00BE8C
    width 100%
    transition .5s all ease-in
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
