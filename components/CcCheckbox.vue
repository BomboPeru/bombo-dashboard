<template>
    <div id="checkbox" :style="{borderColor: color}" :class="[value?'checked-box':'unchecked-box']" @click="toggle">
      <div v-if="value === true" class="checked">
        <i :style="{color: color}" class="fas fa-check check-icon"></i>
      </div>
      <div v-else class="unchecked"></div>
    </div>
</template>

<script>
  export default {
    name: 'cc-checkbox',
    props: {
      value: Boolean,
      color: String
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
  .unchecked-box
    border 4px solid disabledColor !important

  .checked-box
    background colorPrimary !important
    border 4px solid colorPrimary !important
  .unchecked
  .checked
    display inline-block
  .unchecked
    position absolute
    // top -4px
    top 2px
    left 2px
    width 8px
    height 8px
    background white
    transition all .2s ease-out
  .checked
    transition all .2s ease-in
    top 2px
    left 2px
    border-radius 1px
    position absolute
    width 8px
    height 8px
    background colorPrimary
  .check-icon
    position: absolute;
    top: -4px;
    left: -4px;
    color: white;
</style>
