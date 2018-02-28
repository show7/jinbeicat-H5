<template>
	<div class="recharge">
		<header class="u-header"><a class="back" href="javascript:history.back();"><img src="../../assets/img/left.png"></a>充值  <router-link to="/Account/Rechargebill" class="u-rigback">账单</router-link></header>
		<div class="charge_card1" v-if="state" >
			<div class="charge_card">
	              <div class="bank" :class="{gongshang:bankCode=='ICBC',guangda:bankCode=='CEB',guangfa:bankCode=='GDB',jianshe:bankCode=='CCB',jiaotong:bankCode=='BCOM',minsheng:bankCode=='CMBC',nongye:bankCode=='ABC',pingan:bankCode=='PAB',xingye:bankCode=='CIB',zhongguo:bankCode=='BOC',youzheng:bankCode=='PSBC',zhongxin:bankCode=='CITIC',zhaoshang:bankCode=='CMB',pufa:bankCode=='SPDB',huaxia:bankCode=='HXB',shanghai:bankCode=='SHB',beijing:bankCode=='BOB'}"></div>
	            <span class="f-repickuptext">（尾号{{this.bankTailNo}}）</span>       
	        </div>
	        <p class="money">账户可用余额（元）: <span class="stress">{{this.balance}}</span></p>
	        <div class="u-repform">
	            <span>充值金额</span>
		        <div class="group ">
		        <i>￥</i>
	            <input type="text" placeholder="" name="amount" class="form-control" ref="amount">
	            </div>

	        </div>
	        <!-- <p class="prompt">{{tips}}</p> -->
	         <!-- <p class="u-Copy">10元起冲,单笔最多可充值50000元</p> -->
	         
	         <div  id="show" >
	         <yd-cell-group>
		        <yd-cell-item>
		            <input type="text" slot="right" placeholder="请输入短信验证码" ref="codeas">
		            <yd-sendcode id="#J_GetCode" ref="codemsg" slot="right"  @click.native="sendCode1" type="warning" class="codemsg"></yd-sendcode>
		        </yd-cell-item>
		      </yd-cell-group>
	         </div>
	        <div style="text-align: center;">
	        	<button type="button" class="btn-avail" id="u-recharge" @click="recharge" >下一步</button>
	            <button type="button" class="btn-avail" id="u-recharge1" @click="recharge1" >确认</button>
	        </div>
	        <div class="recharge_about">
	       	 	<router-link to="/Account/Rechargeexplain">充值说明</router-link>
	       </div>   
		</div>
		<div class="charge_card2" v-else>
			<div class="info info1" v-show="state1">您未进行<router-link  to="/Account/Bank"><span class="link">实名认证</span></router-link>，无法进行充值</div>
			<div class="info info2" v-show="state2">您未绑定<router-link  to="/Account/deal/SetModdeal"><span class="link">交易密码</span></router-link>，无法进行充值</div>
		</div> 
	</div>
</template>

