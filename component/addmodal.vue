<template>
	<view class="cu-modal" :class="showModal?'show':''">
		<view class="cu-dialog bg-white">
			<view class="title flex justify-between align-center">
				<text>{{this.id==0?'添加':'编辑'}}收藏夹</text>
				<text class="cuIcon-close" @tap="showModal=false"></text>
			</view>
			<view class="padding-sm solid text-left margin">
				<input type="text" value="" v-model="info" placeholder="收藏夹名称" />
			</view>
			<view class="ftbar flex">
				<view class="btn flex-sub" @tap="cancel">
					取消
				</view>
				<view class="btn flex-sub" @tap="submit">
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showModal: false,
				info: '',
				id: ''
			};
		},
		methods: {
			show(id,name) {
				this.id = id||0;
				this.info=name||'';
				this.showModal = true;
			},
			cancel() {
				this.showModal = false
			},
			submit() {
				let $me=this;
				this.$postajax(this.$api.addFollowFile, {
					name: this.info,
					id:this.id
				}).then(da => {
					if (da.code == 10000) {
						uni.showToast({
							title:$me.id==0?'添加成功':'编辑成功',
							icon: 'none'
						})
						this.showModal = false;
						this.$emit('upload',this.info);
					} else {
						uni.showToast({
							title: da.message,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-modal {
		.cu-dialog {
			width: 600upx;
		}

		.title {
			color: #000;
			font-size: 40upx;
			padding: 38upx 36upx 30upx 48upx;

			image {
				width: 46upx;
			}
		}

		.logo {
			width: 118upx;
			margin: 50upx auto;
		}

		.copyitem {
			font-size: 34upx;
			color: rgba($color: #000000, $alpha: .6);
			padding: 20upx 60upx;

			.btn {
				color: #3DC098;
				border: 1px solid #3DC098;
				border-radius: 20upx;
				font-size: 24upx;
				line-height: 40upx;
				width: 80upx;
			}
		}

		.ftbar {
			border-top: 2upx solid rgba(0, 0, 0, .1);
			height: 112upx;
			margin-top: 50upx;

			.btn {
				font-weight: bold;
				font-size: 34upx;
				line-height: 110upx;
				text-align: center;

				&+.btn {
					border-left: 2upx solid rgba(0, 0, 0, .1);
					line-height: 110upx;
					color: #576B95;
					font-size: 34upx;
					background: none;
				}

			}
		}
	}
</style>
