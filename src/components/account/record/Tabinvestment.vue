<template>
	<div class="table1">
	   <table>
	   	  <thead>
	   	  	 <tr>
	   	  	 	<th>投资标的</th>
	   	  	 	<th>投资金额（元）/时间</th>
	   	  	 	<th>状态</th>
	   	  	 </tr>
	   	  </thead>
	   	  <tbody>
	   	  	<tr class="u-wusu" v-show="show"><div>暂无数据</div></tr>
	   	  	<tr class="u-list"  v-show="show2" v-for="(lists,index) in list">
	   	  		<td class="u-dl">{{lists.pTitle}}</td>
	   	  		<td><P>{{lists.investAmount}}</P><p>{{lists.createTime}}</p></td>
	   	  		<td class="g-lv">{{lists.status}}</td>
	   	  	</tr>
	   	  	<div class="more" v-show="show2" @click="more" ref="more">加载更多</div>
	   	  </tbody>
	   </table>
	</div>
</template>

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
	  created: function () {
	  	 var token = sessionStorage.getItem('userAccessToken')
         var logs = this.queryAjax('qapi/user/invest/logs.do','post',{status:1,size:7,pageNo:this.nextPage},token)
        // console.log(logs)
          var code=logs.head.code
          if(code=="0000"){
          	this.nextPage = logs.body.nextPage;
          	var investTotalAmount=logs.body.investTotalAmount/100
          	var ducBackCapita=logs.body.ducBackCapital/100
          	var ducBackInterest=logs.body.ducBackInterest/100
            localStorage.setItem("investTotalAmount", investTotalAmount)
            localStorage.setItem("ducBackCapita", ducBackCapita)
            localStorage.setItem("ducBackInterest", ducBackInterest)
            var list=logs.body.list
            
           // console.log(list.length)
            if(list.length>0){
            	this.show=false
            	this.show2=true
	            for(var i=0;i<list.length;i++){
	            	this.list.push(list[i])
	            	this.list[i].pTitle=list[i].pTitle
	            	this.list[i].createTime=list[i].createTime
	            	this.list[i].investAmount=list[i].investAmount/100
	            	var statusa=list[i].status
	            	if(statusa=="1"){
	            	//	alert("111");
	            		this.list[i].status="投资中"
	            		//console.log(this.list[i].status)
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
         var logs = this.queryAjax('qapi/user/invest/logs.do','post',{status:1,size:7,pageNo:this.nextPage},token)
        // console.log(logs)
          var code=logs.head.code
          var listsize = this.list.length;
          if(code=="0000"){  
          	var investTotalAmount=logs.body.investTotalAmount/100
          	var ducBackCapita=logs.body.ducBackCapital/100
          	var ducBackInterest=logs.body.ducBackInterest/100
            localStorage.setItem("investTotalAmount", investTotalAmount)
            localStorage.setItem("ducBackCapita", ducBackCapita)
            localStorage.setItem("ducBackInterest", ducBackInterest)
            var list=logs.body.list
            
           // console.log(list.length)
            if(list.length==0){
            	this.show=false
            	this.show2=true
            	//if(list.length)
            	//var listsize = this.list.length;
            	//console.log(listsize)
            
            		this.$dialog.notify({
	                mes:"没有更多数据",
	                timeout: 3000})
					this.$refs.more.innerText="全部"
            	}else{
            	    this.nextPage = logs.body.nextPage;
            	   // console.log(this.nextPage)
            		for(var i=0;i<list.length;i++){
	            	this.list.push(list[i])
	            	this.list[listsize + i].pTitle=list[i].pTitle
	            	this.list[listsize + i].createTime=list[i].createTime
	            	this.list[listsize + i].investAmount=list[i].investAmount/100
	            	var statusa=list[i].status
	            	if(statusa=="1"){
	            	//	alert("111");
	            		this.list[listsize + i].status="投资中"
	            		//console.log(this.list[i].status)
	            	}
	            //	console.log(this.list[listsize + i])
	            }
            	}
	           
           
           // console.log(list)
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
.more{ font-size: 0.34rem;padding:3%; text-align: center;}
.table1 { background: #fff;}
.table1 table{ width: 100%;margin-bottom: 13%;}
.table1 table tr{border-bottom: 1px solid #E7E7E7;}
.table1 table tr th{line-height: 1.026rem;} 
.table1 table tr th ,.table1 table tr td{ float: left;width: 33.3%; color: #999; font-size: 0.217rem; padding:0 0; text-align: center;}
.u-wusu{ width: 100%; text-align: center;line-height:1.026rem ;}
.table1 table tr .g-lv{ color: #71c281;margin: .35rem 0;}
table{border-collapse: collapse;}
table tr{border-bottom:solid 1px #E7E7E7;}
.table1 table tr td p{line-height: 0.44rem;}
.table1 table tr  .u-dl{margin: .35rem 0;}
</style>