<template>
    <div id="icon-button" class="elevation-2" @click="onClick">
      <div :class="['text', iconDirection+'-text']">{{text}}</div>
      <div :class="['icon', iconDirection, 'elevation']" :style="{ background: color }">
        <i v-if="faIcon !== ''" :class="['fab', 'fa-2x', faIcon]"></i>
        <img v-else :src="icons[icon]" class="icon-image" alt="">
      </div>
    </div>
</template>

<script>
  import IconSvg from '../assets/icons/plus.svg'

  export default {
    name: 'icon-button',
    props: {
      text: String,
      color: String,
      icon: String,
      iconDirection: String,
      faIcon: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        icons: {
          plus: IconSvg
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
    height 50px
    display inline-block
    position relative
    min-width 200px
    background #fafafa
    border-radius: 10px
    cursor: pointer
    z-index: 9;
  .icon
    border-radius: 10px
    height 100%
    position absolute
    top 0
    width 50px
    text-align center
  .icon img
    margin-top 8px
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

  .fab
    color white
    margin-top 8px

  #icon-button:hover .icon
    width 60px
    height 60px
    top -5px
    transition all .2s ease-in

  #icon-button:hover .icon-image
    transition all .2s ease-in
    margin-top 13px
  #icon-button:hover .fab
    transition all .2s ease-in
    margin-top 13px
</style>
