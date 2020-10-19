
const state={

  blogId:8,   // 博客Id

  searchData:'',   // 搜索结果
  searchWord:'',    // 搜索关键字
  searchPage:0,      // 搜索页码
  searchFlag:false,    // 搜索flag显示,false继续加载,true不加载
  len:0   // 查询结果长度

};

const getters={


};

const mutations={

  initBlogId(state,num){
    state.blogId=num;
  },

  initSearchData(state,result){
    state.searchData=result;
  },

  initSearchWord(state,word){
    state.searchWord=word;
  },

  initLen(state,len){
    state.len=len;
  },

  addSearchData(state,arr){
    state.searchData=Array.from(new Set([...state.searchData,...arr]));
  },

  initSearchPage(state){
    state.searchPage=0;
  },

  addSearchPage(state,num){
    state.searchPage+=num;
  },

  changeSearchFlag(state,value){
    state.searchFlag=value;
  },

};

const actions={

  initBlogId({commit},num) {
    commit('initBlogId',num);
  },

  initSearchData({commit},result){
    commit('initSearchData',result);
  },

  initSearchWord({commit},word){
    commit('initSearchWord',word);
  },

  addSearchData({commit},arr){
    commit('addSearchData',arr);
  },

  initSearchPage({commit}) {
    commit('initSearchPage');
  },

  addSearchPage({commit},num){
    commit('addSearchPage',num);
  },

  changeSearchFlag({commit},value){
    commit('changeSearchFlag',value);
  },

  initLen({commit},len){
    commit('initLen',len)
  }
};

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}
