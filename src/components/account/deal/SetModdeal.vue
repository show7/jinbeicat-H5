<template>
	<div class="moddelal">
		<header class="u-header"><a class="back" href="javascript:history.back();"><img src="../../../assets/img/left.png"></a>设置交易密码</header>
		<form class="j-tab-forms tn_form" action="/user/deal/domodpass.html" method="post">
             <!-- <a class="fog_link" href="/dealpass.html">忘记密码</a> -->
             <div class="u-form">
             <yd-cell-group>
		        <yd-cell-item>
		            <yd-input slot="right" v-model="input2" required :showSuccessIcon="false" :showErrorIcon="false" regex="passow" placeholder="请输入密码" type="password" ref="passow" ></yd-input>
		        </yd-cell-item>
		    </yd-cell-group>
		    <yd-cell-group>
		        <yd-cell-item>
		            <yd-input slot="right" v-model="input1" required :showSuccessIcon="false" :showErrorIcon="false" regex="passow" placeholder="再次输入密码" type="password" ref="passow2" :class="{'passwordsuccess':ispassword}"></yd-input>
		        </yd-cell-item>
		    </yd-cell-group>
             </div>
       
            <button type="button" class="btn btn-submit btn-avail" @click='moddealpaw'>确定</button>
        </form>
	</div>
	
</template>
<style>
	.yd-notify{
    background-color: rgba(40,40,40,.8);
    position: fixed;
    top:40%;
    left:0;
    right:0;
    line-height: .28rem;
    font-size: .26rem;
    color: #fff;
    padding: .3rem .24rem;
    opacity: 0;
    -webkit-animation: notify-downin .2s linear forwards;
    animation: notify-downin .2s linear forwards;
    word-break: break-all;
    text-align: center;
    z-index: 2000;
    width:255px;
    border-radius:5px;
    margin:0 auto;
}
</style>
<script>
	 export default {
	 	data(){
         return{
             input1:'',
             input2:'',
             mobile:'',
             ispassword:false
         }
       },
	 	created: function () {
	 	 	 this.mobile=sessionStorage.getItem('mobile')
	 	 	// console.log(this.mobile); 
	 	 },
	 	 methods: {
	 	 	moddealpaw(){
	 	      var passwd=this.$refs.passow.value
	 	      if(passwd){
    			//匹配规则
    			if(passwd.length < 6 || passwd.length > 20){
    				 this.$dialog.notify({
            		mes:'请输入6-20位的字符密码',
            		timeout: 3000,});
    			}else{
    				 this.ispassword=true;
    			}
    		}else{
    			this.$dialog.notify({
            	mes:'请输入密码',
            	timeout: 3000,});
    		}
		 	 var passwd2=this.$refs.passow2.value
	 	 	 if(passwd!==passwd){
	 	 	 		 this.$dialog.notify({
               mes:'请输入相同的密码',
               timeout: 3000}) 	
	 	 	 }else{
	 	 	 	 this.isrepassword=true;
	 	 	 }
	 	 	  this.mobile=sessionStorage.getItem('mobile')
	 	 	  var mobile= this.mobile
	 	 	  // console.log(mobile); 
	 	 	 var passworda=md5(md5(passwd))
		 	 var passworda2=md5(md5(passwd2))
		 	    if(this.ispassword==true&&this.isrepassword==true){
		 	      	var token = sessionStorage.getItem('userAccessToken')
		 	      	var moddeal = this.serviceAjax('api/user/set/paypasswd.do','post',{payPasswd:passworda2},token)
	 	 	         //console.log(moddeal); 
	 	 	          var code = moddeal.head.code
                     if(code=='0000'){
                     	 this.$dialog.notify({
		               mes:moddeal.head.memo,
		               timeout: 3000}) 	
		               this.$router.push({ path: '/Account/Security' }) 
                     }else{
                     	 this.$dialog.notify({
		               mes:moddeal.head.memo,
		               timeout: 3000}) 	
                     }
		 	    }
	 	 		
	 	 	}
	 	 }
	 }
</script>

<style>
	.fl{float: left;}
.u-form{ clear: both;}
.tn_form { font-size: .43rem;}
.tn_form .group {background: #fff;padding: 0 .4rem;position: relative; border-top: 1px solid #ECECEC;border-bottom: 1px solid #ECECEC;clear: both;    overflow: hidden;}
.u-fpasimg {vertical-align: middle;float: left;margin: 5.7% 0;}
.u-Prompt { font-size: 0.314rem;width: 35%;color: #444444;padding: .4rem 0;padding-left: 0.3rem;}
.tn_form input {width: 59%;font-size: .314rem;line-height: normal;padding: .4rem 0;border: 0;background: none;color: #ccc;box-sizing: border-box;float: right;}
.u-fpasimg img { width: 0.352rem;height: 0.4167rem;}                 
.fl20{ margin-top: 3%;}
.tn_form .btn-avail {display: block;background: #ecc346;color: #fff;text-align: center;width: 6.443rem;height: 0.821rem;margin: 1rem auto 0 auto;font-size: 0.314rem; border: 1px solid #ecc346; border-radius: 0.8rem;-webkit-border-radius: 0.8rem;-moz-border-radius: 0.8rem;}
.tn_form .fog_link { float: right; padding: 2% 5%; font-size: 0.217rem;color: #c71a19;overflow: hidden;}
.yd-input input {color: #333;font-size: .362rem; padding: .335rem .2rem .335rem 0;border-radius: 0; width: 100%; -webkit-box-sizing: border-box;box-sizing: border-box;border: 0;background-color: transparent;border-bottom: 1px solid #E7E7E7; padding-left: 5%;}
</style>