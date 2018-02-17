<template>
  <div id="index">
    <section class="container">
      <div>
        <!--<card type-card="jugados"-->
        <!--title="MI EQUIPO"/>-->
      </div>
    </section>
  </div>
</template>

<script>
  import Toolbar from '~/components/Toolbar'
  import Sidebar from '~/components/Sidebar'
  import FloatingContainer from '~/components/FloatingContainer'
  import IconButton from '~/components/IconButton'

  export default {
    layout: 'dashboard',
    components: {
      Toolbar, Sidebar, FloatingContainer, IconButton
    }
  }
</script>

<style lang="stylus">

  #index
    min-height: calc(100vh - 128px)

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 1023px)
    .fab
      display none
</style>
