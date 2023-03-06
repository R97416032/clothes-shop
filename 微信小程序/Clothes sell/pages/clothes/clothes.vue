<template>
	<view >
		<view class="example-body">
			<view :fixed="false" style="display: flex;" color="#333333" background-color="#FFFFFF" >
				<view class="input-view">
					<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
					<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入服装关键词" v-model="search_input">
				</view>
				<button style="width: 120rpx; display: flex; height: 60rpx; margin-top: 15rpx; margin-left: 10rpx; font-size: 27rpx; background-color: #F1F1F1;" @click="search()">搜索</button>
			</view>
		</view>
		<view style="width: 100%; height: 0.1rpx; display: flex; border-radius: 10px;">
			<uni-collapse :accordion="true" style="width: 100%; display: flex; flex-direction:row">
				<uni-collapse-item title="订单种类"  style="width: 260rpx;" >
					<view style=" background-color:#FFFFFF;">
						<view style="width: 100%; height: 60rpx; text-align:center; background-color:#F8F8F8"  @click="all()">
							<text style="font-size: 30rpx;">全部</text>
						</view>
						<view style="width: 100%; height: 60rpx; text-align:center; background-color:#F8F8F8"  @click="ordertype('待付款')">
							<text style="font-size: 30rpx;">待付款</text>
						</view>
						<view style="width: 100%; height: 60rpx; text-align:center; background-color:#F8F8F8"  @click="ordertype('未发货')">
							<text style="font-size: 30rpx;">未发货</text>
						</view>
						<view style="width: 100%; height: 60rpx; text-align:center; background-color:#F8F8F8"  @click="ordertype('待收货')">
							<text style="font-size: 30rpx;">待收货</text>
						</view>
						<view style="width: 100%; height: 60rpx; text-align:center; background-color:#F8F8F8"  @click="ordertype('已收货')">
							<text style="font-size: 30rpx;">已收货</text>
						</view>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="流水分析"  style="width: 260rpx; " >
					<view style=" background-color: #FFFFFF;">
						<view style="width: 100%; height: 60rpx; text-align:center; background-color:#F8F8F8"  @click="analyse()">
							<text style="font-size: 30rpx;">订单分析</text>
						</view>
						<view style="width: 100%; height: 60rpx; text-align:center; background-color:#F8F8F8"  @click="year()">
							<text style="font-size: 30rpx;">年度消费</text>
						</view>
						<view style="width: 100%; height: 60rpx; text-align:center; background-color:#F8F8F8"  @click="month()">
							<text style="font-size: 30rpx;">月季消费</text>
						</view>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="时间区间"  style="width: 260rpx;" >
					<view style=" background-color: #FFFFFF;">
						<view style="display: flex;">
							<!-- <view style="font-size: 35rpx;">从: </view> -->
							<input style="height: 40rpx; width: 120rpx; margin-left: 50rpx; background-color: #E4E4E4;" v-model="datamin" />
						</view>
						<text style="margin-left: 100rpx;">|</text>
						<view style="display: flex;">
						<!-- 	<view style="font-size: 35rpx;">到: </view> -->
							<input style="height: 40rpx; width: 120rpx; margin-left: 50rpx;  background-color: #E4E4E4;" v-model="datamax" />
						</view>
						<button style="height: 60rpx; width: 200rpx; margin-top: 40rpx; font-size: 32rpx; background-color: #F3C9C3;" @click="dataselect()">确认</button>
						<button style="height: 60rpx; width: 200rpx; margin-top: 25rpx; font-size: 32rpx; background-color: #C0C0C0;" @click="all()">重置</button>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<!-- 商品列表信息情况页面 -->
		<view style="padding: 50rpx 20upx 20upx 20rpx;">
			<view  style="border-bottom:1upx solid #e7e7e7;padding: 10upx 0 10upx 0; " class="flex justify-around bg-white" v-for="(item,index) in order"  :key='index'>
				<view style="padding: 10upx 0 10upx 0; display: flex; width: 100%; height: 40rpx;">
					<image style="width: 30rpx; height: 30rpx; margin-top: 8rpx; margin-left: 5rpx; " src="../../static/logo.png"></image>
					<text style="font-size: 30rpx; margin-top: 1rpx; margin-left: 5rpx;">阿噗猪服装专卖店</text>
					<text style="font-size: 24rpx; margin-top: 8rpx; color: #FFA200; padding-left: 140px;">欢迎下次购物</text>
				</view>
				
				<view style="border-bottom:1upx solid #e7e7e7;padding: 10upx 0 10upx 0; " class="flex justify-around bg-white" v-for="(item2,key) in item"  :key='key'>
					<view  class="box" v-for="data in item2">
						<view @click="orderthing(key)" style="display: flex;">
								<view style="width: 250upx;">
									<!-- <image style="width: 250upx;height: 300upx; border-radius: 10px;" :src="onloadimg(item.id)"></image> -->
									<image style="margin-top: 10px; width: 200upx; height: 200upx; border-radius: 10px; " :src="'data:image/jpg;base64,'+data.img"></image>
								</view>
								<view  style="margin-left: 10rpx; width: 400upx;flex-direction: column;" class="flex justify-between">
									<!-- 上面 -->
									
									<!-- 下面 -->
									<view style="margin-bottom: 10upx;padding-top: 10upx;">
										<view>
											<text style="color:#F0AD4E;font-size: 90%;">{{data.name}}</text>
											<view class="cu-tag sm bg-red radius" style="font-size: 30rpx;color: #808080;margin-top: 10rpx;">{{data.classification}}</view>
										</view>
										<view style="font-size: 120%;">
											<view class="cu-tag sm bg-orange radius" style="font-size: 25rpx;margin-top: 10rpx;">服装尺码: {{data.size}}</view>
											<text style="color: grey;font-size: 25rpx;">服装颜色: {{data.color}}</text>
											<text style="color: #DD524D;font-size: 40rpx;float: right;">   ￥{{data.price}}</text>
										</view>
										<view style="width: 100%;height: 20upx;"></view>
									</view>
								</view>
						</view>
						
					</view>
				</view>
				
				
				
			</view>
		</view>
		<view style="font-size: 25rpx; margin-left: 30%; color: #C0C0C0;">真的划不动了，已经到底了</view>
		<view style="height: 140rpx; width: 100%;"></view>
	</view>
