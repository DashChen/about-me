const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
const pkg = require("./package");

// glob is a small module to read 'globs', useful to get
// a filtered file list
// const glob = require('glob')

// we acquire an array containing the filenames
// in the articles directory
// const files = glob.sync('**/*.md', { cwd: 'articles' })

// We define a function to trim the '.md' from the filename
// and return the correct path.
// This function will be used later
// function getSlugs(post, _) {
//   const slug = post.substr(0, post.lastIndexOf('.'))
//   return `/blog/${slug}`
// }

module.exports = {
  srcDir: "app",
  mode: "universal",
  /*
   * Build configuration
   */
  env: {
    APIKEY: process.env.APIKEY,
    AUTHDOMAIN: process.env.AUTHDOMAIN,
    DATABASEURL: process.env.DATABASEURL,
    PROJECTID: process.env.PROJECTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
    APPID: process.env.APPID
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.styl", "firebaseui/dist/firebaseui.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/vuetify",
    "@/plugins/markdownit",
    "@/plugins/firebase.js",
    "@/plugins/firestore.js",
    "@/plugins/lodash.js"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/dotenv"
  ],
  router: {
    middleware: "router-auth"
  },
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
    transpile: ["vuetify/lib"],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
      config.module.rules.push({
        test: /\.md$/,
        // https://www.npmjs.com/package/frontmatter-markdown-loader
        loader: "frontmatter-markdown-loader",
        options: {
          vue: true
        }
      });
    },
    presets({ isServer }) {
      return [
        [
          require.resolve("@nuxt/babel-preset-app"),
          {
            buildTarget: isServer ? "server" : "client",
            corejs: { version: 3 }
          }
        ]
      ];
    },
    publicPath: "/assets/"
  },
  generate: {
    routes: function() {
      // return files.map(getSlugs)
    }
  }
};
