<template>
    <div id="input-text">
      <input :type="type"
             class="input"
             @input="updateValue()"
             ref="inputText"
             :value="value"
             :placeholder="placeholder"
             :disabled="disabled"
             :style="{ 'width': width }"
      >
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
      disabled: {
        type: Boolean,
        default: false
      }
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
</style>
