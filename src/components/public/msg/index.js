import MsgComponent from './Msg';
import Vue from 'vue';

const msgConstructor=Vue.extend(MsgComponent);

const Msg=function (options) {
  if(typeof options==='string'){
    const a=new msgConstructor({
      el:document.createElement('div')
    });
    document.body.appendChild(a.$el);
    a.showMsg(options);
  }
};


export default Msg;





