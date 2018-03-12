const createteam = {
  namespaced: true,
  state: {
    tabViews: ['JUGADORES','EQUIPO','FIXTURE'],
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
