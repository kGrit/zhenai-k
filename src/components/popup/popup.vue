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
     <van-popup v-model="totalshow"  position="bottom" closeable   close-icon="close" class="popup-total" >
      <div class="back">
        <span>保费测算:</span>
      </div>
      <div class="total" ref="total">
          <van-cell-group>
            <van-cell title="投保地区" @click="showArea" ref="area" :class="{'check': cityValue!=='请选择'}">
              <span>{{cityValue}}</span>
               <i class="iconfont icon-youjiantou" v-show="cityValue==='请选择'"></i>
            </van-cell>
            <van-popup v-model="areaShow" position="bottom">
              <van-area :area-list="areaList" @cancel="cancelArea" @confirm="confirmArea"/>
            </van-popup>
            <p class="noSelect" v-show="noCity">请选择投保地区</p>

            <van-cell title="被保险人生日" value="请选择" @click="showTime" :class="{'check': timeValue!=='请选择'}">
              <span>{{timeValue}}</span>
               <i class="iconfont icon-youjiantou" v-show="timeValue ==='请选择'"></i>
            </van-cell>
            <van-popup v-model="timeShow" position="bottom">
              <van-datetime-picker type="date" :min-date="minDate" :max-date="maxDate" @confirm="confirmDate"/>
            </van-popup>
            <p class="noSelect" v-show="noTime">请选择被保险人生日</p>
            <van-cell title="被保险人性别" class="sex">
              <transition name="switch">
               <span class="switch" :class="{'active':rel==='1'}"></span>
               </transition>
               <span class="male" :class="{'chose':rel==='1'}" @click="selectMan()" >男</span>
               <span class="famale" @click ="selectWoman()" :class="{'chose':rel==='2'}">女</span>
            </van-cell>
            <van-cell title="基本保额" value="请选择" @click="haveAge &&showAmount() || !haveAge&&warnTime()" :class="{'check': amount!=='请选择'}">
              <span>{{amount}}</span> <span v-show="amount !=='请选择'">万</span>
               <i class="iconfont icon-youjiantou" v-show="amount ==='请选择'"></i>
            </van-cell>
              <van-popup v-model="amountShow" position="bottom">
                  <ul class="am-content">
                    <li  v-for="(item,index) in amountVal" :key="index" @click="amountPick(item)">{{item}}万</li>
                    <!-- <li @click="amountPick(100)">100万</li>
                    <li @click="amountPick(150)">150万</li>
                    <li @click="amountPick(200)">200万</li>
                    <li @click="amountPick(250)">250万</li>
                    <li @click="amountPick(300)">300万</li> -->
                    <li @click="cancleAmount()">取消</li>
                  </ul>
              </van-popup>
            <p class="noSelect" v-show="noAmount">请选择基本保额</p>
            <van-cell title="保险期间" value="内容" @click=" haveAmount &&showPeriod() || !haveAmount && warnAmount()" :class="{'check': period!=='请选择'}">
              <span v-show="period !=='请选择'">{{periodBefore}}</span>
              <span>{{period}}</span>
              <span v-show="period !=='请选择'">{{periodAfter}}</span>
               <i class="iconfont icon-youjiantou" v-show="period ==='请选择'"></i>
            </van-cell>
             <van-popup v-model="periodShow" position="bottom">
                  <ul class="am-content">
                    <li v-for="(item,index) in periodVal" :key="index" @click="periodPick(item)">
                       <span>{{item ==20||item ==30? '':'至'}}</span>
                       {{item}}
                       <span>{{item ==20||item ==30? '年':'周岁'}}</span>
                    </li>
                    <li @click="canclePeriod()">取消</li>
                  </ul>
              </van-popup>
            <p class="noSelect" v-show="noPeriod">请选择保险期间</p>
            <van-cell title="交费方式"   @click=" havePeriod && showCoverage() || !havePeriod && wranPeriod()" :class="{'check': coverage!=='请选择'}">
               <span>{{coverageName}}</span>
              <i class="iconfont icon-youjiantou" v-show="coverage ==='请选择'"></i>
            </van-cell>
             <van-popup v-model="coverageShow" position="bottom">
                  <ul class="am-content">
                    <li @click="coveragePick(12)">年交</li>
                    <li @click="coveragePick(0)">趸交</li>
                    <li @click="cancleCoverage">取消</li>
                  </ul>
              </van-popup>
            <p class="noSelect" v-show="noCoverage">请选择交费方式</p>
            <!-- 点击按钮如果是一次性付清或者请选择 是不让点击的 如果是请选择,点的时候上面的coverage会提示-->
            <van-cell title="交费期限" value="内容"  @click="unDeadline && showDeadline() || !undesc && description()" :class="{'check': deadlineVal!=='请选择'}">
               <span>{{deadlineVal}}</span> <span v-show="deadlineVal !=='请选择'&&deadlineVal !=='一次性付清'">年</span>
              <i class="iconfont icon-youjiantou" v-show="deadlineVal ==='请选择'"></i>
            </van-cell>
            <van-popup v-model="deadlineShow" position="bottom">
                  <ul class="am-content">
                    <li v-for = "(item,index) in deadline" :key="index" @click="deadLinePick(item)">{{item}}年</li>
                     <li @click="cancleDeadine()">取消</li>
                  </ul>
              </van-popup>
            <p class="noSelect" v-show="noDeadline">请选择交费方式</p>
          </van-cell-group>
          <!-- <van-area :area-list="areaList" /> -->
      </div>
       <div class="premium-content">
         <div class="premium-left">
           <div class="pay">
             <span class="year">年付保费</span>
             <div class="price">
               <span>￥</span>
               <span>{{money}}</span>
            </div>
           </div>
         </div>
         <div class="premium-right mg-20" to="/healtyInfo" @click = "selectTrue" ref="butt">
           立即购买
         </div>
      </div>
    </van-popup>
  </div>
