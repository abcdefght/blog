import Vue from 'vue';
import Vuex from 'vuex';
import search from './module/search';
import login from './module/login';


Vue.use(Vuex);

const store=new Vuex.Store({
  modules:{
    search,
    login,
  }
});

export default store;
