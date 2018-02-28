<template>
	<div class="record-list">
		<ul>
			<li v-for="list in lists">
				<div class="phone">
					<p class="top">{{list.mobile}}</p>
					<p class="bottom">{{list.createTime}}</p>
				</div>
				<div class="amount">{{list.amount}}</div>
			</li>
		</ul>
		<!-- <div class="record-more" @click="more" ref="more">加载更多</div> -->
	</div>
</template>
<style scoped>
	.list3 .record-list li{
		padding: .2rem 0 .2rem .0;
    	border-bottom: 1px solid #e4e4e4;
    	overflow: hidden;
	}
	.list3 .record-list div{
		float: left;
		font-size: 0.23rem;
		width: 50%;
		padding: 0 0 0 .8rem;
   		box-sizing: border-box;
        -webkit-box-sizing: border-box;
	}
	.list3 .record-list .phone{
	
		color: #333;
	}
	.list3 .record-list .phone .bottom{
		color:#999;
		margin-top:0.2rem;
		font-size: 0.181rem;
	}
	.list3 .record-list .amount{
		text-align: right;
    	padding-right: .9rem;
	}
</style>
<script>
	export default {
		props:['lists'],
		mounted:function(){
		}
	}
</script>