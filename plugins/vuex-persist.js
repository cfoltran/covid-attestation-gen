import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'signature',
      storage: window.localStorage,
      modules: ['signature']
    }).plugin(store)
  })
}
