<template>
	<div class="share">
		<div class="bg1">
			<div class="area1" v-show="state1">
				<h3>您的好友邀请您一起理财~</h3>
				<div class="u-content">
					<p> 国资平台 </p>
					<p>活期年化<span> 8.88%</span></p>
					<p class="fw20px">新手红包</p>
					<p><span class="f-size">1888</span> 元</p>
					<input class="input-control" type="tel" id="input_username" name="username" value="" placeholder="请输入您的手机号码" ref='mobile'>
				</div>
				<button type="button" class="u-but1" @click="next">立即领取</button>
				<p>未注册的手机号将自动创建金贝猫理财账户</p>
			</div>
			<div class="area2" v-show="state2">
				<div class="u-content1">
					<p>您的手机号：<span>{{mobile}}</span> </p>
					<div class="control" style="overflow: hidden;">
				 	   <input type="text" slot="right" placeholder="请输入图形验证码" ref="codemsg1"  class="u-input">
				       <span slot="right" ref="codemsg" @click="changeimg" class="iMgt"><img :src='Const+"/qapi/validataCode/checkCode?channel=H5"' alt="" id="imgsrc" ></span>
				 	</div>
				 	<div style="clear: both;"></div>
					<div class="control">
						<input class="input-control verify" type="text" id="input_yz" name="input_yz" placeholder="短信验证码" ref="code"> 
					    <button type="button" class="yzbtn btn-default" id="yzphone" @click="sendCode1">发送验证码</button> 
					</div>
					<div class="control">
							<input class="input-control2" type="password" id="input_password" name="password" placeholder="请输入密码" ref="passow">
						</div>
					<input  type="hidden" id="input_referee"class="input-control2"  name="referee"  value="" ref="referee">
					<div class="control2">
						<!-- <a id="check" class="che" name="terms" href="javascript:;"> </a>注册即表示您已同意
						<a class="protocol" target="_blank" href="{:leuu('user/register/affirm')}">《金贝猫金融注册协议》</a> -->
						<a href="javascript:;" id="check" :class="{'checked':isA,'unchecked':!isA}" @click="toggle" class="che"></a>注册即表示您已同意<a href="javascript:;" class="protocol">《金贝猫金融注册协议》</a>
						<button type="button" class="u-but2" @click='success'>立即领取</button>
			    		<p>未注册的手机号将自动创建金贝猫理财账户</p>
			    	</div>
				</div>		
			</div>
		</div>
	</div>
