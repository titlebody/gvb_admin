import axios from "axios";



export function getHotList(name) {
  return axios.get("https://uapis.cn/api/hotlist?type="+name);
}