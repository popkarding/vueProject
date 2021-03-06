<template>
    <div>
        <div class="ratings" ref="ratings">
            <div class="ratings-content">
                <div class="overview">
                    <div class="overview-left">
                        <div class="score">{{seller.score}}</div>
                        <div class="title">综合评分</div>
                        <div class="rank">高于周边商家{{seller.rankeRate}}%</div>
                    </div>
                    <div class="overview-right">
                        <div class="score-wrapper">
                            <span class="title">服务态度</span>
                            <star :size="36"
                                  :score="seller.serviceScore"
                            ></star>
                            <span class="score">{{seller.serviceScore}}</span>
                        </div>
                        <div class="score-wrapper">
                            <span class="title">商品评分</span>
                            <star :size="36"
                                  :score="seller.foodScore"
                            ></star>
                            <span class="score">{{seller.serviceScore}}</span>
                        </div>
                        <div class="delivery-wrapper">
                            <span class="title">送达时间</span>
                            <span class="delivery">{{seller.deliveryTime}}分钟</span>
                        </div>
                    </div>
                </div>
                <split></split>
                <ratingselect :select-type="selectType"
                                :only-content="onlyContent"
                                :ratings="ratings"
                                @picktype="pickType"
                                @pickcontent="pickContent"
            ></ratingselect>
            <div class="rating-wrapper">
                    <ul>
                        <li v-show="needShow(rating.rateType,rating.text)" class="rating-item" v-for="(rating,index) in ratings" :key="index">
                            <div class="avatar">
                                <img width="28" height="28" :src="rating.avatar" alt="pic">
                            </div>
                            <div class="content">
                                <h1 class="name">{{rating.username}}</h1>
                                <div class="star-wrapper">
                                    <star :size="24" :score="rating.score"></star>
                                    <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                                </div>
                                <p class="text">{{rating.text}}</p>
                                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                    <span class="icon-thumb_up"></span>
                                    <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                                </div>
                                <div class="time">
                                    {{rating.rateTime | formatDate}}
                                </div>
                            </div>
                        </li>
                    </ul>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import star from 'components/star/star';
import split from 'components/split/split';
import ratingselect from 'components/ratingselect/ratingselect';
import {formatDate} from 'common/js/date.js';
import {mockData} from 'common/js/data.js';
import BScroll from 'better-scroll';
const ALL = 2;
const ERR_OK = 0;
const URLHEADER = 'api/ratings';

export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            ratings: [],
            selectType: ALL,
            onlyContent: true
        };
    },
    created() {
       this.gitGetData();
        this.$http({
            method: 'get',
            url: URLHEADER
        }).then((res) => {
            if (res.data.errno === ERR_OK) {
            this.ratings = res.data.data;
            this._initScroll();
          } else {
              this.scroll.refersh();
          };
        });
    },
    filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
    components: {
        star,
        ratingselect,
        split
    },
    methods: {
        _initScroll() {
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.ratings, {
                        click: true
                    });
                }
            });
        },
        gitGetData() {
          this.ratings = mockData().ratings;
          this._initScroll();
        },
        pickType(type) {
          this.selectType = type;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        pickContent() {
          this.onlyContent = !this.onlyContent;
          this.$nextTick(() => {
          this.scroll.refresh();
          });
        },
        needShow(type, text) {
          if (this.onlyContent && !text) {
            return false;
          }
          if (this.selectType === ALL) {
            return true;
          } else {
            return this.selectType === type;
          }
        }
    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      padding: 18px 0
      display: flex
      .overview-left
        flex: 0 0 137px
        text-align: center
        padding: 6px 0
        border-right: 1px solid rgba(7,17,27,0.1)
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          font-size: 24px
          line-height: 28px
          color: rgb(255,153,0)
        .title
          font-size: 12px
          line-height:12px
          color: rgb(7,17,27)
          margin-bottom: 8px
        .rank
          font-size: 10px
          color: rgb(147,153,159)
      .overview-right
        flex: 1
        padding:6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            line-height:18px
            font-size: 12px
            color: rgb(7,17,27)
          .star
            display:inline-block
            vertical-align: top
            margin: 0 12px
          .score
            line-height:18px
            display:inline-block
            vertical-align: top
            font-size: 12px
            color: rgb(255,153,0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height:18px
            font-size: 12px
            color: rgb(7,17,27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147,153,159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7,17,27.0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            line-height: 12px
            font-size: 10px
            color: rbg(7,17,27)
            margin-bottom: 4px
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              vertical-align: top
              margin-right: 6px
            .delivery
              display: inline-block
              vertical-align: top
              font-size: 10px
              line-height 12px
              color: rgb(147,153,159)
          .text
            margin-bottom: 8px
            line-height: 18px
            font-size: 12px
            color: rgb(7,17,27)
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up,.item
              display: inline-block
              margin-right: 8px
              margin-bottom: 4px
              font-size: 9px
            .icon-thumb_up
              color: rgb(0,160,220)
            .item
              padding: 0 6px
              border: 1px solid rgba(7,17,27,0.1)
              border-radius: 1px
              color: rgb(147,153,159)
              background:#fff
          .time
            position: absolute
            top: 0
            right: 0
            list-height: 12px
            font-size: 10px
            color: rgb(147,153,159)
</style>
