<template>
	<view class="pageview flex flex-direction">
		<view class="list flex-sub">
			<navigator hover-class="none" url="../followdetails/followdetails" class="follow-item" v-for="(item,index) in 3"
			 :key="index">
				<div class="name">神器插件</div>
				<view class="flex justify-between">
					<text class="num">100个关注</text>
					<text>2010-10-10 创建</text>
				</view>
			</navigator>
		</view>
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
		<addmodal ref="addmodal"></addmodal>
		
	</view>
</template>

<script>
	import addmodal from "@/component/addmodal"
	export default {
		data() {
			return {
				isAdd: false,
				name: ''
			};
		},
		components: {
			addmodal
		},
		methods: {
			handleAddFile() {
				/* 创建文件夹 */
			},
			addFile(){
				this.$refs.addmodal.show()
			}
		}
	}
</script>
<style>
	.pageview,
	page {
		height: 100%;
		overflow: hidden;
	}
</style>
<style lang="scss">
	.pageview>.flex-sub {
		height: 200upx;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	.list {
		padding-top: 20upx;

		.follow-item {
			padding: 30upx;
			margin-bottom: 20upx;
			background: #fff;
			border-top: 1px solid #eee;
			border-bottom: 1px solid #eee;
		}
	}

	.tip {
		text-align: center;
		color: #666;
		font-size: 20upx;
		padding-bottom: 10upx;
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
