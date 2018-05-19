<template>
    <div id="not-found">
      <div class="container">
        <div class="big-title">
          {{ code  }}
        </div>
        <div class="icon">
          <nuxt-link to="/">
            <i class="fas fa-futbol fa-4x"></i>
          </nuxt-link>
        </div>
        <div class="title">
          <span v-if="code === 404">Parece que te perdiste!</span>
          <span v-else>{{ message }}</span>
        </div>
        <div class="title2">
          Regresa haciendo click al <span class="ball-text"><nuxt-link to="/">balón</nuxt-link></span>.
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    props: ['error'],
    computed: {
      code () {
        if (this.error.statusCode === undefined) return 0
        return this.error.statusCode
      },
      message () {
        if (this.error.message === undefined) return ''
        return this.error.message
      }
    },
    mounted () {
      console.log(this.error)
    }
  }
</script>

<style scoped lang="stylus">
  #not-found
    background #fafafa
    z-index 9999
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background url(/404.jpg) no-repeat center
    background-size cover

  .title
  .title2
  .big-title
    font-family Titillium Web
    font-weight bold
    text-align center
  .icon
    text-align center
  .icon i
    font-size 136px
    color: #1ce09b
  .big-title
    color: #1ce09b
    font-size 200px
  .title
    font-size 36px
    margin-top 40px
  .title2
    font-size 22px
  .title2
  .title
    color #1ce09b
  .ball-text a
    color white
    text-decoration none
  @media screen and (max-width: 500px)
    .big-title
      font-size 100px
    .title
      font-size 18px
      margin-top 20px
    .title2
      font-size 14px

</style>
