<template>
	<view class="pageview flex flex-direction">
		<topsearchbar  bgColor="bgColor" >
			<!-- <text slot="content">{{curName}}</text> -->
			<view slot="content">
				<searchbar @search="search"></searchbar>
			</view>
			
		</topsearchbar>
		<!-- <searchbar @search="search"></searchbar> -->
		<view class="cu-bar bg-white solid-bottom">
			<view class="action border-title" style="height: auto;">
				<text class="text-orange">我的收藏夹</text>
				<text class="bg-gradual-orange" style="width:5em"></text>
			</view>
		</view>
		<view class="bg-white">
			<view class='padding-sm flex flex-wrap justify-between'>
				<view class="padding-xs" v-for="(item,index) in storeslist" :key="index">
					<navigator class='cu-tag  round light' :url="`/pages/followdetails/followdetails?id=${item.id}&name=${item.name}`" hover-class="none">{{item.name}}</navigator>
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
			<view class="action border-title" style="top:0">
				<text>最近收藏</text>
			</view>
		</view>
		<view class="flex-sub">
			<mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback" :fixed="false">
				<view class="">
					<material :list="list"></material>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import searchbar from '@/component/searchbar.vue'
	import material from "@/component/material"
	import MescrollMixin from "@/component/mescroll-uni/mescroll-mixins.js"
	export default {
		data() {
			return {
				list:[],
				storeslist:[]
			};
		},
		mixins: [MescrollMixin],
		components: {
			searchbar,
			material
		},
		onShow() {
			this.getlist()
		},
		methods: {
			search(keyword) {
				// console.log(keyword)
				uni.navigateTo({
					url: '/pages/search/search?keyword=' + keyword
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
			},
			getlist() {
				this.$getajax(this.$api.findStores).then(da => {
					this.storeslist = da.list.slice(0,2);
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
