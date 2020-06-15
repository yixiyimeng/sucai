<template>
	<view class="pageview flex flex-direction">
		<view class="top-warp">
			<cu-custom :isBack="true" bgColor="bgColor">
				<text slot="content">收藏夹</text>
			</cu-custom>
		</view>
		<mescroll-body ref="mescrollRef" :top="100" :bottom="80" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<!-- 数据列表 -->
			<div class="subtip">向左滑动对收藏夹进行编辑和删除</div>
			<view class="list">
				<!-- <navigator hover-class="none" url="../followdetails/followdetails" class="follow-item" v-for="(item,index) in 20"
				 :key="index">
					<div class="name">{{item.name}}</div>
					<view class="flex justify-between">
						<text class="num">100个关注</text>
						<text>2010-10-10 创建</text>
					</view>
				</navigator> -->
				<tui-swipe-action :actions="actions" @click="handlerButton" v-for="(item,index) in list" :key="index" :params="item">
					<template v-slot:content>
						<view class="follow-item" @tap.stop="details(item.id,item.name)">
							<div class="name">{{item.name}}</div>
							<view class="flex justify-between">
								<text class="num">{{item.materialCount}}个素材</text>
								<text>{{item.createTime}}创建</text>
							</view>
						</view>
					</template>
				</tui-swipe-action>
			</view>
		</mescroll-body>
		<view class="tip">
			<p>非VIP可免费创建6个收藏夹</p>
			<p>加入VIP享受不限量的收藏功能</p>
		</view>
		<view class="add flex align-center" @tap="addFile">
			<view>
				<text class="cuIcon-add"></text>
				<text>创建</text>
			</view>
		</view>
		<addmodal ref="addmodal" @upload="downCallback"></addmodal>

	</view>
</template>

<script>
	import addmodal from "@/component/addmodal"
	import MescrollMixin from "@/component/mescroll-uni/mescroll-mixins.js";
	import tuiSwipeAction from "@/component/swipe-action/swipe-action"
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				isAdd: false,
				name: '',
				list: [],
				actions: [{
						name: '删除',
						color: '#fff',
						fontsize: 30, //单位upx
						width: 80, //单位px
						//icon: 'like.png',//此处为图片地址
						background: '#ed3f14'
					},
					{
						name: '编辑',
						color: '#fff',
						fontsize: 30,
						width: 80,
						//icon: 'like.png',//此处为图片地址
						background: '#ff7900'
					}
				]
			};
		},
		components: {
			addmodal,
			tuiSwipeAction
		},
		methods: {
			upCallback(mescroll) {
				this.getlist();
			},
			addFile() {
				this.$refs.addmodal.show()
			},
			getlist() {
				this.$getajax(this.$api.findStores).then(da => {
					let curPageData = da.list;
					this.list = curPageData;
					this.mescroll.endBySize(curPageData.length, curPageData.length);
				})
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
						this.mescroll && this.mescroll.resetUpScroll();
					}

				})
			},
			handlerButton(e) {
				let index = e.index;
				let item = e.item;
				if (index == 0) {
					/* 删除 */
					let $me = this;
					uni.showModal({
						title: '',
						content: '你确定要删除吗？',
						success: function(res) {
							if (res.confirm) {
								$me.delfollow(item.id)
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					/* 编辑 */
					this.$refs.addmodal.show(item.id, item.name)
				}
			},
			details(id, name) {
				uni.navigateTo({
					url: '/pages/followdetails/followdetails?id=' + id + '&name=' + name
				})
			}
		}
	}
</script>
<style>
	.pageview,
	page {
		/* height: 100%; */
		/* overflow: hidden; */
	}
</style>
<style lang="scss">
	.pageview>.flex-sub {
		height: 200upx;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	.subtip {
		text-align: right;
		color: #666;
		padding: 30upx 20upx 10upx;
	}

	.list {
		padding-top: 20upx;

		.follow-item {
			padding: 30upx;
			// margin-bottom: 20upx;
			background: #fff;
			// border-top: 1px solid #eee;
			border-bottom: 1px solid #eee;
			color: #999;
			font-size: 24upx;

			.name {
				color: #333;
				font-size: 28upx;
				margin-bottom: 20upx;
			}
		}
	}

	.tip {
		text-align: center;
		color: #666;
		font-size: 20upx;
		padding: 10upx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		box-shadow: 0 -10upx 10upx rgba($color: #000000, $alpha: .05);
	}

	.add {
		position: fixed;
		bottom: 200upx;
		right: 20upx;
		background: #FF6A00;
		color: #fff;
		text-align: center;
		height: 100upx;
		width: 100upx;
		border-radius: 100%;

		&>view {
			width: 100%;
		}

		text {
			font-size: 20upx;
			font-size-adjust: none;
			display: block;

			&:first-child {
				font-size: 46upx;
				font-weight: bold;
				line-height: 30upx;
			}
		}
	}
</style>
