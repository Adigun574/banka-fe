import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Routes from './routes'
import Signup from './components/Signup.vue'
import Top from './components/Top.vue'
import Login from './components/Login.vue'
import Account from './components/Account.vue'
import Allaccounts from './components/Allaccounts.vue'
import Viewaccount from './components/Viewaccount.vue'
import Landingpage from './components/Landingpage'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import feather from 'vue-icon'
import axios from 'axios'


Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(BootstrapVue)
//Vue.use(axios)
//Vue.prototype.$http = axios
Vue.use(feather, 'v-icon')
Vue.component('signup',Signup)
Vue.component('top',Top)
Vue.component('login',Login)
Vue.component('account',Account)
Vue.component('allaccounts',Allaccounts)
Vue.component('viewaccount',Viewaccount)
Vue.component('landingpage',Landingpage)

const router = new VueRouter({
  routes:Routes,
  mode:'history'
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