</template>

<script>
	import uniIcons from'../../components/uni-icons/uni-icons.vue'
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
	import uniSection from '../../components/uni-section/uni-section.vue'
	export default {
		components: {
			uniIcons,
			uniNavBar,
			uniSection
		},
		data() {
			return {
				order: {},
				clothes: {},
				clothes_ID:[],
				usertel:'',
				datamin:'',
				datamax:'',
				search_input:'',
				
			}
		},
		onLoad() {
			var that=this;
			uni.getStorage({
			    key: 'storage_key',
			    success: (res) =>  {
					that.usertel = res.data.tel;
			        console.log(res.data.tel);
					
					wx.request({
						method: 'GET',
						url:'http://192.168.137.218:8081/getorlclothes',
						data:{
							usertel:res.data.tel
						},
						success: (response) => {
							that.order=response.data
							console.log("后端"+response.data[1])
						}
					})
			    },
			});	
			
		},
		methods: {
			orderthing(id){
				uni.navigateTo({
					url:'../orderthing/orderthing?id='+id
				})
			},
			ordertype(e){
				console.log("type"+e)
				console.log("usertel"+this.usertel)
				wx.request({
					url:'http://192.168.137.218:8081/getclothesbytype',
					data:{
						type:e,
						usertel:this.usertel
					},
					success: (response) => {
						this.order = response.data
					}
				})
			},
			search(){
				wx.request({
				url:'http://192.168.137.218:8081/getclothesbyname',
				data:{
					name:this.search_input
				},
				success: (response) => {
					this.order = response.data
				}
				})
			},
			all(){
				wx.request({
					method: 'GET',
					url:'http://192.168.137.218:8081/getorlclothes',
					data:{
						usertel:this.usertel
					},
					success: (response) => {
						this.order=response.data
						console.log("后端"+response.data[1])
					}
				})
			},
			dataselect(){
				wx.request({
					url:'http://192.168.137.218:8081/getoridbydata',
					data:{
						datamin:this.datamin,
						datamax:this.datamax,
						usertel:this.usertel
					},
					success: (response) => {
						this.order=response.data
						console.log("后端"+response.data[1])
					}
				})
			},
			analyse(){
				uni.navigateTo({
					url:'../table/table'
				})
			},
			year(){
				uni.navigateTo({
					url:'../table/table2'
				})
			},
			month(){
				uni.navigateTo({
					url:'../table/table3'
				})
			}
		}
	}
</script>

<style>
.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}
	.uni-nav-bar-text {
		font-size: 28rpx;
	}
	.city {
			/* #ifndef APP-PLUS-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			/* width: 160rpx;
	*/
			margin-left: 4px;
		}
	.input-view {
			/* #ifndef APP-PLUS-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			/* width: 500rpx;
	*/
			flex: 1;
			background-color: #f8f8f8;
			height: 30px;
			width: ;
			border-radius: 15px;
			padding: 0 15px;
			flex-wrap: nowrap;
			margin: 7px 0;
			line-height: 30px;
		}
	.input-uni-icon {
		line-height: 30px;
	}
	.nav-bar-input {
		height: 30px;
		line-height: 30px;
		/* #ifdef APP-PLUS-NVUE */
		width: 100%;
		/* #endif */
		padding: 0 5px;
		font-size: 28rpx;
		background-color: #f8f8f8;
	}
</style>


