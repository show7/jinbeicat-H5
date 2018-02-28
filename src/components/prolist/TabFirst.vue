<template>
	<div class="tab-first">
		<div class="list-content">
			<app-prolists :prolists="prolists"></app-prolists>
			<div class="more" @click="more" ref="more">加载更多</div>
		</div>
	</div>
</template>
<script>
    import prolist from './list'
    export default{
    	data(){
    		return{
    			prolists:[],
    			nextPage : 1
    		}
    	},
    	components: {
			'app-prolists': prolist
		},
		mounted:function(){
			var token = sessionStorage.getItem('userAccessToken');
			var invest=this.queryAjax('qapi/product/list.do','post',{proType:'NEW_INVESTOR',size:10,pageNo:this.nextPage},token);
			if(invest.head.code=='0000'){
				var listArray=invest.body.list;
				this.nextPage = invest.body.nextPage;
				
				for(var i=0;i<listArray.length;i++){
					this.prolists.push(listArray[i]);
					this.prolists[i].name=listArray[i].title;
					this.prolists[i].signs=listArray[i].activitys;
					this.prolists[i].rate=listArray[i].investRate-listArray[i].awardRate;
					this.prolists[i].time=listArray[i].cycle;
					//获取列表页的pid进行传递
					this.prolists[i].id=listArray[i].pid;
					if(listArray[i].awardRate==0){
						this.prolists[i].awardRate='';
					}else{
						this.prolists[i].awardRate='+'+listArray[i].awardRate+'%';
					}
					//按钮的5中状态显示内容
					var status=listArray[i].status;
					if(status==2){
						this.prolists[i].status='立即抢购';
					}else if(status==3){
						this.prolists[i].status='复审中';
					}else if(status==4){
						this.prolists[i].status='计息中';
					}else if(status==5){
						this.prolists[i].status='回款中';
					}else{
						this.prolists[i].status='已回款';
					}
					//对于月和天的显示
	               var cycle=listArray[i].cycle;
	               var unit=listArray[i].unit;
	               if(unit=='day'){
	                this.prolists[i].time=+cycle+'天';
	               }else if(unit=="week"){
	                 this.prolists[i].time=+cycle+'周';
	               }else if(unit=="month"){
	                 this.prolists[i].time=+cycle+'个月';
	               }else if(unit=="year"){
	                 this.prolists[i].time=+cycle+'年';
	               }
	            }
				
			}else{
				this.$dialog.notify({
                mes:invest.head.memo,
                timeout: 3000})
			}
			
		},
		methods: {
		 more(){
           	var token = sessionStorage.getItem('userAccessToken');
			var invest=this.queryAjax('qapi/product/list.do','post',{proType:'NEW_INVESTOR',size:10,pageNo:this.nextPage},token);
			//console.log(invest)
		    var listArray=invest.body.list;
			var prolistsize = this.prolists.length;
			if(listArray.length==0){
				this.$dialog.notify({
                mes:"没有更多数据",
                timeout: 3000})
				this.$refs.more.innerText="全部"
			}else{
				this.nextPage = invest.body.nextPage;
				for(var i=0;i<listArray.length;i++){
					this.prolists.push(listArray[i]);
					this.prolists[prolistsize + i].name=listArray[i].title;
					this.prolists[prolistsize + i].signs=listArray[i].activitys;
					this.prolists[prolistsize + i].rate=listArray[i].investRate-listArray[i].awardRate;
					this.prolists[prolistsize + i].time=listArray[i].cycle;
					//获取列表页的pid进行传递
					this.prolists[prolistsize + i].id=listArray[i].pid;
					if(listArray[i].awardRate==0){
						this.prolists[prolistsize + i].awardRate='';
					}else{
						this.prolists[prolistsize + i].awardRate='+'+listArray[i].awardRate+'%';
					}
					//按钮的5中状态显示内容
					var status=listArray[i].status;
					if(status==2){
						this.prolists[prolistsize + i].status='立即抢购';
					}else if(status==3){
						this.prolists[prolistsize + i].status='复审中';
					}else if(status==4){
						this.prolists[prolistsize + i].status='计息中';
					}else if(status==5){
						this.prolists[prolistsize + i].status='回款中';
					}else{
						this.prolists[prolistsize + i].status='已回款';
					}
					//对于月和天的显示
	               var cycle=listArray[i].cycle;
	               var unit=listArray[i].unit;
	               if(unit=='day'){
	                this.prolists[prolistsize + i].time=+cycle+'天';
	               }else if(unit=="week"){
	                 this.prolists[prolistsize + i].time=+cycle+'周';
	               }else if(unit=="month"){
	                 this.prolists[prolistsize + i].time=+cycle+'个月';
	               }else if(unit=="year"){
	                 this.prolists[prolistsize + i].time=+cycle+'年';
	               }
				}
			}
          }
		}
    }
</script>