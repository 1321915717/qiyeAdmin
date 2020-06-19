<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>企业信息编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
      <div class="container">
          <el-tabs v-model="message">
              <el-tab-pane label="企业简介" name="first">
                
              </el-tab-pane>
              <el-tab-pane label="企业简介(英文)" name="second">
                  <template v-if="message === 'second'">
                     
                    
                  </template>
              </el-tab-pane>
              <el-tab-pane label="联系方式" name="third">
                 
              </el-tab-pane>
			  <el-tab-pane label="联系方式(英文)" name="four">
			     
			  </el-tab-pane>
          </el-tabs>
		   <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
		   
		   <el-button class="editor-btn" type="primary" @click="onSubmit">提交</el-button>
		   <el-button class="editor-btn" type="primary" @click="this.getData">取消</el-button>
      </div>
    </div>
</template>

<script>
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	import { quillEditor } from 'vue-quill-editor';
	import { updateIntroduce,findIntroduce} from '../../api/index';
export default {
	components: {
	    quillEditor
	},
    name: 'baseform',
    data() {
        return {
			message:'first',
			content: '',
			introduce:{},
			editorOption: {
			    placeholder: '请输入内容',
				modules:{
				                        toolbar:[
				                          
				                          [{'header': 1}, {'header': 2}],               // custom button values
				                          [{'list': 'ordered'}, {'list': 'bullet'}],
				                          [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
				                          [{'indent': '+1'}],          // outdent/indent
				                                             // text direction
				                          	    
				                          [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
				                          [{'header': [1, 2, 3, 4, 5, 6, false]}],
				                          	    
				                          [{'color': []}],          // dropdown with defaults from theme
				                          	     
				                          [{'align': []}],
				                         
				                        ]
				                    }
			
			    }         
        };
    },
	watch:{
		message(){
			if(this.message=='first'){
				
					this.content=this.introduce.introduce;
			}else if(this.message=='second'){
					this.content=this.introduce.eintroduce;
			}else if(this.message=='third'){
					this.content=this.introduce.calls;
			}else if(this.message=='four'){
					this.content=this.introduce.ecall;
			}
		}
	},
	created() {
		this.getData();
	},
    methods: {
		getData(type){
			findIntroduce().then(res=>{
				this.introduce=res.data;
				this.message="first";
				this.content=this.introduce.introduce;
			});
		},
        onSubmit() {
			let type="";
			if(this.message=='first'){
				
					type="introduce";
			}else if(this.message=='second'){
					type="eintroduce";
			}else if(this.message=='third'){
					type="call";
			}else if(this.message=='four'){
					type="ecall";
			}
			
			updateIntroduce(this.content,type).then(res=>{
				console.log(res);
				if(res.errno==0){
					this.$message.success('编辑成功！');
				}else{
					this.$message.success('编辑失败');
				}
				//this.$message.success('编辑成功！');
				this.getData();
			});
         //   this.$message.success('提交成功！');
        },
		onEditorChange({ editor, html, text }) {
			
		
			console.log(this.message)
		    this.content = html;
			console.log(this.content);
		},
    }
};
</script>

<style>
	.bianji{
		display: flex;
		flex-direction: row;
	}
	.form-box{
		width: 1500px;
	}
	.editor-btn{
		margin-top: 10px;
	}
</style>