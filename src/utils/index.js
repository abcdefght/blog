/*
* 一些实用函数
* */

import axios from "axios";
import base from '@/api/base';
import cookies from 'vue-cookies';

const getToken=function getToken() {
  let url=`${base.host}/csrftoken`;
  axios.get(url).then(res=>{
    cookies.set('csrftoken',res.data.token)
  });
};// 获取csrfToken
const getColor=tag=>{
  let colors=[
    {name:'Python',color:'#FB4C7B'},
    {name:'Django',color:'#977ADD'},
    {name:'算法',color:'#FB674C'},
    {name:'算法练习',color:'#459CE6'},
    {name:'CSS',color:'#9EDD7A'},
    {name:'Mysql',color:'#CDDD7A'},
    {name:'Linux',color:'#DDB97A'},
    {name:'Vue',color:'#DD7A8D'},
    {name:'Javascript',color:'#DD7AB7'},
    {name:'webpack',color: '#00A67C'}
  ];
  let item=colors.find(x=>x.name.toLowerCase()===tag.toLowerCase());
  return item?item.color:'#BF7ADD';
}// 获取标签颜色
const getLocalDate=()=>{
  let date=new Date();
  let year=date.getFullYear();
  let mon=date.getMonth()+1;
  let day=date.getDate()
  let hours=date.getHours()
  let min=date.getMinutes()
  let mon2=mon<10?'0'+mon:mon
  let day2=day<10?'0'+day:day
  let hours2=hours<10?'0'+hours:hours
  let min2=min<10?'0'+min:min
  return year+'-'+mon2+'-'+day2+' '+hours2+':'+min2;
}// 获取本地时间
const getSum=(array,prop)=>{
  let sum=0;
  array.forEach(item=>{
    sum+=item[prop]
  })
  return sum;
}







export {
  getToken,
  getColor,
  getLocalDate,
  getSum
}
