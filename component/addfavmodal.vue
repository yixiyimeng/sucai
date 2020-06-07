<template>
	<view class="cu-modal" :class="showModal?'show':''">
		<view class="cu-dialog bg-white">
			<view class="title flex justify-between align-center">
				<text>添加收藏夹</text>
				<text class="cuIcon-close"></text>
			</view>
			<view class='padding-sm'>
				<input type="text" value="" v-model="name"  placeholder="请输入收藏夹名称" />
			</view>
			<view class="btn bg-orange round">
				确定
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showModal: true,
				name:''
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
			width: 640upx;
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
	
</style>
