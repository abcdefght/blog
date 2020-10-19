<template>
  <div class="admin-tag">
    <p>热门标签</p>
    <div class="admin-tag-con">
      <div v-for="item in arr" :key="item.id">
        <div>{{item.name}}<span>{{item.count}}篇</span></div>
        <div>
          <a href="javascript:void(0)" @click="delTag(item.id,item.name)">删除</a>
        </div>
      </div>
      <button class="add" @click="addTag">+</button>
      <transition name="opacity">
        <base-loading
          style="background-color: transparent"
          v-if="loading"
          type="float">
        </base-loading>
      </transition>
    </div>
  </div>
</template>

<script>
import {getTagBlog} from "@/api/src";

export default {
  name: "admin-tag",
  data(){
    return {
      arr:[],
      loading:false
    }
  },
  created(){
    getTagBlog().then(res=>{
      if(res.code===200){
        this.arr=res.result.data;
      }
    })
  },
  methods:{
    addTag(){
      this.$dialog({
        con:'请输入标签名：<input type="text" placeholder="标签长度不能大于15" style="height: 30px;border: solid 1px #EEEEEE;padding-left: 10px;"/>',
        getCallBack:({res,params})=>{
          if(res){
            if(typeof params!=='undefined'&&params.length>0&&params.length<15){
              this.loading=true;
              setTimeout(()=>{
                this.loading=false;
                let maxId=Math.max(...this.arr.map(x=>x.id));
                let index=this.arr.findIndex(x=>x.name.toLowerCase()===params.toLowerCase());
                if(index>0){
                 this.$msg.error('添加标签失败，标签已存在');
                }
                else{
                  this.arr.push({id:maxId+1,name:params,count:0})
                  this.$msg.success('添加标签成功');
                }

              },600);
            }
            else{
              this.$msg.error('输入的标签格式错误')
            }
          }
        }
      })
    },
    delTag(tagId,tagName){
      this.$dialog({
        con:`确定要删除<span style="color: #00a67c;padding: 0 5px;">${tagName}</span>标签吗？`,
        getCallBack:({res})=>{
          if(res){
            this.loading=true;
            setTimeout(()=>{
              let index=this.arr.findIndex(x=>x.id===tagId);
              this.arr.splice(index,1);
              this.loading=false;
              this.$msg.success('删除成功')
            },600);
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .admin-tag{
    margin: 10px;
    padding: 20px;
    max-width: 800px;
    background-color: white;
    display: block;
    &-con{
      position: relative;
      display: grid;
      margin-top: 10px;
      gap: 10px;
      grid-template-columns: repeat(auto-fit,minmax(180px,1fr));
      >div{
        box-sizing: border-box;
        padding: 10px;
        background-color: #F6F5F5;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        >div{
          &:nth-child(1){
            span{
              margin-left: 8px;
            }
          }
        }
        a{
          color: #999999;
          transition: color .3s;
          &:hover{
            color: #F82424;
          }
        }
      }
      >.add{
        padding: 10px;
        border: none;
        color: white;
        background-color: #7380E4;
        font-size: 16px;
        transition: opacity .3s;
        &:hover{
          opacity: .7;
        }
      }
    }
  }
</style>
