<template>
  <div></div>
</template>

<script>
export default {
  name: 'date',
  asyncData({ error }) {
    error({ statusCode: 404, message: 'Post not found' })
  }
}
</script>

<style scoped></style>
