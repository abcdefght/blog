import loadingCom from './loading';
import Vue from 'vue';

const loadingConstruct=Vue.extend(loadingCom);

const loading=function (options) {
  if(typeof options==='boolean'){
    let node=document.getElementById('loading');
    if(node!==null){
      if(!options){
        document.body.removeChild(node);
      }
    }
    else{
      const a=new loadingConstruct({
        el:document.createElement('div')
      });
      if(options){
        a.open();
        document.body.appendChild(a.$el);
      }
    }
  }
};
export default loading;
