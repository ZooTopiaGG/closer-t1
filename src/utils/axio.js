import axios from 'axios'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import feConfig from '../utils/api';
import Store from '../store'
const axio = axios.create({ 
        baseURL: process.env.BASE_API, // node环境的不同，对应不同的baseURL
         timeout: 15000, // 请求的超时时间
          //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
          // headers: { 
          // "Content-Type": "application/x-www-form-urlencoded"
          // },
         withCredentials: true // 允许携带cookie
    })
    // http request 拦截器 
axio.interceptors.request.use(
    config => {
        console.log(config)
        let reqUrl = feConfig.serverDevUrl + config.url
        if (/a-sandbox.tiejin/.test(window.location.href)) {
            reqUrl = feConfig.serverDevUrl + config.url;
        } else if (/a.tiejin/.test(window.location.href)) {
            reqUrl = feConfig.serverUrl + config.url;
        }
        // //console.log("requrl", reqUrl)
        config.url = reqUrl;
        if (!Store.state.IS_APP) {
            config.headers['Closer-Agent'] = 'Closer-H5';
        } else {
            if (Store.state.UA.indexOf("closer-ios") > -1) {
                config.headers['Closer-Agent'] = 'Closer-Ios';
            } else if (Store.state.UA.indexOf('closer-android') > -1) {
                config.headers['Closer-Agent'] = 'Closer-Android';
            }
        }
        if (Cookies.get("uid")) {
            config.headers['X-Udid'] = Cookies.get("uid");
        }
        if (Cookies.get("aid")) {
            config.headers['X-Adid'] = Cookies.get("aid");
        }
        if (Cookies.get("GroukAuth") && config.url.indexOf("auth") == -1 && config.url.indexOf("account") == -1 || Cookies.get("GroukAuth") && config.url.indexOf("closer_account.bind_phone") != -1) {
            config.headers.Authorization = Cookies.get("GroukAuth");
        }

        Indicator.open()
        return config;

    },
    err => {
        Indicator.close()
        return Promise.reject(err).catch(err);
    });
// http response 拦截器 
axio.interceptors.response.use(
    response => {
        Indicator.close()
        console.log('response：',response);
        return response;
    },
    (err) => {
        let Promise = require('promise-polyfill').default;
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '请求错误'
                    break

                case 401:
                    err.message = '未授权，请登录'
                    router.push({ name: 'worldcupIndex' })
                    break

                case 403:
                    err.message = '拒绝访问'
                    router.push({ name: 'worldcupIndex' })
                    break

                case 404:
                    err.message = `请求地址出错: ${err.response.config.url}`
                    break

                case 408:
                    err.message = '请求超时'
                    break

                case 500:
                    err.message = '服务器内部错误'
                    break

                case 501:
                    err.message = '服务未实现'
                    break

                case 502:
                    err.message = '网关错误'
                    break

                case 503:
                    err.message = '服务不可用'
                    break

                case 504:
                    err.message = '网关超时'
                    break

                case 505:
                    err.message = 'HTTP版本不受支持'
                    break

                default:
            }
        } else {
            err.message = '网络错误，请稍后再试！'
        }
        if (err && err.response && err.response.data && err.response.data.message) {
            console.warn(err.response.data.message)
        } else {
            console.warn(err.message)
        }
        Indicator.close()
        return Promise.reject(err).catch(err)
    });
export default axio