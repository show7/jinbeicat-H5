<template>
   	<div>
		<header class="u-header"> <a class="back" href="javascript:history.back();"><img src="../assets/img/left.png"></a>注册</header>
		<div class="login_bg">
			<div class="yd-input">
				<input type="text" v-model.lazy="input4" regex="mobile" placeholder="输入手机号" ref="tel" @blur="checkname" :class="{'namesuccess':isname}" slot="right">
			</div>
			 <yd-cell-group>
		        <yd-cell-item>
		            <input type="text" slot="right" placeholder="请输入图形验证码" ref="codemsg1">
		           	<span slot="right" ref="codemsg" @click="changeimg"><img :src='Const+"/qapi/validataCode/checkCode?channel=H5"' alt="" id="imgsrc" ></span>
		        </yd-cell-item>
    		</yd-cell-group>
            <yd-cell-group>
		        <yd-cell-item>
		            <input type="text" slot="right" placeholder="请输入短信验证码" ref="code" :class="{'codesuccess':iscode}">

		            <!-- ↓↓关键代码是这里↓↓ -->
		            <yd-sendcode id="#J_GetCode" ref="codemsg" slot="right" v-model="start1" @click.native="sendCode1" type="warning"></yd-sendcode>
		            <!-- ↑↑关键代码是这里↑↑ -->
		        </yd-cell-item>
    		</yd-cell-group>
    		
    		<div class="yd-input">
				<input slot="right" v-model="input2" placeholder="请输入密码" type="password" ref="passow" @blur="checkpassword" :class="{'passwordsuccess':ispassword}">
			</div>
	       <div class="yd-input">
				<input slot="right"  v-model="input3" placeholder="再次输入密码" type="password" ref="passow2" :class="{'repasswordsuccess':isrepassword}" @blur="checkrepassword">
			</div>
		    <input class="input-control" placeholder="输入推荐号码 (选填)" type="text" id="input_referee" name="referee" value="" ref="recode">
		    <div class="u-txt">
		    	
		    	<a href="javascript:;" id="check" :class="{'checked':isA,'unchecked':!isA}" @click="toggle"></a>注册即表示您已同意
		    	<!-- <a href="javascript:;" class="link">《金贝猫金融注册协议》</a> -->
		    	<router-link to="/Agreement" class="link">《金贝猫金融注册协议》</router-link>
		    </div>
            <button class="login_btn" type="submit" @click="u_register">注册</button>
            <input type="hidden" ref="code2" value="注册">
		</div> 
	</div>
</template>

<script>

