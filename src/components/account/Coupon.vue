<template>
	<div class="coupon">
		<header class="u-header"> <a class="back" href="javascript:history.back();"><img src="../../assets/img/left.png"></a>券中心</header>
		<div class="coupon-center" id="coupon">
			<div class="coupon-tabs">
	          <mu-tabs :value="activeTab" @change="handleTabChange">
	            <mu-tab value="tab1" title="可使用" class="coupon-mytab"/>
	            <mu-tab value="tab2" title="已失效" class="coupon-mytab"/>
	          </mu-tabs>
	          <div v-if="activeTab === 'tab1'">
	          		<!-- 优惠券有两种状态 -->
	            	<div class="coupon1" v-show="coupon1sates1">
	            		<ul id="avail_coupon" class="coupon active clearfix">
	            			<li class="overdue" v-for="coupon in coupons">
	            				<p class="stress">{{coupon.name}}</p>
	            				<p class="stress abs">{{coupon.lotteryValue}}元</p>
	            				<p class="coupon-meta">
	            					<span>适用范围</span>
	            					<span class="stress">{{coupon.scope}},<span>{{coupon.day}}</span>以上标</span>
	            				</p>
	            				<p class="coupon-meta">
	            					<span>使用条件</span>
	            					<span class="stress">{{coupon.validateMoneyTips}}</span>
	            				</p>
	            				<p class="coupon-meta u-overdu">
	            					<span>有效期限</span>
	            					<span class="stress">{{coupon.overTime}}</span>
	            					<i class="coupon-count">{{coupon.count}}</i>
	            				</p>
	            			</li>
                    <div class="more" @click="more1" ref="more1">加载更多</div>
	            		</ul>
                   
	            	</div>
	            	<div class="coupon1-none" v-show="coupon1sates2">
	            		<div class="coupon-empty-pic"></div>
	            	</div>
	          </div>
	          <div v-if="activeTab === 'tab2'">
	           		<div class="coupon2" v-show="coupon2sates1" >
	           			<ul id="avail_coupon" class="coupon active clearfix coupon2">
	            			<li class="overdue" v-for="coupon2 in coupons2" :class="{status1:coupon2.status=='Y',status2:coupon2.status=='O'}">
	            				<p class="stress">{{coupon2.name}}</p>
	            				<p class="stress abs">{{coupon2.lotteryValue}}元</p>
	            				<p class="coupon-meta">
	            					<span>适用范围</span>
	            					<span class="stress">{{coupon2.scope}},<span>{{coupon2.day}}</span>以上标</span>
	            				</p>
	            				<p class="coupon-meta">
	            					<span>使用条件</span>
	            					<span class="stress">{{coupon2.validateMoneyTips}}</span>
	            				</p>
	            				<p class="coupon-meta u-overdu">
	            					<span>有效期限</span>
	            					<span class="stress">{{coupon2.overTime}}</span>
	            					<i class="coupon-count">{{coupon2.count}}</i>
	            				</p>
	            			</li>

	            		</ul>
                   <div class="more2" @click="more2" ref="more2">加载更多</div>
	           		</div>
	           		<div class="coupon2-none" v-show="coupon2sates2">
	           			<div class="coupon-empty-pic"></div>
	           		</div>
	          </div>
        	</div>
		</div>
	</div>
