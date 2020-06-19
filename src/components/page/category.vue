<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 分类编辑
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
           <div class="handle-box">
           
               <el-input v-model="oneName" placeholder="请输入一级分类名字" class="handle-input mr10"></el-input>
			   <el-input v-model="oneEName" placeholder="请输入一级名字(英文)" class="handle-input mr10"></el-input>
               <el-button type="primary"  @click="addoneName">增加</el-button>
           </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                
            >
                
                <el-table-column type="index" label="序号" width="60"></el-table-column>
                <el-table-column prop="cName" label="分类名称"></el-table-column>
				<el-table-column prop="cEname" label="分类英文名称"></el-table-column>
   <el-table-column  label="操作">
				<template slot-scope="scope">
				   
				            <el-button
				                type="text"
				                icon="el-icon-edit"
				                @click="handleEdit(scope.$index, scope.row)"
				            >编辑</el-button>
							<el-button
							    type="text"
							    icon="el-icon-edit"
							    @click="editTwo(scope.$index, scope.row)"
							>子分类管理</el-button>
							<el-button
							    type="text"
							    icon="el-icon-delete"
							    class="red"
							    @click="handleDelete(scope.$index, scope.row)"
							>删除</el-button>
							
							
											     
				     
				        
				    </template>
				</el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="pageNum"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
			
			
			<!-- 编辑弹出框 -->
			<el-dialog title="编辑" :visible.sync="editVisible" width="30%">
			<el-form ref="form" label-width="130px">
				<el-tabs v-model="message">
				<!--    <el-tab-pane label="二级分类查看" name="first">
				      <el-form-item label="">
						  <el-select v-model="twoid" placeholder="请选择">
						      <el-option v-for="two in twoList " :key="two.cId" :label="two.cName" :value="two.cId"></el-option>
						     
						  </el-select>
						  
				         
				      </el-form-item>
				    </el-tab-pane> -->
				    <el-tab-pane label="二级分类删除" name="second">
				       <el-form-item label="">
				        <el-select v-model="twoid" placeholder="请选择">
				            <el-option v-for="two in twoList " :key="two.cId" :label="two.cName" :value="two.cId"></el-option>
				           
				        </el-select>
				       	<el-button type="danger" @click="deleteCategory">删除</el-button>
				       </el-form-item>
				    </el-tab-pane>
				    <el-tab-pane label="二级分类添加" name="third">
						<el-form-item label="分类图片上传">
							<el-upload
							  drag style="margin-top: 10px;"
							  
							   action="/qpi/admin/oss/lun"
							 
							   :on-remove="handleRemove"
							    :file-list="imglist"
							   :on-success="uploadSuccess"
							   list-type="picture">
							    <i class="el-icon-upload"></i>
								 <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							   
							
							 </el-upload>
						   
						</el-form-item>
				
				<el-form-item label="名字编辑">
					<el-input v-model="twoName" placeholder="分类名字" style=" max-width: 215px;"></el-input>
					 <el-input v-model="twoEname" placeholder="分类英文名字" style=" max-width: 215px;"></el-input>
				   
				</el-form-item>
				      <el-form-item label="">
				      	<el-button type="primary" @click="addtwocategory" >添加</el-button>
				      </el-form-item>
						
				       
				    </el-tab-pane>
					<el-tab-pane label="二级分类修改" name="four">
						
						<el-form-item label="请选择">
							<el-select v-model="twoupdateid" placeholder="请选择" @change="selectTwoId">
							    <el-option v-for="two in twoList " :key="two.cId" :label="two.cName" :value="two.cId"></el-option>
							   
							</el-select>
							
						   
						</el-form-item>
							     <el-form-item label="分类图片上传">
							     			<el-upload
							     			  drag style="margin-top: 10px;"
							     			  
							     			   action="/qpi/admin/oss/lun"
							     			 
							     			   :on-remove="handleRemove"
							     			    :file-list="imglist"
							     			   :on-success="uploadSuccess"
							     			   list-type="picture">
							     			    <i class="el-icon-upload"></i>
							     				 <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
							     			   
							     			
							     			 </el-upload>
							     		   
							     		</el-form-item>
							     
							     <el-form-item label="名字编辑">
							     	<el-input v-model="twoupdateName" placeholder="分类名字" style=" max-width: 215px;"></el-input>
							     	 <el-input v-model="twoupdateEname" placeholder="分类英文名字" style=" max-width: 215px;"></el-input>
							        
							     </el-form-item>
							           <el-form-item label="">
							           	<el-button type="primary" @click="updateTwo" >更新</el-button>
							           </el-form-item>
					</el-tab-pane>
				</el-tabs>
			
			
			 
			</el-form>
			
			
			
			</el-dialog>
			
			
			<!-- 一级编辑弹出框 -->
			<el-dialog title="编辑" :visible.sync="editVisibleTwo" width="30%">
			<el-form ref="form" label-width="130px">
			 <el-form-item label="分类名称">
			     <el-input v-model="oneName" placeholder="分类名字" style=" max-width: 215px;"></el-input>
				 
			 </el-form-item>
			 <el-form-item label="分类英文名称">
			     
			 				 <el-input v-model="oneEName" placeholder="分类英文名字" style=" max-width: 215px;"></el-input>
			 </el-form-item>
			 <el-form-item >
			     <el-button type="primary" @click="oneupdate" >提交</el-button>
			     <el-button type="primary" @click="onequxiao" >取消</el-button>
			 </el-form-item>
			
			</el-form>
			</el-dialog>
        </div>

      
    </div>
