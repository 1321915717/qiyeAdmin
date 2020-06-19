<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>商品删除</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form"  label-width="80px">
                    <el-form-item label="商品名称">
                        <el-input v-model="name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品封面">
                        <el-upload
                         drag style="width: 500px;"
                          
                          action="/qpi/admin/oss/lun"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                            :file-list="contentImgList"
                          :on-success="uploadSuccess"
						  :limit="1"
                          list-type="picture">
                           <i class="el-icon-upload"></i>
                        						 <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                          
                          
                        </el-upload>
                    </el-form-item>
					<el-form-item label="商品图片">
					    <el-upload
					     drag  style="width: 500px;"
					      
					      action="/qpi/admin/oss/lun"
					     
					      :on-remove="imghandleRemove"
					        :file-list="imgcontentImgList"
					      :on-success="imguploadSuccess"
					      list-type="picture">
					       <i class="el-icon-upload"></i>
					    						 <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					      
					      
					    </el-upload>
					</el-form-item>
					<el-form-item label="商品视频">
					 <el-upload
					   class="upload-demo"
					   drag
					   action="/qpi/admin/oss/lun"
					   multiple
					     :limit="1"
					    :on-success="videoupload"
					   >
					   <i class="el-icon-upload"></i>
					   <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					   <div class="el-upload__tip" slot="tip">商品视频不是必填项</div>
					 </el-upload>
					 <div class="video-box" style="margin-top: 20px; margin-bottom: 50px;">
					 				 <div class="video-item"  v-for="(item,index) in videoList" :key="index">
					 				 	<video controls class="video-item" :src="item.url" >
					 						
					 						
					 					</video>
					 					<el-button size="small" type="primary" @click="videoremove(index)">删除</el-button>
					 				 </div>
					 				
					 </div>	
					</el-form-item>
                
                    <el-form-item label="分类">
                        <el-cascader style="width: 300px;" :options="options" v-model="option"></el-cascader>
                    </el-form-item>
               
                    <el-form-item label="中文英文">
                        <el-radio-group v-model="language">
                            <el-radio label="c">中文</el-radio>
                            <el-radio label="e">英文</el-radio>
                           
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="商品详情">
                        
                        	<el-upload  style="display: none;"
                        	  class="upload-demo"
                        	  action="/api/admin/oss/lun"
                        	  
                        	  
                        	  
                        	  multiple
                        	  :limit="3"
                        	  :on-success="success"
                        	  >
                        	  <el-button size="small" type="primary">点击上传</el-button>
                        	  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        	</el-upload>
							 <quill-editor ref="myTextEditor" style="margin-top: 10px;" v-model="content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="quxiao">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	import { quillEditor } from 'vue-quill-editor';
	import ImageResize from 'quill-image-resize-module';
	import Quill from 'quill';
	
	Quill.register('modules/imageResize', ImageResize); // 注册
	import { findcategoryAll,Goodsupdate,findByCid} from '../../api/index';
	 const toolbarOptions = [
	     [{'header': 1}, {'header': 2}],               // custom button values
	     [{'list': 'ordered'}, {'list': 'bullet'}],
	     [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
	     [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
	                        // text direction
	     	    
	     [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
	     [{'header': [1, 2, 3, 4, 5, 6, false]}],
	     	    
	     [{'color': []}, {'background': []}],          // dropdown with defaults from theme
	     	     
	     [{'align': []}],
	     ['image']                          
	    ]
export default {
    name: 'baseform',
	components: {
	    quillEditor
	},
    data() {
        return {
			name:"",
			gid:-1,
			content: '',
			language:'',
			option:"",
			editorOption: {
			    placeholder: '请输入内容',
					modules:{
						toolbar: {
							 container: toolbarOptions,  // 工具栏
							handlers: {
							        'image': function (value) {
							         if (value) {
							            document.querySelector('.upload-demo .el-button').click()
							        } else {
							       this.quill.format('image', false);
							                                }
							                            }
							            },
										
										
						},
						imageResize:{
						                           displayStyles:{
						                               backgroundColor:'black',
						                               border:'none',
						                               color:'white'
						                           },
						                           modules:['Resize','DisplaySize','Toolbar']
						                       }
						   
					}
			
			    },  
			   contentImgList:[],
			   imgcontentImgList:[],
			   videoList:[],
            options: [],
           
        };
    },
	deactivated () { //清除keep-alive的缓存
	    this.$destroy(true)
	  },
	created() {
		this.getData();
		
		
	},
	mounted() {
	this.gid=	this.$route.query.gid;
	this.name=	this.$route.query.title;
	this.content=this.$route.query.content;
	
		let obj={
						 name:"封面",
						 url:this.$route.query.img
		}
		let objvideo={
						 name:"封面",
						 url:this.$route.query.video
		}
		
		//findByCid(){}
		
		
		let lun = this.$route.query.lun.toString().split(',');
		console.log(lun);
		for(let i=0;i<lun.length;i++){
			let obj={
							 name:"封面",
							 url:lun[i]
			}
			this.imgcontentImgList.push(obj);
		}
		this.contentImgList.push(obj);
		this.videoList.push(objvideo);
	this.language=this.$route.query.type;
		
		
	this.option=this.$route.query.cid;
	//console.log(this.option)
	
		
	
		
	},
    methods: {
		quxiao(){
			this.$router.push('./goods')
		},
		videoupload(res){
			console.log(res);
			if(res.errno==0){
				 this.$message.success('上传宣传片成功！');
				 this.videoList=[];
				 let obj={
					 url:res.data.fileDownLoadUrl
				 }
				 this.videoList.push(obj); 
				 console.log(this.videoList)
			}
		},
		videoremove(id){
			
			/* console.log(id);
			for(let i=0;i<this.videoList.length;i++){
				if(this.videoList[i].id==id){
					
					this.videoList.splice(i,1);
				}
			} */
			this.videoList=[];
		},
		getData(){
			findcategoryAll().then(res=>{
				
				
				
				
				this.options=res.data.options;
				
			});
		},
		success(res){
			console.log(res);
			let quill = this.$refs.myTextEditor.quill
			        // 如果上传成功
			        if (res) {
			            // 获取光标所在位置
			            let length = quill.getSelection().index;
			            // 插入图片，res为服务器返回的图片链接地址
			            quill.insertEmbed(length, 'image', res.data.fileDownLoadUrl)
			            // 调整光标到最后
			            quill.setSelection(length + 1)
			        } else {
			            // 提示信息，需引入Message
			            Message.error('图片插入失败')
			        }
		},
		onEditorChange({ editor, html, text }) {
			
		
		    this.content = html;
			console.log(this.content);
		},
        onSubmit() {
			
			if(this.name==""||this.contentImgList.length==0||this.imgcontentImgList.length==0||this.option==""||this.language==""||this.content==""){
				this.$message.error('请正确填写');
				return;
			}
			let luns=[];
			 for(let i=0;i<this.imgcontentImgList.length;i++){
				luns.push(this.imgcontentImgList[i].url);
			} 
			let lun=luns.toString();
			
			let video="";
			if(this.videoList.length>0){
				 video=this.videoList[0].url;
				 console.log("jinali")
			}
			
			let img=this.contentImgList[0].url;
			
			let title=this.name;
			
			
			let cidString=this.option.toString();
			let cids = cidString.split(',');
			let cid=cids[cids.length-1];
			let content=this.content;
            
			let type=this.language;
			let gid=this.gid;
			Goodsupdate(video,lun,img,title,content,cid,type,gid).then(res=>{
				if(res.errno==0){
					this.$message.success('提交成功！');
					this.$router.push({
					            path: '/goods',   
					            
					        }) 
				}
			});
        },
		handlePreview(){
			console.log("上传前")
			
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
		imguploadSuccess(res){
			if(res.errno==0){
				 this.$message.success('上传图片成功！');
				 let item={
					 name:res.data.fileDownLoadUrl,
					 url:res.data.fileDownLoadUrl
				 }
				 this.imgcontentImgList.push(item); 
				
			}
		},
		imghandleRemove(res){
			
			
			for(let i=0;i<this.imgcontentImgList.length;i++){
				if(this.imgcontentImgList[i].uid=res.uid){
					this.imgcontentImgList.splice(i,1);
				}
			}
		},
		handleRemove(res){
		this.contentImgList=[];
			
		}
    }
};
</script>
<style>
	.video-box{
		width: 900px;
		
		margin-bottom: 20rpx;
	}
	
	
	.video-item{
		margin-left: 5px;
		width: 300px;
		height: 200px;
		
	}
</style>