<script>
export default {
	data(){
        return{
	        balance:'',
	        bankCode:'',
	        bankTailNo:'',
	        mobile:'',
	        // tips:'',
	        state:sessionStorage.getItem('state')*1,
	        state1:sessionStorage.getItem('state1')*1,
	        state2:sessionStorage.getItem('state2')*1,
	        setShow:''
        }
   },
	mounted:function(){
		this.bankTailNo=sessionStorage.getItem('bankTailNo')
		this.balance=sessionStorage.getItem('balance')
        this.bankCode=sessionStorage.getItem('bankCode')
        this.mobile=sessionStorage.getItem('mobile') 
 	 //	console.log(this.mobile); 
		//判断设置样式
		var bankCode=sessionStorage.getItem('bankCode');
		// console.log(this.bg)	
		// var token = sessionStorage.getItem('userAccessToken')
		// var tips = this.serviceAjax('api/account/check/bankMaintain.do','get',{accessToken:token},token);
		// // console.log(tips)
		// var code=tips.head.status
		// if(code!= "FAILD"){
		// 	this.tips='';
		// 	$('#u-recharge').attr('disabled',false)
		// 	$('#u-recharge').css('background','#ecc346');
		// 	$('#u-recharge').css('border','0');
		// }else{
		// 	this.tips=tips.head.memo;
		// 	$('#u-recharge').attr('disabled',true)
		// 	$('#u-recharge').css('background','#ccc');
		// 	$('#u-recharge').css('border','0');
		// }
	},
	methods: {
	  	recharge() {
		  	if(this.$refs.amount.value>=100){
			  	var amount= this.$refs.amount.value*100
				var CompanyDealCode = new Date().getTime();
				//console.log(CompanyDealCode)
			    var token = sessionStorage.getItem('userAccessToken')
			   // console.log(token)
			  	var mobile = this.serviceAjax('api/account/apply/recharge/unspay.do','post',{amount:amount,companyDealCode:CompanyDealCode},token)
			  	//console.log(mobile)
			    var code = mobile.head.code
			  	//console.log(code)
			  	if(code=='0000'){
			  		$("#show").show()
			  		$("#u-recharge").hide()
			  		$("#u-recharge1").show()
			  		 this.$dialog.notify({
		              mes:mobile.head.memo,
		              timeout: 3000})
			  		 	var num=60	
			  		 	var codemsg=document.getElementsByClassName('codemsg')[0];
			  		 	// console.log(codemsg)
	    				// var txt=e.target.innerText
	    				codemsg.disabled = 'disabled'
			          	codemsg.style.background="#ccc"
			           	var timer = setInterval(function () {
			          		num--; 
			          		codemsg.innerText=+num+"s后重新发送"
			          		if(num<=0|| mobile==''){
				            		codemsg.style.background="#ffb400"
				            		codemsg.innerText="获取短信验证码"
				            		//按钮设置为不可点击
				            		codemsg.disabled = ''
				            		clearInterval(timer)
			          		}
			      		},	1000)
			  		 var payToken= mobile.body.token
			  		 var dealCode= mobile.body.orderId;
			  		localStorage.setItem("dealCode", dealCode)
			  		localStorage.setItem("payToken", payToken)
			  	}else{
			  	 this.$dialog.notify({
		              mes:mobile.head.memo,
		           timeout: 3000})
			  	}
			  }else{
			  	this.$dialog.notify({
		              mes:"充值金额必须大于等于100元",
		           timeout: 3000})
			  }
	  },
	  sendCode1(e) {
// 	    	this.mobile=sessionStorage.getItem('mobile')
// 	    	// console.log(this.mobile);
// 	    	var num=60	
// 	    	var txt=e.target.innerText
// 	    	//var mobile=this.$refs.tel.value
// 	    	var mobile=this.mobile
// 	    	//console.log(mobile)
// 	    	var token = sessionStorage.getItem('userAccessToken')
// 			var dealCode=localStorage.getItem("dealCode")
// 	    	var payToken=localStorage.getItem("payToken")
// 			var investCount = this.serviceAjax('/api/account/apply/recharge/unspay/sendvercode.do','post',{phoneNo:mobile,payToken:payToken,dealCode:dealCode,},token)
// 			// console.log(investCount) 
// 			var code = investCount.head.code
// 	          if(code =='0000'){
// 	          	e.target.disabled = 'disabled'
// 	          	e.target.style.background="#ccc"
// 	           	var timer = setInterval(function () {
// 	          		num--; 
// 	          		e.target.innerText=+num+"s后重新发送"
// 	          		if(num<=0|| mobile==''){
// 		            		e.target.style.background="#ffb400"
// 		            		e.target.innerText="获取短信验证码"
// 		            		//按钮设置为不可点击
// 		            		e.target.disabled = ''
// 		            		clearInterval(timer)
// 	          		}
// 	      		},	1000)
// //	             	console.log( investCount.body.result_code);
// 	           }else{
// 	           	 this.$dialog.notify({
// 		               mes:investCount.head.memo,
// 		               timeout: 3000}) 	
// 	          }
	    },
	    recharge1(){ 
	    	var vericode= this.$refs.codeas.value
	    	var dealCode=localStorage.getItem("dealCode")
	    	var payToken=localStorage.getItem("payToken")
	    	var token = sessionStorage.getItem('userAccessToken')
			var confirm = this.serviceAjax('api/account/apply/recharge/unspay/confirm.do','post',{payToken:payToken,vericode:vericode,dealCode:dealCode},token)
	    	// console.log(vericode)
	    	// console.log(dealCode)
	    	// console.log(payToken)
	    	// console.log(confirm)
	    	var code = confirm.body.result_code;
	    	// console.log(confirm.body.result_msg)
	        if(confirm.head.code =="0000"){	
        	 	this.$dialog.notify({mes:'充值成功',timeout: 2000}) 	
			    setTimeout("window.location.reload()",3000);
			     
	        }else{
	             this.$dialog.notify({
		         mes:confirm.head.memo,
		         timeout: 2000}) 
	       }

	    }
	}
}
</script>

