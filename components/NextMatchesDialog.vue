<template>
    <div id="select-league-dialog">
      <dialog-container @closeDialog="closeDialog" :fixed="false">
        <div class="elevation rounded card-container">
          <div class="card-header--primary header-content-center elevation">
            Próximos encuentros
          </div>
          <div class="card-header-line elevation"></div>
          <div class="content">

            <div v-for="(match, i) in matches" :key="i"
                 class="mini-match-card elevation"
                 :style="{ background: '#f26465' }">

              <div class="mmc-top-title">{{ formatDate(match.playing_day) }}</div>
              <div class="mmc-title">
                <table width="100%">
                  <tbody>
                  <tr>
                    <td style="width: 40%">{{ match.away_name }} </td>
                    <td style="width: 20%" class="vs">vs</td>
                    <td style="width: 40%">{{ match.home_ame }}</td>
                  </tr>
                  </tbody>
                </table>

              </div>
            </div>

          </div>
        </div>
      </dialog-container>
    </div>
</template>

<script>
  import DialogContainer from './DialogContainer'

  export default {
    name: 'rules-dialog',
    components: {
      DialogContainer
    },
    data () {
      return {
        matches: []
      }
    },
    methods: {
      formatDate (value) {
        const date = new Date(value)
        const day = (date.getDate().toString()).padStart(2, '0')
        const month = ((date.getMonth() + 1).toString()).padStart(2, '0')
        return `${day} / ${month} / ${date.getFullYear()}`
      },
      closeDialog () {
        this.$store.state.createteam.nextMatchesDialog = false
      },
      async fetchMatches () {
        {
          const leagueId = this.$store.getters['createteam/leagueid']

          let response = await this.$axios.$get(`http://api.bombo.pe/api/v2.0/matches/${leagueId}/current-matches`)
          this.matches = response.data
        }
      }
    },
    mounted () {

      this.fetchMatches()
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
    background #f26465

  .card-container
    width 80vw
  .content
    height 400px
    display flex
    flex-wrap wrap
    justify-content center
    overflow auto

  .mini-match-card
    background #f26465
    font-family 'Raleway'
    display inline-block
    padding 4px 4px
    border-radius 4px
    margin 4px 4px
    width 320px
    text-align center
    position relative

  /*.mmc-background*/
  /*position relative*/

  .mmc-title
  .mmc-top-title
    text-transform uppercase
    position relative
    z-index 10

  .mmc-top-title
    margin-bottom 4px
    padding-bottom 4px
    margin-top 4px
    font-size 12px
    color #ffffffd9

  @media screen and (max-width: 500px)
    .card-container
      width 100%
      border-radius 0
    .card-header--primary
      border-radius 0

    .mmc-title
      font-weight: bold;
      font-size 14px
      color rgba(255, 255, 255, 0.76)

  .vs
    font-size 12px
    text-transform lowercase

</style>
