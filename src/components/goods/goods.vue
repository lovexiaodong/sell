<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" v-bind:key="item" class="menu-item  border-1px" >
          <span class="text">
            <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper">
      <ul>
        <li v-for="(item, key, index) in goods" :key="item.name" class="food-list">
          <h2 class="title">{{item.name}}</h2>
          <ul>
            <li v-for="(food, key, index) in item.foods" :key="food.name" class="food-item  border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="descip">{{food.description}}</p>

                <div class="extra">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="price-symbol">￥</span>
                  <span class="nowprice">{{food.price}}</span>
                  <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      
    </div>
  </div>
</template>

<script>
  const RES_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
        return {
            goods: []
        };
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === RES_OK) {
            this.goods = response.data;
            console.log(this.goods);
        }
      });
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        .icon
          display: inline-block
          vertical-align: top
          margin-right: 2px
          width: 12px
          height: 12px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
         .text
           display: table-cell
           width: 56px
           vertical-align: middle
           font-size: 12px
           border-1px(rgba(7, 17, 27, 0.1))
    .goods-wrapper
      flex: 1
      .food-list
        .title
          padding-left: 14px
          border-left: 2px solid #d9dde1
          background: #f3f5f7
          font-size: 12px
          color: rgb(143, 153, 159)
          height: 26px
          line-height: 26px
        .food-item
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px(rgba(7, 17, 27, 0.1))
          &.last-child
            border-none()
          .icon
            flex: 0 0 57px
            margin-right: 4px
          .content
            .name
              margin: 2px 0 8px 0
              height: 14px
              line-height: 14px
              font-size: 14px
              color: rgb(7, 17, 27)
            .descip
            .extra
              height: 10px
              line-height: 10px
              color: rgb(147, 153, 159)  
              margin-top: 8px
            .price
              font-size: 0
              font-weight: 700
              line-height: 24px   
              margin-right: 8px
              margin-top: 2px
              .price-symbol
                font-size: 10px
                color: rgb(240,20,20)
              .nowprice
                font-size: 14px
                color: rgb(240,20,20)
              .oldPrice
                font-size: 10px
                color: rgb(147, 153, 159)
                font-weight: 700
                line-height: 24px   
</style>
