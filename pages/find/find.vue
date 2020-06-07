<template>
	<view class="pageview flex flex-direction">
		<searchbar @search="search"></searchbar>
		<div class="flex-sub flex" style="overflow: hidden;">
			<div class="submenu">
				<scroll-view scroll-y scroll-with-animation class="scroll-view" :scroll-into-view="'head-' + cateIndex">
					<div class="submenu-item flex flex-align-center" :class="{ active: cateIndex == myitemIndex }" v-for="(item, myitemIndex) in menulist"
					 :key="myitemIndex" @click="scrollTo(myitemIndex, item)" :id="'head-' + myitemIndex">
						<span class="cate ">{{ item.name }}</span>
					</div>
				</scroll-view>
			</div>
			<div class="flex-sub main padding-left-sm">
				<!-- <mescroll-uni  @init="mescrollInit" @down="downCallback" @up="upCallback" :fixed="false"> -->
				<view class="cu-bar bg-white solid-bottom" v-if="list.length>0">
					<view class="action border-title">
						<text class="text-orange">子专辑</text>
						<text class="bg-gradual-orange" style="width:3em"></text>
					</view>
				</view>
				<view>
					<view class='padding-sm flex flex-wrap justify-between' v-if="list.length>0">
						<view class="padding-xs" v-for="(item,index) in list" :key="index" @tap="details(item)">
							<view class='cu-tag  radius'>{{item.name}}</view>
						</view>
					</view>

				</view>
				<view class="cu-bar bg-white solid-bottom margint-top" v-if="attentions.length>0">
					<view class="action border-title">
						<text class="text-orange">推荐专辑</text>
						<text class="bg-gradual-orange" style="width:4em"></text>
					</view>
				</view>
				<view>
					<view class='padding-sm flex flex-wrap justify-between' v-if="attentions.length>0">
						<view class="padding-xs" v-for="(item,index) in list" :key="index" @tap="details(item)">
							<view class='cu-tag  radius'>{{item.name}}</view>
						</view>
					</view>

				</view>
				<!-- </mescroll-uni> -->
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
				curId: 1,
				list: [],
				attentions: [], //推荐专辑
				menulist: []
			};
		},
		created() {
			this.findResource();
		},
		methods: {
			search(keyword) {
				console.log(keyword)
				uni.navigateTo({
					url: '/pages/search/search?keyword=' + keyword
				})
			},
			scrollTo(index, item) {
				this.cateIndex = index;
				this.curId = item.id;
				this.findCollectionsInfo();
			},
			findCollectionsInfo() {
				this.$getajax(this.$api.findCollectionsInfo + this.curId).then(da => {
					if (da.code == 10000) {
						this.list = da.nodes;
						this.attentions = da.attentions
					}
				})
			},
			findResource() {
				let $me = this;
				this.$getajax(this.$api.findResource + '1').then(da => {
					if (da.code == 10000) {
						let curPageData = da.list;
						$me.menulist = curPageData;
						this.curId = $me.menulist[0].id;
						this.findCollectionsInfo();
					}
				})
			},
			details(info) {
				uni.navigateTo({
					url: '/pages/subfind/subfind?id=' + info.id + '&name=' + info.name
				})
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
		background: #fff;
	}

	.submenu {
		height: 100%;
		width: 170upx;

		background: #f1f1f1;

		.scroll-view {
			height: 100%;
		}

		.submenu-item {
			line-height: 100upx;
			text-align: center;

			&.active {
				background: #fff;
				position: relative;
				color: #FF6A00;

				&.active::after {
					content: "";
					width: 8upx;
					height: 30upx;
					border-radius: 10upx 0 0 10upx;
					position: absolute;
					background-color: currentColor;
					top: 0;
					right: 0upx;
					bottom: 0;
					margin: auto;
				}
			}

			&>span {
				width: 100%;
			}
		}
	}
</style>
