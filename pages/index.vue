<template>
  <div>
    <section class="container">
      <div>
        <div>
          <card type-card="jugados"
                title="MI EQUIPO"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Toolbar from '~/components/Toolbar.vue'
import Sidebar from '~/components/Sidebar.vue'
import Card from '~/components/Card.vue'

export default {
  layout: 'dashboard',
  components: {
    Card, Toolbar, Sidebar
  }
}
</script>

<style lang="stylus">

.container {
  min-height: calc(100vh - 128px);
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
