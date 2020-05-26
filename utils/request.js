import {
	basePath
} from '@/utils/index.js'
var Fly = require("./wx")
const request = new Fly()

request.config.timeout = 60 * 1000
request.config.baseURL = basePath
//request.config.baseURL ='https://m.2yahua.com/index.php?s=/api/'
request.interceptors.request.use((request) => {
	console.log('request' + JSON.stringify(request))
	request.headers["content-type"] = "application/x-www-form-urlencoded";
	if (uni.getStorageSync('cookiekey')) {
		request.headers["Cookie"] = uni.getStorageSync('cookiekey')
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
		if (response.data.code == 0 || response.request.url == '/api/member/userinfo') {
			return promise.resolve(response.data)
		} else {
			uni.showToast({
				title: response.data.msg || '请求发生错误了',
				icon: 'none'
			})
			// if (response.data.code == 4004) {
			// 	setTimeout(() => {
			// 		uni.redirectTo({
			// 			url: '/pages/login/login'
			// 		})
			// 	}, 500)
			// }
			return promise.reject(err)
		}
		// return promise.resolve(response.data)
	},
	(err, promise) => {
		uni.hideLoading()
		// uni.showToast({
		// 	title: err.message,
		// 	icon: 'none'
		// })
		return promise.reject(err)
	}
)

export default request
