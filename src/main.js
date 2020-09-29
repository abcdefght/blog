import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios';
import * as all from './assets/js/filter';
import msg from './components/public/msg';
import hidden from './components/public/hidden';
import dialog from './components/public/dialog';
import BaseLoading from "./components/public/loading";
import BaseSwitch from "./components/public/switch";
import BaseDrawer from './components/public/drawer'
import VueLazy from 'vue-lazyload';

Vue.use(msg);
Vue.use(hidden);
Vue.use(dialog);
Vue.use(BaseSwitch);
Vue.use(BaseLoading);
Vue.use(BaseDrawer)


Object.keys(all).forEach(key=>{
  Vue.filter(key,all[key]);
})

Vue.prototype.$axios=axios;

Vue.use(VueLazy,{
  error:'static/img/loading.jpg',
  loading:'static/img/loading.jpg'
});


let vm=new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  render:h=>h(App)
});
