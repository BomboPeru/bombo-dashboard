<template>
    <div id="icon-button" :class="['elevation-2', collapsable?'collapse':'']" @click="onClick">
      <div :class="['text', iconDirection+'-text']">{{text}}</div>
      <div :class="['icon', iconDirection, 'elevation']" :style="{ background: color }">
        <i v-if="faIcon !== ''" :class="['fas', 'fa-2x', faIcon]"></i>
        <img v-else :src="icons[icon]" class="icon-image" alt="">
      </div>
    </div>
</template>

<script>
  import IconSvg from '../assets/icons/plus.svg'
  import CoinSvg from '../assets/icons/coins.svg'

  export default {
    name: 'icon-button',
    props: {
      text: String,
      color: String,
      icon: String,
      iconDirection: String,
      collapsable: Boolean,
      faIcon: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        icons: {
          plus: IconSvg,
          coin: CoinSvg
        }
      }
    },
    methods: {
      onClick (e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style scoped lang="stylus">

  #icon-button
    height 52px
    display inline-block
    position relative
    min-width 200px
    background #fafafa
    border-radius: 5px
    cursor: pointer
    z-index: 9;
  .icon
    border-radius: 5px
    height 100%
    position absolute
    top 0
    width 52px
    text-align center
  .icon img
    margin-top 8px
    height 30px
    width 30px
  .right
    right -2px
  .left
    left -2px
  .text
    color #243137
    font-weight bold
    font-size 18px
    font-family Titillium Web
    line-height 50px
    text-align center
    padding 1px 10px
  .left-text
    margin-left 50px
  .right-text
    margin-right 50px

  .fas
    color white
    margin-top 10px

  .collapse
    min-width 50px !important
    transition all .5s ease-in

  .collapse .text
    display none !important
  .collapse:hover
    min-width 200px !important
  .collapse:hover .text
    display block !important
    transition all .5s ease-in

  #icon-button:hover .icon
    width 60px
    height 60px
    top -4px
    transition all .2s ease-in
    display block

  #icon-button:hover .icon-image
    transition all .2s ease-in
    margin-top 13px
  #icon-button:hover .fas
    transition all .2s ease-in
    margin-top 13px
</style>
