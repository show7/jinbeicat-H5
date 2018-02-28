<template>
	<ul class="prolist-container">
		<li class="list"  v-for="(str,index) in prolists" @click='showdetails(str.id)' :index="index">
			<div class="top">{{str.name}}<span v-if='sign != ""' v-for='sign in str.signs' class='sign'>{{sign}}</span><img src="../../../static/img/activity/hammer.png"></div>
			<div class="bottom">
				<ul class="u1">
					<li class="rate">
						<div class="up"><span class="num">{{str.rate}}</span>%<span>{{str.awardRate}}</span></div>
					</li>
					<li class="time">
						<div class="up" ref="time">{{str.time}}</div>
					</li>
					<li class="in">
						<div class="up"><a href="javascript:;" :class="{status1:str.status=='立即抢购',status2:str.status=='复审中'||str.status=='计息中'||str.status=='回款中',status3:str.status=='已回款'}">{{str.status}}</a></div>
					</li>
				</ul>
				<ul class="u2">
					<li class="rate">
						<div class="down">历史年化收益率</div>
					</li>
					<li class="time">
						<div class="down">项目周期</div>
					</li>
					<li class="in">
						<div class="down">即投即生息</div>
					</li>
				</ul>
			</div>
		</li>
		
	</ul>
</template>
<script>
	export default {
		props:['prolists'],
		data(){
			return{
				//index:10,
				prolists1:[]
			}
		},
		methods: {
         showdetails(tid) {
         	//点击设置存储pid
        	sessionStorage.setItem("showTaskDetail", tid);
        	// console.log()
        	this.$router.push({path:'/prolist/details'});
          },


        },
		mounted:function(){
		}
	}
</script>
<style scoped>
.prolist-container .list .top img{width: 0.489rem;height: 0.489rem;display: inline-block; margin-left: 3%;}
.prolist-container .list{margin-bottom:0.181rem;padding:0.302rem;background: #fff;}
.prolist-container .list .top{font-size: 0.278rem;text-align: left;}
.prolist-container .list .rate{width: 34%;}
.prolist-container .list .time{width: 34%;}
.prolist-container .list .in{width: 32%;}
.prolist-container .list .rate .up{color:#e71a19;text-align: left;}
.prolist-container .list .time .up{color:#ecc346; text-align: center;}
.prolist-container .list .bottom{margin-top:0.242rem;}
.prolist-container .list ul{overflow: hidden;}
.prolist-container .list .u1{margin-bottom:0.302rem;}
.prolist-container .list .u1 li{display: inline-block;line-height: 0.574rem;}
.prolist-container .list .u1 .in,.prolist-container .list .u2 .in{text-align: right;}
.prolist-container .list .up{font-size: 0.332rem;}
.prolist-container .list .up .num{font-size:0.574rem;}
.prolist-container .list .up a{font-size:0.278rem;width: 1.497rem;height: 0.519rem;border-radius:0.248rem;line-height: 0.519rem;display:inline-block;text-align: center; color: #fff;}
.prolist-container .list .up a:hover{text-decoration: none;}
.prolist-container .list .up a.status1{background: #ecc346;}
.prolist-container .list .up a.status2{color:#ecc346;background:#fff;border:1px solid #ecc346;}
.prolist-container .list .up a.status3{background: #f0f0f0;color: #999;}
.prolist-container .list .bottom ul{overflow: hidden;}
.prolist-container .list .bottom ul li{float:left;}
.prolist-container .list .bottom .down{color: #888;font-size: 0.217rem;text-align: center;}
.prolist-container .list .bottom .u2 .rate .down{text-align: left;}
.prolist-container .list .bottom .in .down{text-align: right;}
.sign{border: 1px solid red;font-size:  0.2rem;color:#f23648;border-radius: 0.03rem;margin-left: 0.060rem;display: inline-block;padding:0.02rem 0.03rem;/*box-sizing: border-box;*/}
</style>