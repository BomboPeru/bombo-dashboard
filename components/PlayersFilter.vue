<template>
    <div id="players-filter">
      <button class="btn-filter" @click="openFilterBox">
        <i class="fas fa-sliders-h"></i>
        BUSQUEDA AVANZADA
      </button>
      <div class="filter-box rounded-sm elevation" v-if="filterBox">
        <p class="title-filter">Filtrar por texto</p>
        <div class="text-filter-container">
          <input-text v-model="searchTxt" width="250px" solid prepend-icon="fa-search" placeholder="Buscar por palabra clave"/>
        </div>
        <p class="title-filter">Filtrar por posiciones</p>
        <div class="position-filter-container">
          <posicion-tag :tag="tag"
                        class="tag"
                        v-for="(tag, i) in positions"
                        :key="i+'-posicion'"
                        @toggleTag="toggleTag(tag)"/>
        </div>
        <p class="title-filter">Filtrar por rango de costo (M $)</p>
        <div class="cost-filter-container">
          <!--{{ filterCost}}-->
          <cc-slider width="100%" :min="0" :max="150" v-model="filterCost"/>
        </div>
        <div class="actions-container">
          <div class="filter-btn rounded-sm elevation" @click="initFilter">
            <span style="padding-right: 8px;">FILTRAR</span>
            <i class="fas fa-filter"></i>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import PosicionTag from '../components/PosicionTag'
  import InputText from '../components/InputText'
  import CcSlider from '../components/CcSlider'

  export default {
    name: 'filter-component',
    components: {
      PosicionTag, InputText, CcSlider
    },
    data () {
      return {
        filterBox: false,
        searchTxt: '',
        filterCost: [0, 150],
        positions: [
          { name: 'ARQ', color: '#67A6F0', enabled: true },
          { name: 'DEF', color: '#A789E8', enabled: true },
          { name: 'MED', color: '#CDE344', enabled: true },
          { name: 'DEL', color: '#FDA237', enabled: true }
        ]
      }
    },
    methods: {
      openFilterBox () {
        this.filterBox = !this.filterBox
      },
      toggleTag (tag) {
        tag.enabled = !tag.enabled
      },
      initFilter () {
      //  do something
        this.filterBox = !this.filterBox
      }
    }
  }
</script>

<style scoped lang="stylus">

  #players-filter
    display inline-block
    float right
    top 10px
    position relative
    z-index 10
  .btn-filter
    background white
    color black
    border 0
    border-radius 2px
    min-width 100px
    height 30px
    outline none
    font-weight bold
    font-family Titillium Web
  .filter-box
    position absolute
    top 38px
    left -180px
    background white
    padding 20px 20px 8px 20px
    min-width 100px
    min-height 100px
  .position-filter-container
    padding 4px 10px
    display flex
    flex-wrap wrap
  .tag
    margin 4px 4px
  .title-filter
    font-size 13px
    font-weight bold
    font-family Titillium Web
  .cost-filter-container
    padding 4px 10px
  .actions-container
    padding 20px 4px
    text-align right
  .filter-btn
    cursor pointer
    display inline-block
    width 80px
    height 30px
    text-align center
    line-height 28px
    font-size 13px
    font-weight bold
    font-family Titillium Web
    color white
    background #243337
</style>
