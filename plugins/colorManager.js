/* eslint-disable no-unused-vars */
export default ({ app, store, $vuetify, $colorMode }, inject) => {
  const initColor = () => {
    if (store.getters.isAuthenticated) {
      const colorMode = store.getters.me.color_mode
      $colorMode.preference = colorMode
      $vuetify.theme.dark = ($colorMode.value === 'dark')
    } else {
      // $colorMode.preference = 'system'
      $vuetify.theme.dark = ($colorMode.value === 'dark')
    }
  }
  const syncColor = () => {
    $vuetify.theme.dark = ($colorMode.value === 'dark')
  }
  inject('colorManager', { syncColor, initColor })
}
