export const state = () => ({ projects: [] })

export const actions = {
  async getData({ commit }, $firestore) {
    await $firestore
      .collection('project')
      .doc('projects')
      .get()
      .then(function(doc) {
        Object.keys(doc.data()).forEach(function(key) {
          commit('changeState', { key: key, data: doc.data()[key] })
        })
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })
  },
  async setData({ commit }, { data, vm }) {
    Object.keys(data).forEach(function(key) {
      commit('changeState', { key: key, data: data[key] })
    })
    await vm.$ChangeToFirestore('project/projects', data, false)
  }
}

export const mutations = {
  changeState(state, { key, data }) {
    if (!state.hasOwnProperty(key)) {
      return false
    }
    state[key] = data
    return true
  }
}
