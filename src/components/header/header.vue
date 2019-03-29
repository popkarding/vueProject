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
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background-blur">
      <img width="100%" height="100%" :src="seller.avatar">
    </div>
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script>
import star from 'components/star/star';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    components: {
      star
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin'
.header
  position: relative
  color: #ffffff
  background-color: rgba(7,17,27,0.5)
  overflow: hidden
  .content-wrap
    position: relative
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
        margin: 2px 0 8px 0
        .brand
          display: inline-block
          width: 30px
          height: 18px
          bg-image("brand")
          background-size: 30px 18px
          background-repeat: no-repeat
          vertical-align: top
        .name
          display: inline-block
          margin-left: 6px
          line-height: 18px
          font-size: 16px
          font-weight bold
          color:rgb(255,255,255)
      .description
        font-size: 12px
        line-height: 12px
        color:rgb(255,255,255)
        margin-bottom: 10px
      .support
        .icon
          display: inline-block
          vertical-align: top
          margin-right: 4px
          width: 12px
          height: 12px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image("decrease_1")
          &.discount
            bg-image("discount_1")
          &.guarantee
            bg-image("guarantee_1")
          &.invoice
            bg-image("invoice_1")
          &.special
            bg-image("special_1")
        .text
          display: inline-block
          font-size: 10px
          line-height: 12px
          color: rgb(255,255,255)
    .support-count
        position: absolute
        padding: 0 8px
        background-color: rgba(0,0,0,0.2)
        color: rgb(255,255,255)
        height: 24px
        line-height: 24px
        right: 12px
        bottom: 14px
        border-radius: 14px
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
  .bulletin-wrapper
    position: relative
    padding: 0 22px 0 12px
    height: 28px
    line-height: 28px
    background-color: rgba(7,17,27,0.2)
    white-space:nowrap
    overflow: hidden
    text-overflow: ellipsis
    .bulletin-title
      vertical-align: top
      display: inline-block
      width: 22px
      height: 12px
      margin-top: 7px
      margin-right: 4px
      bg-image("bulletin")
      background-size: 22px 12px
      background-repeat: no-repeat
    .bulletin-text
      vertical-align: top
      font-size: 10px
      color: rgb(255,255,255)
    .icon-keyboard_arrow_right
      position: absolute
      font-size: 10px
      right: 12px
      top: 8px
  .background-blur
    top: 0
    left: 0
    position: absolute
    width: 100%
    height: auto
    filter: blur(10px)
    z-index: -1
  .detail
    position: fixed
    z-index: 100
    background-color: rgba(7,17,27,0.8)
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    .detail-wrapper
      width: 100%
      min-height:100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .name
          text-align: center
          font-size: 16px
          line-height 16px
          color: rgb(255,255,255)
          font-weight: 700
        .star-wrapper
          text-align: center
          margin-top: 16px
          padding: 2px 0
    .detail-close
      position: relative
      width: 32px
      height: 32px
      font-size: 32px
      clear: both
      margin: -64px auto 0 auto
</style>
