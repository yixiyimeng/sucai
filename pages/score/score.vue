<template>
	<view class=" pageview flex flex-direction">
		<view class="tip">当前余额: <text class="num margin-right">4335积分</text>累计充值: <text class="num">¥44.55</text></view>
		<view class="flex-sub ">
			<view class="taglist flex justify-between flex-wrap">
				<view class="tag flex align-center" :class="{'active':selectIndex==index}" v-for="(item,index) in 6" :key='index'>
					<view>
						<p>100积分</p>
						<p class="price">10元</p>
					</view>
				</view>
			</view>
		</view>
		<view class="ftbar">
			<view class="btn"><text>立即购买</text>(110.00元)</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectIndex: 0
			};
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
