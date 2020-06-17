<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<slot name="left">
						<text class="cuIcon-back"></text>
						<slot name="backText"></slot>
					</slot>
				</view>
				<view class="action" @tap="BackHome" v-if="isHome">
					<view class="home text-lg">
						<text class="cuIcon-home"></text>
					</view>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			isHome: {
				type: [Boolean, String],
				default: false
			}
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
				console.log('返回')
				// this.$emit('backPage')
			},
			BackHome(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style>
	.cu-custom {
		box-shadow: 0 10upx 10upx rgba(0, 0, 0, .05);
	}

	.bgColor {
		color: #333;
		background: #fff;
	}
</style>
