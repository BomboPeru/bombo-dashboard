<template>
  <div class="background">
    <toolbar/>
    <nuxt class="content"/>
    <floating-container bottom-right class="fab">
      <icon-button text="$ 0000.00"
                   icon-direction="right"
                   color="#EA504C"
                   icon="plus"/>
    </floating-container>
  </div>
</template>

<script>
  import Toolbar from '~/components/Toolbar.vue'
  import FloatingContainer from '~/components/FloatingContainer'
  import IconButton from '~/components/IconButton'

  export default {
    components: {
      Toolbar, FloatingContainer, IconButton
    }
  }
</script>

<style lang="stylus">
/*html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}*/

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}


.background
  background url(../assets/background/background_desktop.png)
  background-size cover
.content
  margin-left 0px


@media screen and (max-width: 1023px)
  .background
    background url(../assets/background/background_mobile.png)

.fab
  display block
</style>
