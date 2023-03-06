<template>
	<view>
		<uni-card :is-shadow="true" :is-full="true">
		   <text style="font-size: 45rpx;">购物车</text>
		</uni-card>
		<view v-if="list.length===0" style="margin-top: 30rpx; display: flex; flex-direction: column; align-items: center;">
			<image src="../../../static/cart/empty_shop_car.png" style="width: 500rpx; height: 450rpx;"></image>
			<text style="margin-top: 25rpx;">购物车暂无商品，去逛逛吧</text>
		</view>
		<view v-if="list.length>0">
			<uni-card v-for="(item,index) in list"
				:is-shadow="true"
				>
			   <template>
				   <view style="display: flex; flex-direction: row; align-items: center;">
						<view @click="selectItem(index,item.check)">
							<image v-if="item.check===0" src="../../../static/cart/not_select.png" class="checked-image"></image>
							<image v-else src="../../../static/cart/select.png" class="checked-image"></image>
						</view>
						<view style="margin-left: 20rpx;">
							<image :src="'data:image/jpg;base64,'+item.img" class="goods-image"></image>
						</view>
						<view style="font-size: 30rpx; margin-left: 20rpx; display: flex; flex-direction: column; justify-content: flex-start;">
							<text>{{item.des}}</text>
							<text style="width:fit-content; background-color: #e1e1e1; color: #707070; margin-top: 15rpx;">
								{{"颜色："+item.color+",尺寸："+item.size}}
							</text>
							<view style="margin-top: 22rpx; display: flex; flex-direction: row;">
								<cl-text type="price" :size="40" :value="item.price" color="red"></cl-text>
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
				   </view>
			   </template>
			</uni-card>
		</view>
		<view style="height: 80rpx;"></view>
		<view style="z-index: 99;position: fixed;bottom: 1rpx;width: 100%;">
			<uni-card :is-shadow="true" :isFull="true">
			   <template>
				   <view style="display: flex; flex-direction: row; align-items: center;">
						<view @click="selectAll()">
							<image v-if="total.num===list.length&&total.num>0" src="../../../static/cart/select.png" class="checked-image"></image>
							<image v-else src="../../../static/cart/not_select.png" class="checked-image"></image>
						</view>
						<view style="margin-bottom: 10rpx;">
							<text>全选</text>
						</view>
						<view style=" margin-left: 50rpx;">
							<cl-button @click="delect" type="error" plain>删除选中</cl-button>
						</view>
						<view style="position: absolute; right: 150rpx;">
							<cl-text type="text" value="合计" :size="33"></cl-text>
							<cl-text type="price" :value="total.price" :size="28" color="red"></cl-text>
						</view>
						<view style="position: absolute; right: 5rpx;">
							<cl-button @click="submit" type="success" round >结算</cl-button>
						</view>
				   </view>
			   </template>
			</uni-card>
		</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				tel: '',
				
				total: {
					num: 0,
					price: 0,
				},
				list:[]
			}
		},
		onLoad() {
			_this = this;
			
			_this.LoadData(); 
		},
		onShow() {
			_this.LoadData();
		},
		methods: {
			LoadData(){
				uni.getStorage({
					    key: 'storage_key',
					    success: (res) =>  {
							_this.tel = res.data.tel;
							console.log("+++111"+res.data.tel)
							console.log("+++123"+_this.tel)
							
							console.log("+++"+_this.tel)
							uni.request({
								url: 'http://192.168.137.1:8081/purchase/getCartList',
								data:{
									usertel: _this.tel
								},
								success: (r) => {
									console.log(r)
									_this.list = r.data;
								}
							})
							
					    },
					});
				
				
				
			},
			selectItem(index,check){
				if(check === 0){
					_this.list[index].check=1;
				} else {
					_this.list[index].check=0;
				}
				_this.statistics()
			},
			selectAll(){
				if(_this.total.num === _this.list.length){
					for(let item of _this.list){
						item.check = 0
					}
				}else{
					for(let item of _this.list){
						item.check = 1
					}
				}
				_this.statistics()
			},
			sub(i,num){
				if(num===1)
					return
				else
					_this.list[i].num--
				_this.statistics()
			},
			add(i){
				_this.list[i].num++
				_this.statistics()
			},
			statistics(){
				let num=0;
				let price=0;
				for(let item of JSON.parse(JSON.stringify(_this.list))){
					if(item.check === 1){
						num++
						price += item.num*item.price;
					}
				}
				_this.total.num = num;
				_this.total.price = price;
			},
			delect(){
				let cartIds = [];
				for(let item of JSON.parse(JSON.stringify(_this.list))){
					if(item.check === 1){
						_this.list.splice(_this.list.indexOf(item),1);
						cartIds.push(item.id);
					}
				}
				_this.statistics()
				
				uni.request({
					method: 'POST',
					url: 'http://192.168.137.1:8081/purchase/cartListDel',
					data:{
						ids: cartIds
					},
					success: () => {
					}
				})
				
				_this.LoadData()
			},
			submit(){
				console.log("sssssssssssssssssss"+_this.total.num)
				if(_this.total.num === 0){
					uni.showToast({
						title: '未选择商品',
						image: '../../../static/pay/error.png',
						duration: 2000,
					})
				}else{
					let data = []
					for(let item of JSON.parse(JSON.stringify(_this.list))){
						if(item.check === 1){
							item.img = "../../static/pay/pay.png"
							data.push(item)
						}
					}
					uni.navigateTo({
						url: '../../purchase/cart-pay?data='+JSON.stringify(data)
					})
				}
			}
		}
	}
</script>

<style>
.checked-image
{
	width: 50rpx;
	height: 50rpx;
}
.goods-image {
	width: 160rpx;
	height: 160rpx;
}
.num-box 
{
	width: 168rpx;
	height: 46rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	position: absolute;
	right: 40rpx;
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
