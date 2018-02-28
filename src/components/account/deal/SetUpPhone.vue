<template>
	<div class="setupphone">
		<header class="u-header"><a class="back" href="javascript:history.back();"><img src="../../../assets/img/left.png"></a>修改手机号码</header>
   	   	<div class="u-modif">旧手机号：<span>{{this.mobile}}</span></div>
        <div class="group marg">
        	 <yd-cell-group>
		        <yd-cell-item>
		            <input type="text" slot="right" placeholder="请输入短信验证码" ref="codeas">
		          
		            <yd-sendcode id="#J_GetCode" ref="codemsg" slot="right" v-model="start1" @click.native="sendCode1" type="warning"></yd-sendcode>
		          
		        </yd-cell-item>
    		</yd-cell-group>
        </div>
        <!--<div class="group fw20 ">
        	<i class="u-fpasimg"><img src="/themes/arrangement_mobile/Public/images/login/iconpassword.png"></i>
        	<div class="fl u-Prompt">手机验证码：</div>
            <input class="form-control half" type="text" id="f_input_yz" name="code" maxlength="6">
            <button data-url="/SMS/index/getForgetCode.html" type="button" class="yzbtn" id="f_yzphone">点击获取</button>
        </div>-->
        <button class="btn btn-submit button-forget" id="f_next" type="button" @click="modifyph">下一步</button>

	</div>
</template>
<style>
.yd-notify{ background-color: rgba(40,40,40,.8); position: fixed;top:40%;left:0;right:0;line-height: .28rem; font-size: .26rem; color: #fff;padding: .3rem .24rem; opacity: 0;-webkit-animation: notify-downin .2s linear forwards; animation: notify-downin .2s linear forwards; word-break: break-all; text-align: center;z-index: 2000;width:255px;border-radius:5px;margin:0 auto;}
</style>
<script>
export default {
	 	data(){
         return{
          mobile:'',
          input1:'',
          start1:''
         }
       },
	 	 mounted: function () {
	 	 	 this.mobile=sessionStorage.getItem('mobile')
	 	 	//console.log(this.mobile);  
	 	 },
	 	 methods: {
	  sendCode1(e) {
	    	
	    	var num=60	
	    	var txt=e.target.innerText
	    	var mobile=this.mobile	
	    	var token = sessionStorage.getItem('userAccessToken')
			var investCount = this.serviceAjax('/api/third/sms/sendCodeLogin.do','post',{mobile:mobile,apiType:'安全信息手机认证'},token)
			//console.log(investCount);
			
			var code = investCount.head.code
                     if(code=='0000'){
                     	e.target.disabled = 'disabled'
		            	e.target.style.background="#ccc"
                     	var timer = setInterval(function () {
		            		num--;
		            		e.target.innerText=+num+"s后重新发送"
		            		if(num<=0|| mobile==''){
			            		e.target.style.background="#ffb400"
			            		e.target.innerText="获取短信验证码"
			            		//按钮设置为不可点击
			            		e.target.disabled = ''
			            		clearInterval(timer)
		            		}
		        		}, 1000)
		        		// console.log(investCount.body.code)
                     }else{
                     	this.$dialog.toast({mes:investCount.head.memo , timeout: 2000})
                     }
	    },
	    modifyph(){
	    	 var code1= this.$refs.codeas.value
          //console.log(code1)
			if(code1==""){
				 this.$dialog.notify({
               mes:'验证码不能为空',
               timeout: 3000}) 	
			}else{
				this.iscode=true
			}
			
			if(this.iscode==true){
			this.$router.push({ path: '/Account/deal/Modifyph' }) 	
			}
	    }
	 	 }
}
</script>

<style>
.u-modif {font-size: 0.35rem; text-align:center;line-height: 1.3rem; color: #333;}
.yd-cell-right input[type=tel] {font-size: 0.35rem; color: #333333;font-family: "微软雅黑";}
.forget-form .btn-submit {border-radius: .8rem;-webkit-border-radius: .8rem;font-size: .354rem;background: #ecc346;color: #fff;text-align: center;display: block; width: 90%;margin: 4rem auto 0 auto;height: 0.821rem; line-height: 0.821rem;}
.u-modif span{ color: #666;}
.button-forget{border-radius: .8rem; -webkit-border-radius: .8rem;font-size: .354rem; background: #ecc346; color: #fff;text-align: center;display: block; width: 90%; margin: 4rem auto 0 auto;height: 0.821rem;line-height: 0.821rem;}
</style>