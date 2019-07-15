import { auth } from '@/server/fireinit'

export const state = () => ({
  status: '',
  token: localStorage.getItem('token') || '',
  username: ''
})

export const getters = {
  isLoggedIn: state => state.status === 'loggedIn'
}

export const actions = {
  gotUser({ comit }, user) {
    commit('setUser', user)
  },
  logout({ comit }) {
    auth.signOut().then(() => {
      comit('logout')
    })
  }
}

export const mutations = {
  setUser(state, user) {
    state.status = 'loggedIn'
    state.username = user.displayName
  },
  logout(state) {
    state.status = 'loggedOut'
    state.username = ''
  }
}
