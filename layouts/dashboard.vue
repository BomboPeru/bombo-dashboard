<template>
  <div class="background">
    <toolbar/>
    <sidebar/>
    <nuxt class="content"/>
  </div>
</template>

<script>
  import Toolbar from '~/components/Toolbar.vue'
  import Sidebar from '~/components/Sidebar.vue'

  export default {
    components: {
      Toolbar, Sidebar
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
  background url(../assets/background/background_mobile.png)
  background-size cover
.content
  margin-left 232px
</style>
