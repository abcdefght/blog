import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
import {getToken} from '../assets/js/func'


// 路由懒加载
const Blog=()=>import('../components/blog/Blog.vue');
const BlogDetail=()=>import('../components/blog/children/blog-detail.vue');
const DateDir=()=>import('../components/date-dir.vue');
const Search=()=>import('../components/Search.vue');
const TagsDir=()=>import('../components/tags-dir.vue');
const IndexDate=()=>import('../components/index/children/index-date.vue');
const IndexTags=()=>import('../components/index/children/index-tags.vue');
const IndexCalender=()=>import('../components/index/children/index-calender.vue');
const IndexCarouse=()=>import('../components/index/children/index-carouse.vue');
const IndexInfo=()=>import('../components/index/children/index-info.vue');
const NavBar=()=>import('../components/NavBar.vue');
const Error404=()=>import('../components/Error404.vue');
const Index=()=>import('../components/index/Index.vue');
const IndexBlog=()=>import('../components/index/children/index-blog.vue');
const IndexUser=()=>import('../components/index/children/index-user.vue');
const IndexRecommend=()=>import('../components/index/children/index-recommend');
const IndexNotice=()=>import('../components/index/children/index-notice');
const IndexLink=()=>import('../components/index/children/index-link');
const BlogComment=()=>import('../components/blog/children/blog-comment');
const Test=()=>import('../components/Test');
const IndexFile=()=>import('../components/index/children/index-file');
const FileDir=()=>import('../components/file-dir');
const Word=()=>import('../components/Word');
const Login=()=>import('../components/Login')
const Admin=()=>import('../components/admin/Admin')
const AdminCon=()=>import('../components/admin/children/admin-con')
const AdminFile=()=>import('../components/admin/children/admin-file')

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
        {path:'/admin/con',name:'AdminCon',component:AdminCon},
        {path:'/admin/file',name:'AdminFile',component:AdminFile}
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


