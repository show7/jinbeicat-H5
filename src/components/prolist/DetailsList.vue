<template>
	<div class="details-list">
		<div class="list-top">
			<div class="banner">
					<div class='signBox'><span v-if='sign!=""' class='sign' v-for='sign in details.signs'>{{sign}}</span></div>
	           <div class="top">
	           
	           		<p class="rate"><span class="big">{{details.rate}}</span>%+{{details.addrate}}%<span></span></p>
	           		<p>历史年化收益率<!-- <img src="../../../static/img/activity/hammer.png"> --></p>
	           </div> 
	           <div class="bottom">
	           		<ul>
	           			<li>
	           				<div class="top_info">{{details.min}}</div>
	           				<div class="bottom_txt">起投金额（元）</div>
	           			</li>
	           			<li>
	           				<div class="top_info">{{details.cycle}}</div>
	           				<div class="bottom_txt">项目周期</div>
	           			</li>
	           			<li>
	           				<div class="top_info">{{details.limit}}</div>
	           				<div class="bottom_txt">借款总额（元）</div>
	           			</li>
	           		</ul>
	           </div>
	        <!--<div class="progress-row clearfix">
            		<p class="progress-text">投资进度</p>
            	 	<p class="progress-number">2.40%</p>
                	<div class="progress">
                    	<div class="progress-bar" role="progressbar" aria-valuenow="2.40" aria-valuemin="0" aria-valuemax="100" style="width: 2.40%;"></div>
                	</div>
              </div>-->
        	</div>
        	<div class="center">
        		<ul>
        			<li class="icon1"><i></i>优良资产</li>
        			<li class="icon2"><i ></i>一次性还本付息</li>
        			<li class="icon3"><i ></i>多重风控</li>
        		</ul>
        	</div>
		</div>
		<div class="list-tab">
			<mu-tabs :value="activeTab" @change="handleTabChange">
            	<mu-tab value="tab1" title="项目说明" class="mytab"/>
           		<mu-tab value="tab2" title="信息披露" class="mytab"/>
           		<mu-tab value="tab3" title="投资记录" @click="getRecord" class="mytab"/>
         	</mu-tabs>
         	<div class="tab-list">
	         	<div v-if="activeTab === 'tab1'" class="list1">
		          	<details-list1 :entry='entry'></details-list1>
		        </div>
		        <div v-if="activeTab === 'tab2'" class="list2">
		          <!-- <img src="../../assets/img/imgsk.png" alt=""> -->
		          	<div class="list">
		          		<ul>
		          			<li @click="Lookimg" v-for="str in contract">
		          				<!-- <img v-src="../../assets/img/imgsk.png" alt=""> -->
		          				<img :src="str.src" alt="" @click="getsrc">
		          			</li>
		          		</ul>	
		          	</div>
		        </div>
		        <div v-if="activeTab === 'tab3'" class="list3">
		       		<div class="record">
						<div class="record-title">
							<div class="phone">投资人/投资时间</div>
							<div class="amount">投资金额（元）</div>
						</div>
						<details-list3 :lists='lists'></details-list3>
						<div class="record-more" @click="more" ref="more" v-show="showmore">加载更多</div>
					</div>
					<div class="record-more" v-show="showmore1">暂无记录</div>
		        </div>
         	</div>
	       
		</div>
	</div>
