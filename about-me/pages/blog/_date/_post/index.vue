<template>
  <v-container fluid grid-list-xs>
    <v-layout row wrap>
      <v-flex d-flex xs3 class="mr-2">
        <v-layout row wrap>
          <v-flex d-flex xs12>
            <v-card dark>
              <v-card-title primary class="title">文章資訊</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-tile v-for="info in infos" :key="info.title">
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ info.title }}:
                        <span class="ml-2">{{ info.content }}</span>
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12>
            <v-card dark>
              <v-card-title primary class="title">文章索引</v-card-title>
            </v-card>
          </v-flex>
          <v-flex d-flex xs12>
            <v-card dark>
              <v-card-title primary class="title">關聯文章</v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs7>
        <v-card light>
          <v-card-text v-html="render(content)"></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Slug',
  data: () => ({
    infos: []
  }),
  asyncData({ store }) {
    console.log(store)
    return store.state.articles.articles[store.state.articles.choiceIndex]
  },
  mounted() {
    this.infos = [
      {
        title: '標籤',
        content: this.tag.join('、')
      },
      {
        title: '類型',
        content: this.type
      },
      {
        title: '長度',
        content: this.wordLength(this.content) + '字'
      },
      {
        title: '建議閱讀時間',
        content: this.readTime(this.content)
      }
    ]
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
    }
  }
}
</script>

<style scoped></style>
