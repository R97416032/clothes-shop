<template>
  <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
       <el-form-item label="衣服种类" prop="classification">
         <el-input
           v-model="queryParams.classification"
           placeholder="请输入衣服种类"
           clearable
           size="small"
         />
       </el-form-item >
	   <el-form-item >
		<el-button type="primary" icon="el-icon-search" size="mini" @click="findbyclass">搜索</el-button>
	   </el-form-item>
       <el-form-item label="衣服名称" prop="name">
         <el-input
           v-model="queryParams.name"
           placeholder="请输入衣服名称"
           clearable
           size="small"
         />
		</el-form-item>
		 <el-form-item>
         <el-button type="primary" icon="el-icon-search" size="mini" @click="findbyname">搜索</el-button>
         <el-button icon="el-icon-refresh" size="mini" @click='resetQueryForm'>重置</el-button>
       </el-form-item>
	   <el-form-item>
		   <span>{{logintel}}</span>
	   </el-form-item>
	   <el-row :gutter="10" class="mb8">
	        </el-col>
			
	        <el-col :span="1.5">
	          <el-button
				@click="cloFormVisible = true"
	            type="info"
	            icon="el-icon-upload"
	            size="mini"
	          >新增</el-button>
	        </el-col>
	        <!-- 插入服装信息时弹出的带有表单的对话框 -->
				  <el-dialog title="插入服装信息" :visible.sync="cloFormVisible">
					<div align="center">
						<el-upload
								action="http://127.0.0.1:8080/classfy/"
								list-type="picture-card"
								:on-preview="handlePictureCardPreview"
								:on-remove="handleRemove"
								:file-list="fileList"
								:limit="1"
								:on-exceed="exceed"
								:on-success="succe"
								:auto-upload="false"
								:on-change="classfy">
						  <i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible" width="128px" height="128px">
						  <img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>  
					<el-form ref="cloFormRef" style="margin-top: 5px;" :model="cloForm" :rules="CloFormRules">
						<el-form-item label="服装ID" prop="id" :label-width="formLabelWidth">
						    <el-input v-model="cloForm.id"></el-input>
						  </el-form-item>
					  <el-form-item label="服装类别" prop="classification" :label-width="formLabelWidth">
					  		<el-input v-model="cloForm.classification"></el-input>
					  </el-form-item>				  
					  <el-form-item label="服装名称" prop="name"  :label-width="formLabelWidth">
					  		<el-input v-model="cloForm.name"></el-input>
					  </el-form-item>	
					<el-form-item label="服装描述" prop="des"  :label-width="formLabelWidth">
							<el-input v-model="cloForm.des"></el-input>
					</el-form-item>				
									
					  <el-form-item label="服装颜色" prop="color"  :label-width="formLabelWidth">
					  		<el-input v-model="cloForm.color"></el-input>
					  </el-form-item>				  
					  <el-form-item label="服装型号" prop="size"  :label-width="formLabelWidth">
					  		<el-input v-model="cloForm.size"></el-input>
					  </el-form-item>				 
					  <el-form-item label="服装库存" prop="stock"  :label-width="formLabelWidth">
					  		<el-input v-model="cloForm.stock"></el-input>
					  </el-form-item>				  
					  <el-form-item label="服装销售情况" prop="sale"  :label-width="formLabelWidth">
					  		<el-input v-model="cloForm.sale"></el-input>
					  </el-form-item>				
					  <el-form-item label="服装价格" prop="price"  :label-width="formLabelWidth">
					  		<el-input v-model="cloForm.price"></el-input>
					  </el-form-item>
					  <el-form-item label="关键字" prop="keywords"  :label-width="formLabelWidth">
					  		<el-input v-model="cloForm.keywords"></el-input>
					  </el-form-item>
					</el-form> 
					 <div slot="footer" class="dialog-footer">
					     <el-button @click="cloFormVisible = false">取 消</el-button>
					     <el-button type="primary" @click='insert()'>确定</el-button>
					   </div>
				  </el-dialog>
				 
			<el-col :span="1.5">
	          <el-button
	            type="success"
	            icon="el-icon-edit"
	            size="mini"
	            :disabled="multiple"
				@click="ChangeOneRow"
	          >修改</el-button>
	        </el-col>
			
			
			<!-- 进行表格信息修改时弹出的带有表单的对话框 -->
			<el-dialog title="修改的服装信息" :visible.sync="cloFormChangeVisible">
			<div align="center">
				<el-upload
						action="http://127.0.0.1:8080/classfy/"
						list-type="picture-card"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove"
						:file-list="fileList"
						:limit="1"
						:on-exceed="exceed"
						:on-success="succe"
						:auto-upload="false"
						:on-change="classfy">
				  <i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible" width="128px" height="128px">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>  
			
			<el-form ref="cloFormChangeRef" :model="cloFormChange" :rules="cloFormChangeRules">
			<el-form-item label="服装ID" prop="id" :label-width="changeformLabelWidth">
			    <el-input v-model="cloFormChange.id"></el-input>
			  </el-form-item>
			<el-form-item label="服装类别" prop="classification" :label-width="formLabelWidth">
			    <el-input v-model="cloFormChange.classification"></el-input>
			  </el-form-item>				  
			<el-form-item label="服装名称" prop="name"  :label-width="formLabelWidth">
			    <el-input v-model="cloFormChange.name"></el-input>
			</el-form-item>		
			<el-form-item label="服装描述" prop="des"  :label-width="formLabelWidth">
			  <el-input v-model="cloFormChange.des"></el-input>
			</el-form-item>
			  <el-form-item label="服装颜色" prop="color"  :label-width="formLabelWidth">
			    <el-input v-model="cloFormChange.color"></el-input>
			  </el-form-item>				  
			 <el-form-item label="服装型号" prop="size"  :label-width="formLabelWidth">
			    <el-input v-model="cloFormChange.size"></el-input>
			  </el-form-item>				 
			  <el-form-item label="服装库存" prop="stock"  :label-width="formLabelWidth">
			    <el-input v-model="cloFormChange.stock"></el-input>
		  </el-form-item>				  
		  <el-form-item label="服装销售情况" prop="sale"  :label-width="formLabelWidth">
		    <el-input v-model="cloFormChange.sale"></el-input>
		  </el-form-item>				
		  <el-form-item label="服装价格" prop="price"  :label-width="formLabelWidth">
		    <el-input v-model="cloFormChange.price"></el-input>
		  </el-form-item>
		  <el-form-item label="关键字" prop="keywords"  :label-width="formLabelWidth">
		    <el-input v-model="cloFormChange.keywords"></el-input>
		  </el-form-item>
			</el-form> 
		 <div slot="footer" class="dialog-footer">
		  <el-button @click="cloFormChangeVisible = false">取 消</el-button>
		     <el-button type="primary" @click='chang'>确定</el-button>
		   </div>
			</el-dialog>
			
			
	        <el-col :span="1.5">
	          <el-button
	            type="danger"
	            icon="el-icon-delete"
	            size="mini"
	            :disabled="multiple"
				@click="deldialogVisible=true"
	          >删除</el-button>
	        </el-col>
			<el-dialog
			  title="提示"
			  :visible.sync="deldialogVisible"
			  width="30%">
			  <span>确认删除？</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="del">确 定</el-button>
			  </span>
			</el-dialog>
	      </el-row>
		  
		  <!-- 服装信息表格 -->
	   	 <el-table v-loading=loading  :data="tableList" highlight-current-row 
		 @current-change="handleCurrentChange" ref="CloTableRef"  >
	   	       <el-table-column label="序号" type="index" width="50">
	   	        <template slot-scope="scope">
	   	           <!-- <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span> -->
				   <span>{{scope.$index+1}}</span>
	   	         </template>				 
	   	       </el-table-column>
			   <el-table-column label="类别" align="center" prop="classification"  :show-overflow-tooltip="true" width="140" />
	   	       <el-table-column label="ID"   align="center" prop="id" :show-overflow-tooltip="true"  width="140" />
	   	       <el-table-column label="名称" align="center" prop="name" :show-overflow-tooltip="true" width="140"/>
	   	       <el-table-column label="颜色" align="center" prop="color" width="140" />
	   	       <el-table-column label="大小" align="center" prop="size" width="140" />
			   <el-table-column label="库存" align="center" prop="stock" width="140" />
			   <el-table-column label="销售" align="center" prop="sale" width="140" />
			   <el-table-column label="价格" align="center" prop="price" width="140" />
			   <el-table-column label="图片" align="center" prop="img" width="160" >
					<template slot-scope="scope">
					<el-image 
				    style="width: 100px; height: 100px"
				    :src="'data:image/jpg;base64,'+tableList[scope.$index].base64" 
				    :preview-src-list="['data:image/jpg;base64,'+tableList[scope.$index].base64]"
					>
				  </el-image>
				   </template>
			   </el-table-column>
			   
	   	     </el-table>
			 </el-pagination>
     </el-form>
	  
