<template>
    <div>
      <div class="blog-detail">
        <div v-for="(item,index) in searchData" :key="index" class="blog-item">
            <div class="title">
                <span>{{item.tag|tagFilter}}<span></span></span>
                <span @click="goDetail(item.id)" v-html="wordFilter(item.title,searchWord)"></span>
            </div>
            <div class="bottom">
              <div v-html="wordFilter(item.detail,searchWord)" class="bottom-con"></div>
              <div class="bottom-file" v-if="item.fileId>1">本文收录于<a href="javascript:void(0)">{{item.fileName}}</a></div>
              <div class="bottom-info">
                  <div>
                    <div><img src="../assets/img/user2.png" alt="图片未加载"></div>
                    <div>{{item.author}}</div>
                  </div>
                  <div>
                    <div><img src="../assets/img/pub.png" alt="图片未加载"></div>
                    <div>{{item.pubDate|pubDateFilter}}</div>
                  </div>
                  <div>
                    <div><img src="../assets/img/see2.png" alt="图片未加载"></div>
                    <div>{{item.comment}}评论数</div>
                  </div>
                  <div>
                    <div><img src="../assets/img/commit.png" alt="图片未加载"></div>
                    <div>{{item.number}}浏览数</div>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <div v-show="searchFlag" class="no-data">没有数据了!</div>
    </div>
</template>

<script>
    import { mapState,mapActions } from 'vuex';
    import {Search} from "../api/src";

    export default {
      name: "Search",
      data(){
        return {
          flag:false,
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
          searchFlag:state=>state.search.searchFlag
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
          if(height-client-top<10&&!this.searchFlag){
            this.$loading(true);
            setTimeout(()=>{
              this.addSearchPage(1);
              Search({
                w:this.searchWord,
                p:this.searchPage,
              }).then(res=>{
                if(res.code===200){
                  if(res.result.length>0&&res.result.length<=5){
                    this.addSearchData(res.result);
                  }
                  else{
                    this.changeSearchFlag(true);
                  }
                }
              });
              this.$loading(false);
            },1000);
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
          return s1.replace(eval("/"+s2+"/g"),"<span style='color: red;'>"+s2+"</span>")
        }
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
