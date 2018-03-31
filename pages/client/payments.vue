<template>
  <div id="payments">

    <div class="">

      <div class="header-container mobile">
        <svg class="header-background"
             width="100%"
             viewBox="0 0 100 100"
             height="220px"
             version="1.1"
             preserveAspectRatio="none">
          <polygon points="0,0 0,70 100,100 100,0" :style="{ fill: plans[planSelected].backgroundColor }" />
        </svg>
      </div>

      <div class="body">


        <div class="content">

          <div class="status-payment">
            <h3 class="title-1">Tu estás comprando</h3>
            <h2 class="title-2">{{ plans[planSelected].name }}</h2>

            <div class="card-amount">

              <div class="prev-btn" @click="prevPlan">
                <img src="/payment/arrow_l.svg" width="32px" height="32px" alt="">
              </div>

              <div class="next-btn" @click="nextPlan">
                <img src="/payment/r_arrow.svg" width="32px" height="32px" alt="">
              </div>

              <div class="amount-cost"><span class="currency-sign">s/</span> {{ plans[planSelected].amount }}</div>

              <div class="card-img-container">
                <img :src="plans[planSelected].cardSrc" class="card-image" alt="">
              </div>
            </div>
          </div>

          <div class="form-payment">

            <div class="title-form-payment">Introduce los datos de tu tarjeta</div>

            <div class="form-container">

              <div class="card-number-container">
                <div class="card-number-label">Número de tarjeta</div>


                <div class="card-number-input">
                  <i :class="['fab', iconCC, 'card-type-icon']"></i>
                  <the-mask type="text"
                            placeholder="0000-0000-0000-0000"
                            :mask="['####-####-####-####']"
                            class="card-number"
                            v-model="creditInfo.card_number"/>
                </div>
              </div>

              <div class="exp-cvc-container">
                <div class="exp-container">
                  <div class="exp-label">Fecha de expiración</div>
                  <div class="mm-yyyy-form">

                    <the-mask type="text"
                            id="month-input-form"
                            class="month"
                            :mask="['##']"
                            placeholder="MM"
                            v-model="creditInfo.expiration_month"/>

                    <the-mask type="text"
                              id="year-input-form"
                              :mask="['####']"
                              class="year"
                              placeholder="YYYY"
                              v-model="creditInfo.expiration_year"/>

                  </div>
                </div>
                <div class="cvc-container">
                  <div class="cvc-label">CVV/CVC</div>

                  <the-mask type="text"
                            :mask="['###']"
                            class="cvv"
                            placeholder="CVC"
                            v-model="creditInfo.cvv"/>

                </div>
              </div>
            </div>

            <div class="pay-btn-container">
              <button :class="['pay-btn', 'elevation', payButtonEnabled?'':'pay-btn-disabled']"  @click="pay">{{ payButtonText }}</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { TheMask } from 'vue-the-mask'
  // import Cleave from 'cleave.js'

  export default {
    name: 'payments',
    layout: 'dashboard',
    components: {
      TheMask
    },
    methods: {
      nextPlan () {
        if (this.planSelected !== this.plans.length - 1) {
          this.planSelected += 1
        } else {
          this.planSelected = 0
        }
      },
      prevPlan () {
        if (this.planSelected !== 0) {
          this.planSelected -= 1
        } else {
          this.planSelected = this.plans.length - 1
        }
      },
      closeDialog () {
        this.$emit('onCollapse', false)
      },
      async pay () {

        if (!this.payButtonEnabled) {
          return null
        }

        if (this.creditInfo.card_number.length !== 16 ||
          this.creditInfo.cvv.length !== 3 ||
          this.creditInfo.expiration_month.length !== 2 ||
          this.creditInfo.expiration_year.length !== 4) {

          this.$store.dispatch('turnOnSnackbar', 'Datos inválidos.')
          return null
        }

        if ( parseInt(this.creditInfo.expiration_month) > 12 ) {

          this.$store.dispatch('turnOnSnackbar', 'Datos inválidos.')
          return null
        }


        this.payButtonEnabled = false
        this.payButtonText = 'Espere...'

        // lazy validation

        const user = this.$store.getters['user']
        const email = user.email
        this.creditInfo.email = email

        const creditCard = this.creditInfo.card_number

        let request = {
          card_number: creditCard,
          cvv: this.creditInfo.cvv,
          expiration_year: this.creditInfo.expiration_year,
          expiration_month: this.creditInfo.expiration_month,
          email: this.creditInfo.email
        }


        // console.log('request',request)

        // const token = this.$store.getters['auth/getToken']
        const token = window.localStorage.getItem('token')
        const publicKey = 'pk_live_Sabys0p2rhn2D4ZM'

        this.$store.state.isShortLoading = true

        try {

          {
            const response = await this.$axios.$post('https://api.culqi.com/v2/tokens', request,
              { headers: { Authorization: 'Bearer ' + publicKey } })


            let request2 = {
              card_number: request.card_number,
              token_card: response.id
            }
            console.log('request2', request2)

            const response2 = await this.$axios.$post(`api/v2.0/users/${user.id}/set-card`, request2,
              { headers: { Authorization: 'Bearer ' + token} })

            console.log('reponse2', response2)

            const amount = this.plans[this.planSelected].amount
            let finalRequest = {
              how: amount
            }

            const finalResponse = await this.$axios.$post(`api/v2.0/users/${user.id}/charge`, finalRequest,
              { headers: { Authorization: 'Bearer ' + token} })


            this.payButtonText = 'COMPRAR AHORA'
            this.payButtonEnabled = true

            console.log('finalResponse', finalResponse)
            this.$store.dispatch('updateUser', finalResponse.data)

            this.$store.state.isShortLoading = false
            this.$store.dispatch('turnOnSnackbar', 'Felicidades! tu compra ha sido realizada con exito.')
            this.$store.state.bomboPayments = false

          }
        } catch (e) {
          this.$store.state.isShortLoading = false
          console.log('e bombo pa',e.toString())
          this.$store.dispatch('turnOnSnackbar', e.response.data.user_message)

          this.payButtonEnabled = true
          this.payButtonText = 'COMPRAR AHORA'
        }




      }
    },
    computed: {
      iconCC () {
        const ccValue = this.creditInfo.card_number
        if (ccValue.length === 0) return 'fa-cc-visa'
        if (ccValue[0] === '4') {
          return 'fa-cc-visa'
        } else if (ccValue[0] === '5') {
          return 'fa-cc-mastercard'
        } else {
          return 'fa-cc-visa'
        }
      },
      plans () {
        return this.$store.state.payment.plans
      }
    },
    data () {
      return {
        isLoading: false,
        payButtonEnabled: true,
        payButtonText: 'COMPRAR AHORA',
        creditInfo: {
          card_number:'',
          cvv: '',
          expiration_year: '',
          expiration_month: '',
          email: ''
        },
        planSelected: 0
      }
    },
    mounted () {
    }
  }
