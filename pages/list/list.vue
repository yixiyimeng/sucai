<template>
	<view>
		<view class="swiper-item">
			<view class="tip">
				<view>插件</view>
				<view class="fav active">关注</view>
			</view>
			<image src="/static/bg.jpg" mode="widthFix"></image>
		</view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action border-title">
				<text class="text-orange">父专辑</text>
				<text class="bg-gradual-orange" style="width:3em"></text>
			</view>
		</view>
		<view class="bg-white">
			<view class='padding-sm flex flex-wrap justify-between'>
				<view class="padding-xs" v-for="(item,index) in 3" :key="index">
					<view class='cu-tag  radius'>标签</view>
				</view>
			</view>
			<view class="more">
				<text>展开</text>
				<text class="cuIcon-unfold"></text>
			</view>
		</view>
		<view class="cu-bar bg-white margin-top-sm solid-bottom">
			<view class="action border-title">
				<text class="text-orange">子专辑</text>
				<text class="bg-gradual-orange" style="width:3em"></text>
			</view>
		</view>
		<view class="bg-white">
			<view class='padding-sm flex flex-wrap justify-between'>
				<view class="padding-xs" v-for="(item,index) in 3" :key="index">
					<view class='cu-tag  radius'>标签</view>
				</view>
			</view>
			<view class="more">
				<text>展开</text>
				<text class="cuIcon-unfold"></text>
			</view>
		</view>
	
		<view class="">
			<view class="padding goodslist flex flex-wrap justify-between">
				<view class="goods-item" v-for="(item,index) in 10" :key="index">
					<image src="/static/demo.png" mode="aspectFill"></image>
					<p>配景乔木psd</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: ''
			};
		},
		methods: {
			confirm() {
				/* TODO 搜索 */
			}
		}
	}
</script>

<style lang="scss">
	page {
		// background: #fff;
	}

	.swiper-item {
		height: 390upx;
		position: relative;

		.tip {
			font-size: 50upx;
			color: #fff;
			position: absolute;
			top: 50%;
			transform: translate(0, -50%);
			font-weight: bold;
			z-index: 1;
			text-align: center;
			text-shadow: 0 2upx 10upx rgba(0, 0, 0, .5);
			left: 10upx;
			right: 10upx;
			.fav{
				font-size: 24upx;
				font-weight: normal;
				color: #666;
				background: #fff;
				border-radius: 8upx;
				padding: 8upx 20upx;
				width: 100upx;
				text-shadow: none;
				box-shadow: 0 0 5upx rgba($color: #000000, $alpha: .05);
				margin: 10upx auto;
				&.active{
					color: #fff;
					background: #FF6A00;
				}
			}
		}
	}

	
	.more {
		text-align: center;
		padding: 10upx;
		color: #999;
	}

	
</style>
