<template>
	<view class="pageview flex flex-direction">
		<!-- <searchbar @search="search"></searchbar> -->
		<topsearchbar :isBack="true" bgColor="bgColor" @backPage="BackPage">
			<view slot="content">
				<searchbar @search="search" v-model="searchStr"></searchbar>
			</view>
		</topsearchbar>
		<view class="flex-sub">
			<mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback" :fixed="false">

				<!-- <view class="cu-bar bg-white solid-bottom" v-if="relateds.length>0">
					<view class="action border-title">
						<text class="text-orange">相关专辑</text>
						<text class="bg-gradual-orange" style="width:4em"></text>
					</view>
				</view>
				<view class="bg-white" v-if="relateds.length>0">
					<view class='padding-sm flex flex-wrap'>
						<view class="padding-xs" v-for="(item,index) in relateds" :key="index">
							<view class='cu-tag  radius'>{{item.name}}</view>
						</view>
					</view>
					
				</view> -->
				<template v-if="relateds.length>0">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action border-title">
							<text class="text-orange">相关专辑</text>
							<text class="bg-gradual-orange" style="width:5em"></text>
						</view>
						<view class="more margin-right-sm text-sm text-gray" @tap="isMore=!isMore">
							<text>更多</text>
							<text :class="'cuIcon-'+(isMore?'unfold':'right')"></text>
						</view>
					</view>
					<view class="bg-white margin-bottom-sm" >
						<view class="padding-sm" style="overflow: hidden;">
							<view class='flex' :class="{'flex-wrap':isMore,'scrollview':!isMore}">
								<view class="padding-xs" v-for="(item,index) in relateds" :key="index">
									<navigator class='cu-tag  radius' :url="`/pages/subfind/subfind?id=${item.id}&name=${item.name}`" hover-class="none">{{item.name}}</navigator>
								</view>
							</view>
						</view>
					</view>
				</template>
				<view class="cu-bar bg-white  margin-top-sm solid-bottom">
					<view class="action border-title">
						<text>共{{total}}条结果</text>
					</view>
				</view>
				<view class="bg-white">
					<view class="padding goodslist flex flex-wrap justify-between">
						<navigator :url="`/pages/details/details?id=${item.id}`" class="goods-item" hover-class="none" v-for="(item,index) in materialslist" :key="index">
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
				searchStr: '',
				materialslist: [],
				relateds: [],
				total: 0,
				isMore:false
			};
		},
		mixins: [MescrollMixin],
		components: {
			searchbar
		},
		onLoad(option) {
			this.searchStr = option.keyword
		},
		methods: {
			search(keyword) {
				this.searchStr = keyword;
				this.mescroll && this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				this.findPageMaterials();
			},
			findPageMaterials() {
				let pageNum = this.mescroll.num; // 页码, 默认从1开始
				let pageSize = this.mescroll.size;
				let param = {
					page: pageNum,
					pageSize: pageSize,
					searchStr: this.searchStr
				}
				let $me = this;
				this.$postajax(this.$api.findPageMaterials, param).then(da => {
					if (da.code == 10000) {
						let curPageData = da.list;
						this.relateds = da.relateds;
						this.total = da.total;
						$me.mescroll.endBySize(curPageData.length, da.total);
						if ($me.mescroll.num == 1)
							$me.materialslist = []; //如果是第一页需手动制空列表
						$me.materialslist = $me.materialslist.concat(curPageData); //追加新数据

					}
				})
			},
			BackPage(){
				uni.navigateBack({
					delta: 1
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