</script>

<style scoped lang="stylus">
  font = 'Nunito Sans'
  font1 = 'Raleway'
  font2 = 'Titilium Web'

  @font-face {
    font-family 'Campton Bold Demo'
    src url(/Campton-BoldDEMO.otf)
  }


  input[type='number'] {
    appearance: textfield;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']:hover::-webkit-inner-spin-button,
  input[type='number']:hover::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .header-container
    position absolute
    top 0
    left 0
    width 100%
  .body
    position relative
    z-index 2
    margin-top 32px
  .status-payment
    text-align center
  .title-1
    font-family 'Nunito Sans'
    color white
  .title-2
    font-family 'Campton Bold Demo'

  .amount-cost
    font-family 'Campton Bold Demo'
    font-size 60px
  .currency-sign
    font-family 'Raleway'
    font-size 24px
    font-weight 700

  .card-amount
    display flex
    flex-wrap wrap
    justify-content center
    align-items flex-end
    margin: 10px 28px
    position relative
  .prev-btn
    position absolute
    top 20%
    left -20px
  .next-btn
    position absolute
    top 20%
    right -20px


  .card-img-container
    margin-left: 5px;
    width 30%
  .card-image
    width 100%
  .amount-cost
  .card-img-container
    display inline-block
  .amount-cost
    position relative

  .form-payment
    font-family 'Nunito Sans'
  .title-form-payment
    font-family Raleway
    font-weight: 500;
    color #6c7e8c
    text-align center
    font-size 20px


  .year
  .month
  .cvv
  .card-number
    font-size 18px
    font-family font
    color #0C1334
    outline none
    background: transparent;
    border: 0;
    border-bottom: 1px solid #AEAEAE;

  .card-number
    width 100%

  .mm-yyyy-form
    margin-left 10%
    width 80%

  .mm-yyyy-form .month
    display inline-block
    width 20%
    margin-right 4px
  .mm-yyyy-form .year
    display inline-block
    margin-left 4px
    width 30%

  .cvc-container
    display inline-block
    width auto
    margin 20px 0px

  .cvv
    width 100px

  .cvc-label
    width 100px

  .card-number-label
    padding-left: 10%
  .exp-label
    display inline-block
  .exp-container
    display inline-block
    width 160px
  .exp-cvc-container
    display flex
    flex-wrap wrap
    justify-content space-between
    margin-left 10%
    margin-right 10%

  .cvc-label
  .exp-label
  .card-number-label
    padding-bottom 14px
    color #868686
    font-weight 500
    font-family Raleway
    font-size: 13px;

  .exp-container
  .card-number-container
    margin 20px 0

  .card-number-input
    position relative
    display inline-block
    width 80%
    margin-left 10%

  .card-number-input .fab
    position absolute
    right 0
    top 4px

  .pay-btn-container
    margin-top 20px
    position relative
    text-align center
  .pay-btn
    cursor pointer
    height 48px
    padding-left 30px
    padding-right 30px
    display inline-block
    background #01E19F
    border-radius 24px
    border 0
    outline 0
    color white
    font-size 18px
    font-weight 500
    font-family Raleway

    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;

  .pay-btn-disabled
    background gray !important
    cursor none !important

  @media screen and (max-width: 400px)
    .title-form-payment
      font-size 16px
    .title-form-payment
      font-size 16px
    .card-img-container
      width 115px
    .exp-container
      width 140px

</style>