</template>

<script>
import axios from 'axios' 
export default {
	name:'cloth',
	data(){
		return{
			dialogImageUrl: '',
			dialogVisible: false,
			base64:{
				img:''
			},
			fileList:[],
			file:null,
			tempId:'',
			logintel:'',
			cloForm:{
				id:'',
				classification:'',
				des:'',
				name:'',
				color:'',
				size:'',
				stock:'',
				sale:'',
				price:'',
				keywords:'',
			},
			//上传
			cloFormChange:{
				id:'',
				classification:'',
				des:'',
				name:'',
				color:'',
				size:'',
				stock:'',
				sale:'',
				price:'',
				keywords:'',
			},
			cloFormVisible: false,
			cloFormChangeVisible:false,
			deldialogVisible:false,
			 formLabelWidth: '120px',
			 changeformLabelWidth:'120px',
		queryParams:{
			// pageNum:1,
			// pageSize:10,
			classification:'',
			name:''
			// tableName:'',
			// tableComment:''
		},
		// 非点击数据禁用
		 multiple: true,
		 // 遮罩层
		loading: false,  
		 // 表数据
		tableList: [],
		// 总条数
		total: 0,
		  
		  //新增数据时弹出的对话框的表单的验证规则
		  CloFormRules:{
			  id:[
				  { required: true, message: '请输入服装ID', trigger: 'blur' }
			  ],
			  classification:[
				  { required: true, message: '请输入服装类别', trigger: 'blur' }
			  ],
			  name:[
				  { required: true, message: '请输入服装名称', trigger: 'blur' }
			  ],
			  color:[
				  { required: true, message: '请输入服装颜色', trigger: 'blur' }
			  ],
			  size:[
				  { required: true, message: '请输入服装尺寸', trigger: 'blur' }
			  ],
			  stock:[
				  { required: true, message: '请输入服装库存', trigger: 'blur' }
			  ],
			  sale:[
				  { required: true, message: '请输入服装销售情况', trigger: 'blur' }
			  ],
			  price:[
				  { required: true, message: '请输入服装价格', trigger: 'blur' }
			  ],
			  des:[
			  				  { required: true, message: '请输入描述', trigger: 'blur' }
			  ],
			  keywords:[
			  				  { required: true, message: '请输入关键字', trigger: 'blur' }
			  ]
		  },
		  //修改数据时弹出的对话框的表单的验证规则
		  cloFormChangeRules:{
			 id:[
			 		  { required: true, message: '请输入服装ID', trigger: 'blur' } 
			 ],
			 classification:[
			 				  { required: true, message: '请输入服装类别', trigger: 'blur' }
			 ],
			 name:[
			 				  { required: true, message: '请输入服装名称', trigger: 'blur' }
			 ],
			 color:[
			 				  { required: true, message: '请输入服装颜色', trigger: 'blur' }
			 ],
			 size:[
			 				  { required: true, message: '请输入服装尺寸', trigger: 'blur' }
			 ],
			 stock:[
			 				  { required: true, message: '请输入服装库存', trigger: 'blur' }
			 ],
			 sale:[
			 				  { required: true, message: '请输入服装销售情况', trigger: 'blur' }
			 ],
			 price:[
			 				  { required: true, message: '请输入服装价格', trigger: 'blur' }
			 ] ,
			 des:[
			 				  { required: true, message: '请输入描述', trigger: 'blur' }
			 ],
			 keywords:[
			 				  { required: true, message: '请输入关键字', trigger: 'blur' }
			 ]
		  }
			 } 
	},
	created() {
		this.getList();
		// this.logintel=this.$route.params.tel;
		// console.log("得到的用户电话",this.$route.params.tel)
	},
	methods:{
		
		
		
		
		
		
		//RRRRRR
		handleRemove(file, fileList) {
		    console.log(file, fileList);
		  },
		  
		  handlePictureCardPreview(file) {
		    this.dialogImageUrl = file.url;
			alert(file.name)
			alert(this.dialogImageUrl)
		    this.dialogVisible = true;
		  },
		  
		  succe(file)
		  {
			alert(file['file'])  
			this.file=file
		  },
		  
		  exceed(){
			alert("只允许上传一张照片哦！")  
		  },
		  
		  classfy(file){
			this.file=file
			var fd = new FormData()
			fd.append('file', file.raw)
			  //上传的文件为二进制文件需要，file.raw才是
			fd.append('name', file.name)
			const that=this
			axios.post('http://127.0.0.1:8088/classfy/',fd,{
		    headers: {
		          'Content-Type': 'multipart/form-data;'
		        }}
		  ).then((response) => {
					console.log(response)
					that.cloFormChange.classification=response.data.class
					that.cloForm.classification=response.data.class
					
					
				})
				.catch((error) => {
					console.log(error)
				})
		  },
		  getBase64(file) {
		    return new Promise(function(resolve, reject) {
				let reader = new FileReader();
				let imgResult = "";
		        reader.readAsDataURL(file);
		        reader.onload = function() {
				imgResult = reader.result;
					};
				reader.onerror = function(error) {
		                reject(error);
					};
				reader.onloadend = function() {
					resolve(imgResult);
					};
				});
		},
		upload(id){//spring服务器
			var fd = new FormData()
			fd.append('file', this.file.raw)
			
			  // 上传的文件为二进制文件需要，file.raw才是
			fd.append('id', id)
			alert(id)
			const that=this
			axios.post('http://127.0.0.1:8080/upload',fd
			).then((response) => {
							console.log(response)
					        // that.base64.img=response.data.img
						}).catch((error) => {
							console.log(error)
			})
			location.reload();//更新页面
		},
		
		//RRRRRR
			
		
		
		//WWWWWWW
		
		//重置搜索表单
		resetQueryForm(){
			this.$refs.queryForm.resetFields();
			this.getList();
		},
		//表格单击事件
		handleCurrentChange(val){
			 this.currentRow = val;
			 //进行数据选中点击事件后将修改和删除置为可用状态
			 this.multiple=false;
			 console.log("点击事件",this.multiple);
			 // console.log("得到当前行的值的id：",this.currentRow.id);
			 // console.log("val的值：",val);
		},
		
		  /** 查询表集合 */
		 getList() {
			 // 因为进入到请求之中this会发生变化，因此要将this暂时用that替换存储，便于到请求中使用
			 const that =this;			 
		       this.loading = true;
			   axios.post("http://127.0.0.1:8080/clothing/findall").then(function (resp) { 
				     that.tableList=resp.data;
					});
					// console.log("之前被选中的状态111",this.multiple);
					this.multiple=true;
					// console.log("之后被选中的状态",this.multiple);
					this.loading = false;
				
		      
		     },
			 // 通过衣服的种类查询衣服表单
			 findbyclass(){
				 var that=this;
				 this.loading=true;
				 console.log(this.queryParams.classification);
				 axios.post("http://127.0.0.1:8080/clothing/findbyclass",this.queryParams).then(function(resp){
					 that.tableList=resp.data;
					 that.total=resp.data.length;
					 console.log(resp.data);
				 });
				 this.loading=false;
			 },
			 // 通过服装名称查找衣服表单
			 findbyname(){
				var that=this;
				this.loading=true;
				axios.post("http://127.0.0.1:8080/clothing/findbyname",this.queryParams).then(function(resp){
									 that.tableList=resp.data;
									 that.total=resp.data.length;
									 console.log(resp.data);
				});
				this.loading=false; 
			 },
			 // 新增服装数据
			 insert(){
				 this.$refs.cloFormRef.validate( async valid=>{
				 	console.log(valid);
				 	if(!valid) return;
				 const that=this;
				 axios.post("http://127.0.0.1:8080/clothing/insert",this.cloForm).then(function (resp){
					 console.log("新增服装数据",resp);
					if(resp.data==400){
						that.$message({
										 message:'插入数据成功！',
										 type:'success'
						});
						that.tempId=that.cloForm.id;
						}
					else if(resp.data==300)
					that.$message({
						message:"插入数据失败！",
						type:'error'
					});
					else
					that.$message({
						message:'数据已经存在，插入失败！',
						type:'error'
					});				 
				 });
				 this.upload(this.cloForm.id);
				 this.multiple=true;//删除和修改不可用
				 this.cloFormVisible = false;//关闭弹出框
				 // this.getList();
				 
				 // this.$refs.cloFormRef.resetFields();
				 });
			 },
			 // 删除点击的衣服数据
			 del(){
				var that=this;				
				axios.post("http://127.0.0.1:8080/clothing/del",that.currentRow).then(function(resp){
					if(resp.data==400)
					that.$message({
										 message:'删除成功',
										 type:'success'
					});
					else
					that.$message({
										 message:'删除失败',
										 type:'error'
									 
				});				
				that.deldialogVisible=false;//关闭弹出框
				location.reload();//页面刷新
				that.multiple=true;	//将删除和修改按钮置于不可用状态	
					});
			 },
			 // 选中表单需要修改的那一行，得到数据弹出对话框
			 ChangeOneRow(){
				this.cloFormChange=this.currentRow;
				
				this.cloFormChangeVisible=true; 
			 },
			 // 对得到的服装数据进行更改
			 chang(){
				 var that=this;
				 this.$refs.cloFormChangeRef.validate( async valid=>{
				 				 	console.log(valid);
				 				 	if(!valid) return;
				
				 axios.post("http://127.0.0.1:8080/clothing/change",this.cloFormChange).then(function(resp){
					 if(resp.data==400)
					 that.$message({
					 			message:'修改成功',
					 			type:'success'
					 });
					 else
					 that.$message({
					 			message:'修改失败',
					 			type:'error'
					 });				 
				 });
				this.upload(this.cloFormChange.id)
				that.$refs.CloTableRef.setCurrentRow();//表格中没有被选中的行
				that.cloFormChangeVisible=false;//关闭弹出框
				that.multiple=true;//删除和修改按钮不可用
				  });
			 }
			
	}
	}
	
 //WWWWWWW
</script>
<style>
</style>
