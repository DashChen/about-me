import Vue from 'vue'
import md from './markdownit'

Vue.use({
  install(Vue, options) {
    Vue.prototype.$md = md
  }
})
