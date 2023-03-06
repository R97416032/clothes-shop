<template>
		<view>
			<view style="width: 700rpx; height: 700rpx; margin-top: 20px; ">
				<view style="display: flex; ">
					<image style=" width: 150rpx; height: 150rpx; margin-left: 40rpx;" src="../../../static/logo.png"></image>
				
					<view>
						<view style="font-size: 40rpx; color: #333333; margin-left: 20rpx;">用户名: {{name}}</view>
						<view style="font-size: 35rpx; color: #808080; margin-top: 20rpx; margin-left: 20rpx;">手机号: {{tel}}</view>
					</view>
				</view>
				<view style="height: 120px; width: 95%; margin-left: 6%; margin-top: 30px; background-color: #F8F8F8; border-radius: 15px;">
					<view style="display: flex; margin-top: 10px;">
						<image src="../../../static/ordericon.png" style="width: 40px; height: 40px; margin-left: 5px;"></image>
						<text style="font-size: 25px; margin-left: 3px; margin-top: 3px;">我的订单</text>
						<text @click="ordersee()" style="font-size: 20px; margin-left: 50px; margin-top: 8px; color:#808080;">点击查看</text>
					</view>
					<view style="width: 100%; height: 1rpx; background-color: #333333; margin-top: 10px;"></view>
					<view style="display: flex; margin-top: 5px;">
						<image src="../../../static/meicon.png" style="margin-top: 10px; width: 40px; height: 40px; margin-left: 5px;"></image>
						<text style="font-size: 25px; margin-left: 3px; margin-top: 10px;">个人信息</text>
						<text @click="minesee()" style="font-size: 20px; margin-left: 50px; margin-top: 12px; color:#808080;">点击查看</text>
					</view>
				</view>
				<button @click="tuichu()" style="width: 60%; height: 100rpx; margin-top: 200px; background-image:linear-gradient(#e66465, #9198e5); margin-left: 22%; " >退出登录</button>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				tel:''
			}
		},
		onLoad() {
			var that=this;
			uni.getStorage({
			    key: 'storage_key',
			    success: (res) =>  {
					that.tel = res.data.tel;
					that.name = res.data.name
			        console.log(res.data);
			    },
			});
		},
		methods: {
			ordersee(){
				uni.navigateTo({
				    url:'../../clothes/clothes'
				});
			},
			minesee(){
				uni.navigateTo({
					url:'../../user/user'
				})
			},
			tuichu(){
				uni.redirectTo({
					url:'../../index/index'
				})
			}
		}
	}
</script>

<style>
	
</style>
