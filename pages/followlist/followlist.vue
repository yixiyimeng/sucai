<template>
	<view class="pageview flex flex-direction">
		<searchbar @search="search"></searchbar>
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
		<view class="flex-sub">
			<mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback" :fixed="false">
				<view class="">
					<view class="padding goodslist flex flex-wrap justify-between">
						<navigator :url="`/pages/details/details?id=${item.id}`" class="goods-item" hover-class="none" v-for="(item,index) in list" :key="index">
							<image :src="item.coverPath" mode="aspectFill"></image>
							<p class="text-cut">{{item.title}}</p>
						</navigator>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import searchbar from '@/component/searchbar.vue'
	import MescrollMixin from "@/component/mescroll-uni/mescroll-mixins.js"
	export default {
		data() {
			return {
				list:[]
			};
		},
		mixins: [MescrollMixin],
		components: {
			searchbar
		},
		methods: {
			search(keyword) {
				// console.log(keyword)
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				this.findStoredMaterials();
			},
			findStoredMaterials() {
				let pageNum = this.mescroll.num; // 页码, 默认从1开始
				let pageSize = this.mescroll.size;
				let param = {
					page: pageNum,
					pageSize: pageSize
				}
				this.$postajax(this.$api.findStoredMaterials, param).then(da => {
					if (da.code == 10000) {
						let curPageData = da.list;
						this.mescroll.endBySize(curPageData.length, da.total);
						if (this.mescroll.num == 1)
							this.list = []; //如果是第一页需手动制空列表
						this.list = this.list.concat(curPageData); //追加新数据
					
					}
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
