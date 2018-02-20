<template>
  <div id="dashboard">
    <div class="content">
      <div class="section">
        <ranking-card/>
      </div>
      <div class="section matches-container">
        <historic-match-card v-for="(item, i) in matches"
                             :key="i+'-match-card'"
                             :match="item"/>
      </div>
      <div class="section teams-container">
        <team-card class="team-card"
                   v-for="(team, i) in teams"
                   :key="i+'-team'"
                   :title="team.name"
                   :ranking="team.ranking"
                   :points="team.points"
                   :created-at="team.createdAt"
                   :players="team.players"
                   :collapsable="true"/>
      </div>
    </div>
  </div>
</template>

<script>
  import RankingCard from '../../components/RankingBoard'
  import HistoricMatchCard from '../../components/HistoricMatchCard'
  import TeamCard from '../../components/TeamCard'

  export default {
    layout: 'dashboard',
    name: 'dashboard',
    components: {
      RankingCard, HistoricMatchCard, TeamCard
    },
    data () {
      return {
        matches: [
          { teamAImg: '', teamBImg: '',
            info: { teamA: 'FCB', teamB: 'RMFC', date: '12/02/18' },
            facts: [
              { min: '12\'', event:'GOL', player: 'Jugador Name', score: '+100', yellow: true, green: false },
              { min: '12\'', event:'GOL', player: 'Jugador Name', score: '+100', yellow: false, green: true }
            ]
          }
        ],
        teams: [
          {
            name: 'Nombre Team', points: 233, createdAt: '23/12/18', ranking: 2,
            players: {
              porteros: [ { name: 'NOmbre Plyaer', j_number: '23', points: 23 } ],
              defensas: [
                { name: 'NOmbre Plyae sdsds dsd s dsdsds dsdsds sdsdsd dsds dsds r', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' }
              ],
              centrocampistas: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
              delanteros: [ { name: 'NOmbre Plyaer', j_number: '23' } ]
            }
          },
          {
            name: 'Nombre Team', points: 233, createdAt: '23/12/18', ranking: 2,
            players: {
              porteros: [ { name: 'NOmbre Plyaer', j_number: '23', points: 23 } ],
              defensas: [
                { name: 'NOmbre Plyae sdsds dsd s dsdsds dsdsds sdsdsd dsds dsds r', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' }
              ],
              centrocampistas: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
              delanteros: [ { name: 'NOmbre Plyaer', j_number: '23' } ]
            }
          },
          {
            name: 'Nombre Team', points: 233, createdAt: '23/12/18', ranking: 2,
            players: {
              porteros: [ { name: 'NOmbre Plyaer', j_number: '23', points: 23 } ],
              defensas: [
                { name: 'NOmbre Plyae sdsds dsd s dsdsds dsdsds sdsdsd dsds dsds r', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' }
              ],
              centrocampistas: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
              delanteros: [ { name: 'NOmbre Plyaer', j_number: '23' } ]
            }
          },
          {
            name: 'Nombre Team', points: 233, createdAt: '23/12/18', ranking: 2,
            players: {
              porteros: [ { name: 'NOmbre Plyaer', j_number: '23', points: 23 } ],
              defensas: [
                { name: 'NOmbre Plyae sdsds dsd s dsdsds dsdsds sdsdsd dsds dsds r', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' }
              ],
              centrocampistas: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
              delanteros: [ { name: 'NOmbre Plyaer', j_number: '23' } ]
            }
          },
          {
            name: 'Nombre Team', points: 233, createdAt: '23/12/18', ranking: 2,
            players: {
              porteros: [ { name: 'NOmbre Plyaer', j_number: '23', points: 23 } ],
              defensas: [
                { name: 'NOmbre Plyae sdsds dsd s dsdsds dsdsds sdsdsd dsds dsds r', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' },
                { name: 'NOmbre Plyaer', j_number: '23' }
              ],
              centrocampistas: [ { name: 'NOmbre Plyaer', j_number: '23' } ],
              delanteros: [ { name: 'NOmbre Plyaer', j_number: '23' } ]
            }
          }
        ]
      }
    }
  }
</script>

<style scoped lang="stylus">
  /*#matches*/

  .content
    display flex
    justify-content space-around
    height calc(100vh - 128px)
  .section
    width 100%
    overflow-y auto
    padding-top 15px
    padding-left 7.5px
    padding-right 7.5px
  .matches-container
    padding-left 24px
    padding-right 24px
  .teams-container
    display flex
    flex-wrap wrap
    justify-content space-around
    align-content flex-start

  .team-card
    /*flex-shrink 0*/
    margin-bottom 26px

</style>
