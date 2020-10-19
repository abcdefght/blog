<template>
    <div>
      <NavBar/>
      <div class="blog-detail">
        <p v-show="searchWord.length>0">查询成功,共有<span>{{len}}</span>条关于<span>{{searchWord}}</span>的记录</p>
        <transition-group name="fade" style="display: grid;gap: 10px;">
          <div v-for="item in searchData" :key="item.id" class="blog-item">
            <div class="title">
                <span>{{item.tag|tagFilter}}<span></span></span>
                <span @click="goDetail(item.id)" v-html="wordFilter(item.title,searchWord)"></span>
            </div>
            <div class="bottom">
              <div v-html="wordFilter(item.detail,searchWord)" class="bottom-con"></div>
              <div class="bottom-file" v-if="item.fileId>1">本文收录于<a href="javascript:void(0)" @click="goFile(item.fileId)">{{item.fileName}}</a></div>
              <div class="bottom-info">
                <div>
                  <i class="el-icon-user"></i>{{item.author}}
                </div>
                <div>
                  <i class="el-icon-date"></i>{{item.pubDate|dateFilter}}
                </div>
                <div>
                  <i class="el-icon-chat-round"></i>{{item.comment}}评论数
                </div>
                <div>
                  <i class="el-icon-tickets"></i>{{item.number}}浏览数
                </div>
              </div>
            </div>
          </div>
        </transition-group>
        <base-loading
          v-if="loading">
        </base-loading>
      </div>
      <div v-show="searchFlag" class="no-data">没有数据了!</div>
    </div>
</template>

<script>
    import { mapState,mapActions } from 'vuex';
    import {Search} from "@/api/src";
    import NavBar from "./Navbar";

    export default {
      name: "Search",
      data(){
        return {
          loading:false,
        }
      },
      mounted(){
        window.addEventListener('scroll',this.scrollEvent,true);
      },
      destroyed(){
        window.removeEventListener('scroll',this.scrollEvent,true);
      },
      computed:{
        ...mapState({
          searchData:state=>state.search.searchData,
          searchWord:state=>state.search.searchWord,
          searchPage:state=>state.search.searchPage,
          searchFlag:state=>state.search.searchFlag,
          len:state=>state.search.len
        })
      },
      methods:{
        ...mapActions({
          addSearchData:'search/addSearchData',
          addSearchPage:'search/addSearchPage',
          changeSearchFlag:'search/changeSearchFlag',
        }),

        // 滚动加载事件
        scrollEvent(){
          let client=document.documentElement.clientHeight||document.body.clientHeight;
          let top=document.documentElement.scrollTop||document.body.scrollTop;
          let height=document.documentElement.scrollHeight;
          if(height-client-top<1&&!this.searchFlag){
            this.flag=false;
            this.loading=true;
            setTimeout(()=>{
              this.addSearchPage(1);
              Search({
                word:this.searchWord,
                page:this.searchPage,
                size:5
              }).then(res=>{
                if(res.code===200){
                  if(res.result.length>0&&res.result.length<=5){
                    this.addSearchData(res.result);
                  }
                  else{
                    this.changeSearchFlag(true);
                  }
                  this.loading=false;
                }
              });
            },600);
          }
        },

        // 进入博客详情页面
        goDetail(id) {
          this.$router.push({
            path:'/blog/'+id
          })
        },

        // 搜索关键字高亮显示
        wordFilter(s1,s2){
          return s1.replace(eval(`/(${s2})/ig`),`<span style='color: red;'>$1</span>`)
        },
        goFile(fileId){
          this.$router.push({
            path:`/file/${fileId}`
          })
        }
      },
      components:{
        NavBar
      }
    }
</script>

<style scoped lang="less">
  @import "../assets/less/dir/blogitem";
  .blog-detail{
    max-width: 800px;
    margin: 10px auto;
    display: grid;
    gap: 10px;
    >p{
      font-size: 14px;
      span{
        color: red;
      }
    }
  }
  .no-data{
    max-width: 800px;
    padding: 5px 0;
    text-align: center;
    background-color: #FC5944;
    color: white;
    font-size: 14px;
    margin: 5px auto;
  }
</style>
