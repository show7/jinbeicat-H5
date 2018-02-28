<template>
	<div class="modifyph">
		<header class="u-header"><a class="back" href="javascript:history.back();"><img src="../../../assets/img/left.png"></a>修改手机号码</header>
		<yd-cell-group>
			<yd-cell-item>
		         <yd-input slot="right"  v-model.lazy="input4" regex="mobile" placeholder="输入新手机号" ref="tel"  ></yd-input>
		    </yd-cell-item>
		</yd-cell-group>
        <yd-cell-group>
		        <yd-cell-item>
		            <input type="text" slot="right" placeholder="请输入短信验证码" ref="codeas">
		          
		            <yd-sendcode id="#J_GetCode" ref="codemsg" slot="right" v-model="start1" @click.native="sendCode1" type="warning"></yd-sendcode>
		          
		        </yd-cell-item>
    	</yd-cell-group>
    	<button class="btn btn-submit button-forget" id="f_next" type="button"  @click="mobile">完成</button>
    	<input type="hidden" ref='code1'/>
	</div>
	
</template>

<script>
	export default {
		data(){
         return{
          //mobile:'',
          input4:'',
          start1:''
         }
       },
        methods: {
	  sendCode1(e) {
	    	
	    	var num=60	
	    	var txt=e.target.innerText
	    	var mobile=this.$refs.tel.value
	    	var token = sessionStorage.getItem('userAccessToken')
			var investCount = this.serviceAjax('/api/third/sms/sendCodeLogin.do','post',{mobile:mobile,apiType:'安全信息手机认证'},token)
			//console.log(investCount) 
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
                     	 this.$refs.code1.value = investCount.body.code;
			            // console.log(investCount.body.code);
                     }else{
                     	 this.$dialog.notify({
			               mes:investCount.head.memo,
			               timeout: 3000}) 	
                     }
            
	    },
	    mobile(){
	     var tel= this.$refs.tel.value
	     var token = sessionStorage.getItem('userAccessToken')
	     var codeas= this.$refs.codeas.value
	     var code1 = this.$refs.code1.value
	    // console.log(code1);  
	    // console.log(codeas);
	     if(codeas!=code1){
	     	 this.$dialog.notify({
			  mes:"输入的验证码不正确",
			timeout: 3000}) 
			//alert("111");
	     }else{
	      var mobile = this.serviceAjax('/api/user/reset/mobile.do','post',{mobile:tel,},token)
	      //console.log(mobile);
	        var code = mobile.head.code
              if(code=='0000'){
                 this.$dialog.notify({
			      mes:mobile.head.memo,
			    timeout: 3000}) 	
			    this.$router.push({ path: '/Account/deal/Modifyph' }) 	
			    window.location.reload();
             }else{
             	 this.$dialog.notify({
			      mes:mobile.head.memo,
			    timeout: 3000}) 	
             }
	     }
	   
	     

	    }
	  }
	}
</script>

<style>
	.yd-cell-box{border-top: 1px solid #DDDDDD;}
	.yd-cell-right input[type=text]:not(.yd-spinner-input),.yd-cell-right input[type=tel]{ font-family: "微软雅黑";font-size: 0.35rem;}
	.button-forget{ border-radius: .8rem; -webkit-border-radius: .8rem;font-size: .354rem;background: #ecc346;color: #fff; text-align: center;display: block;width: 90%;margin: 4rem auto 0 auto;height: 0.821rem;line-height: 0.821rem;}
</style>