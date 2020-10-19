<template>
  <div>
    <Navbar/>
    <div class="file">
      <div v-for="(item,index) in dateData" :key="index" class="blog-item">
        <div class="title">
          <span>{{item.tag|tagFilter}}<span></span></span>
          <span @click="goDetail(item.id)">{{item.title}}</span>
        </div>
        <div class="bottom">
          <div v-text="item.detail" class="bottom-con"></div>
          <div class="bottom-file" v-if="item.fileId>1">本文收录于<a href="javascript:void(0)">{{item.fileName}}</a></div>
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
    </div>
  </div>

</template>

<script>
    import {getFileDetail} from '@/api/src';
    import Navbar from "./Navbar";
    import {dateFilter,tagFilter} from "@/filters";

    export default {
        name: "FileDir",
        data(){
          return {
            dateData:[],
          }
        },
        props:['id'],
        async created(){
          const res=await getFileDetail(this.id);
          if(res.code===200){
            this.dateData=res.result;
          }
        },
        methods:{
          goDetail(num){
            this.$router.push({
              path:'/blog/'+num
            })
          },
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
    @import "../assets/less/dir/blogitem";
    .file{
      max-width: 800px;
      margin: 10px auto;
      display: grid;
      gap: 10px;
    }
</style>
