import Vue from 'vue'
const md = require('./markdownit')

Vue.use({
  install(Vue, options) {
    Vue.prototype.$md = md
  }
})
