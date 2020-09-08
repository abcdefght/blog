<template>
  <div class="hello">
    <div class="title">awwac个人博客</div>
    <div class="nav">
        <ul>
          <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)" @click="goTo2('/')">首页</li>
          <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)" @click="goTo2('/data-info')">数据统计</li>
          <span class="slider-nav" :style="styleObj" @mouseover="showSlide($event)" @mouseout="closeSlide($event)"></span>
        </ul>
      </div>
    <div class="hello-search">
      <input type="text" placeholder="查找博客" class="search" v-on:keyup.enter="search(word)" v-model="word">
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import {Search} from "../api/src";

  export default {
    name: 'HelloWorld',
    data () {
      return {
        word:"",
        styleObj:{
          left:0,
          width:0,
          opacity:0
        },
        flag:false,
        flag2:false
      }
    },
    methods:{
      // 搜索
      search(word){
        this.initSearchWord(word);
        this.initSearchPage();
        this.changeSearchFlag(false);

        Search({
          w:word,
          p:1
        }).then(res=>{
          if(res.code===200){
            this.initSearchData(res.result);
          }
        });
        this.$router.push({
          path:'/search'
        })
      },

      ...mapActions({
        initSearchData:'search/initSearchData',
        initSearchWord:'search/initSearchWord',
        initSearchPage:'search/initSearchPage',
        changeSearchFlag:'search/changeSearchFlag',
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
