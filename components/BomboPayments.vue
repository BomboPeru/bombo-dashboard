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

              <!--<div class="loading-process" v-if="isLoading">-->
                <!--<div class="loading-card elevation">-->
                  <!--<div class="loadingIcon">-->
                    <!--<i class="fas fa-circle-notch fa-spin"></i>-->
                  <!--</div>-->
                  <!--<div class="loadingText">-->
                    <!--<p>Estamos procesando su compra, espere por favor.</p>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->

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
                      <the-mask type="text"
                             class="card-number"
                             placeholder="0000-0000-0000-0000"
                             :mask="['####-####-####-####']"
                             v-model="creditInfo.card_number"/>
                    </div>

                    <div class="exp-cvc-container">
                      <div class="exp-container">
                        <div class="exp-cvc-label">Fecha de expiración</div>
                        <the-mask class="month" placeholder="MM" type="text"
                                  :mask="['##']"
                                  v-model="creditInfo.expiration_month"/>
                        <the-mask class="year"
                                  placeholder="YYYY"
                                  type="text"
                                  :mask="['####']"
                                  v-model="creditInfo.expiration_year"/>
                      </div>
                      <div class="cvc-container">
                        <div class="exp-cvc-label">CVV/CVC</div>
                        <the-mask class="cvv"
                                  placeholder="CVC" type="text"
                                  :mask="['###']"
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
      </dialog-container>
    </div>
</template>

<script>
  import DialogContainer from './DialogContainer'
  import { TheMask } from 'vue-the-mask'

  export default {
    name: 'bombo-payments',
    components: { DialogContainer, TheMask },
    props: {
      isOpen: { type: Boolean, default: false }
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
      },
      planSelected: {
        get () {
          return this.$store.state.payment.planSelected
        },
        set (value) {
          this.$store.state.payment.planSelected = value
        }
      },
      payButtonEnabled () { return this.$store.state.payment.payButtonEnabled },
      payButtonText () { return this.$store.state.payment.payButtonText },
      creditInfo () { return this.$store.state.payment.creditInfo }
    },
    data () {
      return {}
    },
    methods: {
      nextPlan () {
        this.$store.commit('payment/nextPlan')
      },
      prevPlan () {
        this.$store.commit('payment/prevPlan')
      },
      closeDialog () {
        this.$emit('onCollapse', false)
      },
      pay () {
        this.$store.dispatch('payment/pay')
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
    border-radius: 4px !important;

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
    font-weight 500
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
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;

  .prev-btn
    color black
    position absolute
    top 50%
    left 20px
    transform translateY(-50%)
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;


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
    font-weight: 500;

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
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;



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
    font-weight 500
    font-family Raleway

    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;



  .close-container
    margin-bottom 20px
  .close-btn
    cursor pointer
    float right
    position relative
    top 3px
    right -16px
    z-index 9

    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;

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
