<template>
    <div id="select-league-dialog">
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
                <img :src="item.photo===''? '/leagues/premier_league.png':item.photo" alt="" @click="selectLeague(item)">
                <div class="title-container">
                  {{ item.name }}
                </div>
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
    computed: {
      leagues () {
        return this.$store.state.leagues
      }
    },
    data () {
      return {
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

      if (this.$store.state.leagues.length === 0) {
        this.$axios.get('api/v2.0/leagues/all')
          .then(res => {
            this.$store.state.leagues = res.data.data
          })
          .catch(e => {
            // window.$nuxt.error({ statusCode, message })
            console.log('>> e ', e.toString())
          })
      }

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
    height 5px
  .content ul
    list-style-type none
  .content ul
    padding-left 37px
    padding-right 37px
    padding-top: 19px
    padding-bottom 19px
    text-align center


  .card-league img
    width: 100%;
    height auto
  .card-league
    overflow hidden
    cursor pointer
    background #fafafa

    width: 250px;
    height: 130px;

    // width 250px
    // height 122px
    display inline-block
    position relative
    margin 5px 5

    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;

  .title-container
    height 30px
    line-height 30px
    position absolute
    bottom 0
    left 0
    right 0
    background rgba(234, 80, 76, 0.92)
    color white
    text-align center
    font-family Titillium Web

  .blurred
    filter blur(0.4)

  .card-container
    max-width 620px
    max-height 80vh
    overflow-y auto

  @media screen and (max-width: 1023px)
    .card-league
      width: 113px;
      height: 77px;
    /*.card-league img*/
      /*width 80px*/
    .card-container
      max-width 300px
</style>
