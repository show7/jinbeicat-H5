
<template>
  <div>
  <div class="account">
        <div class="person" >
           <div class="person_pic" >
               <img id="upload" class="person_pic"  :src="choose.nickImg" @click="upload">
                    <div id="upload-panel" class="upload-imgs" style="display: none;">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" @click="hide">×</span></button>
                    <ul name="image">
                      <li v-on:click="nickimg($event)" v-for="(image,index) in img" :key="index">
                      	<img :src="image.image">
                      </li>
                     
                    </ul> 
                </div>
            </div>
            <h3 class="name">{{nickName}}</h3>
            <div class="Setup" @click='Setup' ><img src="../assets/img/account/Setup.png" id="upload"></div>
        </div>
        <p class="remain">总资产 (元)</p>
        <p class="larger">{{user.principal}}</p>
        <div class="d_money">
          <div class="first"><p>冻结金额 (元)</p><p class="u-ptext">{{user.frozenCapital}}</p></div>
          <div><p>可用余额 (元)</p><p class="u-ptext">{{user.balance}}</p></div>
        </div>
   </div>
   <div class="btn-group u-bg">
   	 <div class="btn_1 u-but " @click="Recharge" >充值</div>
        <div class="btn_2 u-but" @click="Repickup" >提现</div>
       
    </div>
    <ul class="m-list">
      <li @click='Record'>
        <a>
        <i class="icon fl u-left"></i>
        <div class="fl">投资记录</div>
        <i class="u-right fr"><span class="righticon"></span></i>
          </a>
      </li>
      <li @click='iscard'>
          <a href="javascript:;">
           <i class="icon1 fl u-left"></i>
           <div class="fl">我的银行卡</div>
           <i class="u-right fr"><span class="righticon"></span></i>
          <span class="count fr">{{user.bankName}}</span>
           </a>
      </li>
      <li @click="coupon">
        <a href="javascript:;">
        <i class="icon2 fl u-left"></i>
         <div class="fl">优惠券</div> 
        <i class="u-right fr"><span class="righticon"></span></i>
        <span class="count fr">{{user.couponsCount}}</span>
          </a>
      </li>
      <li @click='invite'>
         <a href="javascript:;">
         <i class="icon3 fl u-left"></i>
         <div class="fl">好友邀请</div>
         <i class="u-right fr"><span class="righticon"></span></i>
         </a>
      </li>
      <li @click='accountant'>
         <a href="javascript:;">
         <i class="icon4 fl u-left"></i>
         <div class="fl">理财师</div>
         <i class="u-right fr"><span class="righticon"></span></i>
         </a>
      </li>
      <li @click='returnCalendar'>
         <a href="javascript:;">
         <i class="icon5 fl u-left"></i>
         <div class="fl">回款日历</div>
         <i class="u-right fr"><span class="righticon"></span></i>
         </a>
      </li>
       <li @click='integral'>
         <a href="javascript:;">
         <i class="icon6 fl u-left"></i>
         <div class="fl">我的积分</div>
         <i class="u-right fr"><span class="righticon"></span></i>
         </a>
      </li>
    </ul>
    <footer-nav v-bind:class="{'isIndex':isNowPage}"></footer-nav>
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
	import FooterNav from '../components/Footer.vue'
  export default {
  data() {
      return {
     isNowPage: true,
     nickName: '',
     isNowPage:true,
     choose:{nickImg:'/static/img/account/img.png'},
     user:{},
     img:[{image:'/static/img/account/img.png'},{image:'/static/img/account/img1.png'},{image:'/static/img/account/img2.png'},{image:'/static/img/account/img3.png'},{image:'/static/img/account/img4.png'},{image:'/static/img/account/img5.png'}]
    }
   },
   components: {
       FooterNav  
    },

    mounted: function () {
    var token = sessionStorage.getItem('userAccessToken')
    //alert(token)
    // this.nickName= sessionStorage.getItem('nickName') 
    this.nickImg=sessionStorage.getItem('nickImg')
    if (token== null) {
      this.$router.push({ path: '/login' })
    }else{
       var user = this.queryAjax('qapi/user/index.do','post',{},token)
       //console.log(user)
        var code = user.head.code
        if(code=='0000'){
          var userList=user.body;
         // console.log(userList)
          this.nickName=user.body.user.mobile;
          this.user.balance=(userList.iaccount.balance/100).toFixed(2);
          this.user.frozenCapital=(userList.iaccount.frozenCapital/100).toFixed(2);
//        this.user.principal=(userList.iaccount.dueInCapital/100+userList.iaccount.dueInInterest/100+userList.iaccount.balance/100).toFixed(2);
          this.user.principal=(userList.totalAllAmount/100).toFixed(2);

          this.user.bankName=userList.bankName+userList.bankTailNo;
         //console.log(this.user.bankName); 
         // console.log(userList.user.payPasswd)
          if(this.user.bankName==""){
          	this.user.bankName='未绑定'
          }else{
          	 this.user.bankName=userList.bankName+'('+userList.bankTailNo+')'
          }
          this.user.couponsCount=userList.couponsCount;
          //得到银行卡是否绑定的信息
          // var cardstate=userList.isBankBinding;
          sessionStorage.setItem('cardstate',userList.isBankBinding);
          //设置
          sessionStorage.setItem('realName',userList.realName);
          sessionStorage.setItem('mobile',userList.user.mobile);
          sessionStorage.setItem('bankTailNo',userList.bankTailNo);
          sessionStorage.setItem('bankName',userList.bankName);
          sessionStorage.setItem('balance',(userList.iaccount.balance/100).toFixed(2));
          sessionStorage.setItem('bankCode',userList.bankCode);
          //得到是否是属于理财师的状态
          sessionStorage.setItem('Financer',userList.isFinancer);
         //存储id用于链接
          // console.log(userList.iaccount.uid)
          sessionStorage.setItem('uid',userList.iaccount.uid);
          //判断是否设置交易密码
          sessionStorage.setItem('payPasswd',userList.user.payPasswd);
          // console.log(sessionStorage.getItem('payPasswd'))
        }else{
           this.$router.push({ path: '/login' });
        }
         
    }
  },methods: {
  	upload(){
  		var token = sessionStorage.getItem('userAccessToken')
  		$("#upload-panel").show();
  	},
  	hide(){
  	  $("#upload-panel").hide();	
  	},
    nickimg:function(event){
    	var token = sessionStorage.getItem('userAccessToken')
    	var imgs =event.target.src
       // console.log(imgs);  
        var nickimg = this.serviceAjax('api/user/modify/nickimg.do','post',{nickImg:imgs},token)
         //console.log(nickimg);
         var code = nickimg.head.code;
           if(code=="0000"){
	        	var nickImgUrl = nickimg.body.nickImgUrl;
	        	 // console.log(nickImgUrl)
	        	$("#upload-panel").hide()
	        	$('#upload').attr("src",nickImgUrl)
	        	sessionStorage.setItem('nickImg',nickImgUrl) 
	        	sessionStorage.getItem('nickImg')
	        	 this.$dialog.notify({
              mes:nickimg.head.memo,
              timeout: 3000})
	        }else{
             this.$dialog.notify({
              mes:nickimg.head.memo,
              timeout: 3000})
          }
//    var nickimg = this.serviceAjax('api/user/modify/nickimg.do','post',{nickImg:imgs},token)
//    var code = nickimg.head.code;
//    if(code=="0000"){
//    	var nickImgUrl = nickimg.body.nickImgUrl;
//    	$("#upload-panel").hide()
//    	$('#upload').attr("src",nickImgUrl)
//    	sessionStorage.setItem('nickImg',nickImgUrl) 
//    	sessionStorage.getItem('nickImg')
//     
//    }
    },
    iscard(){
      // this.$router.push({ path: '/Account/Bank' }) 
      var cardstate=sessionStorage.getItem('cardstate');
      // console.log(cardstate)
      var state1=null;
      var state2=null;
      var state3=null;
      if(cardstate=='FAI'){
        //未绑卡
        // this.card.state=true;
        state1=1;
        state2=0;
        state3=0;
        // console.log(this.card.state)
        this.$router.push({ path: '/Account/Bank' }) 
      }else if(cardstate=='SUC'){
        //绑卡成功
        state1=0;
        state2=1;
        state3=0;
        this.$router.push({ path: '/Account/Bank'}) 
      }else if(cardstate=='SUB'){
       //申请绑卡
        state1=0;
        state2=1;
        state3=1;
        this.$router.push({ path: '/Account/Bank'})
      }
     sessionStorage.setItem('state1',state1);
     sessionStorage.setItem('state2',state2);
     sessionStorage.setItem('state3',state3);
     // console.log(typeof(sessionStorage.getItem('state')))

    },
    Setup(){	 
  	  this.$router.push({ path: '/Account/Set' }) 
  	  var realName=null
 	 	  var realName=sessionStorage.getItem('realName');
 	 	  //console.log(realName)
 	 	  var Bank=null;
 	 	  var Bank=sessionStorage.getItem('cardstate');
     	 if( Bank =='FAI'){
     	 	 Bank=1
     	 	 this.$router.push({ path: '/Account/Set' }) 
     	 }else if( Bank =='SUC'){
     	 	Bank=0
     	 	 this.$router.push({ path: '/Account/Set' }) 
     	 }
     	 if(realName==""){
     	 	 realName=1
     	 	 this.$router.push({ path: '/Account/Set' }) 
     	 }else{
     	 		realName=0
     	 	 this.$router.push({ path: '/Account/Set' }) 
     	 }
     	  sessionStorage.setItem('Bank',Bank);
     	    //console.log(sessionStorage.getItem('Bank'))
        //sessionStorage.setItem('realName',realName);
    },
   Recharge(){
   	var bankTailNo=sessionStorage.getItem('bankTailNo')
   	var balance=sessionStorage.getItem('balance')
   	var bankCode=sessionStorage.getItem('bankCode')
   	var mobile=sessionStorage.getItem('mobile')
   	this.$router.push({ path: '/Account/recharge' }) 
    //判断是否进行实名认证和交易密码
     var cardstate=sessionStorage.getItem('cardstate');
     var payPasswd=sessionStorage.getItem('payPasswd');
     var state=null;
     var state1=null;
     var state2=null;
      if(cardstate!='FAI'){
        //实名成功
        state=0
        state1=1
        state2=0
         if(payPasswd==''){
          //未进行交易密码设置
          state=0
          state1=0
          state2=1
         }else{
          state=1
         }
        
      }else{
        //尚未进行实名认证
        state=0
        state1=1
        state2=0
      }  
      sessionStorage.setItem('state',state);
      sessionStorage.setItem('state1',state1);
      sessionStorage.setItem('state2',state2);
   },
   Repickup(){
   	var bankTailNo=sessionStorage.getItem('bankTailNo')
   	var bankCode=sessionStorage.getItem('bankCode')
   	this.$router.push({ path: '/Account/Repickup' }) 
     var cardstate=sessionStorage.getItem('cardstate');
     var payPasswd=sessionStorage.getItem('payPasswd');
     var state=null;
     var state1=null;
     var state2=null;
      if(cardstate!='FAI'){
        //实名成功
        state=0
        state1=1
        state2=0
         if(payPasswd==''){
          //未进行交易密码设置
          state=0
          state1=0
          state2=1
         }else{
          state=1
         }
        
      }else{
        //尚未进行实名认证
        state=0
        state1=1
        state2=0
      }  
      sessionStorage.setItem('state',state);
      sessionStorage.setItem('state1',state1);
      sessionStorage.setItem('state2',state2); 
   },
   Record(){
   		this.$router.push({ path: '/Account/Record' })  
   },
   //理财师内容判断
   accountant(){
      var isFinancer=sessionStorage.getItem('Financer');
      //console.log(isFinancer)
      var state1=null;
      var state2=null;
      if(isFinancer=='Y'){
        //是理财师
        state1=0;
        state2=1;
        this.$router.push({ path: '/Account/Accountant' }) 
      }else{
       //不是理财师
        state1=1;
        state2=0;
        this.$router.push({ path: '/Account/Accountant'})
      }
      sessionStorage.setItem('state1',state1);
     // console.log(sessionStorage.getItem('state1')*1),
      sessionStorage.setItem('state2',state2);
   },
   //好友邀请
   invite(){
    this.$router.push({ path: '/Account/Invite'})
   },
   //优惠券
   coupon(){
    this.$router.push({ path: '/Account/Coupon'})
   },
   returnCalendar(){
      this.$router.push({ path: '/date'})
   },
    integral(){
      this.$router.push({ path: '/integral'})
   }
  }
}
</script>

