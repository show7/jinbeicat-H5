<template>
	<div class="bg">
		<div class="m-but">
			<a href="https://itunes.apple.com/cn/app/%E9%87%91%E8%B4%9D%E7%8C%AB/id1289135747?mt=8" class="u-but"><i class="u-img"><img src="/static/img/activity/icon.png"></i>iphone下载</a>
			<a href="http://www.jinbeicat.com/download/android/jinbeicat.apk" class="u-but"><i class="u-img1"><img src="/static/img/activity/icon1.png"></i>Android下载</a>	
		</div>
		<div class="u-bg1" v-show="u_bg"><img src="/static/img/activity/downapp1.png"></div>
	</div>
</template>

<script>
    export default{ 
    	data(){
    	 return{
    	 	u_bg:false
    	 }
    	},
	    mounted:function(){
    	    var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			var ua = navigator.userAgent.toLowerCase(); 
			//	console.log(ua);
			if(ua.match(/MicroMessenger/i)=="micromessenger") {  
		        if(u==isiOS){
		            this.u_bg=false
				}else{
					 this.u_bg=true
				}
			} 
	    }
	}
</script>

<style>
	.bg{ background:url(/static/img/activity/downapp.png) no-repeat;width: 7.5rem; height:8.52rem ; background-size: 7.5rem 8.52rem; position: relative;}
	.m-but{ position: absolute; bottom: -27%; left: 23%;}
	.m-but .u-but{ width:3.756rem ; height:0.821rem ; background: #e71a19; color: #ffffff; font-size: 0.332rem; display: block; border-radius: 0.5rem; margin-top: 17%; text-align: center;line-height: 0.821rem;z-index: 11;}
    .m-but .u-but .u-img img{ width:0.452rem; height:0.513rem; float: left;margin: 3% 0 0 11%;}
    .m-but .u-but .u-img1 img{ width:0.368rem; height:0.440rem;float: left; margin: 3% 0 0 11%;}
    .u-bg1{ width: 7.5rem; height:13.339rem ; position: relative;z-index: 3333; }
</style>