<template>
  <div class="cartcontrol">
    <transition name="roll">
      <div @click="decreaseCart" class="cart-decrease" v-show="this.food.count>0">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="this.food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="selectFood"></div>
  </div>
</template>
<script>
import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
  },
  methods: {
    selectFood(event) {
      if (!event._constructed) {
        return;
      };
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
          } else {
            this.food.count++;
          };
          this.$emit('cartadd', event);
        },
    decreaseCart() {
       if (!event._constructed) {
        return;
      };
      if (this.food.count) {
        this.food.count--;
      }
    }
  }

};
</script>
<style lang="stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      &.roll-active,&.roll-leave-active
        opacity: 1
        transform: translate3D(0,0,0)
        .inner
          transform: rotate(0)
      .inner
          display: inline-block
          color: rgb(0,160,220)
          font-size: 24px
          line-height:24px
          transition: all 0.4s linear
      &.roll-enter,&.roll-leave-to
        opacity: 0
        transform: translate3D(24px,0,0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      font-size: 10px
      line-height: 36px
      vertical-align:top
      width: 12px
      text-align: center
      color: rgb(147,153,159)
    .cart-add
      display: inline-block
      font-size: 24px
      line-height: 24px
      color: rgb(0,160,220)
      padding: 6px
</style>
