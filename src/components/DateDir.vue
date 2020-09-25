<template>
    <div>
      <NavBar/>
      <div class="blog-detail">
            <div v-for="(item,index) in dateData" :key="index" class="blog-item">
              <div class="title">
                <span>{{item.tag|tagFilter}}<span></span></span>
                <span @click="goDetail(item.id)">{{item.title}}</span>
              </div>
              <div class="bottom">
                <div v-text="item.detail" class="bottom-con"></div>
                <div class="bottom-file" v-if="item.fileId>1">本文收录于<a href="javascript:void(0)" @click="goFile(item.fileId)">{{item.fileName}}</a></div>
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
      <div class="paging">
            <a href="javascript:void(0)" class="pre" @click="getPage(page-parseInt(1,10))">上一页</a>
            <a @click="getPage(item)" href="javascript:void(0)" class="page" :class="{active:page+1===item}" v-for="item in pageArr">{{item}}</a>
            <a href="javascript:void(0)" class="next" @click="getPage(page+parseInt(1,10))">下一页</a>
        </div>
    </div>
</template>

<script>
    import {getUserDate} from "../api/src";
    import NavBar from "./NavBar";

    export default {
        name: "dateDir",
        data(){
          return {
            dateData:[],
            page:0,
            pageArr:[],
            pageLength:0,
            size:5
          }
        },
        created(){
          getUserDate({
            date:this.$route.params.date,
            page:0,
            size:this.size
          }).then(res=>{
            if(res.code===200){
              this.dateData=res.result;
              this.pageLength=Math.ceil(res.length/5);
              if(this.pageLength<=5){
                for(let i=1;i<=this.pageLength;i++){
                  this.pageArr.push(i);
                }
              }
            }
          });
        },
        methods:{
          goFile(fileId){
            this.$router.push({
              path:`/file/${fileId}`
            })
          },
          goDetail(num){
            this.$router.push({
              path:'/blog/'+num
            })
          },
          getPage(page){
            getUserDate({
              date:this.$route.params.date,
              page:page,
              size:this.size
            }).then(res=>{
              if(res.code===200&&res.result.length>0&&res.result.length<=5){
                this.dateData=res.result;
                this.page=page;
              }
            });
          }
        },
        watch:{
          'page':function (newVal) {
            let num=Math.floor(newVal/6)*5+1;
            this.pageArr=[];
            for(let i=num;i<num+5;i++){
              if(i<=this.pageLength){
                this.pageArr.push(i);
              }
            }

          }
        },
        components:{
          NavBar
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
