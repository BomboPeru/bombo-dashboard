<template>
    <div id="input-select"
         @click="openItemsMenu">
      <input-text type="text"
                  width="100px"
                  v-model="inputValue"
                  @input="updateValue"
                  placeholder="select item"
                  :disabled="true"
                  :big="big"
                  :solid="solid"
                  :square="square" append-icon="fa-angle-down"/>
      <div class="menu" v-if="isShowed">
        <ul>
          <li v-for="(item, i) in items"
              :key="i"
              @click="selectItem(i)">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import InputText from './InputText'
  export default {
    name: 'input-select',
    components: {
      InputText
    },
    data () {
      return {
        isShowed: false,
        inputValue: ''
      }
    },
    props: {
      items: Array,

      big: Boolean,
      solid: Boolean,
      square: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      updateValue () {
        this.$emit('input', inputValue)
      },
      openItemsMenu () {
        console.log('click')
        this.isShowed = !this.isShowed
      },
      selectItem(i) {
        this.inputValue = this.items[i]
      }
    }
  }
</script>

<style scoped lang="stylus">
  #input-select
    display inline-block
    position relative
  .menu
    position absolute
    bottom -14px
    left -1px
    width 100px
    background #929292
  .menu ul
    list-style-type none
    padding-left 1px
</style>
