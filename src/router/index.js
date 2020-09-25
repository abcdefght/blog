import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import {getToken} from '../assets/js/func'


// 路由懒加载
const Blog=()=>import('../components/blog/Blog.vue');
const BlogDetail=()=>import('../components/blog/children/BlogDetail.vue');
const DateDir=()=>import('../components/DateDir.vue');
const Search=()=>import('../components/Search.vue');
const TagsDir=()=>import('../components/TagsDir.vue');
const Date=()=>import('../components/index/children/Date.vue');
const Tags=()=>import('../components/index/children/Tags.vue');
const Calender=()=>import('../components/index/children/Calender.vue');
const Carouse=()=>import('../components/index/children/Carouse.vue');
const Info=()=>import('../components/index/children/Info.vue');
const NavBar=()=>import('../components/NavBar.vue');
const Error404=()=>import('../components/Error404.vue');
const Index=()=>import('../components/index/Index.vue');
const TopBlog=()=>import('../components/index/children/TopBlog.vue');
const UserShow=()=>import('../components/index/children/UserShow.vue');
const IndexRecommend=()=>import('../components/index/children/IndexRecommend');
const Notice=()=>import('../components/index/children/Notice');
const FriendLink=()=>import('../components/index/children/FriendLink');
const Comment=()=>import('../components/blog/children/Comment');
const Test=()=>import('../components/Test');
const BlogFile=()=>import('../components/index/children/BlogFile');
const FileDir=()=>import('../components/FileDir');
const Word=()=>import('../components/Word');
const Login=()=>import('../components/Login')
const Admin=()=>import('../components/admin/Admin')
const BlogCon=()=>import('../components/admin/children/BlogCon')

Vue.use(VueCookies);
Vue.use(Router);

const router=new Router({
  routes: [
    {path: '/', name: 'Index', component: Index},
    {path:'/tag/:tag',name:'TagsDir', component:TagsDir},
    {path:'/date/:date', name:"DateDir", component:DateDir},
    {path:'/file/:id',name:'FileDir',component:FileDir},
    {path:'/blog/:id',name:'Blog',component:Blog},
    {path:"/search",name:"Search", component:Search},
    {path:'/word',name:'Word',component:Word},
    {path:'/login',name:'Login',component:Login},
    {path:'/admin',name:'Admin',component:Admin,children:[
        {path:'/admin/blog-con',name:'BlogCon',component:BlogCon}
      ]},
    {path:"*", name:"404", component:Error404},
    {path:'/test',component:Test},
  ]
});

router.beforeEach((to,from,next)=>{
  if(!VueCookies.get('csrftoken')){
    getToken();
  }
  next();
});


export default router;


