<template>
    <div id="new-team-card" class="round-card rounded elevation">
      <div class="header elevation">
        <div class="title">
          <span class="">{{ title }}</span>
        </div>
      </div>
      <div
        v-if="team.porteros.length === 0 && team.defensas.length === 0 && team.centrocampistas.length === 0 && team.delanteros.length === 0"
        class="empty-players">
        Escoge jugadores!
      </div>
      <div v-else class="player-list">
        <player-row-card v-for="(player, key) in team.porteros" :key="key+'-arquero'" :player="player" position="ARQUERO"/>

        <player-row-card v-for="(player, key) in team.defensas" :key="key+'-defensa'" :player="player" position="DEFENSA"/>

        <player-row-card v-for="(player, key) in team.centrocampistas" :key="key+'-centrocampista'" :player="player" position="CENTROCAMPISTA"/>

        <player-row-card v-for="(player, key) in team.delanteros" :key="key+'-delantero'" :player="player" position="DELANTERO"/>
      </div>
    </div>
</template>

<script>
  import PlayerRowCard from './PlayerRowCard'

  export default {
    name: 'new-team-card',
    components: {
      PlayerRowCard
    },
    props: {
      team: Object
    },
    data () {
      return{
        title: 'MI EQUIPO',
      }
    }
  }
</script>

<style scoped lang="stylus">
  #new-team-card
    background #fafafa
    padding-bottom 14px
  .round-card
    width 700px
    max-height calc(100vh - 200px)
    overflow auto
    background #fafafa
  .header
    width 100%
    height 50px
    background #417F96
    padding 8px 15px
  .header span
    padding 0px 0px
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

  .empty-players
    margin 20px 5px
    font-family Titillium Web
    text-align center
    height calc(100vh - 290px)

  .player-list
    margin-top 14px
</style>
