<template>
  <div class="descDetail">
    <div class="title border-1px" >
      <i class="iconfont icon-zuojiantou" @click="back"></i>
      <span>保障详情</span>
    </div>
    <div class="tab-wrapper border-1px" ref="tabWrapper">
      <ul class="tab">
        <li v-for="(item,index) in price" :key="index" :class=" {'light-heigh':lightIndex === index}" @click="toggleLight(index)">{{item}} 万保额</li>
      </ul>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <p class="kind clearfix" >
          <span>身故保险金</span>
          <span>{{price[lightIndex]}}万</span>
        </p>
        <p class="text">被保险人于等待期后身故，按基本保险金额向身故保险金受益人给付身故保险金，本合同效力终止。</p>
      </div>
       <div class="content">
        <p class="kind clearfix" >
          <span>全残保险金</span>
          <span>{{price[lightIndex]}}万</span>
        </p>
        <p class="text">被保险人于等待期后全残，按基本保险金额向被保险人给付全残保险金（若被保险人同时符合一项以上的全残情形时，该给付以一项为限），本合同效力终止。</p>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
export default {
  created () {
    this.$nextTick(() => {
      this.personScroll()
    })
  },
  data () {
    return {
      price: [50, 100, 200, 300],
      lightIndex: 0
    }
  },

  methods: {
    back () {
      this.$router.back()
    },
    personScroll () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.tabWrapper, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: 'vertical'
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    toggleLight (index) {
      this.lightIndex = index
    }

  }

}
</script>

<style lang="less" scoped>
@import '../../styles/mixin.less';
.descDetail {
  overflow: hidden;
  .title {
    padding: 10px;
    padding-bottom: 20px;
    font-size: 20px;
    text-align: center;
    .border-1px(#E6E9F0);
    i {
      font-size: 22px;
      float: left;
      color: rgb(146, 141, 141);
    }
  }
  .tab-wrapper {
    white-space:nowrap;
     touch-action: none;
    .border-1px(#E6E9F0);
    .tab {
      height: 50px;
      line-height: 50px;
      display: inline-block;
      padding: 0 20px;
      font-size: 16px;
      li {
        display: inline-block;
        // width: 120px;
        margin-right: 30px;
        &:last-child {
          margin-right: 0;
        }
         &.light-heigh {
          color: #3F6DB3;
          &::after {
            content: '';
            clear: both;
            display: table;
            background-color: #3F6DB3;
            width: 30px;
            height: 4px;
            margin-left: 28%;
            margin-top: -4px;
            border-radius: 2px;
          }
        }
      }
    }
  }
  .content-wrapper {
    padding: 20px;
   .content {
     padding: 20px;
     border: 1px solid #E6E9F0;
     box-shadow: 3px 4px 10px #eee;
     margin-bottom: 20px;
      .kind {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        margin-bottom: 4px;
           span:first-child {
             float: left;
           }
           span:last-child {
             float: right;
             color: #5D667A;
           }
        }
        .text {
          font-size: 14px;
          line-height: 20px;
          color: #5D667A;
        }
    }
  }
}

</style>
