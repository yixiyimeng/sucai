<template>
	<view class="flex flex-direction pageview">
		<view class="group flex-sub">
			<view class="row flex">
				<input type="text" placeholder="请输入手机号码" class="flex-sub" @input="changeMobile">
			</view>
			<view class="row flex">
				<input type="text" placeholder="请输入验证码" class="flex-sub" @input="changeCode">
				<view class="getcode" @tap="getcode">{{codetxt}}</view>
			</view>
			<view class="margin-top-lg" :class="[isAble?'submitBtn':'defaultBtn']" @tap="submitLogin">登录</view>
			<view class="text-orange text-right margin-top">收不到验证码？</view>
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
			<view class="tag margin-top margin-bottom-lg">
				登录即代表你同意 <navigator url="" class="text-orange">《服务协议》</navigator>
				和<navigator url="" class="text-orange">《隐私政策》</navigator>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		regPhone
	} from '@/utils/index';
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	let num = 60;
	export default {
		data() {
			return {
				phone: '',
				verify: '',
				codetxt: '获取验证码'
			};
		},
		components: {
		},
		computed: {
			isAble() {
				if (regPhone(this.phone) && this.verify) {
					return true
				} else {
					return false
				}

			},
			...mapState(['session_key', 'openid'])
		},
		methods: {
			...mapMutations(['uploadPhone', 'uploadMemberId', 'uploadUserInfo']),
			changeMobile(e) {
				this.phone = e.detail.value;
			},
			changeCode(e) {
				this.verify = e.detail.value;
			},
			getcode() {
				let $me = this;
				if (num < 60) {
					return false;
				}
				if (regPhone(this.phone)) {
					/* 设置倒计时 */
					$me.codetxt = num + 's';
					var timer = setInterval(function() {
						if (num == 1) {
							clearInterval(timer);
							$me.codetxt = '获取验证码';
							num = 60;
						} else {
							num--;
							$me.codetxt = num + 's';
						}
					}, 1000);
					/* 获取验证码 */
					this.$postajax(this.$api.getcode + this.phone).then(da => {
						uni.showToast({
							title: da.msg,
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
			wxGetPhoneNumber(e) {
				var $me = this;
				let param = {
					session_key: this.session_key,
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv
				};

				console.log("参数" + JSON.stringify(param))
				this.$postajax(this.$api.decrypt, param)
					.then(res => {
						if (res.code == 0 && res.data.phoneNumber) {
							this.login({
								phone: res.data.phoneNumber,
								openid: this.openid
							})

						} else {
							uni.showToast({
								title: '换取手机号码失败',
								icon: 'none'
							});
						}


					})
					.catch(err => {

					});
			},
			submitLogin() {
				let param = {
					phone: this.phone,
					verify: this.verify
				}
				this.login(param)
			},
			/* 登录 */
			login(param) {
				this.$postajax(this.$api.login, param).then(da => {
					if (da.code == 0) {
						this.getUserinfo()
					}
					uni.showToast({
						title: da.msg,
						icon: 'none'
					});
				})
			},
			getUserinfo() {
				var $me = this;
				$me.$postajax($me.$api.getUserinfo)
					.then(res => {
						if (res.code == 0) {
							if (res.data.phone) {
								$me.uploadPhone(res.data.phone)
							}
							if (res.data.id) {
								$me.uploadMemberId(res.data.id)
							}
							$me.uploadUserInfo(res.data);
							// uni.switchTab({
							// 	url: '/pages/index/index'
							// });
							uni.navigateBack({
								delta: 1
							});
						}
					})
					.catch(err => {

					});
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
</style>
