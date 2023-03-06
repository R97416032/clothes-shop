<template>
	<view>
		<view style="width: 700rpx; height: 700rpx; margin-top: 20px;">
			<view style="display: flex; margin-top: 60rpx;">
				<view style="font-size: 40rpx; color: #555555; margin-top: 30rpx; margin-left: 30rpx;">用户名:</view>
				<input v-model="name" style="width: 400rpx; height: 80rpx; margin-top: 20rpx; margin-left: 10rpx; background-color:#F1F1F1" placeholder="请输入要修改的姓名"/>
			</view>
			<view style="display: flex; margin-top: 30rpx;">
				<view style="font-size: 40rpx; color: #555555; margin-top: 30rpx; margin-left: 30rpx;">手机号:</view>
				<input v-model="tel" style="width: 400rpx; height: 80rpx; margin-top: 20rpx; margin-left: 10rpx; background-color:#F1F1F1" placeholder="请输入要修改的手机号"/>
			</view>
			<view style="display: flex; margin-top: 30rpx;">
				<view style="font-size: 40rpx; color: #555555; margin-top: 30rpx; margin-left: 30rpx;">修改密码:</view>
				<input v-model="password" style="width: 400rpx; height: 80rpx; margin-top: 20rpx; margin-left: 10rpx; background-color:#F1F1F1" placeholder="请输入修改密码并保证3~20位"/>
			</view>
			<view style="display: flex; margin-top: 30rpx;">
				<view style="font-size: 40rpx; color: #555555; margin-top: 30rpx; margin-left: 30rpx;">确认密码:</view>
				<input v-model="passquery" style="width: 400rpx; height: 80rpx; margin-top: 20rpx; margin-left: 10rpx; background-color:#F1F1F1" placeholder="请再次确认修改密码"/>
			</view>
			<button @click="updataquery()" style="width: 500rpx; height: 100rpx; margin-top: 200rpx; background-color:#F0AD4E" >提交修改</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name:'',
			tel:'',
			password:'',
			passquery:''
		};
	},
	onLoad() {
		var that=this;
		uni.getStorage({
		    key: 'storage_key',
		    success: (res) =>  {
				that.tel = res.data.tel;
		        console.log(res.data);
		    },
		});
	},
	created() {
		
	},
	methods: {
		updataquery(){
			if(this.passquery!=this.password){
				uni.showToast({
				title: '请确保输入的密码一致',
				icon: 'none'
				});
				return;
			}
			else{
				wx.request({
					url:'http://192.168.137.218:8081/updataquery',
					data:{
							name:this.name,
							tel:this.tel,
							password:this.password
						},
						success: (response) => {
							console.log("订单表后端"+response.data)
							uni.redirectTo({
								url:'../index/index'
							})
						}
				})
			}
		}
	}
};
</script>

<style>
.container {
	    margin: 90px auto;
	    width: 350px;
	    padding: 35px 35px 15px 35px;
	  }	  
	  .title {
		font-size: 30px;
	    margin: 0px auto 100px auto;
	    text-align: center;
	    color: #505458;
	  } 

</style>