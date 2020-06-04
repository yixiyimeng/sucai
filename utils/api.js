import $http from './request'
import {
	basePath
} from '@/utils/index.js'

function JsontoForm(params) {
	let str = [];
	for (let key in params) {
		str.push(key + "=" + params[key])
	}
	return str.join('&');

}
export const api = {
	reg: '/common/registe', //注册
	login: '/common/login', //登录
	getcode: '/common/sendSmsCode/', //发送验证码
	isMobileAvailabled: '/common/isMobileAvailabled/', //验证注册手机号码的正确性
	isNickNameAvailabled: '/common/isNickNameAvailabled',
	isLoginAvailabled: '/common/isLoginAvailabled', //验证登录手机号的正确性
	findCollectionsInfo: '/common/findCollectionsInfo/', //专辑信息
	addFollowfile: '/store/addOrUpdate/', //新增收藏夹
}

export function getajax(url, params) {

	if (params) {
		let myparams = '?' + JsontoForm(params);
		url = url + myparams
	}
	return $http.get(url)
}
export function postajax(url, params) {
	// let myparams = JsontoForm(params);
	return $http.post(url, params)
}
