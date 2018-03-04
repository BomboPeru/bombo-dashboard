<template>
    <div id="historic-match-card" class="elevation">
      <div class="header">
        <table>
          <thead>
            <tr>
              <th id="team-a" class="team-logo">
                <img src="../assets/icons/placeholder_team_icon.svg" width="20px"/>
              </th>
              <th class="match-info">
                <div class="date">
                  <!--<span>{{ match.info.date }}</span>-->
                </div>
                <div class="match-team">
                  <span>{{ match.home.name }}</span>
                  {{ match.home.score }}
                  vs
                  {{ match.away.score }}
                  <span>{{ match.away.name }}</span>
                </div>
              </th>
              <th id="team-b" class="team-logo">
                <img src="../assets/icons/placeholder_team_icon.svg" width="20px"/>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="content">
        <table>
          <thead>
            <tr>
              <th class="green-dot"></th>
              <th class="min">Min</th>
              <th class="event">Evento</th>
              <th class="player">Jugador</th>
              <th class="score">Puntos</th>
              <th class="yellow-dot"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="content-tr" v-for="(event, i) in events" :key="i+'-match-fact'">
              <!--<template v-for="(event, j) in player.data.events">-->
                <!--<td class="green-dot"> <span class="green-ball" v-if="player.type === 'home'"></span></td>-->
                <td ></td>
                <td class="min">{{ event.event.at }}</td>
                <td class="event"> {{eventTypes[event.event.type] }} </td>
                <td class="player"> {{ event.player.name }}</td>
                <!--<td :class="['score', player.yellow?'score-yellow':'score-green']">{{ player.score }} </td>-->
                <!--<td class="yellow-dot"> <span class="yellow-ball" v-if="player.type === 'away'"></span> </td>-->
              <!--</template>-->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'historic-match-card',
    props: {
      match: Object
    },
    data () {
      return {
        eventTypes: {
          'substitution-in': 'INGRESO',
          'substitution-out': 'SALIDA',
          'y-card': 'AMARILLA',
          'yr-card': 'AM-ROJA',
          'r-card': 'ROJA',
          'soccer-ball': 'GOL',
          'soccer-ball-own': 'AUTOGOL'
        }
      }
    },
    computed: {
      events () {
        let allEvents = []
        if (this.match.away.events['alineaciones_iniciales'] !== undefined
          && this.match.away.events['suplentes'] !== undefined)
        {
          console.log(this.match.away.events['alineaciones_iniciales'])
          const awayEventsAlineaciones = this.match.away.events['alineaciones_iniciales'].filter((player) => {
            return player.events.length > 0
          })
          const awayEventsSuplentes = this.match.away.events.suplentes.filter((player) => {
            return player.events.length > 0
          })

          const homeEventsAlineaciones = this.match.home.events.alineaciones_iniciales.filter((player) => {
            return player.events.length > 0
          })
          const homeEventsSuplentes = this.match.home.events.suplentes.filter((player) => {
            return player.events.length > 0
          })

          awayEventsAlineaciones.map((away) => {
            away.events.map((event) => {
              let _away = away
              delete _away.events
              allEvents.push({event: event, player: _away, type: 'away'})
            })
          })
          awayEventsSuplentes.map((away) => {
            away.events.map((event) => {
              let _away = away
              delete _away.events
              allEvents.push({event: event, player: _away, type: 'away'})
            })
          })
          homeEventsAlineaciones.map((home) => {
            home.events.map((event) => {
              let _home = home
              delete _home.events
              allEvents.push({event: event, player: _home, type: 'home'})
            })
          })
          homeEventsSuplentes.map((home) => {
            home.events.map((event) => {
              let _home = home
              delete _home.events
              allEvents.push({event: event, player: _home, type: 'home'})
            })
          })
        }
        let sortByTime = function sortByTime(a,b) {
          let _a = parseInt(a.event.at.substring(0, a.event.at.length - 1))
          let _b = parseInt(b.event.at.substring(0, b.event.at.length - 1))
          if (_a < _b)
            return -1;
          if (_a > _b)
            return 1;
          return 0;
        }
        allEvents.sort(sortByTime)
        return allEvents
      }
    }
  }
</script>

<style scoped lang="stylus">
  #historic-match-card
    background #fafafa
    border-radius: 12px;
    margin-bottom 23px
  .header
    background #243237
    height 56px
    border-radius: 12px 12px 0px 0px;
    padding-left 15px
    padding-right 15px
  .header table
    width 100%
    height 56px
  .team-logo
    width 10%
    padding-top 20px
  .match-info
    width 50%
    color white
    font-family Titillium Web
  .date
    font-size 10px
  .match-team
    display flex
    justify-content space-around
    font-size 14px
  .content
    padding-bottom 18px
  .content table
    width 100%
  .content thead
    width 100%
    font-size: 10px
    color: #707070
    font-family Titillium Web
    font-weight lighter

  .content-tr
    font-size: 13px
    text-align center
    font-family Titillium Web
  .green-dot
    width 10%
  .yellow-dot
    width 10%
  .min
    width 10%
  .event
    width 10%
  .player
    width 50%
  .content-tr .player
    padding-left 14px
    text-align center
  .score
    width 10%
  .score-yellow
    color #FFC400
  .score-green
    color #3FA707

  .green-ball
  .yellow-ball
    width: 10px;
    display: inline-block;
    height: 10px;
    border-radius: 5px;
  .yellow-ball
    background #FFC400
  .green-ball
    background #3FA707
</style>
