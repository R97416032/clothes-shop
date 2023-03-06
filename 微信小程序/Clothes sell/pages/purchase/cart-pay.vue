<template>
	<view>
			<uni-card is-shadow="true">
			   <template>
				   <view style="display: flex;flex-direction: row;">
					   <view style="padding: 25rpx;margin-top: 30rpx;">
							<uni-icons type="location-filled" size="33" ></uni-icons>
					   </view>
					   <view style="margin-left: 10rpx; width: 500rpx;">
						   <view>
								<text>{{name}}</text>	<text style="margin-left: 15rpx;">{{tel}}</text>
						   </view>
						   <view style="margin-top: 10rpx;">
								<region @change="selectRegion" ></region>
						   </view>
						   <view style="margin-top: 10rpx;">
								<cl-textarea v-model="address_detail" placeholder="请输入详细地址" ></cl-textarea>	   
						   </view>
					   </view>
				   </view>
			   </template>
			</uni-card>
			<uni-card is-shadow="true">
			   <template>
				   <view>
						<view>
							<uni-icons type="home"></uni-icons>
							<text style="margin-left: 15rpx;">xxx服装店</text>
						</view>
						<view v-for="(item,index) in clothes">
							<view style="flex-direction: row; display: flex; margin-top: 23rpx;">
								<image :src="item.img" style="width: 150rpx;height: 150rpx;margin-left: 20rpx;"></image>
								<view style="margin-left: 20rpx;display: flex;flex-direction: column; font-size: 27rpx;">
									<text style="width: 280rpx;">{{item.des}}</text>
									<text style="width:fit-content; background-color: #e1e1e1; color: #707070; margin-top: 15rpx;">{{"颜色："+item.color+",尺寸："+item.size}}</text>
								</view>
								<view>
									<cl-text type="price" style="margin-left: 30rpx;" :size="30" :value="item.price"></cl-text>
									<view class="num-box">
										<view class="num-box-image" @click="sub(index,item.num)">
											<text>-</text>
										</view>
										<view class="num-box-num">
											<text>{{item.num}}</text>
										</view>
										<view class="num-box-image" @click="add(index)">
											<text>+</text>
										</view>
									</view>
								</view>
							</view>
							<cl-divider :color="['#fff', '#F56C6C']"></cl-divider>
						</view>
	
						<view style="margin-top: 20rpx; margin-left: 50rpx;">
							<cl-input :border="false" placeholder="选填,请与客服协商一致" v-model="remarks">
								<text slot="prepend">订单备注:</text>
							</cl-input>
						</view>
				   </view>
			   </template>
			</uni-card>
			<view style="position: fixed;bottom: 5px;width: 100%;">
				<uni-card is-full="true" is-shadow="true">
					<view style="display: flex; flex-direction: row-reverse;">
						<cl-button type="success" round @click="submitOrder">提交订单</cl-button>
						<cl-text type="price" :value="totalPrice" :size="35" color="error" style="margin-right: 25rpx;"></cl-text>
						<cl-text type="text" value="合计："></cl-text>
					</view>
				</uni-card>
			</view>
			<cl-loading-mask :loading="loading" 
				:fullscreen="true" text="订单提交中"
				background="rgba(44, 44, 44, 0.7) "
				color="#ffffff "
				>
			</cl-loading-mask>
			<cl-confirm ref="pay" :close-on-click-modal="false" >
				<cl-text type="price" :value="totalPrice" :size="55"></cl-text>
				<view style="margin-top: 30rpx;">
					<cl-radio v-model="payment" label="微信">微信</cl-radio>
					<cl-radio v-model="payment" label="支付宝">支付宝</cl-radio>
				</view>
			</cl-confirm>
			<cl-message ref="message"></cl-message>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				name: '',
				tel: '',
				
				address: '',
				address_detail: '',
				remarks: '',
				loading: false,
				payPopup: false,
				payment: '微信',
				
				clothes:[],
				totalPrice: 0
			}
		},
		onLoad(e) {
			_this = this;
			
			uni.getStorage({
			    key: 'storage_key',
			    success: (res) =>  {
					_this.tel = res.data.tel;
					_this.name = res.data.name
			    },
			});
			
			_this.clothes = JSON.parse(e.data)
			_this.countTotalPrice()
			console.log(_this.clothes)
		},
		methods: {
			sub(i,num){
				if(num===1)
					return
				else
					_this.clothes[i].num--
				_this.countTotalPrice()
			},
			add(i){
				_this.clothes[i].num++
				_this.countTotalPrice()
			},
			countTotalPrice(){
				_this.totalPrice = 0;
				for(let item of _this.clothes){
					_this.totalPrice += item.price*item.num
				}
			},
			selectRegion(region) {
				for(let item of region){
					_this.address += item.name
				}
			},
			submitOrder(){
				if(_this.address===''){
					_this.$refs.message.open({
						message: "请确认填写收货地址",
						type: "warn",
					});
					return
				}
				uni.request({
					url: 'http://192.168.137.1:8081/purchase/submitCartOrder',
					method: 'POST',
					data:{
						address: _this.address+_this.address_detail,
						usertel: _this.tel,
						remarks: _this.remarks,
						clothes: _this.clothes,
					},
					success: (r) => {
						_this.loading = true;
						setTimeout( () => {
							_this.payOrder(r.data.id);					
						},1000);
					}
				})
				_this.loading = true;
			},
			payOrder(orderID){
				_this.loading = false;
				_this.$refs.pay
					.open({
						title: "付款",
						confirmButtonText: "确认付款",
						cancelButtonText: "取消付款",
					})
					.then(() => {
						uni.request({
							url: 'http://192.168.137.1:8081/purchase/payOrder',
							method: 'POST',
							data:{
								id: orderID,
								payment: _this.payment,
							},
							success: () => {
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
.num-box 
{
	width: 168rpx;
	height: 46rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	position: fixed;
	right: 40rpx;
	margin-top: 20rpx;
}	
.num-box-image
{
	width: 46rpx;
	height: 44rpx;
	text-align: center;
	line-height: 44rpx;
	border: 1rpx solid #CFCFCF;
	font-size: 38rpx;
}
.num-box-num
{
	width: 76rpx;
	height: 44rpx;
	text-align: center;
	line-height: 44rpx;
	font-size: 33rpx;
	font-weight: 400;
	color: #666666;
	border-top: 1px solid #CFCFCF;
	border-bottom: 1px solid #CFCFCF;
}
</style>