</template>

<script>
import { findcategoryOne,selectTwo,insertCategory,deleteCategorys,updateCategorys,findByCid,updateTwoCategory} from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
			message:"second",
			editVisible:false,
			editVisibleTwo:false,
			pageNum:1,
			pageSize:10,
			   total: 0,
			   oneId:-1,
			   twoid:"",
			   threeid:"",
			   deletetwoid:"",
			   deleteThreeId:"",
			searchValues:"",
            tableData: [],
            multipleSelection: [],
            delList: [],
			
			oneName:"",
			oneEName:"",
			twoName:"",
			twoEname:"",
			twoupdateid:"",
			twoupdateName:"",
			twoupdateEname:"",
			updateThreeid:"",
			twoList:[],
			type:"",
			img:"",
			imglist:[],
         
          
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },

    methods: {
		uploadSuccess(res){
			console.log(res);
			if(res.errno==0){
				 this.$message.success('上传图片成功！');
				 this.imglist=[];
				 let obj={
					 name:"封面",
					 url:res.data.fileDownLoadUrl
				 }
				 this.imglist.push(obj);
				 this.img=res.data.fileDownLoadUrl;
				 
				
			}
		},
		handleRemove(res){
			this.img="",
			this.imglist=[];
			
			
			
		},
		categoryclear(){
			
			this.twoid="";
			this.deletetwoid="";
			this.deleteThreeId="";
			this.oneName="";
			this.oneEName="";
			this.twoName="";
			this.twoEname="";
			this.twoupdateid="";
			this.twoupdateName="";
			this.twoupdateEname="";
			this.updateThreeid="";
			this.updatefourid="";
			this.imglist=[];
			this.img="";
			
		},
		twoupdate(){
			
			let cid=	this.twoupdateid
			console.log("cid"+cid)
				for(let i=0;i<this.twoList.length;i++){
					if(cid==this.twoList[i].cId){
						console.log(this.twoList[i])
						this.twoupdateName=this.twoList[i].cName;
						this.twoupdateEname=this.twoList[i].cEname;
					}
				}
		},
		
		
		onequxiao(){
			this.editVisibleTwo=false;
			this.oneEName="";
			this.oneName="";
		
		},
		
		selectTwoId(){
			let cid=	this.twoupdateid
			this.img="";
			this.imglist=[];
			
			findByCid(cid).then(res=>{
				if(res.errno==0){
					this.twoupdateName=res.data.cName;
					this.twoupdateEname=res.data.cEname;
					this.img=res.data.cImg;
					let obj={
						name:"封面",
						url:this.img
					}
					this.imglist.push(obj);
				}
				
			});
		},
		updateTwo(){
			if(this.twoupdateid==""||this.twoupdateEname==""||this.twoupdateName==""){
				this.$message.error('值不能为空！');
				return;
			}
			
			updateTwoCategory(this.twoupdateid,this.twoupdateName,this.twoupdateEname,this.img).then(res=>{
				console.log(res);
				if(res.errno==0){
				this.$message.success('更新成功');
				this.categoryclear();
				}
			});
			this.twoshuaxin();
		},
		update(id,name,ename){
			updateCategorys(id,name,ename).then(res=>{
				if(res.errno==0){
					this.$message.success('更新成功');
					this.getData();
					this.categoryclear();
					 this.oneName="";
					 this.oneEName="";
					
				}else{
					this.$message.error('更新失败');
					}
					
					
			});
			
		},
		oneupdate(){
			if(this.oneEName==""||this.oneName==""){
					this.$message.error('值不能为空');
				return;
			}
			this.update(this.oneId,this.oneName,this.oneEName);
			this.editVisibleTwo=false;
		},
		deleteCategory(){
			
			if(this.twoid==""){
				this.$message.error('请先选择！');
				return;
			}
			// 二次确认删除
			this.$confirm('确定要删除当前选中的二级分类吗？', '提示', {
			    type: 'warning'
			})
			    .then(() => {
					
					deleteCategorys(this.twoid).then(res=>{
							if(res.errno==0){
								this.$message.success('删除成功');
								 this.twoshuaxin();
								this.categoryclear();
							}else if(res.errno==-2){
								this.$message.error(res.errmsg);
							}else if(res.errno==-3){
									this.$message.error(res.errmsg);
							}
					});
					
					
			        
			    })
			    .catch(() => {});
		},
		twoshuaxin(){
			this.twoList=[];
			selectTwo(this.oneId).then(res=>{
				console.log(res);
				this.twoList=res.data;
			});
		},
		addtwocategory(){
			
			if(this.twoEname==""||this.twoName==""){
				this.$message.error('填写为空！');
				return;
			}
			console.log(this.oneId);
		
			insertCategory(this.oneId,this.twoName,this.twoEname,this.img).then(res=>{
				console.log(res);
				if(res.errno==0){
					 this.$message.success('二级分类加入成功');
					
					 this.twoshuaxin();
					  this.categoryclear();
					
				}
			});
		},
		addoneName(){
			insertCategory(-1,this.oneName,this.oneEName,"").then(res=>{
				console.log(res);
				if(res.errno==0){
					 this.$message.success('一级分类加入成功');
					 this.getData();
					 
					
				}
			});
		},
		editTwo(index,row){
			this.categoryclear();
				this.oneId=row.cId;
			
			selectTwo(row.cId).then(res=>{
				console.log(res);
				this.twoList=res.data;
			});
			this.editVisible=true;
		},
		
       
        getData() {
			this.pageNum=1;
         findcategoryOne(this.pageNum,this.pageSize).then(res=>{
			if(res.errno==0){
				console.log(res)
				this.pageNum=res.data.pageNum;
				this.pageSize=res.data.pageSize;
				this.total=res.data.total;
				this.tableData=res.data.list;
				this.tableData=res.data.list;
			} else if(res.errno==-1){
				 this.$message.success('数据为空');
			}
		 });
        },
  
        // 删除操作
        handleDelete(index, row) {
			console.log(row);
			let ids=row.cId;
			
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
				
				deleteCategorys(ids).then(res=>{
					
						console.log(res);
							if(res.errno==0){
								this.$message.success('删除成功');
								this.getData();
								
							}else if(res.errno==-2){
								this.$message.error(res.errmsg);
							}else if(res.errno==-3){
									this.$message.error(res.errmsg);
							}
				
					
				});
					
					
                    
                })
                .catch(() => {});
        },
        
	
        // 编辑操作
        handleEdit(index, row) {
			this.oneName=row.cName;
			this.oneEName=row.cEname;
            this.idx = index;
           console.log(row);
		   this.oneId=row.cId;
			
            this.editVisibleTwo = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.pageNum=val;
			findcategoryOne(this.pageNum,this.pageSize).then(res=>{
						if(res.errno==0){
							console.log(res)
							this.tableData=res.data.list;
						} else if(res.errno==-1){
							 this.$message.success('数据为空');
						}
			});
			
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
