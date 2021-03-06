import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store/store.js'
import { routes } from './routes'
import './rules.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrash, faTimesCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([ faEdit, faTrash, faTimesCircle, faCheckCircle])

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://127.0.0.1:5000/';

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
  next()
})

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})
