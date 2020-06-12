<template>
	<view class=" pageview flex flex-direction">
		<view class="tip">当前余额: <text class="num margin-right">{{scores}}积分</text>累计充值: <text class="num">¥{{cost}}</text></view>
		<view class="flex-sub ">
			<view class="taglist flex justify-between flex-wrap">
				<view class="tag flex align-center" :class="{'active':selectIndex==index}" v-for="(item,index) in list" :key='index'
				 @tap="select(index)" >
					<view>
						<p>{{item.title}}</p>
						<p class="price">{{item.price}}元</p>
					</view>
				</view>
			</view>
		</view>
		<view class="ftbar" v-if="list.length>0">
			<view class="btn"  @tap="submit"><text>立即购买</text>({{money}}元)</view>
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
				scores: 0,
				cost: 0,
				list: []
			};
		},
		components:{buymodal},
		computed: {
			money() {
				return this.list.length>0&&this.list[this.selectIndex].price || 0
			}
		},
		created() {
			this.getScoreTemplates();
			this.scores = uni.getStorageSync('userInfo').scores
			this.cost = uni.getStorageSync('userInfo').cost
		},
		methods: {
			getScoreTemplates() {
				this.$getajax(this.$api.getScoreTemplates).then(da => {
					if (da.code == 10000) {
						this.list = da.list;
					}
				})
			},
			select(index) {
				this.selectIndex = index;
			},
			submit() {
				this.$refs.buymodal.show('scores', this.list[this.selectIndex].id)
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
	}

	.taglist {
		margin-top: 20upx;
		padding: 0 15upx;

		.tag {
			width: 330upx;
			margin: 10upx 15upx;
			border: 1px solid #FF6A00;
			border-radius: 10upx;
			height: 140upx;
			text-align: center;
			color: #FF6A00;
			font-size: 38upx;



			&>view {
				width: 100%;
			}

			.price {
				color: #999;
				font-size: 30upx;
				margin-top: 10upx;
			}

			&.active {
				color: #fff;
				background: #FF6A00;

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
