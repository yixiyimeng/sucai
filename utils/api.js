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
	findPageMaterials: '/common/findPageMaterials', //查找素材
	findMaterialDetail: '/common/findMaterialDetail/', //素材详情
	getVipTemplates: '/common/getVipTemplates', //获取vip信息
	getScoreTemplates: '/common/getScoreTemplates', //获取积分模板
	addMaterialStore: '/material/addMaterialStore', //素材
	removeMaterialStore:'/material/removeMaterialStore',//删除收藏素材
	addFollowFile: '/store/addOrUpdate', //添加或者更新收藏夹
	findStores: '/store/findStores', //查找收藏夹
	delStores: '/store/delete', //删除收藏夹
	findResource: '/common/findChilds/', //根据专辑id获取子专辑
	createPayQrcode: '/wxpay/createPayQrcode', //获取二维码
	showQrcode: '/wxpay/showQrcode', //显示二维码
	getPayState: '/wxpay/getPayState', //查询支付状态
	findStoredMaterials: '/material/findStoredMaterials', //查询收藏素材
	getWxqrUrl: '/wxutil/getWxqrUrl', //获取登录微信二维码
	wechatCheckLogin: '/wxutil/wechatCheckLogin', //微信登录状态
	collection: '/collection/addFollow/', //收藏专辑
	cancelcollection: '/collection/cancelFollow/', //取消专辑

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
