<template>
  <div class="permiun">
    <div class="bannerwrapper">
        <img src="../../assets/zhenaibanner.jpg" alt="" class="banner">
      <div class="banner-text">
        <p>臻爱优选定期寿险产品计划</p>
        <p>18-60周岁可投保</p>
      </div>
    </div>
    <ul class="description">
      <li>
        <i class ="iconfont icon-duigou"></i>
        免体检最高保额300万 最高可保至80周岁</li>
      <li>
        <i class ="iconfont icon-duigou"></i>
        健告宽松 投保门槛低</li>
      <li>
        <i class ="iconfont icon-duigou"></i>
        身故或全残赔付保险金 家庭支柱首选</li>

    </ul>
    <div class="content">
      <p class="content-text">— 保障内容 —</p>
      <ul class="content-main">
        <li>
          <p>身故保险金</p>
          <p>基本保额</p>
        </li>
        <li>
          <p>全残保险金</p>
          <p>基本保额</p>
        </li>
        <li>
            <router-link to="/descDetail" class="descdetail">
              查看保障详情
              <i class="iconfont icon-youjiantou"></i>
            </router-link>
        </li>
      </ul>
    </div>
    <div class="logo-wrapper">
      <img src="../../assets/zhenailogo.jpg" alt="" width="100%">
    </div>
    <div class="copyright">
      <p>版权所有：同方全球人寿保险有限公司</p>
    </div>
    <!-- <div class="premium-wrapper">
      <div class="premium-left">
        <a class="service" href="https://www.sobot.com/chat/h5/index.html?sysNum=815ca630783c4c60bce5c374ad868ced&customerFields={'customField1':'臻爱优选定寿'}">
          <i class="iconfont icon-kefu"></i>
          <span>客服</span>
        </a>
        <div class="pay">
          <span class="year">年付保费</span>
          <div class="price">
            <span>￥</span>
            <span>88888</span>
        </div>
      </div>
      </div>
        <div class="premium-right">
          立即测算
        </div>
    </div> -->
    <popup></popup>
  </div>
</template>

<script>
import popup from 'components/popup/popup.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    popup
  }

}
</script>

<style lang="less">
@import '../../styles/iconfont.less';
.permiun {
  .bannerwrapper {
    position: relative;
    overflow: hidden;
      .banner {
        width: 100%;
        height: auto;
        // 解决下面1px边框
        vertical-align: top;
      }
      .banner-text {
        position: absolute;
        bottom: 0;
        width: 100%;
        color: #fff;
        background-color: rgba(0,0,0,.3);
        padding: 8px 10px;
        p:first-child {
          font-size: 18px;
        }
        P:last-child {
          margin-top: 4px;
          font-size: 12px;
        }
      }
  }
  .description {
    padding: 6px 20px;
    border-bottom: 4px solid #e6e6e6;
    li {
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      color: #6e6666;
      i {
        margin-right: 4px;
        font-size: 14px;
        color: #3F6DB3;
      }
    }
  }
  .content {
    padding: 20px;
    color: #5D667A;
    .content-text {
      text-align: center;
      font-size: 20px;
      font-weight: 700
    }
    .content-main {
      font-size: 14px;
      padding: 20px 10px;
      li {
        height: 28px;
        line-height: 28px;
        p:first-child {
          float: left;
        }
         p:last-child {
          float: right;
        }
        .descdetail {
          display:inline-block;
          padding-top: 10px;
          font-size: 16px;
          color: #3F6DB3;
          .icon-youjiantou {
            font-size: 10px;
          }
        }

      }
    }

  }
  .copyright {
    text-align: center;
    font-size: 10px;
    background-color: #f6f6f6;
    color: #b1b1b1;
    padding-bottom: 50px;
  }
  // .premium-wrapper {
  //   position:fixed;
  //   bottom: 0;
  //   display: flex;
  //   width: 100%;
  //   background-color: #fff;
  //   .premium-left {
  //     flex: 1;
  //     // padding-left: 8px;
  //     height: 45px;
  //     .service {
  //       display: inline-block;
  //       width: 40px;
  //       height: 45px;
  //       padding: 4px 8px 0px 8px;
  //       text-align: center;
  //       .icon-kefu {
  //         font-size: 16px;
  //       }
  //       span {
  //         font-size: 12px;
  //         color: #3F6DB3;
  //       }
  //     }
  //     .pay {
  //       // width: 50%;
  //       display: inline-block;
  //       vertical-align: top;
  //       .year {
  //         display: inline-block;
  //         height: 45px;
  //         line-height: 45px;
  //         font-size: 16px;
  //         padding-right: 10px;
  //       }
  //       .price {
  //          display: inline-block;
  //         color:#3F6DB3;
  //         font-size: 18px;
  //         span:first-child{
  //           font-family: 'DIN-Medium',"PingFangSC-Medium", "Source Han Sans", '黑体';
  //         }

  //       }
  //     }
  //   }
  //   .premium-right {
  //     height: 45px;
  //     line-height: 45px;
  //     width: 170px;
  //     text-align: center;
  //     background-color: #3F6DB3;
  //     color: #fff;
  //   }

  // }
}

</style>
