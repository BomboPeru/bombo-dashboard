<template>
    <span id="squad-number" class="shirt">
      <img :src="img" class="dorsal-src" width="27px" alt="">
      <span class="dorsal" :style="{ 'top': ground===false? '6px':'-2px' }">{{dorsal}}</span>
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
      number: Number
    }
  }
</script>

<style scoped lang="stylus">
  .shirt
    margin-top 4px
    margin-bottom 2px
    margin-left 8px
    margin-right 8px
    position relative
  .dorsal
    position absolute
    font-family: Titillium Web;
    font-size 10px
    top: 6px;
    left: 8px;

  .dorsal-src
    filter: hue-rotate(116deg)

</style>
