// 全局过滤器
import Vue from 'vue';

// 定义日期过滤器
Vue.filter('pubDate-filter',function (value) {
  let date=value.split(' ');
  let temp=date[0].split('-');
  if(typeof date[1]==='undefined'){
    return temp[0]+'年'+temp[1]+'月'+temp[2]+'日 ';
  }
  return temp[0]+'年'+temp[1]+'月'+temp[2]+'日 '+date[1];
});

Vue.filter('pubDate-filter2',function (value) {
  let b=new Date(value).getTime();
  let c=new Date().getTime();
  let temp=(c-b)/1000;
  if(temp<300){
    return '刚刚';
  }
  else if(temp<3600){
    return Math.floor(temp/60)+'分钟前';
  }
  else if(temp<3600*24){
    return Math.floor(temp / 3600)+'小时前';
  }
  else if(temp<3600*24*7){
    let temp2=3600*24;
    return Math.floor(temp / temp2)+'天前';
  }
  else {
    return value;
  }
});

// 定义标签过滤器
Vue.filter('tag-filter',function (value) {
  return value.split(',')[0];
});



const pubDateFilter=Vue.filter('pubDate-filter');
const tagFilter=Vue.filter('tag-filter');
const pubDateFilter2=Vue.filter('pubDate-filter2');


export {
  pubDateFilter,
  tagFilter,
  pubDateFilter2,
}

