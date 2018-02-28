<template>
  <div class="footer">
    <ul class="nav-footet">
      <li @click="getNewRouter('Home')">
        <img v-if="curPath=='Home'" src="./images/footer/main-icon-active.png"/>
        <img v-else src="./images/footer/main-icon.png"/>
        <p>首页</p>
      </li>
      <li @click="getNewRouter('FilmList')">
        <img v-if="curPath=='FilmList'" src="./images/footer/film-icon-active.png"/>
        <img v-else src="./images/footer/film-icon.png"/>
        <p>金贝零钱</p>
      </li>
      <li @click="getNewRouter('Find')">
        <img v-if="curPath=='Find'" src="./images/footer/find-icon-active.png"/>
        <img v-else src="./images/footer/find-icon.png"/>
        <p>金贝定存</p>
      </li>
      <li @click="getNewRouter('User')">
        <img v-if="curPath=='User'" src="./images/footer/user-icon-active.png"/>
        <img v-else src="./images/footer/user-icon.png"/>
        <p>我的</p>
      </li>
    </ul>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
  .footer {
    position: fixed;
    width: 100%;
    bottom: -1px;
    background: #f7f7f7;
    border-top: 0.01rem solid #d7d8da;
    height: 1rem;
    .nav-footet {
      display: flex;
      li {
        height: 1rem;
        flex-direction: column;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $s-2;
        color: $c-5f5f5f;
        img {
          width: 0.48rem;
          height: 0.48rem;
        }
        p {
          margin-top: 0.1rem;
          line-height: 0.3rem;
          height: 0.3rem;
        }
      }
    }
  }
</style>
<script>
  import {mapState} from 'vuex'
  export default{
    name: 'footer',
    data(){
      return {
        curPath: ''
      };
    },
    components: {},
    computed: {},
    methods: {
      getNewRouter: function (value) {
        this.$router.push({name: value})
      }
    },
    mounted: function () {
      this.curPath = this.$route.name;
      this.$router.push({name: this.curPath})
    }
  }
</script>
