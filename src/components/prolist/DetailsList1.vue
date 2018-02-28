<template>
	<div class="entry">
		<div class="entry-list" >
			<div class="entry-title"><i></i>融资主体</div>
			<div class="entry-content">
				<p>
					<label>融资主体 </label>
					<span>{{entry.description}}</span>
				</p>
				<p>
					<label>资金用途</label>
					<span>补充项目方运营投入</span>
				</p>
				<p>
					<label>还款来源</label>
					<span>企业经营收入</span>
				</p>
			</div>
		</div>
		<div class="entry-list">
			<div class="entry-title"><i></i>尽职调查</div>
			<div class="entry-content">
				<p>
					<label>尽职调查 </label>
					<span>企业营业执照/开户许可证</span>
				</p>
				<p>
					<label>征信</label>
					<span>企业征信报告/企业实际控制人个人征信报告</span>
				</p>
				<p>
					<label>企业经营</label>
					<span>查看企业业务合同、投资情况</span>
				</p>
				<p>
					<label>担保债权</label>  
					<span>审查担保债权相关业务合同并与次债务人确认确保担保债权真实存在</span>
				</p>
			</div>
		</div>
		<div class="entry-list">
			<div class="entry-title"><i></i>分控保障</div>
			<div class="entry-content">
				<p>
					<label>贷后监控   </label>
					<span> 金贝猫动态监控企业经营情况，确保还款正常融资方与金贝猫建立共管账户，共同监管资金流向</span>
				</p>
				<p>
					<label>补充还款来源 </label>
					<span>公司股东签订无限连带责任担保，在企业无法足额还款时作为流动资金补充公司提供双倍于融资额的债权质押担保，确保还款来源</span>
				</p>
				<p>
					<label>资金托管</label>
					<span>平台资金通过第三方金融机构托管，金贝猫不接触项目资金</span>
				</p>
			</div>
		</div>
		<div class="entry-list">
			<div class="entry-title"><i></i>购买规则</div>
			<div class="entry-content">
				<p>单次购买起点100元，以100元的整数倍递增。</p>
			</div>
		</div>
		<div class="entry-list">
			<div class="entry-title"><i></i>理财计划份额</div>
			<div class="entry-content">
				<p>理财计划份额以人民币计价，单位为1份，每份面值为人民币1元。</p>
			</div>
		</div>
		<div class="entry-list">
			<div class="entry-title"><i></i>收益分配</div>
			<div class="entry-content">
				<p>到期还本付息。</p>
			</div>
		</div>
		<div class="entry-list">
			<div class="entry-title"><i></i>起息日</div>
			<div class="entry-content">
				<p>委托人（投资人）在T日（含T日0点后到T日24点前）提交的有效投资申请，受托人将在T+1日确认投资份额，T+1日起计算收益。（T日为工作日）。</p>
			</div>
		</div>
		<div class="entry-list">
			<div class="entry-title"><i></i>平台免责声明</div>
			<div class="entry-content">
				<p>金贝猫作为交易服务平台进行信息发布，不以任何明示、默示或其他方式对任何委托人（投资人）及/或任何交易提供任何担保。金贝猫平台提供的各种信息及资料仅供参考，委托人（投资人）应依其独立判断做出决策。委托人（投资人）据此进行投资交易的，产生的投资风险由委托人（投资人）自行承担，金贝猫不承担任何责任。</p>
			</div>
		</div>
		<div class="entry-list">
			<div class="entry-title"><i></i>常见问题解答</div>
			<div class="entry-content">
				<p class="answer"><i>1</i>金贝猫的理财计划有几种？</p>
				<p class="question">目前，金贝猫推出的理财计划期限有金贝零钱、1、3、6、12和24个月金贝定存，后期会根据实际情况推出更多期限产品供投资者选择。</p>
				<p class="answer"><i>2</i>金贝猫什么时候启动优先投标？</p>
				<p class="question">加入金贝计划后（不需满额）即可立即启动优先匹配投标。</p>
				<p class="answer"><i>3</i>金贝猫赎回规则？</p>
				<p class="question">单人单日赎回上限为10万。T+0到达账户余额，具体请以实际到账时间为准。</p>
				<p class="answer"><i>4</i>提现费用？</p>
				<p class="question">每人每月有3次免费提现机会，之后每次2元。</p>
				<p class="answer"><i>5</i>金贝计划结清期限怎么计算？</p>
				<p class="question">金贝计划结清期限为所投资标的到期当日。</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		//传递属性
		props:['entry'],
		mounted:function(){
			
		}
	}
</script>
<style scoped>
	.entry .entry-list{
		padding: 0 0.272rem;
	}
	.entry .entry-title{
		color: #333;
		font-size: 0.278rem;
		padding:0.193rem 0;
		text-align: left;
	}
	.entry .entry-title i{
		display: inline-block;
		width: 0.314rem;
		height: 0.314rem;
		margin-right:0.272rem;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.entry .entry-list:nth-child(1) .entry-title i{
		background-image:url(../../assets/img/iconimg.png);
	}
	.entry .entry-list:nth-child(2) .entry-title i{
		background-image:url(../../assets/img/iconimg1.png);
	}
	.entry .entry-list:nth-child(3) .entry-title i{
		background-image:url(../../assets/img/iconimg2.png);
	}
	.entry .entry-list:nth-child(4) .entry-title i{
		background-image:url(../../assets/img/iconimg3.png);
	}
	.entry .entry-list:nth-child(5) .entry-title i{
		background-image:url(../../assets/img/iconimg4.png);
	}
	.entry .entry-list:nth-child(6) .entry-title i{
		background-image:url(../../assets/img/iconimg5.png);
	}
	.entry .entry-list:nth-child(7) .entry-title i{
		background-image:url(../../assets/img/iconimg6.png);
	}
	.entry .entry-list:nth-child(8) .entry-title i{
		background-image:url(../../assets/img/iconimg7.png);
	}
	.entry .entry-list:nth-child(9) .entry-title i{
		background-image:url(../../assets/img/iconimg8.png);
	}
	.entry .entry-content{
		color: #333;
		font-size: 0.24rem;
	}
	.entry .entry-content p{
		box-sizing: border-box;
		overflow: hidden;
		line-height:0.399rem;
	}
	.entry .entry-content label{
		display: inline-block;
		color: #999;
		/*padding-right:0.483rem;*/
		width:25%;
		float:left;
		text-align: left;
	}
	.entry .entry-content span{
		display: inline-block;
		width:75%;
		float: left;
		text-align: left;
	}
	.entry .entry-content p{
		text-align: left;
	}
	.entry .entry-content .answer i{
		width: 0.277rem;
	    height: 0.277rem;
	    background: #af7533;
	    color: #fff;
	    font-size: 0.12rem;
	    border-radius: 50%;
	    margin-right: 3%;
	    display: inline-block;
	    text-align: center;
	    line-height: 0.277rem;
	    font-style: normal;
	}
	.sign{
    border: 1px solid red;
    font-size: 0.2rem;
    color: #f23648;
    border-radius: 0.03rem;
    margin-left: 0.060rem;
    display: inline-block;
    padding: 0.02rem 0.03rem;
    /* box-sizing: border-box; */
}
</style>