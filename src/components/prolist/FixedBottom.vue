<template>
	<div class="bottom">
		<div class="form">
			<div class="input"><input type="text" placeholder="输入投资金额" class="money" v-model.lazy="item.type" ref="type"></div>
			<div class="btn"><button :class="{status1:bottom.status=='立即抢购',status2:bottom.status=='复审中'||bottom.status=='计息中'||bottom.status=='回款中',status3:bottom.status=='已回款'}" @click="pay" id="btn" class="status">{{bottom.status}}</button></div>
			<div class="txt">剩余可投<span class="remain-money" ref="remain">{{bottom.balance}}</span>元</div>
		</div>
		<div class="dialog" id="dialog">
			<div class="mask"></div>
			<div class="dialog-content">
				<div class="close-btn" >
					<img src="../../assets/img/close.png" @click="closemodal">
				</div>
				<div class="txt">为了保证您的资金安全您需要在投资前进行实名认证!</div>
				<div class="btn-group">
					<div class="btn" @click="next">下一步</div>
				</div>
			</div>
		</div>
		<div class="tanOut" style="display:none;width:100%;height:100%; position:fixed;top:0;left:0;z-index:4; background:rgba(0,0,0,0.5) repeat">
			<div class="dailog-box" style="position: fixed; top: 20%; left: 0px; right: 0px; margin: 0px 30px;">
			<header class="dailog-header">
				<h3 class="dailog-title"><i class="bf_logo"></i></h3>
				<button type="button" data-role="close" class="close" @click="close"><span aria-hidden="true">×</span></button>
			</header>
			<div class="dailog-content">
				<p class="p3">项目名称：{{this.msg}}</p>
				<p class="p3">投资金额：{{money}}元</p>
				<form class="j-tab-forms confirm_form" >
					<div class=" u-details">
							<input type="password" name="password" placeholder="输入交易密码" ref="payPassWord">
							 <router-link to="Account/deal/Moddeal"  class="fgLink">忘记密码</router-link>
							<!--<a class="fgLink" href="/dealpass.html"></a>-->
					</div>
					<select id="form-control" name="bankcode"  placeholder="请选择优惠劵">
						<option>请选择优惠劵</option>
		            	<option v-for="str in listAvailables" :value="str.couponContent">{{str.couponContent}}</option>
          	        </select>
					<p class="input-error"></p>
					<button type="button" class="btn btn-submit confirm-btn" @click="invest">确认投资</button>
				</form>
			</div>
		</div>
		</div>
		
	</div>
