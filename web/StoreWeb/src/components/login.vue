<template>
	<el-container >
		    <!-- <el-header>欢迎来到服装销售系统</el-header> -->
			<div class="login-counter">
		    <el-main>
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<!-- 登陆表单区域 -->
		    <el-tab-pane label="登录" name="first"  >
			<el-form :model="Loginform"  :rules="LoginformRules" ref="LoginformRef">
			<el-form-item prop="tel" style="margin-top: 20px;">
			<el-input suffix-icon="el-icon-phone"  placeholder="请输入电话"  v-model="Loginform.tel"  clearable></el-input>
			</el-form-item>
			<div style="margin: 10px 0;"></div>
			<el-form-item prop="password">
			<el-input suffix-icon="el-icon-lock" placeholder="请输入密码" v-model="Loginform.password" show-password></el-input>
			<div style="margin: 20px 0;"></div>
			</el-form-item>
			<el-form-item>
				<div align="center" style="margin-top: 10px;">
					<el-button type="success" @click="login">登录</el-button>
					<el-button type="info" @click="resetLoginform">重置</el-button>
				</div>
			 </el-form-item>
			 </el-form>
			</el-tab-pane>
			<!-- 注册表单区域 -->
		    <el-tab-pane label="注册" name="second">
			<el-form :model="SignupForm"  :rules="SignupFormRules" ref="SignupFormRef">
			<!-- 注册身份	 -->
			<el-form-item prop="root">
			<el-select v-model="SignupForm.root"  placeholder="请选择">
				<el-option label="管理员" value="admin"></el-option>
				<el-option label="普通用户" value="user"></el-option>
			</el-select>
			</el-form-item>
			<div style="margin: 20px 0;"></div>
			<!-- 注册用户名 -->
			<el-form-item prop="name">
			<el-input suffix-icon="el-icon-edit" placeholder="请输入您的用户名"  v-model="SignupForm.name"  clearable></el-input>
			</el-form-item>
			<div style="margin: 20px 0;"></div>
			<!-- 注册手机号 -->
			<el-form-item prop="tel">
			<el-input suffix-icon="el-icon-phone" placeholder="请输入您的电话"  v-model="SignupForm.tel"  clearable></el-input>
			</el-form-item>
			<div style="margin: 20px 0;"></div>
			<!-- 注册登陆密码 -->
			<el-form-item prop="password">
			<el-input suffix-icon="el-icon-lock" placeholder="请输入密码" v-model="SignupForm.password" show-password></el-input>
			</el-form-item>
			<div style="margin: 20px 0;"></div>
			<!-- 注册以及重置 -->
			<el-form-item >
				<div align="center">
					<el-button type="success"  @click='signup'>注册</el-button>
					<el-button  type="info" @click="resetSignupForm">重置</el-button>
				</div>
			 </el-form-item>
			 </el-form>
			</el-tab-pane>
		  </el-tabs>
		  </el-main>
		
		  </div>
		  </el-container>
	
</template>

<script>
	import axios from 'axios'
	export default {
	    data() {
	      return {
	        activeName: 'first',
			// 这是登陆表单的数据绑定对象
			Loginform:{
			tel:'',
			password:''
			},
			// 这是登录表单的验证规则
			LoginformRules:{
				// 验证用户登录的电话是否符合规则
				tel:[
					{ required: true, message: '请输入电话', trigger: 'blur' },
					{ min: 11, max: 11, message: '请输入合法的电话长度', trigger: 'blur' }
				],
				// 验证用户的密码是否符合规则
				password:[
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				]
			},
			// 登记表单的数据绑定
			SignupForm:{
				root:'',
				tel:'',
				password:'',
				name:'',
				type:0
			},
			// 这是注册表单的验证规则
			SignupFormRules:{
				root:[
					{ required: true, message: '请选择注册身份', trigger: 'change' }
				],
				// 验证用户注册的电话是否符合规则
				tel:[
					{ required: true, message: '请输入电话', trigger: 'blur' },
					{ min: 11, max: 11, message: '请输入合法的电话长度', trigger: 'blur' }
				],
				// 验证用户的密码是否符合规则
				password:[
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				]
			}
	      };
	    },
	    methods: {
	      handleClick(tab, event) {
	        console.log(tab, event);
	      },
		  // 登陆表格的重置
		  resetLoginform(){
			this.$refs.LoginformRef.resetFields(); 
		  },
		// 登陆表格预检查以及登录检查
		   login(){
			const that=this;
			this.$refs.LoginformRef.validate( async valid=>{
				// console.log(valid);
				if(!valid) return;
				axios.post("http://127.0.0.1:8080/loginPage/login",that.Loginform).then(function(response){
					if(response.data.tel==="-1"){
							alert("登录失败！");
							that.resetLoginform();
						}
					else{
							alert("登录成功！");
							// 登陆成功进行跳转
							// that.$router.push({path:'/clothing'});
							// 传送的电话还未收到
							alert(that.Loginform.tel);
							that.$router.push({name:'manage',params:{'tel':that.Loginform.tel}});
							// that.resetLoginform();
							// console.log("")
					}
				    console.log(response);
					},
					function(err){
						console.log(err);
				  	})
			});
		  },
		  // 注册表格的重置
		  resetSignupForm(){
			this.$refs.SignupFormRef.resetFields();   
		  },
		  // 注册表格的预检查以及账户注册结果的检测
		  signup(){
			 var that=this;
			 this.$refs.SignupFormRef.validate( async valid=>{
			 	console.log(valid);
				if(!valid) return;
				// console.log("这个表单的数据：",this.SignupForm);
				
				const {data:res} = await axios.post("http://127.0.0.1:8080/loginPage/signup",that.SignupForm);
				
				if(res==400){
					that.$message({
					 message:'注册成功！',
					 type:'success'
					});
					that.activeName='first';
					that.Loginform.tel=that.SignupForm.tel;
					that.resetSignupForm();
					}
				else if(res==300){
					that.$message({
					message:'已有账号，注册失败！',
					 type:'error'
					});	
					that.resetSignupForm();
								 }
				else{
					that.$message({
					message:'注册失败！',
					 type:'error'
					});	
					that.resetSignupForm();
								 }
				
			 }); 
		  },
		  ChangTosign(){
			 
		  }
	    }
	  };
</script>

<style scoped="scoped">
	.login-counter {
	    border-radius: 15px;
	    background-clip: padding-box;
	    margin: 90px auto;
	    width: 350px;
		height: 400px;
	    padding: 35px 35px 15px 35px;
	    background: #fff;
	    border: 1px solid #eaeaea;
	    box-shadow: 0 0 25px #cac6c6;
	  }	 
	  
	  .el-header,.el-footer {
	      background-color: #B3C0D1;
	      color: #333;
	      line-height: 60px;
	    }
	.el-container{
		/* background-color: #B3C0D1; */
		background-image: url("../assets/00.jpg");
		color: #333;
		height: 100%;
	}
	.el-button{
		/* display: flex;
		justify-content: flex-end; */
		/* left: 0; */
	}
	
</style>
