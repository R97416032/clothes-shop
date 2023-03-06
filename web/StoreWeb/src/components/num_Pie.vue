<template>
  <div id="app">
	 <div>
	  	<div style="width: 100%; height: 640px; margin-top: 30px;" align="center" >
			<div id="main" style="width:1200px;height:600px;"></div>
	  	</div>
	</div>
  </div>
</template>
<script>
	import axios from 'axios'
	import echarts from 'echarts'
	export default {
		data(){
			return{
				charts: '',
				//图设置
				option:{
				    title: {
				        text: '销售饼图',
					    left: 'center'
					    },
					tooltip: {
			        trigger: 'item'
					    },
					legend: {
					        orient: 'vertical',
					        left: 'left',
					    },
				    series: [
				            {
				                name: '销售数量情况',
				                type: 'pie',
				                radius: '50%',
				                data: [
				                    {value: "值", name: '标签'}
				                ],
				                emphasis: {
				                    itemStyle: {
				                        shadowBlur: 10,
				                        shadowOffsetX: 0,
				                        shadowColor: 'rgba(0, 0, 0, 0.5)'
				                    }
				                }
				            }
				        ]
				},
				}
			},
		mounted() {
			this.$nextTick(function() {
						    this.drawPic('main')});
			
		},
		deactivated() {
			this.$destroy()
		},
		methods:{
			drawPic(id){
				var Data=new FormData()
				const that=this
				axios.post("http://127.0.0.1:8080/chart/getCQ",Data).then(function(response){
					that.option.series[0].data=response.data
					that.init()
				    console.log(response);
					},
					function(err){
						console.log(err);
				  	})
				},
			init(){
				let echarts = require('echarts');
				this.charts = echarts.init(document.getElementById("main"));
				this.charts.setOption(this.option,true); 
			}
		}
		
	}

</script>
<style>
	
</style>