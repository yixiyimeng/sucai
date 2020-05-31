<template>
	<view class="pageview flex flex-direction">
		<view class="flex-sub">
			<view class='padding-sm flex flex-wrap'>
				<view class="padding-xs" v-for="(item,index) in info.collections" :key="index">
					<view class='cu-tag  radius'>{{item.name}}</view>
				</view>
			</view>
			<view class="padding">
				<view class="name margin-top">
					{{info.title}}
				</view>
				<view class="imgbox">
					<!-- <image src="/static/demo.png" mode="widthFix"></image> -->
					<rich-text :nodes="info.content"></rich-text>
				</view>
				<view class="tip">
					<p>下载所需积分：<text class="num">0</text></p>
					<p>文件大小：{{info.fileSize}}</p>
					<p>发布人：{{info.creator}}</p>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white tabbar border shop">

			<view class="action">
				<navigator url="/pages/index/index" open-type="switchTab">
					<view class=" cuIcon-home text-orange"></view>首页
				</navigator>
			</view>

			<view class="btn-group">
				<button class="cu-btn  round shadow-blur">收藏下载</button>
			</view>
		</view>
		<favmodal></favmodal>
	</view>
</template>

<script>
	import favmodal from '@/component/favmodal.vue'
	export default {
		data() {
			return {
				id: '',
				info: {}
			};
		},
		components: {
			favmodal
		},
		onLoad(option) {
			this.id = option.id;
			this.findMaterialDetail();
		},
		methods: {
			findMaterialDetail() {
				this.$getajax(this.$api.findMaterialDetail + this.id).then(da => {
					if (da.code == 10000) {
						this.info = da.detail;
					}
				})
			}
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

	/deep/ uni-rich-text img {
		max-width: 100%
	}

	.cu-tag {
		width: auto;
		padding: 16upx 20upx;
	}
</style>
