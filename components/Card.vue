<template>
    <div id="round-card" class="elevation rounded">
      <div class="header" :style="{ background: typeColorCards[typeCard] }">
        <p><span class="title" :style="{ color: typeCard==='guardado'?'#417F96':'#fff' }">{{ title }}</span></p>
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
      title: String
    },
    data () {
      return {
        typeColorCards: {
          en_juego: '#FF6666',
          guardado: '#fafafa',
          jugados: '#417F96'
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
#round-card
  width 300px
  height 300px
  overflow hidden
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
.header p
  padding 0px 18px
.title
  text-align left
  color white
  font-size 12px
  font-weight bold
  font-family Titillium Web


</style>
