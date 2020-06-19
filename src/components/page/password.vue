<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form"  label-width="100px">
                    <el-form-item label="账号:">
                        <el-input  maxlength="11"  placeholder="最低要求6位" minlength="6" show-word-limit style="width: 300px;" v-model="zhanghao"></el-input>
                    </el-form-item>
					<el-form-item label="密码:" >
					    <el-input  maxlength="11"  placeholder="最低要求6位"  minlength="6" show-word-limit style="width: 300px;" v-model="password"></el-input>
					</el-form-item>
					<el-form-item label="请确认密码:">
					    <el-input  maxlength="11"  placeholder="最低要求6位"  minlength="6" show-word-limit style="width: 300px;" v-model="newPassword"></el-input>
					</el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="onSubmit">确认修改</el-button>
                      <el-button @click="quxiao">取消</el-button>
                  </el-form-item>
                 
                   
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
	import { updatepassword} from '../../api/index';
export default {
    name: 'baseform',
    data() {
        return {
			zhanghao:"",
			password:"",
			newPassword:"",
            
        };
    },
	created() {
	
		this.zhanghao=	localStorage.getItem("ms_username")
	},
    methods: {
        onSubmit() {
		 	if(this.zhanghao.length<6||this.password.length<6||this.newPassword.length<6){
				  this.$message.error('请正确填写表单！');
				  return;
			} 
			if(this.password!=this.newPassword){
				 this.$message.error('密码不一致！');
				 return;
			}
			
			updatepassword(this.zhanghao,this.password).then(res=>{
				if(res.errno==0){
					 this.$message.success('修改密码成功，请重新登陆！');
					 this.$router.push("/login");
				}else{
					 this.$message.error('服务器错误！');
				}
				
			})
			
           
        },
		quxiao(){
			  this.$router.push('/');
		}
    }
};
</script>