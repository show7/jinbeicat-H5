<template>
	<div class="u-regular">
	    <div class="top"> <h2 class="name">金贝定期</h2> <p>单次购买起点100元，以100元的整数倍递增</p></div>
	    <ul class="products-area">
			 	<li class="u-jbmark" v-for="(str,index) in prolists" v-if="index<5" @click='showdetails(str.id)'>
			 		<div class="top clearfix"><i class="icon" :class='str.show?"icon1":"icon2"'>{{str.txt}}</i> <h3 class="name">{{str.name}}<span v-if='sign != ""' v-for='sign in str.signs' class='sign'>{{sign}}</span></h3>		 			
			 			<img src="../../static/img/activity/hammer.png"> </div>
			 		<div class="u-tsize"><span>{{str.rate}}</span>%{{str.awardRate}}</div>
			 		<div class="u-info">
			 			<div class="fl u-left"> <h4>{{str.time}}</h4> <p>期限</p> </div>
			 			<div class="fr u-right"> <h4><span>{{str.amount}}</span>元</h4> <p>剩余可投</p> </div>
			 		</div>
			 		<div class="u-but"> 
			 			<a href="javascript:;" :class="{status1:str.status=='立即抢购',status2:str.status=='复审中'||str.status=='计息中'||str.status=='回款中',status3:str.status=='已回款'}">{{str.status}}</a>
			 		</div>
			 	</li>
		</ul>
       <p class="attention">市场有风险，投资需谨慎</p>
	</div>
</template>

<script>
	export default {
		props:['prolists'],
		methods: {
         showdetails(tid) {
         	//点击设置存储pid
        	sessionStorage.setItem("showTaskDetail", tid);
        	this.$router.push({path:'/prolist/details'});
          }      
        },
        mounted:function(){
		}
	}
</script>

<style scoped>
.u-regular{}
.task-lists .top { padding:0.262rem 0.362rem 0.182rem ; background: #fff;text-align: left;}
.task-lists .top .name {color: #333333;font-size: .398rem; font-weight: 400; }
.task-lists .top p { color: #999999; font-size: 0.217rem; line-height: 0.44rem;padding-top: 3%;}
.p_main{margin-top: 0.217rem;}
.products-area .u-jbmark{background: #fff;overflow: hidden;padding: 0 0.362rem; border-bottom: 1px solid #E7E7E7;    text-align: left;}
.products-area .u-jbmark .top{ padding:0.262rem 0 0; overflow: hidden;}
.products-area .top p { color: #999999;font-size: 0.217rem;line-height: 0.44rem;}
.u-jbmark .u-tsize {text-align: center; color: #e71a19;font-family: arial;font-size: 0.483rem;padding: 0.362rem 0;}
.u-jbmark .u-tsize span {font-size: 0.724rem;}
.u-info .u-left h4, .u-info .u-right h4 { font-size: 0.301rem;color: #333333; font-weight: 400;}
.u-info .u-right { width: 30%;text-align: right;}
.u-info .u-left { width: 30%; text-align: left;}
.u-info { overflow: hidden;}
.products-area .top .name { color: #333333; font-size: .398rem; font-weight: 400;    text-align: left;}
.products-area .u-jbmark .top h3{ color: #333; font-size: 0.362rem;float: left;}
.products-area .u-jbmark .top .icon{ width: 0.374rem; height: 0.374rem;line-height: 0.374rem;font-size: 0.241rem;border-radius: 0.2rem; display: inline-block; color: #fff;float: left;margin-right: 2%; text-align: center;}
.products-area .u-jbmark .top .icon1{ background: #f23648;}
.products-area .u-jbmark .top .icon2{ background: #418bde;}
.attention { color: #CCC;font-size: 0.193rem;padding: 3% 0;text-align: center;}
#app .u-but a{ font-size: 0.314rem; width: 6.44rem;  height: 0.821rem;border-radius: 0.8rem;line-height: 0.821rem;display:inline-block;text-align: center; color: #fff;}
#app .u-but a:hover{text-decoration: none;}
#app .u-but a.status1{background: #ecc346;}
#app .u-but a.status2{color:#ecc346;background:#fff;border:1px solid #ecc346;}
#app .u-but a.status3{background: #f0f0f0;color: #999;}
/*#app .u-but .status1{background: #ecc346; width: 6.44rem;  height: 0.821rem; color: #fff;  font-size: 0.314rem; line-height: 0.821rem; text-align: center; border-radius: 0.8rem; display: block;}
#app .u-but .status2{background: #fff; width: 6.44rem; border: 1px solid #e71a19;  height: 0.821rem; color: #e71a19;  font-size: 0.314rem; line-height: 0.821rem; text-align: center; border-radius: 0.8rem; display: block;}
#app .u-but .status3{background: #fff; width: 6.44rem; border: 1px solid #cccccc;  height: 0.821rem; color: #cccccc;  font-size: 0.314rem; line-height: 0.821rem; text-align: center; border-radius: 0.8rem; display: block;}*/
#app .u-but{ margin: 0.340rem auto;}
.products-area .u-jbmark .top img{ width: 0.489rem; height: 0.489rem; margin-left: 3%;display: inline-block}
.sign{
		border: 1px solid red;
		font-size:  0.2rem;
		color:#f23648;
		border-radius: 0.03rem;
		margin-left: 0.060rem;
		display: inline-block;
		padding:0.02rem 0.03rem;
		/*box-sizing: border-box;*/
	}
</style>
