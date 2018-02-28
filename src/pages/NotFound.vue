<template>
	<div class="notfound">
		<div class="wrap">
			<div class="title">
				<img src="../../static/img/404.png">
			</div>
			<div class="text">
				<img src="../../static/img/info.png">
			</div>
			<div class="btn">
				<span @click="go">返回首页</span>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.notfound{background:#67ace4; height:13.339rem ;}
	.notfound .title{width: 3.21rem;text-align: center;margin: 0 auto;padding: 1.2rem 0 0.4rem 0;}
	.notfound .text{width: 2.3rem;margin: 0 auto;padding: 0.4rem 0;}
	.notfound .btn{width: 100%;text-align: center;padding: 0.4rem 0;}
	.notfound .btn span{line-height: 14px;color: #fff;text-decoration: none;padding: 6px 14px;margin: 1px 0 0 10px;border: 1px solid #fff;border-radius: 14px;}
</style>
<script type="text/javascript">
	export default{ 
  		methods:{
  		go:function (){
  			window.location.href="http://m.jinbeicat.com"
  		}
  	}
  }
</script>
 