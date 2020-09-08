<template>
  <div class="my-tags">
    <p>博客分类</p>
    <div>
      <a href="javascript:void(0)" v-for="(item,index) in result" :key="index" :style="{'background-color':getColor(item.name)}" @click="goTo(item.name)">{{item.name}}</a>
    </div>
  </div>
</template>

<script>
    import {getTagBlog} from "../../../api/src";

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
        },
        methods:{
          goTo(tag){
            this.$router.push({
              path:'/tag/'+tag
            })
          },
          getColor(tag){
            let colors=[
              {name:'python',color:'#FB4C7B'},
              {name:'django',color:'#977ADD'},
              {name:'算法',color:'#FB674C'},
              {name:'数据结构',color:'#459CE6'},
              {name:'css',color:'#9EDD7A'},
              {name:'mysql',color:'#CDDD7A'},
              {name:'linux',color:'#DDB97A'},
              {name:'vue',color:'#DD7A8D'},
              {name:'javascript',color:'#DD7AB7'},
              {name:'es6',color:'#8CEFAF'},
            ];

            for(let i=0;i<colors.length;i++){
              if(colors[i].name===tag.toLowerCase()){
                return colors[i].color;
              }
            }
            return '#BF7ADD'
          },
        }
    }
</script>

<style scoped lang="less">
  .my-tags{
    >p{
      border-bottom: solid 1px #EEEEEE;
      padding-bottom: 5px;
    }
    >div{
      margin-top: 10px;
      display: grid;
      grid-template-columns: repeat(auto-fit,minmax(100px,1fr));
      gap: 5px;
      a{
        text-decoration: none;
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
