
const team = {
  namespaced: true,
  state: {
    selectLeagueDialog: false,
    typeTeams: ['EN JUEGO','GUARDADOS','PASADOS'],
    activeTypeTeam: 0
  },
  mutations: {
    setActiveTypeTeam (state, index) {
      state.activeTypeTeam = index
    },
    turnOnSelectLeageDialog (state) {
      state.selectLeagueDialog = true
    },
    turnOffSelectLeageDialog (state) {
      state.selectLeagueDialog = false
    }
  },
  actions: {},
  getters: {
    isSelectLeagueDialog (state) {
      return state.selectLeagueDialog
    },
    activeTypeTeam (state) {
      return state.activeTypeTeam
    }
  }
}

export default team
