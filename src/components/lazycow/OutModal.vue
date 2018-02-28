<template>
	<div class="dialog dialog_out">
		<div class="mask"></div>
		<div class="dialog-content">
			<div class="close-btn" >
				<img src="../../assets/img/close.png" @click="close">
			</div>
			<h3 class="title">可转出<span>{{lazylist.money2}}元</span></h3>
			<div class="form">
				<div class="money">
					<input type="text" placeholder="输入转出金额" ref='outputmoney'>
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
			//this.resolve('submit');
		var token = sessionStorage.getItem('userAccessToken')
		var outputmoney = this.$refs.outputmoney.value*100
		var money=this.$refs.outputmoney.value
		// console.log(typeof(outputmoney))
		 var putout = this.serviceAjax("api/current/account/putout.do",'post',{amount:outputmoney,outType:3},token); 
		 var code = putout.head.code;
			if(money!=''){
			 	if(code=="0000"){
	                 this.$dialog.notify({
	                mes:putout.head.memo,
	               timeout: 2000})
	              $(".dialog_out").hide();
	               setTimeout("location.reload()",2000);
	            }else{
	            	  this.$dialog.notify({
	                mes:putout.head.memo,
	               timeout: 2000})
	            }	
	        }else{
	        	 this.$dialog.notify({
	                mes:'金额不能为空',
	               timeout: 3000})
	        }
		},
		close(){
			var el=document.getElementsByClassName('dialog_out')[0];
			el.style.display="none";
		}	
	},
	created: function () { 
        var token = sessionStorage.getItem('userAccessToken')
        if (token == null) {
          this.$router.push({ path: '/login' })
        }else{
            var info = this.queryAjax('qapi/current/account.do', 'post',{},token)
            if(info.head.code=='0000'){
            	 var infoList=info.body.ca;
            	this.lazylist.money2=(infoList.currentBalance/100+infoList.currentLucre/100).toFixed(2);
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