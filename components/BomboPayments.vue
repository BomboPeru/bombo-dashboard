<template>
    <div id="payments" v-if="isOpen">
      <dialog-container :fixed="true" @closeDialog="closeDialog">
        <div class="elevation card-container body rounded-sm">
          <div class="close-container">
            <div class="close-btn" @click="closeDialog">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <h3>Recarga tu saldo para seguir jugando en Bombo</h3>

          <div class="plans-container">
            <div :class="['plan-card', 'card-container', 'elevation', planSelected=== i?'selectedPlan':'']"
                 v-for="(plan, i) in plans"
                 :style="{background: plan.color }"
                 :key="i"
                  @click="setPlanSelected(i)">
              <div class="price-label">{{ plan.price }}</div>
              <div class="name-label">{{ plan.name }}</div>
            </div>
          </div>

          <div class="plan-selection-container">
            Plan seleccionado:
            <template v-if="planSelected !== undefined">
              {{ plans[planSelected].price }} ( {{ plans[planSelected].name.toUpperCase() }} )
            </template>
            <template v-else>
              S/ 0
            </template>
          </div>

          <form action="" method="POST" id="culqi-card-form">
            <div style="display: none">
              <label class="email-label">Correo electronico</label>
              <div>
                <input class="email-input"
                       placeholder="aaaa@aaa.com"
                       type="text" size="50"
                       data-culqi="card[email]" id="card[email]">
              </div>
            </div>
            <div class="credit-card rounded elevation">
              <div class="credit-card-brand">
                <img src="/type_cards/master_card_logo.png" style="filter: opacity(0.7);" width="50px" alt="">
              </div>
              <div>
                <input class="input-card card-number"
                       placeholder="0000 0000 0000 0000"
                       v-model="ccFormatted"
                       type="text"
                       size="20"
                       data-culqi="card[number]"
                       id="card[number]">
              </div>
              <div class="bottom-part-card">
                <div>
                  <input class="input-card cvc" placeholder="CVC"  maxlength="3" type="text" size="4" data-culqi="card[cvc]" id="card[cvc]">
                </div>
                <div>
                  <span class="expiring">
                    VENCE <br>FIN DE
                  </span>
                  <input class="input-card" placeholder="MM" type="text" maxlength="2" size="2" data-culqi="card[exp_month]" id="card[exp_month]">
                  <span style="font-weight: bold; color: #fff; font-size: 22px;"> / </span>
                  <input class="input-card" placeholder="YYYY" type="text" maxlength="4" size="4" data-culqi="card[exp_year]" id="card[exp_year]">
                </div>
              </div>
            </div>
          </form>

          <div class="pay-btn-container">
            <button class="pay-btn elevation">COMPRAR</button>
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
      closeDialog () {
        this.$emit('onCollapse', false)
      },
      setPlanSelected (i) {
        this.planSelected = i
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
      }
    },
    computed: {
      ccFormatted: {
        get () {
          return this.cardNumber
        },
        set (value) {
          let formatValue = this.ccFormat(value)
          this.cardNumber = formatValue
        }
      }
    },
    data () {
      return {
        cardNumber: undefined,
        currency_code: 'PEN',
        plans: [
          { price: 'S/ 10', amount: 10, name: 'regular', color: 'linear-gradient(-114deg, rgb(210, 105, 202) 0%, rgb(222, 127, 71) 105%)' },
          { price: 'S/ 30', amount: 30, name: 'grande', color: 'linear-gradient(-114deg, rgb(66, 158, 129) 0%, rgb(71, 138, 222) 105%)' },
          { price: 'S/ 50', amount: 50, name: 'venti', color: 'linear-gradient(-114deg, rgb(93, 66, 158) 0%, rgb(222, 71, 189) 105%)' }
        ],
        planSelected: undefined
      }
    }
  }
</script>

<style scoped lang="stylus">
  .credit-card
    padding 12px 16px
    margin 4px 10px
    background url(/type_cards/mapa.png) no-repeat center, linear-gradient(141deg, #4dafff 0%, #3d8fef 75%)
    background-size: cover;
  .body
    padding 24px 36px
  .body h3
    text-align center
    color #7b7b7b
  .plans-container
    padding 4px 4px
    margin 10px 4px
    display flex
    flex-wrap wrap
    justify-content center
    align-items: center
  .plan-card
    cursor pointer
    margin 4px 4px
    text-align center
    overflow hidden
    // -webkit-transition: width 1s ease, height 1s ease; /* For Safari 3.1 to 6.0 */
    transition: width 1s fade, height 1s fade;
  .price-label
    height 70%
    font-size: 28px;
    line-height 70px
    color white
    font-weight bold
  .selectedPlan
    width 120px
    height 120px
    // box-shadow: 0 3px 16px rgba(1, 59, 230, 0.54), 0 3px 6px rgba(25, 167, 24, 0.79)
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


  #culqi-card-form
    margin-top 18px
  .credit-card-brand
    float right
    margin-bottom 18px
  .card-number
    font-size 28px !important
    font-weight bold
  .bottom-part-card
    padding-top 36px
    display: flex;
    justify-content: space-between;
  .expiring
    font-size 10px
    color white
    display: inline-block;
    line-height 12px
    padding-right 10px
    position relative
    top 3px
    font-weight bold

  .cvc
    top: 7px;
    position: relative;
  .input-card
    outline none
    /*width: 100%;*/
    font-weight bold
    background: #ffffff00;
    border: 0;
    color: white;
    font-size 20px
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
    margin 16px 8px
  .pay-btn
    width 100%
    height 48px
    display block
    background #243337
    border-radius 8px
    border 0
    outline 0
    color white
    font-size 16px
    font-weight bold
    font-family Titillium Web
  .plan-selection-container
    padding-left 12px
    font-size 22px
    font-weight bold
    font-family Titillium Web
    color #7b7b7b
    margin 20px 0px
  .close-container
    margin-bottom 20px
  .close-btn
    cursor pointer
    float right
    position relative
    top -8px
    right -16px
</style>
