
const state={
  scaleFlag:true,
  resizeFlag:false
};

const getters={

};

const mutations={
  toggleScaleFlag(state){
    state.scaleFlag=!state.scaleFlag;
  },
  toggleResizeFlag(state){
    state.resizeFlag=!state.resizeFlag;
  }
};

const actions={

};

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
