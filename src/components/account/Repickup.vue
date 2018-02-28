<template>
	<div class="u-repickup">
		<header class="u-header"><a class="back" href="javascript:history.back();"><img src="../../assets/img/left.png"></a>提现<router-link to="/Account/Repickupbill" class="u-rigback">账单</router-link></header>
		<div class="charge_card1" v-if="state" >
		    <div class="charge_card">
	            <div class="bank" :class="{gongshang:bankCode=='ICBC',guangda:bankCode=='CEB',guangfa:bankCode=='GDB',jianshe:bankCode=='CCB',jiaotong:bankCode=='BCOM',minsheng:bankCode=='CMBC',nongye:bankCode=='ABC',pingan:bankCode=='PAB',xingye:bankCode=='CIB',zhongguo:bankCode=='BOC',youzheng:bankCode=='PSBC',zhongxin:bankCode=='CITIC',zhaoshang:bankCode=='CMB',pufa:bankCode=='SPDB',huaxia:bankCode=='HXB',shanghai:bankCode=='SHB',beijing:bankCode=='BOB'}"></div>
	            <span class="f-repickuptext">（尾号{{this.bankTailNo}}）</span>       
	        </div>
	        <p class="money">账户可用余额（元）: <span class="stress">{{this.balance}}</span></p>
	        <div class="u-repform">
		      <span>提现金额</span>
			  <div class="group ">
			    <i>￥</i>
		        <input type="text" class="form-control" ref="amount">
		      </div>
	        </div>
	        <br>
	      <!--   <p class="u-Copy">单笔手续费2元</p>
	        <p class="u-Copy1"><i>平台每日15:00前申请的提现T+1到账，每日15:00之后的申请提现T+2到账。遇节假日顺延。</i></p> -->
	       <div class="group fwl20">
	                <input type="password" placeholder="交易密码" class="form-control" ref="passow">
	                <router-link to="/Account/deal/Moddeal" class="u_link">忘记密码</router-link>
	       </div>
	       <div class="repickup_about">
	       	 	<router-link to="/Account/Repickupexplain">提现说明</router-link>
	       </div>
	    	<button type="button" class="btn-avail" id="u-recharge" @click="repickup" >提现</button>
	    </div>
	    <div class="charge_card2" v-else>
			<div class="info info1" v-show="state1">您未进行<router-link  to="/Account/Bank"><span class="link">实名认证</span></router-link>，无法进行提现</div>
			<div class="info info2" v-show="state2">您未绑定<router-link  to="/Account/deal/SetModdeal"><span class="link">交易密码</span></router-link>，无法进行提现</div>
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
	           // this.mobile=sessionStorage.getItem('mobile') 
	 	 	//console.log(this.mobile); 
			//判断设置样式
			var bankCode=sessionStorage.getItem('bankCode');
			// console.log(this.bg)
			
		},
		methods: {
//		 	sendCode1(e) {
//	    	this.mobile=sessionStorage.getItem('mobile')
//	    	var num=60	
//	    	var txt=e.target.innerText
//	    	//var mobile=this.$refs.tel.value
//	    	//console.log(this.mobile)
//	    	var token = sessionStorage.getItem('userAccessToken')
//			var investCount = this.serviceAjax('/api/third/sms/sendvalidatecode.do','post',{mobile:this.mobile,apiType:'重置密码'},token)
//			//console.log(investCount) 
//			var code = investCount.head.code
//          if(code=='0000'){
//           	var timer = setInterval(function () {
//          		num--;
//          		e.target.innerText=+num+"s后重新发送"
//          		e.target.disabled = 'disabled'
//          		e.target.style.background="#ccc"
//          		if(num<=0|| mobile==''){
//	            		e.target.style.background="#ffb400"
//	            		e.target.innerText="获取短信验证码"
//	            		//按钮设置为不可点击
//	            		e.target.disabled = ''
//	            		clearInterval(timer)
//          		}
//      		}, 1000)
//           	// this.$refs.code1.value = investCount.body.code;
//	            // console.log(investCount.head.code);
//          }else{
//           	 this.$dialog.notify({
//	               mes:investCount.head.memo,
//	               timeout: 3000}) 	
//          }
//	    },
		    repickup(){
		    	var passwd=this.$refs.passow.value
		    	var amount=this.$refs.amount.value*100
		    	var passworda=md5(md5(passwd))
		    	var token = sessionStorage.getItem('userAccessToken')
				var withdraw = this.serviceAjax('api/account/apply/withdraw.do','post',{amount:amount,payPasswd:passworda},token)
				var code=withdraw.head.code
				if(code=="0000"){
					this.$dialog.notify({
				      mes:'提现成功',
				      timeout: 2000}) 	
				      setTimeout("location.reload()",3000);
				}else{
					this.$dialog.notify({
				      mes:withdraw.head.memo,
				      timeout: 2000})
				}
				
				
		   	}
		}
	}
