<template>
    <div>
        <header class="u-header"> <a class="back" @click="goBack"><img src="../assets/img/left.png"></a>登录</header>
        <div class="u-logo">
            <div class="u-top"><img src="../assets/img/logoimg.png"></div>
        </div>
        <div class="login_bg">
           <yd-cell-item>
                <yd-input slot="right"  v-model="input4" regex="mobile" placeholder="输入手机号" ref="tel"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <yd-input slot="right" type="password" v-model="input2" placeholder="请输入密码" ref="passow" @keyup.enter="u_login"></yd-input>
            </yd-cell-item>
            <button class="login_btn" type="button" @click="u_login">登录</button>
            <a class="pullright" href="/src/pages/ForgetPassword.vue"><router-link to="/forgetpwd">忘记密码了?</router-link></a>
            <div style="text-align: center;" class="u-register"> <a href="/src/pages/Regist.vue"><router-link to="/Regist">没有账号?手机快速注册</router-link></a> </div>
        </div>
         
    </div>
</template>
<style>
.yd-notify{
    background-color: rgba(40,40,40,0.8);
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
export default{    

    data(){
        return{
             input4: '',
             input2:''
        }
    },
    methods:{
        u_login() {
        	//alert("1111");
            var mobile=this.$refs.tel.value
            var passwd = this.$refs.passow.value
            var passworda="###"+md5(md5("8txuGjgpHti6TANE6D"+passwd));
            var token = sessionStorage.getItem('userAccessToken')
            var investCount = this.serviceAjax('api/member/login.do','post',{mobile:mobile,password:passworda},token)
           // console.log(investCount);
            if(investCount.head.status=='SUCCESS'){
                //成功跳转到账户中心页面
              var accessToken = investCount.body.token.accessToken
              var nickName = investCount.body.user.nickName
              var nickImg = investCount.body.user.nickImg
              sessionStorage.setItem("userAccessToken", accessToken);
              sessionStorage.setItem("nickName", nickName);
              sessionStorage.setItem("nickImg", nickImg);
              sessionStorage.setItem("Account", 'Account');
                 this.$router.push({ path:'/Account'}) 
               // console.log(this.$route.path);
            }else{
                 this.$dialog.notify({
                mes:investCount.head.memo,
                timeout: 4000,});
            }
        },
        goBack(){  
            // window.history.back();  
             this.$router.push({ path:'/'}) 
        }  
    }

}
</script>
<style>
body{ background: #FFF;font-family: "微软雅黑";}
.yd-cell-right input[type=tel],.yd-cell-right input[type=password]{color: #333;font-size: .362rem;border-bottom: 1px solid #E7E7E7; padding-left: 5%;}
.u-header {color: #fff; font-size: 0.380rem; line-height: 0.863rem;background: #e71a19;text-align: center; height: 0.863rem; position: relative;}
.u-header a { width: 0.253rem; height: 0.4227rem; float: left; position: absolute;left: 0.302rem;top: 25%;}
.u-logo .u-top { text-align: center;padding: 0.507rem 0;}
.u-logo .u-top img {width: 1.841rem;height: 1.841rem;    margin: 0 auto;}
.login_bg{width: 90%;margin: 0 auto 0 auto;}
.login_bg  .input-control { padding:.435rem .2rem .435rem 0; border-radius: 0; width: 100%;box-sizing: border-box; border: 0; background-color: transparent; border-bottom: 1px solid #E7E7E7; padding-left: 5%;}
::-webkit-input-placeholder{ color: #666;}    
:-moz-placeholder{ color: #666;}                
::-moz-placeholder{ color: #666;}                
:-ms-input-placeholder{ color: #666;}
.login_btn { width: 6.443rem; height:0.821rem; line-height: 0.821rem;background: #ECC346; color: #fff; font-size: 0.314rem; text-align: center; border-radius: 0.8rem; margin: .8rem auto 0;font-family: "微软雅黑"; border: none}        
.login_bg .pullright { float: right; color:#cccccc;font-size: 0.302rem; padding-top: 3%;}
.u-register {clear: both; padding: 10% 0 5% 0;}
.u-register a { color: #ecc346;font-size: 0.302rem;}
</style>