<template>
	<view class="pageview flex flex-direction">
		<searchbar @search="search"></searchbar>
		<div class="flex-sub flex" style="overflow: hidden;">
			<div class="submenu">
				<scroll-view scroll-y scroll-with-animation class="scroll-view" :scroll-into-view="'head-' + cateIndex">
					<div class="submenu-item flex flex-align-center" :class="{ active: cateIndex == myitemIndex }" v-for="(item, myitemIndex) in menulist"
					 :key="myitemIndex" @click="scrollTo(myitemIndex, item)" :id="'head-' + myitemIndex">
						<span class="cate ">{{ item.name }}</span>
					</div>
				</scroll-view>
			</div>
			<div class="flex-sub main">
				<mescroll-uni  @init="mescrollInit" @down="downCallback" @up="upCallback" :fixed="false">
					<view class="padding goodslist flex flex-wrap justify-between">
						<navigator url="/pages/details/details" class="goods-item" hover-class="none" v-for="(item,index) in 10" :key="index">
							<image src="/static/demo.png" mode="aspectFill"></image>
							<p>配景乔木psd</p>
						</navigator>
					</view>
				</mescroll-uni>
			</div>
		</div>
	</view>
</template>

<script>
	import MescrollMixin from "@/component/mescroll-uni/mescroll-mixins.js"
	import searchbar from '@/component/searchbar.vue'
	export default {
		components: {
			searchbar
		},
		mixins: [MescrollMixin],
		data() {
			return {
				cateIndex: 0,
				menulist: [{
					'name': '关注的'
				}, {
					'name': '关注的'
				}, {
					'name': '关注的'
				}]
			};
		},
		methods: {
			search(keyword) {
				// console.log(keyword)
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			scrollTo(index, item) {
				this.cateIndex = index
			}
		}
	}
</script>
<style>
	page,
	.pageview {
		height: 100%;
		overflow: hidden;
	}
</style>
<style lang="scss">
	.main {
		height: 100%;
		overflow: auto;
	}

	.submenu {
		height: 100%;
		width: 170upx;
		background: #fff;

		.submenu-item {
			line-height: 80upx;
			text-align: center;

			&.active {
				background: #f1f1f1;
				position: relative;
				color: #FF6A00;

				&.active::after {
					content: "";
					width: 8upx;
					height: 30upx;
					border-radius: 10upx 0 0 10upx;
					position: absolute;
					background-color: currentColor;
					top: 0;
					right: 0upx;
					bottom: 0;
					margin: auto;
				}
			}

			&>span {
				width: 100%;
			}
		}
	}
</style>
