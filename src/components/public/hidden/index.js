import HiddenComponent from './Hidden';
import Vue from 'vue';

const HiddenConstructor=Vue.extend(HiddenComponent);

const hidden=function (options) {
  if(typeof options==='boolean'){
    const a=new HiddenConstructor({
      el:document.createElement('div')
    });
    if(options){
      a.open();
      document.body.appendChild(a.$el);
    }
    else{
      a.close();
      let b=document.getElementById('p-hidden');
      document.body.removeChild(b);
    }
  }
};

export default hidden;



