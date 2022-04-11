import Socket from '../../utils/websocket'

export default {
  namespaced: true,
  state() {
    return {
      ws: null
    }
  },
  mutations: {
    connectSocket(state, { commit }) {
      state.ws = new Socket(commit)
    }
  },
  actions: {
    socketInit({ commit }) {
      commit('connectSocket', {commit})
    }
  }
}
