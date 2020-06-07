<template>
	<view class="pageview flex flex-direction">
		<cu-custom :isBack="true" bgColor="bgColor" @backPage="BackPage">
			<text slot="content">{{curName}}</text>
		</cu-custom>
		<searchbar @search="search"></searchbar>
		<scroll-view scroll-x v-if="menulist.length>0" class="bread nav margin-bottom-sm" scroll-with-animation
		 :scroll-into-view="intonav">
			<div ref="bread">
				<span v-for="(item,index) in menulist.slice(0,menulist.length-1)" :key="index">
					<span class="text-orange">{{item.name}}</span>
					<span>&gt;</span>
				</span>
				<text :id="'nav'+(menulist.length-1)">{{menulist[menulist.length-1].name}}</text>
			</div>
		</scroll-view>

		<div class="flex-sub" style="overflow: auto;">


			<mescroll-uni @init="mescrollInit" @down="downCallback" @up="upCallback" :fixed="false">
				<view class="cu-bar bg-white solid-bottom" v-if="plist.length>0">
					<view class="action border-title">
						<text class="text-orange">父专辑</text>
						<text class="bg-gradual-orange" style="width:3em"></text>
					</view>
				</view>
				<view class="bg-white">
					<view class='padding-sm flex flex-wrap justify-between' v-if="plist.length>0">
						<view class="padding-xs" v-for="(item,index) in plist" :key="index" @tap="pdetails(item)">
							<view class='cu-tag  radius'>{{item.name}}</view>
						</view>
					</view>

				</view>
				<view class="cu-bar bg-white solid-bottom" v-if="list.length>0">
					<view class="action border-title">
						<text class="text-orange">子专辑</text>
						<text class="bg-gradual-orange" style="width:3em"></text>
					</view>
				</view>
				<view class="bg-white">
					<view class='padding-sm flex flex-wrap justify-between' v-if="list.length>0">
						<view class="padding-xs" v-for="(item,index) in list" :key="index" @tap="details(item)">
							<view class='cu-tag  radius'>{{item.name}}</view>
						</view>
					</view>

				</view>
				<view class="padding goodslist flex flex-wrap justify-between">
					<navigator :url="`/pages/details/details?id=${item.id}`" class="goods-item" hover-class="none" v-for="(item,index) in materialslist"
					 :key="index">
						<image :src="item.coverPath" mode="aspectFill"></image>
						<p class="text-cut">{{item.title}}</p>
					</navigator>
				</view>
			</mescroll-uni>
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
				menulist: [],
				id: 1,
				list: [],
				plist: [],
				intonav: 'nav0',
				materialslist: [],
				bgColor: 'bgColor'
			};
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id;
				this.curName = option.name;
				this.menulist.push({
					name:this.curName,
					id: this.id
				});
			}

		},
		methods: {
			search(keyword) {
				// console.log(keyword)
				uni.navigateTo({
					url: '/pages/search/search?keyword=' + keyword
				})
			},
			scrollTo(index, item) {
				this.cateIndex = index
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				if (mescroll.num == 1) {
					this.findCollectionsInfo()
				}
				this.findPageMaterials();
			},
			findResource() {
				let $me = this;
				this.$getajax(this.$api.findResource + this.id).then(da => {
					if (da.code == 10000) {
						let curPageData = da.list;
						$me.list = curPageData
					}
				})
			},
			findCollectionsInfo() {
				this.$getajax(this.$api.findCollectionsInfo + this.id).then(da => {
					if (da.code == 10000) {
						this.list = da.nodes;
						this.plist = da.pnodes
					}
				})
			},
			findPageMaterials() {
				let pageNum = this.mescroll.num; // 页码, 默认从1开始
				let pageSize = this.mescroll.size;
				let param = {
					page: pageNum,
					pageSize: pageSize
				}
				if (this.menulist.length > 0) {
					param.cid = this.menulist[this.menulist.length - 1].id
				}
				let $me = this;
				this.$postajax(this.$api.findPageMaterials, param).then(da => {
					if (da.code == 10000) {
						let curPageData = da.list;
						$me.mescroll.endBySize(curPageData.length, da.total);
						if ($me.mescroll.num == 1)
							$me.materialslist = []; //如果是第一页需手动制空列表
						$me.materialslist = $me.materialslist.concat(curPageData); //追加新数据

					}
				})
			},
			details(info) {
				this.id = info.id;
				this.menulist.push({
					name: info.name,
					id: info.id
				});
				this.$nextTick(() => {
					let w = this.$refs.bread.offsetWidth;
					this.intonav = 'nav' + (this.menulist.length - 1)
					console.log(this.intonav)
				})
				this.mescroll && this.mescroll.resetUpScroll();
			},
			pdetails(info) {
				this.id = info.id;
				if (this.menulist.length <= 1) {
					uni.navigateBack({
						delta: 1
					})
				} else if(this.menulist.length>=2){
					this.menulist=this.menulist.slice(0,this.menulist.length-1)
				}else{
					this.menulist=[];
				}
				this.menulist.push({
					name: info.name,
					id: info.id
				});
				this.$nextTick(() => {
					let w = this.$refs.bread.offsetWidth;
					this.intonav = 'nav' + (this.menulist.length - 1)
					console.log(this.intonav)
				})
				this.mescroll && this.mescroll.resetUpScroll();

			},
			BackPage() {
				console.log(122)
				/* 返回上一级 */
				if (this.menulist.length <= 1) {
					uni.navigateBack({
						delta: 1
					})
				} else {
					this.menulist.pop();
					this.id = this.menulist[this.menulist.length - 1].id;
					this.mescroll && this.mescroll.resetUpScroll();
				}
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

	.bread {
		background: #fff;
		padding: 20upx 30upx;
		color: #999;

		span {
			margin-right: 20upx;
		}
	}

	/deep/ .mescroll-uni-warp {
		width: 100%;
	}

	.list {
		// margin-top: 20upx;
		width: 100%;

		.item {
			color: #999;
			font-size: 24upx;
			background: #fff;
			padding: 20upx 30upx;
			border-bottom: 1px solid #eee;

			.title {
				color: #333;
				font-size: 28upx;
				margin-bottom: 20upx;
			}
		}
	}

	.cu-tag {
		width: auto;
		min-width: 210upx;
		padding-left: 20upx;
		padding-right: 20upx;
	}
</style>
