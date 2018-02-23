const createteam = {
  namespaced: true,
  state: {
    tabViews: ['JUGADORES','LISTA','FORMACION'],
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

export default createteam
