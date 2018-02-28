<template>
    <div id="select-league-dialog" v-if="isOpen">
      <dialog-container @closeDialog="closeDialog" :fixed="fixed">
        <div class="elevation rounded card-container">
          <div class="card-header--primary header-content-center elevation">
            SELECCIONA LA LIGA
          </div>
          <div class="card-header-line elevation"></div>
          <div class="content">
            <ul>
              <li v-for="(item, i) in leagues" :key="i"
                  :class="['card-league', 'elevation', 'rounded', item.coming_soon===true?'blurred':'']"
                  @click="onClickLeague(item)">
                <img :src="item.image===''? '/leagues/uefa_card.png':item.image" alt="" @click="selectLeague(i)">
              </li>
            </ul>
          </div>
        </div>
      </dialog-container>
    </div>
</template>

<script>
  import DialogContainer from './DialogContainer'

  export default {
    name: 'select-league-dialog',
    components: {
      DialogContainer
    },
    props: {
      isOpen: { type: Boolean, default: false },
      fixed: { type: Boolean, default: false }
    },
    data () {
      return {
        leagues: [
          { name: 'PREMIER LEAGUE', image: '' },
          { name: 'CHAMPIONS LEAGUE', image: '' },
          { name: 'COMMING SOON', image: '', coming_soon: true },
          { name: 'COMMING SOON', image: '', coming_soon: true }
        ]
      }
    },
    methods: {
      selectLeague (i) {
        // this.leages[i]
        this.$router.push({ path: '/client/createteam'})
      },
      closeDialog () {
        this.$emit('onCollapse', false)
      },
      onClickLeague(item) {
      //  go to create team
        this.$store.commit('team/turnOffSelectLeageDialog')
        this.$router.push({ path: '/client/createteam'})
      }
    }
  }
</script>

<style scoped lang="stylus">
  .header-content-center
    height 50px
    line-height 50px
    text-align center
  .card-header--primary
    padding 0px 15px
    position relative
    font-size 24px
    font-weight bold
    border-radius: 10px 10px 0px 0px
  .card-header-line
    background #EA504C
  .content ul
    list-style-type none
  .content ul
    padding-left 37px
    padding-right 37px
    padding-top: 19px
    padding-bottom 19px
    text-align center

  .card-league
    overflow hidden
    cursor pointer
    background #fafafa
    width 250px
    /*height 200px*/
    height 122px
    display inline-block
    position relative
    margin 5px 5px
  .blurred
    filter blur(0.4)
  .card-league img
    width 250px
  .card-container
    max-width 620px
    max-height 80vh
    overflow-y auto

  @media screen and (max-width: 1023px)
    .card-league
      width 80px
      height 50px
    .card-league img
      width 80px
    .card-container
      max-width 300px
</style>
