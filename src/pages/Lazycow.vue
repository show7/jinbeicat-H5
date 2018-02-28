<template>  
    <div class="container">  
        <common-header></common-header>  
        <profit-top></profit-top>
        <out-modal></out-modal>
        <in-modal></in-modal>
        <footer-nav v-bind:class="{'isIndex':isNowPage}"></footer-nav>
    </div>  
</template>  
<style scoped>  
    body{
      background: #fff;
    }
</style>  
<script>  
    // 导入要用到的子组件  
   import CommonHeader from '../components/lazycow/CommonHeader'  
   import ProfitTop from '../components/lazycow/ProfitTop'  
   import OutModal from '../components/lazycow/OutModal' 
   import InModal from '../components/lazycow/InModal' 
   import FooterNav from '../components/Footer.vue' 
    export default {  
        data(){
          return{
             isNowPage: true,
          }
        },
        components: {  
            CommonHeader,
            ProfitTop,
            FooterNav,  
            OutModal,
            InModal 
        }
    }  
</script>  