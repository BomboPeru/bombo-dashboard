<template>
    <div id="input-select"
         @click="openItemsMenu">
      <input-text type="text"
                  v-model="inputValue"
                  @input="updateValue"
                  placeholder="select item"
                  :disabled="true"
                  :square="square"/>
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
  .menu
    width 100px
    background #929292
  .menu ul
    list-style-type none
    padding-left 1px
</style>