</div>
</template>

<script>
import areaList from './areaList.js'
import rateTable from './rateTable'
// import BScroll from '@better-scroll/core'
// import Vue from 'vue'
// import { Area } from 'vant'

// Vue.use(Area)
export default {
  created () {
    // console.log(this.$refs)
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
      age: '',
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
      noCity: false,
      noTime: false,
      noAmount: false,
      noPeriod: false,
      noCoverage: false,
      noDeadline: false,
      unDeadline: false,
      haveAge: false,
      haveAmount: false,
      havePeriod: false,
      // 保险期间的值
      periodVal: [20, 30, 60, 65, 70, 80],
      amountVal: [50, 100, 150, 200, 250, 300]
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
      this.noCity = false
    },
    showTime () {
      this.timeShow = true
    },
    confirmDate (val) {
      this.timeShow = false
      this.haveAge = true
      // console.log(event)
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
      // console.log(+new Date(), +val)
      // console.log(time)
      // console.log(new Date(time))
      const age = (new Date(time).getFullYear() - 1970)
      this.age = age
      this.timeValue = `${year}-${month}-${day}(${age}周岁)`
      this.noTime = false
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
      this.haveAmount = true
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
      this.havePeriod = true
    },
    showCoverage () {
      this.coverageShow = true
    },
    coveragePick (val) {
      this.coverage = val
      this.coverageShow = false
    },
    cancleCoverage () {
      this.coverageShow = false
    },
    showDeadline () {
      this.deadlineShow = true
    },
    cancleDeadine () {
      this.deadlineShow = false
    },
    deadLinePick (val) {
      this.deadlineVal = val
      this.deadlineShow = false
    },
    selectTrue () {
      if (this.cityValue === '请选择') {
        this.noCity = true
      }
      if (this.timeValue === '请选择') {
        this.noTime = true
      }
      if (this.amount === '请选择') {
        this.noAmount = true
      }
      if (this.period === '请选择') {
        this.noPeriod = true
      }
      if (this.coverage === '请选择') {
        this.noCoverage = true
      }
      if (this.deadlineVal === '请选择') {
        this.noDeadline = true
      }
      console.log(this.cityValue, this.timeValue, this.amount, this.period, this.coverage, this.deadlineVal, this.rel)
      if (!this.noCity && !this.noTime) {
        this.$router.push({
          path: '/healthyInfo'
        })
      }
    },
    identical () {
      if (this.period) {
        if (this.periodVal.indexOf(this.period) === -1) {
          this.period = '请选择'
        }
        if (this.amount) {
          if (this.amountVal.indexOf(this.amount) === -1) {
            this.amount = '请选择'
          }
        }
      }
    },
    description () {
      this.noCoverage = true
    },
    warnTime () {
      this.noTime = true
    },
    warnAmount () {
      this.noAmount = true
    },
    wranPeriod () {
      this.noPeriod = true
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
      // console.log(this.coverage + '周期' + this.period)
      if (this.coverage === 12 && this.period === 20) {
        return [5, 10, 20]
      } else if (this.coverage === 12) {
        return [5, 10, 20, 30]
      } else {
        return ''
      }
    },
    undesc () {
      if (this.coverage !== '请选择') {
        return true
      } else {
        return false
      }
    },
    money () {
      if (this.rel === '请选择' || this.period === '请选择' || this.deadlineVal === '请选择' || this.rel === '请选择' || this.age === '请选择' || this.amount === '请选择') {
        return '--'
      } else if (this.coverage === 0) {
        console.log('啊哈' + this.rel, this.period, this.deadlineVal, this.age, this.amount)
        const all1 = Math.round((rateTable[this.rel][this.period][1][this.age] * this.amount).toFixed(2))
        return all1
      } else {
        console.log(this.rel, this.period, this.deadlineVal, this.age, this.amount)
        const all2 = Math.round((rateTable[this.rel][this.period][this.deadlineVal][this.age] * this.amount).toFixed(2))
        return all2
      }
    }
  },
  watch: {
    coverage (newValue, oldValue) {
      if (newValue === 0) {
        this.deadlineVal = '一次性付清'
        this.unDeadline = false
      } else {
        this.deadlineVal = '请选择'
        this.unDeadline = true
      }
      if (newValue !== '请选择') {
        this.noCoverage = false
      }
    },
    amount (newValue) {
      if (newValue !== '请选择') {
        this.noAmount = false
      }
    },
    period (newValue) {
      if (newValue !== '请选择') {
        this.noPeriod = false
      }
    },
    deadlineVal (newValue) {
      if (newValue !== '请选择') {
        this.noDeadline = false
      }
    },

    // 监听age的变化
    age (age) {
      if (age > 50 && age <= 60) {
        this.periodVal = [20, 80]
        this.amountVal = [50, 100, 150, 200]
        // 如果有原本的值,先判断原本的值是不是在这里面不是的话变成请选择
        this.identical()
      } else if (age > 45) {
        this.periodVal = [20, 30, 70, 80]
        this.amountVal = [50, 100, 150, 200, 250]
        this.identical()
      } else if (age > 40) {
        this.periodVal = [20, 30, 65, 70, 80]
        this.amountVal = [50, 100, 150, 200, 250]
        this.identical()
      } else if (age >= 18) {
        this.periodVal = [20, 30, 60, 65, 70, 80]
        this.amountVal = [50, 100, 150, 200, 250, 300]
        this.identical()
      }
    }
    // totalshow (newValue, oldValue) {
    //   if (newValue === true) {
    //     this.$nextTick(() => {
    //       console.log(this.$refs.total)
    //       if (!this.scroll) {
    //         console.log(33)
    //         this.scroll = new BScroll(this.$refs.total, {
    //           click: true,
    //           startY: 0
    //         })
    //       } else {
    //         console.log(777)
    //         this.scroll.refresh()
    //       }
    //     })
    //   }
    // }
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
          font-family: 'DIN-Medium',"PingFangSC-Medium", "Source Han Sans", '黑体';
          span:last-child{
          font-weight: 700;
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
      padding-bottom: 0;
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
        font-size: 16px;
        overflow: inherit;
        padding:14px 16px;
        .van-cell__value {
          overflow: inherit;
          color: #d6d9df;
             span {
               font-size: 14px;
           }
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
     .total {
      overflow-x: hidden;
      overflow-y: auto;
      max-height: 280px;
    }

}

</style>