</template>
<style>
	.yd-notify{ background-color: rgba(40,40,40,.8);position: fixed; top:40%;left:0; right:0;line-height: .28rem; font-size: .26rem; color: #fff; padding: .3rem .24rem; opacity: 0; -webkit-animation: notify-downin .2s linear forwards;animation: notify-downin .2s linear forwards; word-break: break-all;text-align: center;z-index: 12;width:255px;border-radius:5px;margin:0 auto;}
</style>
<script>
	export default {
		props:['bottom'],
        data() {
            return{
                item:{
                    type:'',
                    dialog: false  
                },
                listAvailables:[],
                money:'',
                msg:''
            }
        },
        mounted:function(){
          var status=$('.status');
            if(status.hasClass('status2')||status.hasClass('status3')){
              status.attr('disabled','disabled')
              $('.form .money').css('display','none');
              $('.bottom .form').css('bottom','0.2rem')
          }
        },
        methods:{
            pay(){
                var remain=this.$refs.remain.innerText;
                var money=this.$refs.type.value;
                // console.log(money)
                this.money=money
                var min=sessionStorage.getItem('min');
                // console.log(min)
                if(money){
                 // if((/(^[1-9]\d*$)/.test(money))){	
                  	if(money%100==0){
                      if(money>=min){
                             //console.log(money)
                            // console.log(remain)
                        if(money*1<=remain*1){
                        // alert("1111")
                            var token = sessionStorage.getItem('userAccessToken')
                             this.msg =sessionStorage.getItem('msg');
                           // console.log(this.msg);
                          // alert(token)
                              // $(".tanOut").show();
                            if (token == null) {
                                this.$router.push({ path: '/login' })
                            }else{
                               //判断是否实名认证 
                               var cardstate=sessionStorage.getItem('cardstate');
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
                                    $('#dialog').show();
                                  }else if(cardstate=='SUC'){
                                    //绑卡成功
                                    state1=0;
                                    state2=1;
                                    state3=0;
                                    $(".tanOut").show();
                                      var token = sessionStorage.getItem('userAccessToken')
                                      // console.log(token);
                                      var taskTid = sessionStorage.getItem("showTaskDetail");
                                      var money2=this.$refs.type.value*100;
                                      var AvailableCoupon=this.queryAjax('qapi/user/queryAvailableCoupon.do','post',{pid:taskTid,ptype:1,invertMoney:money2},token);
                                     //  console.log(AvailableCoupon);
                                      var listAvailable=AvailableCoupon.body.acList
                    					    	 if(listAvailable.length>0){
                    					    	    for(var i=0;i<listAvailable.length;i++){
                    					          // var listlid=listAvailable[i].lid  
                    					             this.listAvailables.push(listAvailable[i]);
                    				                 this.listAvailables[i].name=listAvailable[i].couponContent;
                    				                 this.listAvailables[i].lid=listAvailable[i].lid
                    					           }
                    					    	 }else{
                    					    	 	 this.$dialog.notify({
      		              			             mes:"暂无优惠劵",
      		              			             timeout: 3000})
      		              			             $("#form-control").hide();
      		              					  }
                                  }else if(cardstate=='SUB'){
                                   //申请绑卡
                                    state1=0;
                                    state2=1;
                                    state3=1;
                                    // this.$router.push({ path: '/Account/Bank/SetBank'})
                                     $('#dialog').show();
                                  }
                                 sessionStorage.setItem('state1',state1);
                                 sessionStorage.setItem('state2',state2);
                                 sessionStorage.setItem('state3',state3);
                           }
                        }else{
                        this.$dialog.notify({
                          mes:"您输入的金额大于剩余可投金额",
                         timeout: 3000});
                            }
                        
                      }else{
                          this.$dialog.notify({
                          mes:"您输入的金额小于起投金额",
                         timeout: 3000});
                      }
                      }else{
                      	 this.$dialog.notify({
                          mes:"请输入整百的金额！",
                         timeout: 3000});
                      }
//                }else{
//                  this.$dialog.notify({
//                    mes:"请输入整数！",
//                   timeout: 3000}); 
//                }
                }else{
                  this.$dialog.notify({
                      mes:"请输入投资金额！",
                     timeout: 3000});	
                }
            },
        next(){
//            判断是否实名认证
         this.$router.push({ path: '/Account/Bank/SetBank' }) 
        },
		    close () {
		     $(".tanOut").hide();
		    },
		    closemodal(){
		    $("#dialog").hide();
		    },
		    invest(){
		    	var money=this.$refs.type.value*100;
		    	var token = sessionStorage.getItem('userAccessToken')
		    	//console.log(token)
		    	var payPassWord=md5(md5(this.$refs.payPassWord.value))
		    	var taskTid = sessionStorage.getItem("showTaskDetail");
		    	//var lid = sessionStorage.getItem("lid");
		    	var AvailableCoupon1=this.queryAjax('qapi/user/queryAvailableCoupon.do','post',{pid:taskTid,ptype:1,invertMoney:money},token);
		    	var listAvailable1=AvailableCoupon1.body.acList
		    	  //console.log(listAvailable1);
		    	if(listAvailable1.length>0){
		    	 	//alert("1111");
		    	 for(var i=0;i<listAvailable1.length;i++){
		           var listlid=listAvailable1[i].lid      	
		           }
		          
		    	 }else{
		    	 	 this.$dialog.notify({
                   mes:"暂无数据",
                     timeout: 3000})
		    	 	  $("#form-control").hide()
		    	}			    	
		    	var invest=this.serviceAjax('api/product/invest.do','post',{investAmount:money,pid:taskTid,lid:listlid,rechargeAmount:0,investChannel:'wab',payPassWord:payPassWord},token);
		       // console.log(invest);
		      var code=invest.head.code
		        if(code=="0000"){
		        	 this.$dialog.notify({
                   mes:invest.head.memo,
                     timeout: 3000});
                      //window.location.reload();
                       $(".tanOut").hide();
		        }else{
		        	 this.$dialog.notify({
                   mes:invest.head.memo,
                     timeout: 3000})
		        }
		    }
            
      }
	}
