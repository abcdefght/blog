import fa from "element-ui/src/locale/lang/fa";

const state={
  login:false,
};

const getters={

};

const mutations={
  initLogin(state,flag){
    state.login=flag;
  },
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
