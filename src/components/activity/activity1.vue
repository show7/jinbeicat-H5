<template>
	<div class="activity1">
		<div class="bg1"> 
			<div class="area1" id="area1"></div>
		</div>
		<div class="bg2"> 
			<div class="area2">
				<div class="u-content1">
				 	<div class="control"> 
				 	 	<!-- <input class="input-control" type="tel" id="input_tel" name="username" value="" placeholder="请输入您的手机号码"> -->
				 	 	<input type="text" class="input-control" v-model.lazy="input4" regex="mobile" placeholder="请输入您的手机号码" ref="tel" @blur="checkname" :class="{'namesuccess':isname}" slot="right"> 
				 	</div> 
				 	<div style="    border-bottom: 1px solid #f8cc6e;overflow: hidden;" > 
				 	   <input type="text" slot="right" placeholder="请输入图形验证码" ref="codemsg1" :class="{'codesuccess':iscode}" class="u-input">
				       <span slot="right" ref="codemsg" @click="changeimg" class="iMgt"><img :src='Const+"/qapi/validataCode/checkCode?channel=H5"' alt="" id="imgsrc" ></span>
				 	</div>
				 	<div style="clear: both;"></div>
				 	<div class="control"> 
				 		  <yd-cell-group>
					        <yd-cell-item class="u-bgcacl">
					            <input type="text" class="input-control verify" slot="right" ref="codenum" placeholder="请输入短信验证码" :class="{'codesuccess':iscode}">
					            <!-- ↓↓关键代码是这里↓↓ -->
					            <yd-sendcode id="#J_GetCode"  class="yzbtn btn-default" ref="codemsg" slot="right" v-model="start1" @click.native="sendCode1" type="warning"></yd-sendcode>
					            <!-- ↑↑关键代码是这里↑↑ -->
					        </yd-cell-item>
			    		</yd-cell-group>
				 	 	<!-- <input class="input-control verify" type="text" id="input_yz" name="input_yz" placeholder="短信验证码">  -->
				 	 	<!-- <button type="button" class="yzbtn btn-default" id="yzphone">发送验证码</button>  -->
				 	</div> 
				 	<div class="control"> 
				 	 	<!-- <input class="input-control" type="password" id="input_password" name="password" placeholder="请输入密码">  -->
				 	 	<input slot="right" class="input-control" v-model="input2" placeholder="设置登录密码" type="password" ref="passow" @blur="checkpassword" :class="{'passwordsuccess':ispassword}">
				 	</div> 
				 	<input type="hidden" id="input_referee" name="referee" value="" ref="uid">
				 	<div class="u-imgtext"> 
				 		<!-- <a id="check" class="" name="terms" href="javascript:;"> -->
				 		<!-- </a>注册即表示您已同意<a class="protocola" target="_blank" href="/affirm.html">《金贝猫金融注册协议》</a> -->
				 		<a href="javascript:;" id="check" :class="{'checked':isA,'unchecked':!isA}" @click="toggle"></a>注册即表示您已同意<a href="javascript:;" class="link">《金贝猫金融注册协议》</a>
				 	</div>
				 	<!--   tt-data-click   tt-data-convertid="68345430759"  tt-data-event-type="from" -->
				 	<button class="login_btn u-but" @click="u_register" >注册领取<span>1888</span>元红包</button>
            		<input type="hidden" ref="code2" value="注册">
				</div>
			</div>
		</div>
		<div class="bg4">
			<div class="area4"> 
				<ul>
					<li> 
						<div class="u-left"><span>￥</span>38</div>
						<div class="u-right"> <p><span>6000</span>元起投 <span>30</span>天有效期</p> </div> 
					</li>
					<li>
						<div class="u-left">
							<span>￥</span>68
						</div> 
						<div class="u-right">
							<p>
								<span>12000</span>元起投 <span>30</span>天有效期
							</p> 
						</div>
					</li>
					<li> 
						<div class="u-left"><span>￥</span>108</div>
						<div class="u-right">
							<p><span>16000</span>元起投 <span>30</span>天有效期</p>
						</div>
					</li>
					<li>
						<div class="u-left"><span>￥</span>268</div>
						<div class="u-right"> <p><span>26800</span>元起投 <span>60</span>天有效期</p></div>
					</li>
					<li>
					 	<div class="u-left"><span>￥</span>518</div>
					 	<div class="u-right"> <p><span>51800</span>元起投 <span>60</span>天有效期</p></div>
					</li>
					<li>
						<div class="u-left"><span>￥</span>888</div>
						<div class="u-right"> <p><span>88800</span>元起投 <span>60</span>天有效期</p></div> 
					</li>
				</ul>
				<a href="#area1" class="u-but">注册领取<span>1888</span>元红包</a>
			</div>
		</div>
		<div class="bg5">
			<div class="area5">
				<h4>合规大事件</h4>
				<p><span>签订银行存管：</span>携手陕坝农商行，走出监管道路上夯实的一步</p>
				<p><span>加入上海金融信息协会：</span>在合规的道路上又竖起了一面荣誉大旗</p>
			</div>
		</div>
		<div class="bg6">
			<div class="area6">
				<h4>平台优势</h4>
				<p class="fw20">金贝猫由国资控股</p>
				<p>新型财富管理平台</p>
				<div class="u-min">
					<p>更安全的网上投资</p>
					<p>多道审核，多重权益保障措施。</p>
				</div>
				<div class="u-min1"> 
					<p>高收益，低门槛</p>
					<p><span>30</span>倍银行存款利息</p>
					 <p><span>100</span>元起步</p> 
					 <p><span>0</span>手续费</p> 
				</div>
			</div>
			<i></i>
		</div>
		<div class="bg8">
			<div class="area8">
				<a href="#area1" class="u-but">注册领取<span>1888</span>元红包</a>
				<p>上海如庆金融信息服务有限公司</p> 
				<p>TEL：<span>400-021-7688 </span> <i class="fwl20">服务时间：工作日 <span>9：30 — 18：00</span></i></p> 
				<!--<dl> <dd>QQ官方群号</dd> <dt><img src="/themes/arrangement_mobile/Public/images/activity/activity9/qq.png"></dt> </dl>
				 <dl> <dd>微信订阅号</dd> <dt><img src="/themes/arrangement_mobile/Public/images/activity/activity9/wexi.png"></dt> </dl> 
				 <dl> dd>官方微博</dd> <dt><img src="/themes/arrangement_mobile/Public/images/activity/activity9/wexin1.png"></dt> </dl>--> 
				<p class="foot">理财有风险  投资需谨慎！</p>
			</div>
		</div>
		<div class="wechat" ref="wechat" v-show="wechat"><img src="/static/img/activity/downapp1.png"></div>
		<div class="popUp" v-show="isPopUp">
			<div class="prompt">
				<p class="title">注册成功</p>
				<p>恭喜您，获得价值1888元的新人大礼包</p>
				<a @click = "investment" ref="investment">立即投资</a><a href="" ref="down">立即下载</a>
			</div>
		</div>
	</div>
