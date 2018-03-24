<template>
    <div id="time-dialog" v-if="isOpen">
      <dialog-container @closeDialog="closeDialog" :fixed="false">
        <div class="elevation select-time-card">

          <div class="close-icon" @click="closeDialog">
            <i class="fas fa-times"></i>
          </div>

          <div class="confirmation-dialog" v-if="payType !== null && selectedTime !== null">
            <div class="confirmation-content">
              <div>
                <p class="purchase-information">Estás apunto de colocar a tu equipo en juego, recuerda que
                  <span class="highlight-information">{{ payTypes[payType].phrase }}</span>
                  y que no podrás volver atrás,
                  para confirmar presiona el botón jugar ya!
                </p>

                <div class="btn-container">
                  <div class="purchase-btn" @click="purchase">COMPRAR</div>
                  <div class="cancel-purchase-btn" @click="payType = null">CANCELAR</div>
                </div>
              </div>
            </div>
          </div>

          <div class="title">
            <p>Selecciona la fecha en la quieres jugar con tu equipo</p>
            <span style="display: none">{{selectedLeague}}</span>
          </div>

          <div class="list-times">

            <div v-for="(time, i) in times"
                 :key="i+'-time-card'"
                 v-if="i % 2 === 0">


              <time-card :time="time"
                         class="time-card"
                         :index="i"
                         @onSelectTime="onSelectTime"
                         :selected="i===selectedTime"/>

              <time-card v-if=" (i+1) < times.length"
                         :time="times[i+1]"
                         :index="i+1"
                         @onSelectTime="onSelectTime"
                         :selected="(i+1)===selectedTime"
                         class="time-card" />

            </div>
          </div>

          <div class="warning" v-if="emptyTime">
            Debes seleccionar una fecha válida para poder apostar.
          </div>

          <div class="disclaimer">
            NOTA: Al apostar con credito se descuenta automaticamente de tu saldo. Puedes obtener un registro de tus
            apuestas en  mi perfil. Si apuestas con bombo coins se descontara respectivamente al saldo de bombo coins.
            Para mas informacion ir a FAQ.
          </div>

          <div class="choose-pay-container">
            <div :class="['pay-coins']" @click="pay(0)">JUGAR CON BOMBO COINS</div>
            <div :class="['pay-credit']" @click="pay(1)">JUGAR CON TU CRÉDITO</div>
          </div>

          <!--<div class="">-->
            <!--<div @click="makePlayTeam"-->
              <!--:class="['btn-juega-ya', 'elevation', 'rounded-sm', (selectedTime=== null || payType === 0)?'btn-juega-ya-disabled':'']">APOSTAR</div>-->
          <!--</div>-->

        </div>
      </dialog-container>
    </div>
</template>

<script>
  import DialogContainer from './DialogContainer'
  import TimeCard from './TimeCard'

  export default {
    name: 'select-time-dialog',
    components: {
      DialogContainer, TimeCard
    },
    props: {
      isOpen: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        emptyTime: false,
        payType: null,
        payTypes: [
          { phrase: 'gastarás 10 bombo coins (10 B)', type: 'bombocoins' },
          { phrase: 'gastarás 10 créditos del juego (s/ 10)', type: 'credit' }
        ],
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

        if (this.selectedTime === null) {
          this.emptyTime = true
          this.payType = null
        } else {
          this.payType = option
          this.emptyTime = false
        }
      },
      simpleDateFormat (date) {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      },
      onSelectTime (i) {
        this.selectedTime = i
      },
      fetchTimes () {
        this.$store.state.isShortLoading = true

        this.$axios.get('https://api.bombo.pe/api/v2.0/leagues/all').then(res => {
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
        this.$store.state.team.selectTimeDialog = false
      },
      async makePlayTeam () {
        if (this.selectedTime === null) return
        //  make update of team

        const timeId = this.times[this.selectedTime].id
        const teamName = this.$store.state.team.teamNameToMakePlay
        const payType = this.payTypes[this.payType].type

        console.log('timeId', timeId, 'teamName', teamName, 'payType', payType)
        try {
          const userId = this.$store.getters['auth/getUserId']
          this.$store.state.isShortLoading = true

          let response = await this.$axios.$post('https://api.bombo.pe/api/v2.0/users/' + userId + '/to-play', {
            team_name: teamName,
            league_id: this.selectedLeague,
            time_id: timeId,
            pay_type: payType
          })

          this.$store.dispatch('updateUser', response.data)

          this.$store.state.isShortLoading = false
          this.$store.dispatch('turnOnSnackbar', 'Equipo puesto en el juego!')

          this.$store.state.team.selectTimeDialog = false
          // setTimeout(() => {
          //   window.location.reload(true)
          // }, 1000)
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
    font-family 'Nunito Sans'
    width 80vw
    min-height 500px
    padding 10px
    background: #fafafa
    position relative
    border-radius 15px

  .close-icon
    position absolute
    top 12px
    right 20px
    cursor pointer

  .time-card
    margin 12px 8px
  .list-times
    display flex
    height auto
    //flex-wrap wrap
    justify-content: space-between;
    overflow: auto;
    margin: 0 22px;

  .disclaimer
    margin-top 12px
    padding 0 30px
  .warning
    margin-top 12px
    color #fe5567
    font-size 12px
    padding 0 30px

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
    justify-content space-around
    padding-top 20px
  .pay-coins
  .pay-credit
    margin 4px 4px
    cursor pointer
    display inline-block
    padding 4px 40px
    height 40px
    line-height 32px

    border-radius 20px
    color white
    font-weight bold
    font-family: Titillium Web

  .pay-coins
    background #FE5567
  .pay-credit
    background #5259F6


  .card-time
    cursor pointer
    min-width 300px
    height 120px
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
    color #2E2E2E
    margin-top 40px
    padding-bottom 12px
    text-align center
  .confirmation-dialog
    position absolute
    top 0
    left 0
    bottom 0
    z-index 10
    border-radius 15px
    width 100%
    background rgba(0, 0, 0, 0.8)
  .confirmation-content
    position absolute
    top 50%
    left 50%
    transform translateX(-50%) translateY(-50%)
    color white
    width 70%
    height auto
  .disclaimer
    font-size 10px
    color black
  .purchase-information
    margin-bottom 20px

  .highlight-information
    font-weight bold
    font-style italic
    font-size 18px
  .btn-container
    display flex
    flex-wrap wrap
    justify-content space-around
  .purchase-btn
    background #25BF89
    color white
  .cancel-purchase-btn
    background #ea504c
    color white

  .cancel-purchase-btn
  .purchase-btn
    margin-left 2px
    margin-right 2px
    cursor pointer
    text-align center
    display inline-block
    font-weight bold
    height 30px
    line-height 30px
    border-radius 15px
    padding 0px 22px


  @media screen and (max-width: 1023px)
    .select-time-card
      width 80vw


  @media screen and (max-width: 500px)
    .select-time-card
      width 100vw
      height: 100vh
      border-radius 0px
    .list-times
      margin 0 0
    .choose-pay-container
      margin-bottom 12px


</style>