</template>
<script>
	export default{    
    data(){
        return{
            isA:true,
            state1:true,
            state2:false,
            mobile:''
            
        }
    },
    mounted:function(){
	    	var reg = new RegExp("(^|&)referee=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null){
				this.$refs.referee.value = unescape(r[2]);
			}
	    	
	    },
    methods:{
    	toggle(){
    		this.isA=!this.isA
    	},
    	next(){
    		// this.state1=false;
    		// this.state2=true;
    		var mobile=this.$refs.mobile.value;
    		var preg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
    		if(mobile){
    			if (mobile.match(preg)) {
    				this.state1=false;
    				 this.state2=true;
    				 this.mobile=mobile;
                }else{
                   this.$dialog.notify({
            		mes:'手机号格式是不正确的',
            		timeout: 3000,});
                }
    		}else{
    			this.$dialog.notify({
				mes:"请输入您的手机号",
				 timeout: 4000,})
			
    		}
    	},
    	    	//图形验证码
	    	changeimg(){
		     var token = sessionStorage.getItem('userAccessToken')
		     var timestamp = (new Date()).valueOf();
		    var mobile=this.$refs.mobile.value
			$("#imgsrc").attr("src",this.Const+'qapi/validataCode/checkCode?timestamp='+timestamp+'&channel=H5'+'&mobile='+mobile)
	    	},
    	success(){
    		var passwd=this.$refs.passow.value
    		var passworda="###"+md5(md5("8txuGjgpHti6TANE6D" +passwd))
    		var code = this.$refs.code.value;
		 	var code1=sessionStorage.getItem('code');
		 	//获取验证码
			if(code==code1){
				//验证码匹配后
				this.iscode=true
			}else{
				this.$dialog.notify({
				mes:"您输入的验证码有误，请重新输入",
				 timeout: 4000,})
			}
		 	//需要注意的手机号正确，短信验证码匹配，密码符合要求，而且同意了金贝猫的协议才可以祖册成功
		    if(passwd!=''){
		    	var referrer=this.$refs.referee.value
		    	var token = sessionStorage.getItem('userAccessToken')
		    	var investCount = this.serviceAjax('/api/member/regist.do','post',{mobile:this.mobile,password:passworda,recommend:referrer,smsCode:code1},token)
		    	if(investCount.head.status=='FAILD'){
		    		this.$dialog.notify({
            		mes:investCount.head.memo,
            		timeout: 4000,});
		    	}else{
            		this.$dialog.notify({
            		mes:'优惠券发放成功',
            		timeout: 4000,})
            		// 跳转登录页面
            		this.$router.push({ path: '/login' })
		    	}
		    }else{
		    	this.$dialog.notify({
            	mes:'密码不能为空',
            	timeout: 4000,})
		    }
    	},
    	 sendCode1(e) {	
	    	var mobile=this.$refs.mobile.value
	    	var recode=this.$refs.codemsg1.value
	    	var preg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
	    	//手机号的简单匹配-----》手机号是否存在----》
	    	if(mobile&&mobile.match(preg)){
	    		if(recode!=''){
	    			var token = sessionStorage.getItem('userAccessToken')
				    var investCount = this.queryAjax3('qapi/validataCode/sendMsg','post',{mobile:mobile,apiType:'用户注册',recode:recode,channel:'H5'},token)
				    //调用注册验证码接口成功之后
				    if(investCount.head.status=="SUCCESS"){
					    this.$dialog.loading.open('发送中...');
					    e.target.disabled = 'disabled'
		            		e.target.style.background="#ccc"
				        setTimeout(() => {
				            this.start = true;
				            this.$dialog.loading.close();
				            this.$dialog.toast({
				                mes: '已发送',
				                icon: 'success',
				                timeout: 1500
				         	});
				        }, 1000);
				        var num=60;
				        var timer = setInterval(function () {
		            		num--;
		            		e.target.innerText=+num+"s后重新发送"
		            		
		            		if(num<=0|| mobile==''){
			            		e.target.style.background="#ffb400"
			            		e.target.innerText="获取短信验证码"
			            		//按钮设置为不可点击
			            		e.target.disabled = ''
			            		clearInterval(timer)
		            		}
		        		}, 1000)
				         sessionStorage.setItem("code",investCount.body.code);
				         // console.log(investCount.body.code)
				    }else{
				    	//获取验证码失败的显示信息
				    	this.$dialog.notify({
				        mes:investCount.head.memo,
				        timeout: 4000,})
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
.u-input{float:left ;font-size: 0.334rem;height:0.835rem;border-bottom: 1px solid #f8cc6e;background: none;width: 65%;padding-left: 3%; line-height:0.835rem; color: #555;font-family: "\5FAE\8F6F\96C5\9ED1";}
.iMgt{ width:30% ; float: right;    margin-top: 3%;}
*{ margin: 0; padding: 0;}
body{color:#fff;width:7.5rem;font-size:.32rem;margin:0 auto;background:#f44437; font-family: "微软雅黑";}
img{ border: 0;max-width:100%; height:auto;border:none; interpolation-mode:bicubic;}
html{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;}
a{text-decoration:none;} 
a:hover { text-decoration:none;}
li{list-style: none;}
a:focus,input:hover,button:hover,input[type='button']:hover{ outline:none;}
input[type="button"], input[type="submit"], input[type="reset"] {-webkit-appearance:none;}
a,button,input,i{-webkit-tap-highlight-color:rgba(0,0,0,0); -moz-tap-highlight-color:rgba(0,0,0,0); -ms-tap-highlight-color:rgba(0,0,0,0);tap-highlight-color:rgba(0,0,0,0);}       
button{ border: none;}
i,cite,em,var,address,dfn {font-style:normal;}
.fl{ float: left;}
.fr{ float: right;}
.bg1{background: #efeff4 url(/static/img/activity/share/share.png) 50% 0 no-repeat;width:100%; margin:0 auto;  height:12.94rem; background-size: 7.5rem 12.94rem;}
.area1{ width: 90%; height:10.94rem; margin:0 auto; position:relative; padding-top: 30%;} 
.area1 h3{ font-size:0.277rem ; color: #ffd48a; text-align: center;}
.area1 .u-content{ padding-top: 15%; text-align: center;}
.area1 .u-content p{ color: #a65839; font-size: 0.525rem; text-align: center;line-height: 0.55rem;}
.area1 .u-content p span{ color: #f44437; font-size: 0.616rem;font-weight: bold;}
.area1 .input-control{ width: 4.44rem; height:0.954rem ; margin:5%  auto 0;font-size: 0.362rem; border: 1px solid #f2c859; color: #f2c859; border-radius: 0.1rem; padding: 0 0 0 3%;}
.area1 .fw20px{ padding-top:5% ;}
.area1 .u-content p .f-size{font-size:0.972rem ; color: #f44437; }
.u-but1,.u-but2{ width:4.468rem ; height: 0.8333rem; background: #ffd35e; color: #f44437;font-size: 0.386rem; display: block;font-family: "微软雅黑"; margin: 33% auto 3%; border-radius: 0.2rem;}
.area1 p{ color: #c03734; font-size: 0.241rem; text-align: center;margin-top:0.2rem;}
:-moz-placeholder {
    color: #f2c859; opacity:1; 
}

::-moz-placeholder { 
    color: #f2c859;opacity:1;
}

input:-ms-input-placeholder{
    color: #f2c859;opacity:1;
}
  
input::-webkit-input-placeholder{
    color: #f2c859;opacity:1;
}
.area2 .u-content1{ font-size:0.362rem ; color: #a65839; text-align: center; padding-top: 57%;}
.area2 .u-content1 span{ color: #f44437;}
.area2 .control{ width: 4.649rem; margin: 1% auto 0;}
.area2 .input-control2{ width: 4.44rem; height:0.954rem ; margin:5%  auto 0;font-size: 0.362rem; border: 1px solid #f2c859; color: #f2c859; border-radius: 0.1rem; padding: 0 0 0 3%;}
.input-control{ font-size: 0.362rem; border: none; background:none;border-bottom: 1px solid #f8cc6e;padding-bottom: 3%; width: 2.222rem;}
.area2 .yzbtn{ color: #fff8d7; width: 2.028rem; height:0.54rem ;line-height: 0.54rem; background: #f8cc6e; border-radius: 0.8rem;font-size: 0.25rem;}
.control2{ font-size:0.217rem ; color: #a65839;padding-top: 5%;}
.control2 a{ color: #f44437;}
#check {width: 0.217rem; height:  0.217rem; background: url(/static/img/activity/share/flow-sprit.png) no-repeat 0 0; background-size:  0.217rem;display: inline-block; cursor: pointer;  vertical-align: middle; margin-right: 2%;}
/*#check{width: 0.217rem; height:  0.217rem; backgroung-repeat: no-repeat ;0 0; background-size:  0.217rem;display: inline-block; cursor: pointer;  vertical-align: middle; margin-right: 2%;}*/
#check.checked{background-image:url(/static/img/activity/share/flow-sprit.png);}
#check.unchecked{background-image:url(/static/img/activity/share/flow-sprit1.png);}
.control2 .u-but1{margin: 38% auto 3%}
.control2 .u-but2{margin: 30% auto 3%}
.control2{color: #c03734; font-size: 0.241rem; text-align: center;}
</style>