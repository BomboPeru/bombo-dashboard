<template>
    <div id="input-text">
      <span :class="['prepend-icon', big?'big-icon':'',
             responsive?'responsive-icon':'']" v-if="prependIcon !== ''"><i :class="['fas', prependIcon]"></i></span>
      <template v-if="type === 'date'">
        <input :type="type === 'date'? 'text':type"
               :class="['input', square?'square':'',
             flat?'flat':'', solid?'solid':'',
             prependIcon!==''?'prepend-padding':'',
             appendIcon!==''?'append-padding':'',
             big?'big-input':'',
             responsive?'responsive-input':'']"
               ref="inputText"
               v-on:keypress="isDate"
               v-model="inputValue"
               :placeholder="type==='date'?'MM / DD / YYYY':placeholder"
               :disabled="disabled"
               :style="{ 'width': width }"/>
      </template>
      <template v-else>
        <input :type="type === 'date'? 'text':type"
               :class="['input', square?'square':'',
             flat?'flat':'', solid?'solid':'',
             prependIcon!==''?'prepend-padding':'',
             appendIcon!==''?'append-padding':'',
             big?'big-input':'',
             responsive?'responsive-input':'']"
               ref="inputText"
               v-model="inputValue"
               :placeholder="type==='date'?'dd-mm-yyyy':placeholder"
               :disabled="disabled"
               :style="{ 'width': width }"/>
      </template>
      <!--@input="updateValue()"-->

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
      inputValue: {
        get () {
          if (this.type === 'date') {
            return  this.formatDate(this.value)
          }
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        }
      }
    },
    methods: {
      isDate (evt) {
        evt = (evt) ? evt : window.event;

        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault()
        } else if (evt.target.value.length > 9) {
          evt.preventDefault()
        } else {
          return true
        }
      },
      formatDate (text) {

        let textFormatted = text

        // month
        if (textFormatted.length === 2) {
          const number =  parseInt(textFormatted.slice(0,2))

          if (number > 20) {
            textFormatted = '0'+ textFormatted[0]
          } else if (number > 12) {
            textFormatted = '12'
          } else if (number === 0) {
            textFormatted = '01'
          }

          textFormatted += '/'
        //  date
        } else if (textFormatted.length === 5) {

          const monthText = textFormatted[0] + textFormatted[1]
          const februaryMonth = '02'

          const number = parseInt(textFormatted.slice(3,5))
          if (number === 0) {
            textFormatted = textFormatted.slice(0,3) + '00'
          } else if (number >= 30 && monthText === februaryMonth) {
            textFormatted = textFormatted.slice(0,3) + '29'
          } else if (number > 31) {
            textFormatted = textFormatted.slice(0,3) + '31'
          }
          textFormatted += '/'
        }

        return textFormatted
      }
      // updateValue () {
      //   if (this.type === 'date') {
      //     this.$emit('input', this.$refs.inputText.value)
      //   } else {
      //     this.$emit('input', this.$refs.inputText.value)
      //   }
      // }
    },
    mounted () {
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
