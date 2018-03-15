<template>
    <div id="time-dialog" v-if="isOpen">
      <dialog-container @closeDialog="closeDialog" :fixed="false">
        <div class="elevation rounded-sm select-time-card">
          <div class="title">
            <p>Selecciona la fecha en que quieres jugar con tu equipo</p>
            <span style="display: none">{{selectedLeague}}</span>
          </div>
          <div class="list-times">
            <div v-for="(time, i) in times"
                 :key="i+'-time-card'"
                 :class="['card-time', 'elevation', 'rounded', i=== selectedTime? 'card-time-selected':'']"
                 @click="selectTime(i)">
              <div class="ronda">
                Ronda: {{ time.number }}
              </div>
              <div class="date">
                {{ time.datestart }}
              </div>
            </div>
          </div>
          <div class="btn-container">
            <div @click="makePlayTeam"
              :class="['btn-juega-ya', 'elevation', 'rounded-sm', selectedTime=== null?'btn-juega-ya-disabled':'']">APOSTAR</div>
          </div>
        </div>
      </dialog-container>
    </div>
</template>

<script>
  import DialogContainer from './DialogContainer'

  export default {
    name: 'select-time-dialog',
    components: {
      DialogContainer
    },
    props: {
      isOpen: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        times: [],
        selectedTime: null
      }
    },
    computed: {
      selectedLeague () {
        if (this.$store.state.team.selectedLeague !== null) {
          this.fetchTimes()
        }
        return this.$store.state.team.selectedLeague
      }
    },
    methods: {
      simpleDateFormat (date) {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      },
      selectTime (i) {
        this.selectedTime = i
      },
      fetchTimes () {
        this.$axios.get('http://api.bombo.pe/api/v2.0/leagues/all').then(res => {
          const league = res.data.data.filter(league => league.id === this.$store.state.team.selectedLeague)
          this.times = league[0].times.map(time => {
            time.datestart = this.simpleDateFormat((new Date(time.start)))
            return time
          })
          }).catch(e => {
            console.log(e)
          })
      },
      closeDialog () {
        this.$emit('onCollapse', false)
      },
      async makePlayTeam () {
        if (this.selectedTime === null) return
        //  make update of team

        const timeId = this.times[this.selectedTime].id
        const teamName = this.$store.state.team.teamNameToMakePlay
        try {
          const userId = this.$store.getters['auth/getUserId']
          let response = await this.$axios.$post('http://api.bombo.pe/api/v2.0/users/' + userId + '/to-play', {
            team_name: teamName,
            league_id: this.selectedLeague,
            time_id: timeId,
            pay_type: 'credit'
          })

          this.$store.dispatch('turnOnSnackbar', 'Equipo puesto en el juego!')
          setTimeout(() => {
            // window.location.reload(true)
          }, 1000)

        } catch (e) {
          console.log(e)
          this.$store.dispatch('turnOnSnackbar', 'Error al procesar Equipo, pruebalo mas tarde.')
        }
      }
    },
    beforeCreate() {
      if (this.$store.state.team.selectedLeague === null) {
        this.$emit('onCollapse', false)
      }
    },
    mounted () {
    }
  }
</script>

<style scoped lang="stylus">
  .date
    height: 50%;
    background: #243237;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 4px 2px;
    text-align: center;
    color white
  .ronda
    height: 50%;
    color #243237
    background: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 4px 2px;
    text-align: center;
  .select-time-card
    font-family: Titillium Web
    width 400px
    height 400px
    padding 10px
    background: #fafafa
    position relative
  .list-times
    display flex
    flex-wrap wrap
    justify-content: space-between;
    overflow: auto;
    padding-bottom 50px
  .btn-container
    position absolute
    bottom 0
    left 0
    width 100%
    padding 14px 10px
  .btn-juega-ya-disabled
    background gray !important
  .btn-juega-ya
    cursor pointer
    text-align center
    line-height 40px
    background rgb(37, 191, 137)
    height 40px
    color white
    font-family: Titillium Web

  .card-time
    cursor pointer
    width 110px
    height 50px
    margin 4px
  .card-time-selected
    box-shadow: 0 3px 15px rgb(37, 191, 137), 0 10px 32px rgba(0, 0, 0, .23)
    // box-shadow 0 3px 8px rgba(63, 212, 65, .70), 2 1px 3px rgba(27, 185, 92, .70)
    // box-shadow 0 3px 16px rgba(0, 0, 0, .16), 0 10px 32px rgba(0, 0, 0, .23)

  .title
    font-weight bold
    font-size 16px
    color gray
    padding-bottom 12px
  @media screen and (max-width: 500px)
    .select-time-card
      width 300px
      height 400px


</style>
