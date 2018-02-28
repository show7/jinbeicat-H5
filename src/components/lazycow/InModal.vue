<template>
	<div class="dialog dialog_in">
		<div class="mask"></div>
		<div class="dialog-content">
			<div class="close-btn" >
				<img src="../../assets/img/close.png" @click="close">
			</div>
			<div class="dialog-title">
				<h3 class="title">可用余额<span>{{lazylist.money1}}元</span></h3>
				<div class="right-btn"><a class="u-but" @click="gorecharge">充值</span></a></div>
			</div>	
			<div class="form">
				<div class="money">
					<input type="text" placeholder="输入转入金额" ref="inputmoney">
				</div>
				<!--<div class="password">
					<input type="password" placeholder="输入交易密码">	
				</div>-->
			</div>
			<div class="btn-group">
				<div class="btn" @click="next">下一步</div>
			</div>
		</div>
	</div>
</template>
<style>
	.yd-notify{ background-color: rgba(40,40,40,.8);position: fixed; top:40%;left:0; right:0;line-height: .28rem; font-size: .26rem; color: #fff; padding: .3rem .24rem; opacity: 0; -webkit-animation: notify-downin .2s linear forwards;animation: notify-downin .2s linear forwards; word-break: break-all;text-align: center;z-index: 2000;width:255px;border-radius:5px;margin:0 auto;}
</style>
<script>
export default {
	name: 'dialog',
	data() {
        return{
            lazylist:{}
        }
    },
	methods: {
		//确定,将promise断定为完成态
		next() {
		//	this.resolve('submit');
		var token = sessionStorage.getItem('userAccessToken')
		var inputmoney = this.$refs.inputmoney.value*100
		 var putin = this.serviceAjax("api/current/account/putin.do",'post',{amount:inputmoney},token); 
		 var code = putin.head.code;
			if(code=="0000"){
               this.$dialog.notify({
              mes:putin.head.memo,
              timeout: 2000}) 
              $(".dialog_in").hide();
              setTimeout("location.reload()",2000);
            }else{
             this.$dialog.notify({
              mes:putin.head.memo,
              timeout: 2000})
            
            }		
		},
		gorecharge(){
			 var bankTailNo=sessionStorage.getItem('bankTailNo')
		   	var balance=sessionStorage.getItem('balance')
		   	var bankCode=sessionStorage.getItem('bankCode')
		   	var mobile=sessionStorage.getItem('mobile')
		   	this.$router.push({ path: '/Account/recharge' }) 
		    //判断是否进行实名认证和交易密码
		     var cardstate=sessionStorage.getItem('cardstate');
		     var payPasswd=sessionStorage.getItem('payPasswd');
		     var state=null;
		     var state1=null;
		     var state2=null;
		      if(cardstate!='FAI'){
		        //实名成功
		        state=0
		        state1=1
		        state2=0
		         if(payPasswd==''){
		          //未进行交易密码设置
		          state=0
		          state1=0
		          state2=1
		         }else{
		          state=1
		         }
		        
		      }else{
		        //尚未进行实名认证
		        state=0
		        state1=1
		        state2=0
		      }  
		      sessionStorage.setItem('state',state);
		      sessionStorage.setItem('state1',state1);
		      sessionStorage.setItem('state2',state2);
		},
		close(){
			var el=document.getElementsByClassName('dialog_in')[0];
			el.style.display="none";
		}	
	},
	created: function () { 
        var token = sessionStorage.getItem('userAccessToken')
        if (token == null) {
          this.$router.push({ path: '/login' })
        }else{
            var info = this.queryAjax('qapi/current/account.do', 'post',{},token)
            if(info.head.code=="0000"){
              	var infoList=info.body.ca;
            	this.lazylist.money1=(infoList.currentBalance/100+infoList.currentLucre/100).toFixed(2);
            }
          
        }
    }
}
</script>

<style scoped>

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
.dialog .dialog-content .dialog-title{
	overflow: hidden;
	line-height: 0.423rem;
}
.dialog .dialog-content .dialog-title .title {
	color:#666;
	font-size:0.278rem;
	float: left;
}
.dialog .dialog-content .dialog-title .right-btn{
	float:right;
	vertical-align: middle;
}
.dialog .dialog-content .dialog-title .right-btn a{
	display:block;
	color:#ecc346;
	font-size:0.278rem;
	text-align: center;
	border-radius:0.211rem;
	width: 1.238rem;
	height: 0.423rem;
	line-height: 0.423rem;
	border:1px solid #ecc346;
	background: #fff;
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
.dialog .dialog-content .form{
	font-size: 0.314rem;
	padding:0 0.151rem;
}
.dialog .dialog-content .form div{
	margin-top:0.242rem;
}
.dialog .dialog-content .form input{
	padding:0.272rem 0;
	margin:0 0.272rem;
	border:none;
	border-bottom:1px solid #ccc;
	width:5.133rem;
	outline: 0;
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