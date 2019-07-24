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
      { rel: "Icon.vue", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      },
      {
        rel: "stylesheet",
        href: "https://www.w3schools.com/w3css/4/w3.css"
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
  css: [
    "firebaseui/dist/firebaseui.css",
    "@fortawesome/fontawesome-free/css/all.css"
  ],

  /*
   ** Plugins to load before mounting the App
   * ssr 預設 true , false 代表只在客戶端打包
   */
  plugins: [
    "@/plugins/firebase.js",
    "@/plugins/lodash.js",
    { src: "@/plugins/markdownit", ssr: false },
    { src: "@/plugins/auth-cookie.js", ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/dotenv",
    "vue-sweetalert2/nuxt"
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

  devModules: ["@nuxtjs/vuetify"],

  vuetify: {
    /* module options */
    icons: {
      iconfont: "fa"
    }
  },

  serverMiddleware: ["@/serverMiddleware/validateFirebaseToken"],
  /*
   ** Build configuration
   */
  build: {
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
    babel: {
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
      }
    },
    publicPath: "/assets/"
  },
  generate: {
    routes: function() {
      // return files.map(getSlugs)
    }
  }
};
