<template>
  <v-container>
    <v-timeline>
      <v-timeline-item
        v-for="(a, index) in $store.state.articles.articles"
        :key="index"
        color="red lighten-2"
        large
      >
        <template v-slot:opposite>
          <span>{{ a.created_at }}</span>
        </template>
        <v-card nuxt :to="go(a, index)" class="elevation-2">
          <v-card-title class="headline">{{ a.subject }}</v-card-title>
          <v-card-text v-text="a.summary" />
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
export default {
  name: 'Blog',
  methods: {
    render(md) {
      return this.$md.render(md)
    },
    go(item, index) {
      // 先確認使用到哪一個
      this.$store.commit('articles/changeState', {
        key: 'choiceIndex',
        data: index,
        index: -1
      })
      return `/blog/${item.created_at}/${item.url}`
    }
  }
}
</script>

<style scoped></style>
