/**
 * tagList:   combobox 標籤列表，可多選
 * typeList:  combobox 類型列表，建議單選
 * urlList:   驗證 url 是否重複
 * articles:  所有文章列表
 * choiceIndex: 被選中的文章索引值
 * @returns {{tagList: Array, typeList: Array, urlList: Array, articles: Array, choiceIndex: Number}}
 */
export const state = () => ({
  articles: [],
  typeList: [],
  tagList: [],
  urlList: [],
  choiceIndex: -1
})

export const actions = {
  async getList({ commit }, $firestore) {
    await $firestore
      .collection('articles')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          if (doc.id !== 'list') {
            commit('changeState', {
              key: 'articles',
              data: doc.data(),
              index: -1
            })
          } else {
            Object.keys(doc.data()).forEach(function(key) {
              commit('changeState', {
                key: key,
                data: doc.data()[key],
                index: -1
              })
            })
          }
        })
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })
  },
  async updateList({ dispatch, commit, state }, { index, data, vm }) {
    console.log(index, data, vm)
    commit('changeState', { key: 'articles', data: data, index: index })
    // 檢查是否新增 urlList、typeList、tagList
    if (!state.urlList.includes(data.url)) {
      commit('changeState', { key: 'urlList', data: data.url, index: -1 })
    }
    if (!state.typeList.includes(data.type)) {
      commit('changeState', { key: 'typeList', data: data.type, index: -1 })
    }
    data.tag.forEach(function(tag) {
      if (!state.tagList.includes(tag)) {
        commit('changeState', { key: 'tagList', data: tag, index: -1 })
      }
    })
    // 一次處理firebase更新，文章是新增或更新，其他是直接set
    await vm.$ChangeToFirestore(`articles/${data.url}`, data, index > -1)
    await vm.$ChangeToFirestore(
      'articles/list',
      {
        typeList: state.typeList,
        tagList: state.tagList,
        urlList: state.urlList
      },
      false
    )
  }
}

/**
 * 立即變更state內的資料，要先在送資料進來前處理好資料
 * @type {{changeState(*, *, *): void}}
 */
export const mutations = {
  changeState(state, { key, data, index }) {
    if (!Object.prototype.hasOwnProperty.call(state, key)) {
      return false
    }
    if (index > -1) {
      state[key][index] = data
    } else if (Array.isArray(state[key])) {
      state[key].push(data)
    } else {
      state[key] = data
    }
    return true
  }
}
