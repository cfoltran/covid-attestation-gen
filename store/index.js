import CookieParser from 'cookieparser'
import CryptoJS from 'crypto-js'
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
    const dataBytes = CryptoJS.AES.decrypt(state.user.token, process.env.NUXT_CRYPTO_SECRET)
    const decryptedData = JSON.parse(dataBytes.toString(CryptoJS.enc.Utf8))
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
      console.log('here !')
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
    ls.remove('signature')
    commit('deleteStore')
  }
}