</template>
<script>
	 export default {  
        data(){
            return { 
              activeTab: 'tab1',
              coupon1sates2:'',
              coupon1sates1:'',
              coupon2sates2:'',
              coupon2sates1:'',
              coupons:[],
              coupons2:[],
              nextPage1:1,
              nextPage2:1
            }
        },
        created:function(){
        	//可以使用的优惠券调用
        	var token = sessionStorage.getItem('userAccessToken')
        	var coupon = this.queryAjax('/qapi/user/coupons.do','post',{status:'N',size:10,pageNo:this.nextPage1},token)
        	// console.log(coupon)
        	var state=coupon.head.code;
        	if(state=='0000'){
        		//console.log(coupon.body.list.length)
            this.nextPage1 = coupon.body.nextPage;   
        		if(coupon.body.list.length==0){
        			this.coupon1sates1=false;
        			this.coupon1sates2=true;
        		}else{
        			this.coupon1sates1=true;
        			this.coupon1sates2=false;
        			for(var i=0;i<coupon.body.list.length;i++){
        				this.coupons.push(coupon.body.list[i]);
      					var couponlist=coupon.body.list[i];
      					this.coupons[i].name=couponlist.lotteryName;
      					this.coupons[i].scope=couponlist.validateProduct;
      					this.coupons[i].validateMoneyTips=couponlist.validateMoneyTips
      					this.coupons[i].lotteryValue=couponlist.lotteryValue/100
      					this.coupons[i].overTime=couponlist.overTime
      					this.coupons[i].count=couponlist.count
      					//日期判断
      					if(couponlist.periodType=='day'){
      						this.coupons[i].day=couponlist.validatePeriod+'天'
      					}else if(couponlist.periodType=='month'){
      						this.coupons[i].day=couponlist.validatePeriod+'月'
      					}else if(couponlist.periodType=='year'){
      						this.coupons[i].day=couponlist.validatePeriod+'年'
      					}
        			}
        		}
        	}else{
        		this.$dialog.toast({mes:coupon.head.memo , timeout: 2000})
        	}
        	//过期的优惠券使用
        	var coupon2 = this.queryAjax('/qapi/user/coupons.do','post',{status:'O',size:10,pageNo:this.nextPage2},token)
        	var state2=coupon2.head.code;
        	if(state2=='0000'){
        		//console.log(coupon2.body.list.length)
            this.nextPage2=coupon2.body.nextPage;   
        		if(coupon2.body.list.length==0){
        			this.coupon2sates1=false;
        			this.coupon2sates2=true;
        		}else{
        			this.coupon2sates1=true;
        			this.coupon2sates2=false;
        			for(var i=0;i<coupon2.body.list.length;i++){
        				this.coupons2.push(coupon2.body.list[i]);
      					var couponlist2=coupon2.body.list[i];
                 // console.log(couponlist2.status)
      					this.coupons2[i].name=couponlist2.lotteryName;
      					this.coupons2[i].scope=couponlist2.validateProduct;
      					this.coupons2[i].validateMoneyTips=couponlist2.validateMoneyTips
      					this.coupons2[i].lotteryValue=couponlist2.lotteryValue/100
      					this.coupons2[i].overTime=couponlist2.overTime
      					this.coupons2[i].count=couponlist2.count
                //优惠券的状态
                this.coupons2[i].status=couponlist2.status
      					//日期判断
      					if(couponlist2.periodType=='day'){
      						this.coupons2[i].day=couponlist2.validatePeriod+'天'
      					}else if(couponlist.periodType=='month'){
      						this.coupons2[i].day=couponlist2.validatePeriod+'月'
      					}else if(couponlist.periodType=='year'){
      						this.coupons2[i].day=couponlist2.validatePeriod+'年'
      					}
                //图片的切换
        			}
        		}
        	}else{
        		this.$dialog.toast({mes:coupon2.head.memo , timeout: 2000})
        	}

        },
        methods: {
          handleTabChange (val) {
            this.activeTab = val
          },
          more1(){
            var token = sessionStorage.getItem('userAccessToken')
            var coupon = this.queryAjax('/qapi/user/coupons.do','post',{status:'N',size:10,pageNo:this.nextPage1},token)
            // console.log(coupon)
            var listArray=coupon.body.list;
            var prolistsize = this.coupons.length;
            // console.log(prolistsize)
            if(listArray.length<=0){
                this.$dialog.notify({
                        mes:"没有更多数据",
                        timeout: 3000})
                this.$refs.more1.innerText="全部"
                console.log(this.$refs.more1.innerText)
            }else{
              this.nextPage1=coupon.body.nextPage;
              for(var i=0;i< listArray.length;i++){
                this.coupons.push(listArray[i]);
                var couponlist=listArray[i];
                this.coupons[prolistsize+i].name=couponlist.lotteryName;
                this.coupons[prolistsize+i].scope=couponlist.validateProduct;
                this.coupons[prolistsize+i].validateMoneyTips=couponlist.validateMoneyTips
                this.coupons[prolistsize+i].lotteryValue=couponlist.lotteryValue/100
                this.coupons[prolistsize+i].overTime=couponlist.overTime
                this.coupons[prolistsize+i].count=couponlist.count
                //日期判断
                if(couponlist.periodType=='day'){
                  this.coupons[prolistsize+i].day=couponlist.validatePeriod+'天'
                }else if(couponlist.periodType=='month'){
                  this.coupons[prolistsize+i].day=couponlist.validatePeriod+'月'
                }else if(couponlist.periodType=='year'){
                  this.coupons[prolistsize+i].day=couponlist.validatePeriod+'年'
                }
              }
            }
           
          },
          more2(){
            var token = sessionStorage.getItem('userAccessToken')
            var coupon2 = this.queryAjax('/qapi/user/coupons.do','post',{status:'O',size:10,pageNo:this.nextPage2},token)
            // console.log(coupon2)
            var listArray2=coupon2.body.list;
            var prolistsize2 = this.coupons2.length;
            if(listArray2.length<=0){
                this.$dialog.notify({
                        mes:"没有更多数据",
                        timeout: 3000})
                this.$refs.more2.innerText="全部"
                console.log(this.$refs.more1.innerText,this.$refs.more2.innerText)
            }else{
              this.nextPage2 = coupon2.body.nextPage;
              // console.log( this.nextPage1)
              for(var i=0;i< listArray2.length;i++){
                this.coupons2.push(listArray2[i]);
                var couponlist2=listArray2[i];
                this.coupons2[prolistsize2+i].name=couponlist2.lotteryName;
                this.coupons2[prolistsize2+i].scope=couponlist2.validateProduct;
                this.coupons2[prolistsize2+i].validateMoneyTips=couponlist2.validateMoneyTips
                this.coupons2[prolistsize2+i].lotteryValue=couponlist2.lotteryValue/100
                this.coupons2[prolistsize2+i].overTime=couponlist2.overTime
                this.coupons2[prolistsize2+i].count=couponlist2.count
                //日期判断
                if(couponlist2.periodType=='day'){
                  this.coupons2[prolistsize2+i].day=couponlist2.validatePeriod+'天'
                }else if(couponlist2.periodType=='month'){
                  this.coupons2[prolistsize2+i].day=couponlist2.validatePeriod+'月'
                }else if(couponlist2.periodType=='year'){
                  this.coupons2[prolistsize2+i].day=couponlist2.validatePeriod+'年'
                }
              }
            }

          }
        }
    }  
