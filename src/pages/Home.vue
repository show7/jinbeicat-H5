<template>
	<div>
		<div class="banner-top">
			<app-banner :listImg="listImg"></app-banner>
		</div>
		<div class="task-recommend">
			<md-toolbar class="md-transparent">
			  <ul class="links">
			  	<li @click="toInvite">
			  		<p class="icon1"><img src="../assets/img/home_link.png"></p>
			  		<span>邀请好友</span>
			  	</li>
			  	<li  @click="Sign">
			  		<p class="icon2"><img src="../assets/img/home_link1.png"></p>
			  		<span>签到拿钱</span>
			  	</li>
			  	<li @click="toSafe">
			  		<p class="icon3"><img src="../assets/img/home_link2.png"></p>
			  		<span>安全保障</span>
			  	</li>
			  	<li @click="toAbout">
			  		<p class="icon4"><img src="../assets/img/home_link3.png"></p>
			  		<span>关于我们</span>
			  	</li>
			  </ul>
			 <div class="newest-post"> 
			 	<div class="fl u-left post-left" @click="notice"><i class="post-volumn"></i> 公告通知</div> 
			 	 	<div style="height:1rem;line-height:1rem;" class="fr post-right">
			        	<yd-slider autoplay="3000" direction="vertical">
			            	<yd-slider-item v-for="(notice,index) in notices" v-if="index<3">
			              		<span @click='showdetails(notice.id)'>{{notice.title}}</span>
			            	</yd-slider-item>
			            
			        	</yd-slider>
			   		</div>
			 	</div>
			 <div class="products-area">
			 	<div class="u-jbmark">
			 		<div class="top clearfix"> <h2 class="name">金贝零钱</h2> <p>100元起投，随存随取，每日计息</p> </div>
			 		<!--<div class="u-tsize"><span>{{lazylist.rate1}}</span>{{lazylist.rate2}}</div>-->
			 		<div class="u-tsize"><span>{{lazylist.rate}}</span></div>
			 		<div class="u-info">
			 			<div class="fl u-left"> <h4>随存随取</h4> <p>期限</p> </div>
			 			<div class="fr u-right"> <h4><span>{{lazylist.money}}</span>元</h4> <p>每日万份收益</p> </div>
			 			<!--<div class="fr u-right"> <h4><span>2.43</span>元</h4> <p>每日万份收益</p> </div>-->
			 		</div>
			 		<div class="u-lazycow"> 
			 			<router-link to="/lazycow" >立即投资</router-link>
			 			<!--<p>已购人数 : <span id="investCount">{{investCounta}}</span> 人</p>-->
			 		</div>
			 	</div>
			 </div>
			 <div class="task-lists">
			 <app-prolists :prolists="prolists"></app-prolists>
		     </div>
			</md-toolbar>
		</div>
		<footer-nav v-bind:class="{'isIndex':isNowPage}"></footer-nav>
	</div>
</template>
<style>
	.yd-slider-pagination-vertical{
		display: none;
	}
