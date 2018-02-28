<template>
	<div class="bankNo">
		<div class="m-addbank" v-show="state1">
		<!-- <div class="m-addbank" v-if="cardstate"> -->
		    <div class="u-addbank">
		    	<router-link to="/Account/Bank/SetBank">
		    	 <a href="/bindcard.html" class="plusCard">
		    	 	<i></i>添加银行卡
		    	 </a>
		    	 </router-link>
		    </div>
   		</div>
   		<div class="card-has" v-show="state2">
   			<div class="bankcard-item gongshang1" ref="bg" v-bind:style="{ background:bg }">
                <!-- 工商银行 -->
                <div class="bank" :class="{gongshang:card.code=='ICBC',guangda:card.code=='CEB',guangfa:card.code=='GDB',jianshe:card.code=='CCB',jiaotong:card.code=='BCOM',minsheng:card.code=='CMBC',nongye:card.code=='ABC',pingan:card.code=='PAB',xingye:card.code=='CIB',zhongguo:card.code=='BOC',youzheng:card.code=='PSBC',zhongxin:card.code=='CITIC',zhaoshang:card.code=='CMB',pufa:card.code=='SPDB',huaxia:card.code=='HXB',shanghai:card.code=='SHB',beijing:card.code=='BOB'}"></div>
                 <p>储蓄卡</p>
                <p class="card_num">***   ***  *** {{card.money}} </p>
            </div>
   		</div>
   		<div class="card-error" v-show="state3">
   			 <!-- 这个信息是当实名信息没通过是显示 -->
            <div class="pullcenter" style="margin-top: .8rem;">
                <p style="margin-bottom: .8rem;color: #666;">*绑卡信息已提交，将在您首次快捷充值时进行审核。</p>
                <a href="javascript:;" @click="tochange">修改实名绑卡信息</a>
            </div>
   		</div>
   		<div class="ban-title">官方小贴士</div>
   		<div class="u-banktext">
	    	<h3>什么是同卡进出</h3>
	    	<p>为了保障您的账户资金安全，您在金贝猫只能绑定一张银行卡，确保您的资金只能转出到您的付款银行卡中，其他人无法盗用您的投资资金。</p>
	    	<div class="u-banimg">
	    		<img src="../../../assets/img/account/bank.png" class="iconimg">
	    		<img src="../../../assets/img/account/Arrow.png" class="iconimg1">
	    		<img src="../../../assets/img/account/logoimg.png" class="iconimg">
	    	</div>
   		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				state1:sessionStorage.getItem('state1')*1,
				state2:sessionStorage.getItem('state2')*1,
				state3:sessionStorage.getItem('state3')*1,
				card:{},
				bg:"#7ecef4"
			}	
		},
		methods:{
			tochange(){
				this.$router.push({ path: '/Account/Bank/SetBank' }) 
			}
		},
		//获取数据
		created: function () {
			// 有卡的状态
			// console.log(this.cardstate)
			var token = sessionStorage.getItem('userAccessToken')
			if(token==null){
				 this.$router.push({ path: '/login' })
			}else{
				if(this.state2=='1'||this.state3=='1'){
				// 查询实名绑卡信息(有卡的状态)
				// var token = sessionStorage.getItem('userAccessToken')
		      		var cardinfo = this.queryAjax('/qapi/user/bankcard.do','post',{},token)
		      		if(cardinfo.head.code=='0000'){
		      			var cardnum=cardinfo.body.vagueBankCardNo
			      		//console.log(cardinfo.body)
			      		//查询身份证后4位
			      		this.card.money=cardnum.substr(cardnum.length-4)
			      		// cardinfo.body.bankCode='ABC'
			      		sessionStorage.setItem('bankCode',cardinfo.body.bankCode)
			      		this.card.code=cardinfo.body.bankCode;
			      		// 如果是绑卡信息存在错误的状态就得到所有的信息
			      		if(this.state2=='1'&&this.state3=='1'){
			      			var cardinfo = this.queryAjax('/qapi/user/bankcard.do','post',{},token)
			      			// console.log(typeof(cardinfo.body))
			      			//存储数据对象
			      			var str = JSON.stringify(cardinfo.body);
			      			sessionStorage.obj = str;
			      			//读取c存储的对象
							// console.log(JSON.parse(sessionStorage.obj));
			      		}
		      		}else{
		      			this.$dialog.notify({
		                mes:cardinfo.head.memo,
		                timeout: 3000})
		      		}
		      		
				}else{
					//没卡的状态
				}
			}
				
		},
		mounted:function(){
			//判断设置样式
			var bankCode=sessionStorage.getItem('bankCode');
			// console.log(this.bg)
			switch(bankCode){
				//中国工商
			   case "ICBC":
                 this.bg= "#F16F6F";
                	break;
            	// 中国农业银行
	            case "ABC":
	              this.bg = "#72C86E";
	            	break;
	            // 中国建设银行
	            case "CCB":
	               this.bg= "#7CB4E0";
	                break;
	            // 中国银行
	            case "BOC":
	              this.bg = "#F16F6F";
	               break;
	            // 中国交通银行
	            case "BCOM":
	               this.bg= "#7CB4E0";
	                break;
	            // 兴业银行
	            case "CIB":
	               this.bg = "#7CB4E0";
	                break;
	            // 中信银行
	            case "CITIC":
	               this.bg = "#F16F6F";
	                break;
	            // 中国光大银行
	            case "CEB":
	               this.bg = "#b596d9";
	                break;
	            // 平安银行
	            case "PAB":
	               this.bg = "#F16F6F";
	                break;
	            // 中国邮政储蓄银行
	            case "PSBC":
	               this.bg = "#72C86E";
	                break;
	            // 浦发银行
	            case "SPDB":
	               this.bg = "#7CB4E0";
	                break;
	            // 中国民生银行
	            case "CMBC":
	               this.bg = "#72c86e";
	                break;
	            // 中国华夏银行
	            case "HXB":
	               this.bg = "#F16F6F";
	                break;
	            // 中国招商银行
	            case "CMB":
	               this.bg = "#F16F6F";
	                break;
	            // 广发银行
	            case "GDB":
	                this.bg = "#F16F6F";
                break;
                default:
                 	this.bg = "#4DB8FF";
                break;
            }

		}
    }   
