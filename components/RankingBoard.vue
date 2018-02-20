<template>
    <div id="ranking-board" class="elevation rounded ranking-card">
      <div class="tabs">
        <div :class="['tab', i === activeTab?'active-tab':'']" v-for="(item, i) in tabs"
             :key="i+'-ranking-tab'" @click="selectTab(i)">
          {{ item.name }}
        </div>
      </div>
      <div class="header-table">
        <table>
          <thead>
            <tr>
              <th v-for="(item, i) in headers"
                  :key="i+'-ranking-header'"
                  class="header-item">
                {{ item }}
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="content-table">
        <ranking-row-card class="ranking-row-card"
                          v-for="(item, i) in ranking"
                          :key="i+'-ranking-user'"
                          :user="item"/>
      </div>
    </div>
</template>

<script>
  import RankingRowCard from './RankingRowCard'

  export default {
    name: 'ranking-board',
    components: {
      RankingRowCard
    },
    data () {
      return {
        activeTab: 0,
        tabs: [
          { id: 1, name: 'Champions', img: '' },
          { id: 2, name: 'Premier League', img: '' }
        ],
        headers: [
          'LUGAR',
          'USUARIO',
          'NOMBRE DE EQUIPO',
          'PUNTAJE'
        ],
        ranking: [
          { username: 'Maxlrsdadasd asd asdasdadasdasdasdas', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barsdsdsdsdsdsdsdsdsds dsdsdsds sddsdsdsdsza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' },
          { username: 'Maxlr', position: '1', teamName: 'Barza', score: '6700' }
        ]
      }
    },
    methods: {
      selectTab(i) {
        this.activeTab = i
      }
    }
  }
</script>

<style scoped lang="stylus">

  #ranking-board
    width 100%
  .ranking-card
    background #fafafa
    min-height 50px
    border-radius: 12px
    overflow: hidden;
  .tabs
    display flex
    height 60px
  .tabs:last-child
    border-radius: 0px 10px 0px 0px;

  .tab
    font-family Titillium Web
    font-weight bold
    flex-grow 1
    padding 5px
    background #E2E2E2
    text-align center
    height 100%
    line-height 50px
    box-shadow: inset 1px 0px 4px rgba(0, 0, 0, 0.25)
  .active-tab
    background #fafafa
  .header-table
    padding-left 8px
    padding-right 10px
  .header-table table
    width 100%
  .header-item
    font-size 12px
    color: #445F69;
    font-family Titillium Web
    font-weight bold
  .content-table
    padding-left 8px
    padding-right 10px
    height calc(100vh - 300px)
    overflow-y auto


</style>
