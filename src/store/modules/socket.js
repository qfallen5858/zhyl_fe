import Socket from '../../utils/websocket'
import SocketAction from '../../utils/socketAction'
export default {
  namespaced: true,
  state() {
    return {
      ws: null,
      msg: ''
    }
  },
  mutations: {
    connectSocket(state, { commit }) {
      state.ws = new Socket(commit, 'receive')
    },
    receive(state, payload) {
      state.msg = payload
    }
  },
  actions: {
    socketInit({ commit }) {
      commit('connectSocket', { commit })
    }
  }
}
