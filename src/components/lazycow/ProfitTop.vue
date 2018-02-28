<template>
	<div class="profit_top">
        <lazycow-list :lazylist='lazylist'></lazycow-list>
        <div class="profit_txt">
        	<div class="list_title"><i></i>金贝零钱</div>
        	<div class="list_content">
        		<div class="list">
        			<p><i class="icon icon1"></i>产品特点</p>
        			<p>兼顾投资收益与流动性；收益高于货币基金，灵活理财。</p>
        		</div>
        		<div class="list">
        			<p><i class="icon icon2"></i>投资范围</p>
        			<p>存款、货币市场基金等流动性资产，以及符合监管要求的短期债权类资产。</p>
        		</div>
        		<div class="list">
        			<p><i class="icon icon3"></i>资产配置</p>
        			<p><img src="../../assets/img/table_img.png" alt=""></p>
        		</div>
        		<div class="list">
        			<p><i class="icon icon4"></i>购买规则</p>
        			<p>单次购买起点100元，以0.01元的整数倍递增。</p>
        		</div>
        		<div class="list">
        			<p><i class="icon icon5"></i>理财计划份额</p>
        			<p>理财计划份额以人民币计价，单位为1份，每份面值为人民币1元。</p>
        		</div>
        		<div class="list">
        			<p><i class="icon icon6"></i>收益分配</p>
        			<p>每日结算计算收益。</p>
        		</div>
        		<div class="list">
        			<p><i class="icon icon7"></i>起息日</p>
        			<p>委托人（投资人）在D日15:00前提交的有效投资申请，受托人将在D+1日起计算收益,在D日15:00之后提交的有效投资申请，受托人将在D+2起计算收益(非工作日投资计息不受影响)。</p>
        		</div>
        		<div class="list">
        			<p><i class="icon icon8"></i>平台免责声明</p>
        			<p>金贝猫作为交易服务平台进行信息发布，不以任何明示、默示或其他方式对任何委托人（投资人）及/或任何交易提供任何担保。金贝猫平台提供的各种信息及资料仅供参考，委托人（投资人）应依其独立判断做出决策。委托人（投资人）据此进行投资交易的，产生的投资风险由委托人（投资人）自行承担，金贝猫不承担任何责任。</p>
        		</div>
        		<div class="list">
        			<p><i class="icon icon9"></i>常见问题解答</p>
        			<p>
        				<ul>
        					<li><i>1</i>金贝猫的理财计划有几种？</li>
        					<li>目前，金贝猫推出的理财计划期限有金贝零钱、1、3、6、12和24个月金贝定存，后期会根据实际情况推出更多期限产品供投资者选择。</li>
        					<li><i>2</i>金贝猫什么时候启动优先投标？</li>
        					<li>加入金贝计划后（不需满额）即可立即启动优先匹配投标。</li>
        					<li><i>3</i> 金贝猫赎回规则？</li>
        					<li>单人单日赎回上限为10万。T+0到达账户余额，具体请以实际到账时间为准。</li>
        					<li><i>4</i>提现费用？</li>
        					<li>每人每月有3次免费提现机会，之后每次2元。</li>
        					<li><i>5</i>金贝计划结清期限怎么计算？</li>
        					<li>金贝计划结清期限为所投资标的到期当日。</li>
        				</ul>
        			</p>
        		</div>
        	</div>
        </div>
        <div class="profit_btn" v-show="show">
       		<table>
       			<td>
       				<a href="javascript:;" class="out" @click="rollout">转出</a>
       			</td>
       			<td>
       				<a href="javascript:;" class="in" @click="rollin">转入</a>
       			</td>
       		</table>
        </div>
	</div>
</template>
<script> 
    import LazycowList from './LazycowList'
    export default {
        data() {
            return{
                show:'',
                lazylist:{}
            }
        },
        components: {
            LazycowList 
        },
        methods: {
            rollout(){
                var el=document.getElementsByClassName('dialog_out')[0];
                el.style.display="block";
            },
             rollin(){
                var el=document.getElementsByClassName('dialog_in')[0];
                el.style.display="block";
            }     
        },
        created: function () { 
            var token = sessionStorage.getItem('userAccessToken')
            if (token == null) {
              this.$router.push({ path: '/login' })
            }else{
                //判断是否开通金贝零钱
                var info = this.queryAjax('qapi/current/account.do', 'post',{},token)
               // console.log(info)
                if(info.head.code!="0000"){
                    //没有开通金贝零钱的账户
                    //显示没有开通金贝零钱的页面
                    this.lazylist.showState2=1;
                    //开通页面
                    this.lazylist.showState1=0;
                    this.show=false;
                }
                else{
                    this.lazylist.showState2=0;
                    //开通页面
                    this.lazylist.showState1=1;
                     this.show=true;
                    //console.log(info)
                    var infoList=info.body.ca;
                   // console.log(infoList)
                    this.lazylist.amount=(info.body.lucre/100).toFixed(2);
                    this.lazylist.money=(infoList.currentBalance/100+infoList.currentLucre/100).toFixed(2);
                    this.lazylist.income1=(infoList.totalLucre/100).toFixed(2);
                   //  this.lazylist.income2="2.7";
                   //  this.lazylist.rate='9.88%';
                    var user = this.serviceAjax('api/systemConfig/pocketRate.do','get',{},token)
                    // console.log(user)
                     if(user.head.code=='0000'){
                         this.lazylist.income2=user.body.value;
                         this.lazylist.rate=user.body.rate;
                     }else{
                        this.$dialog.notify({
                        mes:user.head.memo,
                        timeout: 3000})
                     }
                }
                  
            }
        }
    }
