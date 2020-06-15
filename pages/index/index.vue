<template>
	<view>
		<view class="top-warp" v-if="isShowSticky">
			<topsearchbar bgColor="bgColor">
				<view slot="content">
					<searchbar v-model="keyword" @search="confirm" placeholdertxt='想要什么素材,一搜便有'></searchbar>
				</view>
			</topsearchbar>
		</view>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption" :down="downOption">

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
				<div class="indexsearchbar flex align-center" id="searchbar">
					<image src="/static/sousuo2.png" mode="widthFix"></image>
					<input class="flex-sub" v-model="keyword" placeholder="你想要什么素材,一搜便有" type="text" confirm-type="search" @confirm="confirm($event)" />
					<text class="del cuIcon-roundclosefill" @click.stop="keyword=''" v-if="keyword.length>0"></text>
				</div>
				<view class="cu-bar bg-white solid-bottom" v-if="attentions.length>0">
					<view class="action border-title">
						<text class="text-orange">关注的专辑</text>
						<text class="bg-gradual-orange" style="width:5em"></text>
					</view>
					<view class="more margin-right-sm text-sm text-gray" @tap="isMore=!isMore">
						<text>更多</text>
						<text :class="'cuIcon-'+(isMore?'unfold':'right')"></text>
					</view>
				</view>
				<view class="bg-white margin-bottom-sm" v-if="attentions.length>0">
					<view class="padding-sm" style="overflow: hidden;">
						<view class='flex' :class="{'flex-wrap':isMore,'scrollview':!isMore}">
							<view class="padding-xs" v-for="(item,index) in attentions" :key="index">
								<navigator class='cu-tag  radius' :url="`/pages/subfind/subfind?id=${item.id}&name=${item.name}`" hover-class="none">{{item.name}}</navigator>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action border-title">
					<text class="text-orange">最新</text>
					<text class="bg-gradual-orange" style="width:2em; min-width: 1em;"></text>
				</view>
				<view class="action" @tap="findPageMaterials">换一换</view>
			</view>
			<view class="">
				<view class="padding goodslist flex flex-wrap justify-between">
					<navigator :url="`/pages/details/details?id=${item.id}`" class="goods-item" hover-class="none" v-for="(item,index) in materialslist"
					 :key="index">
						<image :lazy-load="true" :src="item.coverPath" mode="aspectFill"></image>
						<p class="text-cur">{{item.title}}</p>
					</navigator>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/component/mescroll-uni/mescroll-mixins.js";
	import searchbar from '@/component/searchbar.vue'
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				keyword: '',
				materialslist: [],
				attentions: [], //关注列表
				page: 0,
				navTop: 0,
				isShowSticky: false,
				downOption: {
					auto: true // 不自动加载
				},
				upOption: {
					empty: {
						use: false
					},
					use: true,
					auto: true // 不自动加载
				},
				isMore:false
			};
		},
		components: {
			searchbar
		},
		methods: {
			upCallback(mescroll) {
				this.page = 0;
				if (!this.navTop) this.setNavTop();
				this.findCollectionsInfo();
				this.findPageMaterials();
				setTimeout(() => {
					this.mescroll.endSuccess(0, false);
				}, 500)
				
			},
			confirm() {
				/* TODO 搜索 */
				uni.navigateTo({
					url: '/pages/search/search?keyword=' + this.keyword
				})
			},

			findPageMaterials() {
				this.page++;
				this.$postajax(this.$api.findPageMaterials, {
					page: this.page,
					pageSize: 10
				}).then(da => {
					if (da.code == 10000) {
						this.materialslist = da.list;
						if ((this.page + 1) * 10 >= da.total) {
							this.page = 0;
						}
						// console.log(da.data)
					}
				})
			},
			/* 查询关注专辑 */
			findCollectionsInfo() {
				this.$getajax(this.$api.findCollectionsInfo + '0').then(da => {
					if (da.code == 10000) {
						this.attentions = da.attentions
					}
				})
			},
			setNavTop() {
				let view = uni.createSelectorQuery().select('#searchbar');
				view.boundingClientRect(data => {
					this.navTop = (data && data.top) || 200 // 到屏幕顶部的距离
				}).exec();
			},
		},
		onPageScroll(e) {
			e.scrollTop = e.scrollTop;
			if (e.scrollTop >= this.navTop) {
				this.isShowSticky = true // 显示悬浮菜单
			} else {
				this.isShowSticky = false // 隐藏悬浮菜单
			}
		},
	}
</script>

<style lang="scss" scoped>
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

	.indexsearchbar {
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

		.del {
			color: #bbb;
			font-size: 36upx;
		}
	}

	.more {
		text-align: center;
		padding: 10upx;
		color: #999;
	}

	.cu-tag {
		width: auto;
		min-width: 210upx;
		padding-left: 20upx;
		padding-right: 20upx;
	}
</style>
