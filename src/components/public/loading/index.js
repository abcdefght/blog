import BaseLoading from './base-loading.vue';

BaseLoading.install=Vue=>{
  Vue.component(BaseLoading.name,BaseLoading);
}

/*
* 加载组件
* @example
* @param {String} con 内容，默认为’玩命加载中‘
* @param {Boolean} float 浮动 此时父级容器需要设置为相对定位
* @param {Number} type 为0,1共2种加载框
* 1) <base-loading :con='加载中'></base-loading>
* 2) <base-loading :con='加载中' :float="true" :type='1'></base-loading>
* */
export default BaseLoading;
