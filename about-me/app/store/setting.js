/**
 * 關於作者的相關資料
 * @returns {{englishName: string, country: string, about: string, experience: Array, community: Array, certifications: Array, abilities: Array, contests: Array, activities: Array, name: string, motto: string, cellphone: string, front: {layout: string}, communication: Array, email: string}}
 */
export const state = () => ({
  about: `
        \n2016年12月從海軍司令部少校退伍，期間經歷學習過投資匯市、自寫過交易程式(MT4)，直到2017年10月才正式踏入軟體業大門。
        \n透過自學完成C#、PHP、Python等語言，使用過Unity寫Hololens;Visual studio 2017 寫 WPF、Service、WCF、Opencv 人臉偵測;
        \nPhp-laravel、yii2，javascript Vue framework，npm package 等，都有相關專案作品可以呈現。
        <br/>我會去主動與團隊溝通、持續學習新知並持續貢獻所學的人，因為我希望團隊是不斷進步的。
        <br/>我相信在每天有限的時間內，團隊的合作與共享，才能讓企業持續發展與強大。
        <br/>『踏實向前一步，勝過空話百千』，每天都是全新的自己，學習是讓自己更大，才能跟上世界齒輪的轉動，我持續的勉勵自己，我能為科技獻一份力。
      `,
  motto: '為明日科技獻一份力',
  name: '民凰',
  photo: {
    src: '/dash.jpg',
    name: 'dash.jpg'
  },
  englishName: 'Dash Chen',
  country: 'Taiwan',
  email: '',
  cellphone: '',
  communities: [
    {
      icon: 'fab fa-facebook-square',
      href: ''
    },
    {
      icon: 'fab fa-linkedin',
      href: ''
    },
    {
      icon: 'fab fa-line',
      href: ''
    },
    {
      icon: 'fab fa-github-square',
      href: ''
    }
  ],
  skills: [{ title: '', content: ['??'] }],
  experiences: [
    {
      title: '',
      content: '',
      img: {
        src: '',
        name: ''
      }
    }
  ],
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
