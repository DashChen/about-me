<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md3>
        <v-card color="purple" dark>
          <v-card-title primary class="title">文章資訊</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-tile v-for="info in infos" :key="info.title">
                <v-list-tile-content>
                  <v-list-tile-title v-text="info.title"></v-list-tile-title>
                  <v-list-tile-title v-text="info.content"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
        <v-card color="purple" dark>
          <v-card-title primary class="title">文章索引</v-card-title>
        </v-card>
        <v-card color="purple" dark>
          <v-card-title primary class="title">關聯文章</v-card-title>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3>
        <v-card color="purple" dark>
          <v-card-text v-html="html"></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Slug',
  async asyncData({ params, error }) {
    const fileContent = await import(`~/articles/${params.post}.md`)
    const length = fileContent.body.replace(
      /<s*[^>]*>|<\/s*[^>]*>|[#*`>\-~![]]/g,
      ''
    ).length
    const attributes = fileContent.attributes
    return {
      infos: [
        {
          title: '標籤',
          content: attributes.tag
        },
        {
          title: '類型',
          content: attributes.type
        },
        {
          title: '長度',
          content: length + '字'
        },
        {
          title: '建議閱讀時間',
          content: Math.ceil(length / 300)
        }
      ],
      html: fileContent.html
    }
  }
}
</script>

<style scoped></style>
