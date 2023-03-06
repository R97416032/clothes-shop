<template>
	<view class="bottom">
		<view class="nav-box">
			<br>
			<view class="nav-tab" :class="{'nav-tab-active':home===0}" @click="toIndex(0)">
					<image src="../../static/home.png" class="nav-icon"></image>
					<view class="nav-text">
						首页
					</view>
			</view>
			<br>
			<view style="width: 100%; height: 1px; background-color: #000000;"></view>
			<br>
			<view class="nav-tab" :class="{'nav-tab-active':home===1}" @click="toIndex(1)">
				<image src="../../static/order.png" class="nav-icon"></image>
				<view class="nav-text">
					订单
				</view>
			</view>
			<br>
			<view style="width: 100%; height: 1px; background-color: #000000;"></view>
			<br>
			<view class="nav-tab" :class="{'nav-tab-active':home===2}" @click="toIndex(2)">
				<image src="../../static/mine.png" class="nav-icon"></image>
				<view class="nav-text">
					我的
				</view>
			</view>
			<br>
			<view style="width: 100%; height: 1px; background-color: #000000;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				home: 0,
			}
		},
		onLoad() {

		},
		methods: {
			toPage(url) {
				uni.navigateTo({
					url
				})
			},
			toIndex(index) {
					this.$emit('toIndex', index)
					this.home = index
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 14%;
		height: 100%;
		box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.06);
		background: #fff;
		z-index: 10;
	}

	.nav-tab {
		fiex: 1;
		text-align: center;
		width: 100%;
		display: flex;
		flex-direction: row;
		height: $navHeight;
	}

	.nav-icon {
		height: 30px;
		width: 30px;
		margin-left: 20%;
		box-sizing:border-box;
		padding: 4px 0 2px 0;
	}

	.nav-icon .iconfont {
		font-size: 20px;
	}

	.nav-text {
		font-size: 20px;
		height: 19px;
		margin-left: 5%;
		color: #000000;
		font-weight: 400;
	}
.nav-tab-active .sle{
	background: #4CD964;
	display: flex;
	flex-direction: row;
	width: 100%;
}
	.sle{
		font-size: 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.nav-tab-active .circle {
		height: 38px;
		width: 38px;
		line-height: 38px;
		position: relative;
		top: -14px;
		left: calc(50% - 19px);
		border-radius: 50%;
		background: #4CD964;
		box-shadow: 0 3px 6px rgba(170, 0, 0, 0.2);
	}

	.nav-tab-active .iconfont {
		color: #fff;
	}

	.nav-tab-active .nav-text{
		color: $dominantHue;
	}
	.nav-box{
		/* position: absolute; */
		display: flex;
		margin-top: 20%;
		width: 100%;
		height: 40%;
		box-sizing:border-box;
		flex-direction:column;
	}

	/*苹果x适配 H5APP*/
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}

	/*苹果xs适配 H5APP*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}

	/*苹果xr适配 H5APP*/
	@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
		.bottom {
			height: $navHeight + $navBoxHeight;
		}
	}
	
</style>