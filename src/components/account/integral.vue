<template>
	<div class="integral">
		<header class="u-header"> <a class="back" href="javascript:history.back(-1);"><img src="../../assets/img/left.png"></a>我的积分</header>
		<div class="integral_content">
			<div class="top">
				<div class="date">
					<span class="num">{{date.num}}</span>积分
				</div>
				<div class="btn_group">
					<div class="btn_left">
						<a  href="javascript:;" @click="btn1">
							<i></i>积分商城
						</a>
					</div>
					<div class="btn_right">
						<a href="javascript:;" @click="btn2">
							<i></i>每日任务
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="integral_list">
			<div class="title">积分明细</div>
			<div class="item"  v-for="(list,index) in lists">
				<div class="list overflow">
					<div class="fl">
						<div class="name">
							<span>{{list.remark}}</span>
						</div>
						<div class="time">
							<span>{{list.createTime}}</span>
						</div>
					</div>
					<div class="fr">
						<span>+{{list.point}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="more" ref="more" @click="more" v-show="show1">加载更多</div>
		<div class="no" v-show="show2">暂无数据</div>
	</div>
</template>
<style>
	.yd-notify{ background-color: rgba(40,40,40,.8);position: fixed; top:40%;left:0; right:0;line-height: .28rem; font-size: .26rem; color: #fff; padding: .3rem .24rem; opacity: 0; -webkit-animation: notify-downin .2s linear forwards;animation: notify-downin .2s linear forwards; word-break: break-all;text-align: center;z-index: 2000;width:255px;border-radius:5px;margin:0 auto;}
</style>
<script type="text/javascript">
	export default {
		data() {
	        return{
	            date:{},
	            lists:[],
	            show1:false,
	            show2:false,
	            nextPage:1,
	            limit:10
	        }
	   },
	    created(){
	  	  var token = sessionStorage.getItem('userAccessToken');
	  	  if(token==null){
	  	  	  this.$router.push({ path:'/login'}) 
	  	  }else{
	  	  	//获取数据
	  	  	var date = this.queryAjax4("integralLog/listPage1",'post',{pageNo:this.nextPage,pageSize:this.limit},token); 
	  	  	var code=date.head.code;
//	  	  	 console.log(date)
	  	  	if(code=='0000'){
	  	  		this.date.num=date.body.integral;
	  	  		var list=date.body.list;
        		if(list.length==0){
        			 //没有数据显示
        			this.show1=false;
        			this.show2=true;
        		}else{
        			this.nextPage=date.body.nextPage;
    				for(var i=0;i<list.length;i++){
    				   this.show2=false;
        			   this.show1=true;
    				   this.lists.push(list[i]);
    				   this.lists[i].remark=list[i].remark;
    				   var time=list[i].createTime;
    				   var createTime= time.substr(0, time.lastIndexOf(':'));
//  				   console.log(createTime)
               	       this.lists[i].createTime=createTime;
                       this.lists[i].point=list[i].point;
        			}
        		}
        	}else{
        		this.$dialog.toast({mes:date.body.memo , timeout: 2000})
        	}
	  	  }
	   },
	   methods:{
	   	btn1(){
	   		this.$dialog.notify({
             mes:"建设升级中",
            timeout: 3000})
	   	},
	   	btn2(){
	   		this.$dialog.notify({
             mes:"建设升级中",
            timeout: 3000})
	   	},
	   	 more(){
	   	    var token = sessionStorage.getItem('userAccessToken')
	   	    // this.nextPage++;
	   	    // console.log(this.nextPage)
          	// var date = this.queryAjax4("integralLog/listPage1",'post',{offset:this.nextPage*this.limit,limit:this.limit},token); 
            var date = this.queryAjax4("integralLog/listPage1",'post',{pageNo:this.nextPage,pageSize:this.limit},token); 
//             console.log(date)
            var list=date.body.list;
            var size = this.lists.length;
            if(list.length<=0){
                this.show1=false;
        		this.show2=true;
                this.$dialog.notify({
                        mes:"没有更多数据",
                        timeout: 3000})
                this.$refs.more.innerText="全部"
               
            }else{
            	this.nextPage=date.body.nextPage;
              for(var i=0;i< list.length;i++){
              	this.show2=false;
        		this.show1=true;
                this.lists.push(list[i]);
                this.lists[size+i].remark=list[i].remark;
               	var time=list[i].createTime;
    		    var createTime= time.substr(0, time.lastIndexOf(':'));
//  				   console.log(createTime)
               	this.lists[size+i].createTime=createTime;
                this.lists[size+i].point=list[i].point;
               
              }
            }
           
	   	 }
	   }
	 }

</script>
<style type="text/css" scoped>
	.integral_content{background:#e71a19;}
	.integral_content .top{text-align: center;}
	.integral_content .top .date{padding-top:0.725rem;text-align: center;color: #fff;font-size: 0.278rem;}
	.integral_content .top .date span{font-size: 0.906rem;color: #fff;}
	.integral_content .top .btn_group{overflow: hidden;padding: 0.743rem 0.785rem 0.623rem  0.785rem;}
	/*.integral_content .top .btn_group .btn_left{margin-right: 0.906rem; }*/
	.integral_content .top .btn_group .btn_left,.integral_content .top .btn_group .btn_right{float:left;color:#fff;font-size: 0.302rem;}
	.integral_content .top .btn_group .btn_right{float:right;}
	.integral_content .top .btn_group .btn_left a,.integral_content .top .btn_group .btn_right a{display: inline-block;width: 2.476rem;height: 0.574rem;line-height:0.574rem;border:1px solid #fff; border-radius: 0.362rem;}
	.integral_content .top .btn_group .btn_left i,.integral_content .top .btn_group .btn_right i{margin-right: 0.121rem;position: relative;top:-0.04rem;}
	.integral_content .top .btn_left i{display:inline-block;width:0.296rem;height:0.296rem;background:url(../../../static/img/account/house.png) no-repeat; background-size: 0.296rem;vertical-align: middle;}
	.integral_content .top .btn_right i{display:inline-block;width:0.326rem;height:0.326rem;background:url(../../../static/img/account/calenda.png) no-repeat; background-size: 0.326rem;vertical-align: middle;}
	.integral_list{background: #f5f5f5;}
	.integral_list .title{font-size: 0.302rem;text-align: center;padding: 0.181rem 0;color:#333333}
	.integral_list .item .list{background: #fff;padding: 0.181rem 0.906rem;border-bottom: 1px solid #e6e6e6}
	.integral_list .item .list .name{color: #333333;font-size: 0.242rem;}
	.integral_list .item .list .time{color: #999999;font-size: 0.217rem;}
	.integral_list .item .list .fr{position: relative;top: 0.2rem;color: #333333;font-size: 0.242rem;}
	.more,.no{font-size: 0.302rem;text-align: center;padding: 0.181rem 0;color:#33333;padding:0.2rem 0;background: #fff;}
</style>