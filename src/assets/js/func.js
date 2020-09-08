import axios from "axios";
import base from '../../api/base'


const getToken=function getToken() {
  let url=`${base.host}/csrftoken`;
  axios.get(url).then(res=>{
  });
};

export default getToken;


