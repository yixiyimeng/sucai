<template>
	<view class="flex flex-direction bg-white pageview">
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">昵称</view>
				<input placeholder="请输入昵称" name="input" v-model="nickName" @blur="checknickName"></input>
				<image v-if="isChecknickName" src="#" mode="widthFix" class="loading text-orange"></image>

			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="填写你常用的手机号作为登录账号" name="input" @blur="changeMobile"></input>
				<image v-if="isCheckmobile" src="#" mode="widthFix" class="loading text-orange"></image>
				<!-- <text class="cuIcon-loading2 text-orange"></text> -->
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input placeholder="输入验证码" name="input" v-model.lazy="verifyNum"></input>
				<button class='getcode cu-btn shadow' :class="{'bg-orange':isMobileAvailabled&&!timer}" @tap="getcode">{{codetxt}}</button>
			</view>
			<view class="cu-form-group solid-bottom">
				<view class="title">密码</view>
				<input placeholder="5~20位英文、数字或符号，区分大小写" name="input" type="password" v-model="password"></input>
			</view>
		</form>
		<view class="margin-top-lg submitBtn cu-btn shadow" :class="{'bg-orange':isAble}" @tap="submitLogin">注册</view>
		<view class="margin-lg">
			<navigator class="text-orange" url="/pages/login/login" hover-class="none"><text class="text-grey">已有账号，</text><text>去登录</text><text
				 class="cuIcon-right"></text></navigator>
		</view>
	</view>
</template>

<script>
	import {
		regPhone
	} from '@/utils/index';

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
				isNickNameAvailabled: false //昵称是否可用
			};
		},
		components: {},
		computed: {
			isAble() {
				return (this.isMobileAvailabled && this.verifyNum && this.isNickNameAvailabled && this.password)
			},
		},
		destroyed() {
			if (this.timer) {
				clearInterval(this.timer)
				this.timer = null;
			}
			this.codetxt = '获取验证码';
			this.num = 60;
		},
		methods: {
			changeMobile(e) {
				if (this.registeMobile != e.detail.value) {
					this.registeMobile = e.detail.value;
					console.log(this.registeMobile)
					if (regPhone(this.registeMobile)) {
						this.checkmobile();
					} else {
						this.isMobileAvailabled = false;
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
						codetype: 'sign' // login 登录
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
				console.log(this.isAble)
				if (this.isAble) {
					let param = {
						registeMobile: this.registeMobile,
						verifyNum: this.verifyNum,
						password: this.password,
						nickName: this.nickName,
						operation: 'password' //verifynum  wechat 微信登录
					}
					this.$postajax(this.$api.reg, param).then(da => {
						if (da.code == 10000) {
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/login/login'
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
				this.$getajax(this.$api.isMobileAvailabled, {
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
			checknickName() {
				this.isChecknickName = true;
				this.$getajax(this.$api.isNickNameAvailabled, {
					nickName: this.nickName
				}).then((da) => {
					if (da.code == 10000) {
						this.isNickNameAvailabled = true;
					} else {
						this.isNickNameAvailabled = false;
					}
				}).catch(() => {
					this.isNickNameAvailabled = false;
				}).finally(() => {
					this.isChecknickName = false;
				})
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
</style>
