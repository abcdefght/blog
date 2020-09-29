import BaseSwitch from './base-switch.vue';

BaseSwitch.install=Vue=>{
    Vue.component(BaseSwitch.name,BaseSwitch);
};


/*
* 开关组件
* @example
* @param {Boolean} flag 滑块显示true或false
* @param {Any} params 需要传递的参数
* @param {String} text 开关显示的文本
* @param {Boolean} textShow 是否显示文本
* @param {Function} getCallBack 点击事件 回调参数为params分别为当前flag值和传递的参数
* <my-switch :flag='true' :param='{id:1}' @click='getCallBack' :text='开|关' :text-show='true'></my-switch>
* */
export default BaseSwitch;
