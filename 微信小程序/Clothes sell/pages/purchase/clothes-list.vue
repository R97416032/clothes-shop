<template>
	<view>
		<view>
			<cl-filter-bar @change="onChange"> 
				<cl-filter-item label="价格" type="order" @change="sortByPrice"></cl-filter-item>
				<cl-filter-item label="销量" type="order" @change="sortBySale"></cl-filter-item>
			</cl-filter-bar>
		</view>
		<view class="uni-product-list">
		    <view class="uni-product" v-for="(product,index) in productList" :key="index" @click="toTheClothes(product.name)">
		        <view class="image-view">
		            <image v-if="renderImage" class="uni-product-image" :src="'data:image/jpg;base64,'+product.img" lazy-load></image>
		        </view>
		        <view >{{product.name}}</view>
				<view>
					<cl-tag round plain type="info" size="mini">{{product.classification}}</cl-tag>
					<cl-text :value="'已售'+product.sale" color="info" style="margin-left:20upx"></cl-text>
				</view>
				<cl-text :value="product.price" type="price" color="red" :size="40"></cl-text>
		    </view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				productList: [],
				renderImage: false
			}
		},
		onLoad(option) {
			uni.showToast({
				title: option.keyword,
				icon: 'none',
				duration: 2000
			});
			this.keyword = option.keyword;
			this.loadData();
			setTimeout(() => {
			    this.renderImage = true;
			}, 300);
		},
		methods: {
			loadData() {
			    uni.request({
			    	url: 'http://192.168.137.1:8081/purchase/getClothes',
					data:{
						name: this.keyword
					},
					success: (res) => {
						this.productList = res.data;
						console.log(this.productList);
					}
			    })
			},
			toTheClothes(name){
				uni.navigateTo({
					url: 'clothes-detail?name='+name
				}) 
			},
			sortByPrice(value){
				console.log(value)
				switch(value){
					case "asc":
						this.productList.sort((a,b) => {
							return a.price - b.price
						})
						break
					case "desc":
						this.productList.sort((a,b) => {
							return b.price - a.price
						})
						break
					default:
							this.loadData();
						break
				}
			},
			sortBySale(value){
				console.log(value)
				switch(value){
					case "asc":
						this.productList.sort((a,b) => {
							return a.sale - b.sale
						})
						break
					case "desc":
						this.productList.sort((a,b) => {
							return b.sale - a.sale
						})
						break
					default:
							this.loadData();
						break
				}
			}
		},
		
		// onPullDownRefresh() {
		//     this.loadData('refresh');
		//     // 实际开发中通常是网络请求，加载完数据后就停止。这里仅做演示，加延迟为了体现出效果。
		//     setTimeout(() => {
		//         uni.stopPullDownRefresh();
		//     }, 2000);
		// },
		// onReachBottom() {
		//     this.loadData();
		// }
	}
</script>

<style>
	page {
        background: #F8F8F8;
    }

    view {
        font-size: 28upx;
    }

    .uni-product-list {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
    }

    .uni-product {
        padding: 20upx;
        display: flex;
        flex-direction: column;
    }

    .image-view {
        height: 300upx;
        width: 330upx;
        margin: 12upx 0;
    }

    .uni-product-image {
        height: 300upx;
        width: 330upx;
    }

    .uni-product-title {
        width: 300upx;
        word-break: break-all;
        display: -webkit-box;
        overflow: hidden;
        line-height: 1.5;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .uni-product-price {
        margin-top: 10upx;
        font-size: 28upx;
        line-height: 1.5;
        position: relative;
    }

    .uni-product-price-original {
        color: #e80080;
    }

    .uni-product-price-favour {
        color: #888888;
        text-decoration: line-through;
        margin-left: 10upx;
    }

</style>
