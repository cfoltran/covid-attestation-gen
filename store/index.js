import _ from 'lodash'
import CookieParser from 'cookieparser'
import LocalStorage from 'local-storage'

const getEmptyState = () => {
  return {
    user: null,
    token: null
  }
}

export const state = () => ({
  user: LocalStorage.get('user')
})

export const getters = {
  isAuthenticated (state) {
    return !!(state.user && Object.keys(state.user).length > 0)
  },
  user (state) {
    return state.user
  }
}

export const mutations = {
  setUser (state, user) {
    if (_.has(user, 'user')) {
      state.user = user.user
    } else {
      state.user = user
    }
    this.$cookies.set('user', state.user)
  },
  setColorMode (state, colorMode) {
    state.user.color_mode = colorMode
    this.$cookies.set('user', state.user)
  },
  deleteStore: (state) => { Object.assign(state, getEmptyState()) }
}

export const actions = {
  nuxtServerInit ({ commit }, context) {
    const { req } = context
    if (req.headers.cookie) {
      const parsed = CookieParser.parse(req.headers.cookie)
      if (parsed.user) {
        try {
          const user = JSON.parse(parsed.user)
          commit('setUser', user)
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  logout ({ commit }) {
    this.$cookies.removeAll()
    commit('deleteStore')
  }
}
