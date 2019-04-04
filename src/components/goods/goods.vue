<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="item.name" class="menu-items" :class="{'current':index===currentIndex}" @click="selectMenu(index,$event)">
            <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook" :key="item.name">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" :key="food.name" class="food-item border-1px">
              <div class="image">
                <img width="57" height="57" :src="food.icon" alt="pic">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <div class="desc">
                  <span>{{food.description}}</span>
                </div>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}</span>%
                </div>
                <div class="price">
                  <span class="now-price">￥{{food.price}}</span><span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-food="this.sellectFood"></shopcart>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart';
const URLHEADER = 'http://192.168.100.101:8080/api/goods';
  export default {
      components: {
        shopcart
      },
      props: {
          seller: {
              type: Object
          }
      },
      data() {
          return {
              goods: [],
              listHeight: [],
              scrollY: 0,
              sellectFood: [
                {
                  price: 30,
                  count: 2
                }
              ]
          };
      },
      computed: {
        currentIndex() {
          for (let i = 0; i < this.listHeight.length; i++) {
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i + 1];
            if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
              return i;
            }
          }
          return 0;
        }
      },
      created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
          this.getData();
      },
      methods: {
        selectMenu(index, event) {
          if (!event._constructed) {
            return;
          }
          console.log(index);
          let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
          let el = foodList[index];
          this.foodScroll.scrollToElement(el, 300);
        },
          getData() {
        const ERR_OK = 0;
        this.$http({
          method: 'get',
          url: URLHEADER
        }).then((res) => {
          if (res.data.errno === ERR_OK) {
            console.log(res.data.data);
            this.goods = res.data.data;
            this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
          };
        });
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3
        });
        // beter-scroll API
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.listHeight.push(height);
        }
      }
      }
  };

</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
  .goods
    display: flex
    position : absolute
    top: 174px
    width :100%
    bottom: 46px
    overflow : hidden
    .menu-wrapper
      flex:0 0 80px
      width : 80px
      background-color: #f3f5f7
      .menu-items
        width:56px
        height: 54px
        line-height: 14px
        display: table
        padding:0 12px
        &.current
          margin-top: -1
          position:relative
          z-index: 10
          background-color: #ffffff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          margin-right: 2px
          width: 12px
          height :12px
          background-size: 12px 12px
          background-repeat: no-repeat
          vertical-align: top
          &.decrease
            bg-image("decrease_3")
          &.discount
            bg-image("discount_3")
          &.guarantee
            bg-image("guarantee_3")
          &.invoice
            bg-image("invoice_3")
          &.special
            bg-image("special_3")
        .text
          text-align: center
          display: table-cell
          vertical-align: middle
          width:56px
          border-1px(rgba(7,17,27,0.1))
          font-size: 12px
          color: gray
    .foods-wrapper
      flex:1
      .title
        border-left:2px solid #d9dde1
        font-size: 12px
        color: rgb(147,153,159)
        line-height: 26px
        background-color: #f3f5f7
        padding-left: 14px
        height: 26px
      .food-item
        display: flex
        margin: 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom : 0
        .image
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            font-size: 14px
            line-height: 14px
            color: rgb(7,17,27)
            margin-top: 2px
          .desc,.extra
            margin-top: 8px
            font-size: 10px
            line-height: 10px
            color: rgb(147,153,159)
          .desc
            line-height: 12px
          .extra
            .count
              margin-right: 12px
          .price
            font-size:10px
            font-weight:700
            line-height 24px
            .now-price
              font-size:14px
              vertical-align: top
              color: rgb(240,20,20)
              margin-right: 8px
            .old-price
              color: rgb(147,153,159)
              text-decoration:line-through

</style>
