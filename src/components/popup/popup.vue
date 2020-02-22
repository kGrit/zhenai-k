<template>
<div class="popup">
   <div class="premium-wrapper">
     <div class="premium-content">
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
        <div class="premium-right" @click="showTotal">
          立即测算
        </div>
      </div>
        <!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell> -->
     <van-popup v-model="totalshow"  position="bottom" closeable :style="{ height: '60%' }"  close-icon="close" class="popup-total" >
      <div class="back">
        <span>保费测算:</span>
      </div>
      <div class="total">
          <van-cell-group>
            <van-cell title="投保地区" @click="showArea" ref="area" :class="{'check': cityValue!=='请选择'}">
              <span>{{cityValue}}</span>
               <i class="iconfont icon-youjiantou" v-show="cityValue==='请选择'"></i>
            </van-cell>
            <van-popup v-model="areaShow" position="bottom">
              <van-area :area-list="areaList" @cancel="cancelArea" @confirm="confirmArea"/>
            </van-popup>
            <p class="noSelect" v-show="noSelect">请选择投保地区</p>

            <van-cell title="被保险人生日" value="请选择" @click="showTime" :class="{'check': timeValue!=='请选择'}">
              <span>{{timeValue}}</span>
               <i class="iconfont icon-youjiantou" v-show="timeValue ==='请选择'"></i>
            </van-cell>
            <van-popup v-model="timeShow" position="bottom">
              <van-datetime-picker type="date" :min-date="minDate" :max-date="maxDate" @confirm="confirmDate"/>
            </van-popup>
            <van-cell title="被保险人性别" class="sex">
              <transition name="switch">
               <span class="switch" :class="{'active':rel==='1'}"></span>
               </transition>
               <span class="male" :class="{'chose':rel==='1'}" @click="selectMan()" >男</span>
               <span class="famale" @click ="selectWoman()" :class="{'chose':rel==='2'}">女</span>
            </van-cell>
            <van-cell title="基本保额" value="请选择" @click="showAmount()" :class="{'check': amount!=='请选择'}">
              <span>{{amount}}</span> <span v-show="amount !=='请选择'">万</span>
               <i class="iconfont icon-youjiantou" v-show="amount ==='请选择'"></i>
            </van-cell>
              <van-popup v-model="amountShow" position="bottom">
                  <ul class="am-content">
                    <li @click="amountPick(50)">50万</li>
                    <li @click="amountPick(100)">100万</li>
                    <li @click="amountPick(150)">150万</li>
                    <li @click="amountPick(200)">200万</li>
                    <li @click="amountPick(250)">250万</li>
                    <li @click="amountPick(300)">300万</li>
                    <li @click="cancleAmount()">取消</li>
                  </ul>
              </van-popup>
            <van-cell title="保险期间" value="内容" @click="showPeriod()" :class="{'check': period!=='请选择'}">
              <span v-show="period !=='请选择'">{{periodBefore}}</span>
              <span>{{period}}</span>
              <span v-show="period !=='请选择'">{{periodAfter}}</span>
               <i class="iconfont icon-youjiantou" v-show="period ==='请选择'"></i>
            </van-cell>
             <van-popup v-model="periodShow" position="bottom">
                  <ul class="am-content">
                    <li @click="periodPick(20)">20年</li>
                    <li @click="periodPick(30)">30年</li>
                    <li @click="periodPick(60)">至60周岁</li>
                    <li @click="periodPick(65)">至65周岁</li>
                    <li @click="periodPick(70)">至70周岁</li>
                    <li @click="periodPick(80)">至80周岁</li>
                    <li @click="canclePeriod()">取消</li>
                  </ul>
              </van-popup>
            <van-cell title="交费方式"   @click="showCoverage()" :class="{'check': coverage!=='请选择'}">
               <span>{{coverageName}}</span>
              <i class="iconfont icon-youjiantou" v-show="coverage ==='请选择'"></i>
            </van-cell>
             <van-popup v-model="coverageShow" position="bottom">
                  <ul class="am-content">
                    <li @click="coveragePick(12)">年交</li>
                    <li @click="coveragePick(0)">趸交</li>
                    <li @click="coveragePick()">取消</li>
                  </ul>
              </van-popup>
            <van-cell title="交费期限" value="内容"  @click="showDeadline()" :class="{'check': deadlineVal!=='请选择'}">
               <span>{{deadlineVal}}</span> <span v-show="deadlineVal !=='请选择'&&deadlineVal !=='一次性付清'">年</span>
              <i class="iconfont icon-youjiantou" v-show="deadlineVal ==='请选择'"></i>
            </van-cell>
            <van-popup v-model="deadlineShow" position="bottom">
                  <ul class="am-content">
                    <li v-for = "(item,index) in deadline" :key="index" @click="deadLinePick(item)">{{item}}年</li>
                     <li @click="deadLinePick(item)">取消</li>
                  </ul>
              </van-popup>
          </van-cell-group>
          <!-- <van-area :area-list="areaList" /> -->
      </div>
       <div class="premium-content">
         <div class="premium-left">
           <div class="pay">
             <span class="year">年付保费</span>
             <div class="price">
               <span>￥</span>
               <span>88888</span>
            </div>
           </div>
         </div>
         <div class="premium-right mg-20" to="/healtyInfo" @click = "selectTrue">
           立即购买
         </div>
      </div>
    </van-popup>
  </div>
