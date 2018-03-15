
const team = {
  namespaced: true,
  state: {
    selectLeagueDialog: false,
    selectTimeDialog: false,
    typeTeams: ['EN JUEGO','GUARDADOS','PASADOS'],
    activeTypeTeam: 0,
    mteams: {
      0: [],
      1: [],
      2: []
    },
    teamNameToMakePlay: null,
    selectedLeague: null
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
    },
    turnOnSelectTimeDialog(state) {
      state.selectTimeDialog = true
    },
    turnOffSelectTimeDialog (state) {
      state.selectTimeDialog = false
    }
  },
  actions: {
    async fetchUserData () {
      let response = await this.$axios.$get('http://api.bombo.pe/api/v1.0/user/' + this.testUserId)
      //
      this.mteams['0'] = response.data.playing_teams === null ? [] : response.data.playing_teams
      this.mteams['1'] = response.data.saved_teams === null ? [] : response.data.saved_teams
      this.mteams['2'] = response.data.old_teams === null ? [] : response.data.old_teams
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
