<template>
	<view class="flex flex-direction pageview bg-white">
		<!-- <view class="group flex-sub">
			<view class="row flex">
				<input type="text" placeholder="请输入手机号码" class="flex-sub" @input="changeMobile">
			</view>
			<view class="row flex">
				<input type="text" placeholder="请输入验证码" class="flex-sub" @input="changeCode">
				<view class="getcode" @tap="getcode">{{codetxt}}</view>
			</view>
			<view class="margin-top-lg" :class="[isAble?'submitBtn':'defaultBtn']" @tap="submitLogin">登录</view>
			<view class="text-orange text-right margin-top">收不到验证码？</view>
		</view> -->
		<scroll-view scroll-x class="bg-white nav text-center margin-top">
			<view class="cu-item" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in 2" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{index==0?'密码登录':'快捷登录'}}
			</view>
		</scroll-view>
		<form class="margin-top">
			<!-- <view class="cu-form-group ">
				<view class="title">昵称</view>
				<input placeholder="请输入昵称" name="input" @blur="checknickName"></input>
				<image v-if="isChecknickName" src="#" mode="widthFix" class="loading text-orange"></image>

			</view> -->
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="输入框带标签" name="input" @blur="changeMobile"></input>
				<image v-if="isCheckmobile" src="#" mode="widthFix" class="loading text-orange"></image>
			</view>
			<view class="cu-form-group" v-if="TabCur==1">
				<view class="title">验证码</view>
				<input placeholder="输入验证码" name="input" v-model.lazy="verifyNum"></input>
				<button class='getcode cu-btn shadow' :class="{'bg-orange':isMobileAvailabled&&!timer}" @tap="getcode">{{codetxt}}</button>
			</view>
			<view class="cu-form-group solid-bottom" v-if="TabCur==0">
				<view class="title">密码</view>
				<input placeholder="5~20位英文、数字或符号，区分大小写" name="input" type="password" v-model="password"></input>
			</view>
		</form>
		<view class="margin-top-lg submitBtn cu-btn shadow" :class="{'bg-orange':isAble}" @tap="submitLogin">登录</view>
		<view class="margin-lg flex justify-between">
			<navigator class="text-orange" url="/pages/reg/reg">去注册&gt;</navigator>
			<navigator class="text-orange" url="/pages/login/login">忘记密码&gt;</navigator>
		</view>
		<view class="otherway">
			<view class="title flex align-center">
				<view class="line flex-sub"></view>
				<view>第三方账号登录</view>
				<view class="line flex-sub"></view>
			</view>
			<button class="wechat" hover-class="btn-hover" open-type="getPhoneNumber" withCredentials="true" lang="zh_CN"
			 @getphonenumber="wxGetPhoneNumber">
				<image src="../../static/wechat.png" mode="widthFix"></image>
				<view>微信登录</view>
			</button>

		</view>

	</view>
</template>

