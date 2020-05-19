<template>
	<view class="pageview flex flex-direction">
		<searchbar @search="search"></searchbar>
		<view class="flex-sub">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action border-title">
					<text class="text-orange">我的收藏夹</text>
					<text class="bg-gradual-orange" style="width:5em"></text>
				</view>
			</view>
			<view class="bg-white">
				<view class='padding-sm flex flex-wrap justify-between'>
					<view class="padding-xs" v-for="(item,index) in 2" :key="index">
						<navigator class='cu-tag  round light' url="/pages/followdetails/followdetails" hover-class="none">收藏夹</navigator>
					</view>
					<view class="padding-xs">
						<navigator class='cu-tag  round more' url="/pages/follow/follow" hover-class="none">
							<text>更多</text>
							<text class="cuIcon-more"></text>
						</navigator>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white  margin-top-sm">
				<view class="action border-title">
					<text>最近收藏</text>
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
	</view>
</template>

<script>
	import searchbar from '@/component/searchbar.vue'
	export default {
		data() {
			return {};
		},
		components: {
			searchbar
		},
		methods: {
			search(keyword) {
				// console.log(keyword)
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}
		}
	}
</script>
<style>
	page,
	.pageview {
		/* background: #fff; */
		height: 100%;
		overflow: hidden;
	}
</style>
<style lang="scss" scoped>
	.pageview>.flex-sub {
		height: 200upx;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	.cu-tag.more {
		color: #FF6A00;
		border: 1px solid #FF6A00;
		background: none;
	}
</style>
