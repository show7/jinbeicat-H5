<template>
	<div class="forgetpassword">
		 <header class="u-header"> <a class="back" href="javascript:history.back();"><img src="../../../assets/img/left.png"></a>修改登录密码</header>
		 <div class="forget-content">
		 	<div class="forget-center">
		 		<div class="input">
			 		<i class="password-icon"></i>
			 		<span>旧登录密码 :</span>
			 		<input type="password" ref="oldpwd" :class="{'oldsuccess':isold}">
			 		<!-- <input type="password" ref="newpwd1" :class="{'pwd1success':ispwd1}"> -->
			 	</div>
		 		<div class="input">
			 		<i class="password-icon"></i>
			 		<span>新登录密码 :</span>
			 		<input type="password" ref="newpwd1" @blur="checkpwd" :class="{'pwd1success':ispwd1}">
			 		<!-- <input type="password" ref="newpwd1" :class="{'pwd1success':ispwd1}"> -->
			 	</div>
			 	</div>
			 	<div class="input">
			 		<i class="password-icon"></i>
			 		<span>确认新密码 :</span>
			 		<input type="password" ref="newpwd2" @blur="checksame" :class="{'pwd2success':ispwd2}">
			 		<!-- <input type="password" ref="newpwd2" :class="{'pwd2success':ispwd2}"> -->
			 	</div>
			 	<div class="submit">
			 		<button type="submit" class="next-btn btn" @click="success">完成</button>
			 	</div>
		 	</div>
		 </div>
	</div>
</template>
<style>
.yd-notify{background-color: rgba(40,40,40,.8);position: fixed;top:40%;left:0;right:0;line-height: .28rem;font-size: .26rem;color: #fff;padding: .3rem .24rem;opacity: 0;
    -webkit-animation: notify-downin .2s linear forwards;animation: notify-downin .2s linear forwards;word-break: break-all;text-align: center;z-index: 2000;width:255px;border-radius:5px;margin:0 auto;}
</style>
<script>
	  export default { 
        data(){
            return { 
              isold:false,
              ispwd1:false,
              ispwd2:false
            }
        },
        methods: {
            checkpwd(){
            	var pwd1=this.$refs.newpwd1.value
            	//console.log(pwd1)
            	if(pwd1){
            		if(pwd1.length < 6 ||pwd1.length > 20){
            			this.$dialog.notify({
            			mes:'请输入6-20位的字符密码',
            			timeout: 500,});
            		}else{
            			this.ispwd1=true
            		}
            	}else{
            		this.$dialog.notify({
					mes:'请输入密码',
					timeout: 3000,})
            	}
            },
            checksame(){
            	var pwd1=this.$refs.newpwd1.value
            	var pwd2=this.$refs.newpwd2.value
            	if(pwd1!=pwd2){
			 		this.$dialog.notify({
	            	mes:'两次密码输入不一致',
	            	timeout: 500,});
			 	}else{
			 		this.ispwd2=true;
			 	}
            },
            success(){
            	//判断旧密码是否输入正确
            	var old=this.$refs.oldpwd.value;
            	var oldpwd="###"+md5(md5("8txuGjgpHti6TANE6D" +old))
            	if(this.ispwd1==true&&this.ispwd2==true){
            		//调出接口
            		var pwd2=this.$refs.newpwd2.value
            		var password="###"+md5(md5("8txuGjgpHti6TANE6D" +pwd2))
            		// console.log(password)
            		var token = sessionStorage.getItem('userAccessToken')
		    		var investCount = this.serviceAjax('api/user/modify/passwd.do','post',{oldPassword:oldpwd,passwd:password,passwdType:0},token)
		    		// console.log( investCount)
		    		if(investCount.head.status=='FAILD'){
			    		this.$dialog.notify({
	            		mes:investCount.head.memo,
	            		timeout: 4000,});
			    	}else{
	            		this.$router.push({ path: '/account' })
			    	}
      			}else{
       				this.$dialog.notify({
	     			mes:'填写有误请核对',
	    			timeout: 500,});
       			}
            }
        }
    }  
</script>
<style scoped>
	.u-header {color: #fff; font-size: 0.380rem; line-height: 0.863rem;background: #e71a19;text-align: center; height: 0.863rem; position: relative;}
	.u-header a { width: 0.253rem; height: 0.4227rem; float: left; position: absolute;left: 0.302rem;top: 25%;}
	.forget-content .forget-title{padding:0.332rem 0;text-align: center;color:#888;font-size: 0.326rem;}
	.forget-content .input{background: #fff;padding: 0 .4rem;position: relative;border-top: 1px solid #ECECEC;border-bottom: 1px solid #ECECEC;clear: both;overflow:hidden;}
	.forget-content .input i{vertical-align: middle; float: left;  margin: 5.7% 0;display: inline-block;width: 0.352rem;height: 0.4167rem;background-repeat:no-repeat;background-size:100%;}
	.forget-content .input i.phone-icon{background-image: url(../../../assets/img/icontel.png);}
	.forget-content .input i.code-icon{background-image: url(../../../assets/img/iconpassword.png);}
	.forget-content .input i.password-icon{background-image: url(../../../assets/img/icon-lock.png);}
	.forget-content .input span{display:inline-block;font-size: 0.314rem;width: 35%;color: #444444;padding: .4rem 0;padding-left: 0.3rem;text-align:left;}
	.forget-content .input input{width: 55%;font-size: .314rem; line-height: normal;padding: .4rem 0;border: 0;background: none;color: #ccc; box-sizing: border-box;color: #333;} 
	.forget-content .input .code-btn{font-size: .253rem;position: absolute;right: .3rem;width: 1.9837rem;bottom: 0;top: 0;height: .462rem;line-height: .462rem;margin: auto;background: none;color: #ecc346;border: 1px solid #ecc346;border-radius: 0.8rem;-webkit-border-radius: 0.8rem;-moz-border-radius: 0.8rem;text-align: center;}
	.forget-content .input.mt20{margin-top: 0.242rem;}
	.forget-content .submit{width: 100%;text-align: center;}
	.forget-content .submit .btn{width: 6.443rem;height: 0.821rem;line-height: 0.821rem;background: #ECC346;color: #fff;font-size: 0.314rem;text-align: center;border-radius: 0.8rem;margin: .8rem auto 0;font-family: "\5FAE\8F6F\96C5\9ED1";}

</style>