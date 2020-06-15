<template>
	<view>
		<view class="top-warp">
			<cu-custom :isBack="true" bgColor="bgColor" @backPage="BackPage">
				<text slot="content">{{storeName}}</text>
				<view slot="right" @tap="edit" class="follow flex align-center">
					<text class="cuIcon-more"></text>
					<!-- <text>编辑</text> -->
				</view>
			</cu-custom>
		</view>
		<mescroll-body :top='100' ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view v-if="relateds.length>0">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action border-title">
						<text class="text-orange">关联专辑</text>
						<text class="bg-gradual-orange" style="width:4em"></text>
					</view>
				</view>
				<view class="bg-white">
					<view class='padding-sm flex flex-wrap justify-between'>
						<view class="padding-xs" v-for="(item,index) in relateds" :key="index">
							<view class='cu-tag  radius'>{{item.name}}</view>
						</view>
					</view>
					<!-- <view class="more">
					<text>展开</text>
					<text class="cuIcon-unfold"></text>
				</view> -->
				</view>
			</view>
			<view>
				<material :list="list" @upload="upload"></material>
			</view>
			<addmodal ref="addmodal" @upload="uploadname"></addmodal>
			<t-rt-popup :itemList="itemList" ref="rtBubble" @click="itemClick"></t-rt-popup>
		</mescroll-body>
	</view>
</template>

<script>
	import addmodal from "@/component/addmodal"
	import material from "@/component/material"
	import MescrollMixin from "@/component/mescroll-uni/mescroll-mixins.js"
	import tRtPopup from '@/component/t-rt-popup/t-rt-popup';
	export default {
		data() {
			return {
				keyword: '',
				list: [],
				storeId: '',
				storeName: '',
				relateds: [],
				itemList: [{
						title: '编辑',
						icon: 'edit'
					},
					{
						title: '删除',
						icon: 'deletefill'
					}
				]
			};
		},
		components: {
			addmodal,
			material,
			tRtPopup
		},
		mixins: [MescrollMixin],
		onLoad(option) {
			this.storeId = option.id;
			this.storeName = option.name;
		},
		methods: {
			confirm() {
				/* TODO 搜索 */
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
					pageSize: pageSize,
					storeId: this.storeId
				}
				this.$postajax(this.$api.findStoredMaterials, param).then(da => {
					if (da.code == 10000) {
						let curPageData = da.list;
						this.mescroll.endBySize(curPageData.length, da.total);
						if (this.mescroll.num == 1)
							this.list = []; //如果是第一页需手动制空列表
						this.list = this.list.concat(curPageData); //追加新数据
						this.relateds = da.relateds
					}
				})
			},
			edit() {

				this.$refs.rtBubble.toggle();
			},
			uploadname(name) {
				this.storeName = name
			},
			itemClick(e) {
				if (e.index == 0) {
					/* 编辑 */
					this.$refs.addmodal.show(this.storeId, this.storeName)
				} else {
					/* 删除 */
					let $me = this;
					uni.showModal({
						title: '',
						content: '你确定要删除这个收藏夹吗？',
						success: function(res) {
							if (res.confirm) {
								$me.delfollow(item.id)
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			delfollow(id) {
				this.$getajax(this.$api.delStores, {
					storeId: id
				}).then(da => {
					uni.showToast({
						title: (da.code == 10000) ? '删除成功' : da.message,
						icon: 'none'
					});
					if (da.code == 10000) {
						uni.navigateBack({
							delta: 1
						})
					}

				})
			},
			upload() {
				this.mescroll && this.mescroll.resetUpScroll();
			}
		}
	}
</script>


<style lang="scss" scoped>
	.swiper-item {
		height: 390upx;
		position: relative;

		.tip {
			font-size: 50upx;
			color: #fff;
			position: absolute;
			top: 50%;
			transform: translate(0, -50%);
			font-weight: bold;
			z-index: 1;
			text-align: center;
			text-shadow: 0 2upx 10upx rgba(0, 0, 0, .5);
			left: 10upx;
			right: 10upx;

			.fav {
				font-size: 24upx;
				font-weight: normal;
				color: #666;
				background: #fff;
				border-radius: 8upx;
				padding: 8upx 20upx;
				width: 140upx;
				text-shadow: none;
				box-shadow: 0 0 5upx rgba($color: #000000, $alpha: .05);
				margin: 10upx auto;

				&.active {
					color: #fff;
					background: #FF6A00;
				}
			}
		}
	}


	.more {
		text-align: center;
		padding: 10upx;
		color: #999;
	}

	.follow {
		color: #f37b1d;
		// border-radius: 10upx;
		position: absolute;
		right: 10upx;
		height: 100%;
		font-size: 38upx;
		// border: 1px solid #f37b1d;
		padding: 0 30upx;


	}
</style>
