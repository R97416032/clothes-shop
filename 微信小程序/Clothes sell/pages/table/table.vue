<template>
	<view class="charts-box">
	  <qiun-data-charts
	    type="rose"
	    :chartData="chartData"
	    background="none"
	  />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chartData:{
				  series:[],
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
						url:'http://192.168.137.218:8081/geanalysedata',
						data:{
							usertel:res.data.tel
						},
						success: (response) => {
							this.chartData.series=response.data;
							
							console.log("查看"+this.chartData.series[0].data[0].name)
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
	  height:300px;
	}
</style>
