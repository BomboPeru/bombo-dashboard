const dashboard = {
  namespaced: true,
  state: {
    tabViews: ['TABLA DE POSICIONES','PARTIDOS','TUS EQUIPOS'],
    activeTabViews: 0
  },
  mutations: {
    setActiveTabView (state, index) {
      state.activeTabViews = index
    }
  },
  actions: {},
  getters: {
    activeTabView (state) {
      return state.activeTabViews
    }
  }
}

export default dashboard
