<template>
    <div id="select-league-dialog" v-if="isOpen">
      <dialog-container @closeDialog="closeDialog" :fixed="false">
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
                <img :src="item.image===''? '/leagues/premier_league.png':item.image" alt="" @click="selectLeague(item)">
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
      isOpen: { type: Boolean, default: false }
    },
    data () {
      return {
        leagues: []
      }
    },
    methods: {
      selectLeague (item) {
        // this.leages[i]
        this.$store.commit('createteam/setleagueid', item.id)
        this.$store.state.team.selectLeagueDialog = false

        this.$store.state.isLoading = true
        this.$router.push({ path: '/client/createteam'})
      },
      closeDialog () {
        this.$store.state.team.selectLeagueDialog = false
      },
      onClickLeague(item) {
      //  go to create team
        this.$store.commit('createteam/setleagueid', item.id)
        this.$store.state.team.selectLeagueDialog = false

        if (this.$store.getters['createteam/leagueid'] !== null) {
          this.$store.state.isLoading = true

          setTimeout(() => {
            this.$router.push({ path: '/client/createteam'})
          }, 200)
        }
      }
    },
    mounted () {

      this.$axios.get('http://api.bombo.pe/api/v2.0/leagues/all')
        .then(res => {
          this.leagues = res.data.data
        })
        .catch(e => {

          // window.$nuxt.error({ statusCode, message })
          console.log('>> e ', e.toString())
        })
    }
  }
</script>

<style scoped lang="stylus">
  .header-content-center
    height 50px
    line-height 50px
    text-align center
    background #243237
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
