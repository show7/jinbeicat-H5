<template>
	<div class="notice">
		<header class="u-header"> <a class="back" href="javascript:history.back();"><img src="../assets/img/left.png"></a>公告列表页</header>
		<ul class="u-list">
			<li v-for="notice in notices">
				<span @click='showdetails(notice.id)'>{{notice.title}}</span>
				<span class="u-right"><img src="../assets/img/account/right.png"></span>
			</li>
		</ul>
		<div @click="more" class="u-but2">点击获取更多</div>
	</div>
</template>

<script>
	export default {
  data() {
  	return {
  		notices:[],
  		totalPage:1
  	}
  }, 
  mounted: function () {
  	 var token = sessionStorage.getItem('userAccessToken')
  //	 var NoticeList = this.queryAjax2('article/listPage', 'post', {menuCode:'site_notice',pageSize:30,pageCurrent:this.totalPage},token)
		var NoticeList = this.queryAjax('qapi/webArticle/article/listPage.do', 'post', {menuCode:'site_notice',pageSize:30,pageCurrent:this.totalPage},token)
		//console.log(NoticeList)
		var code=NoticeList.head.code;
		if(code=='0000'){
			this.totalPage = NoticeList.body.totalPage;
			//查询成功
			var noticeArr=NoticeList.body.listDTO;
			//console.log(noticeArr)
			for(var i = 0; i < noticeArr.length; i++) {
				this.notices.push(noticeArr[i]);
				this.notices[i].title=noticeArr[i].title;
				//获取列表页的pid进行传递
				this.notices[i].id=noticeArr[i].id;
			} 
		}else{
			this.$dialog.notify({
          mes:NoticeList.head.memo,
         timeout: 3000})
		}
  },
   methods:{
  	showdetails(tid) {
  		sessionStorage.setItem("shownoticedetails", tid);
  		this.$router.push({path:'/Home/Notice'});
  	},
  	more(){
  	var token = sessionStorage.getItem('userAccessToken')
  	var NoticeList = this.queryAjax('qapi/webArticle/article/listPage.do', 'post', {menuCode:'site_notice',pageSize:30,pageCurrent:this.totalPage},token)
		//console.log(NoticeList)
		var code=NoticeList.head.code;
	    
		if(code=='0000'){
		  //this.totalPage = NoticeList.body.noticeArr;
		  var noticeArr=NoticeList.body.listDTO;
		  //	console.log(noticeArr)
		var listsize = this.notices.length;
			//console.log(listsize)
		   if(noticeArr>0){
			
			for(var i = 0; i < noticeArr.length; i++) {
				this.notices.push(noticeArr[i]);
				this.notices[ listsize + i].title=noticeArr[i].title;
				//获取列表页的pid进行传递
				this.notices[listsize +i].id=noticeArr[i].id;
			} 
	       }else{
	       		this.$dialog.notify({
	          mes:"没有更多的页数了",
	         timeout: 3000})
	       }
		
			
		}else{
			this.$dialog.notify({
          mes:NoticeList.head.memo,
         timeout: 3000})
		}
  		
  	}
  }
 }
</script>

<style scoped>
ul:not(.md-list) > li + li{ margin: 0;}
.u-list li{font-size: 0.24rem;height:0.64rem; line-height: 0.64rem; border-bottom: 1px solid #ccc; padding-left: 5%;background: #fff;}
.u-right{ float: right;}
.u-right img{  width: 0.305rem; height: 0.438rem;     margin: 24% 0 0 -65%;}
.u-but2{ text-align: center; padding: 5% 0;}
</style>