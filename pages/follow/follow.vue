<template>
	<view class="pageview flex flex-direction">
		<mescroll-body ref="mescrollRef" :bottom="80" @init="mescrollInit"  @down="downCallback" 
		 @up="upCallback">
			<!-- 数据列表 -->
			<view class="list">
				<navigator hover-class="none" url="../followdetails/followdetails" class="follow-item" v-for="(item,index) in 20"
				 :key="index">
					<div class="name">{{item.name}}</div>
					<view class="flex justify-between">
						<text class="num">100个关注</text>
						<text>2010-10-10 创建</text>
					</view>
				</navigator>
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
		<addmodal ref="addmodal"></addmodal>

	</view>
</template>

<script>
	import addmodal from "@/component/addmodal"
	import MescrollMixin from "@/component/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				isAdd: false,
				name: '',
				list:[]
			};
		},
		components: {
			addmodal
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
					this.list=curPageData;
					this.mescroll.endBySize(curPageData.length, curPageData.length);
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
