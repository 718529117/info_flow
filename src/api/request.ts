//axios二次封装：使用请求拦截器和响应拦截器
import axios from "axios"
//消息提示
import { ElMessage } from 'element-plus'
// import useUserStore from '@/store/modules/user'
//1.利用create方法，创建axios实例（其他的配置：基础路径、超时时间...）
let request = axios.create({
    // baseURL: '/api_xc',
    timeout: 5000,
})

request.interceptors.request.use((config) => {
    // let userStore = useUserStore()
    // if (userStore.token) {
    //     config.headers.token = userStore.token
    // }
    //返回配置对象，config配置对象，headers属性请求头，携带公共参数
    return config;
});

request.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    //失败回调，处理http网络错误
    //存储网络错误信息
    let message = ''
    let status = error.response.status;
    switch (status) {
        case 401:
            message = 'token过期'
            break;
        case 403:
            message = '无权访问'
            break;
        case 404:
            message = '请求地址错误'
            break;
        case 500:
            message = '服务器故障'
            break;
        default:
            message = '网络出现问题'
            break;
    }
    ElMessage({
        type: 'error',
        message
    })

    return Promise.reject(error)
})

export default request;