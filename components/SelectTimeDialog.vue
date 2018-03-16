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

          <div class="choose-pay-container">
            <div :class="['pay-coins', payType=== 1?'pay-selected':'']" @click="pay(1)">PAGAR POR BOMBO COINS</div>
            <div :class="['pay-credit', payType=== 2?'pay-selected':'']" @click="pay(2)">PAGAR POR CREDITO</div>
          </div>

          <div class="btn-container">
            <div @click="makePlayTeam"
              :class="['btn-juega-ya', 'elevation', 'rounded-sm', (selectedTime=== null || payType === 0)?'btn-juega-ya-disabled':'']">APOSTAR</div>
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
        payType: 0,
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
      pay(option) {
        this.payType = option
      },
      simpleDateFormat (date) {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      },
      selectTime (i) {
        this.selectedTime = i
      },
      fetchTimes () {
        this.$store.state.isShortLoading = true

        this.$axios.get('http://api.bombo.pe/api/v2.0/leagues/all').then(res => {
            const league = res.data.data.filter(league => league.id === this.$store.state.team.selectedLeague)
            this.times = league[0].times.map(time => {
              time.datestart = this.simpleDateFormat((new Date(time.start)))
              return time
            })
          this.$store.state.isShortLoading = false
        }).catch(e => {
            this.$store.state.isShortLoading = false
            this.$store.dispatch('turnOnSnackbar', e)
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
        const payType = this.payType === 1? 'bombocoins' : 'credit'
        try {
          const userId = this.$store.getters['auth/getUserId']
          this.$store.state.isShortLoading = true

          let response = await this.$axios.$post('http://api.bombo.pe/api/v2.0/users/' + userId + '/to-play', {
            team_name: teamName,
            league_id: this.selectedLeague,
            time_id: timeId,
            pay_type: payType
          })

          this.$store.state.isShortLoading = false
          this.$store.dispatch('turnOnSnackbar', 'Equipo puesto en el juego!')
          setTimeout(() => {
            window.location.reload(true)
          }, 1000)
        } catch (e) {
          console.log(e.response.data)
          this.$store.state.isShortLoading = false
          this.$store.dispatch('turnOnSnackbar', e.response.data.error)
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
    height 500px
    padding 10px
    background: #fafafa
    position relative
  .list-times
    display flex
    flex-wrap wrap
    justify-content: space-between;
    overflow: auto;
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
  .choose-pay-container
    width 100%
    display flex
    flex-wrap wrap
    padding-bottom 50px
    padding-top 20px
  .pay-coins
  .pay-credit
    margin 4px 4px
    cursor pointer
    display inline-block
    padding 4px 10px
    height 30px
    border-radius 8px
    border 2px solid red
    color red
    font-weight bold
    font-family: Titillium Web
  .pay-selected
    color white
    background red

  .card-time
    cursor pointer
    width 110px
    height 50px
    margin 4px
  .card-time-selected .date
    background: white
    color #243237
  .card-time-selected .ronda
    background: #243237;
    color white

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
