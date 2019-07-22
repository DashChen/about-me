function isAdminRoute(route) {
  if (route.matched.some(record => record.path.includes('/admin'))) {
    return true
  }
}

export default function({ isServer, store, redirect, route, req }) {
  // If nuxt generate, pass this middleware
  if (isServer && !req) {
    return
  }
  if (isAdminRoute(route)) {
    store.$AUTH.onAuthStateChanged(function(user) {
      if (!user) {
        redirect('/login')
      } else {
        store.dispatch('auth/gotUser', user)
        redirect('/admin')
      }
    })
  }
}
