const cookieparser = process.server ? require('cookie-parser')() : undefined

export const actions = {
  nuxtServerInit({ commit }, { req, store }) {
    let auth = null
    if (req.headers.cookie) {
      try {
        auth = cookieparser.JSONCookie(req.headers.cookie)
        console.log(auth, store.state.auth)
      } catch (err) {
        // No valid cookie found
      }
    }
  }
}
