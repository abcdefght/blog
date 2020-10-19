import BaseOption from './base-option';

BaseOption.install=Vue=>{
  Vue.component(BaseOption.name,BaseOption);
}

export default BaseOption;
