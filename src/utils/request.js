import axios from "axios";
import { notification } from "antd";
const token = localStorage.getItem("token");

// 创建 axios 实例
const Service = axios.create({
  baseURL: "", // api base_url
  // baseURL: '/api', // api base_url
  withCredentials: true,
  timeout: 60000, // 超时时间：6分钟 注意和nginx配置保持一致
  maxBodyLength: 31457280, // 请求体最大长度 单位B，上限30MB 注意和nginx配置保持一致
  maxContentLength: 5242880, // 响应的最大长度，单位 B ，5MB，针对文件或者表格数据大量返回 注意和nginx配置保持一致
});

const err = (error) => {
  if (error.response) {
    const data = error.response.data;
    if (error.response.status === 401) {
      // 登录失效
      localStorage.setItem("token", "");
    } else if (error.response.status === 402) {
      // 缺少权限
      notification.error({
        message: "您没有权限查看当前信息",
        description: "请联系管理员获取数据权限",
        duration: null,
      });
    } else if (error.response.status === 403) {
      notification.error({
        message: "Forbidden",
        description: data.message,
        duration: null,
      });
    } else if (error.response.status === 504) {
      // 请求超时
      notification.error({
        message: "提示",
        description: "请求时间较长，请稍后查看",
        duration: null,
      });
    } else if (error.response.status === 500) {
      // 服务端报错
      notification.error({
        message: "提示",
        description: "服务异常",
        duration: null,
      });
    }
  } else {
    // 请求超时
    notification.error({
      message: "提示",
      description: "请求时间较长，请稍后查看",
      duration: null,
    });
  }
  return Promise.reject(error);
};

// 请求拦截，设置token
Service.interceptors.request.use(
  (config) => {
    // config.headers['Access-Token'] = token || ''

    // get/delete/head/options请求通过query形式(params) 传参，post/put/patch请求通过request body形式(data)传参
    const method = config.method;
    let type = "data";
    if (
      method === "get" ||
      method === "delete" ||
      method === "head" ||
      method === "options"
    ) {
      type = "params";
    } else {
      config[type] = config[type] && config[type]["params"];
    }
    if (!config[type]) {
      config[type] = {};
    }
    // 设置token
    config.headers = {
      Authorization: token,
    };

    return config;
  },
  (err) => {
    return Promise.reject({
      message: "当前网络不佳，请稍后再试-1" + err,
    });
  }
);

// 处理响应
Service.interceptors.response.use((response) => {
  return response.data;
}, err);

export default function Requests(options = {}) {
  return Service.request({ ...options });
}

// export { requests as Axios };
