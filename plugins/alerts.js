/* eslint-disable no-unused-vars */
export default ({ app, store }, inject) => {
  inject('alerts', {
    close () {
      store.commit('alerts/ALERT_CLOSE')
    },
    error (error) {
      store.dispatch('alerts/error', error)
    },
    success (message) {
      store.dispatch('alerts/success', message)
    }
  })
}
