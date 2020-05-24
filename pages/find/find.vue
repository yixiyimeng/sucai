<template>
	<view class="pageview flex flex-direction">
		<searchbar @search="search"></searchbar>
		<div class="bread">
			<span class="text-orange">专辑一</span>
			<span>&gt;</span>
			<span class="text-orange">专辑二</span>
			<span>&gt;</span>
			<span class="text-orange">专辑二</span>
			<span>&gt;</span>
			<span class="text-orange">专辑二</span>
			<span>&gt;</span>
			<span class="text-orange">专辑二</span>
			<span>&gt;</span>
			<text>专辑三</text>
		</div>
		<div class="flex-sub flex" style="overflow: hidden;">
			<div class="list">
				<div class="item">
					<div class="title">专辑一</div>
					<div class="flex justify-between">
						<text>收藏数：100</text>
						<text>创建时间：2020-05-24</text>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import MescrollMixin from "@/component/mescroll-uni/mescroll-mixins.js"
	import searchbar from '@/component/searchbar.vue'
	export default {
		components: {
			searchbar
		},
		mixins: [MescrollMixin],
		data() {
			return {
				cateIndex: 0,
				menulist: [{
					'name': '关注的'
				}, {
					'name': '关注的'
				}, {
					'name': '关注的'
				}]
			};
		},
		methods: {
			search(keyword) {
				// console.log(keyword)
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			scrollTo(index, item) {
				this.cateIndex = index
			}
		}
	}
</script>
<style>
	page,
	.pageview {
		height: 100%;
		overflow: hidden;
	}
</style>
<style lang="scss">
	.main {
		height: 100%;
		overflow: auto;
	}
.bread{
	background: #fff;
	padding: 20upx 30upx;
	color: #999;
	span{
		margin-right: 20upx;
	}
}
	.list {
		margin-top: 20upx;
		width: 100%;
		.item {
			color: #999;
			font-size: 24upx;
			background: #fff;
			padding: 20upx 30upx;
			border-bottom: 1px solid #eee;
			.title{
				color: #333;
				font-size: 28upx;
				margin-bottom:20upx;
			}
		}
	}
</style>
