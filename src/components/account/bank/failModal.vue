<template>
	<div class="failmodal">
		<div class="mask"></div>
		<div class="dialog-content">
			<div class="close-btn" >
				<img src="../../../assets/img/close.png" @click="close">
			</div>
			<div class="dialog-top">
				<img src="../../../assets/img/fail.png">
				<div class="txt">认证失败！</div>
			</div>	
			<div class="reason">
				<div class="txt1">失败原因：<span class="memo">银行卡预留手机号失败</span></div>
			</div>
			<div class="btn-group">
				<div class="btn" @click="again">重新认证</div>
			</div>
			<div class="wait">
				<a href="#" @click="wait">稍后认证</a>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:'failmodal',
	methods:{
		close:function(){
			$('.failmodal').fadeOut(500);
		},
		again:function(){
			$('.failmodal').fadeOut(500);
			setTimeout("location.reload()",2000);
		},
		wait:function(){
		//跳转首页
		this.$router.push({ path: '/'});
		}
	}
}
</script>

<style scoped>
.failmodal{position:fixed;width:100%;height: 100%;z-index:3;display: none;}
.failmodal .dialog-content {position: fixed;padding: 0.483rem 0.362rem;left: 50%;top: 50%;transform: translate(-50%, -50%);border-radius:0.399rem;background: #fff;z-index:4;}
.failmodal .dialog-top{width: 100%;margin: 0 auto;text-align: center;}
.failmodal .dialog-top img{width: 0.5978rem;height: 0.5978rem;margin: 0 auto;}
.failmodal .dialog-content .close-btn{width:100%;height: 0.960rem;position: absolute;top:-0.960rem;left:-0.362rem;}
.failmodal .reason{text-align: center;}
.failmodal .reason .memo{color: #f12f30;}
.failmodal .dialog-content .close-btn img{width: 0.640rem;height: 0.960rem;position: absolute;top:0;right:0;}
.failmodal .dialog-content .btn-group{width:5.598rem;margin: 0 auto;}
.failmodal .dialog-content .btn-group .btn {margin-top:0.675rem;font-size:0.314rem;color: #fff;border-radius: 0.441rem;width: 5.598rem;height: 0.821rem;line-height: 0.821rem;text-align: center;background:#ecc346;}
.failmodal .mask {position: fixed;top: 0;left: 0;bottom: 0;right: 0;z-index: 3;width: 100%;height: 100%;background: rgba(0,0,0,.5);}
.failmodal .wait{text-align: center;color:#ecc346;}
</style>