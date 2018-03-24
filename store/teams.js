import store from "./index"

const team = {
  namespaced: true,
  state: {
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
  },
  mutations: {
    setActiveTypeTeam (state, index) {
      state.activeTypeTeam = index
    }
  },
  actions: {
    async fetchTeams (context) {
      if (process.server) return
      const userId = localStorage.getItem('userId')
      // const token = localStorage.getItem('token')

      let response = await this.$axios.$get('api/v2.0/users/' + userId)
      //
      let teams = {}
      teams['0'] = response.data.saved_teams === null ? [] : response.data.saved_teams

      teams['1'] = response.data.playing_teams === null ? [] : response.data.playing_teams

      teams['2'] = response.data.old_teams === null ? [] : response.data.old_teams

      return teams
    }
  },
  getters: {
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
}

export default team