</template>
<script>
	import DetailsList1 from './DetailsList1'
	import DetailsList3 from './DetailsList3'
    export default {
    	//传递详情属性
    	props:['details'],
	    data(){
            return {
                activeTab: 'tab1',
                entry: {},
                lists: [],
                nextPage : 1,
                showmore:false,
                showmore1:false,
                contract:[]
            }
        },
        components: {
			'DetailsList3':DetailsList3,
			'DetailsList1':DetailsList1
		},
        methods: {
          handleTabChange (val) {
            this.activeTab = val
          },
          Lookimg(){
          	  this.$router.push({ path: '/prolist/details/contract' })
          },
          getsrc(e){

          	// console.log(e.target.src)
          	sessionStorage.setItem('src',e.target.src)
          },
          getRecord(){
          	var status=sessionStorage.getItem('status');
      		if(status!=2){
       		//不是立即投资状态
       			this.showmore1=true;
           		var token = sessionStorage.getItem('userAccessToken')
           		// console.log(token)
           		if(token!=null){
           			this.showmore1=true;
           			var taskTid = sessionStorage.getItem("showTaskDetail");
           			var uid=sessionStorage.getItem('uid');
           			 //var record= this.queryAjax2("investAPI/isUserInvest", 'post', { pid: taskTid,uid:uid},token);
         			 var record= this.queryAjax("qapi/product/isUserInvest.do", 'post', { pid: taskTid,uid:uid},token);

           			if(record.head.code=='0000'){
           				// console.log(record.body.code)
           				if(record.body.code=='1'){
           					//用户投资过此产品
           					this.showmore1=false;
           					var taskDetailJson2 = this.queryAjax("/qapi/invest/assetsinvertlist.do", 'post', { pid: taskTid,type:1,size:5,pageNo:this.nextPage});
				           	//console.log(taskDetailJson2)
				           	if(taskDetailJson2.head.code=='0000'){
				           		var list= taskDetailJson2.body.aiPOJOList;
				           		if(list.length==0){
				           			this.showmore=false;
				           		}else{
				           			this.showmore=true;
				           		}
				           		this.nextPage = taskDetailJson2.body.nextPage;
				           		for(var i=0;i<list.length;i++){
					                this.lists.push(list[i]);
					                this.lists[i].amount=list[i].invertAmount/100;
					                this.lists[i].mobile=list[i].nickName;
					                this.lists[i].createTime=list[i].invertDate;
					            }
				           	}else{
				           		this.$dialog.notify({
				                mes:taskDetailJson2.head.memo,
				                timeout: 3000})
				           	}
           				}else{
           					this.$dialog.notify({
				            mes:'您未投资过该产品不能查看投资记录',
				            timeout: 3000})
           				}
           			}else{
           				this.$dialog.notify({
		                mes:record.head.memo,
		                timeout: 3000})
           			}
           		}else{
           			// this.$router.push({ path: '/login' })
           			this.$dialog.notify({
		            mes:'请先进行登录',
		            timeout: 3000})
           		}
           	}else{
           		var taskTid = sessionStorage.getItem("showTaskDetail");
		      	var taskDetailJson2 = this.queryAjax("/qapi/invest/assetsinvertlist.do", 'post', { pid: taskTid,type:1,size:5,pageNo:this.nextPage});
				           	//console.log(taskDetailJson2)
	           	if(taskDetailJson2.head.code=='0000'){
	           		var list= taskDetailJson2.body.aiPOJOList;
	           		if(list.length==0){
	           			this.showmore=false;
	           		}else{
	           			this.showmore=true;
	           		}
	           		this.nextPage = taskDetailJson2.body.nextPage;
	           		for(var i=0;i<list.length;i++){
		                this.lists.push(list[i]);
		                this.lists[i].amount=list[i].invertAmount/100;
		                this.lists[i].mobile=list[i].nickName;
		                this.lists[i].createTime=list[i].invertDate;
		            }
	           	}else{
	           		this.$dialog.notify({
	                mes:taskDetailJson2.head.memo,
	                timeout: 3000})
	           	}
           	}
          },
          more(){
          	var taskTid = sessionStorage.getItem("showTaskDetail");
          	var taskDetailJson2 = this.queryAjax("/qapi/invest/assetsinvertlist.do", 'post', { pid: taskTid,type:1,size:5,pageNo:this.nextPage});
           	//console.log(taskDetailJson2)
           	if(taskDetailJson2.head.code=='0000'){
           		var length=taskDetailJson2.body.aiPOJOList.length;
           		var list= taskDetailJson2.body.aiPOJOList;
           		var listsize = this.lists.length;
           		if(length!=0){
           			this.nextPage = taskDetailJson2.body.nextPage;
           			for(var i=0;i<list.length;i++){
	                	this.lists.push(list[i]);
	                	this.lists[listsize + i].amount=list[i].invertAmount/100;
	               	 	this.lists[listsize + i].mobile=list[i].nickName;
	                	this.lists[listsize + i].createTime=list[i].invertDate;
	            	}
           		}else{
           			this.$dialog.notify({
	                mes:"没有更多数据",
	                timeout: 3000})
					this.$refs.more.innerText="全部"
           		}  		

           	}else{
           		this.$dialog.notify({
                mes:taskDetailJson2.head.memo,
                timeout: 3000})
           	}
          }
        },
        created: function() {
            var taskTid = sessionStorage.getItem("showTaskDetail");
            var taskDetailJson = this.queryAjax("/qapi/product/detail.do", 'post', { pid: taskTid});
            // console.log(taskDetailJson)
           	if(taskDetailJson.head.code=='0000'){
           		var investLogs=taskDetailJson.body.investLogs;
           		// console.log(investLogs)
	            // for(var i=0;i<investLogs.length;i++){
	            //     this.lists.push(investLogs[i]);
	            //     this.lists[i].amount=investLogs[i].amount/100;
	            //     this.lists[i].mobile=investLogs[i].mobile;
	            //     this.lists[i].createTime=investLogs[i].createTime;
	            // }
	            //项目说明的具体信息
	            var productLogs=taskDetailJson.body.product;
	            this.entry.description=productLogs.description;
            	// console.log(this.entry.description)
            	//获取信息披露图片信息
	          	var imglist=taskDetailJson.body.datas;
	          	for(var i=0;i<imglist.length;i++){
	          		this.contract.push(imglist[i]);
	          		this.contract[i].src=imglist[i].imgSrc;
	          	}
           	}else{
           		this.$dialog.notify({
                mes:taskDetailJson.head.memo,
                timeout: 3000})
           	}
           	var list=taskDetailJson.body.product;
           	var status=list.status;
           	sessionStorage.setItem('status',status)
        },
        mounted() {
        	 // 注册scroll事件并监听  
            window.addEventListener('scroll',function(){  
                var top=document.body.scrollTop;
                if(top>=200){
                	$('.mu-tabs').css({'position':'fixed','top':'0.774rem'});
                }else{
                	$('.mu-tabs').css({'position':'relative','top':'0'});
                } 
            })     
        }
    }
