<template>
	<div class="list2-details">
		<header class="u-header"> <a class="back" @click="goBack"><img src="../../assets/img/left.png"></a>查看图片</header>
		<div class="details-img">
			<img :src="src" alt="">
		</div>
	</div>
</template>
<script>
	export default {
    	data(){
    		return{
    			src:sessionStorage.getItem('src')
    		}
    	},
     	methods: {  
            goBack(){  
                window.history.back();  
            }  
        }  
    }  
</script>