import Vue from 'vue'

Vue.prototype.$ConnectFirestore = function(path) {
  let ref = Vue.prototype.$firestore
  path.forEach(function(val, index) {
    if (index % 2 === 1) {
      ref = ref.doc(val)
    } else {
      ref = ref.collection(val)
    }
  })
  return ref
}

Vue.prototype.$GetFromFirestore = function(path) {
  let title = 'No firestore connect'
  let detail = ''
  if (Vue.prototype.$firestore) {
    path = path.split('/')
    const ref = Vue.prototype.$ConnectFirestore(path)
    ref
      .get()
      .then(function(doc) {
        if (doc.exists) {
          return doc.data()
        } else {
          // doc.data() will be undefined in this case
          title = 'No such document'
        }
      })
      .catch(function(error) {
        title = 'Error getting document'
        detail = error
      })
  }
  return {
    errors: [
      {
        title: title,
        detail: detail
      }
    ]
  }
}
/**
 * Doc 是每個集合中的唯一值，如果只有集合就是調用 add，由系統建立，透過 path 陣列長度判斷
 * @param path 透過 / 分割字串成陣列
 * @param data 要新增或更新的資料
 * @param update 使用更新
 * @returns {{errors: {detail: string, title: string}[]}}
 */
Vue.prototype.$ChangeToFirestore = function(path, data, update) {
  let title = 'No firestore connect'
  let detail = ''
  if (Vue.prototype.$firestore) {
    path = path.split('/')
    const ref = Vue.prototype.$ConnectFirestore(path)
    if (update) {
      if (path.length % 2 === 0) {
        title = 'No design doc'
        detail =
          'See firestore update document https://firebase.google.com/docs/firestore/manage-data/add-data'
      } else {
        ref
          .update(data)
          .then(function() {
            return {}
          })
          .catch(function(error) {
            title = 'Error updating document'
            detail = error
          })
      }
    } else if (path.length % 2 === 0) {
      ref
        .add(data)
        .then(function() {
          return { id: ref.id }
        })
        .catch(function(error) {
          title = 'Error adding document'
          detail = error
        })
    } else {
      ref
        .set(data, { merge: true })
        .then(function() {
          return {}
        })
        .catch(function(error) {
          title = 'Error writing document'
          detail = error
        })
    }
  }
  return {
    errors: [
      {
        title: title,
        detail: detail
      }
    ]
  }
}
