<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{highLight:totalCount>0}">
                      <i class="icon-shopping_cart" :class="{highLight:totalCount>0}"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{highLight:totalCount>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费 ￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
              <div class="pay" :class="payClass">{{enoughOrNot}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
      selectFood: {
        type: Array,
        default: () => []
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
      };
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFood.forEach(food => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFood.forEach(food => {
          count += food.count;
        });
        return count;
      },
      enoughOrNot() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起送`;
        };
        if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差${diff}起送`;
        };
        if (this.totalPrice >= this.minPrice) {
          return `去结算`;
        };
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    },
    methods: {
      drop(event) {
        console.log(event);
      }
    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.shopcart
  position: fixed
  z-index: 11
  bottom: 0
  left: 0
  height: 48px
  width: 100%
  .content
    display:flex
    .content-left
      flex:1
      background-color: #141d27
      font-size: 0
      .logo-wrapper
        display: inline-block
        position:relative
        margin: 0 12px
        top: -10px
        padding: 6px
        width: 56px
        height: 56px
        box-sizing: border-box
        border-radius 50%
        background-color: #141d27
        .num
          position: absolute
          top:0
          right 0
          width: 24px
          height: 16px
          line-height: 16px
          font-size: 9px
          background: rgb(240,20,20)
          border-radius: 16px;
          font-weight: 700
          color: rgb(255,255,255)
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
          text-align: center
        .logo
          width: 100%
          height: 100%
          border-radius:50% 50%
          background:#2b343c
          text-align:center
          &.highLight
            background: rgb(0,160,220)
          .icon-shopping_cart
            font-size: 24px
            line-height: 44px
            color: #80858a
            &.highLight
              color: #ffffff
      .price
        display: inline-block
        color: rgba(255,255,255,0.4)
        font-weight: 700
        font-size: 16px
        line-height: 24px
        height: 24px
        vertical-align: top
        margin-top: 12px
        padding-right: 12px
        border-right: 1px solid rgba(255,255,255,0.1)
        &.highLight
          color: #ffffff
      .desc
        display: inline-block
        color: #ffffff
        font-size: 10px
        vertical-align: top
        line-height: 24px
        margin: 12px 0 0 12px
        color: rgba(255,255,255,0.4)
    .content-right
      flex:0 0 105px
      width: 105px
      .pay
        height 48px
        line-height: 48px
        font-size: 12px
        font-weight: 700
        color: rgba(255,255,255,0.4)
        text-align:center
        &.not-enough
          background-color: #2b333b
        &.enough
          background-color: #00b43c
          color: #ffffff
</style>
