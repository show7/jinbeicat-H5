<template>
	<div class="bank-set">
		<div class="content">
			<header class="u-header"> <a class="back" @click="go"><img src="../../../assets/img/left.png"></a>实名绑卡</header>
			<div class="txt">为了保证您的资金安全您需要在首次投资前进行实名认证！</div>
			<div class="input">
				<label>持卡人</label>
				<input type="text" placeholder="填写持卡人姓名" ref="name" @blur="checkname" class="name" v-model="name">
			</div>
			<div class="input">
				<label>身份证号</label>
				<input type="text" placeholder="输入身份证号" @blur="checkId" ref="idcard" class="idcard" v-model="idcard">
			</div>
			<div class="input">
				<label>选择银行</label>
				<select id="form-control" name="bankcode" v-model="bank" ref="bank"  class="bankcode">
					<option style="color: #ccc;">请选择</option>
	            	<option  v-for="option in bankArr" :value="option" ref="banks">{{ option.bankName }}</option>
	          	</select>
			</div>
			<div class="input">
				<label>银行卡号</label>
				<input type="text" placeholder="输入银行卡号" @blur="checkcard" ref="card" class="card" v-model="card">
			</div>
			<div class="input">
				<label>预留手机号</label>
				<input type="text" placeholder="输入预留手机号" @blur="checkphone" ref='mobile' class="mobile" v-model="mobile">
			</div>
	      	<div class="input message-code">
		 		<span>短信验证码</span>
		 		<input type="text" maxlength="6" placeholder="请输入验证码" ref="code1" class="code1">
		 		<input type="button" class="code-btn" ref="code" @click="getcode" value="点击获取" style="padding: 0;">
		 	</div>
		 	 <div class="u-txt">
		 	 		<a href="#" @click="geturl">点击立即认证代表您已阅读并同意<router-link to="/agreementpay" class="link">《认证支付协议》</router-link></a>
			    	<!--<a href="javascript:;" id="check" :class="{'checked':isA,'unchecked':!isA}" @click="toggle"></a>注册即表示您已同意
			    	<router-link to="/Agreement" class="link">《金贝猫金融注册协议》</router-link>-->
			    </div>
			<div class="input submit-input">
				<button type="submit" class="btn btn-submit btn-avail" @click="cardsubmit">立即认证</button>
				<p class="u-font-text" @click="wait">稍后认证</p>
			</div>
		</div>
		<fail-modal></fail-modal>
		<success-modal></success-modal>
	</div>
