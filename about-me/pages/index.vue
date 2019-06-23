<template>
  <v-layout>
    <v-card v-for="(a, index) in $store.state.articles" :key="index" dark>
      <v-card-title>
        <v-flex xs12 tag="h1" class="display-1 text-xs-center">
          {{ a.data.subject }}
        </v-flex>
        <v-layout justify-center align-center row wrap>
          <v-btn disabled flat>
            <v-icon small left>calendar_today</v-icon>
            發表於{{ a.data.created_at.toString().substring(0, 10) }}
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn disabled flat>
            <v-icon small left>update</v-icon>
            更新於{{ a.data.updated_at.toString().substring(0, 10) }}
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn disabled flat>
            <v-icon small left>tab</v-icon>
            分類於{{ a.data.type }}
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn disabled flat>
            <v-icon small left>far fa-file-word</v-icon>
            字數統計{{ a.data.wordLength }}
          </v-btn>
          <v-divider vertical></v-divider>
          <v-btn disabled flat>
            <v-icon small flat>access_time</v-icon>
            閱讀時間 ≒ {{ readTime(a.data.wordLength) }}
          </v-btn>
        </v-layout>
      </v-card-title>
      <v-card-text v-html="render(a.data.bodySummary)" />
      <v-card-actions>
        <v-btn class="mx-auto" :to="a.url" nuxt>
          <v-icon>chrome_reader_mode</v-icon>
          閱讀全文
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'Index',
  methods: {
    readTime(len) {
      return Math.floor(len / 3)
    },
    render(md) {
      return this.$md.render(md)
    }
  }
}
</script>
