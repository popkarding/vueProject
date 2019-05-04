<template>
<div>
    <div class="shopcart">
        <div class="content">
            <div class="content-left" @click="toogleList">
                <div class="logo-wrapper">
                    <div class="logo" :class="{highLight:totalCount>0}">
                      <i class="icon-shopping_cart" :class="{highLight:totalCount>0}"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{highLight:totalCount>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费 ￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" @click.stop.prevent="pay">
              <div class="pay" :class="payClass">{{enoughOrNot}}</div>
            </div>
        </div>
        <div class="ball-container">
            <div v-for="(ball,index) in balls" :key="index">
              <transition name="drop"
                          @before-enter="handlerBeforeEnter"
                          @enter="handlerEnter"
                          @after-enter="handlerAfterEnter">
                <div class="ball"  v-show="ball.show">
                    <div class="inner inner-hook"></div>
                </div>
              </transition>
          </div>
        </div>
        <transition name="fold">
           <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listContent">
              <ul>
                <li class="food" v-for="(food,index) in selectFood" :key="index">
                  <span class="name">{{food.name}}</span>
                  <div class="price">
                    <span>￥{{food.price*food.count}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @cartadd="_drop" :food="food"></cartcontrol>
                  </div>
                </li>
              </ul>
            </div>
        </div>
        </transition>
    </div>
    <transition name="fade">
        <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
</div>
</template>
<script>
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol';
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
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
    components: {
      cartcontrol
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
      },
      listShow() {
        if (!this.totalCount) {
          // this.fold = true;
          return false;
        }
        let show = !this.fold;
        return show;
      }
    },
    watch: {
      selectFood(newValue, oldValue) {
        console.log('newValue');
        if (newValue.length === 0) {
          this.fold = true;
        }
      },
       listShow() {
    let show = !this.fold;
    if (show) {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.listContent, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  }
    },
    methods: {
      drop(el) {
        console.log(el);
          for (let i = 0; i < this.balls.length; i++) { // 遍历这5个小球
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            console.log(this.dropBalls);
            return;
          };
        };
      },
      hideList() {
        this.fold = true;
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
      },
      empty() {
        this.selectFood.forEach((food) => {
          food.count = 0;
        });
      },
      handlerBeforeEnter(el) {
        console.log(el);
          let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          };
        };
      },
      handlerEnter(el, done) {
        console.log(el);
        /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight;
          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0, 0, 0)';
            el.style.transform = 'translate3d(0, 0, 0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0, 0, 0)';
            inner.style.transform = 'translate3d(0, 0, 0)';
            el.addEventListener('transitionend', done);
          });
      },
      handlerLeave(el, done) {
        done();
      },
      handlerAfterEnter(el) {
          let ball = this.dropBalls.shift();
          console.log(1);
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        };
        console.log(this.dropBalls);
      },
      toogleList() {
        console.log('toggle');
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      _drop(event) {
        // 优化异步执行下落动画
        this.$nextTick(() => {
         this.drop(event.target);
        });
      }
    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
.list-mask
  position: fixed
  left: 0
  top: 0
  width: 100%
  height: 100%
  transition: all .3s
  opacity: 1
  z-index: 40
  backdrop-filter: blur(10px)
  background: rgba(7,17,27,0.6)
  &.fade-enter,&.fade-leave-to
    opacity: 0
    background: rgba(7,17,27,0)
.shopcart
  position: fixed
  z-index: 41
  bottom: 0
  left: 0
  height: 48px
  width: 100%
  .content
    display:flex
    position: relative
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
  .ball-container
    .ball
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200
      transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
      .inner
        width: 16px
        height: 16px
        border-radius:50%
        background-color: rgb(0,160,220)
        transition: all 0.4s linear
  .shopcart-list
    position: absolute
    left: 0
    top: 0
    width: 100%
    z-index:-1
    transition: all .2s
    transform:translate3d(0,-100%,0)
    &.fold-enter-active, &.fold-leave-active
    &.fold-enter, &.fold-leave-to
      transform:translate3d(0,0,0)
    .list-header
      height: 40px
      background-color: #f3f5f7
      border-bottom: 2px solid rgba(7,17,27,0.1)
      padding: 0 18px
      .title
        float:left
        color:rgb(7,17,27)
        line-height:40px
        font-size: 14px
      .empty
        float: right
        color: rgb(0,160,220)
        line-height:40px
        font-size:12px
    .list-content
      max-height: 217px
      background: white
      overflow:hidden
      padding: 0 18px
      .food
        position: relative
        height: 48px
        box-sizing: border-box
        border-1px(rgba(7,17,27,0.1))
        padding: 12px 0
        .name
          line-height:24px
          font-size: 14px
          color: rgb(7,17,27)
        .price
          position: absolute
          font-size: 14px
          color: rgb(240,20,20)
          line-height: 24px
          font-weight: 700
          right : 90px
          bottom: 12px
        .cartcontrol-wrapper
          position:absolute
          right: 0
          bottom: 6px
</style>
