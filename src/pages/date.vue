<template>
  <div>
      <header class="u-header"> <a class="back" href="javascript:history.back();"><img src="../assets/img/left.png"></a>回款日历</header>
       <vue-event-calendar :events="demoEvents" @monthChanged="" @dayChanged="" @day-changed="handleDayChanged" @month-changed="handleMonthChanged"></vue-event-calendar>
        <div class=""></div>
        <div>
            <div class="h"></div>

        </div>
  </div>
 
</template>

<script>
import '@/assets/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
 //可以设置语言，支持中文和英文
export default {
  data () {
    return {
      demoEvents: [{
        date: '2017/12/15',
        title: '',
        desc: 'longlonglong description', 
        static:1,

      },{
        date: '2017/12/20',
        title: 'this is a title',
        desc: 'longlonglong description', 
        static:2
      
      },{
        date: '2017/12/21',
        title: 'this is a title',
        desc: 'longlonglong description', 
        static:2
      
      },{
        date: '2017/12/23',
        title: 'this is a title',
        desc: 'longlonglong description', 
        static:1
      
      }]
    }
  },
  methods: {
    handleDayChanged (month) {
      console.log(month)
    },
    handleMonthChanged (day) {
      console.log(day)
    }
  }
}
</script>
<style scoped>

.__vev_calendar-wrapper .cal-wrapper .cal-body .weeks{
    font-size: 0.24rem;
   }
.__vev_calendar-wrapper .cal-wrapper .cal-body .dates{
    font-size: 0.24rem;
}

</style>