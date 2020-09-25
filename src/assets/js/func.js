import axios from "axios";
import base from '../../api/base'

// 获取csrftoken
const getToken=function getToken() {
  let url=`${base.host}/csrftoken`;
  axios.get(url).then(res=>{
  });
};

/*
* 获取各标签颜色
* @param {String} tag 标签名
* */
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
  if(item){
    return item.color;
  }
  else{
    return '#BF7ADD'
  }
}



export {
  getToken,
  getColor
};


