<template>
	<view class="cu-modal" :class="showModal?'show':''">
		<view class="cu-dialog bg-white">
			<view class="title flex justify-between align-center">
				<text>请扫描二维码</text>
				<text class="cuIcon-close" @tap="hideModal"></text>
			</view>
			<view class='padding-sm'>
				<image :src="qrimg" class="imgbox" mode="widthFix"></image>
			</view>
			<view class="ftbar flex align-center">
				<view class="btn flex-sub" @tap="hideModal">
					取消
				</view>
				<view class="btn flex-sub" @tap="submit">
					确认支付
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		basePath
	} from '@/utils/index.js'

	export default {
		data() {
			return {
				showModal: false,
				qrimg: '',
				goodsId: '',
				type: 'vips',
				payQrurl: '',
				orderNo: '',
				timer: null
			};
		},

		computed: {},
		destroyed() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null
			}
		},
		methods: {
			show(type, goodsId) {
				this.type = type;
				this.goodsId = goodsId;
				this.createPayQrcode();
			},
			createPayQrcode() {
				this.$getajax(this.$api.createPayQrcode, {
					type: this.type,
					goodsId: this.goodsId
				}).then(da => {
					if (da.code == 10000) {
						this.showModal = true;
						this.orderNo = da.orderNo;
						this.payQrurl = da.payQrurl;
						this.showQrcode(this.payQrurl)

					}
				})
			},
			showQrcode(content) {
				this.$getajax(this.$api.showQrcode, {
					content: content
				}).then(da => {
					// this.qrimg=da;
					this.qrimg = basePath + this.$api.showQrcode + '?content=' + content;
					this.timer = setInterval(() => {
						this.getPayState();
					}, 3000)
				})
			},
			getPayState() {
				this.$getajax(this.$api.getPayState, {
					orderNo: this.orderNo
				}).then(da => {
					if (da.code == 10000) {
						this.hideModal();
						this.getUserInfo();
					}
				})
			},
			hideModal(){
				this.showModal=false;
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null
				}
			},
			getUserInfo(){
				
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



		.picker {
			line-height: 60upx;
			text-align: left;
			margin: 10upx 40upx;
		}
	}

	.ftbar {
		border-top: 2upx solid rgba(0, 0, 0, .1);
		height: 112upx;
		
		.btn {
			font-weight: bold;
			font-size: 34upx;
			height: 110upx;
			text-align: center;
			line-height: 110upx;

			&+.btn {
				border-left: 2upx solid rgba(0, 0, 0, .1);
				color: #576B95;
				font-size: 34upx;
				background: none;
			}

		}
	}

	.imgbox {
		width: 90%;
	}
</style>
