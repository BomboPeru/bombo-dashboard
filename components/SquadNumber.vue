<template>
    <span id="squad-number" class="shirt">
      <img :src="img === ''?'/shirt_placeholder.svg':img"
           class="dorsal-src"
           :style="{ top: ground===false?'-9px':'-28px', left: ground===false?'-16px':'-26px' }"
           :width="ground===false?'60px':'80px'" alt="">
      <span class="dorsal" :style="{ 'top': ground===false? '4px':'-8px' }">{{dorsal}}</span>
    </span>
</template>

<script>
  export default {
    name: 'squad-number',
    computed: {
      dorsal () {
        if ( this.number.length === 2) {
          return this.number
        } else {
          return this.number.toString().padStart(2, '0')
        }
      }
    },
    props: {
      ground: {
        type: Boolean,
        default: false
      },
      img: {
        type: String,
        default: '/shirt_placeholder.svg'
      },
      number: [String, Number]
    }
  }
</script>

<style scoped lang="stylus">
  colorShadowDorsal = black
  #squad-number
    position relative
  .shirt
    margin-top 4px
    margin-bottom 2px
    margin-left 8px
    margin-right 8px
    position relative
  .dorsal
    position absolute
    font-family: Titillium Web;
    color white
    font-size 10px
    top: 8px;
    left: 8px;
    text-shadow: -1px 0 colorShadowDorsal, 0 1px colorShadowDorsal, 1px 0 colorShadowDorsal, 0 -1px colorShadowDorsal;

  .dorsal-src
    position absolute
    top -9px
    left -16px
</style>
