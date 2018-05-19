<template>
    <div id="form-alert">
      <template v-if="!onlytext">
        <div v-if="correct === true" class="container">
          <img src="../assets/icons/success_icon.png" alt="" width="24px">
        </div>
        <div v-if="correct === false" class="container">
          <img src="../assets/icons/warning_icon.png" alt="" width="24px">
          <div class="message">{{message}}</div>
        </div>
      </template>
      <template v-else>
        <div :class="['textful', !correct?'fail':'label']">
          {{ correct ? label: message }}
        </div>
      </template>
    </div>
</template>

<script>
  export default {
    name: 'alert-validation',
    props: {
      correct: Boolean,
      message: String,
      onlytext: Boolean,
      label: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="stylus">
  #form-alert
    display inline-block
    position: relative;
    top: 8px;
    left: 13px;
  .message
    display inline-block
    position: absolute
    text-align center
    min-width 150px
    top: 0px
    left: 32px

    background: #FFC400;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    padding-left 5px
    padding-right 5px

    font-family: Titillium Web;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 12px;
    color: #243237;

  .fail
    color: #fb7a39;
  .label
    font-size 12px
    color: #243337;
  .textful
    font-family: Titillium Web;
    font-weight: bold;
    /*color: #FFC400;*/
    /*font-family: Titillium Web;*/

  .label-enter-active
    transition: all .3s ease;
  .label-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  .label-enter, .label-leave-to
    transform: translateX(10px);
    opacity: 0;

</style>
