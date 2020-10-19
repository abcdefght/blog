<template>
  <div>
      <Navbar/>
      <div class="blog-detail">
        <div v-for="(item,index) in tagsData" :key="index" class="blog-item">
          <div class="title">
            <span>{{item.tag|tagFilter}}<span></span></span>
            <span @click="goPath('/blog/'+item.id)">{{item.title}}</span>
          </div>
          <div class="bottom">
            <div v-text="item.detail" class="bottom-con"></div>
            <div class="bottom-file" v-if="item.fileId>1">
              本文收录于<a href="javascript:void(0)" @click="goPath('/file/'+item.fileId)">
              {{item.fileName}}</a>
            </div>
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
        <transition name="opacity">
          <base-loading
            v-if="loading"
            type="float"
          ></base-loading>
        </transition>
      </div>
      <div class="paging" v-if="pageShow">
        <ul>
          <li><a href="javascript:void(0)"@click="pre">上一页</a></li>
          <li v-for="(item,index) in pageArr" :key="index">
            <a @click="page=item-1" href="javascript:void(0)" class="page" :class="{active:page+1===item}">{{item}}</a>
          </li>
          <li><a href="javascript:void(0)"@click="next">下一页</a></li>
          <li>共<span>{{len}}</span>条数据</li>
        </ul>
      </div>
  </div>
</template>

<script>
import {getUserTag} from "@/api/src";
import Navbar from "@com/Navbar";
import {dateFilter,tagFilter} from "@/filters";

export default {
  name: "tagsDir",
  data(){
    return {
      tagsData:[],
      page:0,
      msgFlag:false,
      pageArr:[],
      size:5,
      len:0,
      pageShow:false
    }
  },
  props:["tag"],
  created(){
    getUserTag({
      page:0,
      tag:this.tag,
      size:this.size
    }).then(res=>{
      if(res.code===200){
        this.tagsData=res.result;
        this.len=res.len;
        let temp=Math.ceil(this.len/this.size);
        for(let i=1;i<=temp;i++){
          this.pageArr.push(i)
        }
        this.pageShow=this.len>this.size
      }
    });
  },
  methods:{
    goPath(path){
      this.$router.push({
        path:`${path}`
      })
    },
    pre(){
      if(this.page>0){
        this.page-=1;
      }
      else{
        this.$msg({con:'没有数据了'})
      }
    },
    next(){
      if(this.page+1<Math.ceil(this.len/this.size)){
        this.page+=1;
      }
      else{
        this.$msg({con:'没有数据了'})
      }
    }
  },
  watch:{
    'page':function (newVal) {
      this.loading=true;
      setTimeout(()=>{
        getUserTag({
          size:this.size,
          page:newVal,
          tag:this.tag,
        }).then(res=>{
          if(res.code===200){
            this.tagsData=res.result;
            this.loading=false;
          }
        })
      },600)
    }
  },
  components:{
    Navbar
  },
  filters:{
    dateFilter,
    tagFilter
  }
}
</script>

<style scoped lang="less">
  @import "../assets/less/dir/page";
  @import "../assets/less/dir/blogitem";
  .blog-detail{
    max-width: 800px;
    margin: 10px auto;
    display: grid;
    gap: 10px;
  }
</style>
