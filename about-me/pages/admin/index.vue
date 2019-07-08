<template>
  <div></div>
</template>

<script>
  import firebase from '~/plugins/firebase.js'

export default {
  name: 'admin',
  data(){
    return {
      db: null,
    }
  },
  created() {
    const setting = {timestampsInSnapshets: true};
    this.db = firebase.firestore();
    this.db.settings(setting);
  },
  methods: {
    async getItems(collection) {
      return this.db.collection(collection)
        .orderBy('createdAt', 'asc')
        .get();
    },
    async addItem(collection, content) {
      return this.db.collection(collection).add({
        ...content,
        createdAt: new Date(),
      })
        .then((res) => {
          console.log('Add Document with ID:', res.id);
          return res.id
        })
        .catch((err) => {
          console.error('Error: Add Document', err);
          throw err;
        });
    }
  }
}
</script>

<style scoped></style>
