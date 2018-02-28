<template>
    <div id="form-alert">
      <div v-if="correct === true" class="container">
        <img src="../assets/icons/success_icon.png" alt="" width="24px">
      </div>
      <div v-if="correct === false" class="container">
        <img src="../assets/icons/warning_icon.png" alt="" width="24px">
        <div class="message">{{message}}</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'alert-validation',
    props: {
      correct: Boolean,
      message: String
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
    position: relative
    top: -6px
    left: 4px

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

</style>
