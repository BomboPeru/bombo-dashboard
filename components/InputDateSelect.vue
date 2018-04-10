<template>
  <div id="input-date" :class="[flex?'flex':'']">
    <select name="" id="date-select" v-model="date" @change="checkMonth" :class="[big?'big':'', solid?'solid':'']">
      <option v-for="n in 31"
              :key="n+'-date'"
              :value="n">{{ n }}</option>
    </select>
    <select name="" id="month-select" v-model="month" @change="checkMonth" :class="[big?'big':'', solid?'solid':'']">
      <option v-for="(item, i) in monthList"
              :key="i+'-month'"
              :value="item.value">{{ item.label }}</option>
    </select>
    <select name="" id="year-select" v-model="year" @change="inputObserver" :class="[big?'big':'', solid?'solid':'']">
      <option v-for="n in 100"
              :key="n+'-date'"
              :value="currentYear - n">{{ currentYear - n }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'input-date-select',
    props: {
      value: String,
      big: Boolean,
      solid: Boolean,
      flex: Boolean
    },
    computed: {
      currentYear () {
        const y = new Date()
        return y.getFullYear()
      }
    },
    data () {
      return {
        date: 1,
        month: 1,
        year: 2000,
        monthList: [
          { label: 'Enero', value: 1 },
          { label: 'Febrero', value: 2 },
          { label: 'Marzo', value: 3 },
          { label: 'Abril', value: 4 },
          { label: 'Mayo', value: 5 },
          { label: 'Junio', value: 6 },
          { label: 'Julio', value: 7 },
          { label: 'Agosto', value: 8 },
          { label: 'Setiembre', value: 9 },
          { label: 'Octubre', value: 10 },
          { label: 'Noviembre', value: 11 },
          { label: 'Diciembre', value: 12 }
        ]
      }
    },
    methods: {
      checkMonth () {
        if (this.month === 2) {
          if (this.date > 29) {
            this.date = 29
          }
        }
        else if ( [4, 6, 9, 11].indexOf(this.month) !== -1) {
          if (this.date > 30) {
            this.date = 30
          }
        }

        this.inputObserver()
      },
      inputObserver () {

        const month = (this.month.toString()).padStart(2, '0')
        const day = (this.date.toString()).padStart(2, '0')

        let date = `${this.year}-${month}-${day}`
        this.$emit('input', date)
      }
    }
  }
</script>

<style scoped lang="stylus">
  #input-date
    display inline-block
  #input-date select
    font-family 'Nunito Sans'
    color white
    background: #0e212d;
    border: 0;
    border-bottom: 1px solid rgba(255, 255, 255, .60);
    text-align right
    padding 0 8px

  .solid
    background white !important
    color #424242 !important
    border-radius: 0px
    // box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25)
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.50);
    margin 10px 4px
  .big
    height 40px
    font-size 16px
  .flex
    margin-left -4px
    width 100%
  .flex #date-select
    width 25%
  .flex #month-select
    width 33%
  /*.flex #year-select*/
    /*width 30%*/
</style>
