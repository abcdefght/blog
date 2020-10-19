<template>
  <div class="my-tags">
    <p>
      <img src="../../../assets/img/tagclass.png" alt="">
      博客分类</p>
    <div>
      <base-tooltip v-for="(item,index) in result" :key="index"
                    style="width: auto"
                    :info="'共'+item.count+'篇博客'">
        <a href="javascript:void(0)"
           :style="{'background-color':getColor(item.name)}"
           @click="goTo(item.name)">
          {{item.name}}
        </a>
      </base-tooltip>
    </div>
  </div>
</template>

<script>
    import {getTagBlog} from "@/api/src";
    import {getColor} from "@/utils";

    export default {
        name: "index-tags",
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
        display: block;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
        padding: 5px 0;
        background-color: #00a67c;
        color: white;
      }
    }
  }

</style>
