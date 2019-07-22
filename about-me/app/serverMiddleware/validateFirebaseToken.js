const admin = require('firebase-admin')
const cookieParser = require('cookie-parser')()
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: `https://${
    admin.credential.applicationDefault().credential_.certificate.projectId
  }.firebaseio.com`
})

function getIdTokenFromRequest(req, res) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    console.log('Found "Authorization" header')
    // Read the ID Token from the Authorization header.
    return Promise.resolve(req.headers.authorization.split('Bearer ')[1])
  }
  return new Promise(function(resolve) {
    cookieParser(req, res, () => {
      if (req.cookies && req.cookies.__session) {
        // console.log('Found "__session" cookie')
        // Read the ID Token from cookie.
        resolve(req.cookies.__session)
      } else {
        resolve()
      }
    })
  })
}

/**
 * Returns a Promise with the Decoded ID Token and adds it to req.user.
 */
function addDecodedIdTokenToRequest(idToken, req) {
  return admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedIdToken => {
      // console.log('ID Token correctly decoded', decodedIdToken)
      req.user = decodedIdToken
    })
    .catch(error => {
      console.error('Error while verifying Firebase ID token:', error)
    })
}

module.exports = function(req, res, next) {
  getIdTokenFromRequest(req, res)
    .then(idToken => {
      if (idToken) {
        addDecodedIdTokenToRequest(idToken, req).then(() => {
          next()
        })
      } else {
        next()
      }
    })
    .catch(error => {
      console.error('Error add decode Id Token', error)
    })
}
