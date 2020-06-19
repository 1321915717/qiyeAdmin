import axios from 'axios';
import router from '../router';
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000,
	headers: {
	    'Content-Type': 'application/json;charset=UTF-8'
	  }
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
		
        if (response.status === 200) {
			
			if(response.data.errno==-100){  //这里拦截 如果返回100证明session过期 路由跳转到login页面
				
				router.push("/login")
			}
            return response.data;
        }
		else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
