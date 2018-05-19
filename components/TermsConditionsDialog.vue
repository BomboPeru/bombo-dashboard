<template>
    <div id="login-dialog" v-if="isOpen">
      <dialog-container @closeDialog="closeDialog" :fixed="false">
        <div class="container">
          <div class="terms-card elevation rounded">
            <div class="header elevation">
              {{ title }}
            </div>
            <!--<div class="line"></div>-->
            <div class="content">
              <div class="card-content">
                <p class="title-terms">TERMINOS Y CONDICIONES DE USO <br> BOMBO PERU EIRL</p>
                <p class="pharagraph-terms">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam architecto delectus deserunt eum facilis fugiat hic ipsam natus neque nesciunt quod ratione, saepe sit, sunt tempora temporibus totam veritatis?
                </p>
              </div>
            </div>

            <div class="bottom-button-container">
              <div class="button-close" @click="closeDialog">
                CERRAR
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
    name: 'login-dialog',
    components: {
      DialogContainer
    },
    props: {
      isOpen: { type: Boolean, default: false }
    },
    data () {
      return {
        title: 'TERMINOS Y CONDICIONES'
      }
    },
    methods: {
      closeDialog () {
        this.$emit('onCollapse', false)
      }
    }
  }
</script>

<style scoped lang="stylus">

  .content
    display flex
    flex-wrap wrap
    justify-content center
    align-items start
  .card-content
    width 80%
    background #fafafa
    border-radius: 10px;
    // height: 561px;
    overflow-y auto
    margin 15px 16px 18px 16px
    padding 15px 16px 18px 16px
  .container
    border-radius: 12px
    background #E8E8E8
  .terms-card
    width 500px
    overflow hidden
    font-family Titillium Web
  .header
    background: #243237;
    height 56px
    color white
    text-align: center
    line-height 56px
    font-weight: 600;
    font-size: 18px;
    position: relative;
  .line
    widows: 100%;
    height 10px
    background: #25BF89;
  .pharagraph-terms
  .title-terms
    color black
    font-family: Titillium Web;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
  .title-terms
    text-align: center;
    font-size: 18px;
    margin-bottom 12px
  .pharagraph-terms
    line-height: 14px;
    font-size: 12px;
    text-align: justify;

  .bottom-button-container
    display flex
    justify-content flex-end
    padding-left 50px
    padding-right 50px
    padding-bottom 9px
    text-transform uppercase

    line-height: normal;
    font-size: 14px;
    text-align: center;
    color: #FAFAFA;
  .button-close
    background: #25BF89;
    border-radius: 12px;
    padding 4px 28px 4px 28px
    cursor pointer

  @media screen and (max-width: 1023px)
    .terms-card
      width 90%

</style>