<script>
	import {
		regPhone,
		regLoginPwd
	} from '@/utils/index';

	export default {
		data() {
			return {
				registeMobile: '',
				nickName: '',
				verifyNum: '',
				password: '',
				codetxt: '验证码',
				num: 60,
				timer: null,
				isMobileAvailabled: false, //手机号是否可用
				isCheckmobile: false, //是否正在校验手机号码
				isChecknickName: false, //是否校验昵称
				isNickNameAvailabled: false, //昵称是否可用
				TabCur: 0
			};
		},
		components: {},
		computed: {
			isAble() {
				return (this.isMobileAvailabled && (this.verifyNum || this.password))
			},
		},
		methods: {
			changeMobile(e) {
				if (this.registeMobile != e.detail.value) {
					this.registeMobile = e.detail.value;
					if (regPhone(this.registeMobile)) {
						this.checkmobile();
					}
				}

			},
			changeCode(e) {
				this.verifyNum = e.detail.value;
			},
			getcode() {
				let $me = this;
				if (this.num < 60) {
					return false;
				}
				if (regPhone(this.registeMobile)) {
					/* 设置倒计时 */
					$me.codetxt = this.num + 's';
					this.timer = setInterval(function() {
						if ($me.num == 1) {
							clearInterval($me.timer);
							$me.timer = null;
							$me.codetxt = '验证码';
							$me.num = 60;
						} else {
							$me.num--;
							$me.codetxt = $me.num + 's';
						}
					}, 1000);
					/* 获取验证码 */
					this.$getajax(this.$api.getcode, {
						mobile: this.registeMobile,
						codetype: 'login' // login 登录
					}).then(da => {
						uni.showToast({
							title: da.message,
							icon: 'none'
						});
					})
				} else {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none'
					});
				}
			},
			submitLogin() {
				// if(regLoginPwd(this.password)){
				// 	console.log('12')
				// }
				if (this.isAble) {
					/* 校验密码 */
					let param = {};
					// let param = {
					// 	registeMobile: this.registeMobile,
					// 	verifyNum: this.verifyNum,
					// 	password: this.password,
					// 	nickName: this.nickName,
					// 	operation: 'password/verifynum' //  wechat 微信登录
					// }
					if (this.TabCur == 0) {
						param = {
							password: this.password,
							operation: 'password'
						}
					} else {
						param = {
							verifyNum: this.verifyNum,
							operation: 'verifynum'
						}
					}
					this.$postajax(this.$api.login, Object.assign({}, param, {
						registeMobile: this.registeMobile
					})).then(da => {
						if (da.code == 10000) {
							uni.setStorageSync('userInfo', da.userInfo);
							uni.setStorageSync('token', da.userInfo.token)
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}, 500)
						} else {
							uni.showToast({
								title: da.message,
								icon: 'none'
							});
						}
					})
				}
			},
			checkmobile() {
				this.isCheckmobile = true;
				this.$getajax(this.$api.isLoginAvailabled, {
					mobile: this.registeMobile
				}).then((da) => {
					if (da.code == 10000) {
						this.isMobileAvailabled = true;
					} else {
						this.isMobileAvailabled = false;
					}
				}).catch(() => {
					this.isMobileAvailabled = false;
				}).
				finally(() => {
					this.isCheckmobile = false;
				})
			},
			checknickName(e) {
				if (this.nickName != e.detail.value) {
					this.nickName = e.detail.value;
					if (this.nickName) {
						this.isNickNameAvailabled = true;
					} else {
						this.isNickNameAvailabled = false
					}
				}

			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			}

		}
	}
</script>

<style lang="scss">
	page,
	.pageview {
		height: 100%;
		width: 100%;
	}

	.group {
		margin: 0 30upx;
		font-size: 26upx;

		.row {
			border-bottom: 1px solid #e5e5e5;
			margin: 0 15upx;
			padding: 25upx 20upx;

			.getcode {
				color: #fff;
				width: 165upx;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				border-radius: 20upx;
				background-image: linear-gradient(90deg, #fa9649, #fc713a);
			}
		}
	}

	.otherway {
		text-align: center;
		font-size: 26upx;
		position: absolute;
		bottom: 20px;
		left: 0;
		right: 0;
		color: #878787;

		.title {
			margin: 0 30upx;
			font-weight: bold;

			.line {
				height: 1px;
				background: #e5e5e5;
			}

			&>view:nth-child(2) {
				margin: 0 30upx;
			}
		}

		.wechat {
			background: #fff;
			font-size: 26upx;
			border: none;
		}

		image {
			display: block;
			margin: 35upx auto 25upx;
			width: 116upx;
		}

		navigator {
			display: inline-block;
		}
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.getcode {
		width: 165upx;
	}

	.submitBtn {
		line-height: 100upx;
		height: 100upx;
		border-radius: 16upx;
		font-size: 32upx;
		display: block;
		margin-left: 40upx;
		margin-right: 40upx;
	}

	.loading {
		height: 20px;
		width: 20px;
	}
</style>
