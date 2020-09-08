import {GET,POST} from "./request";
import base from './base';


/*
* 获取博主全部归档博客
* */
export const getDateBlog=()=>{
  return GET(`${base.host}/user/date`);
};

/*
* 获取博主全部标签信息
* */
export const getTagBlog=()=>{
  return GET(`${base.host}/user/tag`);
};

/*
* 获取博主信息
* */
export const getUser=()=>{
  return GET(`${base.host}/user/info`);
};

/*
* 获取主页最热门的文章
* */
export const getMostHot=()=>{
  return GET(`${base.host}/blog/hot`);
};

/*
* 分页查询主页的最新博客信息
* @param {Number} page
* */
export const getRecommend=page=>{
  return GET(`${base.host}/blog/recommend`,{page})
};

/*
* 分页查询指定日期的博客
* @param {String} date
* @param {Number} page
* */
export const getUserDate=({date,page})=>{
  return GET(`${base.host}/user/date`,{date,page});
};  // 分页查询用户归档博客

/*
* 分页查询指定标签的博客
* @param {Number} page
* @param {String} tag
* */
export const getUserTag=({tag,page})=>{
  return GET(`${base.host}/user/tag`,{tag,page});
};

/*
* 搜素博客
* @param {String} w 查询关键字
* @param {Number} p 页码
* */
export const Search=({w,p})=>{
  return GET(`${base.host}/search`,{w,p});
};

/*
* 获取全部分类
* */
export const getFile=()=>{
  return GET(`${base.host}/file`);
};

/*
* 获取指定分类id下的所有博客
* @param {Number} id
* */
export const getFileDetail=id=>{
  return GET(`${base.host}/file/${id}`);
};

/*
* 获取指定博客id的内容等信息
* @param {Number} id
* */
export const getBlog=id=>{
  return GET(`${base.host}/blog/${id}`);
};

/*
* 获取指定博客id下的全部评论
* @param {Number} blogId
* */
export const getComment=blogId=>{
  return GET(`${base.host}/blog/${blogId}/comment`,{});
};

/*
* 根据博客id增加用户评论
* @param {Number} blogId
* @param {Object} data
* */
export const addComment=(blogId,data)=>{
  return POST(`${base.host}/blog/${blogId}/comment`,data);
};

/*
* 根据id增加博客浏览次数
* @param {Number} id
* */
export const addScan=id=>{
  return POST(`${base.host}/blog/${id}/number`,{});
};
