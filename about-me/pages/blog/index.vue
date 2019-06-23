<template>
  <v-timeline>
    <v-timeline-item
      v-for="(a, index) in $store.state.articles"
      :key="index"
      color="red lighten-2"
      large
    >
      <template v-slot:opposite>
        <span>{{ a.data.created_at.toString().substring(0, 10) }}</span>
      </template>
      <v-card nuxt :to="a.url" class="elevation-2">
        <v-card-title class="headline">{{ a.data.subject }}</v-card-title>
        <v-card-text v-text="a.data.summary" />
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  name: 'Blog',
  methods: {
    render(md) {
      return this.$md.render(md)
    }
  }
}
</script>

<style scoped></style>
