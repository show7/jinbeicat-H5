<template>
	<div class="record">
		<header class="u-header">
			<a class="back" href="javascript:history.back();"><img src="../../assets/img/left.png"></a>投资记录</header>
		<ul class="investRecord clearfix">
			<li>
				<p class="stress">{{investTotalAmount}}</p>
				<p>总投资金额（元）</p>
			</li>
			<li class="row-half">
				<p class="stress">{{ducBackCapita}}</p>
				<p>待收本金（元）</p>
			</li>
			<li class="row-half">
				<p class="stress">{{ducBackInterest}}</p>
				<p>待收利息（元）</p>
			</li>
		</ul>
		<div class="tabs">
			<mu-tabs :value="activeTab" @change="handleTabChange">
				<mu-tab value="tab1" title="投资中" class="mytab" />
				<mu-tab value="tab2" title="回款中" class="mytab" />
				<mu-tab value="tab3" title="已结清" class="mytab" />
			</mu-tabs>
			<div>
				
				<tab-investment v-if="activeTab === 'tab1'"></tab-investment>
			</div>
			<div>
				
				<tab-payment v-if="activeTab === 'tab2'"></tab-payment>
			</div>
			<div>
				
				<tab-settle v-if="activeTab === 'tab3'"></tab-settle>
			</div>
		</div>
	</div>
</template>

<script>  
// 导入要用到的子组件
import Tabinvestment from '../account/record/Tabinvestment'
import Tabpayment from '../account/record/Tabpayment'
import Tabsettle from '../account/record/Tabsettle'
    export default {  
        data(){
            return { 
              activeTab: 'tab1',
              investTotalAmount:'',
              ducBackInterest:'',
              ducBackCapita:'',
            }
        },
        components: {
          'tab-investment': Tabinvestment,  
          'tab-payment':Tabpayment,
          'tab-settle':Tabsettle
        },
        methods: {
          handleTabChange (val) {
            this.activeTab = val
          }      
        },
        mounted: function () {
        	var investTotalAmount=localStorage.getItem("investTotalAmount")
            this.investTotalAmount=investTotalAmount
            var ducBackCapita=localStorage.getItem("ducBackCapita")
            this.ducBackCapita=ducBackCapita
            var ducBackInterest=localStorage.getItem("ducBackInterest")
            this.ducBackInterest=ducBackInterest
        	//console.log(ducBackCapita)
        	//this.investTotalAmount=sessionStorage.getItem('investTotalAmount')
        }
    }  
</script>

<style>
.investRecord {padding: .4rem 0;font-size: .4rem;background: #f5f5f5;overflow: hidden;}
.investRecord li {width: 33.3%;float: left;font-size: 0.2778rem;color: #333333;text-align: center;}
.investRecord li .stress {font-size: 0.2778rem;margin-top: .2rem;color: #c71a19;font-family: arial;}
ul:not(.md-list)>li+li {margin-top: 0;}
.mu-tabs{color: #666;font-size: 0.302rem; background: #fff;}
.mu-tabs .mu-tab-text{ color: #666;}
.mytab.mu-tab-active .mu-tab-text{color: #e71a19;}
.mu-tab-link-highlight{ border:1px solid #e71a19;}
</style>