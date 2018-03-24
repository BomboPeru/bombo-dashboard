<template>
    <div id="payments" v-if="isOpen">
      <dialog-container :fixed="true" @closeDialog="closeDialog">
          <div class="elevation card-container rounded-sm loading-container">

            <div class="header-container desktop">

              <svg class="header-background-desktop"
                   width="100%"
                   viewBox="0 0 100 100"
                   height="100%"
                   version="1.1"
                   preserveAspectRatio="none">
                <polygon points="100,0 75,0 60,50 75,100 100,100" :style="{ fill: plans[planSelected].backgroundColor }" />
              </svg>
            </div>
            <div class="header-container mobile">
              <svg class="header-background"
                   width="100%"
                   viewBox="0 0 100 100"
                   height="200px"
                   version="1.1"
                   preserveAspectRatio="none">
                <polygon points="0,0 0,50 100,100 100,0" :style="{ fill: plans[planSelected].backgroundColor }" />
              </svg>
            </div>


            <div class="body">

              <div class="loading-process" v-if="isLoading">
                <div class="loading-card elevation">
                  <div class="loadingIcon">
                    <i class="fas fa-circle-notch fa-spin"></i>
                  </div>
                  <div class="loadingText">
                    <p>Estamos procesando su compra, espere por favor.</p>
                  </div>
                </div>
              </div>

              <div class="close-container">
                <div class="close-btn" @click="closeDialog">
                  <i class="fas fa-times"></i>
                </div>
              </div>

              <div class="next-btn" @click="nextPlan">
                <img src="/payment/r_arrow.svg" width="32px" height="32px" alt="">
              </div>
              <div class="prev-btn" @click="prevPlan">
                <img src="/payment/arrow_l.svg" width="32px" height="32px" alt="">
              </div>

              <div class="content">

                <div class="status-payment">
                  <h3>Tu estás comprando</h3>
                  <h2>{{ plans[planSelected].name }}</h2>

                  <div class="card-amount">
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

                      <i :class="['fab', iconCC, 'card-type-icon']"></i>
                      <input type="text" class="card-number" @keypress="onKeyDown($event, 19)" v-model="cardNumber">
                    </div>

                    <div class="exp-cvc-container">
                      <div class="exp-container">
                        <div class="exp-cvc-label">Fecha de expiración</div>
                        <input class="month" placeholder="MM" type="text"
                               @keypress="onKeyDown($event, 2)"
                               v-model="creditInfo.expiration_month">
                        <input class="year" placeholder="YYYY" type="text"
                               @keypress="onKeyDown($event, 4)"
                               v-model="creditInfo.expiration_year">
                      </div>
                      <div class="cvc-container">
                        <div class="exp-cvc-label">CVV/CVC</div>
                        <input class="cvv" placeholder="CVC" type="text"
                               @keypress="onKeyDown($event, 3)"
                               v-model="creditInfo.cvv">
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
      </dialog-container>
    </div>
</template>

