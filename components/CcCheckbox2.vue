<template>
    <div id="checkbox" :style="{borderColor: color}"
         :class="[value?'checked-box':'unchecked-box', big?'big':'', solid?'solid':'']" @click="toggle">
      <div class="checked" v-if="value">
        <i class="fas fa-check check-icon"></i>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'cc-checkbox',
    props: {
      value: Boolean,
      color: String,
      big: Boolean,
      solid: Boolean
    },
    methods: {
      toggle () {
        this.$emit('input', !this.value)
      }
    }
  }
</script>

<style scoped lang="stylus">
  colorPrimary = #243337
  disabledColor = #7b7b7b

  #checkbox
    cursor pointer
    display inline-block
    width 20px
    height 20px
    background white
    border-radius 2px
    border 4px solid colorPrimary
    position relative
    overflow hidden
  .unchecked-box
    border 4px solid disabledColor

  .checked-box
    background colorPrimary
    border 4px solid colorPrimary
  .big
    height 20px
    width 20px
  .solid
    border 0 !important
    background #fff
    box-shadow: 0 0 6px 0 rgba(0,0,0,0.25)
  .checked
    width: 80%;
    height: 80%;
    margin 10%
  .fa-check
    position: relative
    top -4px
    color: #868787

</style>
