import { auth } from '@/server/fireinit'

let token = ''
if (process.browser) {
  token = localStorage.getItem('token')
}

export const state = () => ({
  status: '',
  token: token,
  username: '',
  email: ''
})

export const getters = {
  isLoggedIn: state => state.status === 'loggedIn'
}

export const actions = {
  gotUser({ commit }, user) {
    commit('setUser', user)
  },
  logout({ commit }) {
    auth.signOut().then(() => {
      commit('logout')
    })
  }
}

export const mutations = {
  setUser(state, user) {
    state.status = 'loggedIn'
    state.username = user.displayName
    state.email = user.email
    state.token = user.refreshToken
    if (process.browser) {
      localStorage.setItem('token', user.refreshToken)
    }
  },
  logout(state) {
    state.status = 'loggedOut'
    state.username = ''
    state.email = ''
    state.token = ''
    if (process.browser) {
      localStorage.setItem('token', '')
    }
  }
}