<script>
  import DialogContainer from './DialogContainer'

  export default {
    name: 'bombo-payments',
    components: { DialogContainer },
    props: {
      isOpen: { type: Boolean, default: false }
    },
    methods: {
      onKeyDown(evt, limit){

        if (evt.keyCode < 48 || evt.keyCode > 57) {
          evt.preventDefault()
          return
        }

        if (evt.target.value.length > (limit-1)) {
          if (evt.keyCode >= 48 && evt.keyCode <= 90) {
              evt.preventDefault()
              return
          }
        }
      },
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
      ccFormat (value) {
        var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{4,16}/g);
        var match = matches && matches[0] || ''
        var parts = []
        for (let i=0, len=match.length; i<len; i+=4) {
          parts.push(match.substring(i, i+4))
        }
        if (parts.length) {
          return parts.join(' ')
        } else {
          return value
        }
      },
      async pay () {

        if (!this.payButtonEnabled) {
          return null
        }

        this.payButtonEnabled = false
        this.payButtonText = 'Espere...'

        // lazy validation
        if (this.creditInfo.card_number.length > 18 &&
          this.creditInfo.cvv.length > 2 &&
          this.creditInfo.expiration_month.length >= 2 &&
          this.creditInfo.expiration_year.length > 2) {

          const user = this.$store.getters['user']
          const email = user.email
          this.creditInfo.email = email

          let creditCard = this.creditInfo.card_number
          creditCard = `${creditCard.slice(0,4)}${creditCard.slice(5,9)}${creditCard.slice(10,14)}${creditCard.slice(15,19)}`

          let request = {
            card_number: creditCard,
            cvv: this.creditInfo.cvv,
            expiration_year: this.creditInfo.expiration_year,
            expiration_month: this.creditInfo.expiration_month,
            email: this.creditInfo.email
          }


          console.log('request',request)

          const token = this.$store.getters['auth/getToken']
          const publicKey = 'pk_live_Sabys0p2rhn2D4ZM'


          try {

            {
              const response = await this.$axios.$post('https://api.culqi.com/v2/tokens', request,
                { headers: { Authorization: 'Bearer ' + publicKey } })


              let request2 = {
                card_number: request.card_number,
                token_card: response.id
              }
              console.log('request2', request2)

              const response2 = await this.$axios.$post(`http://api.bombo.pe/api/v2.0/users/${user.id}/set-card`, request2,
                { headers: { Authorization: 'Bearer ' + token} })

              console.log('reponse2', response2)

              this.payButtonText = 'COMPRAR AHORA'
              this.payButtonEnabled = true

              const amount = this.plans[this.planSelected].amount
              let finalRequest = {
                how: amount
              }

              const finalResponse = await this.$axios.$post(`http://api.bombo.pe/api/v2.0/users/${user.id}/charge`, finalRequest,
                { headers: { Authorization: 'Bearer ' + token} })

              console.log('finalResponse', finalResponse)

              this.$store.dispatch('turnOnSnackbar', 'Felicidades! tu compra ha sido realizada con exito.')
            }

          } catch (e) {
            console.log('e bombo pa',e.toString())
            this.$store.dispatch('turnOnSnackbar', e.response.data.user_message)

            this.payButtonEnabled = true
            this.payButtonText = 'COMPRAR AHORA'

          }



        } else {
          this.$store.dispatch('turnOnSnackbar', 'DATOS INVALIDOS')
        }
      }
    },
    computed: {
      cardNumber: {
        get () {
          return this.creditInfo.card_number
        },
        set (value) {
          // let value = this.creditInfo.card_number
          if (value.length === 4 || value.length === 9 || value.length === 14) {
            value += '-'
          }

          this.creditInfo.card_number = value
        }
      },
      ccFormatted: {
        get () {
          return this.cardNumber
          // return '4111 1111 1111 1111'
        },
        set (value) {
          let formatValue = this.ccFormat(value)
          this.cardNumber = formatValue
        }
      },
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
      }
    },
    data () {
      return {
        currency_code: 'PEN',
        amount: 20,
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
        plans: [
          { price: 'S/ 20', amount: 20, name: 'BOMBO PACK 1',
            color: 'linear-gradient(-114deg, rgb(210, 105, 202) 0%, rgb(222, 127, 71) 105%)',
            backgroundColor: '#FEB54B', cardSrc: '/payment/b_card_copy_4.png' },
          { price: 'S/ 30', amount: 30, name: 'BOMBO PACK 2',
            color: 'linear-gradient(-114deg, rgb(66, 158, 129) 0%, rgb(71, 138, 222) 105%)',
            backgroundColor: '#FE63A2', cardSrc: '/payment/b_card_copy_3.png' },
          { price: 'S/ 50', amount: 50, name: 'BOMBO PACK 3',
            color: 'linear-gradient(-114deg, rgb(93, 66, 158) 0%, rgb(222, 71, 189) 105%)',
            backgroundColor: '#4A48D2', cardSrc: '/payment/b_card_copy_2.png' },
          { price: 'S/ 100', amount: 100, name: 'BOMBO PACK 4',
            color: 'linear-gradient(-114deg, rgb(93, 66, 158) 0%, rgb(222, 71, 189) 105%)',
            backgroundColor: '#FE5567', cardSrc: '/payment/b_card.png' }
        ],
        planSelected: 0
      }
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


  .card-container
    border-radius: 15px !important;

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

  .header-background-desktop
  .header-background
    position absolute
    top 0
    left 0
    z-index 1
  .header-background-desktop
    bottom 0

  .card-number-container
    width 100%
    position: relative;
  .card-type-icon
    position absolute
    bottom 4px
    right 2px
  .exp-cvc-container
    display inline-block
    width 100%
    margin-top 15px
  .exp-container input
    margin 0 1%
  .card-number-label
  .exp-cvc-label
    margin 20px 1%
    color #868686
    font-weight bold
    font-family font1
    font-size 13px
  .cvc-container
    display: inline-block;
    width: 100px;
  .exp-container
    width 204px
    display inline-block
  .card-number
    margin 0 1%
    width 300px

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
  .cvv
    width 100%
  .month
    width 40%
  .year
    width 40%

  .mobile
    display none
  .desktop
    display block

  .next-btn img
  .prev-btn img
    cursor pointer
  .next-btn
    color white
    position absolute
    top 50%
    right 20px
    transform translateY(-50%)
  .prev-btn
    color black
    position absolute
    top 50%
    left 20px
    transform translateY(-50%)

  @media screen and (max-width: 1023px)
    .next-btn
    .prev-btn
      top 54px
    .next-btn i
    .prev-btn i
      color white

  @media screen and (max-width: 1023px)
    .desktop
      display none
    .mobile
      display block
    .content
      margin 0
      width 100%

  .content
    width 100%
    display grid
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
  // .form-payment


  .form-payment
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1
    grid-row-end: 2
    font-family font1 !important
    padding 12px 12px 12px 30px
    display grid
    grid-template-columns: 100%;
    grid-template-rows: 25% 55% 40%;

  .title-form-payment
    line-height: 72px;
    text-align: center;
    color: rgb(108, 126, 140) !important;
    font-size: 20px;
    font-weight: bold;

  .form-container
    // width 100%
    justify-self: center


  .pay-btn-container
    width 100%
    align-self: end;
    padding-bottom 32px
  .pay-btn-disabled
    background gray !important
    cursor none !important


  .status-payment
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1
    grid-row-end: 2

  .amount-cost
    font-size 50px
    font-weight bold
    display inline-block
    font-family 'Campton Bold Demo'

  // .card-amount
  .amount-cost
    display block
    text-align right
    color white
    font-size 80px
    padding-right 32px

  .card-img-container
    text-align right
    position relative
    top: 75px;
    display block

  @media screen and (max-width: 1100px)
    .content
      width 100%
      display grid
      grid-template-columns: 60% 40%;
      grid-template-rows: auto;


  @media screen and (max-width: 1023px)
    .content
      width 100%
      display grid
      grid-template-columns: 100%;
      grid-template-rows: 40% 60%;
    // .form-payment

    .form-payment
      padding 0px 0px
      grid-column-start: 1
      grid-column-end: 2
      grid-row-start: 2
      grid-row-end: 3
      font-family font1 !important

    .status-payment
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1
      grid-row-end: 2

    .card-number
      width: 100%;

    .form-container
      padding: 8px 100px;

    .exp-cvc-container
      display: flex;
      justify-content: space-between;

    .card-amount
      margin-top 20px
      display: flex;
      flex-wrap wrap
      justify-content: center;
      align-items: baseline;
    .amount-cost
      padding-right 12px
      color black


  .card-image
    width 360px

  @media screen and (max-width: 1023px)

    .card-img-container
      display inline-block
      position: relative;
      top 0
      right 0
      text-align left

    .card-image
      width 200px
    .form-payment
      left: 0
    .card-number-container
      margin 0
      width 100%
    .exp-cvc-container
      margin 0
      width 100%
    .exp-container
      width 60%



  .body
    width 80vw
    height 600px
    position relative
    z-index 2
    padding 24px 36px
    // padding 24px 55px
  @media screen and (max-width: 1100px)
    .body
      width 90vw
  @media screen and (max-width: 500px)
    .body
      width 100vw
    .card-container
      border-radius: 0px !important;
    .form-container
      padding: 8px 24px;
    .title-form-payment
      font-size 18px
      line-height: 22px;
    .card-image
      width 100px




  .body h2
    font-family 'Campton Bold Demo' !important

  .body h3
    color white
  .body h3
  .body h2
  .body h1
    text-align right
    font-family font
    margin 20px 0
  .body h1
    font-family 'Campton Bold Demo'
    font-weight: bold;
    color white
    font-size: 80px !important;


  @media screen and (max-width: 1023px)
    .body
      padding 0 0 !important
    .body h2
    .body h3
    .body h1
      margin 0px 0px !important
      text-align center !important
    .body h1
      font-size 64px !important
      display inline-block !important
      color black !important

  .currency-sign
    font-family 'Raleway'
    font-size: 30px

  .name-label
    height 30%
    color white
    font-weight bold
    line-height 10px
    text-transform uppercase
    font-size: 14px;
  .input-form
    outline none
    border: 0;
  .loading-container
    position relative
  .loading-process
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0c0c0cc7;
    z-index: 999;
  .loading-card
    width 200px
    padding 10px 20px
    background white
    border-radius 4px
    position absolute
    top 50%
    left 50%
    transform translateX(-50%) translateY(-50%)
  .loadingText
  .loadingIcon
    text-align center

  .input-card::-webkit-input-placeholder
    color white
    font-weight bold
    font-family Titillium Web

  .email-label
    margin 16px
    color #7b7b7b
    font-size 16px
    font-weight bold
    font-family Titillium Web
  .email-input
    margin 16px
    outline none
    background #ffffff00
    font-size 14px
    border 0
    border-bottom 1px solid black
  .email-input::-webkit-input-placeholder
    font-family Titillium Web
    font-weight bold

  .pay-btn-container
    margin 16px 0px
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
    font-weight bold
    font-family Raleway


  .close-container
    margin-bottom 20px
  .close-btn
    cursor pointer
    float right
    position relative
    top -8px
    right -16px
    z-index 9
  .close-btn i
    color white
  @media screen and (max-width: 1023px)
    .close-btn
      right 17px
  .input-saldo
    background: transparent;
    font-size: 64px;
    border: 0;
    width: 200px;
    color: #15075d;
    text-align: center;
    outline: none;
</style>
