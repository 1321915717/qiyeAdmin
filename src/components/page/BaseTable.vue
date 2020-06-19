<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 客户信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-input v-model="searchValues" placeholder="客户名/电话/公司" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="60"></el-table-column>
                <el-table-column prop="cName" label="客户名称"></el-table-column>
                <el-table-column label="客户公司名称">
                    <template slot-scope="scope">{{scope.row.cCompany}}</template>
                </el-table-column>
        
                <el-table-column prop="cIphone" label="客户电话"></el-table-column>
			<el-table-column prop="cInfo" label="询问内容"></el-table-column>
                <el-table-column prop="cDate" label="询问时间">
					 <template slot-scope="scope">{{scope.row.cDate | dateFormat}}</template>
					
				</el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                     
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
import { findAllCallme,search,deleteCallme } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
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
         findAllCallme(this.pageNum,this.pageSize).then(res=>{
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
			this.pageNum=0;
			this.pageSize=10;
            search(this.pageNum,this.pageSize,this.searchValues).then(res=>{
				if(res.errno==0){
					this.tableData=[];
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
			console.log(row);
			let ids=row.cId;
			
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
					console.log(ids)
					deleteCallme(ids).then(res=>{
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
		//批量删除
        delAllSelection() {
            const length = this.multipleSelection.length;
			
			let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
			let ids=[]
			console.log(this.delList)
            for (let i = 0; i < this.delList.length; i++) {
                ids.push(this.delList[i].cId);
            }
			ids=ids.toString();
			
			
			// 二次确认删除
			this.$confirm('确定要删除吗？', '提示', {
			    type: 'warning'
			})
			    .then(() => {
					console.log(ids)
					deleteCallme(ids).then(res=>{
							if(res.errno==0){
								this.$message.success('删除成功');
								this.getData();
							}else{
								this.$message.error('删除失败');
								}
					});
					
					
			        
			    })
			    .catch(() => {});
            
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
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
			findAllCallme(this.pageNum,this.pageSize).then(res=>{
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