<style>
.fl{ float: left;}
.fr{ float: right;}
.account {background: #e71a19;text-align: center; min-height: 4.5rem; padding: .6rem 0; position: relative; color: #fff;position: relative;}
.account .person {position: absolute; top: .4rem;left: .4rem;}
.person .person_pic { background: #fff;  background-size: 1.0778rem; width: 1.0778rem; height: 1.0778rem;float: left; border: 1px solid #fff;border-radius: 50%; -webkit-border-radius: 50%;}
#upload-panel { position: absolute; top: 115%; background: #fff;width: 3.7rem; left: -4%; z-index: 9;border-radius: 0.1rem;}
button.close { -webkit-appearance: none;padding: 0;cursor: pointer; background: transparent;border: 0;}
.close {float: right; font-size: 30px; font-weight: bold;line-height: 1; color: #000; filter: alpha(opacity=20); opacity: .2; margin: 10px;}
#upload-panel ul {clear: both;}
#upload-panel ul li { float: left; width: 1.0778rem; margin: 2%; color: #000;}
#upload-panel ul li img { width: 1.0778rem; height: 1.0778rem;}
.Setup img {width: 0.416rem;height: 0.418rem;}
.account .remain { margin-top: 1.3rem;color: #f3aaa8;font-size: 0.314rem;margin-bottom: .3rem; clear: both;}
.account .larger { font-size: 0.724rem;font-family: Arial;line-height: 0.64rem;margin-bottom: .3rem;height: 0.64rem;}
.d_money { width: 100%; padding: .3rem 0 0; text-align: center; box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;overflow: hidden;}
.d_money>div { width: 50%; float: left; text-align: left; margin-bottom: .2rem; box-sizing: border-box; -webkit-box-sizing: border-box;}
.person .name {  padding: .32333rem 0 0 1.3rem; font-size: .374rem;font-weight: normal;}
.d_money p { text-align: center;font-size: .27778rem; line-height: 1.5em;color: #f3aaa8;}
.d_money .u-ptext { color: #fff; font-family: arial;font-size: 0.362rem;}
.Setup img { width: 0.416rem; height: 0.418rem;}
.Setup {position: absolute; top: 18%; right: -79%;}
.u-bg { background: #fff; padding: 0.205rem 0.700rem; margin: 0;overflow: hidden;}
.btn-group .u-but {width: 2.608rem;height: 0.760rem;line-height: 0.760rem;display: inline-block; margin: 0;border: 1px solid #ecc346;color: #ecc346;border-radius: .8rem;-webkit-border-radius: .8rem;font-size: .374rem;text-align: center;}
.btn-group .u-but.btn_1 { background: #ecc346;color: #fff;}
.m-list{ clear: both; width: 100%;margin-bottom:0.9843rem;}
#app .btn-group .btn_2{ margin-left: 13%;}
.m-list{ clear: both; width: 100%;}
.m-list li { width: 100%; height: 1.171rem; line-height: 1.171rem;color: #333333; font-size: 0.314rem; padding: 0 0.398rem; border-top: 1px solid #E7E7E7;background: #fff; margin: 0;}
ul:not(.md-list) > li + li{margin: 0;}
.m-list li .u-left { width: 0.44rem; height: 0.44rem;margin-top: 5%;margin-right: 3%;}
.m-list li .icon{ background: url(../assets/img/account/icon.png) no-repeat; background-size: 0.44rem;}
.m-list li .icon1{ background: url(../assets/img/account/icon1.png) no-repeat;background-size: 0.44rem; }
.m-list li .icon2{ background: url(../assets/img/account/icon2.png) no-repeat;background-size: 0.44rem; }
.m-list li .icon3{ background: url(../assets/img/account/icon4.png) no-repeat; background-size: 0.44rem;}
.m-list li .icon4{ background: url(../assets/img/account/icon8.png) no-repeat; background-size: 0.44rem;}
.m-list li .icon5{ background: url(../assets/img/account/icon6.png) no-repeat; background-size: 0.44rem;}
.m-list li .icon6{ background: url(../assets/img/account/icon7.png) no-repeat; background-size: 0.44rem;}
.m-list li .u-right .righticon{ background: url(../assets/img/account/right.png)50% 50% no-repeat; background-size:0.205rem 0.338rem ; width: 0.205rem; height: 0.338rem;display: inline-block;}
.m-list li .count {color: #999999;font-size: 0.277rem;padding-right: 3%;}
.m-list li .u-right {width: 3%;height: 1.171rem;}
.btn-group .btn_2{border: 1px solid #ecc346; background: #fff; margin: 0; color: #ecc346;}

</style>