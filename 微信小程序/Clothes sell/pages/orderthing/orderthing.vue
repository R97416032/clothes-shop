<template>
	<view>
		<view style="padding: 20rpx 50upx 50upx 20rpx;">
			<view style="border-bottom:1upx solid #e7e7e7;padding: 10upx 0 10upx 0; " class="flex justify-around bg-white" v-for="(item,index) in clothes"  :key='index'>
				<view style="padding: 10upx 0 10upx 0; display: flex; width: 100%; height: 40rpx;">
					<image style="width: 30rpx; height: 30rpx; margin-top: 8rpx; margin-left: 5rpx; " src="../../static/logo.png"></image>
					<text style="font-size: 30rpx; margin-top: 1rpx; margin-left: 5rpx;">阿噗猪服装专卖店</text>
					<text style="font-size: 26rpx; margin-top: 6rpx; color: #000000; padding-left: 140px;">交易快照</text>
				</view>
				<view style="display: flex;">
						<view style="width: 250upx;">
							<!-- <image style="width: 250upx;height: 300upx; border-radius: 10px;" :src="onloadimg(item.id)"></image> -->
							<image style="margin-top: 10px; width: 200upx; height: 200upx; border-radius: 10px; " :src="'data:image/jpg;base64,'+item.img"></image>
						</view>
						<view  style="margin-left: 10rpx; width: 400upx;flex-direction: column;" class="flex justify-between">
							<!-- 上面 -->
							
							<!-- 下面 -->
							<view style="margin-bottom: 10upx;padding-top: 10upx;">
								<view>
									<text style="color:#F0AD4E;font-size: 90%;">{{item.name}}</text>
									<view class="cu-tag sm bg-red radius" style="font-size: 30rpx;color: #808080;margin-top: 10rpx;">{{item.classification}}</view>
								</view>
								<view style="font-size: 120%;">
									<view class="cu-tag sm bg-orange radius" style="font-size: 25rpx;margin-top: 10rpx;">服装尺码: {{item.size}}</view>
									<text style="color: grey;font-size: 25rpx;">服装颜色: {{item.color}}</text>
									<text style="color: #DD524D;font-size: 40rpx;float: right;">实付款￥{{item.price}}</text>
								</view>
								<view style="width: 100%;height: 20upx;"></view>
							</view>
						</view>
				</view>
			</view>
		</view>
		<view style="width: 100%; height: 10rpx; background-color: #F0F0F0;"></view>
		<view style=" padding: 50rpx 20upx 20upx 20rpx;">
			<view style="width: 100%; height: 40px;">
				<text style="margin-top: 5px; margin-left: 10rpx; font-size: 40rpx;">订单信息</text>
			</view>
			<view style="margin-top: 10px;">
				<view style="display: flex;">
					<text style="font-size: 30rpx; margin-left: 10rpx; margin-top: 10rpx;">订单状态：</text>
					<text style="font-size: 30rpx; margin-left: 40rpx; margin-top: 10rpx;">{{orderthing.type}}</text>
				</view>
				<view style="display: flex;">
					<text style="font-size: 30rpx; margin-left: 10rpx; margin-top: 10rpx;">收货地址：</text>
					<text style="font-size: 30rpx; margin-left: 40rpx; margin-top: 10rpx;">{{orderthing.address}}</text>
				</view>
				<view style="display: flex;">
					<text style="font-size: 30rpx; margin-left: 10rpx; margin-top: 10rpx;">订单编号：</text>
					<text style="font-size: 30rpx; margin-left: 40rpx; margin-top: 10rpx;">{{orderthing.id}}</text>
				</view>
				<view style="display: flex;">
					<text style="font-size: 30rpx; margin-left: 10rpx; margin-top: 10rpx;">付款时间：</text>
					<text style="font-size: 30rpx; margin-left: 40rpx; margin-top: 10rpx;">{{orderthing.paytime}}</text>
				</view>
				<view style="display: flex;">
					<text style="font-size: 30rpx; margin-left: 10rpx; margin-top: 10rpx;">发货时间：</text>
					<text style="font-size: 30rpx; margin-left: 40rpx; margin-top: 10rpx;">{{orderthing.delivery_time}}</text>
				</view>
				<view style="display: flex;">
					<text style="font-size: 30rpx; margin-left: 10rpx; margin-top: 10rpx;">发货时间：</text>
					<text style="font-size: 30rpx; margin-left: 40rpx; margin-top: 10rpx;">{{orderthing.delivery_num}}</text>
				</view>
				<view style="display: flex;">
					<text style="font-size: 30rpx; margin-left: 10rpx; margin-top: 10rpx;">订单备注：</text>
					<text style="font-size: 30rpx; margin-left: 40rpx; margin-top: 10rpx;">{{orderthing.remarks}}</text>
				</view>
			</view>
			<view style="display: flex; margin-top: 20px;">
				<button @click="updata(orderthing.id)" style="margin-left: 30rpx; width: 180rpx; height: 60rpx; font-size: 30rpx;">确认收货</button>
				<button @click="cancel(orderthing.id)" style="margin-left: 30rpx; width: 180rpx; height: 60rpx; font-size: 30rpx;">支付订单</button>
				<button @click="deleorder(orderthing.id)" style="margin-left: 30rpx; width: 180rpx; height: 60rpx; font-size: 30rpx;">删除订单</button>
			</view>
			<cl-confirm ref="pay" :close-on-click-modal="false" >
				<view style="margin-top: 30rpx;">
					<cl-radio v-model="payment" label="微信">微信</cl-radio>
					<cl-radio v-model="payment" label="支付宝">支付宝</cl-radio>
				</view>
			</cl-confirm>
			<view style="width: 100%; height:50rpx ;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				clothesID:[],
				orderID:'',
				payment: '微信',
				orderthing:{},
				clothes:{}
			}
		},
		onLoad:function(option){
			console.log("1111"+option.id)
			wx.request({
				url:'http://192.168.137.218:8081/getclothesbyorder_ID',
				data:{
					order_ID:option.id
				},
				success: (response) => {
					this.clothesID=response.data
					console.log("服装ID"+response.data)
					console.log("订单ID"+this.clothesID)
						wx.request({
							method: 'POST',
							url:'http://192.168.137.218:8081/getclothesbyclothing_ID',
							data:{
								clothing_ID:this.clothesID
							},
							success: (response) => {
								this.clothes=response.data
								console.log("服装表后端"+response.data)
								console.log("服装表前端"+this.clothes)
							}
						})
						wx.request({
							url:'http://192.168.137.218:8081/orderonebyorid',
							data:{
								order_ID:option.id
							},
							success: (response) => {
								this.orderthing = response.data
								console.log("订单表后端"+response.data)
								console.log("订单表前端"+this.orderthing)
							}
						})
					}
			})
		},
		created() {
			
		},
		methods: {
			updata(id){
				wx.request({
					url:'http://192.168.137.218:8081/getuptypeorder',
					data:{
						order_ID:id
					},
					success: (response) => {
						this.orderthing = response.data
						console.log("订单表后端"+response.data)
						console.log("订单表前端"+this.orderthing)
					}
				})
			},
			deleorder(id){
				wx.request({
					url:'http://192.168.137.218:8081/deleteorder',
					data:{
						order_ID:id
					},
					success() {
						uni.redirectTo({
							url:'../clothes/clothes'
						})
					}
				})
			},
			cancel(id){
				this.$refs.pay
				.open({
						title: "付款",
						confirmButtonText: "确认付款",
						cancelButtonText: "取消付款",
					})
					.then(() => {
						wx.request({
							method:'GET',
							url: 'http://192.168.137.218:8081/payorder',
							data:{
								order_ID: id,
								payment: this.payment
							},
							success: (response) => {
								uni.showToast({
									title: '支付成功',
									icon: "success",
									duration: 2000,
									success: () => {
										setTimeout( () => {
											uni.navigateBack({
												delta: 1
											})				
										},1000);
									}
								})
								this.orderthing = response.data
								console.log("订单表后端"+response.data)
								console.log("订单表前端"+this.orderthing)
							}
						})
					})
					.catch(() => {
						uni.showToast({
							title: '放弃付款',
							image: '../../../static/pay/error.png',
							duration: 2000,
							success: () => {
								setTimeout( () => {
									uni.navigateBack({
										delta: 1
									})				
								},1000);
							}
						})
					});
			}
			
		}
	}
</script>

<style>

</style>
