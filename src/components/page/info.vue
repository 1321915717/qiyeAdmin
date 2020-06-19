<template>
    <div>
	
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
			
            <div class="form-box">
                <el-form ref="form"  label-width="80px">
					<el-form-item label="轮播图">
						
						 
						
					
					 <el-upload
					  drag
					   class="upload-demo"
					   action="/qpi/admin/oss/lun"
					   :on-preview="handlePreview"
					   :on-remove="handleRemove"
					     :file-list="contentImgList"
					   :on-success="uploadSuccess"
					   list-type="picture">
					    <i class="el-icon-upload"></i>
						 <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					   
					   
					 </el-upload>
					
					   
					</el-form-item>
               
         <el-form-item label="宣传片">
			 <el-upload
			  
			   drag
			   action="/qpi/admin/oss/lun"
			   multiple
			    :on-success="videoupload"
				:before-remove="noremove"
			   >
			   <i class="el-icon-upload"></i>
			   <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			   <div class="el-upload__tip" slot="tip">视频可以不填写！</div>
			 </el-upload>
		
			 					
			
			         
						
				<div class="video-box" style="margin-top: 20px;">
								 <div class="video-item" v-for="(item,index) in videoList" :key="index">
								 	<video controls class="video-item" :src="item.url">
										
										
									</video>
									<el-button size="small" type="primary" @click="videoremove(index)">删除</el-button>
								 </div>
								
				</div>		
			
			 
				</el-form-item>
				<el-form-item style="margin-top: 50px;">
				    <el-button type="primary" @click="onSubmit">提交</el-button>
				    <el-button @click="getData">取消</el-button>
				</el-form-item>
				
			
         
            
         </el-form-item>
                        
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
	
	import { uploadlun,findlun} from '../../api/index';
export default {
    name: 'info',
    data() {
        return {
			
			videoList:[
				
				
			],
			contentImgList:[
			
			],
           fileList:[], //图片列表
		   
          
        };
    },
	created() {
		this.getData();
		
	},
    methods: {
		
		getData(){
			this.contentImgList=[];
			this.fileList=[];
			this.videoList=[];
			findlun().then(res=>{
				console.log(res);
				let data=res.data;
				for(let i=0;i<data.length;i++){
					if(data[i].gType=="image"){
						let obj={
							name:data[i].gUrl,
							url:data[i].gUrl
						}
						this.contentImgList.push(obj);
					}else if(data[i].gType=="video"){
							let obj={
												 url:data[i].gUrl
							}
							this.videoList.push(obj); 
					}
				}
			});
		},
		noremove(){
			return;
		},
		handlePreview(){
			console.log("上传前")
			
		},
		videoremove(id){
			
			/* console.log(id);
			for(let i=0;i<this.videoList.length;i++){
				if(this.videoList[i].id==id){
					
					this.videoList.splice(i,1);
				}
			} */
			this.videoList.splice(id,1);
		},
		videoupload(res){
			console.log(res);
			if(res.errno==0){
				 this.$message.success('上传宣传片成功！');
				 let obj={
					 url:res.data.fileDownLoadUrl
				 }
				 this.videoList.push(obj); 
				 console.log(this.videoList)
			}
		},
		uploadSuccess(res){
			console.log(res);
			if(res.errno==0){
				 this.$message.success('上传图片成功！');
				 let item={
					 name:res.data.fileDownLoadUrl,
					 url:res.data.fileDownLoadUrl
				 }
				 this.contentImgList.push(item); 
				 console.log(this.contentImgList)
			}
		},
		handleRemove(res){
			console.log("删除图片");
			console.log(res);
			
			for(let i=0;i<this.contentImgList.length;i++){
				if(this.contentImgList[i].uid=res.uid){
					this.contentImgList.splice(i,1);
				}
			}
			
		},
        onSubmit() {
			this.fileList=[];
			
			if(this.contentImgList.length==0){
					this.$message.error('请正确填写值');
			}
			for(let i=0;i<this.contentImgList.length;i++){
				let obj={
					gUrl:this.contentImgList[i].url,
					gType:"image"
				}
				this.fileList.push(obj);
			}
			
			for(let i=0;i<this.videoList.length;i++){
				let obj={
					gUrl:this.videoList[i].url,
					gType:"video"
				}
				this.fileList.push(obj);
			}
			
			console.log(this.fileList);
			
			
			uploadlun(this.fileList).then(res=>{
				this.$message.success('提交成功！');
			});
			
           // 
        }
    }
};
</script>
<style  scoped>
	.video-box{
		width: 900px;
		
		display: flex;
		flex-direction: row;
	}
	.video-item{
		margin-left: 5px;
		width: 300px;
		height: 200px;
	}
  .lunbo{
	  margin-top: 10px;
	  background-color: #00A854;
	  width: 300px;
  }
  .lunbo>p{
	  font-size: 15px;
		text-align: center;
  }
  .image-box{
	  display: flex;
	  flex-direction: row;
  }
</style>