<style>

#show{ display: none;}
.u-but{ text-align: center;}
#u-recharge1{ display: none; }
.btn-avail{display: block;background: #ecc346;color: #fff;text-align: center;width: 6.443rem;height: 0.821rem;margin: 1rem auto 0 auto; font-size: 0.314rem;border: 1px solid #ecc346;border-radius: 0.8rem;-webkit-border-radius: 0.8rem;-moz-border-radius: 0.8rem;}
.u-header .u-rigback {width: 20%;text-align: right;font-size: 0.2778rem;color: #fff; position: absolute;top: 5%; left: 76%;}
.f-repickuptext {color: #333333;font-size: 0.314rem;float: right; padding-right: 0.202rem;}
.bank{height: 44px;display:inline-block;width:139px;background: url(../../assets/img/bank/001.png) no-repeat 0 0;margin: 3.5% 4%;}
.bank.gongshang{background: url(../../assets/img/bank/001.png);}
.bank.guangda{background: url(../../assets/img/bank/002.png);}
.bank.guangfa{background: url(../../assets/img/bank/003.png);}
.bank.jianshe{background: url(../../assets/img/bank/004.png);}
.bank.jiaotong{background: url(../../assets/img/bank/005.png);}
.bank.minsheng{background: url(../../assets/img/bank/006.png);}
.bank.nongye{background: url(../../assets/img/bank/007.png);}
.bank.pingan{background: url(../../assets/img/bank/008.png);}
.bank.shanghai{background: url(../../assets/img/bank/009.png);}
.bank.xingye{background: url(../../assets/img/bank/010.png);}
.bank.zhongguo{background: url(../../assets/img/bank/011.png);}
.bank.youzheng{background: url(../../assets/img/bank/012.png);}
.bank.zhongxin{background: url(../../assets/img/bank/013.png);}
.bank.zhaoshang{background: url(../../assets/img/bank/014.png);}
.bank.pufa{background: url(../../assets/img/bank/015.png);}
.bank.huaxia{background: url(../../assets/img/bank/016.png);}
.bank.beijing{background: url(../../assets/img/bank/017.png);}
.charge_card {background: #fff; height: 1.316rem; line-height: 1.316rem;border-top: 1px solid #E7E7E7;border-bottom: 1px solid #E7E7E7;}
.money {font-size: 0.217rem;color: #999999;height: 0.815rem;line-height: 0.815rem;padding-left: 0.302rem;}
.u-repform { background: #fff; height: 1.941rem;border-top: 1px solid #E7E7E7;border-bottom: 1px solid #E7E7E7; padding-left: 0.302rem; padding-top: 3%;}
.u-Copy {height: 0.815rem; line-height: 0.815rem;font-size: 0.217rem; color: #999999;padding-left: 0.203rem;}
.recharge .u-repform span { padding-top: 3%; height: 0.34rem;    font-size: .43rem; text-align: left;}
.u-repform .group {border: none;padding: 0;}
.u-repform .group .form-control{color: #333;}
 .group i{font-size: .43rem;}
.tn_form .group { background: #fff; padding: 0 .4rem; position: relative;border-top: 1px solid #ECECEC; border-bottom: 1px solid #ECECEC;clear: both;font-size: .43rem;}
.tn_form input {width: 61%;font-size: .314rem;line-height: normal; padding: .4rem 0;border: 0; background: none;color: #ccc; box-sizing: border-box;}
.tn_form .btn-avail {display: block;background: #ecc346;color: #fff;text-align: center;width: 6.443rem;height: 0.821rem; margin: 1rem auto 0 auto;font-size: 0.314rem; border: 1px solid #ecc346;border-radius: 0.8rem;-webkit-border-radius: 0.8rem;-moz-border-radius: 0.8rem;}
.form-control{width: 61%; font-size: .314rem;line-height: normal;padding: .3rem 0;border: 0;background: none;color: #ccc;box-sizing: border-box;font-size: .43rem;}
.charge_card2 .info{text-align: center;font-size: 0.4rem;margin-top:0.4rem;}
.charge_card2 .info span{color:#e71a19;}
.recharge_about{padding: 3% 0.302rem;text-align: center;}
.recharge_about a{color:#ecc346;font-size: 0.314rem;}
.prompt{
	margin-top: 0.02rem;
	padding-left: 0.302rem;
	color: rgb(255,0,0);
}
</style>