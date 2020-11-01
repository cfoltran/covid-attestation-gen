import CookieParser from 'cookieparser'
import StringCrypto from 'string-crypto'
import ls from 'local-storage'

const getEmptyState = () => {
  return {
    user: null
  }
}

export const state = () => {
  return { user: null }
}

export const getters = {
  isAuthenticated (state) {
    return !!(state.user && Object.keys(state.user).length > 0)
  },
  signature (state) {
    return ls.get('signature')
  },
  user (state) {
    if (!state.user) { return }
    const { decryptString } = new StringCrypto()
    const tokenData = decryptString(state.user.token, process.env.NUXT_CRYPTO_SECRET)
    const decryptedData = JSON.parse(tokenData)
    const user = {
      ...decryptedData,
      hash: state.user.hash,
      signature: state.user.signature,
      birthdate: state.user.birthdate
    }
    return user
  }
}

export const mutations = {
  setSignature (state, signature) {
    ls.set('signature', JSON.stringify(signature))
  },
  setUser (state, user) {
    state.user = user
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
  async logout ({ commit, state }) {
    if (state.user) {
      await this.$axios.delete(`deleteFolderUuid/${state.user.hash}`)
    }
    this.$cookies.removeAll()
    ls.remove('signature')
    commit('deleteStore')
  }
}
