const hljs = require('highlight.js/lib/highlight')

const xml = require('highlight.js/lib/languages/xml')
const bash = require('highlight.js/lib/languages/bash')
const css = require('highlight.js/lib/languages/css')
const scss = require('highlight.js/lib/languages/scss')
const javascript = require('highlight.js/lib/languages/javascript')
const python = require('highlight.js/lib/languages/python')
const cs = require('highlight.js/lib/languages/cs')

hljs.registerLanguage('xml', xml)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('cs', cs)

export default hljs
