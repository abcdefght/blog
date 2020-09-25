import {GET,POST} from "./request";
import base from './base';


/*
* 获取博主全部归档博客
* */
export const getDateBlog=()=>{
  return GET(`${base.host}/date`);
};

/*
* 获取博主全部标签信息
* */
export const getTagBlog=()=>{
  return GET(`${base.host}/tag`);
};

/*
* 获取博主信息
* */
export const getUser=()=>{
  return GET(`${base.host}/user`);
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
* @param {Number} size
* */
export const getRecommend=({page,size})=>{
  return GET(`${base.host}/blog/recommend`,{page,size})
};

/*
* 分页查询指定日期的博客
* @param {String} date
* @param {Number} page
* @param {Number} size
* */
export const getUserDate=({date,page,size})=>{
  return GET(`${base.host}/date/${date}`,{page,size});
};  // 分页查询用户归档博客

/*
* 分页查询指定标签的博客
* @param {Number} page 页码
* @param {String} tag 标签名
* @param {Number} size 每页返回多少条
* */
export const getUserTag=({tag,page,size})=>{
  return GET(`${base.host}/tag/${tag}`,{page,size});
};

/*
* 搜素博客
* @param {String} word 查询关键字
* @param {Number} page 页码
* @param {Number} size 每页返回多少条
* */
export const Search=({word,page,size})=>{
  return GET(`${base.host}/search`,{word,page,size});
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
* 回复评论
* @param {Number} blogId
* @param {commentId}
* @param {Object} data
* */
export const replyComment=(blogId,commentId,data)=>{
  return POST(`${base.host}/blog/${blogId}/comment/${commentId}`,data);
}


/*
* 根据id增加博客浏览次数
* @param {Number} id
* */
export const addScan=id=>{
  return POST(`${base.host}/blog/${id}/number`,{});
};

/*
* 添加留言
* @param {Boolean} access 留言用户 false为游客，true为博主
* @param {String} con 留言内容
* */
export const addWord=({access,con})=>{
  return POST(`${base.host}/word`,{access,con});
}

/*
* 回复留言
* @param {Boolean} access 留言用户 false为游客，true为博主
* @param {String} con 留言内容
* @param {Number} commentId 待回复留言的id
* */
export const replyWord=({access,con,commentId})=>{
  return POST(`${base.host}/word/${commentId}`,{access,con});
}

/*
* 查询留言
* @param {Number} page 页码
* @param {Number} size 每页返回多少条
* */
export const getWord=({page,size})=>{
  return GET(`${base.host}/word`,{page,size});
}

/*
* @param {Number} page 页码
* @param {Number} size 每页返回多少条
* @param {Number} commentId 待留言Id
* */
export const getWordDetail=({page,size,commentId})=>{
  return GET(`${base.host}/word/${commentId}`,{page,size});
}


export const login=({user,pwd,code})=>{
  return POST(`${base.host}/login`,{user,pwd,code});
}

export const test=()=>{
  return GET(`${base.host}/test/100`,{});
}

export const getAllBlog=()=>{
  return GET(`${base.host}/admin/blog`,{});
}
