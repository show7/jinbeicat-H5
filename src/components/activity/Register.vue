<template>
	<div>
		 <div class="bg1">
			<div class="area1"></div>
		</div>
		<div class="bg2">
			<div class="area2">
				<ul>
					<li>
						<div class="u-left fl"><span>￥</span>38</div>
						<div class="u-right fr">
							<p><span>6000</span> 元 起投</p>
							<p><span>30</span>天 有效期</p>
						</div>
					</li>
					<li>
						<div class="u-left fl"><span>￥</span>68</div>
						<div class="u-right fr">
							<p><span>12000</span> 元 起投</p>
							<p><span>30</span>天 有效期</p>
						</div>
					</li>
					<li style="margin-right: 0;">
						<div class="u-left fl"><span>￥</span>108</div>
						<div class="u-right fr">
							<p><span>16000</span> 元 起投</p>
							<p><span>30</span>天 有效期</p>
						</div>
					</li>
					<li>
						<div class="u-left fl"><span>￥</span>268</div>
						<div class="u-right fr">
							<p><span>26800</span> 元 起投</p>
							<p><span>30</span>天 有效期</p>
						</div>
					</li>
					<li>
						<div class="u-left fl"><span>￥</span>518</div>
						<div class="u-right fr">
							<p><span>51800</span> 元 起投</p>
							<p><span>30</span>天 有效期</p>
						</div>
					</li>
					<li style="margin-right: 0;">
						<div class="u-left fl"><span>￥</span>888</div>
						<div class="u-right fr">
							<p><span>88800</span> 元 起投</p>
							<p><span>30</span>天 有效期</p>
						</div>
					</li>
				</ul>
			     <router-link to="/Regist" class="u-but"><p>立即领取<span>1888</span>元现金红包</p></router-link>
			</div>
		</div>
		<div class="bg3">
			<div class="area3">
				<img src="../../../static/img/activity/activity6/bg1.png">
			</div>
		</div>
		<div class="bg4">
			<h4>活动规则</h4>
			<div class="area4">
				<ul>
					<li>①  活动时间：2017年*月*日，本活动仅针对在活动期间内首次注册的新用户（活动结束时间以官方公告为准）</li>
				    <li>②  每个用户仅奖励一次新手福利，后期可参与其他更多优惠活动。</li>
				    <li>③  所得红包直接发放新用户账户内，用户在“我的账户“可直接查看所得红包。</li>
				    <li>④  用户满足使用条件时，相应投资红包的现金金额将由系统直接发放到用户账户中。</li>
				    <li>⑤  在红包有效期内使用红包，可抵扣相应投资本金，产品到期后红包本金可自动到账户余额中。</li>
				    <li>⑥  单笔投资仅限使用单个现金红包，不支持累计使用。</li>
				    <li>⑦  本次活动最终解释权归金贝猫所有，如有疑问请拨打客服热线400-088-8057，或微信、微博搜索“金贝猫”关注即可咨询。</li>
				</ul>
			</div>
	   </div>
	</div>
	  
</template>

<script>
</script>

<style scoped>
body{background: #ffe69c;}
.fl{ float: left;}
.fr{ float: right;}
.bg1{background: #fffcdb url(../../../static/img/activity/activity6/banner.png) 50% 0 no-repeat;width:100%; background-size:7.5rem 3.43rem; margin:0 auto;  height:3.43rem;}
.area1{width:90%; height:3.43rem; margin:0 auto; position:relative;}
.bg2{background: #fffcdb ;width:100%; margin:0 auto;  height:3.9rem;}
.area2{width:97%; height:3.9rem; margin:0 auto; position:relative; text-align: center;padding-top: 5%;}
.area2 ul{ overflow: hidden;}
.area2 ul li{ background: url(../../../static/img/activity/activity6/bgimg.png) no-repeat; width: 2.346rem;background-size:2.346rem 0.905rem;  height:0.905rem;float: left;margin:0.08rem 0.04rem;}
.area2 ul li .u-left{ width:35%;font-size: 0.434rem; color: #fff;font-weight: 400; position: relative;    padding-left: 11%;    line-height: 0.94rem;}
.area2 ul li .u-left span{ font-size: 0.332rem; color: #fff; position: absolute; top:-17%;left: 2%; }
.area2 ul li .u-right{ width: 49%;color: #560b0f; font-size:0.132rem; padding: 5% 0 0 0; text-align: right;padding-right: 2%;}
.area2 ul li .u-right p span{ color: #e94a25;font-size: 0.132rem;font-weight: bold; }
.area2 .u-but{ background: url(../../../static/img/activity/activity6/butimg.png) no-repeat;background-size:3.689rem 0.543rem; display: block ; clear: both;width:3.689rem; height:0.543rem; text-align: center; margin: 10% auto 0;font-size: 0.193rem;  border: none; color: #fff;}
.area2 .u-but span{font-size: 0.2294rem; color: #fff;font-weight: bold;}
.area2 .u-but p{height:0.44rem;    line-height: 0.44rem; padding-top: 0;color: #FFF}
.bg3{background: #fffcdb ;width:100%; margin:0 auto;  height:5.1rem;}
.area3{width:100%; height:5.1rem; margin:0 auto; position:relative; text-align: center;}
.area3 img{ width: 7.5rem;height: 4.915rem;}
.bg4{background: #ffe69c ;width:100%; margin:0 auto;  height:6rem;}
.area4{width:90%;height:5rem; margin:0 auto; position:relative; text-align: center;}
.bg4 h4{ background: url(../../../static/img/activity/activity6/butimg2.png) no-repeat;background-size:2.173rem 0.567rem; width: 2.173rem; height: 0.567rem; line-height: 0.567rem; font-size: 0.217rem; font-weight: bold; color: #ffe69c; text-align: center;}
.area4 ul li{ font-size: 0.184rem; color: #815743; text-align: left;line-height: 0.34rem;}
.area4 ul{ padding-top: 5%;}
</style>