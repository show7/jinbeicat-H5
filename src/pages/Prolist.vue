<template>  
    <div class="prolist_container">  
       <header class="u-header">金贝定存</header>
        <div class="tabs">
          <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="tab1" title="新手标" class="mytab"/>
            <mu-tab value="tab2" title="金贝定存" class="mytab"/>
          </mu-tabs>
          <div v-if="activeTab === 'tab1'">
            <tab-first></tab-first>
          </div>
          <div v-if="activeTab === 'tab2'">
            <tab-second></tab-second> 
          </div>
        </div>
        <footer-nav v-bind:class="{'isIndex':isNowPage}"></footer-nav>
    </div>  
</template>  
<script>  
    // 导入要用到的子组件  
  import CommonHeader from '../components/Header'
  import TabFirst from '../components/prolist/TabFirst'
  import TabSecond from '../components/prolist/TabSecond'
  import FooterNav from '../components/Footer.vue'
    export default {  
        data(){
            return { 
              isNowPage: true,
              activeTab: 'tab1'
            }
        },
        components: {
            FooterNav,  
            TabFirst,
            TabSecond
        },
        methods: {
          handleTabChange (val) {
            this.activeTab = val
          }      
        }
    }  
</script>  
<style scoped> 

.mu-tab-link .mu-tab-text{ font-family: "微软雅黑";}
.u-header {color: #fff; font-size: 0.380rem; line-height: 0.863rem;background: #e71a19;text-align: center; height: 0.863rem; position: relative;}
body{
  background: #f5f5f5;
}
.prolist_container ul:not(.md-list)>li+li {
   margin-top: 0px; 
}
/*.tabs{
  margin-top: 0.774rem;
}*/
.tabs .mu-tabs{
  background: #fff;
  border-bottom:1px solid #ccc;
  margin-bottom: 0.181rem;
  z-index:0;
}
.tabs .mytab{   
  color:#333;
  font-size: 0.332rem;
  width: 50%;
  padding:0;
  margin:0.302rem 0;
  min-height: 0;
}
.tabs .mytab:first-child{
  border-right:1px solid #ccc;
}
.tabs .mytab.mu-tab-active{
  color:#e71a19;
}
  /*tab切换下方的线*/
.tabs .mu-tab-link-highlight{
  height:2;
  background-color:#e71a19;
}
</style>  
<style>
.more{
  text-align: center;
  display: block;
  padding: .3rem 0;
  margin-top: -1px;
  font-size: .277rem;
  color: #333;
  margin-bottom: 0.9843rem;
 
}
</style>