<template>
    <div class="search-input">
      <input type="text" @input="emitValue" v-model="text" placeholder="Busca jugadores">
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
    width 200px
    font-size 12px
    font-family Titillium Web
  .icon-input
    position: absolute
    top: 9px
    right: 7px
    font-size: 15px

</style>
