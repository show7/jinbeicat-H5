<template>
	<div class="activity1">
		<div class="bg1"> 
			<div class="area1" id="area1"></div>
		</div>
		<div class="bg2"> 
			<div class="area2">
				<div class="u-content1">
				 	<div class="control"> 
				 	 	<input type="text" class="input-control" v-model.lazy="input4" regex="mobile" placeholder="请输入您的手机号码" ref="tel" @blur="checkname" :class="{'namesuccess':isname}" slot="right"> 
				 	</div> 
				 	<div style="border-bottom: 1px solid #9d55ff;overflow: hidden;" > 
				 	   <input type="text" slot="right" placeholder="请输入图形验证码" ref="codemsg1" :class="{'codesuccess':iscode}" class="u-input">
				       <span slot="right" ref="codemsg" @click="changeimg" class="iMgt"><img :src='Const+"/qapi/validataCode/checkCode?channel=H5"' alt="" id="imgsrc" ></span>
				 	</div>
				 	<div style="clear: both;"></div>
				 	<div > 
				 		  <yd-cell-group>
					        <yd-cell-item class="u-bgcacl">
					            <input type="text" class="input-control verify" slot="right" ref="codenum" placeholder="请输入短信验证码" :class="{'codesuccess':iscode}">
					            <!-- ↓↓关键代码是这里↓↓ -->
					            <yd-sendcode id="#J_GetCode"  class="yzbtn btn-default" ref="codemsg" slot="right" v-model="start1" @click.native="sendCode1" type="warning"></yd-sendcode>
					            <!-- ↑↑关键代码是这里↑↑ -->
					        </yd-cell-item>
			    		</yd-cell-group>
				 	 	
				 	</div> 
				 	<div class="control"> 
				 	 	<input slot="right" class="input-control" v-model="input2" placeholder="设置登录密码" type="password" ref="passow" @blur="checkpassword" :class="{'passwordsuccess':ispassword}">
				 	</div> 
				 	<input type="hidden" id="input_referee" name="referee" value="" ref="uid">
				 	<div class="u-imgtext"> 
				 	   <div class="u-left"><a href="javascript:;" id="check" :class="{'checked':isA,'unchecked':!isA}" @click="toggle"></a>我已阅读协议</div>	
				 	   <div class="u-right">已有账号？<router-link to="/login">请登录</router-link></div>
				 	</div>
				 	
				 	<button class="login_btn u-but" @click="u_register" >领取福利</button>
            		<input type="hidden" ref="code2" value="注册">
				</div>
			</div>
		</div>
		<div class="bg3"> 
			<div class="area3" >
			</div>
		</div>
		<div class="bg4">
			<div class="area4"> 
			</div>
		</div>
		<div class="bg5">
			<div class="area5">
				<div class="u-title"><img src="../../../static/img/activity/activity21/title.png"></div>
				<div class="u-mian">
					<div class="u-left fl"><img src="../../../static/img/activity/activity21/u-img.png"></div>
					<div class="u-right fr"><img src="../../../static/img/activity/activity21/u-img1.png"></div>
				</div>
			</div>
		</div>
		<div class="bg6">
			<div class="area6">
				<div class="u-title"><img src="../../../static/img/activity/activity21/title1.png"></div>
				<div class="u-mian">
					<dl>
						<dt><img src="../../../static/img/activity/activity21/icon.png"></dt>
						<dd class="f-size">资产清晰</dd>
						<dd>回款收益</dd>
						<dd>一键查询</dd>
					</dl>
					<dl>
						<dt><img src="../../../static/img/activity/activity21/icon1.png"></dt>
						<dd class="f-size">快捷理财</dd>
						<dd>标的了然</dd>
						<dd>操作简单</dd>
					</dl>
					<dl>
						<dt><img src="../../../static/img/activity/activity21/icon2.png"></dt>
						<dd class="f-size">安全保障</dd>
						<dd>银行存管</dd>
						<dd>三方支付</dd>
					</dl>
				</div>
			</div>
		</div>
		<div class="bg7">
			<div class="area7">
				<div class="u-title"><img src="../../../static/img/activity/activity21/title2.png"></div>
				<dl>
					<dt><img src="../../../static/img/activity/activity21/u-img2.png"></dt>
					<dd>安卓版下载</dd>
				</dl>
				<dl>
					<dt><img src="../../../static/img/activity/activity21/u-img3.png"></dt>
					<dd>IOS下载</dd>
				</dl>
			</div>
		</div>
	    <div class="bg8">
			<div class="area8">
				理财有风险，投资需谨慎
			</div>
		</div>
		<div class="tanOut">
			<div class="m-mian">
				<h4>注册成功</h4>
				<p>恭喜您，获得价值1888元的新人大礼包</p>
				<div class="mian-but">
					<a href="" class="but" @click="investment">立即投资</a>
				    <router-link to="/activity/Downapp"  class="but u-but">立即下载</router-link>
				</div>
			</div>
		</div>
	</div>

	
