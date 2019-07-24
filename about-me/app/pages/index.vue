<template>
  <v-container fluid>
    <v-layout
      v-for="(a, index) in articles"
      :key="index"
      row
      justify-center
      class="mb-3"
    >
      <v-flex xs12 sm10 md8>
        <v-card dark>
          <v-card-title>
            <v-flex xs12 tag="h1" class="display-1 text-xs-center">
              {{ a.subject }}
            </v-flex>
            <v-layout justify-center align-center row wrap>
              <v-btn disabled text>
                <v-icon small left>calendar_today</v-icon>
                發表於{{ a.created_at }}
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn disabled text>
                <v-icon small left>update</v-icon>
                更新於{{ a.updated_at }}
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn disabled text>
                <v-icon small left>tab</v-icon>
                分類於{{ a.type }}
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn disabled text>
                <v-icon small left>far fa-file-word</v-icon>
                字數統計{{ wordLength(a.contents) }}
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn disabled text>
                <v-icon small text>access_time</v-icon>
                閱讀時間 ≒ {{ readTime(a.contents) }}
              </v-btn>
            </v-layout>
          </v-card-title>
          <v-card-text v-html="render(a.contents[0].content)" />
          <v-card-actions>
            <v-btn class="mx-auto" :to="go(a, index)" nuxt>
              <v-icon>chrome_reader_mode</v-icon>
              閱讀全文
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Index',
  asyncData({ store }) {
    return store.state.articles
  },
  async fetch({ store, $firestore }) {
    // 取回所有資料
    if (store.state.articles.articles.length === 0) {
      await store.dispatch('articles/getList', $firestore)
      await store.dispatch('setting/getData', $firestore)
      await store.dispatch('project/getData', $firestore)
    }
  },
  methods: {
    wordLength(contents) {
      let len = 0
      contents.forEach(function(val) {
        len += val.content
          .replace(/\s/g, '')
          .replace(/<s*[^>]*>|<\/s*[^>]*>|[#*`>\-~![\]]/g, '').length
      })
      return len
    },
    readTime(contents) {
      return Math.ceil(this.wordLength(contents) / 300)
    },
    render(md) {
      // 只取出 150 字
      md = md.slice(0, 150) + '...'
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
