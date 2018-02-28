<template>
	<div class="successmodal">
		<div class="mask"></div>
		<div class="dialog-content">
			<div class="close-btn" >
				<img src="../../../assets/img/close.png" @click="close">
			</div>
			<div class="dialog-top">
				<img src="../../../assets/img/success.png">
				<div class="txt">认证成功！</div>
			</div>	
			<div class="btn-group">
				<div class="btn"@click="prolist">去投资</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:'successmodal',
	methods:{
		close:function(){
			$('.successmodal').fadeOut(500);
		},
		prolist:function(){
			this.$router.push({ path: '/prolist'});
		}
	}
}
</script>

<style scoped>
.successmodal{position:fixed;width:100%;height: 100%;z-index:3;display: none;}
.successmodal .dialog-content {position: fixed;padding: 0.483rem 0.362rem;left: 50%;top: 50%;transform: translate(-50%, -50%);border-radius:0.399rem;background: #fff;z-index:4;}
.successmodal .dialog-top{width: 100%;margin: 0 auto;text-align: center;}
.successmodal .dialog-top img{width: 0.5978rem;height: 0.5978rem;margin: 0 auto;}
.successmodal .dialog-content .close-btn{width:100%;height: 0.960rem;position: absolute;top:-0.960rem;left:-0.362rem;}
.successmodal .reason{text-align: center;}
.successmodal .reason .memo{color: #f12f30;}
.successmodal .dialog-content .close-btn img{width: 0.640rem;height: 0.960rem;position: absolute;top:0;right:0;}
.successmodal .dialog-content .btn-group{width:5.598rem;margin: 0 auto;}
.successmodal .dialog-content .btn-group .btn {margin-top:0.675rem;font-size:0.314rem;color: #fff;border-radius: 0.441rem;width: 5.598rem;height: 0.821rem;line-height: 0.821rem;text-align: center;background:#ecc346;}
.successmodal .mask {position: fixed;top: 0;left: 0;bottom: 0;right: 0;z-index: 3;width: 100%;height: 100%;background: rgba(0,0,0,.5);}
.successmodal .wait{text-align: center;color:#ecc346;}
</style>