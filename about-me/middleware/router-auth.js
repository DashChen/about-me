function isAdminRoute(route) {
  if (route.matched.some(record => record.path.includes('/admin'))) {
    return true
  }
}

export default function({ isServer, store, redirect, route, req, $AUTH }) {
  // If nuxt generate, pass this middleware
  if (isServer && !req) {
    return
  }
  if (isAdminRoute(route)) {
    console.log(store.state.auth)
    // if (store.state.auth.status !== 'loggedIn') redirect('/login')
  }
}