export default{    
    data(){
        return{
             input4: '',
             input2:'',
             input3:'',
             start1: false,
             isA:true,
             isname:false,
             ispassword:false,
             isrepassword:false,
             iscode:false
        }
    },
    methods:{
    	//检测手机号格式
    	checkname:function (event){
    		var mobile=this.$refs.tel.value
    		var preg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
    		if(mobile){
    			if (mobile.match(preg)) {
                  this.isname=true;
                }else{
                   this.$dialog.notify({
            		mes:'手机号格式是不正确的',
            		timeout: 500,});
                }
    		}
    	},
    	//验证密码的功能
    	checkpassword:function(){
    		var passwd=this.$refs.passow.value
    		if(passwd){
    			//匹配规则
    			if(passwd.length < 6 || passwd.length > 20){
    				 this.$dialog.notify({
            		mes:'请输入6-20位的字符密码',
            		timeout: 500,});
    			}else{
    				 this.ispassword=true;
    			}
    		}else{
    			this.$dialog.notify({
            	mes:'请输入密码',
            	timeout: 500,});
    		}
    	},
    	checkrepassword:function(){
    		var passwd=this.$refs.passow.value
		 	var passwd2=this.$refs.passow2.value
		 	if(passwd!=passwd2){
		 		this.$dialog.notify({
            	mes:'两次密码输入不一致',
            	timeout: 500,});
		 	}else{
		 		this.isrepassword=true;
		 	}
    	},
    	toggle(){
    		this.isA=!this.isA
    	},
    	//图形验证码
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
	     var mobile=this.$refs.tel.value
		   $("#imgsrc").attr("src",this.Const+'/qapi/validataCode/checkCode?timestamp='+timestamp+'&channel=H5'+'&mobile='+mobile)
    	},
  		u_register:function () {
  			//需要注意的手机号正确，短信验证码匹配，密码符合要求，而且同意了金贝猫的协议才可以注册成功
		 	var mobile=this.$refs.tel.value
		 	var passwd=this.$refs.passow.value
		 	var passwd2=this.$refs.passow2.value
		 	var passworda="###"+md5(md5("8txuGjgpHti6TANE6D" +passwd))
		 	var passworda2="###"+md5(md5("8txuGjgpHti6TANE6D" +passwd2))
		 	var recode=this.$refs.recode.value
		 	var code = this.$refs.code.value;
		 	// var code1 = this.$refs.code2.value;
		 	var codemsg= this.$refs.codemsg.value;
		 	var codemsg1= this.$refs.codemsg.value1;
		 	var code1=sessionStorage.getItem('code');
		 	//获取验证码
		 	//console.log(code)
			if(code==code1){
				//验证码匹配后
				this.iscode=true
			}else{
				this.$dialog.notify({
				mes:"您输入的验证码有误，请重新输入",
				 timeout: 4000,})
			}

		 	//需要注意的手机号正确，短信验证码匹配，密码符合要求，而且同意了金贝猫的协议才可以祖册成功
		    if(this.isA==true&&this.isname==true&&this.ispassword==true&&this.iscode==true&&this.isrepassword==true){
		    	var token = sessionStorage.getItem('userAccessToken')
		    	var investCount = this.serviceAjax('api/member/regist.do','post',{mobile:mobile,password:passworda2,recommend:recode,smsCode:code1},token)
		    	if(investCount.head.status=='FAILD'){
		    		this.$dialog.notify({
            		mes:investCount.head.memo,
            		timeout: 4000,});
		    	}else{
	    			var investCount2 = this.serviceAjax('api/member/login.do','post',{mobile:mobile,password:passworda2},token)
					// console.log(investCount2)
           			if(investCount2.head.status=='SUCCESS'){
//								//判断是否实名认证
						var accessToken=investCount2.body.token.accessToken;
//								sessionStorage.setItem('userAccessToken',investCount2.body.token.accessToken)
						var user = this.queryAjax('qapi/user/index.do','post',{},accessToken)
						// console.log(user)
        				var code = user.head.code
        				 if(code=='0000'){
        				    sessionStorage.setItem('userAccessToken',accessToken);
//		        				  	this.$router.push({ path: '/Account/Bank'})
							  var cardstate=user.body.isBankBinding
						      // console.log(cardstate)
						      var state1=null;
						      var state2=null;
						      var state3=null;
						      if(cardstate=='FAI'){
						        //未绑卡
						        // this.card.state=true;
						        state1=1;
						        state2=0;
						        state3=0;
						        // console.log(this.card.state)
						        this.$router.push({ path: '/Account/Bank/SetBank' }) 
						      }else if(cardstate=='SUC'){
						        //绑卡成功
						        state1=0;
						        state2=1;
						        state3=0;
						        this.$router.push({ path: '/Account/Bank/SetBank'}) 
						      }else if(cardstate=='SUB'){
						       //申请绑卡
						        state1=0;
						        state2=1;
						        state3=1;
						        this.$router.push({ path: '/Account/Bank/SetBank'})
						      }
						     sessionStorage.setItem('state1',state1);
						     sessionStorage.setItem('state2',state2);
						     sessionStorage.setItem('state3',state3);
							//判断是否绑卡
        				  }else{
        				  	 this.$dialog.notify({
		               		 mes:user.head.memo,
		               		 timeout: 4000,});
        				  } 
			        }else{
		                 this.$dialog.notify({ 
		                mes:investCount2.head.memo,
		                timeout: 4000,});
			        }		
		    	}
		    }else{
		    	this.$dialog.notify({
            	mes:'注册信息有误',
            	timeout: 4000,})
		    }
		
		},
	    sendCode1(e) {
	    	//这里的手机号已经存在没有调出
	    	var num=60	
	    	var txt=e.target.innerText
	    	var mobile=this.$refs.tel.value
	    	var recode=this.$refs.codemsg1.value
	    	var preg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
	    	var password1=" ";
	    	//手机号的简单匹配-----》手机号是否存在----》
	    	if(mobile&&mobile.match(preg)){
	    		//获取短信验证码接口
	    		if(recode!=''){
	    			//console.log(recode)
			        var token = sessionStorage.getItem('userAccessToken')
				    var investCount = this.queryAjax3('qapi/validataCode/sendMsg','post',{mobile:mobile,apiType:'用户注册',recode:recode,channel:'H5'},token)
				    // console.log(investCount)
				    //调用注册验证码接口成功之后
				    if(investCount.head.status=="SUCCESS"){
				    	e.target.disabled = 'disabled'
				    	e.target.style.background="#ccc"
				        var timer = setInterval(function () {
		            		num--;
		            		e.target.innerText=+num+"s后重新发送"
		            		if(num<=0|| mobile==''){
		            			e.target.innerText="点击获取"
			            		e.target.style.background="#ffb400"
			            
			            		//按钮设置为不可点击
			            		e.target.disabled = ''
			            		clearInterval(timer)
		            		}
		        		}, 1000)
		        		 // this.$refs.code2.value=investCount.body.code;
				        //判断验证码与输入的验证时候一致
				         sessionStorage.setItem("code",investCount.body.code)
				         // console.log(investCount.body.code)
				    }else{
				    	//获取验证码失败的显示信息
				    	this.$dialog.notify({
				        mes:investCount.head.memo,
				        timeout: 4000,})
				       // console.log(investCount.body.code)
				    }
				}else{
					this.$dialog.notify({
			    	mes:'请输入图形验证码',
			    	timeout: 4000,})
				}

			}else{
				this.$dialog.notify({
			    mes:'手机号格式不正确',
			    timeout: 4000,})
			}
		   
	    }
 	}

}
</script>
<style scoped>
body{ background: #FFF;font-family: "微软雅黑";}
.yd-cell{background-color: rgb(250,250,250)!important}
.yd-cell-box{ margin: 0;}
 .yd-cell-right input[type=tel],.yd-cell-right input[type=password],.yd-cell-right input[type=text]:not(.yd-spinner-input){color: #333;font-size: .362rem;border-bottom: 1px solid #E7E7E7; }
.yd-cell-right input[type=text]:not(.yd-spinner-input){ width: 30%;}
/*.yd-btn-warning { background-color: #fff; color: #ecc346;    font-size: .314rem;}*/
.u-header {color: #fff; font-size: 0.380rem; line-height: 0.863rem;background: #e71a19;text-align: center; height: 0.863rem; position: relative;}
.u-header a { width: 0.253rem; height: 0.4227rem; float: left; position: absolute;left: 0.302rem;top: 25%;}
.u-logo .u-top { text-align: center;padding: 0.507rem 0;}
.u-logo .u-top img {width: 1.841rem;height: 1.841rem;    margin: 0 auto;}
.login_bg{width: 90%;margin: 0 auto 0 auto;}
.login_bg  .input-control {color: #ccc; font-size: .362rem; padding:.335rem .2rem .335rem 0; border-radius: 0; width: 100%;box-sizing: border-box; border: 0; background-color: transparent; border-bottom: 1px solid #E7E7E7; padding-left: 5%;}
::-webkit-input-placeholder{ color: #666;}    
:-moz-placeholder{ color: #666;}                
::-moz-placeholder{ color: #666;}                
:-ms-input-placeholder{ color: #666;}
.login_btn { width: 6.443rem; height:0.821rem; line-height: 0.821rem;background: #ECC346; color: #fff; font-size: 0.314rem; text-align: center; border-radius: 0.8rem; margin: .8rem auto 0;font-family: "微软雅黑";}        
.login_bg .pullright { float: right; color:#cccccc;font-size: 0.302rem; padding-top: 3%;}
.u-register {clear: both; padding: 10% 0 5% 0;}
.u-register a { color: #ecc346;font-size: 0.302rem;}
.yd-notify{background-color: rgba(40,40,40,.8);position: fixed;top:40%;left:0;right:0;line-height: .28rem;font-size: .26rem;color: #fff;padding: .3rem .24rem;opacity: 0;-webkit-animation: notify-downin .2s linear forwards;animation: notify-downin .2s linear forwards;word-break: break-all;text-align: center;z-index: 2000;width:255px;border-radius:5px;margin:0 auto;}
.u-txt {background: #fff;margin-top: 0.193rem;color: #333333;font-size: 0.241rem;padding: 0.193rem;text-align: left;color:#999;font-size: 0.217rem;background: none;}
.u-txt .link{color:#c71a19;text-decoration: none;}
.u-txt .link:hover{text-decoration: none;}
.u-txt .link:not(.md-button):not(.md-bottom-bar-item):hover {
    text-decoration: none;
}
.u-txt #check{display: inline-block;width:0.257rem;height:0.257rem;background-repeat:none;cursor: pointer;vertical-align:bottom;margin-right:10px;background-size:100%;}
.u-txt .checked{background-image:url(../assets/img/checked.png);}
.u-txt .unchecked{background-image:url(../assets/img/uncheck.png);}
.yd-input{ display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;position: relative;overflow: hidden;}
.yd-input input{color: #333;font-size: .362rem;padding: .335rem .2rem .335rem 0;border-radius: 0;width: 100%;-webkit-box-sizing: border-box;box-sizing: border-box;border: 0;background-color: transparent;border-bottom: 1px solid #E7E7E7;padding-left: 5%;}

</style>