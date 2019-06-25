const MarkdownIt = require('markdown-it')
const MarkdownItAttrs = require('markdown-it-attrs')
const MarkdownItHighlightjs = require('./markdown-it/markdownItHeighlightjs')

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  langPrefix: 'md-' // 預設為 'language'
})

md.use(MarkdownItAttrs)
md.use(MarkdownItHighlightjs)

module.exports = md
