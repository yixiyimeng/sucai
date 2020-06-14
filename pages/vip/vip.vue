<template>
	<view class=" pageview flex flex-direction">
		<cu-custom :isBack="true" bgColor="bgColor">
			<text slot="content">设计e周素材库VIP</text>
		</cu-custom>
		<view class="tip flex">
			<text>当前状态:</text>
			<view class="flex-sub">
				<view class="text-left num" v-if="userVipinfo.length<=0">普通会员</view>
				<view v-for="(item,index) in userVipinfo" :key="index" class="flex">
					<image src="/static/VIP@2x.png" mode="widthFix"></image> <text class="num">{{item.vipTitle}}</text>
					<text class="thumb">(到期时间 {{item.expireTime}})</text>
				</view>
			</view>
		</view>
		<view class="flex-sub ">
			<view class="taglist flex justify-between flex-wrap">
				<view class="tag flex align-center justify-between" :class="{'active':selectIndex==index}" v-for="(item,index) in list"
				 :key='index' @tap="selectVip(index)">
					<view class="flex-sub">
						<p class="name">{{item.name}}</p>
						<rich-text :nodes="item.description"></rich-text>
					</view>
					<view class="">
						<view class="cu-tag round">
							￥{{item.price}}元/年
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="ftbar" v-if="list.length>0">
			<view class="btn" @tap="submit"><text>立即购买</text>({{money}}元)</view>
		</view>
		<buymodal ref="buymodal" @upload='upload'></buymodal>
	</view>
</template>

<script>
	import buymodal from '@/component/buymodal.vue'
	export default {
		data() {
			return {
				selectIndex: 0,
				list: [],
				userVipinfo: []
			};
		},
		components: {
			buymodal
		},
		created() {
			this.getVipTemplates();
			this.userVipinfo = uni.getStorageSync('userInfo').list;
		},
		computed: {
			money() {
				return this.list.length > 0 && this.list[this.selectIndex].price || 0
			}
		},
		methods: {
			getVipTemplates() {
				this.$getajax(this.$api.getVipTemplates).then(da => {
					if (da.code == 10000) {
						this.list = da.list;
					}
				})
			},
			selectVip(index) {
				this.selectIndex = index;

			},
			submit() {
				this.$refs.buymodal.show('vips', this.list[this.selectIndex].id)
			},
			
		}
	}
</script>
<style>
	page {
		background: #fff;
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	.pageview {
		height: 100%;
		overflow: hidden;

		&>.flex-sub {
			height: 200upx;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
		}
	}

	.tip {
		background: #fff;
		padding: 20upx;
		text-align: center;
		font-size: 30upx;
		box-shadow: 0 10upx 10upx rgba($color: #000000, $alpha: .05);

		.num {
			color: #FF6A00;
		}

		.thumb {
			color: #ccc;
			font-size: 24upx;
		}

		image {
			width: 28upx;
		}
	}

	.taglist {
		margin-top: 20upx;
		// padding: 0 15upx;

		.tag {
			width: 100%;
			margin: 10upx 0;
			padding: 0 20upx;
			border-bottom: 1px solid rgba(0, 0, 0, .1);
			// border-radius: 10upx;
			// text-align: center;
			color: #999;

			padding: 20upx;



			.name {
				font-size: 30upx;
				margin-bottom: 10upx;
			}

			.price {
				color: #999;
				font-size: 34upx;
				margin-top: 10upx;
			}

			.cu-tag {
				background: none;
				color: #FF6A00;
				width: auto;
				padding: 10upx 20upx;
				border: 1px solid #FF6A00;
			}

			&.active {
				.cu-tag {
					background: #FF6A00;
					color: #fff;
				}

				.name {
					color: #FF6A00;
				}

				.price {
					color: #fff;
				}
			}
		}
	}

	.ftbar {
		line-height: 110upx;
		text-align: center;
		color: #fff;
		font-size: 32upx;
		background: #FF6A00;
	}
</style>
