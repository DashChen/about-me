function isAdminRoute(route) {
  if (route.matched.some(record => record.path === '/admin')) {
    return true
  }
}

export default function({ store, redirect, route }) {
  // eslint-disable-next-line no-unused-expressions
  store.state.user != null && route.name === 'login' ? redirect('/admin') : ''
  // eslint-disable-next-line no-unused-expressions
  store.state.user == null && isAdminRoute(route) ? redirect('/login') : ''
}
// import { auth } from '@/server/fireinit'
//
// export default function({ route, store, redirect }) {
//   auth.onAuthStateChanged(user => {
//     if (user) {
//       store.dispatch('auth/gotUser', user)
//     } else if (route.name === 'admin') redirect('/login')
//   })
// }