</script>
<style scoped>
	.bankNo .m-addbank {background: #fff;padding: 0.314rem 0 0.302rem;}
	.bankNo .u-addbank{border: 1px solid #E7E7E7;border-radius: 0.2rem;width: 6.89rem;height: 1.087rem;margin: 0 auto;text-align: left;}
	.bankNo .u-addbank a.plusCard {color: #333333;font-size: 0.2778rem;text-align: center;height: 1.087rem;line-height: 1.087rem;}
	.bankNo .u-addbank a.plusCard i{display: inline-block;width: 0.399rem;height: 0.399rem;background: url(../../../assets/img/account/add.png) no-repeat center center;margin: 0 auto;background-size: 0.399rem;vertical-align: middle;margin: 0 0.519rem 0 2.1135rem}
	.bankNo .ban-title{height: 0.899rem;line-height: 0.899rem;width: 100%;text-align: center;font-size: 0.27778rem;color: #666666;background: #f5f5f5 url(../../../assets/img/account/Line.png) Center Center no-repeat;background-size: 7.5rem 0.085rem;border-top: 1px solid #E7E7E7; border-bottom: 1px solid #E7E7E7;}
	.bankNo .u-banktext{padding: 0 0.2778rem;}
	.bankNo .u-banktext h3{color: #000000;font-size: 0.2778rem;border-left: 1px solid #c71a19;padding-left: 0.302rem;margin-top: 0.314rem;text-align: left;}
	.bankNo .u-banktext p{color: #666;font-size: 0.241rem;padding-top: 0.314rem;text-align: left;}
	.bankNo .u-banktext .u-banimg{padding: 0.362rem 1.032rem 0;overflow: hidden;}
	.bankNo .u-banktext .u-banimg img{float:left;width: 0.960rem; height: 0.960rem;}
	.bankNo .u-banktext .u-banimg .iconimg1{width: 1.322rem;  height: 0.423rem;  margin: 9% 8%;}
	.card-has .bankcard-item{font-size:.4rem;color:#fff;width: 7rem;height: 4rem;padding: .4rem 0; margin: .5rem auto ;box-sizing: border-box;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;border-radius: .2rem;-webkit-border-radius: .2rem;-moz-border-radius: .2rem;}
	.card-has .bankcard-item .card_num {margin: .8rem 0 .4rem 0;    text-align: right;}
	.card-has .bankcard-item p{text-align: left;padding: 0 0.374rem;}
	.card-has .bankcard-item .bank {margin: 0 0 0 0.374rem;}
	.bank{height: 44px;display:inline-block;width:139px;background: url(../../../assets/img/bank/001.png) no-repeat 0 0;margin: 3.5% 4%;}
	.bank.gongshang{background: url(../../../assets/img/bank/001.png);}
	.bank.guangda{background: url(../../../assets/img/bank/002.png);}
	.bank.guangfa{background: url(../../../assets/img/bank/003.png);}
	.bank.jianshe{background: url(../../../assets/img/bank/004.png);}
	.bank.jiaotong{background: url(../../../assets/img/bank/005.png);}
	.bank.minsheng{background: url(../../../assets/img/bank/006.png);}
	.bank.nongye{background: url(../../../assets/img/bank/007.png);}
	.bank.pingan{background: url(../../../assets/img/bank/008.png);}
	.bank.shanghai{background: url(../../../assets/img/bank/009.png);}
	.bank.xingye{background: url(../../../assets/img/bank/010.png);}
	.bank.zhongguo{background: url(../../../assets/img/bank/011.png);}
	.bank.youzheng{background: url(../../../assets/img/bank/012.png);}
	.bank.zhongxin{background: url(../../../assets/img/bank/013.png);}
	.bank.zhaoshang{background: url(../../../assets/img/bank/014.png);}
	.bank.pufa{background: url(../../../assets/img/bank/015.png);}
	.bank.huaxia{background: url(../../../assets/img/bank/016.png);}
	.bank.beijing{background: url(../../../assets/img/bank/017.png);}
	.pullcenter{text-align: center;}
	.pullcenter a {font-size: .45rem;text-decoration: none;color: #33a9f3;}
</style>