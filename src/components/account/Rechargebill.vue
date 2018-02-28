<template>
	   <div class="u-rechbill">
	   	<header class="u-header"><a class="back" href="javascript:history.back();"><img src="../../assets/img/left.png"></a>账单  </header>
	   	<table class="u-tbl" cellspacing="0" cellpadding="0">
    	<tbody><tr>
    		<th>日期</th>
    		<th>状态</th>
    		<th>金额（元）</th>
    	</tr>
    	</tbody>
    	<tbody id="orderList">
    		<!--<tr class="u-wusu" v-show="show"><div>暂无数据</div></tr>-->
	   	  	<tr class="u-list"  v-show="show2" v-for="(lists,index) in list">
	   	  		<td>{{lists.createTime}}</td>
	   	  		<td>{{lists.status}}</td>
	   	  		<td>{{lists.realAmount}}</td>
	   	  	</tr>
	   	  
    	</tbody>
       </table>
       <div class="u-more" @click="more"  ref="more">暂无记录</div>
	   </div>
</template>
<style>
.yd-notify{ background-color: rgba(40,40,40,.8);position: fixed; top:40%;left:0; right:0;line-height: .28rem; font-size: .26rem; color: #fff; padding: .3rem .24rem; opacity: 0; -webkit-animation: notify-downin .2s linear forwards;animation: notify-downin .2s linear forwards; word-break: break-all;text-align: center;z-index: 2000;width:255px;border-radius:5px;margin:0 auto;}
</style>
<script>
export default {
	 data() {
	      return { 	
	        list:[],
	        show:'',
	        show2:'',
	         nextPage : 1
	        }
       },
	  mounted: function () {
	  	 var token = sessionStorage.getItem('userAccessToken')
         var logs = this.queryAjax('/qapi/user/record/recharge.do','post',{useTime:0,pageNo:this.nextPage,size:10},token)
          //console.log(logs)
          var code=logs.head.code
          if(code=="0000"){
            var list=logs.body.list
            this.nextPage = logs.body.nextPage;
           // console.log(list.length)
            if(list.length>0){
            	//this.show=false
            	this.show2=true
            	this.$refs.more.innerText='加载更多';
	            for(var i=0;i<list.length;i++){
	            	this.list.push(list[i])
	            	this.list[i].createTime=list[i].createTime
	            	this.list[i].realAmount=list[i].realAmount/100
	            	var statusa=list[i].status
	            	if(statusa=="SUB"){
	            		this.list[i].status="提交申请"
	            		//console.log(this.list[i].status)
	            	}else if(statusa=="SUC"){
	            		this.list[i].status="打款已成功"
	            	}else if(statusa=="FAI"){
	            		this.list[i].status="充值失败"
	            	}else if(statusa=="APL"){
	            		this.list[i].status="审核通过，代付款"
	            	}
	            	//console.log(this.list[i].status)
	            }
            }else{
            	this.show=true
            	this.show2=false
            }
           // console.log(list)
          }else{
          	this.$dialog.notify({
              mes:logs.head.memo,
              timeout: 3000})
          }
	  },
	   methods: {
	   	 more(){
	   	 var token = sessionStorage.getItem('userAccessToken')
         var logs = this.queryAjax('/qapi/user/record/recharge.do','post',{useTime:0,pageNo:this.nextPage,size:10},token)
         // console.log(logs)
          var code=logs.head.code
          if(code=="0000"){
            var list=logs.body.list
           // console.log(list.length)
          // var lengthlist=logs.body.list.length;
          // console.log(lengthlist);
           var listsize = this.list.length;
           		if(list.length!=0){
           			this.nextPage = logs.body.nextPage;
//		            if(list.length>0){
//		            	this.show=false
//		            	this.show2=true
                    this.$refs.more.innerText='加载更多';
			            for(var i=0;i<list.length;i++){
			            	this.list.push(list[i])
			            	this.list[listsize + i].createTime=list[i].createTime
			            	this.list[listsize + i].realAmount=list[i].realAmount/100
			            	var statusa=list[i].status
			            	if(statusa=="SUB"){
			            		this.list[listsize +i].status="提交申请"
			            		//console.log(this.list[i].status)
			            	}else if(statusa=="SUC"){
			            		this.list[listsize + i].status="打款已成功"
			            	}else if(statusa=="FAI"){
			            		this.list[listsize +i].status="充值失败"
			            	}else if(statusa=="APL"){
			            		this.list[listsize + i].status="审核通过，代付款"
			            	}
			            	//console.log(this.list[i].status)
			            }
//		            }else{
//		            	this.show=true
//		            	this.show2=false
//		            }
           }else{
           	this.$dialog.notify({
              mes:"没有更多数据",
              timeout: 3000})
           	this.$refs.more.innerText="全部"
           }
          }else{
          	this.$dialog.notify({
              mes:logs.head.memo,
              timeout: 3000})
          }
	   	 }
	   }
 
}
</script>
<style>
.u-tbl { width: 100%;}
.u-tbl th ,.u-tbl td{background: #fff;width: 33%; text-align: center;font-size: 0.302rem;color: #333;height: 0.906rem;line-height: 0,906rem;border-bottom: 1px solid #E7E7E7;}
.u-more{ font-size: 0.34rem;text-align: center; width: 100%; margin: 5% 0;}
</style>