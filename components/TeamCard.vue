<template>
    <div id="round-card" class="elevation rounded">
      <div class="header" :style="{ background: typeColorCards[typeCard] }">
        <div>
          <span class="title">{{ title }}</span>
          <span class="right">{{ points }}</span></div>
      </div>

    </div>
</template>

<script>
  export default {
    name: 'card',
    props: {
      typeCard: {
        type: String,
        default: 'guardado'
      },
      title: String,
      points: Number
    },
    data () {
      return {
        typeColorCards: {
          en_juego: '#FF6666',
          guardado: '#25BF89',
          pasados: '#417F96'
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
#round-card
  width 240px
  height 64vh
  overflow hidden
  background #fafafa
  margin-left 24px
  margin-right 24px
/*
.rounded
  border-radius 10px
.elevation
  box-shadow 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
  */
.header
  width 100%
  height 38px
  background #fff
  padding 10px 0px
.header div
  padding 0px 18px
.title
  text-align left
  color white
  font-size 12px
  font-weight bold
  font-family Titillium Web
  text-transform uppercase
.right
  float right
  color white
  font-size 12px
  font-weight bold
  font-family Titillium Web
  text-transform uppercase


</style>
