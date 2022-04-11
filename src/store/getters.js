import storage from './storage'
export default {
  isLogin: (state) => {
    // let token = state.token
    // if (token == undefined) {
    //   token = storage.get('token')
    // }
    // return token != '' && token != undefined
    return true
  }
}
