<template>
	<div class="bankcenter">
		<header class="u-header"> <a class="back" href="javascript:history.back(-1);"><img src="../../assets/img/left.png"></a>实名绑卡</header>
		<bank-no></bank-no>
	</div>
</template>
<script>
	import BankNo from '../account/bank/BankNo' 
    export default {
    	 data(){
          return{
             isNowPage: true,
          }
        },  
        components: { 
           BankNo
        }
    }  
</script>
<style scoped>
	.u-header {color: #fff; font-size: 0.380rem; line-height: 0.863rem;background: #e71a19;text-align: center; height: 0.863rem; position: relative;}
	.u-header a { width: 0.253rem; height: 0.4227rem; float: left; position: absolute;left: 0.302rem;top: 25%;}
</style>