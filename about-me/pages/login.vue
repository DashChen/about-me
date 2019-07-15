<template>
  <v-btn outline fab color="#4285F4" @click="googleSignIn"
    ><v-icon>fab fa-google</v-icon></v-btn
  >
</template>

<script>
export default {
  name: 'Login',
  data: function() {
    return {
      provider: null
    }
  },
  created() {
    console.log(this.$firestore)
  },
  mounted() {
    this.$AUTH().onAuthStateChanged(user => {
      console.log(user)

    })
  },
  methods: {
    googleSignIn() {
      this.$auth()
        .signInWithRedirect(new this.$AUTH.GoogleAuthProvider())
    }
  }
}
</script>

<style scoped></style>
