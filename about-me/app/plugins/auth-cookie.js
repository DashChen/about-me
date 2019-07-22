import { auth } from '@/server/fireinit'

export default context => {
  auth.addAuthTokenListener(function(idToken) {
    document.cookie =
      '__session=' + idToken + ';max-age=' + (idToken ? 3600 : 0)
  })
}
