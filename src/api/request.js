import axios from 'axios';
import cookies from 'vue-cookies'

axios.defaults.timeout=10000;
axios.defaults.withCredentials=true;

let csrftoken='';


// 请求拦截器
axios.interceptors.request.use(config=>{
  console.log('csrftoken is',cookies.get('csrftoken'));
  if(cookies.get('csrftoken')){
      csrftoken=cookies.get('csrftoken');
    }
    config.headers.common['X-CSRFtoken']=csrftoken;
  return config;
  },error=>{
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(response=>{
  if(response.status===200){
    return Promise.resolve(response);
  }
  else{
    return Promise.reject(response);
  }
});

export function request({url,method,params={},headers={}}){
  switch (method){
    case 'get':
      return new Promise((resolve, reject) => {
        axios.get(url,{params}).then(res=>{
          resolve(res.data)
        }).catch(error=>{
          reject(error.data);
        })
      })
    case 'post':
      return new Promise((resolve, reject) => {
        axios.post(url,params,{headers}).then(res=>{
          resolve(res.data)
        }).catch(error=>{
          reject(error.data)
        })
      })
    case 'delete':
      break;
    case 'put':
      break;
    default:
      break;
  }
}

