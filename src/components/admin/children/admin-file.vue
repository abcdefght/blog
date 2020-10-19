<template>
  <div class="admin-file">
      <p>分类专栏</p>
      <div class="admin-file-con">
          <table>
            <tr>
              <td>id</td>
              <td>分类名称</td>
              <td>博客数目</td>
              <td>操作</td>
            </tr>
            <tr v-for="item in arr" :key="item.id">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.count}}</td>
              <td>
                <button @click="seeFile(item.id,item.name)"><i class="el-icon-thumb"></i>查看该分类</button>
                <button @click="addFile()"><i class="el-icon-plus"></i>增加新分类</button>
                <button @click="delFile(item.id,item.name)"><i class="el-icon-delete"></i>删除该分类</button>
              </td>
            </tr>
          </table>
          <transition name="opacity">
            <base-loading
              v-if="loadingFlag"
              type="float"
              con="加载中"
            ></base-loading>
          </transition>
      </div>
    <div class="info">共<span>{{arr.length}}</span>条数据</div>
  </div>
</template>

<script>
import {getFile} from '@/api/src';
export default {
  name: "admin-file",
  data(){
    return {
      arr:[],
      loadingFlag:false,
    }
  },
  created() {
    getFile().then(res=>{
      if(res.code===200){
        this.arr=res.result
      }
    })
  },
  methods:{
    seeFile(fileId,fileName){
      this.$dialog({
        con:`页面将跳转到<span style="color: #00a67c;margin: 0 5px;">${fileName}</span>目录下，是否继续？`,
        getCallBack: ({res})=>{
          if(res){
            this.$router.push({path:`/file/${fileId}`})
          }
        }
      })
    },
    addFile(){
      this.$dialog({
        con: `请输入新分类：<input type="text" style="height: 30px;border: solid 1px #EEEEEE;padding: 0 10px;"/>`,
        getCallBack: ({res,params})=>{
          if(res){
            if (typeof params==='undefined'){
              this.$msg.warning('新分类不能为空');
            }
            else{
              this.loadingFlag=true;
              setTimeout(()=>{
                let maxId=Math.max(...this.arr.map(x=>x.id));
                let temp={id:maxId+1,name:params,count:0};
                this.arr.push(temp);
                this.loadingFlag=false;
                this.$msg.success('添加分类成功');
              },600);
            }
          }
        }
      })

    },
    delFile(fileId,fileName){
      this.$dialog({
        con:`确定删除<span style="color: #00a67c;margin: 0 5px;">${fileName}</span>分类吗？`,
        getCallBack: ({res})=>{
          if(res){
            this.loadingFlag=true;
            setTimeout(()=>{
              let index=this.arr.findIndex(x=>x.id===fileId);
              this.arr.splice(index,1);
              this.loadingFlag=false;
              this.$msg.success('删除成功');
            },600);
          }
        }
      })
    }
  },
}
</script>

<style scoped lang="less">
  .admin-file{
    display: inline-block;
    margin: 10px;
    padding: 20px;
    background-color: white;
    >p{
      padding-bottom: 15px;
    }
    &-con{
      position: relative;
      overflow: auto;
      table{
        border-collapse: collapse;
        td{
          border: solid 1px #E7E3E4;
          padding: 8px;
          &:nth-child(2){
            min-width: 160px;
          }
          &:nth-child(3){
            min-width: 100px;
          }
          &:last-child{
            min-width: 280px;
          }
          button{
            color: white;
            border: none;
            padding: 6px 8px;
            transition: all .3s;
            i{
              margin-right: 3px;
            }
            &:hover{
              opacity: .7;
            }
            &:nth-child(1){
              background-color: #00a67c;
            }
            &:nth-child(2){
              background-color: #607BD7;
            }
            &:nth-child(3){
              background-color: #FC4D4D;
            }
          }
        }
      }
    }
    .info{
      margin-top: 10px;
      font-size: 14px;
      color: #999999;
      span{
        color: #00a67c;
        padding: 0 3px;
      }
    }
  }
  @media screen and (max-width: 785px){
    .admin-file{
      display: block;
      max-width: 785px;
    }
  }
</style>
