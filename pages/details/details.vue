<template>
	<view class="pageview flex flex-direction">
		<view class="flex-sub">
			<view class='padding-sm flex flex-wrap'>
				<view class="padding-xs" v-for="(item,index) in 2" :key="index">
					<view class='cu-tag  radius'>标签</view>
				</view>
			</view>
			<view class="padding">
				<view class="name margin-top">
					一键生成中国风插件
				</view>
				<view class="imgbox">
					<image src="/static/demo.png" mode="widthFix"></image>
				</view>
				<view class="tip">
					<p>下载所需积分：<text class="num">0</text></p>
					<p>文件大小：54.21MB</p>
					<p>发布人：乔克叔叔</p>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white tabbar border shop">

			<view class="action">
				<view class=" cuIcon-home text-orange"></view>首页
			</view>

			<view class="btn-group">
				<button class="cu-btn  round shadow-blur">收藏下载</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>
<style>
	page,
	.pageview {
		background: #fff;
		height: 100%;
		overflow: hidden;
	}
</style>
<style lang="scss" scoped>
	.name {
		font-size: 40upx;
		font-weight: bold;
		color: #333;
	}

	.pageview>.flex-sub {
		height: 200upx;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	.imgbox {
		border-radius: 20upx;
		overflow: hidden;
		margin-top: 40upx;

		image {
			display: block;
			width: 100%;
		}
	}

	.tip {
		margin-top: 30upx;
		color: #999;
		font-size: 28upx;
		line-height: 46upx;

		.num {
			color: #FF6A00;
		}
	}

	.cu-bar {
		box-shadow: 0 -10upx 10upx rgba($color: #000000, $alpha: .05);

		.cu-btn {
			width: 80%;
			background: #FF6A00;
			color: #fff;
		}
	}
</style>
