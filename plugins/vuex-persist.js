// ~/plugins/vuex-persist.js
import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'covid',
    modules: [
      'auth'
    ]
  }).plugin(store)
}
