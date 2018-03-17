<template>
    <div id="players-filter">
      <div class="text-filter-container attach">
        <input-text v-model="searchTxt"
                    @input="listenSearchValue"
                    width="150px"
                    solid
                    prepend-icon="fa-search"
                    :placeholder="placeholderSearchbar"/>
      </div>
      <button class="btn-filter" @click="openFilterBox">
        <i class="fas fa-sliders-h"></i>
        &nbsp;FILTROS
      </button>
      <div class="filter-box rounded-sm elevation" v-if="filterBox">
        <!--<p class="title-filter">Filtrar por texto</p>-->
        <!--<div class="text-filter-container">-->
          <!--<input-text v-model="searchTxt" width="250px" solid prepend-icon="fa-search" placeholder="Buscar por palabra clave"/>-->
        <!--</div>-->
        <p class="title-filter">Buscar por</p>
        <div class="checkbox-filter-container">
          <div style="padding: 4px 0px">
            <cc-checkbox color="#25bf89" v-model="checkboxTeam"/>
            <span style="color: #464646;">Equipo</span>
          </div>
          <div style="padding: 4px 0px">
            <cc-checkbox color="#25bf89" v-model="checkboxPlayer"/>
            <span style="color: #464646;">Jugador</span>
          </div>
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
          <cc-slider width="100%" :min="0" :max="30" v-model="filterCost"/>
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
  import CcCheckbox from '../components/CcCheckbox'

  export default {
    name: 'filter-component',
    components: {
      PosicionTag, InputText, CcSlider, CcCheckbox
    },
    computed: {
      placeholderSearchbar () {
        const translation = {
          'player': 'jugadores',
          'team': 'equipos'
        }
        return 'Buscar ' + translation[this.searchBy]
      },
      checkboxTeam: {
        get () {
          return this.searchBy === 'team'
        },
        set (value) {
          // this.searchTxt = ''
          this.searchBy = value === true ? 'team' : 'player'
          this.$emit('changeSearchBy', this.searchBy)
        }
      },
      checkboxPlayer: {
        get () {
          return this.searchBy === 'player'
        },
        set (value) {
          // this.searchTxt = ''
          this.searchBy = value === true ? 'player' : 'team'
          this.$emit('changeSearchBy', this.searchBy)
        }
      }
    },
    data () {
      return {
        filterBox: false,
        searchTxt: '',
        searchBy: 'player',
        filterCost: [0, 30],
        positions: [
          { date: 'ARQ', color: '#67A6F0', enabled: false },
          { date: 'DEF', color: '#A789E8', enabled: false },
          { date: 'MED', color: '#CDE344', enabled: false },
          { date: 'DEL', color: '#FDA237', enabled: false }
        ]
      }
    },
    methods: {
      listenSearchValue (value) {
        this.$emit('searchValue', value)
      },
      openFilterBox () {
        this.filterBox = !this.filterBox
      },
      toggleTag (tag) {
        tag.enabled = !tag.enabled
      },
      initFilter () {
      //  do something
        let filterObj = {}
        filterObj['searchTxt'] = this.searchTxt
        filterObj['searchBy'] = this.searchBy
        filterObj['priceInterval'] = this.filterCost
        filterObj['allowedPositions'] = this.positions.filter(item => {
          return item.enabled === true
        }).map(item => {
          return item.date
        })
        this.$emit('changeFilter', filterObj)
        this.filterBox = !this.filterBox
      }
    }
  }
</script>

<style scoped lang="stylus">

  #players-filter
    display inline-block
    float right
    /*top 10px*/
    top 2px
    position relative
    z-index 10
    font-family: 'Raleway', sans-serif
  .btn-filter
    background #ecffea
    color #243237
    border 0
    border-top-right-radius 2px
    border-bottom-right-radius 2px
    min-width 100px
    height 30px
    outline none
    font-weight bold
    font-family: 'Raleway', sans-serif
    /*font-family Titillium Web*/
  .filter-box
    position absolute
    top 50px
    left -50px
    background white
    padding 20px 20px 8px 20px
    min-width 100px
    min-height 100px
  .checkbox-filter-container
    margin-top 10px
    margin-bottom 10px
  .checkbox-filter-container span
    position relative
    top -5px
    margin-left 4px
    font-size 13px
    font-weight bold
    /*font-family Titillium Web*/
    font-family: 'Raleway', sans-serif

  .position-filter-container
    padding 4px 10px
    display flex
    flex-wrap wrap
  .tag
    margin 4px 4px
  .attach
    display inline-block
    border-radius 0
    border-top-left-radius 4px
    border-bottom-left-radius 4px
  .title-filter
    font-size 13px
    font-weight bold
    /*font-family Titillium Web*/
    font-family: 'Raleway', sans-serif

    color #737373
    margin-top 4px
    margin-bottom 4px
  .cost-filter-container
    padding 4px 10px
  .actions-container
    padding 20px 4px
    text-align right
  .filter-btn
    cursor pointer
    display block
    /*width 80px*/
    height 40px
    text-align center
    line-height 38px
    font-size 13px
    font-weight bold
    /*font-family Titillium Web*/
    font-family: 'Raleway', sans-serif
    color white
    background #243337
</style>