</script>
<style >
	.list-top .banner .top img{width: 0.489rem;height: 0.489rem; margin-left: 3%;display: inline-block;}
	.list-tab .mu-tab-link-highlight{ background-color: #e71a19; border: 1px solid #e71a19;}
	body{
		line-height:1;
		background: #f5f5f5;
	}
	.details-list{
		margin-top:0.774rem;
	}
	.details-list .list-top li{
		margin-top:0;
	}
	.details-list .list-top .banner{
		background: #fff;
		text-align: center;
	}
	.list-top .banner .top{
		padding-top:0.483rem;
		font-size:0.242rem;
		color:#999;
	}
	.list-top .banner .top .rate{
		font-size:0.332rem;
		color:#e71a19;
	}
	.list-top .banner .top .big{
		font-family: Arial;
		font-size: 0.725rem;
	}
	.list-top .banner .bottom{
		margin-top:0.996rem;
	}
	.list-top .banner .bottom ul{
		overflow:hidden;
	}
	.list-top .banner .bottom ul li{
		float:left;
		width: 33.33%;
		padding-bottom:0.483rem;
	}
	.list-top .banner .bottom .top_txt{
		font-size: 0.278rem;
		color: #333;
	}
	.list-top .banner .bottom .bottom_txt{
		font-size: 0.242rem;
		color: #999;
	}
	.list-top .center{
		background: #f5f5f5;
		padding:0.272rem 0;
	}
	.list-top .center ul{
		overflow: hidden;
	}
	.list-top .center li{
		color:#888;
		float:left;
		font-size: 0.217rem;
		width: 33.33%;
		text-align: center;
	}
	.list-top .center li i{
		width: 0.302rem;
		height:0.302rem;
		display: inline-block;
		background-repeat: no-repeat;
		background-size:100% 100%;
		margin-right:0.181rem;
	}
	.list-top .center .icon1 i{
		background-image:url(../../assets/img/excellent_icon.png);
	}
	.list-top .center .icon2 i{
		background-image:url(../../assets/img/money_icon.png);
	}
	.list-top .center .icon3 i{
		background-image:url(../../assets/img/safety_icon.png);
	}
	.list-tab {
		background:#f5f5f5;
	}
	.list-tab .tab-list{
	  background: #fff;
	  margin-bottom: 2.4rem;
	}
	.list-tab .tab-list .list1{
		  margin-top: 0.211rem;
	}
	.list-tab .tab-list .list2,.list-tab .tab-list .list3{
		margin-top:0;
	}
	.list-tab .mu-tabs{
	  background: #fff;
	  z-index:0;
	}
	.list-tab .mytab{   
	  color:#333;
	  font-size: 0.332rem;
	  width: 50%;
	  padding:0;
	  margin:0.302rem 0;
	  min-height: 0;
	}
	.list-tab .mytab.mu-tab-active{
	  color:#e71a19;
	}
	  /*tab切换下方的线*/
	.list-tab .mu-tab-link-highlight{
	  height:2;
	  background-color:#e71a19;
	}
	/*进度条样式*/
	.progress-row {
    	padding: 5%;
    	overflow: hidden;
	}
	.progress-row .progress-text {
	    float: left;
	    color: #999999;
	    font-size: 0.217rem;
	    line-height: 0.44rem;
	    padding-bottom: 2%;
	}
	.progress-row .progress-number {
	    float: right;
	    margin-left: .4rem;
	    color: #999999;
	    font-size: 0.217rem;
	    font-family: "微软雅黑";
	    line-height: 0.44rem;
	    padding-bottom: 2%;
	}
	.progress-row .progress {
	    width: 100%;
	    height: .2rem;
	    margin-top: 3px;
	    border-radius: 0.8rem;
	    -webkit-border-radius: 0.8rem;
	    -moz-border-radius: 0.8rem;
	    background: #f5f5f5;
	    overflow: hidden;
	}
	.progress .progress-bar {
	    float: left;
	    width: 0;
	    border-radius: 2px;
	    height: 100%;
	    font-size: 12px;
	    line-height: 20px;
	    color: #fff;
	    text-align: center;
	    background: #e71a19;
	}
	/*投资记录的设置*/
	.list1,.list2,.list3{
		padding-bottom: 2.3rem;
	}
	.list3 .record-title{
		background-color: #e5e5e5;
		padding: .2rem 0 .2rem .0;
    	border-bottom: 1px solid #e4e4e4;
    	overflow: hidden;
	}
	.list3 .record-title div{
		float: left;
		font-size: 0.23rem;
		width: 50%;
		padding: 0 0 0 .8rem;
   		box-sizing: border-box;
        -webkit-box-sizing: border-box;
	}
	.list3 .record-title div.amount{
		text-align: right;
		padding-right: .8rem;
	}
	.list2{
		background: #fff;
    	text-align: center;
    	display: block;

	}
	.list2 img{
		width: 6.503rem;
    	margin: 5% auto;
    	text-align: center;
    	max-width: 100%;
    	height: auto;
    	border: 3px solid #d9d9d9;
	}
	.list1 .entry-list .entry .entry-title{
		color: #333;
		font-size: 0.278rem;
	}
	.list3 .record-more{
	  text-align: center;
	  display: block;
	  padding: .3rem 0;
	  margin-top: -1px;
	  font-size: .277rem;
	  color: #333;
	  margin-bottom: 0.9843rem;
	  width:100%;
	 
	}
	.signBox{
		text-align: left;
		padding:0 0.272rem;
		padding-top: 0.272rem;
	}
	.sign{
    border: 1px solid red;
    font-size: 0.2rem;
    color: #f23648;
    border-radius: 0.03rem;
    margin-left: 0.060rem;
    display: inline-block;
    padding: 0.02rem 0.03rem;
    /* box-sizing: border-box; */
}
</style>
