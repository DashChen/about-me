import Vue from 'vue'
import { DB, auth, firestore, authProviders } from '@/server/fireinit'

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
