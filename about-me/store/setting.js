/**
 * 關於作者的相關資料
 * @returns {{englishName: string, mail: string, contry: string, about: string, name: string, motto: string, cellphone: string, front: {layout: string}, community: Array}}
 */
export const state = () => ({
  about: '',
  motto: '',
  name: '',
  englishName: '',
  country: '',
  email: '',
  cellphone: '',
  community: [],
  front: {
    layout: 'defualt'
  }
})

export const mutations = {
  changeState(state, key, data) {
    if (!state.hasOwnProperty(key)) {
      return false
    }
    state[key] = data
    return true
  }
}
