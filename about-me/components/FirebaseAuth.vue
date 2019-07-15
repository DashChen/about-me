<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import { auth, authProviders } from '@/server/fireinit'
import firebaseui from 'firebaseui'
export default {
  name: 'FirebaseAuth',
  mounted() {
    auth.onAuthStateChanged(user => {
      if (!user) {
        const ui =
          firebaseui.auth.AuthUI.getInstance() ||
          new firebaseui.auth.AuthUI(auth)

        const config = {
          signInOptions: [
            authProviders.Email,
            authProviders.Google,
            authProviders.Facebook
          ],
          callbacks: {
            signInSuccessWithAuthResult: authResult => {
              console.log(authResult)
              return false
            }
          },
          signInSuccessUrl: '/admin',
          signInFlow: 'popup'
        }

        ui.start('#firebaseui-auth-container', config)
      }
    })
  }
}
</script>

<style scoped></style>
