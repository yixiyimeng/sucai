<template>
	<view>
		<view class="userinfo">
			<image src="/static/img_bg_3x.png" mode="widthFix"></image>
			<div class="flex align-center">
				<div class="imgbox">
					<image src="/static/photo.png" mode="widthFix"></image>
				</div>
				<div class="flex-sub">
					<div class="name">{{userInfo.nickName}}</div>
					<div>
						<!-- <image class="vip" src="/static/VIP@2x.png" mode="widthFix"></image>-->
						<text v-if="userVipinfo.length==0">普通用户</text>
						<span v-for="(item,index) in userVipinfo" :key="index" class="flex margin-right-xs">
							<image class="vip" src="/static/VIP@2x.png" mode="widthFix"></image>
							<text class="num">{{item.vipTitle}}</text>
						</span>
					</div>
				</div>
			</div>
		</view>
		<view class="cu-list menu sm-border margin-top">
			<view class="cu-item arrow" @tap="gotopage">
				<!-- <navigator class="cu-item arrow" url="/pages/vip/vip" hover-class="none"> -->
				<view class="content flex align-center" >
					<text class="cuIcon-vip text-orange icon"></text>
					<text>我的素材VIP</text>
				</view>
				<view class="action text-grey">
					加入
				</view>
				<!-- </navigator> -->
				</view>
				<view class="cu-item arrow" @tap="gotopage">
					<!-- <navigator class="cu-item arrow" url="/pages/score/score" hover-class="none"> -->
					<view class="content flex align-center">
						<text class="cuIcon-coin text-green icon"></text>
						<text>我的素材积分</text>
					</view>
					<view class="action text-grey">
						充值
					</view>
					<!-- </navigator> -->
				</view>
				<view class="cu-item arrow" @tap="gotopage">
					<view class="content flex align-center">
						<text class="cuIcon-settings text-red icon"></text>
						<text>设置</text>
					</view>

				</view>
				<view class="cu-item arrow" @tap="gotopage">
					<view class="content flex align-center">
						<text class="cuIcon-question text-blue icon"></text>
						<text>使用帮助</text>
					</view>
				</view>

			</view>

		</view>
</template>

<script>
	export default {
		data() {
			return {
				cuIconList: [],
				userVipinfo: [],
				userInfo: {}
			};
		},
		onLoad() {},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo');
			if (this.userInfo) {
				this.userVipinfo = this.userInfo.list
			}else{
				this.userInfo={}
			}
		},
		methods:{
			gotopage(){
				uni.showToast({
					title:'敬请期待',
					icon:'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	.userinfo {
		position: relative;
		overflow: hidden;

		&>image {
			width: 100%;
			position: absolute;
			z-index: -1;
		}

		&>div {
			position: relative;
			top: 0;
			z-index: 9999;
			padding: 40upx 30upx;
			color: #fff;
		}

		.vip {
			width: 28upx;
		}

		.imgbox {
			width: 120upx;
			height: 120upx;
			border-radius: 100%;
			overflow: hidden;
			background: #fff;
			border: 2px solid #fff;
			margin-right: 20upx;
		}

		.name {
			font-size: 32upx;
			font-weight: bold;
			margin-bottom: 10upx;
		}
	}

	.menu {
		.icon {
			font-size: 40upx;
		}
	}
</style>
