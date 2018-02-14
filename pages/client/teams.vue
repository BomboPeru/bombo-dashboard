<template>
  <div id="teams">
    <div v-if="teams.length === 0" class="container">
      <div class="empty-teams-message">
        <p>Aun no tienes ningun equipo <br>Que esperas para crear uno?!</p>
        <icon-button text="CREAR EQUIPO!"
                     icon-direction="left"
                     color="#25BF89"
                     icon="plus"
                     class="create-team-btn"
                     @click="goToCreateTeam"
        />
      </div>
    </div>
    <div v-else class="container">

    </div>
  </div>
</template>

<script>
  import IconButton from '../../components/IconButton'

  export default {
    layout: 'dashboard',
    name: 'myteams',
    components: {
      IconButton
    },
    data () {
      return {
        teams: []
      }
    },
    methods: {
      goToCreateTeam () {
        this.$router.push({ path: '/client/createteam'})
      }
    }
  }
</script>

<style scoped lang="stylus">

  .container
    min-height: calc(100vh - 128px)
    display: flex;
    justify-content: center;
    align-items: center;
  .create-team-btn
    width 200px
  .empty-teams-message
    text-align: center
  .empty-teams-message p
    color #445F69
    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 24px;
    text-align: center;
    padding-bottom 15px
</style>
