<template>
    <div class="top-blog">
      <ul>
        <li v-for="(item,index) in result2" :key="index" class="blog-item">
          <div class="title">
            <span>{{item.tag|tagFilter}}<span></span></span>
            <span @click="goTo(item.id)">
              {{item.title}}
            </span>
            <span class="node">置顶</span>
          </div>
          <div class="bottom">
            <div class="bottom-con">
              {{item.detail}}
            </div>
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
        </li>
          <transition-group name="fade" style="display: grid;gap: 10px;">
            <li v-for="item in result1" :key="item.id" class="blog-item">
              <div class="title">
                <span>{{item.tag|tagFilter}}<span></span></span>
                <span @click="goTo(item.id)">
              {{item.title}}
            </span>
              </div>
              <div class="bottom">
                <div class="bottom-con">
                  {{item.detail}}
                </div>
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
            </li>
          </transition-group>
      </ul>
      <div class="next-page" v-if="flag2">
        <button @click="getNextData">下一页</button>
      </div>
      <base-loading v-else style="margin:10px 0;"></base-loading>
    </div>
</template>

<script>
  import {getRecommend} from "@/api/src";

  export default {
    name: "index-blog",
    data(){
          return{
            result1:[],
            result2:[],
            page:0,
            flag:true,
            flag2:true  // 设置加载过渡动画
          }
        },
    async created(){
          const res=await getRecommend({page:this.page,size:5});
          if(res.code===200){
            this.result1=res.result.data1;
            this.result2=res.result.data2;
          }
        },
    methods:{
        goTo(id){
          this.$router.push({
            path:'/blog/'+id
          })
        },
        async getNextData(){
          if(this.flag){
            this.page+=1;
            this.flag2=false;
            const res=await getRecommend({page:this.page,size:5});
            setTimeout(()=>{
              if(res.result.data1.length<5){
                this.flag=false;
                this.flag2=true;
              }
              else{
                this.flag2=true;
                this.result1=[...this.result1,...res.result.data1]
              }
            },400);
          }
          else{
            this.$msg('无数据了');
          }
        },
        goFile(id){
          console.log(id);
          this.$router.push({
            path:`/file/${id}`
          })
        }
      }
  }
</script>

<style scoped lang="less">
  @keyframes myRotate {
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  @import "../../../assets/less/dir/blogitem";
  .top-blog{
    margin: 10px 0;
    >ul{
      display: grid;
      gap: 10px;
    }
  }
  .next-page{
    margin-top: 10px;
    button{
      width: 100%;
      height: 30px;
      line-height: 30px;
      background-color: #009688;
      color: white;
      border: none;
      transition: opacity .3s;
      &:hover{
        cursor: pointer;
        opacity: .7;
      }
    }
  }
  .loading{
    margin: 10px 0;
    display: flex;
    justify-content: center;
    >div{
      display: flex;
      align-items: center;
      font-size: 14px;
      &:nth-child(1){
        margin-right: 10px;
      }
      img{
        width: 22px;
        height: 22px;
        animation: myRotate 1s infinite;
      }
    }
  }
</style>