</script>
<style scoped>
.coupon-tabs .mu-tabs{background: #fff;border-bottom:1px solid #ccc;margin-bottom: 0.181rem;z-index:0;}
.coupon-tabs .coupon-mytab{   color:#333;font-size: 0.332rem;width: 50%;padding:0;line-height: 1rem}
/*.coupon-tabs .coupon-mytab:first-child{border-right:1px solid #ccc;}*/
.coupon-tabs .coupon-mytab.mu-tab-active{color:#e71a19;}
 /*tab切换下方的线*/
.coupon-tabs .mu-tab-link-highlight{height:2;background-color:#e71a19;}
.coupon-empty-pic { /* width: 176px; */height: 400px;margin: 13% 0 0 -7%;background: url(../../assets/img/account/empty.png) no-repeat center center;background-size: 2.312rem 2.789rem;}
.coupon li {width: 7.028rem;position: relative;color: #333;height: 2.693rem;background: url(../../assets/img/account/bg1.png) no-repeat;background-size: 7.028rem 2.693rem;margin: 5% auto 0;}
.coupon2 li {width: 7.028rem;position: relative;color: #333;height: 2.693rem;background: url(../../assets/img/account/bg2.png) no-repeat;background-size: 7.028rem 2.693rem;margin: 5% auto 0;}
.coupon2 .status1 {width: 7.028rem;position: relative;color: #333;height: 2.693rem;background: url(../../assets/img/account/bg2.png) no-repeat;background-size: 7.028rem 2.693rem;margin: 5% auto 0;}
.coupon2 li.status2 {width: 7.028rem;position: relative;color: #333;height: 2.693rem;background: url(../../assets/img/account/bg3.png) no-repeat;background-size: 7.028rem 2.693rem;margin: 5% auto 0;}
.coupon li>p {font-size: 0.235rem;color: #666;line-height: 0.44rem;padding: 0 0.203rem 0 0.203rem;}
.coupon li>p.stress {font-size: .362rem;margin-bottom: .3rem;color: #e71a19;padding: 0.203rem 0.203rem 0 0.203rem;}
.coupon li>p.stress.abs {position: absolute;top: 35%;right: 0;color: #fff;font-size: 0.742rem;font-family: arial;width: 32%;text-align: center;padding: 0;}
.coupon li .u-overdu {line-height: 0.55rem;height: 0.55rem;border-top: 1px solid #E7E7E7;color: #999;margin-top: 4%;width: 58%;}
.coupon-meta span {font-size: 0.235rem;color: #666;}
.coupon-count {position: absolute;right: 28px;bottom: 10px;background: rgba(255,255,255,.4);border-radius: 50%;color: #fff;display: block;height: 26px;line-height: 26px;width: 26px;text-align: center;font-size: 16px;font-style: normal;}
.more {text-align: center;display: block;padding: .3rem 0;margin-top: -1px;font-size: .277rem;color: #333;margin-bottom: 0.9843rem;}
.more2 {text-align: center;display: block;padding: .3rem 0;margin-top: -1px;font-size: .277rem;color: #333;margin-bottom: 0.9843rem;}
</style>