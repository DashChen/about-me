const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

// glob is a small module to read 'globs', useful to get
// a filtered file list
const glob = require('glob')

const MarkdownIt = require('markdown-it')
// https://www.npmjs.com/package/markdown-it-attrs
const MarkdownItAttrs = require('markdown-it-attrs')

// https://highlightjs.org/
const MarkdownItHighlightjs = require('./plugins/markdown-it/markdownItHeighlightjs')

// we acquire an array containing the filenames
// in the articles directory
const files = glob.sync('**/*.md', { cwd: 'articles' })

const pkg = require('./package')
// We define a function to trim the '.md' from the filename
// and return the correct path.
// This function will be used later
function getSlugs(post, _) {
  const slug = post.substr(0, post.lastIndexOf('.'))
  return `/blog/${slug}`
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  langPrefix: 'ht-' // 預設為 'language'
})
// 可以使用 classes, identifiers and attributes 用 {.class #identifier attr=value attr2="spaced value"}
md.use(MarkdownItAttrs)
// code 部分可以高亮顯示，有支持自訂的語言
md.use(MarkdownItHighlightjs)

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify', '@/plugins/markdown-it'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules.push({
        test: /\.md$/,
        // https://www.npmjs.com/package/frontmatter-markdown-loader
        loader: 'frontmatter-markdown-loader',
        options: {
          vue: true,
          markdown: body => {
            return md.render(body)
          }
        }
      })
    }
  },
  generate: {
    routes: function() {
      return files.map(getSlugs)
    }
  }
}
