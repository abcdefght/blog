import Loading2 from './Loading2.vue';

Loading2.install=Vue=>{
  Vue.component(Loading2.name,Loading2);
}

/*
* 加载组件
* @example
* @param {String} con 内容，默认为’玩命加载中‘
* <Loading2 :con='加载中'/>
* */
export default Loading2;
