<template>
	<div class="notice-details">
		<header class="u-header"> <a class="back" href="javascript:history.back();"><img src="../assets/img/left.png"></a>{{notice.title}}</header>
		<div class="notice-content">
			<div class="post-content" v-html="postcontent"></div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				notice:{},
				postcontent:''
			}
		},
		created:function(){
			var id= 1;
			var reg = new RegExp("(^|&)id=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null){
				id = unescape(r[2]);
			}else{
				id=sessionStorage.getItem("shownoticedetails")
			}
			var token = sessionStorage.getItem('userAccessToken')
    		 var notices = this.queryAjax2('article/getById', 'post', {id:id},token)
//  		var notices = this.queryAjax('qapi/webArticle/article/getById.do', 'post', {id:id},token);
    		//console.log(notices)
    		if(notices.head.code=='0000'){
    			//查询成功
    			this.notice.title=notices.body.title
    			this.postcontent=notices.body.richText
    		}else{
    			this.$dialog.notify({
            	mes:notices.head.memo,
            	timeout: 3000})
    		}
		}
	}
</script>
<style>
	.u-header {color: #fff; font-size: 0.320rem; line-height: 0.863rem;background: #e71a19;text-align: center; height: 0.863rem; position: relative;}
	.u-header a { width: 0.253rem; height: 0.4227rem; float: left; position: absolute;left: 0.302rem;top: 25%;}
	.post-content{background:#fff;}
	.MsoNormal{ padding: 0 5%;}
</style>