<template>
	<view>
		<view class="cu-modal bottom-modal" :class="showModal?'show':''" @tap="showModal=false">
			<view class="cu-dialog" @tap.stop="">
				<!-- <view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModal">取消</view>
					<view class="action text-green" @tap="hideModal">确定</view>
				</view> -->
				<view class="tip">
					<view>收藏后用电脑访问网址</view>
					<view>sucai.yipro.cn进入收藏下载</view>
				</view>
				<view class="title flex justify-between align-center">
					<text>选择收藏夹</text>
					<text class="add" @tap="addNewFile">新建收藏夹</text>
				</view>
				<view class="grid col-3 padding-sm" v-if="list.length>0">
					<view v-for="(item,index) in list" class="padding-xs" :key="index">
						<button class="cu-btn orange lg block" :class="index==curIndex?'bg-orange':'line-orange'" @tap="ChooseCheckbox(index)">{{item.name}}
						</button>
					</view>
				</view>
				<view class="btn bg-orange round" @tap="addfav">
					确定
				</view>

			</view>
		</view>
		
	</view>

</template>

<script>
	export default {
		data() {
			return {
				showModal: false,
				picker: [],
				curIndex: 0,
				materialId: '',
				list: []
			};
		},

		computed: {},
		methods: {
			show(materialId) {
				this.materialId = materialId;
				this.getlist();
			},
			ChooseCheckbox(index) {
				this.curIndex = index;
			},
			getlist() {
				this.$getajax(this.$api.findStores).then(da => {
					let curPageData = da.list;
					this.list = curPageData;
					if (this.list.length > 0) {
						this.showModal = true;
					} else {
						uni.showModal({
							title: '提示',
							content: '您还没有收藏夹，请先创建',
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/follow/follow'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}

				})
			},
			addfav() {
				let id=this.list[this.curIndex].id;
				this.$postajax(this.$api.addMaterialStore, {
					storeId: id,
					materialId: this.materialId,
					storeTime:'',
					id:0
				}).then(da => {
					if (da.code == 10000) {
						this.showModal = false;
					} else {

					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-modal {
		.cu-dialog {
			// width: 640upx;
		}

		.title {
			color: #000;
			font-size: 40upx;
			padding: 20upx 36upx;

			image {
				width: 46upx;
			}
		}

		.btn {
			line-height: 80upx;
			width: 600upx;
			margin: 40upx auto;
		}

		.picker {
			line-height: 60upx;
			text-align: left;
			margin: 10upx 40upx;
		}
	}

	.cu-tag {
		width: auto;
		padding: 16upx;

		&.active {
			color: #fff;
			background: #f37b1d;
		}
	}

	.tip {
		color: #999;
		font-size: 20upx;
		padding: 20upx;
	}

	.grid {
		max-height: 400upx;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
	.add{
		border-radius: 50upx;
		padding: 10upx 26upx;
		color: #f37b1d;
		border: 1px solid #f37b1d;
		font-size: 24upx;
	}
</style>
