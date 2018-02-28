(function ($) {
    $.fn.mydate = function () {
         var fun=function () {
            var date=new Date();            //定义一个日期对象；
            var year=date.getFullYear();    //获取当前年份；
            var month=date.getMonth()+1;    //获取当前月份；
            var day=date.getDate();  //获取当前日期；
            //回填数据
            $('.year').text(year);
            $('.month').text(month);
            datt(year,month,'');
        //下一月；
            $('.next').click(function(){
                next();
            });
        //上一月；
            $('.prev').click(function(){
                prev();
            });
        //返回本月；
            $('.tomon').click(function(){
                datt(year,month,'');
                $('.year').text(year);
                $('.month').text(month);
            });
            var _this = $(this);
//          console.log(_this)
            function datt(nian,yue,ri){
        //    计算本月1号是周几；
            var week=new Date(nian+'-'+yue+'-1').getDay();
        //计算本月有多少天；
            var days=new Date(nian,yue,0).getDate();
        //计算上月有多少天；
            var dayw=new Date(nian,yue-1,0).getDate();
        //将日历填回页面；拿出节假日
            var html='';
            for(var i=1;i<=days;i++){
                var time=new Date(nian,yue,i).getTime();
               //显示特殊假日
                html+="<li data-jr="+yue+"-"+ i +" data-id="+time+" data-date="+ nian+"-"+yue+"-"+i+" class='mydate'><span>"+i+"</span></li>"
            }
//          $(window).find('ul').html(html);
          $('.date ul').html(html);
        //获取当前日期的时间戳；
            var ym=new Date().getFullYear();
            var mm=new Date().getMonth()+1;
            var dm=new Date().getDate();
            var td_time=new Date(ym,mm,dm).getTime();
        // 日历里面时间戳跟当前时间戳比较；大于等于 可点击；小于不可点击；日期默认单选
            for(var k=0;k<days;k++){
                var tt_time=$('.date ul li').eq(k).attr('data-id');
                var num=0;
                //判断是否是周六或周日；添加特殊样式
                var wk=new Date($('.date ul li').eq(k).attr('data-date')).getDay();
                //周六周日特殊样式
        //      if(wk==6||wk==0){
        //  $('.date ul li').eq(k).addClass('act_wk')
        //      }
                if(tt_time == td_time){
                    $('.date ul li').eq(k).addClass('act_date');
                    $('.date ul li').eq(k).click(function(){
                        var _this=$(this);
                        _this.addClass('act_date');
                        _this.siblings('li').removeClass('act_date');
                        var dr=_this.attr('data-date');
                       // console.log( _this['context']['dataset']['id']);
                      // $('#myspan').html( _this['context']['dataset']['id']);
                    });
                }else{
                    $('.date ul li').eq(k).click(function(){
                        var _this=$(this);
                        _this.addClass('act_date');     //选择开始日期
                        _this.siblings('li').removeClass('act_date');
                        var dr=_this.attr('data-date');
                       // console.log(_this['context']['dataset']['id']);
                        // console.log( _this['context']['dataset']['id']);
                        // $('#myspan').html( _this['context']['dataset']['id']);
                    });
                }
        
           }
        //计算前面空格键；
            var html2='';
            for(var j=dayw-week+1;j<=dayw;j++){
                html2+="<li class='no_date'><span>"+j+"</span></li>";
            }
            $('.date ul li').eq(0).before(html2);
        //计算后面空格键；
            var html3='';
            for(var x=1;x<43-days-week;x++){
                html3+="<li class='no_date'><span>"+x+"</span></li>";
            }
            $('.date ul li').eq(days+week-1).after(html3);
        }
        //找出节假日；
        //下一月；
        function next(){
            var y=$('.year').text();
            var m=$('.month').text();
            if(m==12){
                y++;
                m=1;
            }else{
                m++;
            }
            $('.year').text(y);
            $('.month').text(m);
            datt(y,m,'')
        }
        //上一月；
        function prev(){
            var y=$('.year').text();
            var m=$('.month').text();
            if(m==1){
                y--;
                m=12;
            }else{
                m--;
            }
            $('.year').text(y);
            $('.month').text(m);
            datt(y,m,'')
        }
    }
    return this.each(fun);
}
})(jQuery);