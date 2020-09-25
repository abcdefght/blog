import switchComponent from './Switch.vue';

switchComponent.install=Vue=>{
    Vue.component('my-switch',switchComponent);
};


/*
* 开关组件
* @example
* @param {Boolean} flag 滑块显示true或false
* @param {Any} params 需要传递的参数
* @param {String} text 开关显示的文本
* @param {Boolean} textShow 是否显示文本
* @param {Function} change 点击返回的回调函数 回调参数为flag,params分别为当前flag值和传递的参数
* <my-switch :flag='true' :param='{id:1}' @change='getCallBack' :text='开|关' :text-show='true'></my-switch>
* */
export default switchComponent;
