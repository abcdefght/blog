import BaseHiddenComponent from './base-hidden.vue';
import Vue from 'vue';

const HiddenConstruct=Vue.extend(BaseHiddenComponent);

/*
* 笼罩层组件
* @param {Boolean} options 为true显示，为false关闭
* */
const hidden=function (options) {
    if(typeof options==='boolean'){
        const hiddenCom=new HiddenConstruct({
            el:document.createElement('div'),
        });
        if(options){
            document.body.appendChild(hiddenCom.$el);
        }else{
            document.body.removeChild(document.getElementById('hidden'));
        }
    }
};

Vue.prototype.$hidden=hidden;

export default hidden;
