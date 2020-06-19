<template>
	<view class="flex flex-direction pageview bg-white">
		<cu-custom :isHome='true'>
			<view slot="content">登录</view>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center margin-top">
			<view class="cu-item" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in 2" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{index==0?'密码登录':'快捷登录'}}
			</view>
		</scroll-view>
		<view class="flex-sub">
			<form class="margin-top">
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="输入注册时用的手机号码" name="input" @blur="changeMobile"></input>
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
				<navigator hover-class="none" class="text-orange" url="/pages/reg/reg"><text class="text-grey">还没有注册账号？</text><text>立即注册</text><text
					 class="cuIcon-right"></text></navigator>
				<!-- <navigator hover-class="none" class="text-orange" url="/pages/login/login"><text>忘记密码</text><text class="cuIcon-right"></text></navigator> -->
			</view>
		</view>
		<view class="cu-modal" :class="showModal?'show':''">
			<view class="cu-dialog">
				<view class="imgbox">
					<image :src="qrimg" mode="widthFix"></image>
					<!-- <view class="cu-bar justify-end text-white">
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close "></text>
						</view>
					</view> -->
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">扫描二维码登录</view>
				</view>
			</view>
		</view>
		<!-- <view class="otherway">
			<view class="title flex align-center">
				<view class="line flex-sub"></view>
				<view>第三方账号登录</view>
				<view class="line flex-sub"></view>
			</view>
			<view class="wechat" @tap="showWxlogin">
				<image src="../../static/wechat.png" mode="widthFix"></image>
				<view>微信登录</view>
			</view>

		</view> -->

	</view>
</template>

<script>
	import {
		regPhone,
		regLoginPwd
	} from '@/utils/index';
	import {
		basePath
	} from '@/utils/index.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				registeMobile: '',
				nickName: '',
				verifyNum: '',
				password: '',
				codetxt: '获取验证码',
				num: 60,
				timer: null,
				isMobileAvailabled: false, //手机号是否可用
				isCheckmobile: false, //是否正在校验手机号码
				isChecknickName: false, //是否校验昵称
				isNickNameAvailabled: false, //昵称是否可用
				TabCur: 0,
				showModal: false,
				wxqrtimer: null,
				qrimg: ''
			};
		},
		components: {},
		computed: {
			isAble() {
				return (this.isMobileAvailabled && (this.verifyNum || this.password))
			},

		},
		destroyed() {
			if (this.timer) {
				clearInterval(this.timer)
				this.timer = null;
			}
			if (this.wxqrtimer) {
				clearInterval(this.wxqrtimer)
				this.wxqrtimer = null;
			}
			this.codetxt = '获取验证码';
			this.num = 60;
		},
		methods: {
			...mapMutations(['SET_LOGIN']),
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
							// uni.setStorageSync('userInfo', da.userInfo);
							uni.setStorageSync('token', da.userInfo.token)
							this.SET_LOGIN(da.userInfo)
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
			},
			showWxlogin() {
				this.$getajax(this.$api.getWxqrUrl, {
					operation: 'login'
				}).then((da) => {
					if (da.code == 10000) {
						this.qrimg = da.url;
						this.wxqrtimer = setInterval(() => {
							this.wechatCheckLogin(da.sceneStr);
						}, 3000);
						this.showModal = true;
					}

				})
			},
			wechatCheckLogin(sceneStr) {
				this.$getajax(this.$api.wechatCheckLogin, {
					sceneStr
				}).then((da) => {
					if (da.code == 10000) {
						this.hideModal();

					}
				})
			},
			hideModal() {
				this.showModal = false;
				if (this.wxqrtimer) {
					clearInterval(this.wxqrtimer);
					this.wxqrtimer = null
				}
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


	.otherway {
		text-align: center;
		font-size: 26upx;
		padding-bottom: 30upx;
		// position: absolute;
		// bottom: 20px;
		// left: 0;
		// right: 0;
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
		width: 200upx;
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

	.imgbox {
		width: 100%
	}
</style>
