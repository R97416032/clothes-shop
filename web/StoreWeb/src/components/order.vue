<template>
  <div style="width: 1329px;height: 640px;margin-top: 30px;">
	  <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" >
	    <el-tab-pane label="待付款" name="first">
			<el-table :data="tableData" style="width: 100%" max-height="640px">
			    <el-table-column prop="id"	label="订单号"></el-table-column>
			    <el-table-column  prop="usertel" label="联系人"></el-table-column>
			    <el-table-column prop="address" label="地址"></el-table-column>
				<el-table-column prop="time" label="下单时间"></el-table-column>
			</el-table>
	  	</el-tab-pane>
	    <el-tab-pane label="未发货" name="second">
	  		<el-table :data="tableData" style="width: 100%" @row-click="rowClick">
	  		    <el-table-column prop="id"	label="订单号"></el-table-column>
	  		    <el-table-column  prop="usertel" label="联系人"></el-table-column>
	  		    <el-table-column prop="address" label="地址"></el-table-column>
				<el-table-column prop="remarks" label="备注"></el-table-column>
	  			<el-table-column prop="time" label="下单时间"></el-table-column>
	  			<el-table-column prop="paytime" label="付款时间"></el-table-column>
	  		</el-table>
	  	</el-tab-pane>
	    <el-tab-pane label="待收货" name="third" >
			<el-table :data="tableData" style="width: 100%">
			    <el-table-column prop="id"	label="订单号"></el-table-column>
			    <el-table-column  prop="usertel" label="联系人"></el-table-column>
			    <el-table-column prop="address" label="地址"></el-table-column>
			    <el-table-column prop="payment" label="支付方式"></el-table-column>
				<el-table-column prop="delivery_num" label="物流单号"></el-table-column>
				<el-table-column prop="delivery_time" label="发货时间"></el-table-column>
				<el-table-column prop="time" label="下单时间"></el-table-column>
				<el-table-column prop="paytime" label="付款时间"></el-table-column>
				
			</el-table>
		</el-tab-pane>
			
	  	<el-tab-pane label="已收货" name="fourth">
			<el-table :data="tableData" style="width: 100%">
			    <el-table-column prop="id"	label="订单号"></el-table-column>
			    <el-table-column  prop="usertel" label="联系人"></el-table-column>
			    <el-table-column prop="address" label="地址"></el-table-column>
			    <el-table-column prop="payment" label="支付方式"></el-table-column>
				<el-table-column prop="time" label="下单时间"></el-table-column>
				<el-table-column prop="paytime" label="付款时间"></el-table-column>
				<el-table-column prop="delivery_time" label="发货时间"></el-table-column>
			</el-table>
		</el-tab-pane>
	  </el-tabs>
	  
	  <el-dialog title="发货" :visible.sync="dialogFormVisible">
	    <el-form :model="form">
	      <el-form-item label="订单号" :label-width="formLabelWidth">
	        <el-input v-model="form.id" autocomplete="off"></el-input>
	      </el-form-item>
	      <el-form-item label="物流单号" :label-width="formLabelWidth">
	        <el-input v-model="form.delivery_num" autocomplete="off"></el-input>
	      </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer">
	      <el-button  @click="dialogFormVisible = false">取消</el-button>
	      <el-button type="primary" @click="delivery">确定</el-button>
	    </div>
	  </el-dialog>

  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        activeName: 'first',
		tableData:null,
		dialogFormVisible:false,
		form: {
		          id:'',
				  delivery_num:''
		        },
		formLabelWidth: '120px',
      };
    },
    methods: {
      handleClick(tab, event) {
		  const that=this
		  axios.post('http://127.0.0.1:8080/order',{type:tab.label}).then(function(response){
		  		    console.log(response);
		  			that.tableData=response.data
		  			},
		  			function(err){
		  				console.log(err);
		  		  	})
      },
	  rowClick(row){
		  this.form.id=row.id
		  this.form.delivery_num=row.delivery_num
		  this.dialogFormVisible=true
	  },
	  delivery(){
		  const that=this
		  axios.post('http://127.0.0.1:8080/delivery',{id:this.form.id,delivery_num:this.form.delivery_num}).then(function(response){
		  		    console.log(response);
					that.dialogFormVisible=false;
					that.form.id='';
					that.form.delivery_num='';
					that.activeName='third';
		  			},
		  			function(err){
		  				console.log(err);
		  		  	})
	  },
    },
	mounted() {
		const that=this
		axios.post('http://127.0.0.1:8080/order',{type:'待付款'}).then(function(response){
				    console.log(response);
					that.tableData=response.data
					},
					function(err){
						console.log(err);
				  	})
	}
  };
</script>
<style>
</style>