</style>
<script>
import indexlist from '../components/indexlist'
import Banner from '../components/Banner'
import FooterNav from '../components/Footer.vue'
export default {
  data() {
  	return {
  	 isNowPage: true,
	 investCounta: '',
	 prolists: [],
	 notices:[],
	 listImg: [],
	 lazylist:{}
	}
  },
  methods:{
  	toInvite(){
  		 var token = sessionStorage.getItem('userAccessToken')
  		if(!token){
 	        this.$router.push({ path: '/Login'})  
        } else{
  		    this.$router.push({path:'/Account/Invite'})
  		}
  	},
  	showdetails(tid) {
  		sessionStorage.setItem("shownoticedetails", tid);
  		this.$router.push({path:'/Home/Notice'});
  	},
  	toSafe() {
  		this.$router.push({path:'/safe'});
  	},
  	toAbout() {
  		this.$router.push({path:'/about'});
  	},
  	Sign(){
  		  var token = sessionStorage.getItem('userAccessToken')
  		   if(!token){
 	           this.$router.push({ path: '/Account'})  
           } else{
           	var Sign = this.serviceAjax("api/luckyBoys/sign/everyday.do",'post',{terminal:'Wab'},token); 
           	var code = Sign.head.code;
			    if(code=="0000"){
			    	this.$dialog.notify({
			        mes:Sign.head.memo,
			        timeout: 3000})
			    	var signDay = Sign.body.signDay;
				   var grantSignAward = this.serviceAjax("api/luckyBoys/grant/lottery/bysign.do",'post',{signDay:signDay},token)
				   //console.log(grantSignAward)
					 var code = grantSignAward.head.code;
					if(code=="0000"){
						this.$dialog.notify({
				              mes:grantSignAward.head.memo,
				              timeout: 3000})
					}else{
						this.$dialog.notify({
				        mes:grantSignAward.head.memo,
				        timeout: 3000})
					}
			    	
			    }else{
			    	this.$dialog.notify({
			        mes:Sign.head.memo,
			        timeout: 3000})
			    }
    	
        }
  	},
  	notice(){

 	  this.$router.push({ path: '/Noticelist'})  
         
  	}

  },
  components: {
    'app-prolists': indexlist,
    FooterNav,
    'app-banner' : Banner
  },
  mounted: function () {
    var token = sessionStorage.getItem('userAccessToken')
    var investCount = this.queryAjax('qapi/current/current/investor/count.do', 'post', {},token)
    var investCounta = investCount.body.investCount
    this.investCounta=investCounta
    var indexlistvue = this.queryAjax('/qapi/product/list.do','post', {proType:"BANK_BRIDGE,HOUSE_MORTGAGE,CAR_MORTAGE,PLEDGE,NEW_INVESTOR"},token)
      // console.log(indexlistvue)
	var listArray=indexlistvue.body.list;
		for(var i=0;i<listArray.length;i++){
				this.prolists.push(listArray[i]);
				this.prolists[i].name=listArray[i].title;
				this.prolists[i].signs=listArray[i].activitys;
				this.prolists[i].rate=listArray[i].investRate-listArray[i].awardRate;
				this.prolists[i].time=listArray[i].cycle;
				this.prolists[i].amount=(listArray[i].amount/100-listArray[i].yesAount/100).toFixed(2);
				//传递id进入详情页面
				this.prolists[i].id=listArray[i].pid;
				if(listArray[i].awardRate==0){
					this.prolists[i].awardRate='';
				}else{
					this.prolists[i].awardRate='+'+listArray[i].awardRate+'%';
				}
				//按钮的5中状态显示内容
				var status=listArray[i].status;
				if(status==2){
					this.prolists[i].status='立即抢购';
				}else if(status==3){
					this.prolists[i].status='复审中';
				}else if(status==4){
					this.prolists[i].status='计息中';
				}else if(status==5){
					this.prolists[i].status='回款中';
				}else{
					this.prolists[i].status='已回款';
				}
				//对于月和天的显示
                var cycle=listArray[i].cycle;
               var unit=listArray[i].unit;
//             console.log(unit)
               if(unit=='day'){
                this.prolists[i].time=+cycle+'天';
               }else if(unit=="week"){
                 this.prolists[i].time=+cycle+'周';
               }else if(unit=="month"){
                 this.prolists[i].time=+cycle+'个月';
               }else if(unit=="year"){
                 this.prolists[i].time=+cycle+'年';
               }
               //判断图标显示
               if(listArray[i].proType=='NEW_INVESTOR'){
               	this.prolists[i].show=true;
               	this.prolists[i].txt="新";
               }else{
               	this.prolists[i].show=false;
               	this.prolists[i].txt="定";
               }
		}

//		 var result = this.queryAjax2('image/list', 'post', {imageType:'mbanner'})
		var result = this.queryAjax('qapi/webArticle/image/list.do', 'post', {imageType:'mbanner'})
		var listImgArr = result.body.banners;
//	    console.log(result)
		for(var i = 0; i < listImgArr.length; i++) {
			this.listImg.push(listImgArr[i]);
			this.listImg[i].img=listImgArr[i].imagePath;
			this.listImg[i].slideUrl=listImgArr[i].linkUrl;
		//	console.log(this.listImg[i].slideUrl)
		} 
//		 var NoticeList = this.queryAjax2('article/listPage', 'post', {menuCode:'site_notice',pageCurrent:1,pageSize:3},token)
	var NoticeList = this.queryAjax('qapi/webArticle/article/listPage.do', 'post', {menuCode:'site_notice',pageCurrent:1,pageSize:3},token)
		//console.log(NoticeList)
		var code=NoticeList.head.code;
		if(code=='0000'){
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
            mes:nickimg.head.memo,
            timeout: 3000})
		}
		//金贝零钱利率
		 var user = this.serviceAjax('api/systemConfig/pocketRate.do','get',{},token)
