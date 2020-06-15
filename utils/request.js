import {
	basePath
} from '@/utils/index.js'
// var Fly = require("./wx")
var axios = require("./axios.min")
axios.defaults.timeout = 6000; //响应时间
axios.defaults.withCredentials = true; //让请求头携带参数cookie
axios.defaults.baseURL = basePath; //配置接口地址  
const request = axios.create()
// request.config.timeout = 60 * 1000
// request.config.baseURL = basePath
// request.config.withCredentials =true;
request.interceptors.request.use((request) => {
	console.log('request' + JSON.stringify(request))
	//request.headers["content-type"] = "application/x-www-form-urlencoded";
	if (uni.getStorageSync('token')) {
		request.headers["Authorization"] = uni.getStorageSync('token')
	}
	// uni.showLoading({
	// 	title: '拼命加载中...'
	// })

	return request
})

request.interceptors.response.use(
	(response, promise) => {
		console.log(response)
		if (response && response.headers && response.headers['set-cookie']) {
			uni.setStorage({
				key: 'cookiekey',
				data: response.headers['set-cookie'][0]
			});
		}
		// wx.hideLoading();
		if (response.data.code != 10000) {
			console.log(12233)
			uni.showToast({
				title: response.data.message || '请求发生错误了',
				icon: 'none'
			})
			if (response.data.code == 10015) {
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}, 100)
			}
		} else {
			
		}
		return response.data
	},
	(err, promise) => {
		// uni.hideLoading()
		return Promise.reject(err)
	}
)

export default request
