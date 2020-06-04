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
	findPageMaterials:'/common/findPageMaterials',//查找素材
	findMaterialDetail:'/common/findMaterialDetail/',//素材详情
	getVipTemplates:'/common/getVipTemplates',//获取vip信息
	getScoreTemplates:'/common/getScoreTemplates',//获取积分模板
	addMaterialStore:'/material/addMaterialStore',//素材
	addFollowFile:'/store/addOrUpdate',//添加或者更新收藏夹
	findStores:'/store/findStores',//查找收藏夹
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
