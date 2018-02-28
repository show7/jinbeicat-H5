<template>
  <div>
      <header class="u-header"> <a class="back"  @click="clearYear"><img src="../../assets/img/left.png"></a>回款日历</header>
       <vue-event-calendar :events="demoEvents" @monthChanged="" @dayChanged="" @day-changed="handleDayChanged" @month-changed="handleMonthChanged"></vue-event-calendar>
            <div class="events-wrapper">
              <div class="cal-events">
                <slot>
                  <div v-for="(event, index) in dateList" class="event-item">
                    <div class="model">
                        <p class="details"><span class="month">{{event.month}}</span> <span class="info">本金 <span v-text="event.principal"></span> 元 + 收益 <span v-text="event.earnings" class="Profit"></span> 元</span><span v-if="event.status != 'N' " class="reimbursement">已回款</span><span v-if="event.status == 'N' " class="retrial">待回款</span></p>
                        <p class="Label"><span class="year" v-text="event.year"></span> <span class="labelName">{{event.title}}</span></p>
                        <a @click='listInfor(index)' class="left_icon"></a>
                    </div>
                    <!-- <cal-event-item :event="event" :index="index" :locale="locale"></cal-event-item> -->
                  </div>
                </slot>
              </div>
            </div>
  </div>
 
</template>

<script>
import '@/assets/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
 //可以设置语言，支持中文和英文
export default {
  data () {
    return {
      demoEvents: [
        // date: '2017/12/15',
        // // title: '',
        // principal:'800',
        // Profit:'3.31',
        // labelName:'月月盈037',
        // static:'N',
        // id:1
      ],
      dateList:[]
    }
  },
  created(){
      
    // location.reload()
    // setTimeout(window.location.reload(),10);
      var token = sessionStorage.getItem('userAccessToken');
      var dateTime = sessionStorage.getItem('yearMonth');
      if(dateTime){
          this.ajax(dateTime,token);
      }else{
          // this.reloader();
          var date = new Date();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          var yearMonth = year+"-"+month;
          var today = String(date.getDate()).length>1? date.getDate():'0'+date.getDate();
          // console.log(yearMonth,today);
          var date=this.ajax(yearMonth,token,today);
      }
      // if(token){
      //     this.$router.push({path:"/login"})
      // }
      // var day = 5;
      
  },
  beforeDestroy(){
    // this.$router.go(0);
    // window.location.reload();
    // sessionStorage.removeItem("yearMonth");
  },
  methods: {
    clearYear(){
      // var timer = setTimeout(window.location.reload(),10000);
      // timer =null;
      // sessionStorage.removeItem("yearMonth");
      // this.$destroy();
      this.$router.push({path:'/Account'});
          var date = new Date();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          // var yearMonth = year+"-"+month;
          var today = String(date.getDate()).length>1? date.getDate():'0'+date.getDate();
          this.$EventCalendar.toDate(year+"/"+month+"/"+today)
          // console.log("'"+year+"/"+month+"/"+today+"'")
     //指定日期
      // alert(a)
    },
    listInfor(index){
        var token = sessionStorage.getItem('userAccessToken');
        var y=this.dateList[index].backTime.substring(0,4);
        var m=this.dateList[index].backTime.substring(5,7);
        var ym = y+'-'+m;
        // console.log(ym);
        var yymm = sessionStorage.setItem('yearMonth',ym);
        // var date = this.ajax(ym,token);
        // var m=this.dateList[index].year.substring(0,5);
        // console.log(ym);
        this.$router.push({path:"/date/details",query:{
            backTime:this.dateList[index].backTime,
            createTime:this.dateList[index].createTime,
            cycle:this.dateList[index].cycle,
            rate:this.dateList[index].rate,
            title:this.dateList[index].title,
            totalAmount:this.dateList[index].totalAmount,
            earnings:this.dateList[index].earnings,//收益
            principal:this.dateList[index].principal,
            status:this.dateList[index].status   


        }})
        // console.log(this.dateList[index].backTime)
      },
    ajax(yearMonth,token,day){
        var accountant = this.serviceAjax('/api/account/calendar.do','post',{yearMonth:yearMonth,onlyDay:day},token);
        // console.log(yearMonth,day);
        // console.log(accountant);
        if(accountant.head.code=="0000"){
            if(accountant.body.datePicker.length>0){
                for(var i=0;i<accountant.body.datePicker.length;i++){
                    var date1 = yearMonth+"/"+accountant.body.datePicker[i].day;
                    var date2 = date1.replace('-', '/');
                    var objstr1 = {date:date2,static:accountant.body.datePicker[i].status};
                    this.demoEvents.push(objstr1)
                    // console.log(this.demoEvents);

                }
                for(var j=0;j<accountant.body.dataList.length;j++){

                  var obj2={
                            earnings:accountant.body.dataList[j].earnings,
                            id:accountant.body.dataList[j].id,
                            month:accountant.body.dataList[j].month,
                            principal:accountant.body.dataList[j].principal,
                            status:accountant.body.dataList[j].status,
                            title:accountant.body.dataList[j].title,
                            year:accountant.body.dataList[j].year,
                            // 详情信息
                            backTime:accountant.body.dataList[j].backTime,
                            createTime:accountant.body.dataList[j].createTime,
                            cycle:accountant.body.dataList[j].cycle,
                            rate:accountant.body.dataList[j].rate,
                            totalAmount:accountant.body.dataList[j].totalAmount
                            
                          }
                          this.dateList.push(obj2)
                          // console.log(this.dateList)
                }
                // console.log(date)
            }
          // return accountant;

        }
        return 1
    },
    handleDayChanged (day) {
        // console.log("天天天")
        this.dateList=[]
        var year = day.date.split("/")[0];
        var month = day.date.split("/")[1].length>1 ? day.date.split("/")[1]:'0'+day.date.split("/")[1];
        var selectedDay = day.date.split("/")[2].length>1 ? day.date.split("/")[2]:'0'+day.date.split("/")[2];
        var yearMonth = year+"-"+month;
        // console.log(selectedDay)
        // var token = sessionStorage.getItem('userAccessToken');
        // var yearMonth = year+"-"+month1;
        var token = sessionStorage.getItem('userAccessToken');
        if(this.demoEvents.length != 0){
            var date=this.ajax(yearMonth,token,selectedDay);
        }
        
        // console.log(date)
        // 
    },
    handleMonthChanged (month) {
        this.dateList=[]
        // console.log(this.demoEvents);
        // console.log("月月月"+month)
        var year = month.substring(0,4);
        var month1 = month.substring(5,7);
        var token = sessionStorage.getItem('userAccessToken');
        var yearMonth = year+"-"+month1;
        // console.log(yearMonth)
        var date = this.ajax(yearMonth,token);
        // console.log(date);
    }
  }

}
</script>
<style scoped>
.__vev_calendar-wrapper .cal-wrapper{
    width:100%;padding:0.452rem !important;
}
.__vev_calendar-wrapper .cal-wrapper .cal-body .weeks{
    font-size: 0.24rem;
   }
.__vev_calendar-wrapper .cal-wrapper .cal-body .dates{
    font-size: 0.24rem;
}

</style>