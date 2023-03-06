<template>
	<view>
		<view style="width: 100%; height: 40px; display: flex;">
			<input @click="seeclothes()" placeholder="点击搜索服装" style="width: 60%; margin-top: 10px; margin-left: 20px; height: 30px; border-radius: 15px; background-color:#EEEEEE;" />
			<image @click="choose()" src="../../../static/xiangji.png" style="width: 30px; height: 30px; margin-top: 10px; margin-left: 8px;"></image>
			<button  @click="seeclothes()" style="width: 60px; height: 30px; font-size: 15px; margin-top: 10px; margin-left: 8px; background-image:linear-gradient(#e66465, #9198e5); border-radius: 15px;">搜索</button>
		</view>
		<image src="../../../static/primy.jpg" style="width: 100%;height: 600px; margin-top: 10px;"></image>
	</view>
</template>

<script>
	var _this;
export default {
	data() {
		return {
			
		};
	},
	onLoad(){
		_this = this
	},
	methods: {
		choose(){
			uni.chooseImage({
				count: 1,
				sizeType: "original",
				success: (chooseImageRes) => {
					console.log("chooseImageRes>>"+JSON.stringify(chooseImageRes));
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: 'http://127.0.0.1:8088/classfy/',
						filePath: tempFilePaths[0],
						name: 'file',
						header:{"Content-Type": "multipart/form-data "},
						success: (res) => {
							console.log(JSON.parse(res.data).class);
							uni.navigateTo({
								url: '../../purchase/clothes-list?keyword='+JSON.parse(res.data).class
							})
						}
					});
					
				}
			})
		},
		seeclothes(){
			uni.navigateTo({
				url:'../../purchase/search'
			})
		}
	}
};
</script>

<style>

</style>
