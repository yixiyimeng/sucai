<template>
	<view>
		<tui-bubble-popup :show="popupShow" @close="toggle" :maskBgColor="maskBgColor" right="8px" :top="popupTop"
		 triangleRight="16px" triangleTop="-22rpx">
			<view class="tui-popup-item" :class="{ 'tui-start': index === 0, 'tui-last': index === itemList.length - 1 }"
			 hover-class="tui-item-active" :hover-stay-time="150" @tap="handleClick(index)" v-for="(item, index) in itemList"
			 :key="index">
				<text class="lg" :class="'cuIcon-' + item.icon" v-if="item.icon && isImage"></text>
				<!-- <image :src="item.icon" v-if="item.icon && isImage" :style="{width:width,height:height}"></image> -->
				<text class="tui-bubble-popup_title">{{ item.title }}</text>
			</view>
		</tui-bubble-popup>
	</view>
</template>

<script>
	import tuiBubblePopup from '../tui-bubble-popup/tui-bubble-popup';
	//右上角气泡弹层
	export default {
		name: 'tRtPopup',
		props: {
			//如果图标是image，则icon传入图片地址
			itemList: {
				type: Array,
				default: () => {
					return [{
						title: '关闭',
						icon: 'close'
					}];
				}
			},
			//遮罩背景色
			maskBgColor: {
				type: String,
				default: 'transparent'
			},
			//图标是否为图片
			isImage: {
				type: Boolean,
				default: true
			},
			//图标宽度
			width: {
				type: String,
				default: '40rpx'
			},
			//图标高度
			height: {
				type: String,
				default: '40rpx'
			}

		},
		components: {
			tuiBubblePopup
		},
		created() {
			// #ifdef H5
			this.popupTop = 50 + uni.upx2px(12) + 'px';
			// #endif
		},
		data() {
			return {
				popupShow: false,
				popupTop: '12rpx'
			};
		},
		methods: {
			handleClick(index) {
				this.$emit('click', {
					index: index
				});
				this.toggle()
			},
			toggle() {
				this.popupShow = !this.popupShow;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tui-popup-item {
		padding:  20upx 34upx;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			border-bottom: 1rpx solid #888;
			-webkit-transform: scaleY(0.5);
			transform: sc8aleY(0.5);
			bottom: 0;
			right: 0;
			left: 38rpx;
		}

		.tui-bubble-popup_title {
			padding-left: $uni-spacing-row-base;
		}
	}

	.tui-start {
		border-top-left-radius: 8rpx;
		border-top-right-radius: 8rpx;
	}

	.tui-last {
		border-bottom-left-radius: 8rpx;
		border-bottom-right-radius: 8rpx;

		&::after {
			border-bottom: 0 !important;
		}
	}

	.tui-item-active {
		background-color: #444;
	}
</style>
