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
			<input class="flex-sub" v-model="keyword" placeholder="请输入想要素材的关键词" type="text" confirm-type="search" @confirm="confirm($event)" />
		</div>
		<!-- <view class="cu-bar bg-white solid-bottom">
			<view class="action border-title">
				<text class="text-orange">关注的专辑</text>
				<text class="bg-gradual-orange" style="width:5em"></text>
			</view>
		</view>
		<view class="bg-white">
			<view class='padding-sm flex flex-wrap justify-between'>
				<view class="padding-xs" v-for="(item,index) in 3" :key="index">
					<navigator class='cu-tag  radius' url="/pages/list/list" hover-class="none">标签</navigator>
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
				<text class="bg-gradual-orange" style="width:5em"></text>
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
		</view> -->
		<view class="cu-bar bg-white margin-top-sm solid-bottom">
			<view class="action border-title">
				<text class="text-orange">最新</text>
				<text class="bg-gradual-orange" style="width:2em; min-width: 1em;"></text>
			</view>
			<view class="action" @tap="findPageMaterials">换一换</view>
		</view>
		<view class="">
			<view class="padding goodslist flex flex-wrap justify-between">
				<navigator :url="`/pages/details/details?id=${item.id}`" class="goods-item" hover-class="none" v-for="(item,index) in materialslist" :key="index">
					<image :src="item.coverPath" mode="aspectFill"></image>
					<p class="text-cur">{{item.title}}</p>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				materialslist:[]
			};
		},
		onLoad() {
			this.findCollectionsInfo();
			this.findPageMaterials();
		},
		methods: {
			confirm() {
				/* TODO 搜索 */
				uni.navigateTo({
					url: '/pages/search/search?keyword='+this.keyword
				})
			},
			findCollectionsInfo(){
				this.$getajax(this.$api.findCollectionsInfo+'0').then(da=>{
					
				})
			},
			findPageMaterials(){
				this.$postajax(this.$api.findPageMaterials,{
					page:1,
					pageSize:10
				}).then(da=>{
					if(da.code==10000){
						this.materialslist=da.list
						// console.log(da.data)
					}
				})
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
		line-height: 80upx;
		padding: 0 10upx;
		box-shadow: 0 10upx 10upx rgba(0, 0, 0, .1);
		height: 80upx;

		input {
			font-size: 26upx;
		}

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
</style>
