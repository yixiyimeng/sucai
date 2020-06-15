<template>
	<view class="pageview flex flex-direction">
		<cu-custom :isBack="true" bgColor="bgColor">
			<text slot="content">{{info.title}}</text>
		</cu-custom>
		<view class="flex-sub">
			<view class='padding-sm flex flex-wrap'>
				<view class="padding-xs" @tap="showcollections(item)" v-for="(item,index) in info.collections" :key="index">
					<view class='cu-tag  radius'>{{item.name}}</view>
				</view>
			</view>
			<view class="padding">
				<view class="name margin-top">
					{{info.title}}
				</view>
				<view class="imgbox">
					<!-- <image src="/static/demo.png" mode="widthFix"></image> -->
					<rich-text :nodes="info.content"></rich-text>
				</view>
				<view class="tip">
					<p>下载所需积分：<text class="num">0</text></p>
					<p>文件大小：{{info.fileSize}}</p>
					<p>发布人：{{info.creator}}</p>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white tabbar border shop">

			<view class="action" @tap="gotohome">
				<!-- <navigator url="/pages/index/index" open-type="switchTab"> -->
				<view class=" cuIcon-home text-orange"></view>首页
				<!-- </navigator> -->
			</view>

			<view class="btn-group">
				<button class="cu-btn  round shadow-blur" @tap="addfav" :class="{cancel:info.stored}">{{info.stored?'取消收藏':'收藏下载'}}</button>
			</view>
		</view>
		<favmodal ref="favmodal"></favmodal>
	</view>
</template>

<script>
	import favmodal from '@/component/favmodal.vue'
	export default {
		data() {
			return {
				id: '',
				info: {}
			};
		},
		components: {
			favmodal
		},
		onLoad(option) {
			this.id = option.id;
			this.findMaterialDetail();
		},
		methods: {
			findMaterialDetail() {
				this.$getajax(this.$api.findMaterialDetail + this.id).then(da => {
					if (da.code == 10000) {
						this.info = da.detail;
					}
				})
			},
			addfav() {
				if (this.info.stored) {
					this.delfollow(this.info.id);
				} else {
					this.$refs.favmodal.show(this.info.id)
				}
			},
			/* 删除收藏素材 */
			delfollow(id) {
				this.$getajax(this.$api.removeMaterialStore, {
					mid: id
				}).then(da => {
					uni.showToast({
						title: (da.code == 10000) ? '取消收藏成功' : da.message,
						icon: 'none'
					});
					if (da.code == 10000) {
						this.findMaterialDetail();
					}

				})
			},
			gotohome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			showcollections(info) {
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
		background: #fff;
		height: 100%;
		overflow: hidden;
	}
</style>
<style lang="scss" scoped>
	.name {
		font-size: 40upx;
		font-weight: bold;
		color: #333;
	}

	.pageview>.flex-sub {
		height: 200upx;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	.imgbox {
		border-radius: 20upx;
		overflow: hidden;
		margin-top: 40upx;

		image {
			display: block;
			width: 100%;
		}
	}

	.tip {
		margin-top: 30upx;
		color: #999;
		font-size: 28upx;
		line-height: 46upx;

		.num {
			color: #FF6A00;
		}
	}

	.cu-bar {
		box-shadow: 0 -10upx 10upx rgba($color: #000000, $alpha: .05);

		.cu-btn {
			width: 80%;
			background: #FF6A00;
			border: 1px solid #FF6A00;
			color: #fff;

			&.cancel {
				background: #fff;
				color: #FF6A00;
			}
		}
	}

	/deep/ uni-rich-text img {
		max-width: 100%
	}

	.cu-tag {
		width: auto;
		padding: 16upx 20upx;
	}
</style>
