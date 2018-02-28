<template>
	<div class="details">
		<common-header v-bind:data="test" :isshow='isshow'></common-header>
		<details-list :details='details'></details-list>
        <fixed-bottom :bottom='bottom'></fixed-bottom>  
	</div>
</template>
<script>
    import CommonHeader from '../../components/Header'
    import DetailsList from './DetailsList'
    import FixedBottom from './FixedBottom'
    export default { 
        data(){
            return { 
                test: {
                    msg:'季生息'
                },
                //数据
                details: {},
                bottom: {},
                isshow:true
            }
         },
        components: {  
            CommonHeader,
            DetailsList,
            FixedBottom 
        },
        created: function() {
            var token = sessionStorage.getItem('userAccessToken')
            var taskTid = sessionStorage.getItem("showTaskDetail");
            var taskDetailJson = this.queryAjax("/qapi/product/detail.do", "post", { pid: taskTid },token);
            var code=taskDetailJson.head.code;
            if(code=='0000'){
                this.taskDetail = taskDetailJson.body;
                var list=taskDetailJson.body.product;
              //  console.log(list)
                //修改标题
                this.test.msg=list.title;
                this.details.signs=list.activitys;
                this.details.rate=list.investRate-list.awardRate;
                this.details.addrate=list.awardRate;
                this.details.minmoney=+list.maxInvestCount+'.00';
                // 剩余可投list.amount-list.yesAount
                // 起投金额
                this.details.limit=(list.amount/100).toFixed(2);
                this.details.min=list.minInvestAmount/100;
                //判断周期
                var unit=list.unit;
                var cycle=list.cycle;
               if(unit=='day'){
	              this.details.cycle=+cycle+'天';
	           }else if(unit=="week"){
	               this.details.cycle=+cycle+'周';
	           }else if(unit=="month"){
	              this.details.cycle=+cycle+'个月';
	           }else if(unit=="year"){
	               this.details.cycle=+cycle+'年';
	           }
                //底部固定可投金额
                this.bottom.balance=(list.amount-list.yesAount)/100;
                //底部的按钮状态
                var status=list.status;
                if(status==2){
                    this.bottom.status='立即抢购';
                }else if(status==3){
                    this.bottom.status='复审中';
                }else if(status==4){
                    this.bottom.status='计息中';
                }else if(status==5){
                    this.bottom.status='回款中';
                }else{
                    this.bottom.status='已回款';
                }
            var taskDetailJson = this.queryAjax("/qapi/product/detail.do", "post", { pid: taskTid });
            this.taskDetail = taskDetailJson.body;
            var list=taskDetailJson.body.product;
           // console.log(taskDetailJson)
            //修改标题
            this.test.msg=list.title;
            this.details.msg=list.title;
            this.details.rate=list.investRate-list.awardRate;
            this.details.addrate=list.awardRate;
            this.details.minmoney=+list.maxInvestCount+'.00';
            sessionStorage.setItem('msg',list.title);
            // 剩余可投list.amount-list.yesAount
            // 起投金额
            this.details.limit=(list.amount/100).toFixed(2);
            this.details.min=list.minInvestAmount/100;
            sessionStorage.setItem('min',list.minInvestAmount/100)
            this.details.pageSize=list.pageSize;
            //判断周期
            var unit=list.unit;
            var cycle=list.cycle;
//         if(unit=='day'||cycle=='30'||cycle=='10'){
//             this.details.cycle=+cycle+'天';
//             }else{
//              this.details.cycle=+cycle+'个月';
//          }
           if(unit=='day'){
              this.details.cycle=+cycle+'天';
           }else if(unit=="week"){
               this.details.cycle=+cycle+'周';
           }else if(unit=="month"){
              this.details.cycle=+cycle+'个月';
           }else if(unit=="year"){
               this.details.cycle=+cycle+'年';
           }
            //底部固定可投金额
            this.bottom.balance=(list.amount-list.yesAount)/100;
            //底部的按钮状态
            var status=list.status;
            if(status==2){
                this.bottom.status='立即抢购';
            }else if(status==3){
                this.bottom.status='复审中';
            }else if(status==4){
                this.bottom.status='计息中';
            }else if(status==5){
                this.bottom.status='回款中';
            }else{
                this.bottom.status='已回款';
              
            }    
        }else{
          this.$dialog.notify({
           mes:taskDetailJson.head.memo,
            timeout: 3000})	
        }

    } 
}

</script>