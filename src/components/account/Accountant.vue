<template>
	<div class="accountant">
		<header class="u-header"> <a class="back" href="javascript:history.back();"><img src="../../assets/img/left.png"></a>理财师</header>
		<div class="u-Comm">
			<div class="accountant u-hide" v-show="state1">
		        <div class="u-bg1"><img src="../../assets/img/account/bglicai.png"></div>
		        <div class="u-Commission">
		          	您每日的佣金：=（邀请队员的总待收本金 x 佣金率）÷365
		        </div>
		        <div class="u-ul">说明：佣金每日凌晨发放至个人账户</div>
		        <yd-button @click.native="openConfrim" size="large" id="joinIn" class="join-in" href="javascript:;">点击加入金贝猫理财师</yd-button>
		       <!--  <a id="joinIn" class="join-in" href="javascript:;" @click="join">点击加入金贝猫理财师</a> -->
		    </div>
    		<div class="u-Open" v-show="state2">
       			 <h2>人人理财师</h2>
		         <div class="rollout clearfix">
		         	  <i><img src="../../assets/img/account/icon5.png"></i>
		         	  <span>可转出金额（元）</span>
					      <p>{{accountant.account}}</p>
					      <yd-button @click.native="moneyout" size="large" class="moneyout">转出至账户余额</yd-button>
					      <!-- <button class="moneyout">转出至账户余额</button> -->
					  </div>
					  <h2>理财师数据统计</h2>
					  <div class="clearfix rollouts">
		         	  <dl class="tlBorder">
						      <dt>队员待收本金（元）</dt>
						      <dd><span class="u-bej">{{accountant.referralDueInCapital}}</span></dd>
						    </dl>
						     <dl class="tlBorder">
		                  <dt>已获取奖励（元）</dt>
		                 <dd><span class="totalAward">{{accountant.totalAward}}</span></dd>
		             </dl>
					  </div>
					   <h2>佣金计算公式</h2>
					   <p class="u-text"><span>您每日的佣金：=（邀请队员的总待收本金x 佣金率）÷365</span>
		                  <!-- （当天您的待收本金达到1000元及以上才可获得佣金）--></p> 
		          <h2>佣金记录</h2>
           			<div class="miiddle">
			      <h2 class="accountant-top">我的佣金记录</h2>
			      <table id="yongjin" class="yongjin-table" width="100%" v-show="table1">
			        <tbody>
			        	<tr><th>结算日期</th><th>佣金（元）</th></tr>
			        	<tr><td colspan="2">暂无记录</td></tr>
			      	</tbody>
			      </table>
			      <table id="yongjin" class="yongjin-table" width="100%" v-show="table2">
			      	<thead><tr><th>结算日期</th><th>佣金（元）</th></tr></thead>
			        <tbody>
			        	<tr v-for="list in lists"><td>{{list.time}}</td><td>{{list.money}}</td></tr>
			      	</tbody>
			      </table>
			    </div>
    		</div>
		</div>
	</div>
</template>
<style>
	.yd-confirm-hd{
		text-align: center;
	}
