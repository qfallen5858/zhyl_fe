export default {
  updateInfo(context, payload) {
    setTimeout(() => {
      context.commit('updateInfo', payload)
    }, 2000)
  }
}
