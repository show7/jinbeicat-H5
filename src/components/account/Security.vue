<template>
	<div class="Security">
		<header class="u-header"><a class="back" href="javascript:history.back();"><img src="../../assets/img/left.png"></a>账户安全</header>
		<div class="middle">
			 <router-link to="/Account/deal/Modlogin" class="panel_ft">登录密码 <i>修改</i></router-link>
<!--			 <router-link to="/account/deal/moddeal" ></router-link>-->
			  <div class="panel_ft"  @click='SetModdeal' v-show="state1">交易密码<i>设置</i></div>
			  <div class="panel_ft"  @click='moddeal' v-show="state2">交易密码<i>修改</i></div>
			  <div class="panel_ft"  @click='SetUpPhone' >绑定手机 <i>修改</i></div>
			<!-- <router-link to="/account/deal/SetUpPhone" class="panel_ft"></router-link>-->
	    </div>
	</div>
</template>

<script>
	 export default {
 		data(){
 			return{
 				state2:false,
 				state1:false
 			}
 		},
	 	 mounted: function () {
	 	 	 this.mobile=sessionStorage.getItem('mobile')
	 	 	   var token = sessionStorage.getItem('userAccessToken')
	 	 	     var user = this.queryAjax('qapi/user/index.do','post',{},token)
		        var code = user.head.code
		        if(code=='0000'){
		          var userList=user.body;
		          var payPasswd=userList.user.payPasswd
		        }else{
				     this.$dialog.notify({
		            mes:user.head.memo,
		             timeout: 3000})
		        }
	 	 	if(payPasswd!=''){
	 	 		this.state2=true;
	 	 		this.state1=false;
	 	 	}else{
	 	 		this.state2=false;
	 	 		this.state1=true;
	 	 	}
	 	 }, methods: {
	 	 	moddeal(){
	 	 		sessionStorage.setItem('mobile',this.mobile);
            	this.$router.push({ path: '/account/deal/moddeal' }) 
	 	 	},
	 	 	SetUpPhone(){
	 	 		sessionStorage.setItem('mobile',this.mobile);
            	this.$router.push({ path: '/account/deal/SetUpPhone' }) 
	 	 	},
	 	 	SetModdeal(){
	 	 		//这里跳转到设置页面
	 	 		sessionStorage.setItem('mobile',this.mobile);
            	this.$router.push({ path: '/Account/deal/SetModdeal' }) 
	 	 	}
	 	 }
	 }
</script>

<style>
.u-header {color: #fff;font-size: 0.380rem;line-height: 0.863rem;background: #e71a19;text-align: center;height: 0.863rem;position: relative;}	
.u-header a {width: 0.253rem;height: 0.4227rem;float: left;position: absolute;left: 0.302rem; top: 26%;}	
.panel_ft {padding: .3rem .4rem;color: #333333;font-size: .314rem; position: relative;background: #fff; display: block;margin-top: 0.253rem;}
.panel_ft:after {content: " "; display: inline-block;-webkit-transform: rotate(45deg); transform: rotate(45deg);height: 12px; width: 12px;border-width: 2px 2px 0 0;border-color: #e7e7e7;border-style: solid;position: relative;top: -2px; position: absolute;right: 15px;top: 46%; margin-top: -4px;}
.middle .panel_ft i {float: right;color: #999;padding-right: 3%;}
</style>