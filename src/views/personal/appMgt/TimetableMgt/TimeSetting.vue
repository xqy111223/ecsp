/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.11.06 14:22.
* @Author
* @Description 个人中心 - 应用管理 - 课表管理 - 设置上课时间 组件
**/
<template>
  <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" title="设置上课时间" width="650px">
    <div>
      <!-- 上课时间设置 -->
      <div class="class-set cl-dashed">
        <div class="class-border">
          <p>上课时间</p>
          <span class="w160">课程时长 <el-input class="w50" v-model="courseDuration"></el-input> 分钟 </span>
          <span>课间时长 <el-input @change="handleBreakChange" class="w50" max=60 min=1 v-model="breakDuration"></el-input> 分钟 </span>
        </div>

        <div class="cl-bor mt10">
          <p class="left15">上午</p>
          <span class="w160">上午课程 <el-input @change="handleNumberChange('am')" class="w50" v-model="amNum"></el-input> 节 </span>
          <span>上课时间
            <el-time-select :clearable=false :picker-options="{start: '00:00', step: step, end: '24:00' }" @focus="handleBlurClick" class="w140" placeholder="选择时间"
                            v-model="amStartTime"></el-time-select>
          </span>
        </div>
        <div class="mt10">
          <p class="left15">下午</p>
          <span class="w160">下午课程 <el-input @change="handleNumberChange('pm')" class="w50" v-model="pmNum"></el-input> 节 </span>
          <span>上课时间
            <el-time-select :clearable=false :picker-options="{start: '00:00', step: step, end: '24:00' }" @focus="handleBlurClick" class="w140" placeholder="选择时间"
                            v-model="pmStartTime"></el-time-select>
          </span>
        </div>
        <el-button @click="handleSetClick" class="no-radius" size="mini" type="custom">快捷设置</el-button>
      </div>

      <!-- 上课节次设置 -->
      <div class="cl-flex cl-dashed pb10">
        <div class="cl-break">上午</div>
        <ul>
          <li :key="index" v-for="(item, index) of am">
            <span>第{{ SerialNum(index) }}节</span>
            <el-time-picker :clearable=false class="w140" format='HH:mm' placeholder="选择时间" v-model="item.startTime"></el-time-picker>
            ~
            <el-time-picker :clearable=false class="w140" format='HH:mm' placeholder="选择时间" v-model="item.endTime"></el-time-picker>
          </li>
        </ul>
        <div class="cl-add">
          <i @click="handleAddDelClick('amAdd')" class="el-icon-custom-add mr5" v-if="amNum<6"></i>
          <i @click="handleAddDelClick('amDel')" class="el-icon-custom-delete" v-if="amNum>3"></i>
        </div>
      </div>
      <!-- 下午 -->
      <div class="cl-flex">
        <div class="cl-break">下午</div>
        <ul>
          <li :key="index" v-for="(item, index) of pm">
            <span>第{{ SerialNum(index, 'pm') }}节</span>
            <el-time-picker :clearable=false class="w140" format='HH:mm' placeholder="选择时间" v-model="item.startTime"></el-time-picker>
            ~
            <el-time-picker :clearable=false class="w140" format='HH:mm' placeholder="选择时间" v-model="item.endTime"></el-time-picker>
          </li>
        </ul>
        <div class="cl-add">
          <i @click="handleAddDelClick('pmAdd')" class="el-icon-custom-add mr5" v-if="pmNum<8"></i>
          <i @click="handleAddDelClick('pmDel')" class="el-icon-custom-delete" v-if="pmNum>3"></i>
        </div>
      </div>
      <p class="mt10 red" v-show="infoFlag">您设置的时间不合理，请重新设置！</p>
    </div>

    <span class="dialog-footer" slot="footer">
      <el-button @click="handleBtnClick('cancel')" size="small">取 消</el-button>
      <el-button @click="handleBtnClick('determine')" size="small" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import dayjs from 'dayjs'
import { setTime } from '@/api/personal/appMgt' // 设置排课时间 提交接口
import { CHINESE_NUMBER } from '@/constants/COMMON' // 一到二十

