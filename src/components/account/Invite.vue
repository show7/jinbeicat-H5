<template>
	<div class="invite">
		<header class="u-header"> <a class="back" href="javascript:history.back();"><img src="../../assets/img/left.png"></a>好友邀请</header>
		<div class="middle invitePage">
			 <div id="qrcode" style="width:100px; height:100px; margin-top:15px; margin: 0 auto;"></div>
		    <p class="u-text">让好友扫描二维码并注册，<br>成为您的队员,<br>或分享你的邀请链接：<br><span style="color: #ffa300;">{{url}}/Activity/share?referee={{uid}}</span></p>
		    <a class="invite-btn" href="javascript:;" @click="invitedetails">查看我的邀请记录</a>
          
		</div>
	</div>
</template>
<script>
	export default {
		 data() {
		      return {
		    	uid:sessionStorage.getItem('uid'),
		    	url:this.Const1
		    }
		},
		methods:{
			invitedetails(){
				this.$router.push({ path: '/Account/invite/Invitedetails' });
			}
		},
		  mounted: function () {
           var qrcode = new QRCode(document.getElementById("qrcode"), {
				width : 100,
				height : 100
			});
			var uid=sessionStorage.getItem('uid')
			var elText= this.Const1+'/Activity/share?referee='+this.uid
			console.log(this.Const1)
	       qrcode.makeCode(elText);
		  },

	}
</script>
<style scoped>
.middle{width: 100%;min-width: 320px;margin: 0 auto;margin-bottom: 0.9843rem;}
.invitePage {background:url(../../assets/img/account/invite.jpg) no-repeat 0 0 #ffeebb;background-size: 7.5rem 11.07rem;padding: 4.5rem 0 .8rem 0; width: 7.5rem;}
.invitePage img{ width: 2.4rem; height: 2.4rem;}
.invite-btn {display: block;font-size: .314rem;color: #ffec67;background-color: #ef1d1c;width: 88%;margin: 1.2rem auto 0 auto;padding: .2rem 0;text-align: center;border-radius: .5rem;-webkit-border-radius: .5rem;-moz-border-radius: .5rem;}
.tableStyle_y{width: 100%; background: #fff; font-size: .4rem; text-align: center;}
.tableStyle_y th,.tableStyle_y td{height: 1.2rem; border-bottom: 1px solid #c9c9c9;font-size: 0.25rem;}
.invitePage  .u-text {font-size: 0.169rem;color: #fff;text-align: center;margin-top: 0.2rem;line-height: 1.5em;margin: 0 auto;font-size: 0.32rem;background: none;}
.invitePage .u-text span {text-align: center;}
.invite-btn {display: block;font-size: .314rem;color: #ffec67;background-color: #ef1d1c;width: 88%;margin: 1.2rem auto 0 auto;padding: .2rem 0;text-align: center;border-radius: .5rem;-webkit-border-radius: .5rem;-moz-border-radius: .5rem;}
</style>