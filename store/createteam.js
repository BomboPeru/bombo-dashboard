const createteam = {
  namespaced: true,
  state: {
    tabViews: ['JUGADORES','EQUIPO','FIXTURE'],
    activeTabViews: 0,
    captainId: null
  },
  mutations: {
    setActiveTabView (state, index) {
      state.activeTabViews = index
    },
    setleagueid (state, id) {
      if (process.server) return
      localStorage.setItem('leagueIdToCreateTeam', id)
      // state.leagueid = id
    },
    unsetleagueid (state) {
      if (process.server) return
      localStorage.removeItem('leagueIdToCreateTeam')
      // state.leagueid = id
    }
  },
  actions: {},
  getters: {
    activeTabView (state) {
      return state.activeTabViews
    },
    leagueid (state) {
      if (process.server) return
      return localStorage.getItem('leagueIdToCreateTeam')
      // return state.leagueid
    }
  }
}

export default createteam
