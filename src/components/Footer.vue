<template>
	<div class="footer fixed">
		<ul class="list">
			<router-link to='/'><li class="icon icon1">首页</li></router-link>
			<router-link to='/lazycow'><li class="icon icon2">金贝零钱</li></router-link>
			<router-link to='/prolist'><li class="icon icon3">金贝定存</li></router-link>
			<router-link to='/account'><li class="icon icon4">我的</li></router-link>
		</ul>
	</div>
</template>

<style scoped>
	.footer{position: fixed;bottom: 0;width:100%;/* box-shadow: 0 0 5px #EEEEEE; */background: #fff;height: 0.9843rem;border-top: 1px solid #E5E5E5;}
	.footer .list{overflow: hidden;}
	.footer .list a{display: inline-block;width: 25%;box-sizing: border-box;float:left;height: .89rem;text-align: center;color: #999;font-size: 0.193rem;}
	/*.footer .list li{width: 100%;text-align: center;color: #999;font-size: 0.193rem;}*/
	.footer .list li.icon{display: inline-block;width: 1.85rem;height: .89rem;line-height: 1.4rem;background-repeat: no-repeat;background-position: center .08rem;-webkit-background-size: 0.422rem 0.422rem;background-size: 0.422rem 0.422rem;}
	.footer .list li.icon1{background-image:url(../assets/img/home.png)}
	.footer .list li.icon2{background-image:url(../assets/img/money.png)}
	.footer .list li.icon3{background-image:url(../assets/img/deposit.png)}
	.footer .list li.icon4{background-image:url(../assets/img/account.png)}
    .isIndex .list .router-link-exact-active{color: #e71a19;}
    .isIndex .list .router-link-exact-active .icon1{background-image:url(../assets/img/home-active.png)}
    .isIndex .list .router-link-exact-active .icon2{background-image:url(../assets/img/money-active.png)}
    .isIndex .list .router-link-exact-active .icon3{background-image:url(../assets/img/deposit-active.png)}
    .isIndex .list .router-link-exact-active .icon4{background-image:url(../assets/img/account-active.png)}
</style>