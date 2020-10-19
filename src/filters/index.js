// 全局过滤器

/*
* 时间日期过滤器 将时间转化为年月日形式
* @param {String} value
* @example
* 1) 2019-09-20 23:12 --> 2019年9月20日 23:12
* 2) 2019-09-10 --> 2019年9月10日
* */
export const dateFilter=function(value,flag=true) {
  let date=value.split(' ');
  let temp=date[0].split('-');
  if(flag){
    return temp[0]+'年'+temp[1]+'月'+temp[2]+'日 '+date[1];
  }
  else{
    return temp[0]+'年'+temp[1]+'月'+temp[2]+'日'
  }
};

/*
* 时间日期过滤器 将时间转化为本地值
* @param {String} value 形如 `2019-09-10 23:12`
* @return {String} 形如 `刚刚`|`5分钟前`|`2小时前`|`2天前`|`2019-09-10 23:12`
* */
export const localFilter=function (value){
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
    return value.split(' ')[0];
  }
};

/*
* 标签过滤器
* @param {String} value 形如:`vue,webpack`
* */
export const tagFilter=function(value){return value.split(',')[0]}


export default {
  localFilter,
  dateFilter,
  tagFilter
}


