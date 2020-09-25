<template>
  <div>
    <NavBar/>
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
              <div><img src="../assets/img/user2.png" alt="图片未加载"></div>
              <div>{{item.author}}</div>
            </div>
            <div>
              <div><img src="../assets/img/pub.png" alt="图片未加载"></div>
              <div>{{item.pubDate|dateFilter}}</div>
            </div>
            <div>
              <div><img src="../assets/img/see2.png" alt="图片未加载"></div>
              <div>{{item.number}}浏览数</div>
            </div>
            <div>
              <div><img src="../assets/img/commit.png" alt="图片未加载"></div>
              <div>{{item.number}}评论数</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    import {getFileDetail} from '../api/src';
    import NavBar from "./NavBar";

    export default {
        name: "FileDir",
        data(){
          return {
            dateData:[],
          }
        },
        async created(){
          const res=await getFileDetail(this.$route.params.id);
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
          NavBar
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
