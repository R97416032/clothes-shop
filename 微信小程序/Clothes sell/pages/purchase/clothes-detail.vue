<template >
	<view >
		<view>
			<view >
				<img-swiper
					:img-list="imgList" url-key="url"
					>
				</img-swiper>
				
			</view>
			<cl-divider>商品信息</cl-divider>
			<view >
				<uni-card isShadow="true" style="font-size: 40rpx;" class="aaa">
					{{theclothes[0].des}}
					<template>
						<view style="display: flex; flex-direction: row; justify-content: space-around; margin-top: 10rpx;">
							<cl-button type="text" @click="card_click('star')"
								open-type="contact" show-message-card session-from send-message-path send-message-title
								>
								<text style="color: #888888; font-size: 30rpx;" >联系客服</text>
							</cl-button>
							<cl-button type="text" @click="card_click('share')"><text style="color: #888888; font-size: 30rpx;" >分享</text></cl-button>
						</view>
					</template>
				</uni-card>
				<uni-card isShadow="true" >
					<template style="font-size: 40rpx;">
						<view style="display: flex; flex-direction: row;">
							<text style="color: #888888;">选择</text>
							<view style="display: flex; flex-direction: column; margin-left: 30rpx;">
								<text style="color: #888888;">颜色/尺寸</text>
								<cl-button type="info" plain style="margin-left: 30rpx; margin-top: 10rpx;" @click="card_click('choose')">查看具体可选</cl-button>
							</view>
						</view>
						<view style="margin-top: 20rpx;">
							<text style="color: #888888; ">发货</text>
							<text style="color: #000000; margin-left: 30rpx;">河南科技大学</text>
						</view>
						<view style="margin-top: 20rpx;">
							<text style="color: #888888;">保障</text>
							<text style="color: #000000; margin-left: 30rpx;">假一赔三 · 7天价保 · 退货运费险</text>
						</view>
					</template>
				</uni-card>
				<uni-card is-shadow="true" title="评价" extra="查看全部 >" @click="card_click('comment')"  class="bbb">
				   <template>
					   <view>
						   暂无
					   </view>
				   </template>
				</uni-card>
			</view>
			
		</view>
		<view>
			<vk-data-goods-sku-popup
				v-model="skuKey"
				border-radius="20"
				:custom-action='loadClothesInfo'
				:mode="skuMode"
				@open="openSkuPopup"
				@close="closeSkuPopup"
				@add-cart="addCart"
				@buy-now="buyNow"
				>
			</vk-data-goods-sku-popup>
		</view>
		<view style="height: 80rpx;"></view>
		<view style="z-index: 9999;position: fixed; left: 0px; bottom: 0px;width: 40%;" v-if="bottom_nav_key">
			<button style="width: fit-content;" @click="bottom_optClick()">购物车</button>
		</view>
		<view style="z-index: 9999;position: fixed; right: 0px; bottom: 0px;width: 60%;" v-if="bottom_nav_key">
			<uni-goods-nav
				:fill="true"
				:options="bottom_options" :buttonGroup="bottom_buttons"  
				@click="bottom_optClick" @buttonClick="bottom_btClick"  
			/>
		</view>
	</view>
</template>

<script>
	var that;
	export default {
		//  components: {uniGoodsNav},
		data() {
			return {
				tel: '',
				
				theclothes: [],
				imgList: [],
				skuKey: false,
				skuMode: 1,
				bottom_nav_key: true,
				bottom_options: [],
				bottom_buttons: [
					{
					    text: '加入购物车',
					    backgroundColor: '#ff0000',
					    color: '#fff'
					},
					{
					    text: '立即购买',
					    backgroundColor: '#ffa200',
					    color: '#fff'
					}
				],
			}
		},
		onLoad(result) {
			that = this;
			
			uni.getStorage({
			    key: 'storage_key',
			    success: (res) =>  {
					that.tel = res.data.tel;
			    },
			});
			
			uni.request({
				url: 'http://192.168.137.1:8081/purchase/getTheClothes',
				data: {
					name: result.name
				},
				success: (r) => {
					that.theclothes = r.data;
					that.LoadImgList();
				}
			})
			
		},
		methods: {
			card_click(e){
				switch(e){
					case "share":
						uni.showToast({
							title: "点击'分享'"
						})
					break;
					case "choose":
						that.skuKey = true;
						that.skuMode = 1;
					break;
					case "comment":
						uni.showToast({
							title: "点击'评论'"
						})
					break;
					
					
				}
			},
			bottom_optClick(e){
				uni.switchTab({
					url:'../tabbar/cart/cart'
				})
			},
			bottom_btClick(e){
				console.log(e)
				switch(e.index){
					case 0:
						that.skuKey = true;
						that.skuMode = 2;
						
					break;
					case 1:
						that.skuKey = true;
						that.skuMode = 3;
					break;
				}
			},
			openSkuPopup(){
				that.bottom_nav_key = false;
			},
			closeSkuPopup(){
				that.bottom_nav_key = true;
			},
			addCart(selectShop){
				that.skuKey = false;
				that.bottom_nav_key = true;
				
				uni.request({
					url: 'http://192.168.137.1:8081/purchase/addCart',
					method: 'POST',
					data:{
						usertel:that.tel,
						clothing_ID: selectShop.id,
						quantity: selectShop.buy_num
					},
					success: () => {
						uni.showToast({
							title: '已加入购物车',
							icon: "success",
							duration: 2000,
							success: () => {
							setTimeout( () => {
							},1000);
							}
						})
					}
				})
				
			},
			buyNow(selectShop){
				selectShop.img = ''
				selectShop = JSON.stringify(selectShop);
				that.skuKey = false;
				that.bottom_nav_key = true;
				uni.navigateTo({
					url:'./order-pay?data='+selectShop
				})
				
			},
			LoadImgList(){
				let k = 0 ;
				for(let item of that.theclothes){
					let imgItem = {
						url: '',
						id: 0
					}
					imgItem.id = k++
					imgItem.url = item.img
					that.imgList.push(imgItem)
				}
				
				console.log(">><<<>>><<"+that.imgList)
			},
			loadClothesInfo(){
				return new Promise((resolve, reject) => {
					that.getClothesInfo({
						success(data){
							resolve(data);
						}
					});
				});
			},
			getClothesInfo(obj){
				uni.request({
					url: 'http://192.168.137.1:8081/purchase/loadSkuInfo',
					data:{
						name: that.theclothes[0].name
					},
					success: (r) => {
						obj.success(r.data);
					},
					fail(err) {
						console.error(err);
					},
				});
			}
		}
	}
</script>

<style>

</style>
