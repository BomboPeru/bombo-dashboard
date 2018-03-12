<template>
    <div id="player-bank-card" class="round-card rounded elevation">
      <div class="header elevation">
        <div class="title">
          <span class="title-text">{{ title }}</span>
        </div>
        <!--<search-component v-model="search"/>-->
        <players-filter @changeFilter="filterModified"/>
      </div>
      <div class="line elevation"></div>
      <!-- header -->
      <table style="width: 100%;" class="row-header">
        <thead>
          <tr>
            <th style="width: 31%;">Nombre</th>
            <th style="width: 7%;">Estado</th>
            <th style="width: 10%;">Popularidad</th>
            <th style="width: 21%;">Costo</th>
            <th style="width: 15%;">Posicion</th>
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
            @onPlayerSelected="selectPlayer(player, player.position)"/>

          <!--<template v-for="(_team, _key) in teams">-->
            <!--<div :key="_key">-->
              <!--<div class="title-team" >{{ _team.name }}</div>-->
              <!--<div class="line-team"></div>-->
              <!--<div>-->
                <!--v-for="(player, key) in _team.goal_keeper"-->
                <!--<player-row-card-->
                  <!--v-for="(player, key) in _team.gol_keeper"-->
                  <!--:key="key + '-portero'"-->
                  <!--:player="player"-->
                  <!--position="ARQUERO"-->
                  <!--@onPlayerSelected="selectPlayer(player, 'goal_keeper')"/>-->

                <!--<player-row-card-->
                  <!--v-for="(player, key) in _team.defender" :key="key + '-defensa'" :player="player"-->
                  <!--position="DEFENSA"-->
                  <!--@onPlayerSelected="selectPlayer(player, 'defender')"/>-->

                <!--<player-row-card-->
                  <!--v-for="(player, key) in _team.mid_fielder"-->
                  <!--:key="key + '-centrocampista'" :player="player" position="CENTROCAMPISTA"-->
                  <!--@onPlayerSelected="selectPlayer(player, 'mid_fielder')"/>-->

                <!--&lt;!&ndash;v-for="(player, key) in _team.forward"&ndash;&gt;-->
                <!--<player-row-card-->
                  <!--v-for="(player, key) in _team.forwarder"-->
                  <!--:key="key + '-delantero'" :player="player" position="DELANTERO"-->
                  <!--@onPlayerSelected="selectPlayer(player, 'forward')"/>-->
              <!--</div>-->
            <!--</div>-->
          <!--</template>-->
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
      search: {
        get () {
          // this.fetchSomething(this.searchText)
          // console.log('get')
          return this.searchText
        },
        set (value) {
          // console.log('set')
          this.fetchSomething(value)
          return value
        }
      }
    },
    data () {
      return {
        title: 'JUGADORES DE LA TEMPORADA',
        teams: [],
        playersList: [],
        searchText: '',
        playerTypesConversions: {
          'goal_keeper': 'ARQUERO',
          'defender': 'DEFENSA',
          'mid_fielder': 'CENTROCAMPISTA',
          'forward': 'DELANTERO'
        }
      }
    },
    methods: {
      filterModified (filterObj) {
      },
      async fetchPlayers () {
        const response = await this.$axios.$get('http://api.bombo.pe/api/v2.0/players/all')
        const data = response.data.slice(0,-1)
        // this.teams = data
        this.playersList = data
      },
      async fetchSomething(searchText) {
        // const data = response.data.slice(0,5)
        // const data = SampleData

        console.log('fetching', searchText)
        if (searchText !== '') {

          console.log('do something')
          let results = {}
          for (let key = 0; key < data.length; key++) {

            for (let typePlayer = 0; typePlayer < playerTypes.length ;typePlayer++) {
              data[key][playerTypes[typePlayer]].map(player => {
                if (player.name.toUpperCase().includes(searchText.toUpperCase())) {
                  if (results[key] === undefined) {
                    results[key] = {}
                  }
                  if (results[key][playerTypes[typePlayer]] === undefined) {
                    results[key][playerTypes[typePlayer]] = []
                  }
                  results[key][playerTypes[typePlayer]].push(player)
                }
              })
            }
          }
          this.teams = results
        } else {
          this.teams = data
        }
        console.log('fetch done')
      },
      selectPlayer (player, type) {
        let data = {
          player: player,
          type: type
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
    width 700px
    max-height calc(100vh - 100px)
    background #fafafa
    overflow hidden

  //  width 100px
  //  white-space: nowrap;
  //  overflow: hidden;
  //  text-overflow: ellipsis;
  /*.title-text*/
  /*color: white !important*/

  @media screen and (max-width: 1023px)
    .title
      display none !important
    .round-card
      width 100%
      // max-height calc(100vh - 100px)

  .header
    width 100%
    height 72px
    background #243337
    padding 8px 24px
  .header span
    padding 0px 0px

  .content
    height calc(100vh - 300px)
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

</style>
