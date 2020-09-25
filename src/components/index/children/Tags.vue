<template>
  <div class="my-tags">
    <p>
      <img src="../../../assets/img/tagclass.png" alt="">
      博客分类</p>
    <div>
      <a href="javascript:void(0)" v-for="(item,index) in result" :key="index" :style="{'background-color':getColor(item.name)}" @click="goTo(item.name)">{{item.name}}</a>
    </div>
  </div>
</template>

<script>
    import {getTagBlog} from "../../../api/src";
    import {getColor} from "../../../assets/js/func";

    export default {
        name: "tags",
        data(){
          return {
            result:[],
          }
        },
        created(){
          getTagBlog().then(res=>{
            if(res.code===200){
              this.result=res.result.data;
              this.result.sort(function (a, b) {
                if(a.count<b.count){
                  return 1;
                }
                else {
                  return -1;
                }
              });
            }
          });
          this.getColor=getColor;
        },
        methods:{
          goTo(tag){
            this.$router.push({
              path:'/tag/'+tag
            })
          }
        }
    }
</script>

<style scoped lang="less">
  .my-tags{
    >p{
      border-bottom: solid 1px #EEEEEE;
      padding-bottom: 5px;
      display: flex;
      align-items: center;
      img{
        width: 19px;
        height: auto;
        margin-right: 10px;
      }
    }
    >div{
      margin-top: 10px;
      display: grid;
      grid-template-columns: repeat(auto-fit,minmax(100px,1fr));
      gap: 5px;
      a{
        text-align: center;
        padding: 3px 0;
        transition: all .3s;
        background-color: #00a67c;
        color: white;
        &:hover{
          opacity: .7;
        }
      }
    }
  }

</style>
