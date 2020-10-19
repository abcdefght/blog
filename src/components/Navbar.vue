<template>
  <div class="hello">
    <div class="title">awwac个人博客</div>
    <div class="nav">
        <ul>
          <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)" @click="goTo2('/')">
            <i class="el-icon-house"></i>首页
          </li>
          <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)" @click="goTo2('/word')">
            <i class="el-icon-chat-dot-square"></i>留言板
          </li>
          <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)" @click="goTo2('/write')">
            <i class="el-icon-edit-outline"></i>写法示例
          </li>
          <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)" @click="goTo2('/login')">
            <i class="el-icon-setting"></i>后台管理
          </li>
          <span class="slider-nav" :style="styleObj" @mouseover="showSlide($event)" @mouseout="closeSlide($event)"></span>
        </ul>
      </div>
    <div class="hello-search">
      <input type="text" placeholder="查找博客" class="search" v-on:keyup.enter="search(word)" v-model="word">
    </div>
    <base-loading
      v-if="loading"
      type="fixed"
      con="拼命查询中"
    >
    </base-loading>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import {Search} from "@/api/src";

  export default {
    name: 'Navbar',
    data () {
      return {
        word:"",
        styleObj:{
          left:0,
          width:0,
          opacity:0
        },
        flag:false,
        loading:false
      }
    },
    methods:{
      // 搜索
      search(word){
        if(this.word===''){
          this.$msg.warning('输入不能为空');
          return ;
        }
        this.loading=true;
        setTimeout(()=>{
          Search({
            word:word,
            page:0,
            size:5
          }).then(res=>{
            if(res.code===200){
              this.initSearchData(res.result);
              this.initLen(res.len);
              this.initSearchWord(word);
              this.initSearchPage();
              this.changeSearchFlag(false);
              this.loading=false;
              this.$router.push({path:'/search'});
            }
          });
        },600);
      },

      ...mapActions({
        initSearchData:'search/initSearchData',
        initSearchWord:'search/initSearchWord',
        initSearchPage:'search/initSearchPage',
        changeSearchFlag:'search/changeSearchFlag',
        initLen:'search/initLen'
      }),

      goTo(dirId,id){
        this.$router.push({
          path:`/note/${dirId}/${id}`
        })
      },

      goTo2(path){
        this.$router.push({
          path:path
        })
      },

      showSlide(e){
        this.styleObj.width=e.currentTarget.offsetWidth/2+'px';
        this.styleObj.left=e.currentTarget.offsetLeft+e.currentTarget.offsetWidth/4+'px';
        this.styleObj.opacity=1;
      },

      closeSlide(e){
        this.styleObj.width='0px';
        this.styleObj.left=e.currentTarget.offsetLeft+e.currentTarget.offsetWidth/2+'px';
        this.styleObj.opacity=0;
      },
    },
  }
</script>

<style scoped lang="less">
  @import "../assets/less/navbar";
</style>