</template>
<style>
	.yd-notify{ background-color: rgba(40,40,40,.8);position: fixed; top:40%;left:0; right:0;line-height: .28rem; font-size: .26rem; color: #fff; padding: .3rem .24rem; opacity: 0; -webkit-animation: notify-downin .2s linear forwards;animation: notify-downin .2s linear forwards; word-break: break-all;text-align: center;z-index: 2000;width:255px;border-radius:5px;margin:0 auto;}
</style>
<script>
	export default{    
		data(){
	        return{
	             input4: '',
	             input2:'',
	             start1: false,
	             isA:true,
	             isname:false,
	             ispassword:false,
	             iscode:false,
//	             sow1:true,
//	             sow2:false,
	        }
	    },
	    mounted:function(){
	    	var reg = new RegExp("(^|&)nsukey=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null){
				this.$refs.uid.value = unescape(r[2]);
			}
	    },
	    methods:{
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
	    	toggle(){
	    		this.isA=!this.isA
	    	},
	    	//图形验证码
	    	changeimg(){
		     var token = sessionStorage.getItem('userAccessToken')
		     var timestamp = (new Date()).valueOf();
		     var mobile=this.$refs.tel.value
			 $("#imgsrc").attr("src",this.Const+'qapi/validataCode/checkCode?timestamp='+timestamp+'&channel=H5'+'&mobile='+mobile)
	    	},
	  		u_register(){
	  			//需要注意的手机号正确，短信验证码匹配，密码符合要求，而且同意了金贝猫的协议才可以注册成功
			 	var mobile=this.$refs.tel.value;
			 	var passwd=this.$refs.passow.value;
			 	var passworda="###"+md5(md5("8txuGjgpHti6TANE6D" +passwd));
			 	//var recode=this.$refs.recode.value;
			 	var code=this.$refs.codenum.value;
			 	var code1=sessionStorage.getItem('code');
			 	var referee=this.$refs.uid.value
			 	// console.log(referee);
			 	//获取验证码
			 	// console.log(code)
				if(code==code1){
					//验证码匹配后
					this.iscode=true
				}else{
					this.$dialog.notify({
					mes:"您输入的验证码有误，请重新输入",
					 timeout: 4000,})
				}
			 	//需要注意的手机号正确，短信验证码匹配，密码符合要求，而且同意了金贝猫的协议才可以祖册成功
			    if(this.isA==true&&this.isname==true&&this.ispassword==true&&this.iscode==true){
			    	var token = sessionStorage.getItem('userAccessToken')
			    	var investCount = this.serviceAjax('api/member/regist.do','post',{mobile:mobile,password:passworda,referrer:referee,smsCode:code1},token)
			    	//console.log(investCount)
			    	if(investCount.head.status=='FAILD'){
			    		this.$dialog.notify({
	            		mes:investCount.head.memo,
	            		timeout: 4000,});
			    	}else{
			    		this.$dialog.notify({
	            		mes:'优惠券发放成功',
	            		timeout: 4000,})
			    		$(".tanOut").show()
				    	_taq.push({convert_id:"73306577780", event_type:"form"})
		            	this.$router.push({ path: '/login' })
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
		    	if(mobile&&mobile.match(preg)){
			        if(recode!=''){
			        	    			//console.log(recode)
			        var token = sessionStorage.getItem('userAccessToken')
				    var investCount = this.queryAjax3('qapi/validataCode/sendMsg','post',{mobile:mobile,apiType:'用户注册',recode:recode,channel:'H5'},token)
//				    console.log(investCount)
				    //调用注册验证码接口成功之后
				    if(investCount.head.status=="SUCCESS"){
					    this.$dialog.loading.open('发送中...');
					    e.target.disabled = 'disabled'
				        setTimeout(() => {
				            this.start = true;
				            this.$dialog.loading.close();
				            this.$dialog.toast({
				                mes: '已发送',
				                icon: 'success',
				                timeout: 1500
				         	});
				        }, 1000);
				        var timer = setInterval(function () {
		            		num--;
		            		e.target.innerText=+num+"s后重新发送"
		            		
//		            		e.target.style.background="#ccc"
		            		if(num<=0|| mobile==''){
//			            		e.target.style.background="#ffb400"
			            		e.target.innerText="获取短信验证码"
			            		//按钮设置为不可点击
			            		e.target.disabled = ''
			            		clearInterval(timer)
		            		}
		        		}, 1000)
				        //判断验证码与输入的验证时候一致
				         sessionStorage.setItem('code',investCount.body.code)
				          // console.log(investCount.body.code)
//				          this.$refs.codenum.value=investCount.body.code
				    }else{
				    	//获取验证码失败的显示信息
				    	this.$dialog.notify({
				        mes:investCount.head.memo,
				        timeout: 4000,})
				     //  console.log(investCount.body.code)
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
			   
		   },
		   investment(){
		   	this.$router.push({ path: '/login' })
		   }
	    }
	}
</script>
<style scoped>
.u-input{float:left ;font-size: 0.334rem;height:1.135rem;border: none;background: none;width: 65%;padding-left: 3%; line-height: 1.135rem; color: #fff;font-family: "\5FAE\8F6F\96C5\9ED1";}
.iMgt{ width:30% ; float: right;    margin-top: 3%;}
body{background: #5b0eb1;}	
.bg2 .area2 .yd-cell-box .yd-cell{background:#6D1CC7;  }
.m-mian h4{ text-align: center; font-size: 0.34rem;}
.m-mian p{ text-align: center; padding-top: 10%; }
#app  .mian-but{ width: 90%; margin: 10% auto 0;}
#app  .mian-but .but{ width: 40%; height: 0.6rem;background: #FFC34F; border-radius: 0.8rem;   color: #6d1cc7; font-size:0.214rem ;border: none; display: inline-block; text-align: center;line-height: 0.6rem;}
#app  .mian-but .u-but{ margin-left: 18%;}
.tanOut{display:none;width:100%;height:100%; position:fixed;top:0;left:0;z-index:333; background:rgba(0,0,0,0.8) repeat}
.m-mian{ background: #fff; width: 80%; height: 3.4rem; margin: 15% auto;border-radius: 0.3rem; padding: 3%;}
.u-tile{ text-align: center;font-size: 0.34rem;}
ul:not(.md-list) > li + li {margin-top: 3%; }
.bg2 .area2 .yd-cell-box .yd-cell{background:#6D1CC7;  }
.yd-cell-right input[type=text][data-v-1758d5b2]:not(.yd-spinner-input){ border: none;}
.yd-cell-box{ border: none;}
.yd-cell-box {margin-bottom:0; }
.yd-cell-item{padding-left:0;}
.u-bgcacl{background-color:#6D1CC7;}
.yd-cell .yd-cell-right{font-size: 0.362rem; border: none; background:none; width: 100%;padding-left: 3%;line-height: 1.135rem;padding-left: 0;background:#fffcdb;}
.bg1{background: #6d1cc7 url(/static/img/activity/activity21/banner.png) 50% 0 no-repeat;width:100%; margin:0 auto;  height:4.4444rem; background-size: 7.5rem 4.4444rem;}
.area1{ width: 90%; height:4.4444rem; margin:0 auto; position:relative;} 
.bg2{background: #6d1cc7;width: 100%; margin: 0 auto;height: 7.458rem;}
.area2{ width: 90%; height:7.458rem; margin:0 auto; position:relative;}
.area2 .u-content1{ font-size:0.362rem ; color: #a65839; text-align: center; }
.yd-cell-right input[type=text]:not(.yd-spinner-input){ color: #fff;font-family: "微软雅黑"; font-size: 0.334rem;}
.area2 .u-content1 span{ color: #f44437;}
.u-content1 .input-control{ font-size: 0.334rem; border: none; background:none; width: 100%;padding-left: 3%;line-height: 1.135rem; color: #fff; font-family: "微软雅黑";}
.area2 .yzbtn{ color: #ffe240; width: 2.028rem; height:0.44rem ;line-height: 0.44rem; background: none;font-family: "微软雅黑"; font-size: 0.234rem;}
.control2{ font-size:0.217rem ; color: #a65839;padding-top: 5%;}
.control2 a{ color: #f44437;}
#check.che { background: url(/static/img/activity/activity9/flow-sprit1.png) no-repeat 0 0;    background-size: 0.217rem; }
.control2 .u-but{margin: 51% auto 3%}
.control2{color: #c03734; font-size: 0.241rem; text-align: center;}
.u-content1  .verify{width: 65%; }
.area2 .control{ width: 100%;border-bottom: 1px solid #9d55ff;line-height: 1.135rem; background: none;z-index: 10;}
.area2  .u-content1{ color: #f18c42; font-size:0.217rem ;}
.area2  .u-content1 a{ color: #e94a25;}
.area2 .u-content1 .u-but{display: block; width: 6.437rem; margin: 7% auto; height: 0.821rem; line-height: 0.821rem;background: #FFC34F; border-radius: 0.8rem; font-weight: bold;  color: #6d1cc7; font-size:0.314rem ;border: none}
.area2 .u-content1 .u-but span{ font-weight: bold; color: #fff;font-size:0.324rem  ;}
.area2 .u-imgtext{  padding-top: 5%;  text-align: left; color: #fff;overflow: hidden;}
.area2 .u-imgtext .u-left{ width: 50%;float: left;}
.area2 .u-imgtext .u-right{ width: 50%;float: right; text-align: right;}
.area2 .u-imgtext .u-right a{ color: #FFE240;display: inline-block;background: none;margin: 0;padding-top: 0;}
.bg3{background: #6d1cc7 url(/static/img/activity/activity21/bg1.png) 50% 0 no-repeat ;width:100%; margin:0 auto;  height:6.759rem; background-size: 7.088rem 6.359rem; }
.area3{ width: 90%; height:6.359rem; margin:0 auto; position:relative; text-align: center;padding-bottom: 5%;} 
.bg4{background: #6d1cc7 url(/static/img/activity/activity21/bg2.png) 50% 0 no-repeat;width:100%; margin:0 auto;  height:6.359rem;  background-size: 7.088rem 6.359rem;}
.area4{ width: 90%; height:8.458rem; margin:0 auto; position:relative; text-align: center;}
.area4 ul{ overflow: hidden;}
.area4 ul li{ background: url(/static/img/activity/activity9/bg.png) no-repeat;background-size:2.97rem 1.654rem; float: left ;width: 2.97rem; height:1.654rem; margin: 2% 2%;;}
.area4 ul li .u-left {width:2.97rem;font-size: 0.996rem; color: #fff;font-weight: 400;position: relative;  line-height:1.04rem;}
.area4 ul li .u-right {width: 2.97rem; color: #560b0f; font-size: 0.217rem; text-align: center;}
.area4 ul li .u-left span { font-size: 0.573rem;color: #fff; position: absolute; top: -17%; left: 2%;}
.area4 ul li .u-right p{ line-height: 0.64rem;}
.area4 ul li .u-right p span{ color: #e94a25; font-weight: bold;}
.area4 .u-but{display: block; width: 6.437rem; margin: 10% auto; height: 0.821rem; line-height: 0.821rem;background: #e94a25; border-radius: 0.8rem;  color: #fff; font-size:0.314rem ;}
.area4 .u-but span{ font-weight: bold; color: #fff;font-size:0.324rem  ;}
.bg5{width:100%; margin:0 auto;   background: #6d1cc7 ;height:3.931rem; }
.area5{ width: 90%; height:3.931rem; margin:0 auto; position:relative; text-align: center;}
.area5 .u-title img{ width:3.242rem ; height: 0.332rem; margin: 0 auto;}
.area5 .u-title{ padding:12% 0 6% 0;}
.area5 .u-mian img{ width:3.297rem ; height:1.932rem ; margin: 3% auto;}
.bg6{width:100%; margin:0 auto; position:relative; background: #6d1cc7 ;height:4.275rem; }
.bg6 i{background: url(/static/img/activity/activity9/bg1.png) no-repeat; background-size: 7.5rem 3.55rem; position: absolute; top: 14%;display: block; height: 5.75rem;width: 100%;}
.area6{ width: 100%; height: 5.75rem; margin:0 auto; position:relative; text-align: center;}
.area6 .u-title img{ width:3.242rem ; height: 0.332rem; margin: 0 auto;}
.area6 .u-title{ padding: 5% 0;}
.area6 .u-mian{ margin-top: 5%;overflow: hidden;}
.area6 .u-mian dt img{ width: 0.923rem; height:0.912rem ; margin: 0 auto;}
.area6 .u-mian dl{ width: 33%; float: left;}
.area6 .u-mian .f-size{font-size: 0.241rem; color: #fff; padding:3% 0;}
.area6 .u-mian dl dd{ color: #b884ff; font-size: 0.217rem;line-height: 0.34rem;}
.bg7{background: #6d1cc7 ;height:3.538rem;  width:100%; margin:0 auto;text-align: center;}
.area7{ width: 90%; height:3.538rem; margin:0 auto; position:relative; }
.area7 .u-title img{ width:3.853rem ; height: 0.332rem; margin: 0 auto;}
.area7  dl dt img{ width:1.352rem ; height:1.328rem ; margin: 0 auto;}
.area7  dl{ width: 50%; float: left;padding-top: 5%;}
.area7  dl dd{ font-size:0.217rem ; color: #b884ff; text-align: center;padding-top: 5%;}
.bg8{background: #5b0eb1;width:100%; margin:0 auto;  height:0.507rem;}
.area8{ width: 90%; height:0.507rem; margin:0 auto; position:relative; text-align: center;font-size:0.217rem ;line-height: 0.507rem; color: #9d55ff;}
.u-imgtext #check{display: inline-block;width:0.347rem;height:0.347rem;background-repeat:no-repeat;cursor: pointer;vertical-align:bottom;margin-right:10px;background-size:100%;}
.u-imgtext .checked{background-image:url(/static/img/activity/activity21/flow-sprit.png);}
.u-imgtext .unchecked{background-image:url(/static/img/activity/activity21/flow-sprit1.png);}
::-webkit-input-placeholder {  color:#fff;}
:-moz-placeholder { 　color:#fff;}
::-moz-placeholder {color:#fff;}
:-ms-input-placeholder { color:#fff;}
</style>