<template>
    <div id="input-text">
      <span :class="['prepend-icon', big?'big-icon':'',
             responsive?'responsive-icon':'']" v-if="prependIcon !== ''"><i :class="['fas', prependIcon]"></i></span>
      <input :type="type"
             :class="['input', square?'square':'',
             flat?'flat':'', solid?'solid':'',
             prependIcon!==''?'prepend-padding':'',
             appendIcon!==''?'append-padding':'',
             big?'big-input':'',
             responsive?'responsive-input':'']"
             @input="updateValue()"
             ref="inputText"
             :value="value"
             :placeholder="placeholder"
             :disabled="disabled"
             :style="{ 'width': width }"/>
      <span :class="['append-icon', big?'big-icon':'',
             responsive?'responsive-icon':'']" v-if="appendIcon !== ''"><i :class="['fas', appendIcon]"></i></span>
    </div>
</template>

<script>
  export default {
    name: 'input-text',
    props: {
      width: {
        type: String,
        default: '340px'
      },
      type: {
        type: String,
        default: 'text'
      },
      value: [String, Number],
      placeholder: String,
      flat: {
        type: Boolean,
        default: false
      },
      square: {
        type: Boolean,
        default: false
      },
      solid: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      prependIcon: {
        type: String,
        default: ''
      },
      appendIcon: {
        type: String,
        default: ''
      },
      big: {
        type: Boolean,
        default: false
      },
      responsive: {
        type: Boolean,
        default: false
      }
    },
    computed: {
    },
    methods: {
      updateValue () {
        this.$emit('input', this.$refs.inputText.value)
      }
    }
  }
</script>

<style scoped lang="stylus">
  #input-text
    margin 10px 0
    position relative
    display inline-block
  .input
    height 30px
    width 340px
    border-radius: 15px
    border 0px solid black
    outline none
    background: #FAFAFA
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.25)
    /*padding-left 5px*/
    padding: 5px 12px 5px 12px;
    font-family: Titillium Web;
  .square
    border-radius: 4px
  .flat
    color #424242
    padding: 5px 0;
    box-shadow none
    font-size 18px
    border-radius: 0px !important;
    border-bottom: 0.5px solid #bbbbbb;
  .solid
    background white
    color #424242
    border-radius: 0px
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25)
  .prepend-icon
  .append-icon
    position absolute
    height 100%
    color #7b7b7b
  .append-icon
    top 7px
    right 10px
  .prepend-icon
    top 7px
    left 10px
  .append-padding
    padding-right 34px
  .prepend-padding
    padding-left 34px
  .big-input
    font-size 16px
    height 50px
  .big-icon
    top 17px !important

  input[type='number'] {
    appearance: textfield;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']:hover::-webkit-inner-spin-button,
  input[type='number']:hover::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media screen and (max-width: 400px)
    .responsive-input
      height 30px !important
      width 200px !important
    .responsive-icon
      top 7px !important
    /*.input*/
    /*height 30px !important*/
</style>
