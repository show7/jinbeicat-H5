import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import serviceAjax from '../static/js/serviceAjax'
Vue.use(serviceAjax)
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial)
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
Vue.use(YDUI)

import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {locale: 'zh', color:"red"}) //可以设置语言，支持中文和英文
// import validator from 'vue-validator'
// Vue.use(validator)
 // import VueAwesomeSwiper from 'vue-awesome-swiper'
// Vue.use(VueAwesomeSwiper) //* 记得不要忘记这句 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      transitionName: 'slide'
    }
  },
  router,
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.substring(0, to.path.length - 2).split('/').length
      const fromDepth = from.path.substring(0, from.path.length - 2).split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide_back' : 'slide'
    }
  }
})
