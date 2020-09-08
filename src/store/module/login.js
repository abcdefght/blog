
const state={
  login:false,
  user:'游客'
};

const getters={


};

const mutations={
  initUser(state,user){
    state.user=user;
    state.login=true;
  },

  delUser(state){
    state.user='游客';
    state.login=false;
  }

};

const actions={
  initUser({commit},user){
    commit('initUser',user);
  },

  delUser({commit}){
    commit('delUser');
  }

};

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
