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
  css: ["~/assets/style/app.styl", "firebaseui/dist/firebaseui.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/vuetify", // ssr 預設 true , false 代表只在客戶端打包
    "@/plugins/firebase.js",
    { src: "@/plugins/markdownit", ssr: false },
    { src: "@/plugins/lodash.js", ssr: false },
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
  serverMiddleware: ["@/serverMiddleware/validateFirebaseToken"],
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
      const sassResourcesLoader = {
        loader: "sass-resources-loader"
      }
      // 遍历nuxt定义的loader配置，向里面添加新的配置。
      config.module.rules.forEach(rule => {
        if (rule.test.toString() === "/\\.vue$/") {
          rule.options.loaders.sass.push(sassResourcesLoader)
          rule.options.loaders.scss.push(sassResourcesLoader);
        }
        if (["/\\.sass$/", "/\\.scss$/"].indexOf(rule.test.toString()) !== -1) {
          rule.use.push(sassResourcesLoader);
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