//		 console.log(user)
		 if(user.head.code=='0000'){
		 	var rate=user.body.rate;
		 	// console.log(user.body.value)
            this.lazylist.rate=rate;
//			this.lazylist.rate1= rate.substr(0, rate.indexOf('%'));
//			this.lazylist.rate2= rate.substr(rate.indexOf('%'), rate.length);
		 	this.lazylist.money=user.body.value;
		 }else{
		 	this.$dialog.notify({
            mes:user.head.memo,
            timeout: 3000})
		 }
                
  }
}
</script>
<style scoped>
ul:not(.md-list) > li + li {
    margin-top: 0px;
}
.banner-top { width: 100%;height: 4rem; }
.task-recommend {float: left;width: 100%; background: #F5F5F5;margin-bottom: 0.9843rem;}	
.md-subheading{font-size: 0.181rem;position: relative;font-weight: bold;}	
.task-lists{ width: 100%;margin-top: 0.217rem;}
.links{ width: 100%; box-sizing: border-box;-webkit-box-sizing: border-box;  overflow: hidden; text-align: center; background: #fff; align-items: center; padding: 0.380rem 0 0.241rem 0;border-bottom: 1px solid #E7E7E7;}
.links li{ width: 24%;float: left; }
.links li .icon1{ width: 0.712rem; height:0.906rem;margin: 0 auto;}
.links li .icon2{ width: 0.712rem; height:0.906rem;margin: 0 auto;}
.links li .icon3{ width: 0.712rem; height:0.906rem ;margin: 0 auto;}
.links li .icon4{ width: 0.712rem; height:0.906rem;margin: 0 auto;}
.links li p{padding-bottom: 10%;}
.links li span{ color: #666666;font-size: 0.277rem;margin: 0 auto;padding-top: 10%;}
.newest-post {height: 1rem;line-height: 1rem; padding: 0 0.362rem;width: 100%; font-size: 0.2777rem; box-sizing: border-box; -webkit-box-sizing: border-box;-moz--box-sizing: border-box;background: #fff;position: relative; border-bottom: 1px solid #E7E7E7;}
.newest-post .post-volumn {background: url(../assets/img/notice.png) no-repeat 0px 0.07rem;background-size: 0.3442rem 0.301rem;width: 0.3442rem;height: 0.5038rem; display: inline-block; margin: 0 auto;vertical-align: middle;}
/*//轮播广告*/
.newest-post .post-left{float: left;display: inline-block}
.newest-post .post-right{display:inline-block;float:left;width:auto;position: relative;color: #666;padding-left: 3%;   }
.newest-post .post-right .yd-slider-item span{display: inline-block;height:100%; width: 5rem; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.newest-post a.post-content { height: 1rem; display: inline-block; overflow: hidden; color: #666; padding-left: 3%;float: left;}
.products-area .u-jbmark{background: #fff;overflow: hidden;padding: 0 0.362rem; border-bottom: 1px solid #E7E7E7;    text-align: left;}
.products-area{ width: 100%; margin-top: 0.217rem;}
.products-area .top .name { color: #333333; font-size: .398rem; font-weight: 400;    text-align: left;}
#app .md-toolbar{ padding: 0;}
.products-area .top { background: #fff;font-weight: normal; padding: 0.362rem 0 0 0;}
.products-area .top p { color: #999999;font-size: 0.217rem;line-height: 0.44rem;}
.u-jbmark .u-tsize {text-align: center; color: #e71a19;font-family: arial;font-size: 0.483rem;padding: 0.362rem 0;}
.u-jbmark .u-tsize span {font-size: 0.724rem;}
.u-info .u-left h4, .u-info .u-right h4 { font-size: 0.301rem;color: #333333; font-weight: 400;}
.u-info .u-right { width: 30%;text-align: right;}
.u-info .u-left { width: 30%; text-align: left;}
.u-info { overflow: hidden;}
.products-area .u-but{border:none;background:none;}
#app .u-lazycow a {background: #ecc346; width: 6.44rem;height: 0.821rem; color: #fff; font-size: 0.314rem;line-height: 0.821rem; text-align: center; border-radius: 0.8rem;display: block;}
.u-but p ,.u-lazycow p{ font-size: 0.217rem;color: #888888; text-align: center;padding-top: 0.205rem;}
.u-but ,.u-lazycow { clear: both; margin: 0.410rem auto 0.205rem; width: 6.44rem;}
.u-info .u-right h4 span {font-size: 0.301rem; color: #ecc346;font-family: arial;}
.u-info .u-left p, .u-info .u-right p { font-size: 0.217rem; color: #999; line-height: 0.44rem;}
</style>
