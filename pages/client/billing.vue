<template>
  <div>
    <sidebar mode="simple"/>

    <div id="billing">
      <div class="grid-container">
        <div class="v-divider"></div>
        <div class="column-a">
          <div class="withdraw-section">
            <p class="title-a">Retirar Dinero</p>
            <div class="section-1">
              <div class="img-a">
                <img src="/payment/wallet_pic.png" alt="" width="180px">
              </div>
              <p class="info-a">Al retirar tus ganancias se descontará de tu cuenta de bombo y
                en los próximos 5 días hábiles realizaremos el depósito en tu cuenta bancaria</p>
            </div>
            <div class="amount">
              <span class="currency-sign">s/</span>{{amount}}
            </div>
            <div class="slider">
              <cc-slider width="50%"
                         color="#EA504C"
                         colorTooltip="#EA504C"
                         :min="1"
                         :max="20"
                         v-model="amount" class="cc-slider"/>
            </div>
            <div class="input-container">
              <input-text append-icon="fa-credit-card" solid big v-model="account" placeholder="Número de cuenta"/>
            </div>
            <div class="btn-container">
              <div class="btn-withdraw">RETIRAR DINERO</div>
            </div>
          </div>


        </div>
        <div class="column-b">
          <div class="billing-section">
            <p class="title-b">Historial de transferencias</p>
            <div class="table-container">
              <table class="table elevation" cellspacing="0" cellpadding="0">
                <thead class="header elevation">
                  <tr>
                    <th>Nro.</th>
                    <th>Fecha</th>
                    <th>Acción</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody class="table-body">
                  <tr v-for="(registry, i) in historial" :key="i+'-registry'" class="tr-registry">
                    <td>{{ registry.number }}</td>
                    <td> {{ registry.date }} </td>
                    <td> {{ registry.action }} </td>
                    <td> {{ registry.amount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import IconButton from '../../components/IconButton'
  import InputText from '../../components/InputText'
  import Sidebar from '~/components/Sidebar.vue'
  import CcSlider from '~/components/CcSlider'

  export default {
    layout: 'dashboard',
    name: 'billing',
    components: {
      InputText, Sidebar, CcSlider
    },
    computed: {
    },
    data () {
      return {
        account: '',
        amount: 5,
        historial: [
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' },
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' },
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' },
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' },
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' },
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' },
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' },
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' },
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' },
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' },
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' },
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' },
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' },
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' },
          { number: 0, date: '12/03/18', action: 'DEPOSITO', amount: 's/ 30.00' }
        ]
      }
    },
    methods: {}
  }
</script>

<style scoped lang="stylus">
  /*#matches*/
  /*#billing*/
  .grid-container
    width 100%
    position relative
    display grid
    grid-template-columns 50% 50%
    grid-template-rows auto

  .billing-section
  .withdraw-section
    width 100%
  .column-a
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1
    grid-row-end: 2

    width 70%
    justify-self center
    padding-top 30px
  .column-b
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1
    grid-row-end: 2

    justify-self center
    padding-top 30px
    width 70%

  .btn-withdraw
    display inline-block
    border-radius 40px
    padding 4px 20px
    height 40px
    line-height 32px
    background #EA504C
    color white
    text-align center
    font-size 14px
    font-family 'Nunito Sans'

  .input-container
  .btn-container
  .slider
    text-align center

  .btn-container
    padding-bottom 20px
  .input-container
    margin-bottom 20px

  /*.img-a*/
    /*margin-top 40px*/
    /*margin-bottom 20px*/
  .img-a
  .info-a
  .amount
    text-align center
    font-family 'Nunito Sans'
    color #747474
    font-weight: bold;

  .info-a
    font-size: 14px;

  .amount
    color #EA504C
  .title-b
  .title-a
    font-family 'Nunito Sans'
    color #747474
    text-align left
    font-weight bold
    margin-bottom 20px

  .amount
    font-size 55px
  .currency-sign
    font-size 22px
  .cc-slider
    position relative
    left 50%
    transform translateX(-50%)


  .v-divider
    position:absolute;
    left:50%;
    top:10%;
    bottom:10%;
    border-left:1px solid rgba(0, 0, 0, 0.1);

  .table
    width 100%
    font-family 'Nunito Sans'
    border-radius: 6px;
    overflow: hidden;
  .table-container
    max-height: calc(100vh - 300px);
    overflow: auto;

  .header
    background #7452FF
    color white
  .header tr
    height: 50px;
  .tr-registry
    text-align center
    color #7B7B7B
  .tr-registry td
    font-size 12px
    padding 8px 0px
  .table-body
    max-height 300px
    overflow auto

  .section-1
    display flex
    flex-wrap wrap

  .img-a
    display inline-block
  .info-a
    padding-top 50px
    width 50%

  @media screen and (max-width: 1023px)
    .info-a
      padding-top 0
      width 50%

    .grid-container
      width 100%
      display grid
      grid-template-columns 100%
      grid-template-rows auto auto

    .section-1
      justify-content: center;

    .column-a
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1
      grid-row-end: 2

      width 90%
      justify-self center
      padding-top 20px

    .column-b
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 2
      grid-row-end: 3

      width 90%
      justify-self center
      padding-top 20px

</style>
