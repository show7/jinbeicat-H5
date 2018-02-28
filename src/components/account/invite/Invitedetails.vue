<template>
	<div class="invite-details">
		<header class="u-header"> <a class="back" href="javascript:history.back();"><img src="../../../assets/img/left.png"></a>邀请记录</header>
		<div class="decords">
			<div class="middle">
			    <!-- 邀请记录 -->
			    <ul style="" class="investRecord clearfix">
			        <li class="row-half" style="width: 50%;">
			            <p>邀请人数（人）</p>
			            <p class="stress">{{invite.num}}</p>
			        </li>
			        <li class="row-half" style="width: 50%;">
			            <p>好友投资（元）</p>
			            <p class="stress">{{invite.money}}</p>
			        </li>
			    </ul>
			    <div class="table1" v-show="list1">
			    	 <table class="tableStyle_y" cellspacing="0" cellpadding="0" >
			        	 <thead>
				            <tr>
				                <th width="25%">好友账号</th>
				                <th width="25%">注册日期</th>
				                <th width="25%">实名认证</th>
				                <th width="25%">投资笔数</th>
				            </tr>
				        </thead>
				        <tbody class="List" >
				        	<tr><td colspan="5" style="text-align:center;border:0;width:100%">暂无记录</td></tr>
				        </tbody>
				    </table>
			    </div>
			   <div class="table2" v-show="list2">
				   	<table class="tableStyle_y" cellspacing="0" cellpadding="0">
				         <thead>
				            <tr>
				                <th width="25%">好友账号</th>
				                <th width="25%">注册日期</th>
				                <th width="25%">实名认证</th>
				                <th width="25%">投资笔数</th>
				            </tr>
				        </thead>
				         <tbody class="List" >
				        	<tr v-for="list in lists">
				        		<td width="25%">{{list.mobile}}</td>
				        		<td width="25%">{{list.time}}</td>
				        		<td width="25%">{{list.name}}</td>
				        		<td width="25%">{{list.num}}</td>
				        	</tr>
				        </tbody>
				      
				    </table> 
				   <div style="cursor:pointer;" class="more" id="btn-refresh" @click="more" ref='more'>查看更多</div>
			   </div>
			</div>
		</div>
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
				list1:'',
				list2:'',
				invite:{},
				nextPage : 1,
				lists:[]
			}
		},
		methods:{
			more(){
				var token = sessionStorage.getItem('userAccessToken')
			    var invite = this.queryAjax('qapi/user/my/referrer.do','post',{size:10,pageNo:this.nextPage},token)
			   // console.log(invite)
			    var code=invite.head.code;
			    var list=invite.body.relist;
			    var lists = this.lists.length;
				if(list.length==0){
					this.$dialog.notify({
	                mes:"没有更多数据",
	                timeout: 3000})
					this.$refs.more.innerText="全部"
				}else{
					this.nextPage = invite.body.nextPage;
				   for(var i=0;i<invite.body.relist.length;i++){
		    			this.lists.push(invite.body.relist[i]);
		    			var invitelist=invite.body.relist[i];
		    			this.lists[lists+i].mobile=invitelist.mobile;
		    			this.lists[lists+i].time=invitelist.registTime;
		    			// this.lists[i].name=invitelist.bindBankStatus;
		    			//实名认证的显示信息
		    			if(invitelist.bindBankStatus=='Y'){
		    				this.lists[lists+i].name="有"
		    			}else{
		    				this.lists[lists+i].name="无"
		    			}
		    			this.lists[lists+i].num=invitelist.investCount;
		    		}
				}
			}
		},
		created:function(){
			var token = sessionStorage.getItem('userAccessToken')
		    var invite = this.queryAjax('qapi/user/my/referrer.do','post',{size:10,pageNo:this.nextPage},token)
		    //console.log(invite)
		    var code=invite.head.code;
		    if(code=='0000'){
		    	//查询成功
		    	//上部邀请的总人数
		    	this.invite.num=invite.body.referrCount;
		    	this.invite.money=(invite.body.investTotal/100).toFixed(2);
		    	this.nextPage = invite.body.nextPage;
		    	//查询分页的显示
		    	var length=invite.body.relist.length;
		    	if(length==0){
		    		this.list1=true;
		    		this.list2=false;
		    	}else{
		    		this.list2=true;
		    		this.list1=false;
		    		for(var i=0;i<invite.body.relist.length;i++){
		    			this.lists.push(invite.body.relist[i]);
		    			var invitelist=invite.body.relist[i];
		    			this.lists[i].mobile=invitelist.mobile;
		    			this.lists[i].time=invitelist.registTime;
		    			// this.lists[i].name=invitelist.bindBankStatus;
		    			//实名认证的显示信息
		    			if(invitelist.bindBankStatus=='Y'){
		    				this.lists[i].name="有"
		    			}else{
		    				this.lists[i].name="无"
		    			}
		    			this.lists[i].num=invitelist.investCount;
		    		}
		    	}
		    }else{
		    	//查询失败
		    	this.$dialog.toast({mes:invite.head.memo , timeout: 2000})
		    }
		}
	}
</script>
<style scoped>
ul:not(.md-list) > li + li { margin-top: 0px;}
.middle {margin: 0 auto;margin-bottom: 0.9843rem;width: 100%;min-width: 320px;}
.investRecord {padding: .4rem 0;font-size: .4rem;background: #f5f5f5;overflow: hidden;}
.investRecord li.row-half {display: inline-block;width: 33%;float: left;text-align: center;font-size: 0.2778rem;color: #333333;}
.investRecord li .stress {font-size: 0.2778rem;margin-top: .2rem;color: #c71a19;font-family: arial;}
.tableStyle_y {width: 100%;background: #fff;font-size: .4rem;text-align: center;}
.tableStyle_y th, .tableStyle_y td {height: 1.2rem;line-height:1.2rem;border-bottom: 1px solid #c9c9c9;font-size: 0.25rem;}
.more {text-align: center;display: block;padding: .3rem 0;margin-top: -1px;font-size: .277rem;color: #333;}
.table1 table tr td, .table1 table tr th {
    float: left;
     width: 25%; 
    color: #999;
    font-size: .217rem;
    padding: 0;
    text-align: center;
}
</style>