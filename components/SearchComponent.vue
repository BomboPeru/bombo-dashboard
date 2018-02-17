<template>
    <div class="search-input">
      <input type="text" @input="emitValue" ref="inputText" :value="value" placeholder="Busca jugadores">
      <span class="icon-input"><img src="../assets/icons/search.svg" alt=""></span>
    </div>
</template>

<script>

  export default {
    name: 'search-component',
    data () {
      return {
        text: ''
      }
    },
    props: {
      value: String
    },
    methods: {
      emitValue() {
        this.$emit('input', this.$refs.inputText.value)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .search-input
    float right
    position relative
  .search-input input
    padding 5px 25px 5px 12px
    border-radius 15px
    border 0px solid black
    outline none
    width 200px
    font-size 12px
    font-family Titillium Web
  .icon-input
    position: absolute
    top: 5px
    right: 7px
    font-size: 15px

</style>
