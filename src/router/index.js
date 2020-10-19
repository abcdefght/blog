import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import {getToken} from '@/utils'
import store from "@/store";
import {checkLogin} from "@/api/src";


// 路由懒加载
const Blog=()=>import('@com/blog/Blog.vue');

const DateDir=()=>import('@com/date-dir.vue');
const Search=()=>import('@com/Search.vue');
const TagsDir=()=>import('@com/tags-dir.vue');
const Error404=()=>import('@com/Error404.vue');
const Test=()=>import('@com/Test');
const FileDir=()=>import('@com/file-dir');

const Index=()=>import('@com/index/Index.vue');
const Login=()=>import('@com/Login')
const Word=()=>import('@com/Word');
const WriteExample=()=>import('@com/write-example')

const Admin=()=>import('@com/admin/Admin')
const AdminCon=()=>import('@com/admin/children/admin-con')
const AdminFile=()=>import('@com/admin/children/admin-file')
const AdminTag=()=>import('@com/admin/children/admin-tag')
const AdminComment=()=>import('@com/admin/children/admin-comment')
const AdminWord=()=>import('@com/admin/children/admin-word')
const AdminData=()=>import('@com/admin/children/admin-data/admin-data')

Vue.use(VueCookies);
Vue.use(Router);

const router=new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path:'/tag/:tag',
      name:'TagsDir',
      component:TagsDir,
      props: true
    },
    {
      path:'/date/:date',
      name:"DateDir",
      component:DateDir,
      props:true
    },
    {
      path:'/file/:id',
      name:'FileDir',
      component:FileDir,
      props:true
    },
    {
      path:'/blog/:id',
      name:'Blog',
      component:Blog,
    },
    {
      path:"/search",
      name:"Search",
      component:Search
    },
    {
      path:'/word',
      name:'Word',
      component:Word
    },
    {
      path:'/login',
      name:'Login',
      component:Login,
    },
    {
      path:'/write',
      name:'WriteExample',
      component:WriteExample
    },
    {
      path:'/admin',
      name:'Admin',
      component:Admin,
      children:[
        {
          path:'con',
          name:'AdminCon',
          component:AdminCon,
          alias:'/admin',
          meta:{
            auth:true
          },
        },
        {
          path:'file',
          name:'AdminFile',
          component:AdminFile,
          meta:{
            auth:true
          },
        },
        {
          path:'tag',
          name:'AdminTag',
          component:AdminTag,
          meta:{
            auth:true
          },
        },
        {
          path:'comment',
          name:'AdminComment',
          component:AdminComment,
          meta:{
            auth:true
          },
        },
        {
          path:'word',
          name:'AdminWord',
          component:AdminWord,
          meta:{
            auth:true
          }
        },
        {
          path:'data',
          name:'AdminData',
          component:AdminData,
          meta: {
            auth:true
          }
        }
      ]},
    {
      path:"*",
      name:"404",
      component:Error404
    },
    {
      path:'/test',
      name:'Test',
      component:Test
    },
  ]
});

router.beforeEach((to,from,next)=>{
  if(!VueCookies.get('csrftoken')){
    getToken();
  }
  if(to.meta.auth){
    if(VueCookies.get('token')){
      if(!store.state.login.login){
        // 校验token
        checkLogin().then(res=>{
          if(res.code===200){
            store.state.login.login=true;
            next();
          }
          else{
            next('/');
          }
        })
      }
      else {
        next();
      }
    }
    else{
      // 无token,直接返回主页
      next('/')
    }
  }
  else{
    next()
  }
});


export default router;


