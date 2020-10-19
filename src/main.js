import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'


import axios from 'axios';
Vue.prototype.$axios=axios;

import filters from '@/filters'
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
})


import VueLazy from 'vue-lazyload';
Vue.use(VueLazy,{
  error:'assert/img/loading3.png',
  loading:'assert/img/loading3.png'
});

import msg from '@com/public/msg';
import hidden from '@com/public/hidden';
import dialog from '@com/public/dialog';
Vue.use(msg);
Vue.use(hidden);
Vue.use(dialog);

import BaseLoading from "@com/public/loading";
import BaseSwitch from "@com/public/switch";
import BaseDrawer from '@com/public/drawer';
import BaseBox from '@com/public/box';
import BaseTooltip from '@com/public/tooltip';
import BaseSelect from '@com/public/select';
import BaseOption from '@com/public/option';
Vue.use(BaseSwitch);
Vue.use(BaseLoading);
Vue.use(BaseDrawer);
Vue.use(BaseBox);
Vue.use(BaseTooltip);
Vue.use(BaseSelect);
Vue.use(BaseOption);


import {Icon} from "element-ui";
import {Tooltip} from "element-ui";

Vue.use(Icon);
Vue.use(Tooltip)

let vm=new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  render:h=>h(App)
});
