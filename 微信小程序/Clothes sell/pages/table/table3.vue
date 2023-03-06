<template>
	<view>	
		<view class="charts-box">
		  <qiun-data-charts
			type="line"
			:chartData="ordernum"
			background="none"
		  />
		</view>
		<view class="charts-box1">
		  <qiun-data-charts
		    type="column"
		    :chartData="ordercost"
		    background="none"
		  />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ordernum:{
				  categories:["1~3","4~6","7~9","10~12"],
				  series:[{
							"name": "订单数量",
							"data": []
						}],
				},
				ordercost:{
				  categories:["1~3","4~6","7~9","10~12"],
				  series:[{
							"name": "季度消费",
							"data": []
						}],
				}
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
						method:'GET',
						url:'http://192.168.137.218:8081/getsellnumquerter',
						data:{
							usertel:res.data.tel
						},
						success: (response) => {
							this.ordernum.series[0].data=response.data;
							console.log("查看"+response.data)
						}
					})
					
					wx.request({
						method:'GET',
						url:'http://192.168.137.218:8081/getsellcostquerter',
						data:{
							usertel:res.data.tel
						},
						success: (response) => {
							this.ordercost.series[0].data=response.data;
							console.log("查看"+response.data)
						}
					})
			    },
			});	
		},
		methods: {
	
		}
	}
</script>

<style>
	.charts-box{
	  width: 100%;
	  height:500rpx;
	}
	.charts-box1{
	  width: 100%;
	  height:500rpx;
	}
</style>
