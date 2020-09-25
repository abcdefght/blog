import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios';
import * as all from './assets/js/filter';
import msg from './components/public/msg';
import hidden from './components/public/hidden';
import dialog from './components/public/dialog';
import loading2 from "./components/public/loading2";
import mySwitch from "./components/public/switch";
import VueLazy from 'vue-lazyload';

Vue.use(msg);
Vue.use(hidden);
Vue.use(dialog);
Vue.use(mySwitch);
Vue.use(loading2);


Object.keys(all).forEach(key=>{
  Vue.filter(key,all[key]);
})

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
