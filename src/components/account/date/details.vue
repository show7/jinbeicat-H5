<template>
	<div class="body">
		<header class="u-header"> <a class="back" href="javascript:history.back();"><img src="../../../assets/img/left.png"></a>投资详情</header>
		<div class="bg1">
			<p class="aMoney">金额（元）</p>
			<div class="aInvestment"><span class="money" v-text="data.totalAmount">803.31</span><span class="button" v-if="data.status!='N'">已回款</span><span class="button" v-if="data.status == 'N'">待回款</span></div>
			<div class="PrincipalIncome">
				<div>
					<p class="info">本金（元）</p>
					<p v-text="data.principal"></p>
				</div>
				<div>
					<p class="info">收益（元）</p>
					<p v-text="data.earnings"></p>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="productName"><span class="icon"></span><span class="text">产品名称</span><span class="text1">{{data.title}}</span></div>
			<div class="term"><span class="icon"></span><span class="text">期限</span><span class="text1">{{data.cycle}}</span></div>
			<div class="annualRate"><span class="icon"></span><span class="text">年化率</span><span class="text1">{{data.rate}}</span>%</div>
			<div class="investmentTime"><span class="icon"></span><span class="text">投资时间</span><span class="text1">{{data.createTime}}</span></div>
			<div class="dateofReturn"><span class="icon"></span><span class="text">回款日期</span><span class="text1">{{data.backTime}}</span></div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				data:{},
				str:{productName:"月月盈105",term:'30天',annualRate:"8.88%",investmentTime:"2017年12月14日",dateofReturn:'2017年12月14日'}
			}
		},
		created(){
			let backTime = this.$route.query.backTime
			let createTime = this.$route.query.createTime
			let cycle = this.$route.query.cycle
			let title = this.$route.query.title
			let rate = this.$route.query.rate
			let totalAmount =this.$route.query.totalAmount
			let earnings = this.$route.query.earnings
			let principal =this.$route.query.principal  
			let status = this.$route.query.status
			let inforObj={backTime:backTime,createTime:createTime,cycle:cycle,title:title,rate:rate,totalAmount:totalAmount,earnings:earnings,principal:principal,status:status}
			this.data=inforObj
			console.log(inforObj);
		}
	}
</script>
<style>
	body{
		background-color:#fff;
		height: 100%;
	}
	.bg1{
		background: #e71a19;
		color: #fff;
		text-align: center;
		padding: 0.483rem 0 0.767rem 0;
	}
	.aMoney{
		text-align: center;
		font-size: 0.314rem;
	}
	.aInvestment .button{
		display: inline-block;
		width:60px;
		height: 22px;
		border:1px solid solid;
		font-size: 0.193rem;
		color: white;
		vertical-align: top;
		border: 1px solid #fcfcfc;
		border-radius: 0.5rem;
		margin-left: 0.2rem;
		line-height: 22px;
		opacity: 0.8;
	}
	.aInvestment{
		margin-top: 0.543rem;
	}
	.aInvestment .money{
		font-size: 0.579rem;
	}
	.PrincipalIncome{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 60%;
		margin: auto;
		margin-top: 0.543rem;
		font-size: 0.277rem;
	}
	.PrincipalIncome .info{
		
		font-size: 0.241rem;
	}
	.content{
		padding: 0.501rem 0.380rem 0 0.380rem;
		font-size: 0.314rem;
	}
	.content div{
		border-bottom: 1px solid #ededed;
		line-height: 0.8rem;
	}
	.content .text{
		display: inline-block;
		width: 25%;
		/*border:1px solid red;*/
	}
	.content .text1{
		display: inline-block;
		/*width: 20%;*/
		/*border:1px solid red;*/
		color: #666666;
	}
	.content .productName .icon{
		display: inline-block;
		width: 0.398rem;
		height: 0.392rem;
		background: url(../../../../static/img/date/productName.png);
		background-repeat: no-repeat;
		background-size: 100%;
		vertical-align: middle;
		margin-right: 0.246rem;
	}
	.content .term .icon{
		display: inline-block;
		width: 0.398rem;
		height: 0.398rem;
		background: url(../../../../static/img/date/term.png);
		background-repeat: no-repeat;
		background-size: 100%;
		vertical-align: middle;
		margin-right: 0.246rem;
	}
	.content .annualRate .icon{
		display: inline-block;
		width: 0.398rem;
		height: 0.289rem;
		background: url(../../../../static/img/date/annualRate.png);
		background-repeat: no-repeat;
		background-size: 100%;
		vertical-align: middle;
		margin-right: 0.246rem;
	}
	.content .investmentTime .icon{
		display: inline-block;
		width: 0.398rem;
		height: 0.471rem;
		background: url(../../../../static/img/date/investmentTime.png);
		background-repeat: no-repeat;
		background-size: 100%;
		vertical-align: middle;
		margin-right: 0.246rem;
	}
	.content .dateofReturn .icon{
		display: inline-block;
		width: 0.398rem;
		height: 0.422rem;
		background: url(../../../../static/img/date/dateofReturn.png);
		background-repeat: no-repeat;
		background-size: 100%;
		vertical-align: middle;
		margin-right: 0.246rem;
	}
	
</style>