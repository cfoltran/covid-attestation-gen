const ALERT_SUCCESS = 'ALERT_SUCCESS'
const ALERT_ERROR = 'ALERT_ERROR'
const ALERT_OPEN = 'ALERT_OPEN'
const ALERT_CLOSE = 'ALERT_CLOSE'
const DEFAULT_MESSAGE =
  {
    fr: {
      'unhandled-exception': 'Une erreur inattendue est survenue.'
    },
    en: {
      'unhandled-exception': 'Woops! An unhandled error occured.'
    }
  }

export const state = () => ({
  is_open: false,
  color: 'success',
  message: '',
  violations: []
})

export const mutations = {
  ALERT_SUCCESS (state, message) {
    state.color = 'success'
    state.message = message
  },
  ALERT_ERROR (state, message = false) {
    state.color = 'error'
    if (!message) {
      message = DEFAULT_MESSAGE[this.$i18n.locale]['unhandled-exception']
    }
    state.message = message
  },
  ALERT_RESET_VIOLATIONS_ERROR (state) {
    state.violations = state.violations.slice()
  },
  ALERT_OPEN (state) {
    state.is_open = true
  },
  ALERT_CLOSE (state) {
    state.is_open = false
  }
}

export const actions = {
  error ({ commit, rootState }, error) {
    commit(ALERT_ERROR, error.message)
    commit(ALERT_OPEN)
    setTimeout(() => { commit(ALERT_CLOSE) }, 2000)
  },
  success ({ commit }, message) {
    commit(ALERT_SUCCESS, message)
    commit(ALERT_OPEN)
    setTimeout(() => { commit(ALERT_CLOSE) }, 5000)
  }
}
