<template>
    <div id="player-bank-card" class="round-card rounded elevation">
      <div class="header elevation">
        <div class="title">
          <span class="title-text">{{ title }}</span>
        </div>
        <!--<search-component v-model="search"/>-->
        <players-filter @changeFilter="filterModified"
                        @changeSearchBy="changeSearchBy"
                        @searchValue="searchByKeyword"/>
      </div>
      <div class="line elevation"></div>
      <!-- header -->
      <table style="width: 100%;" class="row-header">
        <thead>
          <tr>
            <th class="h-name">Nombre</th>
            <th class="h-status">Estado</th>
            <th class="h-popularity">Popularidad</th>
            <th class="h-cost">Costo</th>
            <th class="h-position">Posicion</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      <!-- content -->
      <no-ssr>
        <div class="content">
          <player-row-card
            v-for="(player, key) in playersList"
            :key="key + '-player'"
            :player="player"
            :position="playerTypesConversions[player.position]"
            @onPlayerSelected="selectPlayer(player, player.position, key)"/>
        </div>
      </no-ssr>
    </div>
</template>

<script>
  import SearchComponent from './SearchComponent'
  import PlayerRowCard from './PlayerRowCard'
  import PlayersFilter from './PlayersFilter'
  import SampleData from '../assets/sample/premier_league_full'

  const playerTypes = ['gol_keeper', 'defender', 'mid_fielder', 'forwarder']
  const playerTypesConversions = {
    'goal_keeper': 'ARQUERO',
    'defender': 'DEFENSA',
    'mid_fielder': 'CENTROCAMPISTA',
    'forward': 'DELANTERO'
  }

  export default {
    name: 'player-bank-card',
    components: {
      SearchComponent, PlayerRowCard, PlayersFilter
    },
    computed: {
      playersList: {
        get () {
          return this.$store.state.createteam.playersList
        },
        set (value) {
          this.$store.state.createteam.playersList = value
        }
      }
    },
    data () {
      return {
        title: 'JUGADORES DE LA TEMPORADA',
        // unused
        teams: [],
        backuplist: [],
        // playersList: [],
        searchText: '',
        playerTypesConversions: {
          'goal_keeper': 'ARQUERO',
          'defender': 'DEFENSA',
          'mid_fielder': 'CENTROCAMPISTA',
          'forward': 'DELANTERO'
        },
        filterObj: {
          searchBy: 'player'
        }
      }
    },
    methods: {
      changeSearchBy (value) {
        this.filterObj.searchBy = value
      },
      async filterModified (filterObj) {
        this.filterObj = filterObj

        const playerPositions = {
          'goal_keeper': 'ARQ',
          'mid_fielder': 'CEN',
          'defender': 'DEF',
          'forward': 'DEL'
        }

        // console.log(filterObj.allowedPositions)
        this.playersList = await this.backuplist.filter(player => {
          return filterObj.allowedPositions.includes(playerPositions[player.position])
        })

        this.playersList = await this.playersList.filter(player => {
          return (filterObj.priceInterval[0] < player.cost) && ( filterObj.priceInterval[1] > player.cost )
        })

        const searchBy = filterObj.searchBy === 'player' ? 'name': filterObj.searchBy

        this.playersList = await this.playersList.filter(player => {
          return (player[searchBy].toLowerCase()).includes(filterObj.searchTxt.toLowerCase())
        })
      },
      async searchByKeyword (value) {
        const searchBy = this.filterObj.searchBy === 'player' ? 'name': this.filterObj.searchBy
        if (value === '') {
          this.playersList = this.backuplist
          return
        }
        this.playersList = await this.backuplist.filter(player => {
          return (player[searchBy].toLowerCase()).includes(value.toLowerCase())
        })
      },
      async fetchPlayers () {

        if (process.server) return

        // loading on
        if (this.$store.state.isLoading === false) {
          this.$store.state.isLoading = true
        }

        const leagueId = this.$store.getters['createteam/leagueid']

        // const response = await this.$axios.$get(`api/v2.0/players/${leagueId}/all`)
        const response = await this.$axios.$get('api/v2.0/players/all')
        if (response === undefined) return

        // const data = response.data.slice(0,-1)
        const data = response.data.sort((playerA, playerB) => {
          if (playerA.cost > playerB.cost) {
            return -1
          }
          if (playerA.cost < playerB.cost) {
            return 1
          }
          return 0
        })
        // this.teams = data
        this.playersList = data
        this.backuplist = data


        // matches
        let response2 = await this.$axios.$get(`api/v2.0/matches/${leagueId}/current-matches`)
        let matches = response2.data
        let nextMatchTeam = {}

        matches.map(match => {
          let away = match.away_name
          let home = match.home_name

          nextMatchTeam[away] = { name: home, type: 'L' }
          nextMatchTeam[home] = { name: away, type: 'V' }
        })

        this.$store.state.createteam.nextMatchesTeam = nextMatchTeam

        // loading off
        this.$store.state.isLoading = false

      },
      selectPlayer (player, type, i) {

        let data = {
          player: player,
          type: type,
          i: i
        }

        this.$emit('onPlayerSelected', data)
      }
    },
    created () {
      this.fetchPlayers()
    }
  }
</script>

<style scoped lang="stylus">
  #player-bank-card
    background #fafafa
  .round-card
    // width 700px
    // max-height calc(100vh - 100px)
    background #fafafa
    overflow hidden


  .header
    width 100%
    height 68px
    background #243337
    padding 8px 24px
  .header span
    padding 0px 0px

  .content
    height calc(100vh - 280px)
    overflow-y scroll
    padding-bottom 15px
  .title
    display inline-block
    height 100%
    line-height 54px
    margin-right 30px
  .title span
    text-align left
    color white
    font-size 18px
    font-weight bold
    font-family Titillium Web
  .line
    width 100%
    background #25BF89
    height 4px
  .row-header
    font-family Titillium Web
    font-size 12px

  .title-team
    text-transform uppercase
    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 14px;
    text-align: left;
    color #000000
    margin 12px 10px 2px 10px

  .line-team
    height 4px
    background #25BF89
    margin 2px 10px

  .h-name
    width 31%
  .h-status
    width 7%
  .h-popularity
    width 10%
  .h-cost
    width 21%
  .h-position
    width 15%

  //  width 100px
  //  white-space: nowrap;
  //  overflow: hidden;
  //  text-overflow: ellipsis;
  @media screen and (max-width: 1222px)
    .title
      display: inline-block !important
      width: 150px;

  @media screen and (max-width: 1023px)
    .title
      display none !important
    .round-card
      width 100%
    // max-height calc(100vh - 100px)
    .content
      height calc(100vh - 231px)

  @media screen and (max-width: 500px)
    .h-name
      width 36%
    .h-status
      width 12%
    .h-popularity
      display inline-block
      width 30px
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    .h-cost
      width 12%
    .h-position
      width 20%
    .player-bank-card
      border-radius 0


</style>
