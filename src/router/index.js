import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition
  },
  // mode: 'hash',
  routes: [
      {
        path: '/',
        component: resolve => require(['@/pages/Home'], resolve)
        
      },
      {
        path: '/prolist',
        component: resolve => require(['@/pages/Prolist'], resolve)

      },
      {
        path: '/lazycow',
          component: resolve => require(['@/pages/Lazycow'], resolve)

      },
      {
        path: '/login',
          component: resolve => require(['@/pages/Login'], resolve)

      },
      {
        path: '/regist',
          component: resolve => require(['@/pages/demo'], resolve)
      },
      {  
        path: '/prolist/details',
          component: resolve => require(['@/components/prolist/TabDetails'], resolve)   
      },
      {  
        path: '/safe',
          component: resolve => require(['@/components/safe/Safe'], resolve)  
      },
      {  
        path: '/about',
          component: resolve => require(['@/components/about/About'], resolve) 
      },
      {  
        path: '/account',
          component: resolve => require(['@/pages/Account'], resolve)  
      },
      {  
        path: '/Account/Bank',
          component: resolve => require(['@/components/account/Bank'], resolve)  
      },
      {  
        path: '/forgetpwd',
          component: resolve => require(['@/pages/ForgetPassword'], resolve)  
      },
      {  
        path: '/Account/Set',
          component: resolve => require(['@/components/account/Set'], resolve)  
      },
      {  
        path: '/Account/Problem',
          component: resolve => require(['@/components/account/Problem'], resolve)  
      },
      {  
        path: '/Account/Security',
          component: resolve => require(['@/components/account/Security'], resolve)  
      },
      {  
        path: '/Account/deal/SetModdeal',
          component: resolve => require(['@/components/account/deal/SetModdeal'], resolve)  
      },
      {  
        path: '/Account/deal/Moddeal',
          component: resolve => require(['@/components/account/deal/Moddeal'], resolve)  
      },
      {  
        path: '/Account/deal/SetUpPhone',
          component: resolve => require(['@/components/account/deal/SetUpPhone'], resolve)  
      },
      {  
        path: '/Account/deal/Modifyph',
          component: resolve => require(['@/components/account/deal/Modifyph'], resolve)  
      },
      {
        path: '/Account/Repickup',
          component: resolve => require(['@/components/account/Repickup'], resolve)  
      },
      {
        path: '/Account/Recharge',
          component: resolve => require(['@/components/account/Recharge'], resolve)   
      },
      {
        path: '/Account/bank/SetBank',
          component: resolve => require(['@/components/account/bank/SetBank'], resolve)  
      },
      {
        path: '/Account/Record',
          component: resolve => require(['@/components/account/Record'], resolve)  
      },
      {
        path: '/Account/Rechargebill',
          component: resolve => require(['@/components/account/Rechargebill'], resolve)  
      },
      {
        path: '/Account/Rechargeexplain',
          component: resolve => require(['@/components/Account/Rechargeexplain'], resolve)  
      },
      {
        path: '/Account/Repickupbill',
          component: resolve => require(['@/components/account/Repickupbill'], resolve)  
      },
      {
        path: '/Account/Repickupexplain',
          component: resolve => require(['@/components/Account/Repickupexplain'], resolve)  
      },
      {
        path: '/Account/Accountant',
          component: resolve => require(['@/components/account/Accountant'], resolve)  
      },
      {
        path: '/Account/Invite',
          component: resolve => require(['@/components/account/Invite'], resolve)  
      },
      {
        path: '/Account/invite/Invitedetails',
          component: resolve => require(['@/components/account/invite/Invitedetails'], resolve)  
      },
      {
        path: '/Account/Coupon',
          component: resolve => require(['@/components/account/Coupon'], resolve)  
      },
      {  
        path: '/prolist/details/contract',
          component: resolve => require(['@/components/prolist/Contract' ], resolve)  
      },
      {  
        path: '/Home/Notice',
          component: resolve => require(['@/components/Notice'], resolve)  
      },
      {  
        path: '/Activity/BankCustody',
          component: resolve => require(['@/components/activity/BankCustody'], resolve)  
      },
      {  
        path: '/Activity/Stateowned',
          component: resolve => require(['@/components/activity/Stateowned'], resolve)  
      },{  
        path: '/Activity/Rnvitation',
          component: resolve => require(['@/components/activity/Rnvitation'], resolve)  
      },
      {  
        path: '/activity/Register',
          component: resolve => require(['@/components/activity/Register'], resolve)  
      },
      {  
        path: '/activity/DownloadAPP',
          component: resolve => require(['@/components/activity/DownloadAPP'], resolve)  
      },
      {  
        path: '/activity/activity1',
          component: resolve => require(['@/components/activity/activity1'], resolve)   
      },
      {  
        path: '/Activity/share',
          component: resolve => require(['@/components/activity/share'], resolve)  
      },
      {  
        path: '/Noticelist',
          component: resolve => require(['@/components/Noticelist'], resolve)  
      },
      {  
        path: '/Activity/Activityjrtt',
          component: resolve => require(['@/components/activity/Activityjrtt' ], resolve)  
      },
      {  
        path: '/Account/deal/Modlogin',
          component: resolve => require(['@/components/account/deal/Modlogin'], resolve)  
      },
      {  
        path: '/activity/Downapp',
          component: resolve => require(['@/components/activity/Downapp'], resolve)  
      },
      {
        path: '/Agreement',
          component: resolve => require(['@/pages/agreement'], resolve)
      },
      {
        path: '/activity/activity4',
          component: resolve => require(['@/components/activity/activity4'], resolve)
      },
      {
        path: '/agreementpay',
          component: resolve => require(['@/components/account/bank/agreementpay'], resolve)
      },{
        path: '*',
          component: resolve => require(['@/pages/NotFound'], resolve)
      },
      {
        path: '/date',
          component: resolve => require(['@/components/account/date'], resolve)
      },
      {
        path: '/date/details/',
          component: resolve => require(['@/components/account/date/details'], resolve)
      },
       {
        path: '/integral',
          component: resolve => require(['@/components/account/integral'], resolve)
      }
]
})
