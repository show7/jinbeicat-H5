,<template>
	<div class="set">
	    <header class="u-header"><a class="back" href="javascript:history.back();"><img src="../../assets/img/left.png"></a>设置</header>
	    <div class="middle">
	    	 <router-link to="/account/Bank" class="panel_ft1" v-if="setShow1">实名认证<span>未认证</span></router-link>
	    	<a class="panel_ft1" id="SUC" href="" v-else>实名认证<span>{{realName}}**</span></a>
	        <a class="panel_ft1" href="" id="tel1"  >手机认证<span>{{tel}}</span></a>
		   <router-link to="/account/Bank" class="panel_ft1" v-if="setShow">银行卡绑定<span>未认证</span></router-link>
		    <a class="panel_ft1" href="" id="bank1" v-else>银行卡绑定<span>***   ***  *** <span class="u-bank">{{bankTailNo}}</span></span></a>
		    <div class="panel_ft" @click='Security' >账户安全</div>
		    <router-link to="/account/problem" class="panel_ft">常见问题</router-link>
		    <router-link to="/about" class="panel_ft">关于我们</router-link>
		    <a class="u-but"  v-on:click="submit">退出</a>
        </div>	
	</div>
</template>

<script>
	  export default {
	  data() {
	      return {
	      	realName:'',
	        setShow:sessionStorage.getItem('Bank')*1,
	        setShow1:sessionStorage.getItem('realName1')*1,
	        bankTailNo:'',
	        tel:''
	        }
       },
	  	 mounted: function () {
	        var realName
	        var mobile
	        var mobile1
	        var realName=sessionStorage.getItem('realName')
	        this.realName=realName
	         var tel=sessionStorage.getItem('mobile').substring(0,3)+'****'+sessionStorage.getItem('mobile').substring(7)
	        this.mobile =sessionStorage.getItem('mobile')
	         this.tel=tel
	         this.bankTailNo=sessionStorage.getItem('bankTailNo')
            //console.log(realName); 
	    },
	  	 methods: {
            submit() {
            	  var token = sessionStorage.getItem('userAccessToken')
            	  sessionStorage.removeItem('userAccessToken');
               // console.log(sessionStorage.getItem('userAccessToken'));
                this.$router.replace({ path: '/login' })
            },
            Security(){
            	sessionStorage.setItem('mobile',this.mobile);
            	 this.$router.push({ path: '/account/Security' }) 
            }
        }
	  }
</script>

<style>
.middle { width: 100%; min-width: 320px;margin: 0 auto;}
.middle { margin-bottom: 0.9843rem;}
.panel_ft1 {padding: .3rem .4rem; color: #333333;font-size: .314rem;position: relative; background: #fff; display: block; margin-top: 0.253rem; }
.panel_ft1 span {float: right;color: #666666;}
.u-header { color: #fff; font-size: 0.380rem; line-height: 0.863rem;background: #e71a19;text-align: center; height: 0.863rem; position: relative;}
.u-header a {width: 0.253rem; height: 0.4227rem;float: left;position: absolute;left: 0.302rem;top: 26%;;}
.panel_ft {padding: .3rem .4rem;color: #333333;font-size: .314rem; position: relative;background: #fff;display: block;margin-top: 0.253rem;}
.u-but { display: block;background: #ecc346; color: #fff; text-align: center; width: 6.443rem;height: 0.821rem; line-height: 0.821rem; margin: 1rem auto 0 auto; font-size: 0.314rem;border: 1px solid #ecc346; border-radius: 0.8rem; -webkit-border-radius: 0.8rem;-moz-border-radius: 0.8rem;}
.panel_ft:after {content: " "; display: inline-block;-webkit-transform: rotate(45deg);transform: rotate(45deg);height: 12px;width: 12px;border-width: 2px 2px 0 0; border-color: #e7e7e7;border-style: solid;position: relative;top: -2px;position: absolute;right: 15px; top: 50%;margin-top: -4px;}
body { background: #efeff0;}
</style>