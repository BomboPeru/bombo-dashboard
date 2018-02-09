<template>
  <div>
    <toolbar/>
    <section class="container">
      <div>
        <app-logo/>
        <div>
          <card type-card="jugados"
                title="MI EQUIPO"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import Toolbar from '~/components/Toolbar.vue'
import Card from '~/components/Card.vue'

export default {
  components: {
    AppLogo, Card, Toolbar
  }
}
</script>

<style>
.container {
  margin-top: 76px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