</style>
<script>
	export default {
	data(){
		return{
			state1:sessionStorage.getItem('state1')*1,
			state2:sessionStorage.getItem('state2')*1,
			accountant:{},
			lists:[],
			table1:'',
			table2:''
		}	
	},
	created:function(){
		if(this.state2=='1'){
			//查询理财师信息
			var token = sessionStorage.getItem('userAccessToken')
		    var accountant = this.queryAjax('/qapi/user/fp/account.do','post',{},token)
		    // console.log(accountant)
		    var code=accountant.head.code;
		    if(code=='0000'){
		    	// this.accountant.accountant=accountant.body.referralDueInCapital/100;
		    	this.accountant.account=(accountant.body.fpAcount.useAward/100).toFixed(2);
		    	this.accountant.referralDueInCapital=accountant.body.referralDueInCapital/100;
		    	this.accountant.totalAward = accountant.body.fpAcount.totalAward/100;

		    }else{
		    	this.$dialog.toast({mes:accountant.head.memo , timeout: 2000})
		    }
		    //理财师佣金信息显示
		    var token = sessionStorage.getItem('userAccessToken')
		    var accountantlist=this.queryAjax('/qapi/user/fp/accountLog.do','post',{},token)
		   // console.log(accountantlist)
		    var length=accountantlist.body.accountLogList.length;
		    if(accountantlist.head.code=='0000'){
		    	if(length==0){
			  		this.table1=true;
			  		this.table2=false;
			  	}else{
			  		this.table2=true;
			  		this.table1=false;
			  		var taskTid = sessionStorage.getItem("showTaskDetail");
		            var taskDetailJson = this.queryAjax("/qapi/user/fp/accountLog.do", 'post', {},token);
		            //理财师佣金信息
		            var investLogs=taskDetailJson.body.accountLogList;
		            for(var i=0;i<investLogs.length;i++){
		                this.lists.push(investLogs[i]);
		                this.lists[i].time=investLogs[i].createTime;
		                this.lists[i].money=investLogs[i].awardAmount/100;
		            }
			  	}
		    }else{
		    	this.$dialog.toast({mes:accountantlist.head.memo , timeout: 2000})
		    }
		  
		}
	},
	methods:{
	  	openConfrim() {
           	this.$dialog.confirm({
                title: '确定加入金贝猫理财？',
                opts: [
                    {
                        txt: '取消',
                        color: false,
                        callback: () => {
                        }
                    },
                    {
                        txt: '确定',
                        color: false,
                        callback: () => {
                            // this.$dialog.toast({mes: '你已经加入金贝猫理财', timeout: 2000}) 
                            //调出金贝猫理财师注册的接
                            var token = sessionStorage.getItem('userAccessToken')
		    				var accountant = this.serviceAjax('/api/user/fp/open/account.do','post',{},token)
		    				//成功后的处理
		    				this.$router.push({ path: '/Account' }) 
		    				// console.log(accountant)
		    				if(accountant.head.status=='SUCCESS'){
		    					this.$dialog.toast({mes: '你已经加入金贝猫理财', timeout: 2000}) 
		    				}else{
		    					this.$dialog.toast({mes:accountant.head.memo , timeout: 2000})
		    				}
                        }
                    }
                ]
            });
        },
        //理财师账户余额转出
       	moneyout(){
       		var money=this.accountant.account;
       		//console.log(money)
       		var token = sessionStorage.getItem('userAccessToken')
		    var moneyout = this.serviceAjax('/api/user/fp/award/out.do','post',{},token)
		    // console.log(moneyout)
		   if(moneyout.head.status=='success'){
		   	  this.$dialog.toast({mes: '理财师余额已转出', timeout: 2000}) 
		   	  // window.location.reload()
		   }else{
		   	  this.$dialog.toast({mes:moneyout.head.memo , timeout: 2000})
		   }
       }  
	}
	
}
</script>
<style scoped>
.clearfix{content:'';clear: both;}
.u-Comm{ background: #f5f5f5;text-align: center;}
.u-Comm .accountant .u-bg1 img{ width:7.5rem ; height: 6.105rem; }
.u-Comm .u-Commission{ color: #333333; font-size: 0.2778rem; border-bottom:1px dashed #d3bb90;padding: 5% 5% 11% 5%;text-align: left; line-height: 0.44rem;}
.u-Comm .u-ul{line-height: 0.44rem; text-align: left;padding: 7% 5%;font-size: 0.241rem;}
.u-Comm .join-in{ width: 6.557rem; height: 0.821rem;line-height: 0.821rem; background: #ecc346; color: #ffffff;font-size: 0.314rem; text-align: center; display: block; margin: 0 auto; border-radius: 0.8rem;}
.u-Comm .u-Open h2{font-size:0.2777rem ;background: #fff; color: #333; line-height: 0.44rem;border-bottom: 1px solid #e7e7e7; text-align: left;font-weight: 400;    padding: 3% 5%;}
.u-Comm .rollout i img{display: inline-block; width: 0.362rem;height: 0.362rem;}
.u-Comm .rollout i{ float: left;}
.u-Comm .rollout p{ float: left; color: #e71a19;font-size: 0.2778rem;padding:0 6%; }
.u-Comm .moneyout{display: inline-block; float: right; color: #ecc346;font-size: 0.241rem; border: 1px solid #ecc346; border-radius: 0.8rem; width: 2.092rem;height: 0.392rem;line-height: 0.392rem; background: #fff;padding: 0;}
.u-Comm .rollout span{ float: left;color: #666666;font-size: 0.241rem;    padding-left: 3%;}
.u-Comm .rollout{background: #fff;padding: .4rem 5%;overflow:hidden;border-bottom: 1px solid #e7e7e7;}
.u-Comm .rollouts dl{ width: 50%;float: left;}
.u-Comm .rollouts dl dt{color: #666666;font-size: 0.241rem; line-height: 0.55rem;  }
.u-Comm .rollouts dl dd{color: #e71a19;font-size: 0.2778rem;line-height: 0.55rem; }
.u-Comm .rollouts{ background: #fff;padding: 3% 0;    overflow: hidden;border-bottom:1px solid #e7e7e7}
.u-Comm .u-Open .u-text{font-size:0.217rem ; color: #999999; background: #fff;margin: 0;padding: 5%;line-height: 0.44rem;    border-bottom: 1px solid #e7e7e7;}
.u-Comm .u-Open .u-text span{ color: #ecc346; font-size: 0.241rem;}
.u-Comm .yongjin-table th{ color: #666666;font-size:0.2777rem ; font-weight: 400;}
.u-Comm  .yongjin-table td{ color: #cccccc;font-size: 0.217rem;}
.dailog-content .join-confirm p { font-size: .35rem;color: #333333; margin-bottom: 30px; line-height: 1.4em;}
.dailog-content .join-confirm button { background-color: #ecc346;color: #fff; font-size: .4rem; display: block;  padding: 5px 0;display: inline-block; width: 2rem;margin: 0 .3rem; border: 1px solid #ecc346; border-radius: 5px; -webkit-border-radius: 5px; -moz-border-radius: 5px; cursor: pointer;}
.progress-text .main-infor{ float: left;}
.yongjin-table, .yongjin-table-1 {background: #fff;font-size: .4rem;}
.yongjin-table th, .yongjin-table td {padding: .22rem 0;color: #666;border-bottom: 1px dashed #e4e4e4;text-align: center;}
.u-Comm .yongjin-table td {
    color: #cccccc;
    font-size: 0.217rem;
}

</style>