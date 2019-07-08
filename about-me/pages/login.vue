<template>
  <v-btn outline fab color="#4285F4" @click="googleSignIn">
    <v-icon>fab fa-google</v-icon>
  </v-btn>
</template>

<script>
import firebase from '~/plugins/firebase.js'

export default {
  name: 'Login',
  data() {
    return {
      provider: null
    }
  },
  methods: {
    googleSignIn() {
      this.provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(this.provider)
        .then(result => {
          // store the user ore wathever
          this.$router.push('/home')
        })
        .catch(e => {
          this.$snotify.error(e.message)
          console.log(e)
        })
    }
  }
}
</script>

<style scoped></style>
