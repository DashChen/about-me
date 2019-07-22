import Vue from 'vue'
import { DB, auth, firestore, authProviders } from '@/server/fireinit'

function getRef(path) {
  let ref = firestore
  path.forEach(function(val, index) {
    if (index % 2 === 1) {
      ref = ref.doc(val)
    } else {
      ref = ref.collection(val)
    }
  })
  return ref
}

const firebasePlugin = {
  install() {
    if (Vue.__nuxt_firebase_installed__) {
      return
    }
    Vue.__nuxt_firebase_installed__ = true

    if (!Vue.prototype.$DB) {
      Vue.prototype.$DB = DB
      Vue.prototype.$AUTH = auth
      Vue.prototype.$firestore = firestore
      Vue.prototype.$Providers = authProviders
      Vue.prototype.$GetFromFirestore = function(path) {
        return getRef(path.split('/'))
          .get()
          .then(function(doc) {
            if (doc.exists) {
              return doc.data()
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document')
            }
          })
          .catch(function(error) {
            console.error('Error getting document', error)
          })
      }
      /**
       * Doc 是每個集合中的唯一值，如果只有集合就是調用 add，由系統建立，透過 path 陣列長度判斷
       * @param path 透過 / 分割字串成陣列
       * @param data 要新增或更新的資料
       * @param update 使用更新
       * @returns {{errors: {detail: string, title: string}[]}}
       */
      Vue.prototype.$ChangeToFirestore = function(path, data, update) {
        path = path.split('/')
        const ref = getRef(path)
        console.log(path, ref)
        if (update) {
          if (path.length % 2 === 1) {
            console.error(
              'No design doc, See firestore update document https://firebase.google.com/docs/firestore/manage-data/add-data'
            )
          } else {
            return ref
              .update(data)
              .then(function() {
                return {}
              })
              .catch(function(error) {
                console.error('Error updating document', error)
              })
          }
        } else if (path.length % 2 === 1) {
          return ref
            .add(data)
            .then(function() {
              return { id: ref.id }
            })
            .catch(function(error) {
              console.error('Error adding document', error)
            })
        } else {
          return ref
            .set(data, { merge: true })
            .then(function() {
              return {}
            })
            .catch(function(error) {
              console.error('Error writing document', error)
            })
        }
      }
    }
  }
}

Vue.use(firebasePlugin)

export default ctx => {
  const { app, store } = ctx

  app.$firestore = Vue.prototype.$firestore
  ctx.$firestore = Vue.prototype.$firestore

  app.$AUTH = Vue.prototype.$AUTH
  ctx.$AUTH = Vue.prototype.$AUTH

  app.$DB = Vue.prototype.$DB
  ctx.$DB = Vue.prototype.$DB

  app.$Providers = Vue.prototype.$Providers
  ctx.$Providers = Vue.prototype.$Providers

  if (store) {
    store.$firestore = Vue.prototype.$firestore
    store.$AUTH = Vue.prototype.$AUTH
    store.$DB = Vue.prototype.$DB
    store.$Providers = Vue.prototype.$Providers
  }
}
