<template>
  <code-labs :contents="contents"></code-labs>
</template>

<script>
import CodeLabs from '@/components/CodeLabs'
export default {
  name: 'Slug',
  components: {
    CodeLabs
  },
  asyncData({ store }) {
    console.log(store)
    return store.state.articles.articles[store.state.articles.choiceIndex]
  }
}
</script>

<style scoped></style>
