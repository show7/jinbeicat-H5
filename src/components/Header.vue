<template>
	<div class="header">
		<div class="header_container">
			<div class="header_title">
				<i class="header_btn header_btn_back"  v-on:click="goBack" v-show="isshow"></i>
				<span>{{data.msg}}</span>
			</div>			
		</div>
	</div>
</template>
<style scoped> 
.header{height:0.774rem;width: 100%;position: fixed;top:0;z-index:2;line-height:0.774rem;}
.header .header_container{height:0.774rem;line-height:0.774rem;background: #e71a19;padding:0 0.272rem;overflow: hidden;text-align: center;font-size: 0.374rem;}
.header_title{text-align: center;color: #fff;height:100%;}
.header_title i{display: inline-block;}
.header_title span{height: 100%;display: inline-block;}
.header_btn_back{position: absolute;left:0.272rem;top:0.201rem;height: 0.423rem;width: 0.254rem;background: url(../assets/img/return.png);background-size: 100% 100%;}
</style>
<script>  
    export default {
    	name:'header',
    	props: ['data','isshow'],
     	methods: {  
            goBack(){  
                window.history.back();  
            }  
        }  
    }  
</script>  