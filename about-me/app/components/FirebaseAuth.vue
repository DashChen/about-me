<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
export default {
  name: 'FirebaseAuth',
  mounted() {
    const firebaseui = require('firebaseui')
    const self = this
    this.$AUTH.onAuthStateChanged(user => {
      if (!user) {
        const ui =
          firebaseui.auth.AuthUI.getInstance() ||
          new firebaseui.auth.AuthUI(self.$AUTH)

        const config = {
          signInOptions: [
            self.$Providers.Email,
            self.$Providers.Google,
            self.$Providers.Facebook
          ],
          callbacks: {
            signInSuccessWithAuthResult: authResult => {
              self.$store.dispatch('auth/gotUser', authResult.user)
              console.log(self.$store.state)
              self.$router.push('/admin')
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
