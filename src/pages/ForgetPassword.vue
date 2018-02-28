<template>
	<div class="forgetpassword">
		 <header class="u-header"> <a class="back" href="javascript:history.back();"><img src="../assets/img/left.png"></a>忘记密码</header>
		 <div class="forget-content" v-show='show1'>
		 	<!--<div class="forget-title">手机验证</div>-->
		 	<div class="forget-center">
		 		<div class="input">
			 		<i class="phone-icon"></i>
			 		<span>手机号码 :</span>
			 		<input type="text" placeholder="请输入手机号" ref="mobile" @blur="checkname" :class="{'mobilesuccess':ismobile}">
			 	</div>
			 	<div class="input">
			 		<i class="code-icon"></i>
			 		<span>图形验证码 :</span>
			 		<input type="text" maxlength="4" placeholder="请输入图形验证码" ref="codemsg1">
			 		<a href="javascript:;" class="codeimg-btn" ref="codemsg" @click='changeimg'><img :src='Const+"/qapi/validataCode/checkCode?channel=H5"' alt="" id="imgsrc" ></a>
			 	</div>
			 	<div class="input">
			 		<i class="code-icon"></i>
			 		<span>手机验证码 :</span>
			 		<input type="text" maxlength="6" placeholder="请输入验证码" ref="code1">
			 		<input type="button" class="code-btn" ref="code" :class="{'codesuccess':iscode}" @click="getcode" value="点击获取" style="padding: 0;">
			 	</div>
			 	<div class="submit">
			 		<button type="submit" class="next-btn btn" @click="next">下一步</button>
			 	</div>
			 	<input type="hidden" ref="code2" value="验证">
		 	</div>
		 </div>
		 <div class="forget-content" v-show='show2'>
		 	<div class="forget-center">
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
	  	props:['showfirst','showsecond'],
        data(){
            return { 
              show1:true,
              show2:false,
              ismobile:false,
              iscode:false,
              ispwd1:false,
              ispwd2:false
            }
        },
        methods: {
        	//点击第一步骤
        	//检测手机号格式
    		checkname:function (event){
				var mobile=this.$refs.mobile.value
				var preg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
				if(mobile){
					if (mobile.match(preg)) {
		              this.ismobile=true;
		            }else{
		               this.$dialog.notify({
		        		mes:'手机号格式是不正确的',
		        		timeout: 3000,});
		            }
				}
			},
            next(){
            	var code1=this.$refs.code1.value;
            	var code2=sessionStorage.getItem('code');
            	if(code1==code2){
            		this.iscode=true;
            	}else{
            		this.$dialog.notify({
					mes:"您输入的验证码有误，请重新输入",
					 timeout: 3000,})
            	}
            	//console.log(this.ismobile)
            	//console.log(this.iscode)
            	if(this.ismobile==true&&this.iscode==true){
            		this.show1=false;
            		this.show2=true;
            	}else{
            		this.$dialog.notify({
					mes:"您输入的信息有误,请核对",
					 timeout: 3000,})
            	}
            },
            changeimg(){
	    		// var codeLength = 4;//验证码的长度
		     //    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
		     //        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数
		     //    for (var i = 0; i < codeLength; i++) {//循环操作
		     //        var index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）
		     //        // $scope.codemsg += random[index];//根据索引取得随机数加到code上
		     //        if(this.$refs.codemsg.innerText.length==codeLength){
		     //        	 this.$refs.codemsg.innerText=''
		     //        }
		     //       this.$refs.codemsg.innerText+= random[index];
		     //    } 
		     //    console.log(this.$refs.codemsg.innerText)
		     var token = sessionStorage.getItem('userAccessToken')
		     var timestamp = (new Date()).valueOf();
		     var mobile=this.$refs.mobile.value
			    $("#imgsrc").attr("src",this.Const+'/qapi/validataCode/checkCode?timestamp='+timestamp+'&channel=H5'+'&mobile='+mobile)
	    	},
            getcode(e){
            	//这里的手机号已经存在没有调出
		    	var num=60	
		    	var txt=e.target.innerText
		    	var mobile=this.$refs.mobile.value
		    	var preg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
		    	var password1=" ";
		    	var recode=this.$refs.codemsg1.value
		    	//手机号的简单匹配-----》手机号是否存在？？？----》
		    	if(mobile&&mobile.match(preg)){
		    		if(recode!=''){
				        var token = sessionStorage.getItem('userAccessToken')
					    // var investCount = this.serviceAjax3('/qapi/validataCode/sendMsg','post',{mobile:mobile,apiType:'重置密码',recode:recode,channel:'H5'},token)
					      var investCount = this.queryAjax3('qapi/validataCode/sendMsg','post',{mobile:mobile,apiType:'重置密码',recode:recode,channel:'H5'},token)
					    //调用注册验证码接口成功之后
					    if(investCount.head.status=="SUCCESS"){
					    	e.target.disabled = 'disabled'
	          				e.target.style.background="#ccc"
					        var timer = setInterval(function () {
			            		num--;
			            		e.target.value=+num+"s"
			            		e.target.style.color="#fff"
			            		if(num<=0|| mobile==''){
				            		e.target.style.background="#ffb400"
				            		e.target.innerText="点击获取"
				            		//按钮设置为不可点击
				            		e.target.disabled = false
				            		clearInterval(timer)
			            		}
			        		}, 1000) 
			        		 sessionStorage.setItem("code",investCount.body.code)
			        		 // console.log(investCount.body.code)
					    }else{
					    	//获取验证码失败的显示信息
					    	this.$dialog.notify({
					        mes:investCount.head.memo,
					        timeout: 3000,})
					    }
					}else{
					this.$dialog.notify({
			    	mes:'请输入图形验证码',
			    	timeout: 4000,})
					}
				}else{
					this.$dialog.notify({
				    mes:'手机号格式不正确',
				    timeout: 3000,})
				}
            },
            //点击第二步
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
     //        	var pwd1=this.$refs.newpwd1.value
     //        	var pwd2=this.$refs.newpwd2.value
     //        	if(pwd1){
     //        		if(pwd1.length < 6 ||pwd1.length > 20){
     //        			this.$dialog.notify({
     //        			mes:'请输入6-20位的字符密码',
     //        			timeout: 500,});
     //        		}else{
     //        			this.ispwd1=true
     //        			if(pwd1!=pwd2){
					//  		this.$dialog.notify({
			  //           	mes:'两次密码输入不一致',
			  //           	timeout: 500,});
					//  	}else{
					//  		this.ispwd2=true;
					//  	}
		   //          }
     //        	}else{
     //        		this.$dialog.notify({
					// mes:'请输入密码',
					// timeout: 3000,})
     //        	}
            	if(this.ispwd1==true&&this.ispwd2==true){
            		//调出接口
            		var mobile=this.$refs.mobile.value;
            		var pwd2=this.$refs.newpwd2.value
            		var password="###"+md5(md5("8txuGjgpHti6TANE6D" +pwd2))
            		var token = sessionStorage.getItem('userAccessToken')
		    		var investCount = this.serviceAjax('api/member/reset/passwd.do','post',{mobile:mobile,password:password,passwordType:'0'},token)
		    		if(investCount.head.status=='FAILD'){
			    		this.$dialog.notify({
	            		mes:investCount.head.memo,
	            		timeout: 4000,});
			    	}else{
	            		this.$router.push({ path: '/login' })
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
	.forget-content .input i.phone-icon{background-image: url(../assets/img/icontel.png);}
	.forget-content .input i.code-icon{background-image: url(../assets/img/iconpassword.png);}
	.forget-content .input i.password-icon{background-image: url(../assets/img/icon-lock.png);}
	.forget-content .input span{display:inline-block;font-size: 0.314rem;width: 35%;color: #444444;padding: .4rem 0;padding-left: 0.3rem;text-align:left;}
	.forget-content .input input{width: 55%;font-size: .314rem; line-height: normal;padding: .4rem 0;border: 0;background: none;color: #ccc; box-sizing: border-box;color: #333;} 
	.forget-content .input .code-btn{font-size: .253rem;position: absolute;right: .3rem;width: 1.9837rem;bottom: 0;top: 0;height: .462rem;line-height: .462rem;margin: auto;background: none;color: #ecc346;border: 1px solid #ecc346;border-radius: 0.8rem;-webkit-border-radius: 0.8rem;-moz-border-radius: 0.8rem;text-align: center;}
	.forget-content .input input{width: 55%;font-size: .314rem; line-height: normal;padding: .4rem 0;border: 0;background: none;color: #ccc; box-sizing: border-box;color: #333;} 
	.forget-content .input .codeimg-btn{font-size: .253rem;position: absolute;right: 0;width: 1.837rem;bottom: 0;top: -0.25rem;height: .462rem;line-height: .462rem;margin: auto;background: none;color: #ecc346;text-align: center;}
	.forget-content .input.mt20{margin-top: 0.242rem;}
	.forget-content .submit{width: 100%;text-align: center;}
	.forget-content .submit .btn{width: 6.443rem;height: 0.821rem;line-height: 0.821rem;background: #ECC346;color: #fff;font-size: 0.314rem;text-align: center;border-radius: 0.8rem;margin: .8rem auto 0;font-family: "\5FAE\8F6F\96C5\9ED1";}

</style>