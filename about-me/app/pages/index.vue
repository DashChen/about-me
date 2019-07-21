<template>
  <div>
    <v-layout
      v-for="(a, index) in $store.state.articles.articles"
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
              <v-btn disabled flat>
                <v-icon small left>calendar_today</v-icon>
                發表於{{ a.created_at }}
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn disabled flat>
                <v-icon small left>update</v-icon>
                更新於{{ a.updated_at }}
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn disabled flat>
                <v-icon small left>tab</v-icon>
                分類於{{ a.type }}
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn disabled flat>
                <v-icon small left>far fa-file-word</v-icon>
                字數統計{{ wordLength(a.content) }}
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn disabled flat>
                <v-icon small flat>access_time</v-icon>
                閱讀時間 ≒ {{ readTime(a.content) }}
              </v-btn>
            </v-layout>
          </v-card-title>
          <v-card-text v-html="render(a.content)" />
          <v-card-actions>
            <v-btn class="mx-auto" :to="go(a, index)" nuxt>
              <v-icon>chrome_reader_mode</v-icon>
              閱讀全文
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'Index',
  async asyncData({ store, $firestore }) {
    // 取回所有資料
    if (store.state.articles.articles.length === 0) {
      await store.dispatch('articles/getList', $firestore)
      await store.dispatch('setting/getData', $firestore)
    }
    return {}
  },
  methods: {
    wordLength(content) {
      return content
        .replace(/\s/g, '')
        .replace(/<s*[^>]*>|<\/s*[^>]*>|[#*`>\-~![\]]/g, '').length
    },
    readTime(content) {
      return Math.ceil(this.wordLength(content) / 300)
    },
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
