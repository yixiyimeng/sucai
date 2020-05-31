<template>
	<view>
		<view class="cu-modal bottom-modal" :class="showModal?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModal">取消</view>
					<view class="action text-green" @tap="hideModal">确定</view>
				</view>
				<view class="title flex justify-between align-center">
					<text>选择收藏夹</text>
				</view>
				<view class="grid col-3 padding-sm">
					<view v-for="(item,index) in 10" class="padding-xs" :key="index">
						<button class="cu-btn orange lg block" :class="index==curIndex?'bg-orange':'line-orange'" @tap="ChooseCheckbox"
						 :data-value="item.value">1223 {{item.name}}
						</button>
					</view>
				</view>
				<view class="tip">
					<view>收藏后用电脑访问网址</view>
					<view>sucai.yipro.cn进入收藏下载</view>
				</view>
			</view>
		</view>
		<!-- <view class="cu-modal" :class="showModal?'show':''">
			<view class="cu-dialog bg-white">
				<view class="title flex justify-between align-center">
					<text>选择收藏夹</text>
					<text class="cuIcon-close"></text>
				</view>
				<view class='padding-sm flex flex-wrap'>
					<view class="padding-xs" v-for="(item,index) in 10" :key="index">
						<view class='cu-tag  round' :class="{active:index==curIndex}">1223</view>
					</view>
				</view>
				<view class="btn bg-orange round">
					确定
				</view>
				<view class="tip">
					<view>收藏后用电脑访问网址</view>
					<view>sucai.yipro.cn进入收藏下载</view>
				</view>
			</view>
		</view> -->
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				showModal: false,
				picker: [],
				curIndex:0
			};
		},

		computed: {},
		methods: {

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
			padding: 38upx 36upx 30upx 48upx;

			image {
				width: 46upx;
			}
		}

		.btn {
			line-height:80upx;
			width: 400upx;
			margin: 40upx auto;
		}

		.picker {
			line-height: 60upx;
			text-align: left;
			margin:  10upx 40upx;
		}
	}
	.cu-tag{
		width: auto;
		padding: 16upx;
		&.active{
			color: #fff;
			background: #f37b1d;
		}
	}
	.tip{
		color: #999;
		font-size: 20upx;
		padding: 20upx;
	}
</style>
