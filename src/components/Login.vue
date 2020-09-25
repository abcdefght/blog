<template>
  <div class="login">
    <p><span>awwac</span>个人博客后台管理</p>
    <div class="login-form">
      <p>
        <img src="../assets/img/notice.png" alt="">
        测试账号：用户名：test 密码：666666</p>
      <div class="user"><input type="text" placeholder="账号：" v-model="user"></div>
      <div class="pwd">
        <input type="password" placeholder="密码：" v-model="pwd" id="pwd">
        <img src="../assets/img/show.png" alt="" title="显示密码" @click="showPwd()">
      </div>
      <div class="code">
        <input type="text" placeholder="验证码：" v-model="code">
        <img :src="`http://192.168.3.25/api/code?num=`+num" alt="" title="点击换一张" @click="num=Math.random()">
      </div>
      <div>
        <button @click="userLogin">
          <img src="../assets/img/loading3.png" alt="" v-if="flag">
          登陆
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {login,test} from '../api/src'
export default {
  name: "Login",
  data(){
    return {
      num:Math.random(),
      user:'',
      pwd:'',
      code:'',
      flag:false
    }
  },
  methods:{
    userLogin(){
      if(this.user===''){
        this.$msg('账号不能为空');
        return
      }
      if(this.pwd===''){
        this.$msg('密码不能为空');
        return
      }
      if(this.code===''){
        this.$msg('验证码不能为空');
      }
      this.flag=true;
      login({user:this.user, pwd:this.pwd, code:this.code}).then(res=>{
        if(res.code===200){
          setTimeout(()=>{
            this.flag=false;
            this.$router.push({
              path:`/admin`
            })
          },800);
        }
      });
    },
    showPwd(){
      let node=document.getElementById('pwd')
      node.type=node.type==='password'?'text':'password';
    }
  }
}
</script>

<style scoped lang="less">
  @keyframes rotate {
    0%{
      transform: rotate(0);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  @inputHeight:36px;
  .login{
    max-width: 380px;
    padding-top: 100px;
    margin: 0 auto;
    >p{
      text-align: center;
    }
    &-form{
      font-size: 14px;
      padding: 20px;
      background-color: white;
      margin-top: 10px;
      >p{
        display: flex;
        align-items: center;
        padding-bottom: 15px;
        border-bottom: solid 1px #EEEEEE;
        img{
          width: 20px;
          height: auto;
          margin-right: 10px;
        }
      }
      >div{
        margin: 10px auto;
      }
      .user,.pwd{
        position: relative;
        input{
          width: 100%;
          box-sizing: border-box;
          height: @inputHeight;
          border: solid 1px #EEEEEE;
          padding-left: 26px;
          transition: all .3s;
          &:focus{
            border: solid 1px #1eb6fd;
            box-shadow: 0 0 0 2px rgba(24,144,255,.2)
          }
        }
      }
      .user{
        &:after{
          background: url("../assets/img/user.png") 0 0 no-repeat;
          position: absolute;
          left: 5px;
          top: 9px;
          width: 18px;
          height: 18px;
          content: ' ';
          z-index: 100;
          background-size: 100%;
        }
      }
      .pwd{
        &:after{
          background: url("../assets/img/pwd.png") 0 0 no-repeat;
          position: absolute;
          left: 5px;
          top: 9px;
          width: 18px;
          height: 18px;
          content: ' ';
          background-size: 100%;
        }
        img{
          position: absolute;
          width: 18px;
          height: auto;
          right: 5px;
          top: 9px;
        }
      }
      .code{
        display: flex;
        align-items: center;
        input{
          flex: 1;
          margin-right: 10px;
          box-sizing: border-box;
          height: @inputHeight;
          border: solid 1px #EEEEEE;
          padding-left: 30px;
          transition: all .3s;
          &:focus{
            border: solid 1px #1eb6fd;
            box-shadow: 0 0 0 2px rgba(24,144,255,.2)
          }
        }
        &:after{
          background: url("../assets/img/code.png") 0 0 no-repeat;
          position: absolute;
          left: 5px;
          top: 9px;
          width: 18px;
          height: 18px;
          content: ' ';
          z-index: 100;
          background-size: 100%;
        }
        img{
          width: 100px;
          height: 30px;
        }
      }
      button{
        width: 100%;
        border: none;
        transition: all .3s;
        color: white;
        background-image: linear-gradient(to right,#901469,#2464DC);
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 20px;
          height: auto;
          margin-right: 10px;
          animation: rotate .6s infinite;
        }
        &:hover{
          opacity: .6;
        }
      }
    }
  }
</style>
