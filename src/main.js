import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios';
import * as all from './assets/js/filter';
import Msg from './components/public/msg';
import hidden from './components/public/hidden';
import loading from './components/public/loading/index'
import VueLazy from 'vue-lazyload';


Vue.use(Msg);
Vue.use(hidden);
Vue.prototype.$msg=Msg;
Vue.prototype.$hidden=hidden;
Vue.prototype.$loading=loading;

// 定义全局过滤器
Object.keys(all).forEach(key=>{
  Vue.filter(key,all[key]);
});


Vue.prototype.$axios=axios;


Vue.use(VueLazy,{
  error:'static/img/loading2.jpg',
  loading:'static/img/loading2.jpg'
});


let vm=new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  render:h=>h(App)
});
