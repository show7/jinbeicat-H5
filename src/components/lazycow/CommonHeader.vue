<template>
	<div class="header">
		<div class="header_container">
			<div class="header_title">
				<span>金贝零钱</span>
				<!-- <i class="header_right_icon"></i> -->
			</div>
			
		</div>
	</div>
</template>
<style scoped> 
	.header{
		height:0.774rem;
		width: 100%;
		position: fixed;
		top:0;
		z-index:2;
	}
	.header .header_container{
		height:0.774rem;
		line-height:0.774rem;
		background: #e71a19;
		padding:0 0.272rem;
		
		overflow: hidden;
		text-align: center;
		font-size: 0.374rem;

	}
	.header_title{
		text-align: center;
		color: #fff;
	}
	.header_title i{
		display: inline-block;
		
	}
	/*.header_right_icon{
		position: absolute;
		right: 0.272rem;
		width: 0.452rem;
		height: 0.423rem;
		top:0.211rem;
		background: url(../../assets/img/edit.png);
		background-size: 100% 100%;
	}*/
</style>
<script>  
    export default {  
        methods: {  
            goBack(){  
                window.history.back();  
            }  
        }  
    }  
</script>  