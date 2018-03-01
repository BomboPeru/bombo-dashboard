<template>
    <div id="player-bank-card" class="round-card rounded elevation">
      <div class="header elevation">
        <div class="title">
          <span class="title-text">{{ title }}</span>
        </div>
        <search-component v-model="search"/>
      </div>
      <div class="line elevation"></div>
      <!-- header -->
      <div class="header-text">
        <div class="name">Nombre</div>
        <div class="prom">Prom</div>
        <div class="up">UP</div>
        <div class="costo">Costo</div>
        <div class="posicion">Posicion</div>
      </div>
      <!-- content -->
      <div class="content">
        <template v-for="(_team, _key) in teams">
          <div :key="_key">
            <div class="title-team" >{{ _team.name }}</div>
            <div class="line-team"></div>
            <div>
              <!--v-for="(player, key) in _team.goal_keeper"-->
              <player-row-card
                v-for="(player, key) in _team.gol_keeper"
                :key="key + '-portero'"
                :player="player"
                position="ARQUERO"
                @onPlayerSelected="selectPlayer(player, 'goal_keeper')"/>

              <player-row-card
                v-for="(player, key) in _team.defender" :key="key + '-defensa'" :player="player"
                position="DEFENSA"
                @onPlayerSelected="selectPlayer(player, 'defender')"/>

              <player-row-card
                v-for="(player, key) in _team.mid_fielder"
                :key="key + '-centrocampista'" :player="player" position="CENTROCAMPISTA"
                @onPlayerSelected="selectPlayer(player, 'mid_fielder')"/>

              <!--v-for="(player, key) in _team.forward"-->
              <player-row-card
                v-for="(player, key) in _team.forwarder"
                :key="key + '-delantero'" :player="player" position="DELANTERO"
                @onPlayerSelected="selectPlayer(player, 'forward')"/>
            </div>
          </div>
        </template>
      </div>
    </div>
</template>

<script>
  import SearchComponent from './SearchComponent'
  import PlayerRowCard from './PlayerRowCard'
  import SampleData from '../assets/sample/premier_league_full'

  export default {
    name: 'player-bank-card',
    components: {
      SearchComponent, PlayerRowCard
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
        teams: {},
        searchText: ''
      }
    },
    methods: {
      async fetchSomething(searchText) {
        // const data = await this.$axios.$get('https://bombo-open-api-nbjozjbvyl.now.sh/api/v1/full')

        console.log('fetching', searchText)
        if (searchText !== '') {

          console.log('do something')
          let types = ['gol_keeper', 'defender', 'mid_fielder', 'forwarder']
          let results = {}
          for (let key = 0; key < SampleData.length; key++) {

            for (let typePlayer = 0; typePlayer < types.length ;typePlayer++) {
              SampleData[key][types[typePlayer]].map(player => {
                if (player.name.toUpperCase().includes(searchText.toUpperCase())) {
                  if (results[key] === undefined) {
                    results[key] = {}
                  }
                  if (results[key][types[typePlayer]] === undefined) {
                    results[key][types[typePlayer]] = []
                  }
                  results[key][types[typePlayer]].push(player)
                }
              })
            }
          }
          this.teams = results
        } else {
          this.teams = SampleData
          // this.teams = data
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
      this.fetchSomething('')
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
    height 50px
    background #445F69
    padding 8px 15px
  .header span
    padding 0px 0px
  .content
    height calc(100vh - 270px)
    overflow-y scroll
    padding-bottom 15px
  .title
    display inline-block
    height 100%
    line-height 34px
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
    height 8px
  .header-text
    width 100%
    text-align center
  .header-text div
    display inline-block
    font-size 10px
    font-family Titillium Web
  .name
    text-align left !important
    padding-left 50px
    width 37.5%
  .prom
    width 12.5%
  .up
    width 12.5%
  .costo
    width 12.5%
  .posicion
    text-align left !important
    padding-left 24px
    width 25%
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
