<template>
  <div>
    <sidebar mode="simple"/>
    <div id="matches">
      <div class="matches-container">
        <match-card v-for="(match, i) in matches" :key="i+'-match'" class="match-card"/>
      </div>
    </div>
  </div>
</template>

<script>
  import MatchCard from '../../components/MatchCard'
  import Sidebar from '~/components/Sidebar.vue'

  export default {
    layout: 'dashboard',
    name: 'matches',
    components: { MatchCard, Sidebar },
    data () {
      return {
        matches: [
        ]
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus">
  /*#matches*/
  #matches
    overflow-y auto
    height calc(100vh - 128px)
  .match-card
    margin 14px 10px
  .matches-container
    padding-top 25px
    display flex
    flex-wrap wrap
    justify-content space-around
  @media screen and (max-width: 1023px)
    #matches
      height calc(100vh - 56px)

</style>
