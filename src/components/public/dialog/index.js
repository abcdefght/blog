import Dialog from './Dialog.vue';
import Vue from 'vue';

const dialogConstruct=Vue.extend(Dialog);

/*
* 弹出框组件
* @param {String} con 内容
* @param {Function} getCallBack 回调函数 回调参数为true或false
* @example
* this.$dialog({con:'确定删除吗？',getCallBack:({res,params})=>{}})
* @param {Boolean} res 用户点击的确定[true]或取消[false]
* @param {Any} params input框的值，默认只能允许一个input
* */
const dialog=function (options) {
    if(typeof options==='object'){
        const dialogCom=new dialogConstruct({
            el:document.createElement('div'),
            propsData:options
        });
        dialogCom.flag=true;
        document.body.appendChild(dialogCom.$el);
    }
};



Vue.prototype.$dialog=dialog;
export default dialog;

