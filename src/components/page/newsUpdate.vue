<template>
    <div>
	
		
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>新闻编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
			
            <div class="handle-box" >
				<el-upload  style="display: none;"
				  class="upload-demo"
				  action="/qpi/admin/oss/lun"
				  
				  
				  
				  multiple
				  
				  :on-success="success"
				  list-type="picture"
				   :file-list="imglist"
				  >
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>	
		标题：<el-input style="width: 300px;" v-model="title" placeholder="新闻标题" class="handle-input mr10"></el-input>
				
				
					
					 
					<br>
				
				封面： <el-upload
				  drag style="margin-top: 10px;"
				  
				   action="/qpi/admin/oss/lun"
				   :on-preview="handlePreview"
				   :on-remove="handleRemove"
				    :file-list="imglist"
				   :on-success="uploadSuccess"
				   list-type="picture">
				    <i class="el-icon-upload"></i>
					 <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				   
				
				 </el-upload>
				 <br>
				 中英文：  <el-radio v-model="type" label="c">中文</el-radio>
				   <el-radio v-model="type" label="e">英文</el-radio>
				
			
				  <quill-editor ref="myTextEditor" style="margin-top: 10px;" v-model="content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
              
                <el-button class="editor-btn" style="margin-top: 10px;" type="primary" @click="onSubmit">提交</el-button>
				<el-button class="editor-btn" style="margin-top: 10px;" type="primary" @click="quxiao">取消</el-button>
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
	 
	import { updateNews} from '../../api/index';
	 const toolbarOptions = [
[{'header': 1}, {'header': 2}],               // custom button values
				                          [{'list': 'ordered'}, {'list': 'bullet'}],
				                          [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
				                           [{'indent': '+1'},{'indent': '-1'}],           // outdent/indent
				                                             // text direction
				                          	    
				                          [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
				                          [{'header': [1, 2, 3, 4, 5, 6, false]}],
				                          	    
				                          [{'color': []}],          // dropdown with defaults from theme
				                          	     
				                          [{'align': []}],
										   ['image']       
	    ]
export default {
	components: {
	    quillEditor
		
	},
    name: 'info',
    data() {
        return {
			type:"",
			id:-1,
			imglist:[],
			img:"",
			content: '',
			title:"",
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
		
		    }  
		   
          
        };
    },
	deactivated () { //清除keep-alive的缓存
	    this.$destroy(true)
	  },
	mounted() {
	
		this.content=this.$route.query.content
		this.id=this.$route.query.id;
		let obj={
						 name:"封面",
						 url:this.$route.query.img
		}
		this.imglist.push(obj);
		this.img=this.$route.query.img;
		this.title=this.$route.query.title;
		this.type=this.$route.query.type;
	},
	created() {
		
		
	},
    methods: {
	
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
		//console.log(this.content);
	},
	onSubmit(){
		
		
		if(this.title==""||this.content==""||this.img==""||this.type==""){
			this.$message.error('请填写完整！');
			return;
		}
		updateNews(this.id,this.title,this.content,this.img,this.type).then(res=>{
			if(res.errno==0){
				 this.$message.success('更新成功！');
				 this.$router.push({
				             path: '/news',   
				            
				         }) 
			}
		});
	},
	quxiao(){
		this.$router.push({
		            path: '/news',   
		           
		        }) 
	},
	
	handlePreview(){
		console.log("上传前")
		
	},
	handleRemove(res){
		this.img="",
		this.imglist=[];
		
		
		
	},
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
	}
	
	
		
       
    }
};
</script>
<style  scoped>
	
</style>