import Vue from 'vue'

import MarkdownIt from 'markdown-it'
import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItHighlightjs from '~/plugins/markdown-it/markdownItHeighlightjs'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  langPrefix: 'ht-' // 預設為 'language'
})

md.use(MarkdownItAttrs)
md.use(MarkdownItHighlightjs)

Vue.use({
  install(Vue, options) {
    Vue.prototype.$md = md
  }
})
