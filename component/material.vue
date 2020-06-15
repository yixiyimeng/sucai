<template>
	<view class="padding goodslist flex flex-wrap justify-between">
		<navigator :url="`/pages/details/details?id=${item.id}`" class="goods-item" hover-class="none" v-for="(item,index) in list"
		 :key="index">
			<image :src="item.coverPath" mode="aspectFill"></image>
			<p class="flex">
				<text class="text-cut flex-sub text-left">{{item.title}}</text>
				<view class="materialdel">
					<text class=" cuIcon-deletefill" @tap.stop="delfollowconfirm(item)"></text>
				</view>
			</p>
		</navigator>
	</view>
</template>

<script>
	import addmodal from "@/component/addmodal"
	export default {
		data() {
			return {

			};
		},
		props: {
			list: {
				type: Array,
				default: []
			}
		
		},
		computed: {},
		methods: {
			/* 删除收藏 */
			delfollowconfirm(item) {
				let $me = this;
				uni.showModal({
					title: '',
					content: '你确定要删除(' + item.title + ')这个素材吗？',
					success: function(res) {
						if (res.confirm) {
							$me.delfollow(item.id)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			/* 删除收藏素材 */
			delfollow(id) {
				this.$getajax(this.$api.removeMaterialStore, {
					mid: id
				
				}).then(da => {
					uni.showToast({
						title: (da.code == 10000) ? '删除成功' : da.message,
						icon: 'none'
					});
					if (da.code == 10000) {
						this.$emit('upload')
						// this.mescroll && this.mescroll.resetUpScroll();
					}

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.materialdel {
		color: #f37b1d;
		width: 50upx;
		font-size: 38upx;
	}
</style>
