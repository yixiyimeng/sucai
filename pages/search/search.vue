<template>
	<view class="pageview flex flex-direction">
		<div class="searchbar ">
			<view class="flex align-center">
				<image src="/static/sousuo2.png" mode="widthFix"></image>
				<input type="text" class="flex-sub" v-model="keyword" placeholder="搜索" confirm-type="search" @confirm="confirm($event)">
				<text class="del cuIcon-roundclosefill" @click.stop="cancel" v-if="keyword.length>0"></text>
			</view>
		</div>
		<view class="flex-sub">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action border-title">
					<text class="text-orange">相关专辑</text>
					<text class="bg-gradual-orange" style="width:4em"></text>
				</view>
			</view>
			<view class="bg-white">
				<view class='padding-sm flex flex-wrap justify-between'>
					<view class="padding-xs" v-for="(item,index) in 3" :key="index">
						<view class='cu-tag  radius'>标签</view>
					</view>
				</view>
				<view class="more">
					<text>展开</text>
					<text class="cuIcon-unfold"></text>
				</view>
			</view>
			<view class="cu-bar bg-white  margin-top-sm">
				<view class="action border-title">
					<text>共20条结果</text>
				</view>
			</view>
			<view class="">
				<view class="padding goodslist flex flex-wrap justify-between">
					<view class="goods-item" v-for="(item,index) in 10" :key="index">
						<image src="/static/demo.png" mode="aspectFill"></image>
						<p>配景乔木psd</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
			};
		},
		methods: {
			confirm() {
				/* TODO 搜索 */
			},
			cancel() {
				this.keyword = ''
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
	.pageview>.flex-sub {
		height: 200upx;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}

	.searchbar {
		background: #141414;

		padding: 10upx 0;

		&>view {
			background: #fff;
			margin: 0 20upx;
			padding: 0 20upx;
			border-radius: 50upx;
			height: 60upx;

			input {
				font-size: 26upx;
			}
		}

		image {
			width: 40upx;
			margin-right: 20upx;
		}
	}

	.del {
		color: #bbb;
		font-size: 36upx;
	}

	.more {
		text-align: center;
		padding: 10upx;
		color: #999;
	}
</style>
