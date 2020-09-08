import axios from 'axios';
import cookies from 'vue-cookies'

axios.defaults.timeout=10000;
axios.defaults.withCredentials=true;

let csrftoken='';


// 请求拦截器
axios.interceptors.request.use(
  config=>{
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


export function GET(url, params={}) {
  return new Promise(((resolve, reject) => {
    axios.get(url,{
      params:params
    }).then(res=>{
      resolve(res.data);
    }).catch(error=>{
      reject(error.data);
    })
  }))
}

export function POST(url, data,contentType='applications/json') {
  return new Promise(((resolve, reject) => {
    axios.post(url,data,{
      headers:{contentType:contentType
    }}).then(res=>{
      resolve(res.data);
    }).catch(error=>{
      reject(error.data);
    })
  }))
}

export function PUT(url, data) {
  return new Promise(((resolve,reject)=>{
    axios.put(url,data).then(res=>{
      resolve(res.data)
    }).catch(error=>{
      reject(error.data)
    })
  }))
}

export function DELETE(url, data) {
  return new Promise(((resolve,reject)=>{
    axios.delete(url,data).then(res=>{
      resolve(res.data)
    }).catch(error=>{
      reject(error.data)
    })
  }))
}
