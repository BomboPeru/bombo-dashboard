<template>
    <div id="createteam">
      <player-bank-card class="player-bank-card" @onPlayerSelected="onPlayerSelected"/>
      <new-team-card class="new-team-card" :team="team"/>
    </div>
</template>

<script>
  import PlayerBankCard from '../../components/PlayerBankCard'
  import NewTeamCard from '../../components/NewTeamCard'

  export default {
    layout: 'dashboard',
    name: 'createteam',
    components: {
      PlayerBankCard, NewTeamCard
    },
    methods: {
      onPlayerSelected (data) {
        let currentTotal = 0
        currentTotal += this.team.porteros.length
        currentTotal += this.team.defensas.length
        currentTotal += this.team.centrocampistas.length
        currentTotal += this.team.delanteros.length
        if ((this.constraints[data.type][1] > this.team[data.type].length) &&
            ( this.constraints.total > currentTotal )
        ) {
          this.team[data.type].push(data.player)
        }
      }
    },
    data () {
      return {
        team: {
          porteros: [],
          defensas: [],
          centrocampistas: [],
          delanteros: []
        },
        constraints: {
          total: 11,
          porteros: [1, 1],
          defensas: [3, 5],
          centrocampistas: [3, 5],
          delanteros: [1, 3]
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  #createteam
    padding 23px
    min-height calc(100vh - 128px)
    display -webkit-box
    align-items: flex-start;
    flex-wrap nowrap
    overflow-x scroll
  .player-bank-card
  .new-team-card
    margin 5px 10px
</style>
