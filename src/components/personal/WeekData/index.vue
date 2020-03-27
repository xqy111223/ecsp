/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.11.13 14:40.
* @Author
* @Description  个人空间 - 应用管理 - 课表管理 - 时间控件 -周切换 - 公共组件
**/
<template>
  <!-- 时间控件 - 周切换组件 -->
  <div>
    <el-tooltip class="item" content="上周" placement="top-end">
      <i @click="handleWeekClick('prev')" class="el-icon-custom-left cl-arrow"></i>
    </el-tooltip>
    <el-date-picker :clearable=false @change="handleChangeClick" placeholder="选择日期" size="date-flat" type="date" v-model="weekData">
    </el-date-picker>
    <el-tooltip class="item" content="下周" placement="top-end">
      <i @click="handleWeekClick('next')" class="el-icon-custom-right cl-arrow"></i>
    </el-tooltip>
  </div>
</template>
<script>

export default {
  name: 'WeekData',
  data () {
    return {
      weekData: new Date()
    }
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 周时间控件 时间改变 - 事件监听.
     **/
    handleChangeClick () {
      this.$emit('getWeek', this.weekData)
    },
    /**
     *@Description
     *@Param prev:上周、 next：下周
     *@Return 时间控件 周切换 - 事件.
     **/
    handleWeekClick (e) {
      const date = new Date(this.weekData)
      if (e === 'prev') {
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        this.weekData = date
      } else {
        date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
        this.weekData = date
      }
      this.$emit('getWeek', this.weekData)
    },
  }
}
</script>
<style lang="scss" scoped>
  .cl-arrow {
    font-size: 14px;
    line-height: 32px;
    width: 22px;
    height: 32px;
    cursor: pointer;
    text-align: center;
    vertical-align: top;
    color: #bbb;
    border: 1px solid #dcdcdc;
    &:hover {
      color: #666;
    }
  }
  .el-tooltip__popper.is-dark { // 上下周 - 底色鼠标移入展示
    background: #eaf2ff;
  }
</style>