</script>
<style scoped>
.j-tab-forms{ text-align: center;}
.dailog-box { position: absolute;top: 50%;left: 50%; background: #fff;z-index: 3;}
button.close { -webkit-appearance: none; padding: 0; cursor: pointer; background: transparent; border: 0;}
.close {float: right; font-size: 30px; font-weight: bold; line-height: 1; color: #000;filter: alpha(opacity=20); opacity: .2; margin: 10px;}
.dailog-box p.p3 {line-height: 1em;font-size: .3rem;width: 94%; margin: .4rem auto ;color: #333;text-align: left;}
.confirm_form .group { position: relative;margin-bottom: .3rem;width: 90%;margin-left: 3%;}
.u-details {height: 0.44rem;line-height: 0.44rem; margin-left: 5%;}
.confirm_form .group.last { margin-bottom: 0;}
.confirm_form .confirm-btn { cursor: pointer;border: 1px solid #ecc346;border-radius: 3px;-webkit-border-radius: 3px;-moz-border-radius: 3px; width: 90%;height: 40px;text-align: center;color: #fff; background: #ecc346; margin:5% auto;}
.confirm_form input { font-size: .25rem; width: 68%; border: 1px solid #e4e4e4;height: 0.54rem; text-indent: 1em;line-height: 0.54rem;border-radius: 0.1rem;-webkit-border-radius: 0.1rem;-moz-border-radius: 0.1rem;float: left;margin-bottom: 3%;}
.confirm_form .fgLink {position: absolute;right: .2rem;line-height: 1em;}
.dailog-box a {padding-left: 5%; font-size: 0.26rem;padding-top: 0.2rem;color: #ecc346;text-align: right;}
#form-control {height: 0.55rem;cursor: pointer;border: 1px solid #e4e4e4;border-radius: 0.14rem;-webkit-border-radius: 0.14rem; line-height: 0.55rem;font-size: .25rem;color: #999;padding-left: 2%;clear: both; text-align: left; width: 94%;margin: 0 3% 0 3%;}
.bottom{position: fixed;bottom: 0;z-index: 2;left: 0;background: #fff;width: 100%;height: 1.485rem; margin: 0 auto;border: 0; outline: 0;border-top: 1px solid #E7E7E7;}
.bottom .form{position: fixed;
    bottom: 1rem;
    z-index: 2;
    left: 0;
    background: #fff;
    width: 100%;
    text-align: center;
    height: 1.485rem;
    margin: 0 auto;
    border-top: 1px solid #E7E7E7;
    box-shadow: 0 -0.13rem 0.33rem #E7E7E7;
}	
.bottom .form input{
	flex: 2;
	border:1px solid transparent;
    border-bottom: 1px solid #c4c4c4;
    text-indent: .4rem;
    font-size: .28rem;
    border-radius: 0;
    margin-top: 3%;
    line-height: 0.54rem;
    height: 0.54rem;
    width: 68%;
    outline: 0;
}
.bottom .form .btn{
    width: 6.43rem;
    height: 1.021rem;
    margin: 0 auto;
    font-family: "微软雅黑";
    font-size: 0.217rem;
    text-align: center;
    padding-top: 0.1rem;
}
.bottom .form .btn .status{
    border: 1px solid #ecc346;
    text-align: center;
    font-size: 0.314rem;
    margin: 2% auto 0;
    line-height: 0.721rem;
    width: 100%;
    height: 0.721rem;
    border-radius: 1.8rem;
    display: block;
}
.bottom .form .btn .status.status1{
    background: #ecc346;
    color: #fff;
    border:none;
}
.bottom .form .btn .status.status2{
     color:#ecc346;
  background:#fff;
  border:1px solid #ecc346;
}
.bottom .form .btn .status.status3{
 background: #f0f0f0;
  color: #999;
  border:none;
}
.bottom .form .txt{
	color: #999999;
    font-family: "微软雅黑";
    font-size: 0.217rem;
    text-align: center;
    padding-top: 0.1rem;
}
.dialog {
	position:fixed;
	width:100%;
	height: 100%;
	z-index:3;
	display: none;
}
.dialog .dialog-content {
    position: fixed;
    padding: 0.483rem 0.362rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius:0.399rem;
    background: #fff;
    z-index:23;

}
.dialog .dialog-content .title {
	color:#666;
	font-size:0.278rem;
}
.dialog .dialog-content .close-btn{
	width:100%;
	height: 0.960rem;
	position: absolute;
	top:-0.960rem;
	left:-0.362rem;
}
.dialog .dialog-content .close-btn img{
	width: 0.640rem;
	height: 0.960rem;
	position: absolute;
	top:0;
	right:0;
	
}
.dialog .dialog-content .txt{
	font-size: 0.314rem;
	padding:0 0.151rem;
	color:#999;
	line-height: 0.4rem;
}

.dialog .dialog-content .btn-group{
	width:5.598rem;
	margin: 0 auto;
}
.dialog .dialog-content .btn-group .btn {
	margin-top:0.875rem;
   font-size:0.314rem;
   color: #fff;
   border-radius: 0.441rem;
   width: 5.598rem;
   height: 0.821rem;
   line-height: 0.821rem;
   text-align: center;
   background:#ecc346;
}
.dialog .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 22;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
}
</style>
