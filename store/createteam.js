import Cookie from 'js-cookie'

export const state = () => ({
  tabViews: ['JUGADORES','EQUIPO','FIXTURE'],
  activeTabViews: 0,
  captainId: null,
  editTeamName: null,
  playersList: [],
  rulesDialog: false,
  nextMatchesDialog: false,
  nextMatchesTeam: null
})

export const getters = {
  activeTabView (state) {
    return state.activeTabViews
  },
  editTeamName (state) {
    if (process.server) return null
    if (state.editTeamName === null) {
      state.editTeamName = localStorage.getItem('editTeamName')
      return state.editTeamName
    } else {
      return state.editTeamName
    }

  },
  leagueid (state) {
    if (process.server) return
    return localStorage.getItem('leagueIdToCreateTeam')
    // return state.leagueid
  }
}

export const mutations = {
  setActiveTabView (state, index) {
    state.activeTabViews = index
  },
  setTeamName (state, name) {
    state.editTeamName = name
    if (process.server) return
    localStorage.setItem('editTeamName', name)
    // state.leagueid = id
  },
  unsetTeamName (state) {
    state.editTeamName = null
    if (process.server) return
    localStorage.removeItem('editTeamName')
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
}

const createteam = {
  namespaced: true,
  state,
  mutations,
  getters
}

export default createteam