export default {
  name: 'timeSetting',
  props: ['dialogVisible', 'classRoomId'],
  data () {
    return {
      am: [], // 上午 节次数组
      pm: [], // 下午 节次数组
      amNum: 4, // 上午上课节数
      pmNum: 4, // 下午上课节数
      step: '00:15', // 上课时间 步距
      infoFlag: false, // 时间设置不合理 flag
      breakDuration: 15, // 课间时长
      courseDuration: 45, // 课程时长
      amStartTime: '08:00', // 上午上课开始时间
      pmStartTime: '14:00', // 下午上课开始时间
    }
  },
  watch: {
    classRoomId: function (newVal, oldVal) {
      console.log('classRoomId***', newVal, oldVal)
    }
  },
  created () {
    this.teachSchedule() // 默认自动排课
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 课间时长 - 事件监听.
     **/
    handleBreakChange (e) {
      if (!/(^[1-9]$)|(^[1-5]\d$)|(^6[0]$)/.test(e)) {
        this.$message.warning('请输入1-60的正整数！')
        this.breakDuration = 15
        return false
      }
    },
    /**
     *@Description
     *@Param 上午： 3-6、下午：3-8
     *@Return 上下午 节次设置 事件监听.
     **/
    handleNumberChange (e) {
      if (e === 'am') {
        if (!/^[3-6]*$/.test(this.amNum)) {
          this.amNum = 4
          this.$message.warning('请输入3-6的正整数！')
          return false
        }
      }
      if (e === 'pm') {
        if (!/^[3-8]*$/.test(this.pmNum)) {
          this.pmNum = 4
          this.$message.warning('请输入3-8的正整数！')
          return false
        }
      }
    },
    /**
     *@Description
     *@Param
     *@Return 上课时间 获取焦点 事件监听，设置时间步距.
     **/
    handleBlurClick () {
      this.step = '00:' + this.breakDuration
    },
    /**
     *@Description
     *@Param
     *@Return 快捷设置 - 事件监听.
     **/
    handleSetClick () {
      this.am = []
      this.pm = []
      this.teachSchedule()
    },
    /**
     *@Description
     *@Param
     *@Return 快捷设置 - 排课方法.
     **/
    teachSchedule () {
      const sameDay = dayjs().format('YYYY/MM/DD') // 获取当天的YMD 用作数据提交和计算使用
      const amStart = new Date(sameDay + ' ' + this.amStartTime).getTime() // 将第一节课的时间通过 'YYYY/MM/DD HH:mm' 转成时间戳 - 上午
      const pmStart = new Date(sameDay + ' ' + this.pmStartTime).getTime() // 将第一节课的时间通过 'YYYY/MM/DD HH:mm' 转成时间戳 - 下午

      for (let i = 0; i < this.amNum; i++) { // 上午
        this.am.push(this.festivalTime(i, 'AM', amStart))
      }
      for (let i = 0; i < this.pmNum; i++) { // 下午
        this.pm.push(this.festivalTime(i, 'PM', pmStart))
      }
    },
    /**
     *@Description
     *@Param
     *@Return 排课 - 添加删除 - 按钮 事件监听.
     **/
    handleAddDelClick (e) {
      if (e === 'amAdd') {
        const len = this.am.length
        this.am.push(this.festivalTime(len, 'AM', this.am[len - 1].endTime))
        this.amNum++
      }
      if (e === 'amDel') {
        this.am.pop()
        this.amNum--
      }
      if (e === 'pmAdd') {
        const len = this.pm.length
        this.pm.push(this.festivalTime(len, 'PM', this.pm[len - 1].endTime))
        this.pmNum++
      }
      if (e === 'pmDel') {
        this.pm.pop()
        this.pmNum--
      }
    },
    /**
     *@Description
     *@Param
     *@Return 排课节次 对象方法.
     **/
    festivalTime (i, type, time) {
      const breakDuration = this.breakDuration * 60 * 1000 // 课间时长 转成时间戳 15*60*1000
      const courseDuration = this.courseDuration * 60 * 1000 // 课程时长 转成时间戳 45*60*1000
      const obj = {
        endTime: '', // 结束时间
        startTime: '', // 开始时间
        dayPeriod: type, // 上下午：AM/PM
      }
      if (i === 0) {
        obj.startTime = this.transTime(time) // 第一节 开始时间戳
        obj.endTime = this.transTime(time) + courseDuration // 第一节课结束时间戳（开课时间 + 课程时长）
      } else {
        const num = i - 1
        if (type === 'AM') {
          obj.startTime = this.am[num].endTime + breakDuration // 下一节课开始时间戳（上一节课结束时间 + 课间休息）
        } else {
          obj.startTime = this.pm[num].endTime + breakDuration // 下一节课开始时间戳（上一节课结束时间 + 课间休息）
        }
        obj.endTime = obj.startTime + courseDuration // 下一节课结束时间戳（本节课开始时间 + 课程时长）
      }
      return obj
    },
    /**
     *@Description
     *@Param
     *@Return 上下午 排课 序号生成.
     **/
    SerialNum (index, type) {
      if (type === 'pm') {
        return CHINESE_NUMBER.split('_')[this.amNum + index]
      } else {
        return CHINESE_NUMBER.split('_')[index]
      }
    },
    /**
     *@Description
     *@Param
     *@Return 弹窗 取消 确定按钮 事件.
     **/
    handleBtnClick (e) {
      if (e === 'cancel') {
        this.$emit('getDialog')
      } else {
        const arr = []
        const params = {
          classroomId: '11111' || this.classRoomId,
          courseTimes: this.am.concat(this.pm)
        }
        const len = params.courseTimes.length
        params.courseTimes.forEach(val => {
          val.endTime = this.transTime(val.endTime)
          val.startTime = this.transTime(val.startTime)
        })
        for (let i = 0; i < len; i++) { // 同一天第一节课开始时间 和 最后一节课的结束时间 不做规定
          const obj = params.courseTimes[i]
          let prevEnd = 0
          if (i > 0) {
            prevEnd = params.courseTimes[i - 1].endTime // 上一节课的 结束时间 - 戳
          }
          if (obj.startTime >= obj.endTime || obj.startTime <= prevEnd) { // 同一节课开始时间 < 结束时间、 （一节课的结束时间 < 下一节课的开始时间 === 一节课的开始时间 > 上一节课的结束时间）
            arr.push(obj)
            break
          }
        }
        if (arr.length > 0) {
          this.infoFlag = true
          this.$message.warning('您设置的时间不合理，请重新设置！')
          return false
        } else {
          this.infoFlag = false
          setTime(params).then(res => {
            this.$message.success('上课时间设置成功！')
            this.$emit('getDialog')
          })
        }
      }
    },
    /**
     *@Description
     *@Param
     *@Return 时间 转成时间戳 并返回时间戳.
     **/
    transTime (time) {
      return typeof time === 'number' ? time : time.getTime()
    },
    /**
     *@Description
     *@Param
     *@Return 关闭 按钮.
     **/
    handleClose () {
      this.$emit('getDialog')
    },
  }
}
</script>
<style lang="scss" scoped>
  /* 上课时间 设置 */
  .class-set {
    position: relative;
    padding-bottom: 10px;
    p {
      position: relative;
      display: inline-block;
      width: 65px;
      margin-right: 30px;
      text-align: right;
      &:before {
        position: absolute;
        top: 6px;
        left: 0px;
        width: 10px;
        content: '';
        border-top: 1px solid #333;
      }
    }
    .left15:before {
      left: 15px;
    }
    /* 纠正input */
    .w50 {
      width: 50px;
    }
    /* 纠正时间控件 */
    .w160 {
      display: inline-block;
      width: 160px;
    }
    /* 快捷设置 */
    .no-radius {
      position: absolute;
      top: 60px;
      right: 0;
    }
  }
  /* 关联线绘制 */
  .class-border {
    position: relative;
    &:before {
      position: absolute;
      top: 14px;
      left: 0px;
      height: 60px;
      content: '';
      border-left: 1px solid #333;
    }
    &:after {
      position: absolute;
      top: 74px;
      left: 0px;
      width: 10px;
      content: '';
      border-top: 1px solid #333;
    }
  }
  .cl-bor {
    position: relative;
    &:before {
      position: absolute;
      top: 14px;
      left: 15px;
      height: 40px;
      content: '';
      border-left: 1px solid #333;
    }
  }
  .w140 {
    width: 140px;
    /deep/ .el-input__prefix {
      top: -5px;
      left: 110px;
    }
  }
  /deep/ .el-input__inner {
    line-height: 30px;
    height: 30px;
    padding: 0 5px;
  }
  /* 上下午 节次模块 */
  .cl-flex {
    display: flex;
    /* 午别 */
    .cl-break {
      align-self: center;
      width: 50px;
      margin-top: 10px;
    }
    li {
      margin-top: 10px;
      > span {
        display: inline-block;
        width: 60px;
        margin-right: 5px;
        text-align: right;
        color: #999;
      }
    }
    /* 添加删除操作按钮 */
    .cl-add {
      align-self: flex-end;
      height: 26px;
      margin-left: 10px;
      i {
        font-size: 18px;
        cursor: pointer;
      }
      .el-icon-custom-add {
        color: #347eff;
      }
      .el-icon-custom-delete {
        color: #ff3b3b;
      }
    }
  }
  .red {
    color: red;
  }
  .cl-dashed {
    border-bottom: 1px dashed #dcdcdc;
  }
  /deep/ .el-input__inner {
    border: 1px solid #dcdcdc;
  }
</style>
