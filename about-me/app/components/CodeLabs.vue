<template>
  <v-container fluid fill-height>
    <v-layout row fill-height wrap>
      <v-flex xs12 md3>
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
          <v-card
            v-for="(item, index) in contents"
            :key="item.title"
            class="mb-2"
            @click="nowstep = index + 1"
          >
            <v-card-title>
              <span
                class="w3-badge mr-1"
                :class="{
                  'grey darken-2': index >= nowstep,
                  'blue darken-2': index < nowstep
                }"
              >
                {{ index + 1 }}
              </span>
              <span>{{ item.title }}</span>
            </v-card-title>
          </v-card>
        </div>
      </v-flex>
      <v-flex id="main" xs12 md9>
        <v-card light class="mx-4 mb-5">
          <v-card-text v-html="render(content)"></v-card-text>
        </v-card>
        <div class="fixed-bottom">
          <div id="fabs">
            <v-btn fab color="white">
              <v-icon dark color="black">navigate_before</v-icon>
            </v-btn>
            <v-btn fab color="primary" class="ml-auto">
              <v-icon dark>navigate_next</v-icon>
            </v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'CodeLabs',
  props: {
    contents: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data: () => {
    return {
      nowstep: 1,
      content: ''
    }
  },
  watch: {
    nowstep: {
      handler(val) {
        if (this.contents.length > 0) {
          this.content = this.contents[val - 1].content
        }
      },
      immediate: true
    }
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

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
}
div.fixed-bottom {
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0;
  flex-direction: column;
  z-index: 1001;
}
#fabs {
  display: flex;
  flex-grow: 1;
  max-width: 1025px;
  width: 100%;
  margin: 0 auto;
}
</style>
