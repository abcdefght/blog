import {request} from "./request";
import base from './base';

/*
* 获取博主全部归档博客
* */
export const getDateBlog=()=>{
  return request({
    url:`${base.host}/date`,
    method:'get'
  })
};

/*
* 获取博主全部标签信息
* */
export const getTagBlog=()=>{
  return request({
    url:`${base.host}/tag`,
    method:'get'
  })
};

/*
* 获取博主信息
* */
export const getUser=()=>{
  return request({
    url:`${base.host}/user`,
    method:'get'
  })
};

/*
* 获取主页最热门的文章
* */
export const getMostHot=()=>{
  return request({
    url:`${base.host}/blog/hot`,
    method:'get'
  })
};

/*
* 分页查询主页的最新博客信息
* @param {Number} page
* @param {Number} size
* */
export const getRecommend=({page,size})=>{
  return request({
    url:`${base.host}/blog/recommend`,
    method:'get',
    params:{page,size}
  })
};

/*
* 分页查询指定日期的博客
* @param {String} date
* @param {Number} page
* @param {Number} size
* */
export const getUserDate=({date,page,size})=>{
  return request({
    url:`${base.host}/date/${date}`,
    method:'get',
    params:{page,size}
  })
};  // 分页查询用户归档博客

/*
* 分页查询指定标签的博客
* @param {Number} page 页码
* @param {String} tag 标签名
* @param {Number} size 每页返回多少条
* */
export const getUserTag=({tag,page,size})=>{
  return request({
    url:`${base.host}/tag/${tag}`,
    method:'get',
    params:{page,size}
  })
};

/*
* 搜索博客
* @param {String} word 查询关键字
* @param {Number} page 页码
* @param {Number} size 每页返回多少条
* */
export const Search=({word,page,size})=>{
  return request({
    url:`${base.host}/search`,
    method:'get',
    params:{word,page,size}
  })
};

/*
* 获取全部分类
* */
export const getFile=()=>{
  return request({
    url:`${base.host}/file`,
    method:'get'
  })
};

/*
* 获取指定分类id下的所有博客
* @param {Number} id
* */
export const getFileDetail=id=>{
  return request({
    url:`${base.host}/file/${id}`,
    method:'get'
  })
};

/*
* 获取指定博客id的内容等信息
* @param {Number} id
* */
export const getBlog=id=>{
  return request({
    url:`${base.host}/blog/${id}`,
    method:'get'
  })
};

/*
* 获取指定博客id下的全部评论
* @param {Number} blogId
* */
export const getComment=blogId=>{
  return request({
    url:`${base.host}/blog/${blogId}/comment`,
    method:'get'
  })
};

/*
* 根据博客id增加用户评论
* @param {Number} blogId
* @param {Object} data
* */
export const addComment=(blogId,data)=>{
  return request({
    url:`${base.host}/blog/${blogId}/comment`,
    method:'post',
    params:data
  })
};

/*
* 回复评论
* @param {Number} blogId
* @param {commentId}
* @param {Object} data
* */
export const replyComment=(blogId,commentId,data)=>{
  return request({
    url:`${base.host}/blog/${blogId}/comment/${commentId}`,
    method:'post',
    params:data
  })
}


/*
* 根据id增加博客浏览次数
* @param {Number} id
* */
export const addScan=id=>{
  return request({
    url:`${base.host}/blog/${id}/number`,
    method:'post'
  })
};

/*
* 添加留言
* @param {Boolean} access 留言用户 false为游客，true为博主
* @param {String} con 留言内容
* */
export const addWord=({access,con})=>{
  return request({
    url:`${base.host}/word`,
    method:'post',
    params:{access,con}
  })
}

/*
* 回复留言
* @param {Boolean} access 留言用户 false为游客，true为博主
* @param {String} con 留言内容
* @param {Number} commentId 待回复留言的id
* */
export const replyWord=({access,con,commentId})=>{
  return request({
    url:`${base.host}/word/${commentId}`,
    method:'post',
    params:{access,con}
  })
}

/*
* 查询留言
* @param {Number} page 页码
* @param {Number} size 每页返回多少条
* */
export const getWord=({page,size})=>{
  return request({
    url:`${base.host}/word`,
    method:'get',
    params:{page,size}
  })
}

/*
* 查询全部留言
* */
export const getAllWord=()=>{
  return request({
    url:`${base.host}/word`,
    method:'get'
  })
}

/*
* 查询回复的留言
* @param {Number} page 页码
* @param {Number} size 每页返回多少条
* @param {Number} commentId 待留言Id
* */
export const getWordDetail=({page,size,commentId})=>{
  return request({
    url:`${base.host}/word/${commentId}`,
    method:'get',
    params:{page,size}
  })
}

/*
* 查询全部回复的留言
* */
export const getAllWordDetail=({commentId})=>{
  return request({
    url:`${base.host}/word/${commentId}`,
    method:'get'
  })
}


/*
* 验证是否登陆
* */
export const checkLogin=()=>{
  return request({
    url:`${base.host}/check-login`,
    method:'post'
  })
}


/*
* 用户登陆
* */
export const login=({user,pwd,code})=>{
  return request({
    url:`${base.host}/login`,
    method:'post',
    params:{user,pwd,code}
  })
}

/*
* 查询全部博客
* */
export const getAllBlog=()=>{
  return request({
    url:`${base.host}/admin/blog`,
    method:'get'
  })
}

export const test=()=>{
  return request({
    url:`${base.host}/test/100`,
    method:'get'
  })
}
