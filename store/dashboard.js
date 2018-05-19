
export const state = () => ({
  tabViews: ['TABLA DE POSICIONES','PARTIDOS','TUS EQUIPOS'],
  activeTabViews: 0
})

export const mutations = {
  setActiveTabView (state, index) {
    state.activeTabViews = index
  }
}

export const getters = {
  activeTabView (state) {
    return state.activeTabViews
  }
}

const dashboard = {
  namespaced: true,
  state,
  mutations,
  getters
}

export default dashboard
