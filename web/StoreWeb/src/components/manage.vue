<template>
	<div class="el-container" >
		<el-menu router 
		
		class="el-menu-demo" 
		mode="vertical" 
		width='50px'
		>
		  <el-menu-item index="/clothing">服装管理</el-menu-item>
		  <el-submenu index="/amountpie">
			  <template slot="title">销售分析</template>
			  <el-menu-item index="/amountpie">销售金额图</el-menu-item>
			  <el-menu-item index="/numpie">销售数量图</el-menu-item>
		  </el-submenu>
		  <el-menu-item index="/order">订单管理</el-menu-item>
		</el-menu>
		<div style="margin-left: 10px;margin-right: 10px;height: 640px;">
			<router-view></router-view>
		</div>	
	</div>
</template>

<script>
export default{
	mounted() {
		this.$router.push("/clothing")
	}
}
</script>

<style>
	::v-deep .el-tabs__nav-scroll{
	  width: 50%!important;
	  margin: 0 auto!important;
	}
	.el-container{
		/* background-color: #B3C0D1; */
		
		color: #333;
		height: 100%;
	}

</style>
