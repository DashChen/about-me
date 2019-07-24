function isAdminRoute(route) {
  if (route.matched.some(record => record.path.includes('/admin'))) {
    return true
  }
}

export default function({ store, redirect, route, req }) {
  // If nuxt generate, pass this middleware
  if (process.server && !req) {
    return
  }
  if (isAdminRoute(route)) {
    if (store.$AUTH.user && !store.getters['auth/isLoggedIn']) {
      store.dispatch('auth/gotUser', store.$AUTH.user)
    } else {
      store.$AUTH.onAuthStateChanged(function(user) {
        if (!user) {
          redirect('/login')
        } else if (!store.getters['auth/isLoggedIn']) {
          store.dispatch('auth/gotUser', user)
        }
      })
    }
  }
}
