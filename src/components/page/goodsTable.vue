<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 商品信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
            
                <el-input v-model="searchValues" placeholder="商品名称" class="handle-input mr10"></el-input>
				<el-cascader style="width: 300px;" :options="options" v-model="option"></el-cascader>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
				<el-button type="primary"  @click="chongzhi">重置</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
				:limit="1"
                header-cell-class-name="table-header"
             
            >
                
                <el-table-column type="index" label="序号" width="60"></el-table-column>
                <el-table-column prop="gTitle" label="商品名称"></el-table-column>
				<el-table-column prop="category.cName" label="商品分类"></el-table-column>
				<el-table-column prop="nType" label="语言类型">
									<template slot-scope="scope">
										{{scope.row.gType=='c'?'中文':'英文'}}
									   
									</template>
				</el-table-column>
               <el-table-column label="商品图片" width="180" align="center">
                 <template slot-scope="scope">
                     <el-image
                         class="table-td-thumb"
                         :src="scope.row.gImg"
                         :preview-src-list="[scope.row.gImg]"
                     ></el-image>
                 </template>
               </el-table-column>
                <el-table-column prop="" label="创建时间">
					
					<template slot-scope="scope">{{scope.row.gDate | dateFormat}}</template>
				</el-table-column>
             <el-table-column>
				<template slot-scope="scope">
				   
				            <el-button
				                type="text"
				                icon="el-icon-edit"
				                @click="handleEdit(scope.$index, scope.row)"
				            >编辑</el-button>
				     
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
        </div>

      
    </div>
</template>

<script>
import { findGoods,deleteGoods ,findtypeGoods,findcategoryAll} from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
			option:"",
			  options: [],
			pageNum:1,
			pageSize:10,
			   total: 0,
			searchValues:"",
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
         
            form: {},
            idx: -1,
            id: -1
        };
    },
	
    created() {
        this.getData();
    },
	deactivated () { //清除keep-alive的缓存
	    this.$destroy(true)
	  },
	watch:{
		searchValues(){
			if(this.searchValues.length==0){
				this.pageNum=0;
				this.pageSize=10;
				this.getData();
			}
		}
	},
    methods: {
		
       
        getData() {
			this.pageNum=1;
			findcategoryAll().then(res=>{
				
				
				
				
				this.options=res.data.options;
			});
         findGoods(this.pageNum,this.pageSize).then(res=>{
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
        // 触发搜索按钮
        handleSearch() {
			this.pageNum=1;
			this.pageSize=10;
			let cid=this.option;
			let title=this.searchValues;
		
			if(cid.length>0){
				let cidString=this.option.toString();
				let cids = cidString.split(',');
				cid=cids[cids.length-1];
			}
			
			console.log(cid)
			
            findtypeGoods(this.pageNum,this.pageSize,title,cid).then(res=>{
				if(res.errno==0){
					this.tableData=[];
					console.log(res);
					this.pageNum=res.data.pageNum;
					this.pageSize=res.data.pageSize;
					this.total=res.data.total;
					this.tableData=res.data.list;
				} else if(res.errno==-1){
					 this.$message.success('数据为空');
				}
			});
        },
		chongzhi(){
			this.pageNum=1;
			this.pageSize=10;
			this.searchValues="";
			this.option="";
			findtypeGoods(this.pageNum,this.pageSize,this.searchValues,this.option).then(res=>{
				if(res.errno==0){
					this.tableData=[];
					console.log(res);
					this.pageNum=res.data.pageNum;
					this.pageSize=res.data.pageSize;
					this.total=res.data.total;
					this.tableData=res.data.list;
				} else if(res.errno==-1){
					 this.$message.success('数据为空');
				}
			});
		},
        // 删除操作
        handleDelete(index, row) {
			
			let gid=row.gId;
			
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
					
					deleteGoods(gid).then(res=>{
							if(res.errno==0){
								this.$message.success('删除成功');
								this.getData();
							}else{
								this.$message.error('删除失败');
								}
					});
					
					
                    
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
			
            this.multipleSelection = val;
			
		},
	
        // 编辑操作
        handleEdit(index, row) {
            
			console.log(row);
           let gid=row.gId;
		   let video=row.gVideo;
		   let title=row.gTitle;
		   let lun=row.gLun;
		   let img=row.gImg;
		   let  content =row.gContent;
		   let cId=row.category.cId;
		   let type=row.gType;
		   this.$router.push({
		               path: '/goodsUpdate',   
		               query: {  		
		                               gid: gid,
		   							title:title,
		   							content:content,
		   							img:img,
		   							type:type,
									lun:lun,
									video:video,
									cid:cId
									
		   							
		                           }
		           })  
        },
       
        // 分页导航
        handlePageChange(val) {
            this.pageNum=val;
			findGoods(this.pageNum,this.pageSize).then(res=>{
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
