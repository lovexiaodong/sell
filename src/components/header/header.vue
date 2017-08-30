<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img  width="64" height="64" :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="supports-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-icon"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <div v-show="detailShow" class="detail" transition name="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star">
            <star :size='48' :score="seller.score" class="star"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text"> 优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li  v-for="item in seller.supports"  v-bind:key="item.type" class="supports-item">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
           <div class="title">
            <div class="line"></div>
            <div class="text"> 商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-closed" @click="hidenDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script >
  import star from '../star/star.vue';

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
    components: {
        star
    },
    methods: {
      showDetail: function () {
        this.detailShow = true;
      },
      hidenDetail: function () {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    }
  };
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    overflow: hidden
    position: relative
    color: #fff
    background: rgba(7, 17,27, 0.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        font-size: 14px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align: top
            width 30px
            height 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .supports
          display: flex
          .icon
            display: inline-block
            vertical-align: top
            margin-right: 4px
            width: 12px
            height: 12px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height: 12px
            font-size: 10px
      .supports-count
        position: absolute
        right: 12px
        bottom: 16px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 4px
        background: rgba(0, 0, 0, 0.2)
        .count
          vertical-align: top
          font-size: 12px
        .icon-keyboard_arrow_right
          line-height: 24px
          margin-left: 4px
          font-size: 12px
    .bulletin-wrapper
      position: relative
      background: rgba(7,17,27, 0.2)
      line-height: 28px
      height: 28px
      padding: 0 24px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .bulletin-icon
        vertical-align: top
        bg-image('bulletin')
        display: inline-block
        margin-top: 7px
        width: 22px
        height: 12px
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        font-size: 10px
        margin: 0 4px 0 4px
        vertical-align: top
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .background
      position: absolute
      top: 0px
      left: 0px
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 100
      overflow: auto
      transition: all 0.5s
      background: rgba(7, 17, 27, 0.8)
      &.fade-transition
        opacity: 1
      &.fade-enter
        opacity: 1
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        min-height: 100%
        width: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            font-size: 16px
            font-weight: 700
            color: rgb(255, 255, 255)
            text-align: center
          .star
            margin-top: 16px
            font-size: 24px
            text-align: center
          .title
            display: flex
            margin: 30px auto 24px auto
            width: 80%
            .line
              flex: 1
              top: -6px
              position: relative
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              flex: 1
              text-align: center
              padding: 0 12px
              font-size: 14px
          .supports
            width: 80%
            margin: 0 auto
            .supports-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: 16px
                height: 16px
                vertical-align: top
                margin-right: 6px
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height: 16px
                font-size: 12px
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              line-height: 24px
              font-size: 12px
              font-weight: 200

      .detail-closed
         position: relative
         margin: -64px auto 0 auto
         font-size: 32px
         height: 32px
         width: 32px
         clear: both

</style>
