/**
 * 關於作者的相關資料
 * @returns {{englishName: string, country: string, about: string, experience: Array, community: Array, certifications: Array, abilities: Array, contests: Array, activities: Array, name: string, motto: string, cellphone: string, front: {layout: string}, communication: Array, email: string}}
 */
export const state = () => ({
  about: '',
  motto: '',
  name: '',
  englishName: '',
  country: '',
  email: '',
  cellphone: '',
  skills: [{ title: '', content: '' }],
  experiences: [{ title: '', content: '', img: '' }],
  contests: [{ title: '', content: '' }],
  activities: [{ title: '', content: '' }],
  certifications: [{ title: '', content: '', img: [] }],
  front: {
    layout: 'defualt'
  }
})

export const actions = {
  async getData({ commit }, $firestore) {
    await $firestore
      .collection('setting')
      .doc('info')
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
    await vm.$ChangeToFirestore('setting/info', data, false)
  }
}

export const mutations = {
  changeState(state, { key, data }) {
    if (!Object.prototype.hasOwnProperty.call(state, key)) {
      return false
    }
    state[key] = data
    return true
  }
}
