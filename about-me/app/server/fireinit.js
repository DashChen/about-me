import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

const config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const authProviders = {
  Email: firebase.auth.EmailAuthProvider.PROVIDER_ID,
  Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  Facebook: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  Twitter: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  Github: firebase.auth.GithubAuthProvider.PROVIDER_ID
}
export const auth = firebase.auth()
export const DB = firebase.database()
export const firestore = firebase.firestore()
export default firebase