</script>

<style scoped>
.u-but{ text-align: center;}
.btn-avail{display: block;background: #ecc346;color: #fff;text-align: center;width: 6.443rem;height: 0.821rem;margin: 1rem auto 0 auto;font-family: "微软雅黑"; font-size: 0.314rem;border: 1px solid #ecc346;border-radius: 0.8rem;-webkit-border-radius: 0.8rem;-moz-border-radius: 0.8rem;}
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
.repickup_about{padding: 3% 0.302rem;text-align: right;}
.repickup_about a{color:#ecc346;}
.money {font-size: 0.217rem;color: #999999;height: 0.815rem;line-height: 0.815rem;padding-left: 0.302rem;}
.u-repform { background: #fff; height: 1.941rem;border-top: 1px solid #E7E7E7;border-bottom: 1px solid #E7E7E7; padding-left: 0.302rem; padding-top: 3%;}
.u-Copy {height: 0.815rem; line-height: 0.815rem;font-size: 0.217rem; color: #999999;padding-left: 0.203rem;}
.u-Copy1 {height: 0.815rem; line-height:0.315rem;font-size: 0.217rem; color: #999999;padding-left: 0.203rem;}
.recharge .u-repform span { padding-top: 3%; height: 0.34rem;    font-size: .43rem; text-align: left;}
.tn_form .u-repform .group {border: none;}
.u-repform .group{padding:0;}
.u-repform .group input{color: #333;}
 .group i{font-size: .43rem;}
.tn_form .group { background: #fff; padding: 0 .4rem; position: relative;border-top: 1px solid #ECECEC; border-bottom: 1px solid #ECECEC;clear: both;font-size: .43rem;}
.tn_form input {width: 61%;font-size: .314rem;line-height: normal; padding: .4rem 0;border: 0; background: none;color: #ccc; box-sizing: border-box;}
.tn_form .btn-avail {display: block;background: #ecc346;color: #fff;text-align: center;width: 6.443rem;height: 0.821rem; margin: 1rem auto 0 auto;font-size: 0.314rem; border: 1px solid #ecc346;border-radius: 0.8rem;-webkit-border-radius: 0.8rem;-moz-border-radius: 0.8rem;}
.form-control{width: 61%; font-size: .314rem;line-height: normal;padding: .3rem 0;border: 0;background: none;color: #ccc;box-sizing: border-box;font-size: .43rem;}
.u-repform span {padding-top: 3%;height: 0.34rem;font-size: .43rem;}
.u-Copy {height: 0.815rem;line-height: 0.815rem;font-size: 0.217rem; color: #999999; padding-left: 0.203rem;}
.yd-cell-right input[type=text]:not(.yd-spinner-input),.yd-btn{ font-family: "微软雅黑";}
.group {background: #fff;padding: 0 .4rem;position: relative;border-top: 1px solid #ECECEC;border-bottom: 1px solid #ECECEC;clear: both;}
.group  input { width: 61%; font-size: .314rem;line-height: normal;padding: .4rem 0; border: 0;background: none;color: #ccc; box-sizing: border-box;font-family: "微软雅黑";}
.group  .u_link { color: #ecc346;font-size: 0.217rem;background: none;border: none; float: right;line-height: 1.24rem;}
.u-repform .group{ border: none;}
.charge_card2 .info{text-align: center;font-size: 0.4rem;margin-top:0.4rem;}
.charge_card2 .info span{color:#e71a19;}
</style>