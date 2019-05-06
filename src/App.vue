<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
   <keep-alive>
   <router-view :seller="seller"></router-view>
   </keep-alive>
   </div>
</template>

<script>
import header from './components/header/header.vue';
import {urlParse} from 'common/js/utils.js';
import {mockData} from 'common/js/data.js';
const URLHEADER = 'api/seller';
export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  components: {
    'v-header': header
  },
  created() {
      // this.getData();
      this.gitGetData();
    },
    methods: {
      getData() {
        console.log(this.seller);
        const ERR_OK = 0;
        this.$http({
          method: 'get',
          url: URLHEADER + '?id=' + this.seller.id
        }).then((res) => {
          if (res.data.errno === ERR_OK) {
            this.seller = Object.assign({}, this.seller, res.data.data);
          }
        });
      },
      gitGetData() {
        this.seller = mockData().seller;
      }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/index'
.tab
  display: flex
  width :100%
  height :40px
  line-height :40px
  border-1px(rgba(7,17,27,0.1))
  .tab-item
    flex :1
    text-align : center
    & > a
      display : block
      font-size : 14px
      color: rgb(77,85,93)
      &.active
        color : rgb(240,20,20)
</style>
