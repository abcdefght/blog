import BaseMsg from './base-msg.vue';
import Vue from 'vue';

const msgConstruct=Vue.extend(BaseMsg);

const typeArr=['success','info','warning','error'];

/*
* 消息框组件
* @param {String} con 内容
* @example 默认为提示
* this.$msg.info('这是一个提示') 等同于 this.$msg('这是一个提示')
* this.$msg.error('这是一个错误')
* this.$msg.warning('这是一个警告')
* this.$msg.success('这是一个成功')
* */



const msg=function (con,options={}) {
  if(typeof options==='object'&&typeof con==='string'){
    const msgCom=new msgConstruct({
            el:document.createElement('div'),
            propsData:{...{con},...options}
        });
        msgCom.flag=true;
        document.body.appendChild(msgCom.$el);
        msgCom.closeMsg();
    }
};


typeArr.forEach(type=>{
   msg[type]=(con,options={})=>{
       if(typeof options==='object'){
         options.type=type;
         return msg(con,options)
       }
   }
});


Vue.prototype.$msg=msg;

export default msg;
