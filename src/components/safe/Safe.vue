<template>
    <div class="safe">
        <header class="u-header"> <a class="back" @click="goBack"><img src="../../assets/img/left.png"></a>安全保障</header>
        <div class="safe-center">
            <div class="safe-title">
                <h2>国资背景实力，专业技术保障</h2>
            </div>
            <div class="content">
                <h3><i class="icon1"></i>金贝猫介绍</h3>
                <p>金贝猫，隶属于上海如庆金融信息服务有限公司，注册实缴资本金5000万。是一家纯国资系的综合财富管理平台，100%国资控股。</p>
                <h3 class="mt"><i class="icon2"></i>资金保障计划</h3>
                <p>金贝猫为保障投资者的利益，设置了金贝计划。金贝计划是指当加入“金贝计划”的合作方发行的某期产品出现逾期时，金贝猫将根据“金贝计划”相关规则为相应的投资人在追讨本金及可能收益时发生的法律诉讼提供法律援助。</p>
                <h3 class="mt"><i class="icon3"></i>账户安全机制</h3>
                <p>平台系统安全：阿里云提供技术安全保障，享有云服务器、云数据库、云盾、防火墙、高防ip、入侵防护等一整套的云安全措施。平台数据安全：https加密的安全通讯协议、128位密钥、防火墙隔离系统，有效的入侵防范及容灾备份等，确保平台数据安全无忧。</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .u-header {color: #fff; font-size: 0.380rem; line-height: 0.863rem;background: #e71a19;text-align: center; height: 0.863rem; position: relative;}
    .u-header a { width: 0.253rem; height: 0.4227rem; float: left; position: absolute;left: 0.302rem;top: 25%;}
    .safe .safe-center{
        margin-bottom: 0.9843rem;
    }
    .safe-center .safe-title h2{
        font-size: 0.326rem;
        text-align: center;
        color: #666;
        padding: 0.507rem 0;
    }
    .safe-center .content{
        padding: 0 0.495rem;
        font-size: .5rem;
        line-height: 1.4em;
    }
    .safe-center .content h3{
        padding: 0 0.2rem 0 0;
        font-weight: normal;
        font-size: .242rem;
        color: #666;
        text-align: left;
    }
    .safe-center .content h3 i{
        display: inline-block;
        background-position: center center;
        background-repeat: no-repeat;
        width: .302rem;
        height: .302rem;
        vertical-align: bottom;
        margin-right: .1rem;
        vertical-align: middle;
        background-size: .302rem;
    }
    .safe-center .content h3 i.icon1{
        background-image:url(../../assets/img/safe/icon1.png);
    }
     .safe-center .content h3 i.icon2{
        background-image:url(../../assets/img/safe/icon11.png);
    }
     .safe-center .content h3 i.icon3{
        background-image:url(../../assets/img/safe/icon12.png);
    }
    .safe-center .content h3.mt{
        margin-top: 0.304rem;
    }
    .safe-center .content p{
        color: #666;
        font-size: .217rem;
        line-height: 0.34rem;
        text-align:left;
    }
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

