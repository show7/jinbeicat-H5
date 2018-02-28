<template>
	<div>
		<div class="bg1">
			<div class="area1"></div>
		</div>
		<div class="bg2">
			<div class="area2">
				<p class="fw20">38度的炎热酷暑，空调，西瓜和WIFI都难解燥热，心中不快，何以为解呢？不如………去撩撩身边的朋友吧！</p>
				<p>凡是金贝猫平台注册用户均可推荐（邀请）好友前来注册投资，有钱一起赚，才是好伙伴哦~是不是壕……朋友，是时候邀出来616喽~</p>
			</div>
		</div>
		<div class="bg3">
			<div class="area3">
				<p>每推荐一位好友并成功注册，推荐人和好友均可领取20元现金红包</p>
				<div class="u-bgred">
					<p><span class="f-size">20</span>元 <span class="flw20">现金红包</span></p>
					  <router-link to="/prolist" class="u-but">立即使用</router-link>
					<!--<a href="" class="u-but"></a>-->
				</div>
			</div>
		</div>
		<div class="bg4">
			<div class="area4">
				<P>好友注册后并投资，推荐人得好友年化投资金额 0.5% 的红包福利！</br>小小奖励，不成敬意，拿去买根雪糕消消暑啦~</P>
			    <p class="f-size">举例：</p>
			    <table>
			    	<tr>
			    		<th width="25%">好友投资金额  </th>
			    		<th width="17%">项目期限</th>
			    		<th width="25%">奖励年化利息</th>
			    		<th width="33%"  class="u-right">推荐人红包金额</th>
			    	</tr>
			    	<tr>
			    		<td>10000元  </td>
			    		<td> 1年</td>
			    		<td>0.5%	</td>
			    		<td class="u-right">10000*0.5%=50元</td>
			    	</tr>
			    	<tr class="u-right1" ><td colspan="4">返佣计算：本金*年化*锁定期</td></tr>
			    </table>
			     <div class="u-but" @click ="invitation">立即邀请</div>
			    <!--<a href="/login.html" ></a>-->
			</div>
		</div>
		<div class="bg5">
			<div class="area5">
				<div class="u-title">活动规则</div>
				<ul>
					<li>①  好友注册成功后，20元红包立即发放至您的账户。</li>
					<li>②  好友投资后，奖励红包于次日发放至您的账户。</li>
					<li>③  好友注册成功后，推荐专享注册红包立即发放至好友账户。</li>
					<li>④  活动解释权在法律允许范围内归金贝猫所有。</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{

		}
	},
	methods:{
		invitation(){
			var token = sessionStorage.getItem('userAccessToken')
			if(token==null){
				this.$router.push({path:"/login"})
			}else{
				this.$router.push({path:"/Account/Invite"})
			}
		}
		
	}
}
</script>

<style  scoped>
table { border-collapse: collapse;border-spacing: 0;}
.bg1{background: #efeff4 url(../../../static/img/activity/activity5/banner.png) 50% 0 no-repeat;width:100%; background-size: 7.5rem 2.717rem; margin:0 auto;  height:2.717rem;}
.area1{width:90%; height:2.717rem; margin:0 auto; position:relative;}
.bg2{background: #efeff4 url(../../../static/img/activity/activity5/bg.png) 50% 0 no-repeat;width:100%; margin:0 auto;  height:2.682rem;background-size: 7.5rem 2.682rem;}
.area2{width:90%; height:2.282rem; margin:0 auto; position:relative;}
.area2 .fw20 {padding-top: 7%;}
.area2 p {font-size: 0.184rem;color: #fff;text-align: left;width: 80%;margin: 0 auto;padding-top: 2%;line-height: 0.34rem;}
.bg3 { background: #efeff4 url(../../../static/img/activity/activity5/bg1.png) 50% 0 no-repeat;width: 100%;margin: 0 auto;height: 3.339rem; background-size: 7.5rem 3.339rem;}
.area3{width:90%; height:3.339rem; margin:0 auto; position:relative;}
.area3 p{ font-size: 0.184rem; color: #fff;  text-align: left; width: 86%; margin: 0 auto; padding-top: 10%;}
.area3 .u-bgred{ background: url(../../../static/img/activity/activity5/bg5.png) no-repeat; width: 3.266rem; height: 1.280rem; background-size: 3.266rem 1.280rem; margin: 8% auto 0;}
.area3 .u-bgred p{width:  3.266rem; text-align: center; font-size: 0.217rem; color: #fff; padding:5% 0;}
.area3 .u-bgred .f-size{ font-size: 0.519rem; color: #fff;font-weight: bold;font-family: Arial;}
.area3 .u-bgred .flw20{ padding-left: 5%;}
#app .area3 .u-bgred .u-but{ display: block; width: 3.266rem; height: 0.492rem;line-height: 0.492rem; border: none;background: none; font-size: 0.169rem; color: #f64a3d; text-align: center;margin: 0 auto;}
.bg4 {background: #efeff4 url(../../../static/img/activity/activity5/bg2.png) 50% 0 no-repeat;width: 100%; margin: 0 auto;height: 5.1147rem; background-size: 7.5rem 5.1147rem;}
.area4{width:90%; height:5.1147rem; margin:0 auto; position:relative;}
.area4 p{ font-size: 0.184rem; color: #fff;  text-align: left; width:80%; margin: 0 auto; padding-top: 10%;line-height: 0.34rem;}
.area4 .f-size{ font-size: 0.144rem; padding:3% 0 0;}
.area4  table{width:90%; margin: 3% auto 0; font-size: 0.144rem; color: #fff;}
.area4  table tr th,.area4  table tr td{ height: 0.38rem; line-height: 0.38rem; border-right: 1px solid #fff; text-align: center;}
.area4  table tr{border-top: 1px solid #fff;}
.area4 .u-right{ border: none;}
.area4 .u-right1{border-bottom: 1px solid #fff; }
.area4 .u-right1 td{ border-right: none;text-align: left;padding-left: 24px;}
.area4 .u-but{ display: block; background: url(../../../static/img/activity/activity5/but.png) no-repeat; width: 1.962rem; background-size:1.962rem  0.356rem; height: 0.356rem; line-height:0.356rem; font-size:0.144rem; text-align: center; margin:5% auto 0; color: #fff; border: none;}
.bg5{background: #65701d;width:100%; margin:0 auto;  height:3.1rem;}
.area5{width:90%;height:2.425rem; margin:0 auto; position:relative;}
.area5 .u-title{ width: 0.917rem; height: 0.299rem; line-height:  0.299rem; font-size: 0.1449rem; color: #65701d; background: #fff; border-radius:0.8rem; text-align: center; }
.area5{ width: 80%; margin:  0 auto; padding: 3% 0 5% 0;}
.area5 ul li{ font-size: 0.144rem; color: #fff;line-height: 0.34rem;}
.area5 ul{ padding-top:6%;}	
</style>