</template>
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
	             isPopUp:false,
	             wechat:false
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
	    	investment(){
	    		// console.log("1212121");
	    		this.$router.push({path:'/prolist'});
	    	},
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
	     var mobile=this.$refs.tel.value;
		 $("#imgsrc").attr("src",this.Const+'/qapi/validataCode/checkCode?channel=H5'+'&mobile='+mobile);

		 /*timestamp='+timestamp+'&*/

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
			    	var investCount = this.serviceAjax('/api/member/regist.do','post',{mobile:mobile,password:passworda,referrer:referee,smsCode:code1},token)
			    	//console.log(investCount)
			    	if(investCount.head.status=='FAILD'){
			    		this.$dialog.notify({
	            		mes:investCount.head.memo,
	            		timeout: 4000,});
			    	}else{
		            	_taq.push({convert_id:"68345430759", event_type:"from"});
		            	// 成功弹框提示
		            	this.isPopUp=true;
			    		var u = navigator.userAgent, app = navigator.appVersion;
						var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
						var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
						if (isIOS) {
							// window.location.href = 'iosDownload.html';
							// console.log("ios");
							// console.log(this.$refs.down.href);
							this.$refs.down.href="https://itunes.apple.com/cn/app/%E9%87%91%E8%B4%9D%E7%8C%AB/id1289135747?mt=8";
						}else{
							// console.log(this.$refs.down.href);
							
							this.$refs.down.href="http://www.jinbeicat.com/download/android/jinbeicat.apk";
			    		}	
			    	}
			    }else{
			    	this.$dialog.notify({
	            	mes:'注册信息有误',
	            	timeout: 4000,})
			    }
			
			},
		    sendCode1(e) {
		    	//alert("111");
		    	//这里的手机号已经存在没有调出
		    	var num=60	
		    	var txt=e.target.innerText
		    	var mobile=this.$refs.tel.value
		    	var preg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
		    	var password1=" ";
		    	var recode=this.$refs.codemsg1.value
		    	if(mobile&&mobile.match(preg)){
		    		if(recode!=''){
			        var token = sessionStorage.getItem('userAccessToken')
				    var investCount = this.queryAjax3('qapi/validataCode/sendMsg','post',{mobile:mobile,apiType:'用户注册',recode:recode,channel:'H5'},token)
				   // console.log(investCount)
				    //调用注册验证码接口成功之后
				    if(investCount.head.status=="SUCCESS"){
				    	e.target.disabled = 'disabled'
		            	e.target.style.background="#ccc"
					    this.$dialog.loading.open('发送中...');
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
		            		
		            		if(num<=0|| mobile==''){
			            		e.target.style.background="#ffb400"
			            		e.target.innerText="获取短信验证码"
			            		//按钮设置为不可点击
			            		e.target.disabled = ''
			            		clearInterval(timer)
		            		}
		        		}, 1000)
				        //判断验证码与输入的验证时候一致
				         sessionStorage.setItem('code',investCount.body.code)
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
.u-input{float:left ;font-size: 0.334rem;height:1.135rem;border: none;background: none;width: 65%;padding-left: 3%; line-height: 1.135rem; color: #555;font-family: "\5FAE\8F6F\96C5\9ED1";}
.iMgt{ width:30% ; float: right;    margin-top: 3%;}
.control .yd-cell-box .yd-cell{ background: #fffcdb;z-index: 6;}
ul:not(.md-list) > li + li {margin-top: 3%; }
.bg2 .area2 .yd-cell-box .yd-cell{background:#fffcdb; z-index: 6; }
.yd-cell-box {margin-bottom:0; }
.yd-cell-item{padding-left:0;}
.u-bgcacl{background-color:#fffcdb;}
.yd-cell .yd-cell-right{font-size: 0.362rem; border: none; background:none; width: 100%;padding-left: 3%;line-height: 1.135rem;padding-left: 0;background:#fffcdb;}
.bg1{background: #fffcdb url(/static/img/activity/activity9/banner.png) 50% 0 no-repeat;width:100%; margin:0 auto;  height:4.726rem; background-size: 7.5rem 4.726rem;}
.area1{ width: 90%; height:4.726rem; margin:0 auto; position:relative;} 
.bg2{background: #fffcdb ;width:100%; margin:0 auto;  height:7.458rem;}
.area2{ width: 90%; height:7.458rem; margin:0 auto; position:relative;}
.area2 .u-content1{ font-size:0.362rem ; color: #a65839; text-align: center; }
.area2 .u-content1 span{ color: #f44437;}
.u-content1 .input-control{ font-size: 0.362rem; border: none; background:none; width: 100%;padding-left: 3%;line-height: 1.135rem; }
.area2 .yzbtn{ color: #e94a25; width: 2.028rem; height:0.44rem ;line-height: 0.44rem; background: none;font-size: 0.214rem; }
.control2{ font-size:0.217rem ; color: #a65839;padding-top: 5%;}
.control2 a{ color: #f44437;}
/*#check {width: 0.217rem; height:  0.217rem; background: url(/static/img/activity/activity9/flow-sprit.png) no-repeat 0 0; background-size:  0.217rem;display: inline-block; cursor: pointer;  vertical-align: middle; margin-right: 2%;}*/
#check.che { background: url(/static/img/activity/activity9/flow-sprit1.png) no-repeat 0 0;    background-size: 0.217rem; }
.control2 .u-but{margin: 51% auto 3%}
.control2{color: #c03734; font-size: 0.241rem; text-align: center;}
.u-content1  .verify{width: 65%; }
.area2 .control{ width: 100%;border-bottom: 1px solid #f8cc6e;line-height: 1.135rem; background: #fffcdb;z-index: 10;}
.area2  .u-content1{ color: #f18c42; font-size:0.217rem ;}
.area2  .u-content1 a{ color: #e94a25;}
.area2 .u-content1 .u-but{display: block; width: 6.437rem; margin: 10% auto; height: 0.821rem; line-height: 0.821rem;background: #e94a25; border-radius: 0.8rem;  color: #fff; font-size:0.314rem ;border: none}
.area2 .u-content1 .u-but span{ font-weight: bold; color: #fff;font-size:0.324rem  ;}
.area2 .u-imgtext{  padding-top: 5%;  text-align: left;}
.bg3{background: #fffcdb ;width:100%; margin:0 auto;  height:2.458rem;}
.area3{ width: 90%; height:2.458rem; margin:0 auto; position:relative; text-align: center;} 
.area3 p{ font-size:0.362rem ; color: #e94a25;padding-top: 3%;}
.area3 img{ width:0.937rem ; height:0.967rem ;}
.bg4{background: #fffcdb ;width:100%; margin:0 auto;  height:8.458rem;}
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
.bg5{width:100%; margin:0 auto;  height:2.42rem;  background: #fffcdb;}
.area5{ width: 90%; height:2.42rem; margin:0 auto; position:relative; text-align: center;}
.area5 h4{ color: #e94a25; font-size: 0.362rem; text-align: center; background: url(/static/img/activity/activity9/border.png) 50% 50% no-repeat; background-size:5.561rem  0.028rem; width: 5.561rem; margin: 0 auto;    margin-bottom: 7%;}
.area5 p{ color: #7c4b3c;  font-size: 0.241rem;line-height: 0.44rem; text-align: left;}
.area5 p span{color: #e94a25; }
.area5 .fw20{ padding-top: 10%;}
.bg6{width:100%; margin:0 auto;  height:5.75rem;position:relative;background: #fffcdb;}
.bg6 i{background: url(/static/img/activity/activity9/bg1.png) no-repeat; background-size: 7.5rem 3.55rem; position: absolute; top: 14%;display: block; height: 5.75rem;width: 100%;}
.area6{ width: 100%; height: 5.75rem; margin:0 auto; position:relative; text-align: center;}
.area6 h3{font-size: 0.362rem; color: #e94a25; text-align: center; padding-top: 7%; line-height: 1.6rem;}
.area6 p{font-size: 0.2778rem; color: #7c4b3c; line-height: 0.44rem; text-align: center;}
.area6 h4{ color: #e94a25; font-size: 0.362rem; text-align: center; background: url(/static/img/activity/activity9/border.png) 50% 50% no-repeat; background-size:5.561rem  0.028rem; width: 5.561rem; margin: 0 auto;    margin-bottom: 7%;}
.area6 .u-min{ height: 1.016rem; background: #fff0c6; padding: 3% 0;margin: 5% 0;}
.area6 .u-min1 p span{ font-weight: bold;}
.bg7{background: #ffedb9 ;width:100%; margin:0 auto;  height:4.42rem;}
.area7{ width: 90%; height:4.42rem; margin:0 auto; position:relative; }
.area7 h4{ color: #e94a25; font-size: 0.362rem; text-align: center;padding-top: 15%;}
.area7 p{ color: #e94a25; font-size: 0.2777rem;line-height: 0.44rem; text-align: left;padding-left: 30%;}
.area7 .fw20{ padding-top: 10%;}
.bg8{background: #fffcdb;width:100%; margin:0 auto;  height:4.62rem;}
.area8{ width: 90%; height:4.62rem; margin:0 auto; position:relative; text-align: center; padding-top: 10%; }
.area8 .u-but{display: block; width: 6.437rem; margin: 0 auto; height: 0.821rem; line-height: 0.821rem;background: #e94a25; border-radius: 0.8rem;  color: #fff; font-size:0.314rem ;}
.area8 .u-but span{ font-weight: bold; color: #fff;font-size:0.324rem  ;}
.area8 p{ color: #966a52; font-size:0.241rem ; text-align: left;line-height: 0.44rem; padding-top: 5%;}
.area8 p span{ color: #e94a25; font-weight: bold;}
.area8 .fwl20{padding-left: 3%;}
.area8 dl dt img{ width: 0.905rem;height: 0.905rem;}
.area8 dl dd{ color: #966a52;font-size:0.241rem ;line-height: 0.44rem;}
.area8 dl{width: 33.3%; float: left;margin-top: 6%;}
.area8 .foot{color: #cc9d77; font-size:0.241rem ; text-align: center;line-height: 0.44rem;padding-top: 5%; clear: both;}
.u-imgtext #check{display: inline-block;width:0.257rem;height:0.257rem;background-repeat:no-repeat;cursor: pointer;vertical-align:bottom;margin-right:10px;background-size:100%;}
.u-imgtext .checked{background-image:url(/static/img/activity/activity9/flow-sprit.png);}
.u-imgtext .unchecked{background-image:url(/static/img/activity/activity9/flow-sprit1.png);}
/*弹框*/
.popUp{
	position: absolute;
	top: 0;
	width: 100%;
	height: 300%;
	background: rgba(225,225,225,0.7); 
	z-index: 100;
	color: white;
}
.popUp .prompt{
	position: fixed;
	left: 0;
	right: 0;
	top:33%;
	text-align: center;
	background: #e94a25;
	padding: 0.2rem;
	border-radius: 0.1rem;
	width: 70%;
	margin: auto;
}
.popUp .prompt .title{
	text-align: center;
	font-size: 0.3rem;
}
.popUp .prompt p{font-size: 0.25rem;}
.popUp .prompt a{
	display: inline-block;
	width: 1.5rem;
	height: 0.7rem;
	background: white;
	margin: 0.2rem 0.3rem;
	padding: 0.015rem;
	border-radius: 0.2rem;
	line-height: 0.7rem;
	color: rgb(0,0,0);
}
.wechat{
	position:fixed;
	top: 0;
	z-index: 100;
}
</style>