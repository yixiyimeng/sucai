<template>
	<div class="searchbar">
		<view class="flex align-center">
			<image src="/static/sousuo2.png" mode="widthFix"></image>
			<input type="text" class="flex-sub" v-model="keyword" :placeholder="placeholdertxt" confirm-type="search" @confirm="confirm($event)">
			<text class="del cuIcon-roundclosefill" @click.stop="cancel" v-if="keyword.length>0"></text>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				keyword: ''
			};
		},
		props: {
			value: { // 当前显示的下标 (使用v-model语法糖: 1.props需为value; 2.需回调input事件)
				type: [String, Number],
				default () {
					return ''
				}
			},
			placeholdertxt:{
				type:String,
				default:'请输入想要素材的关键词'
			}
		},
		watch: {
			value(newval, oldval) {
				this.keyword = newval;
			}
		},
		created() {
			this.keyword=this.value;
		},
		methods: {
			confirm() {
				/* TODO 搜索 */
				this.$emit("input", this.keyword);
				this.$emit('search',this.keyword)
			},
			cancel() {
				this.keyword = '';
				this.$emit("input", this.keyword);
			}
		}
	}
</script>

<style scoped lang="scss">
	.searchbar {
		// background: #141414;

		padding: 10upx 0;

		&>view {
			background: #f1f1f1;
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

		.del {
			color: #bbb;
			font-size: 36upx;
		}
		/deep/ .uni-input-input,
		/deep/ .uni-input-placeholder{
			height: 40upx;
			line-height: 40upx;
		}
	}
</style>
