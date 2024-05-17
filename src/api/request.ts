import axios,{type InternalAxiosRequestConfig, type AxiosResponse} from "axios";

//创建 axios 实例
const service = axios.create({
    baseURL: "/dev-api",
    timeout: 50000,
    headers: { "Content-Type": "application/json;charset=utf-8" }
})

// 请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    
    return config;
},
(error: any) => {
    return Promise.reject(error);
}
)

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
      },
      (error: any) => {
        
        return Promise.reject(error.message);
      }
);

// 导出 axios 实例
export default service;