</template>
<style>
.yd-notify{background-color: rgba(40,40,40,.8);position: fixed;top:40%;left:0;right:0;line-height: .28rem;font-size: .26rem;color: #fff;padding: .3rem .24rem;opacity: 0;-webkit-animation: notify-downin .2s linear forwards;animation: notify-downin .2s linear forwards;word-break: break-all;text-align: center;z-index: 2000;width:255px;border-radius:5px;margin:0 auto;
}
</style>
<script>
	import failModal from './failModal'
	import successModal from './successModal'
	export default {
		components: {  
           failModal,
           successModal
        },
		data(){
			return{
				cardinfo:[],
				bank:'请选择',
//				isA:true,
				bankArr:[],
				name:'',
				idcard:'',
				card:'',
				mobile:''


				
			}
		},
		mounted(){
			var obj=JSON.parse(localStorage.getItem("obj"));
			if(obj){
				// console.log(obj);
				this.name=obj.name;
				this.idcard=obj.idcard;
				this.card=obj.card;
				this.mobile=obj.mobile;
				this.code1=obj.code1;


			}
			
//			if(this.$route.query.index==0){
//				$('.name').val(window.localStorage.name);
//				$('.idcard').val(window.localStorage.idcard) ;
//				$('.bankcode').val(window.localStorage.bank) ;
//				$('.card').val(window.localStorage.card);
//				$('.card1').val(window.localStorage.card1);
//				$('.mobile').val(window.localStorage.mobile);
//			}
			var token = sessionStorage.getItem('userAccessToken');
			var bank = this.queryAjax('qapi/bank/payBank.do','post',{},token);
			// console.log(bank);
			if(bank.head.code=='0000'){
				for(var i=0;i<bank.body.length;i++){
					this.bankArr.push(bank.body[i]);
					// console.log(this.bankArr)
					this.bankArr[i].bankName=bank.body[i].bankName;
					this.bankArr[i].bankCode=bank.body[i].bankCode;
				}
			}else{
				this.$dialog.notify({
	            mes:bank.head.memo,
	            timeout: 3000})
												
			}
		},
		methods: {
			
			go(){
				var obj=JSON.parse(localStorage.getItem("obj"));
				if(obj){
					localStorage.removeItem("obj");
					// console.log("obj已经清除");
				}
				
//				history.back(-1);
				this.$router.go(-1)
//				if(this.$route.query.index==0){
////					 this.$router.push({ path: '/Account/Bank/SetBank'}) 
//					history.back(-2);
//				}
			},
			geturl(){
				var name =$('.name').val();
				var idcard =$('.idcard').val();
				var bank =$('.bankcode').val();
				var card =$('.card').val();
				var card1 =$('.card1').val();
				var mobile =$('.mobile').val();	
				var obj = { name:name, idcard:idcard,card:card,card1:card1,mobile:mobile}; 
			    var str = JSON.stringify(obj); 
			    //存入 
			    localStorage.obj = str; 
			    //读取 
			    str = localStorage.obj; 
			    //重新转换为对象 
			    obj = JSON.parse(str);
			    this.name=obj.name;
			    // console.log(obj.name);
			    // console.log(bank);
			},
			checkname(){
				var name=this.$refs.name.value
				if(name){

				}else{
					this.$dialog.notify({
		        	mes:'持卡人姓名不能为空',
		        	timeout: 3000,});
				}
			},
			//判断银行卡号
			checkcard(){
				var card=this.$refs.card.value
				if(card){

				}else{
					this.$dialog.notify({
		        	mes:'银行卡号不能为空',
		        	timeout: 3000,});
				}
			},
//			toggle(){
//  			this.isA=!this.isA
//  		},
			//判断身份证号
			checkId(){
				// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
				var idcard=this.$refs.idcard.value
			  	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
			   	if(reg.test(idcard) === false) {  
			   		this.$dialog.notify({
		        	mes:'身份证输入不合法',
		        	timeout: 3000,});
			   	}  
			},
			getcode(e){
            	//这里的手机号已经存在没有调出
		    	var txt=e.target.innerText
		    	var mobile=this.$refs.mobile.value
		    	var preg = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
		    	var password1=" ";
		    	//手机号的简单匹配-----》手机号是否存在？？？----》
		    	if(mobile&&mobile.match(preg)){
				    var token = sessionStorage.getItem('userAccessToken')
					var investCount = this.serviceAjax('/api/third/sms/sendCodeLogin.do','post',{mobile:mobile,apiType:'实名绑卡'},token)
					    //调用注册验证码接口成功之后
					    e.target.disabled =true
		            	e.target.style.background="#ccc"
				    if(investCount.head.status=="SUCCESS"){
				    	var num=60;	
				        var timer = setInterval(function () {
		            		num--;
		            		e.target.value=+num+"s"
		            		
		            		e.target.style.color="#fff"
		            		if(num<=0|| mobile==''){
			            		e.target.style.background="#ffb400"
			            		e.target.value="点击获取"
			            		//按钮设置为不可点击
			            		e.target.disabled = false
			            		clearInterval(timer)
		            		}
		        		}, 1000) 
		        		 sessionStorage.setItem("code",investCount.body.code)
//		        		  console.log(investCount.body.code)
				    }else{
				    	//获取验证码失败的显示信息
				    	this.$dialog.notify({
				        mes:investCount.head.memo,
				        timeout: 3000,})
				    }
				}else{
					this.$dialog.notify({
				    mes:'手机号格式不正确',
				    timeout: 3000,})
				}
            },
			//判断手机号
			checkphone(){
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
			wait(){
				 this.$router.push({ path: '/'}) 
			},
			//点击判断
			cardsubmit(){
//				$('.failmodal').fadeIn(500);
				var name=this.$refs.name.value
				var card=this.$refs.card.value
				var idcard=this.$refs.idcard.value
				var mobile=this.$refs.mobile.value
				var bankname=this.bank.bankName;
				var bankcode=this.bank.bankCode;
				// console.log(bankname)
				// console.log(bankcode)
				//得到短信验证码
				var code=sessionStorage.getItem("code")
				var codeinput=this.$refs.code1.value;
				if(name!=''){
					if(idcard!=''){
						if(this.bank!="请选择"){
							if(card!=''){
								if(mobile!=''){
									if(codeinput!=''){
										if(codeinput==code){
											var token = sessionStorage.getItem('userAccessToken')
											var cardinfo= this.serviceAjax('api/user/bind/bankcard.do','post',{realName:name,idCardNo:idcard,bankName:bankname,bankCode:bankcode,bankCardNo:card,bindMobile:mobile,accessToken:token,vericode:code,terminalType:'02'},token)
											//console.log(cardinfo)
											if(cardinfo.head.code=='0000'){
												var success=document.getElementsByClassName('successmodal')[0];
												success.style.display="block";
											}else{
												var memo=cardinfo.head.memo;
												var fail=document.getElementsByClassName('failmodal')[0];
												fail.style.display="block";
												$('.memo').html(memo)
												window.location.reload()
											}
										}else{
											this.$dialog.notify({
		        							mes:'短信验证码输入有误',
		        							timeout: 3000,});
										}
									}else{
										this.$dialog.notify({
		        						mes:'请输入短信验证码',
		        						timeout: 3000,});
									}
								}else{
									this.$dialog.notify({
		        					mes:'请输入预留手机号',
		        					timeout: 3000,});
								}
							}else{
								this.$dialog.notify({
		        				mes:'银行卡号不能为空',
		        				timeout: 3000,});
							}
						}else{
							this.$dialog.notify({
		        			mes:'请选择银行',
		        			timeout: 3000,});
						}
					}else{
						this.$dialog.notify({
		        		mes:'身份证号不能为空',
		        		timeout: 3000,});
					}
				}else{
					this.$dialog.notify({
		        	mes:'持卡人姓名不能为空',
		        	timeout: 3000,});
				}
			}
		}
	}
</script>
<style scoped>
	.u-header {color: #fff; font-size: 0.380rem; line-height: 0.863rem;background: #e71a19;text-align: center; height: 0.863rem; position: relative;}
	.u-header a { width: 0.253rem; height: 0.4227rem; float: left; position: absolute;left: 0.302rem;top: 25%;}
	.txt{text-align: center;color: #999999;font-size: 0.217rem;padding:0.090rem 0;}
	.bank-set .input{background: #fff;padding: 0 .4rem;position: relative;border-top: 1px solid #ECECEC;border-bottom: 1px solid #ECECEC;clear: both;}
	.bank-set .input.submit-input{background:none;border:0;}
	.bank-set .input.message-code input{width: 55%;margin-left: 0.3rem;font-size: .314rem;line-height: normal;padding: .4rem 0;border: 0;background: none;color: #333;box-sizing: border-box;}
	.bank-set .input.message-code span{color: #333;font-size: 0.314rem;}
	.bank-set .input.message-code .code-btn{font-size: .253rem;position: absolute;right: .3rem;width: 1.9837rem;bottom: 0;top: 0;height: .462rem;line-height: .462rem;margin: auto;background: none;color: #ecc346;border: 1px solid #ecc346;border-radius: 0.8rem;-webkit-border-radius: 0.8rem;-moz-border-radius: 0.8rem;text-align: center;}
	.bank-set .input .u-font-text {color: #ecc346;font-size: 0.217rem;margin-bottom: 0.3rem;padding-top: 2%; text-align: center;}
	.bank-set .input label {width: 1.8rem;position: absolute;display: block;top: 0;left: .4rem;line-height: 1.2rem;color: #333;font-size: 0.314rem;}
	.bank-set .input select {margin-left: 2rem;width: 60%;line-height:1.2rem;height:1.2rem;-webkit-appearance: none;appearance: none;border: none; font-size: .314rem;display: block;-webkit-box-sizing: border-box;box-sizing: border-box;background-color: #FFFFFF;color: #333;border-radius: 4px;}
	.bank-set .input  input {margin-left: 1.8rem;width: 60%;font-size: .314rem;line-height:1.2rem;border: 0;background: none;color: #333;box-sizing: border-box;}
	.bank-set .input .btn-avail {display: block;background: #ecc346;color: #fff;text-align: center;width: 6.443rem;height: 0.821rem;margin: 1rem auto 0 auto;font-size: 0.314rem;border: 1px solid #ecc346; border-radius: 0.8rem;-webkit-border-radius: 0.8rem;-moz-border-radius: 0.8rem;}
	.u-txt{padding-left: 0.4rem;padding-top:0.3019rem;}
	.u-txt .link{color:#ecc346;text-decoration: none;}
	.u-txt .link:hover{text-decoration: none;}
	.u-txt .link:not(.md-button):not(.md-bottom-bar-item):hover {
	    text-decoration: none;
	}
	::-webkit-input-placeholder { /* WebKit browsers */ 
    color: #999; 
    } 
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
    color: #999; 
    } 
    ::-moz-placeholder { /* Mozilla Firefox 19+ */ 
    color: #999; 
    } 
    :-ms-input-placeholder { /* Internet Explorer 10+ */ 
   	color: #999; 
    } 

	/*.u-txt #check{display: inline-block;width:0.257rem;height:0.257rem;background-repeat:none;cursor: pointer;vertical-align:middle;margin-right:10px;background-size:100%;}
	.u-txt .checked{background-image:url(../../../assets/img/checked.png);}
	.u-txt .unchecked{background-image:url(../../../assets/img/uncheck.png);}*/
</style>