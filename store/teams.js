
export const state = () => ({
  selectLeagueDialog: false,
  selectTimeDialog: false,
  typeTeams: ['GUARDADOS', 'EN JUEGO', 'PASADOS'],
  activeTypeTeam: 0,
  indexTypeTeams: {
    0: 'guardado',
    1: 'en_juego',
    2: 'pasado'
  },
  indexAccessTypeTeams: {
    0: 'saved_teams',
    1: 'playing_teams',
    2: 'old_teams'
  },
  teamNameToMakePlay: null,
  selectedLeague: null
})

export const getters = {
  isSelectLeagueDialog (state) {
    return state.selectLeagueDialog
  },
  isSelectTimeDialog (state) {
    return state.selectTimeDialog
  },
  activeTypeTeam (state) {
    return state.activeTypeTeam
  }
}

export const mutations = {
  setActiveTypeTeam (state, index) {
    state.activeTypeTeam = index
  }
}

const team = {
  namespaced: true,
  state,
  getters,
  mutations
}

export default team
