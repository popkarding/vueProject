<template>
  <div class="header">
    <div class="content-wrap">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="头像">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          <span>{{seller.description}}</span>/
          <span>{{seller.deliveryTime}}</span>分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="roll-title"></div>
  </div>
</template>
<script>
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {};
    },
    created() {
    },
    methods: {
  }
  };

</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin'
.header
  color: #ffffff
  background-color: black
  .content-wrap
    padding: 24px 12px 18px 24px
    font-size: 0px
    .avatar
      display: inline-block
      img
        border-radius: 2px
    .content
      vertical-align: top
      margin-left: 16px
      display: inline-block
      .title
        font-size: 16px
        margin: 2px 0 8px 0
        color:rgb(255,255,255)
        line-height: 18px
        font-weight bold
        .brand
          display: inline-block
          width: 30px
          height: 18px
          bg-image("brand")
          background-size: 30px 18px
          background-repeat: no-repeat
          vertical-align: top
</style>