</div>
</template>

<script>
import areaList from './areaList.js'
// import Vue from 'vue'
// import { Area } from 'vant'

// Vue.use(Area)
export default {
  created () {
    this.datePick(18, 60)
  },
  data () {
    return {
      totalshow: false,
      areaShow: false,
      areaList,
      cityValue: '请选择',
      timeShow: false,
      month: 1,
      day: 19,
      minDate: '',
      maxDate: '',
      currentDate: new Date(),
      timeValue: '请选择',
      rel: '2',
      amountShow: false,
      amount: '请选择',
      period: '请选择',
      periodShow: false,
      coverage: '请选择',
      coverageShow: false,
      deadlineShow: false,
      deadlineVal: '请选择',
      noSelect: false
    }
  },
  methods: {
    showTotal () {
      this.totalshow = true
    },
    showArea () {
      this.areaShow = true
    },
    cancelArea () {
      this.areaShow = false
    },
    confirmArea (event) {
      this.areaShow = false
      const province = event[0].name
      const city = event[1].name
      const district = event[2].name
      this.cityValue = `${province} ${city} ${district}`
      // this.$refs.area.lastChild.style.white-space = 'nowrap'
      this.noSelect = false
    },
    showTime () {
      this.timeShow = true
    },
    confirmDate (val) {
      this.timeShow = false
      console.log(event)
      const year = val.getFullYear()
      let month = val.getMonth() + 1
      let day = val.getDate()
      // console.log(year, month, day)
      if (month >= 1 && month <= 9) {
        month = `0${month}`
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`
      }
      const time = Math.round((+new Date() - +val))
      console.log(+new Date(), +val)
      console.log(time)
      console.log(new Date(time))
      const age = (new Date(time).getFullYear() - 1970)
      this.timeValue = `${year}-${month}-${day}(${age}周岁)`
    },
    datePick (minYear, maxYear) {
      const myDate = new Date()
      myDate.setFullYear(myDate.getFullYear() - maxYear)
      this.minDate = new Date(myDate)
      // console.log(myDate)
      const mDate = new Date()
      mDate.setFullYear(mDate.getFullYear() - minYear)
      this.maxDate = new Date(mDate - 1000 * 60 * 60 * 24)
    },
    selectMan () {
      this.rel = '1'
    },
    selectWoman () {
      this.rel = '2'
    },
    showAmount () {
      this.amountShow = true
    },
    cancleAmount () {
      this.amountShow = false
    },
    amountPick (val) {
      this.amount = val
      console.log(this.amount)
      this.amountShow = false
    },
    showPeriod () {
      this.periodShow = true
    },
    canclePeriod () {
      this.periodShow = false
    },
    periodPick (val) {
      this.period = val
      this.periodShow = false
    },
    showCoverage () {
      this.coverageShow = true
    },
    coveragePick (val) {
      this.coverage = val
      this.coverageShow = false
    },
    showDeadline () {
      this.deadlineShow = true
    },
    deadLinePick (val) {
      this.deadlineVal = val
      this.deadlineShow = false
    },
    selectTrue () {
      if (this.cityValue === '请选择') {
        this.noSelect = true
      }
      if (!this.noSelect) {
        this.$router.push({
          path: '/healthyInfo'
        })
      }
    }
  },
  computed: {
    periodAfter () {
      if (this.period === 20 || this.period === 30) {
        return '年'
      } else {
        return '周岁'
      }
    },
    periodBefore () {
      if (this.period === 20 || this.period === 30) {
        return ''
      } else {
        return '至'
      }
    },
    coverageName () {
      if (this.coverage === 0) {
        return '趸交'
      } else if (this.coverage === 12) {
        return '年交'
      } else {
        return '请选择'
      }
    },
    deadline () {
      console.log(this.coverage + '周期' + this.period)
      if (this.coverage === 12 && this.period === 20) {
        return [5, 10, 20]
      } else if (this.coverage === 12) {
        return [5, 10, 20, 30]
      } else {
        return ''
      }
    }
  },
  watch: {
    coverage (newValue, oldValue) {
      if (newValue === 0) {
        this.deadlineVal = '一次性付清'
      } else {
        this.deadlineVal = '请选择'
      }
    }
  }

}
</script>

<style lang="less">
 .premium-wrapper {
    position:fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    .premium-content {
       display: flex;
       .premium-left {
      flex: 1;
      // padding-left: 8px;
      height: 45px;
      .service {
        display: inline-block;
        width: 40px;
        height: 45px;
        padding: 4px 8px 0px 8px;
        text-align: center;
        .icon-kefu {
          font-size: 16px;
        }
        span {
          font-size: 12px;
          color: #3F6DB3;
        }
      }
      .pay {
        // width: 50%;
        display: inline-block;
        vertical-align: top;
        .year {
          display: inline-block;
          height: 45px;
          line-height: 45px;
          font-size: 16px;
          padding-right: 10px;
        }
        .price {
           display: inline-block;
          color:#3F6DB3;
          font-size: 18px;
          span:first-child{
            font-family: 'DIN-Medium',"PingFangSC-Medium", "Source Han Sans", '黑体';
          }
        }
      }
    }
    .premium-right {
      height: 45px;
      line-height: 45px;
      width: 170px;
      text-align: center;
      background-color: #3F6DB3;
      color: #fff;
    }
    }
    .van-overlay {
      background-color: rgba(0,0,0,.4);
      backdrop-filter: blur(2px);
     }
     .van-icon-cross::before {
       color: #3F6DB3
     }
    .popup-total {
      padding: 20px;
      overflow: hidden;
      .noSelect {
        margin: 0 10px;
        text-align: right;
        font-size: 12px;
        background-color: #fcf1f0;
        border-top: 1px solid red;
        color: red
      }
      .back {
        font-weight: 700;
        padding-bottom: 16px;
      }
      .van-icon-close::before {
        color:#3F6DB3;
      }
      .icon-youjiantou {
        position: absolute;
        right: -16px;
        top: 0;
        font-size: 5px;
        color: #3f6db3;
      }
      .van-cell {
        font-size: 14px;
        overflow: inherit;
        .van-cell__value {
          overflow: inherit;
          color: #d6d9df;
        }
        &.check {
          .van-cell__value {
             span {
               color: #637091;
              white-space: nowrap;
           }
          }
       }
       // 性别
       &.sex {
        .switch {
          position: absolute;
          top: 3px;
          // 女 -20
          right: -18px;
          display: inline-block;
          width: 50px;
          height: 20px;
          background-color: rgba(200,235,255,.5);
          border-radius: 444px;
          transition: all .2s ease;
          &.active {
              transition: all .2s ease;
              right: 35px;
          }
        }
        .famale {
          padding: 10px 0px 10px 10px;
          &.chose {
            color: #3f6db3;
          }
        }
        .male {
          margin-right: 20px;
          padding: 10px 10px 10px 10px;
           &.chose {
            color: #5a5adf;
          }
        }
       }

     }
      // 保费
       .am-content {
         border-top: none;
         border-bottom: none;
         li {
           box-sizing: content-box;
           height: 30px;
           line-height: 30px;
           padding: 8px;
           border-bottom: 1px solid #ebedf0;
           text-align: center;
           &:last-child {
             border-top: 6px solid #ebedf0;
             color: red
           }
         }
       }
    }

}

</style>
