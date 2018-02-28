<template>
	<div class="lazylist">
        <div class="state1" v-show="lazylist.showState1">
    		<div class="banner">
                <p class="amount">{{lazylist.amount}}</p>
                <p class="txt">昨日收益</p>
                <p class="total">总金额: <span>{{lazylist.money}}</span><i class="eye"></i></p>
            </div>
            <div class="lazylist_about">
            	<div class="item">
            		<table>
            			<td>
            				<div class="top">{{lazylist.income1}}</div>
            				<div class="bottom">累计收益（元）</div>
            			</td>
            			<td>
            				<div class="top">{{lazylist.income2}}</div>
            				<div class="bottom">万份收益（元）</div>
            			</td>
            			<td>
            				<div class="top">{{lazylist.rate}}</div>
            				<div class="bottom">历史年化收益率（%）</div>
            			</td>
            		</table>
            	</div>
            </div>
        </div>
        <div class="state2" v-show="lazylist.showState2">
            <div class="banner banner2">
               <p class="txt">您尚未开通零钱账户！</p>
               <p class="btn"><span @click='into'>立即开户</span></p>
            </div>
            <div class="lazylist_about">
                <div class="item">
                    <table>
                        <td>
                            <div class="top">0.00</div>
                            <div class="bottom">累计收益（元）</div>
                        </td>
                        <td>
                            <div class="top">2.7</div>
                            <div class="bottom">万份收益（元）</div>
                        </td>
                        <td>
                            <div class="top">9.88%</div>
                            <div class="bottom">历史年化收益率（%）</div>
                        </td>
                    </table>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
	export default {
		props:['lazylist'],
        methods: {
            into(){
                //开通金贝零钱页面
                 var token = sessionStorage.getItem('userAccessToken')
                 var user = this.serviceAjax('api/current/account/open.do','post',{},token)
                 // console.log(user)
                if(user.head.code=='0000'){
                    //账户开通成功
                    this.$dialog.notify({
                    mes:"恭喜开户成功",
                     timeout: 2000,})
                    setTimeout("location.reload()",3000);
                }else{
                    this.$dialog.notify({
                    mes:user.head.memo,
                     timeout: 3000,})
                }
            }
        }
	}
</script>
<style scoped>
	 .lazylist .banner{
        text-align: center;
        background: #e71a19;
        color: #fff;
        padding-bottom:0.483rem;
    }
    .lazylist .banner .amount{
    	font-size: 0.574rem;
    	padding-top:0.604rem;
    }
    .lazylist .banner .txt{
    	font-size: 0.242rem;
    	padding:0.302rem 0;
    }
    .lazylist .banner .total{
    	font-size: 0.314rem;
    }
    .lazylist .banner .total .eye{
     	display: inline-block;
     	width: 0.290rem;
     	height: 0.217rem;
     	background:url(../../assets/img/eye.png);
     	background-size: 100% 100%;
     	margin-left: 0.362rem;
     }
    .lazylist  .lazylist_about{
    	padding: 0.302rem;
    	border-bottom:1px solid #e7e7e7;
    }
    .lazylist  .lazylist_about table{
    	width: 100%;
    	font-size: 0.217rem;
    }
    .lazylist  .lazylist_about table td{
    	text-align: center;
    }
    .lazylist  .lazylist_about table .top{
    	font-size: 0.278rem;
    	color:#e71a19;
    	margin-bottom:0.181rem;
    }
    .lazylist .banner2 .txt{
        font-size: 0.317rem;
        padding-top: 0.521rem;
     }
    .lazylist .banner2 .btn span{
        display: inline-block;
        width: 2.308rem;
        height: 0.661rem;
        line-height: 0.661rem;
        color: #fff;
        border-radius: 0.8rem;
        font-size: 0.344rem;
        text-align: center;
        border: 1px solid #fff;
        margin-bottom: 5%;
    }
</style>