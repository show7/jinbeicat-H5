<template>
    <div class="about">
        <header class="u-header"> <a class="back" @click="goBack"><img src="../../assets/img/left.png"></a>关于我们</header>
        <div class="about-center">
            <div class="content">
                <h3><i class="icon1"><img src="../../assets/img/account/ic_about_introduce.png"></i>公司简介</h3>
                <p>金贝猫，隶属于上海如庆金融信息服务有限公司，成立于2014年。公司注册资本金6000万，是一家专业从事互联网金融财富管理的国资控股平台，为客户提供安全、透明、专业、高效的综合性投资信息中介服务。其产品丰富多样，以供应链金融、消费金融产品为主体，可提供多样化的资产配置，满足投资者不同类型的需求。平台严格遵循国家政策，以专业严谨的风控体系为基础，一直致力于“普惠金融”“科技金融”的经营理念，坚持合规至上的原则，秉承公开、透明、诚信的服务理念，注重每一位用户的资金安全，个人隐私和用户体验。为保障投资用户的资金安全权益，金贝猫设立了风险分担机制，启动了“金贝保障计划”。公司拥有金融行业十余年的经验，百亿资产管理规模的精英团队，由多家国内大型上市企业和知名投资机构创新工厂的众多行业领头人担任投资顾问，并与大型金融机构和挂牌机构有着良好的战略合作关系。</p>
                <h3 class="mt"><i class="icon2"><img src="../../assets/img/account/ic_about_culture.png"></i>企业文化</h3>
                <p>
                    <ul>
                        <li>我们的经营理念</li>
                        <li>诚信稳健，合作共赢</li>
                        <li>我们的核心价值</li>
                        <li>务实，自由，高效，创新</li>
                        <li>我们的使命</li>
                        <li>为投资者提供一个安全、稳定、健康的金融信息服务平台</li>
                    </ul>
                </p>
                <h3 class="mt"><i class="icon3"><img src="../../assets/img/account/ic_about_manage.png"></i>管理团队</h3>
                <p>一流的创业团队，十余年行业工作经验，管理过百亿资产管理规模。拥有卓越的金融、分控、大数据、互联网技术和营销能力。运用互联网技术，采取大数据模型实现智能化组合投资，让客户可以根据自己的资金流动性需求选择最适合的理财方式。</p> 
                <h3 class="mt"><i class="icon4"><img src="../../assets/img/account/ic_about_phone.png"></i>联系我们</h3>
                <p>商务合作</p>
                <p>如果贵公司希望与我们建立商务合作关系，请将合作意向进行简要描述并发送邮件至合作邮箱，我们会尽快与您联系。合作邮箱：MKT@jinbeicat.com</p>
                <p>客服服务</p>
                <p>如果您在使用金贝猫的过程中有任何疑问，请您与客服人员联系，我们会第一时间提供专业及时的帮助。</p>
                <p>客服电话：400-021-7688</p>
                <p>官方QQ：130855231</p>
                <p>官方手机号：17301847178</p>
                <p>办公地点</p>
                <p>公司地址：上海市普陀区中山北路3000号长城大厦4501室。</p>
                <p>邮政编码：200062</p>
                <p>媒体咨询</p>
                <p>如果您有采访需求，请将媒体名称、采访提纲、联系方式发送至合作邮箱，我们会尽快与您联系。</p>
                <p>合作邮箱：pr@jinbeicat.com</p>
                <p>微博微信</p>
                <p>获取关于金贝猫的最新信息与资讯。</p>
                <p>微信公众号：金贝猫资讯</p>
                <p>新浪微博名：金贝猫官方微博</p>
                <p>加入我们</p>
                <p>如果您想加入金贝猫，请把您的个人简历、应聘职位、联系方式等发送至</p>
                <p>电子邮箱：hr@jinbeicat.com</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .u-header {color: #fff; font-size: 0.380rem; line-height: 0.863rem;background: #e71a19;text-align: center; height: 0.863rem; position: relative;}
    .u-header a { width: 0.253rem; height: 0.4227rem; float: left; position: absolute;left: 0.302rem;top: 25%;}
    .about .about-center{
        margin-bottom: 0.9843rem;
    }
    .about-center .about-title h2{
        font-size: 0.326rem;
        text-align: center;
        color: #666;
        padding: 0.507rem 0;
    }
    .about-center .content{
        padding: 0 0.495rem;
        font-size: .5rem;
        line-height: 1.4em;
    }
    .about-center .content h3{
        padding: 0 0.2rem 0 0;
        font-weight: normal;
        font-size: .242rem;
        color: #666;
        text-align: left;
    }
    .about-center .content h3 i{
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
    /*.about-center .content h3 i.icon1{
        background-image:url(../../assets/img/about/icon1.png);
    }
     .about-center .content h3 i.icon2{
        background-image:url(../../assets/img/about/icon11.png);
    }
     .about-center .content h3 i.icon3{
        background-image:url(../../assets/img/about/icon12.png);
    }*/
    .about-center .content h3.mt{
        margin-top: 0.304rem;
    }
    .about-center .content p{
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

