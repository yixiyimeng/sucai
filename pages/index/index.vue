<template>
	<view>
		<swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in 3" :key="index">
				<view class="swiper-item">
					<view class="tip">
						<view>设计e周素材库</view>
						<view>高效查找与管理素材</view>
					</view>
					<image src="/static/bg.jpg" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
		<div class="searchbar flex align-center">
			<image src="/static/sousuo2.png" mode="widthFix"></image>
			<input class="flex-sub" v-model="keyword" placeholder="请输入你想要的产品名称" type="text" confirm-type="search" @confirm="confirm($event)" />
		</div>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action border-title">
				<text class="text-orange">关注的专辑</text>
				<text class="bg-gradual-orange" style="width:3rem"></text>
			</view>
		</view>
		<view class="bg-white">
			<view class='padding-sm flex flex-wrap'>
				<view class="padding-xs" v-for="(item,index) in 10" :key="index">
					<view class='cu-tag line-grey radius'>标签</view>
				</view>
			</view>
			<view class="more">
				<text>展开</text>
				<text class="cuIcon-unfold"></text>
			</view>
		</view>
		<view class="cu-bar bg-white margin-top-sm solid-bottom">
			<view class="action border-title">
				<text class="text-orange">推荐的专辑</text>
				<text class="bg-gradual-orange" style="width:3rem"></text>
			</view>
		</view>
		<view class="bg-white">
			<view class='padding-sm flex flex-wrap'>
				<view class="padding-xs" v-for="(item,index) in 10" :key="index">
					<view class='cu-tag line-grey radius'>标签</view>
				</view>
			</view>
			<view class="more">
				<text>展开</text>
				<text class="cuIcon-unfold"></text>
			</view>
		</view>
		<view class="cu-bar bg-white margin-top-sm solid-bottom">
			<view class="action border-title">
				<text class="text-orange">最新</text>
				<text class="bg-gradual-orange" style="width:3rem"></text>
			</view>
			<view class="action">换一换</view>
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

	swiper {
		height: 390upx;

		.tip {
			font-size: 50upx;
			color: #fff;
			position: absolute;
			top: 50%;
			transform: translate(0, -50%);
			font-weight: bold;
			z-index: 999;
			text-align: center;
			text-shadow: 0 2upx 10upx rgba(0, 0, 0, .5);
			left: 10upx;
			right: 10upx;
		}
	}

	.searchbar {
		margin: 0 40upx;
		// border: 1px solid #eee;
		border-radius: 8upx;
		background: #fff;
		transform: translateY(-50%);
		font-size: 30upx;
		line-height: 80upx;
		padding: 0 10upx;
		box-shadow: 0 10upx 10upx rgba(0, 0, 0, .1);
		height: 80upx;

		image {
			width: 50upx;
			margin-right: 20upx;
		}
	}

	.more {
		text-align: center;
		padding: 10upx;
		color: #999;
	}

	.cu-tag {
		padding: 0 20upx;
		font-size: 30upx;
	}

	.goodslist {
		.goods-item {
			width: 48%;
			margin: 0 0 20upx;
			background: #fff;

			font-size: 28upx;
			color: #333;
			box-shadow: 0 10upx 10upx rgba(0, 0, 0, .05);
			border-radius: 4upx;
			overflow: hidden;
			text-align: center;

			image {
				display: block;
				width: 100%;
				height: 48vw;
			}

			p {
				height: 80upx;
				line-height: 80upx;
			}
		}
	}
</style>
