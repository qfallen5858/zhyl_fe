import storage from '../storage'
export default {
  namespaced: true,
  state() {
    return {
      profile: {
        uid: '',
        token: '',
        userName: ''
      }
    }
  },
  mutations: {
    updateUserName(state, payload) {
      state.profile.userName = payload
    }
  },
  actions: {
    updateUserName(context, payload) {
      context.commit('updateUserName', payload)
    }
  },
  getters: {
    isLogin(state) {
      let token = state.profile.token
      if (token == undefined || token == '') {
        token = storage.get('token')
      }
      return token != '' && token != undefined
    }
  }
}