</script>
<style scoped>
	.profit_top{
        overflow:hidden;
        margin-top:0.774rem;
    }
    .profit_top .profit_txt{
        margin-bottom:3rem;
    }
    .profit_top .profit_txt .list{
    	padding: 0.302rem 0.272rem;
    	border-bottom:1px solid #e7e7e7;
    }
    .profit_top .profit_txt .list:last-child{
        border-bottom:none;
    }
    .profit_top .profit_txt .list_title{
    	font-size: 0.278rem;
    	padding: 0.302rem;
    	border-bottom:1px solid #e7e7e7;
        text-align: left;
    }
    .profit_top .profit_txt .list p{
    	font-size: 0.242rem;
    	line-height:auto;
    	text-align: justify;
    }
    .profit_top .profit_txt .list p:first-child{
    	margin-bottom:0.302rem;
    }
    .profit_top .profit_txt .list p img{
    	width:3.140rem;
    	height: 0.960rem;
    }
    .profit_top .profit_txt .list p i{
    	display: inline-block;
    	width: 0.362rem;
    	height: 0.362rem;
    	background-size:100% 100%;
    	background-repeat:no-repeat;
    	vertical-align: middle;
        margin-right: 0.242rem;
    }
    .profit_top .profit_txt .list p i.icon1{
        background-image:url(../../assets/img/icon1.png);
    }
    .profit_top .profit_txt .list p i.icon2{
        background-image:url(../../assets/img/icon2.png);
    }
    .profit_top .profit_txt .list p i.icon3{
        background-image:url(../../assets/img/icon3.png);
    }
    .profit_top .profit_txt .list p i.icon4{
        background-image:url(../../assets/img/icon4.png);
    }
    .profit_top .profit_txt .list p i.icon5{
        background-image:url(../../assets/img/icon5.png);
    }
    .profit_top .profit_txt .list p i.icon6{
        background-image:url(../../assets/img/icon6.png);
    }
    .profit_top .profit_txt .list p i.icon7{
       background-image:url(../../assets/img/icon7.png);
    }
    .profit_top .profit_txt .list p i.icon8{
        background-image:url(../../assets/img/icon8.png);
    }
    .profit_top .profit_txt .list p i.icon9{
        background-image:url(../../assets/img/icon9.png);
    }
    .profit_top .profit_txt .list li{
    	line-height: 0.399rem;
    }
    .profit_top .profit_txt .list li:last-child{
        border-bottom:none;
    }
    .profit_top .profit_txt .list li i{
		display: inline-block;
		width: 0.242rem;
		height: 0.242rem;
		line-height: 0.242rem;
		background: #c08542;
		color: #fff;
		border-radius: 100%;
		text-align: center;
		font-style: normal;
		margin-right:0.211rem;
    }
    .profit_top .profit_txt .list_title i{
    	display: inline-block;
    	width:0.332rem;
    	height: 0.393rem;
    	background: url(../../assets/img/profit_title.png) no-repeat;
    	background-size:100%;
    	vertical-align: middle;
    	margin-right: 0.121rem;
    }
    .profit_top .profit_btn{
    	padding:0.211rem 0.483rem;
    	font-size: 0.374rem;
    	position: fixed;
        bottom:0.9843rem;
        width: 100%;
        background: #fff;
    }
    .profit_top .profit_btn a{
    	display: inline-block;
    	color:#ecc346;
    	border-radius:0.362rem;
    	text-align: center;
    	width:2.603rem;
    	height: 0.725rem;
    	line-height:0.725rem;
        border:0;
    }
    .profit_top .profit_btn table{
    	width:100%;
    }
    .profit_top .profit_btn table{
    	text-align: center;
    }
    .profit_top .profit_btn a.in{
    	border:1px solid #ecc346;
    }
    .profit_top .profit_btn a.out{
		color:#fff;
		background: #ecc346;
		border:1px solid transparent;
    }
</style>

