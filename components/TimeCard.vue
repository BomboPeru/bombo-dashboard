<template>
    <!-- selected?'selected':'' -->
    <div id="time-card" :class="['']" @click="selectTimeCard">
      <svg class="background-svg"
           width="100%"
           height="120px"
           version="1.1"
           preserveAspectRatio="none"
           viewBox="0 0 100 100">
        <polygon points="20,100 60,5 100,45 100,100"  :style="{ fill: selected?'#EA504C': enabled?'#36FFA5':'#7b7b7b' }"/>
      </svg>
      <p class="label">FECHA</p>
      <p class="number">{{time.number}}</p>
      <p class="date">{{start}}</p>
    </div>
</template>

<script>
  export default {
    name: 'time-card',
    props: {
      time: Object,
      selected: Boolean,
      index: Number
    },
    computed: {
      start () {
        const start = (new Date(this.time.start))
        const month = ((start.getMonth() + 1).toString()).padStart(2,'0')
        const date = ((start.getDate()).toString()).padStart(2,'0')
        return date + ' / ' + month + ' / ' + start.getFullYear()
      },
      enabled () {
        const currentDate = (new Date()).getTime()
        const timeDate = (new Date(this.time.start)).getTime()
        return timeDate > currentDate
      }
    },
    methods: {
      selectTimeCard () {
        if (this.enabled) {
          this.$emit('onSelectTime', this.index)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  #time-card
    width 190px
    height 120px
    background white
    position relative
    overflow hidden
    cursor pointer
    border-radius 5px
    box-shadow 1px 1px 20px rgba(0, 0, 0, .16), 0 3px 10px rgba(0, 0, 0, .13)

    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;


  #time-card p
    position relative
    z-index 3

  .selected
    background #5244ff !important

  .label
    font-family 'Nunito Sans'
    color black
    font-size 12px
    padding-top 8px
    padding-left 12px

  .number
    font-family 'Nunito Sans'
    font-weight bold
    color black
    font-size 49px
    text-align right
    padding-right 12px

  .date
    font-family Titillium Web
    color black
    font-weight bold
    font-size 16px
    padding-bottom 12px
    padding-left 12px

  .background-svg
    position absolute
    top 0
    right 0
    bottom 0
</style>
