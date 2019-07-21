<template>
  <v-container fluid grid-list-xs>
    <v-layout
      :row="$vuetify.breakpoint.mdAndUp"
      :column="$vuetify.breakpoint.smAndDown"
      wrap
    >
      <v-flex xs12 md5>
        <v-stepper v-if="$vuetify.breakpoint.smAndDown" alt-labels>
          <v-stepper-header>
            <v-stepper-step
              v-for="(item, index) in contents"
              :key="item.title"
              :step="index + 1"
              >{{ item.title }}</v-stepper-step
            >
            <v-divider
              v-for="(item, index) in contents"
              v-show="index > 0 && index < contents.length"
              :key="index"
            ></v-divider>
          </v-stepper-header>
        </v-stepper>
        <div v-else class="px-1 py-2">
          <v-card v-for="(item, index) in contents" :key="item.title">
            <v-card-title>
              <v-badge left :color="{ gray: index > nowstep - 1 }">
                <template v-slot:badge>
                  <span>{{ index + 1 }}</span>
                </template>
              </v-badge>
              <span>{{ item.title }}</span>
            </v-card-title>
          </v-card>
        </div>
      </v-flex>
      <v-flex xs12 md7>
        <v-card light>
          <v-card-text v-html="render(content)"></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout align-end justify-space-between row fill-height>
      <v-btn fab dark color="gray">
        <v-icon dark>navigate_before</v-icon>
      </v-btn>
      <v-btn fab dark color="indago">
        <v-icon dark>navigate_next</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Slug',
  data: () => {
    return {
      nowstep: 1,
      content: ''
    }
  },
  watch: {
    nowstep: {
      handler(val) {
        if (this.content.length > 0) {
          this.content = this.content[val].content
        }
      },
      immediate: true
    }
  },
  asyncData({ store }) {
    console.log(store)
    return store.state.articles.articles[store.state.articles.choiceIndex]
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
