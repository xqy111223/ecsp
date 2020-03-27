/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.31 16:32.
* @Author
* @Description 门户首页 - 课程表 模块 - 课程table组件
**/
<template>
  <el-table :data="tableData" :span-method="arraySpanMethod" border class="el-table-course">
    <el-table-column :class-name="getClassName(item)" :key="`class_table_col_${item.label}`" :label="item.label" align="center" header-align="center" v-for="item in columns">
      <template slot-scope="scope">
        <!-- 午别 -->
        <div v-if="item.prop==='type'">{{scope.row[item.prop]}}</div>
        <!-- 节次 -->
        <div v-else-if="item.prop==='number'">{{scope.row.number}} <i class="el-icon-custom-sign"></i></div>
        <!-- 展示课程数量 -->
        <div :class="scope.row[item.prop].split('_')[1] == 1 && 'starting'" @click="triggerEvent(scope.row)" class="box-radius" v-else-if="scope.row[item.prop]">
          {{scope.row[item.prop].split('_')[0]}}节课
        </div>
        <!-- 无数据 -->
        <div v-else>{{''}}</div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import dayjs from 'dayjs'
import { CHINESE_NUMBER, WEEK_NUMBER } from '@/constants/COMMON'

export default {
  name: 'ClassTable',
  props: {
    classData: {
      type: Object,
      default () {
        return {
          amInfo: [],
          courseInfo: { AMMAXLEN: 4, PMMAXLEN: 4 },
          pmInfo: []
        }
      }
    }
  },
  data () {
    return {
      columns: [
        {
          label: '午别',
          prop: 'type'
        }, {
          label: '节次',
          prop: 'number'
        }],
      tableData: [],
      spanArray: []
    }
  },
  created () {
    // 生成列信息
    const firstDate = dayjs().startOf('week').add(1, 'day')
    WEEK_NUMBER.split('_').forEach((week, i) => {
      this.columns.push({
        label: `${week}/${firstDate.add(i, 'day').format('MM.DD')}${firstDate.add(i, 'day').get('day') === dayjs().get('day') ? '/今天' : ''}`,
        prop: 'week_' + (i + 1)
      })
    })
    this.renderTable()
  },
  methods: {
    /**
     * @description: 重新对表格数据进行计算渲染
     * @param arguments 描述
     * @returns {}
     */
    renderTable () {
      // 处理异常情况
      if (!this.classData.courseInfo) {
        this.classData.courseInfo = { AMMAXLEN: 4, PMMAXLEN: 4 }
      }
      this.tableData = []
      this.spanArray = []
      const tableData = []
      // 生成节次信息
      const courseInfo = this.classData.courseInfo
      for (let i = 0; i < courseInfo.AMMAXLEN + courseInfo.PMMAXLEN; i++) {
        if (i >= courseInfo.AMMAXLEN) { // 下午
          tableData.push({ index: (i + 1), number: CHINESE_NUMBER.split('_')[i], type: '下午' })
        } else { // 上午
          tableData.push({ index: (i + 1), number: CHINESE_NUMBER.split('_')[i], type: '上午' })
        }
      }
      this.classData.amInfo && this.classData.amInfo.forEach(info => {
        const index = parseInt(info.classSeq) - 1
        if (this.tableData[index]) {
          tableData[index][`week_${info.daySeq}`] = `${info.totalCount}_${info.status}`
          tableData[index].classSeq = info.classSeq
          tableData[index].daySeq = info.daySeq
        }
      })
      this.classData.pmInfo && this.classData.pmInfo.forEach(info => {
        const index = parseInt(parseInt(info.classSeq) - 1 + courseInfo.AMMAXLEN)
        if (tableData[index]) {
          tableData[index][`week_${info.daySeq}`] = `${info.totalCount}_${info.status}`
          tableData[index].classSeq = info.classSeq
          tableData[index].daySeq = info.daySeq
        }
      })
      this.tableData = tableData
      this.mergeSpan()
    },
    /**
     * @description: 处理表格的单元格合并
     * @param arguments 描述
     * @returns {}
     */
    mergeSpan () {
      let contactDot = 0
      this.tableData.forEach((item, index) => {
        item.index = index
        if (index === 0) {
          this.spanArray.push(1)
        } else {
          if (item.type === this.tableData[index - 1].type) {
            this.spanArray[contactDot] += 1
            this.spanArray.push(0)
          } else {
            this.spanArray.push(1)
            contactDot = index
          }
        }
      })
    },
    /**
     * @description: 表格合并回调
     * @param column 描述
     * @returns {}
     */
    arraySpanMethod ({ column, rowIndex, columnIndex }) {
      // 对第一列，进行合并操作
      if (columnIndex === 0) {
        const _row = this.spanArray[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    /**
     * @description: 方法说明
     * @param  描述
     * @returns {}
     */
    getClassName (c) {
      if (c.label.indexOf('节次') > -1) {
        return 'sort'
      } else if (c.label.indexOf('今天') > -1) {
        return 'today'
      }
    },
    /**
     * @description: 点击触发事件
     * @param data 行数据对象
     * @returns {}
     */
    triggerEvent (data) {
      this.$emit('table-click', {
        daySeq: data.daySeq,
        classSeq: data.classSeq,
        dayPeriodFlag: data.type === '上午' ? 'AM' : 'PM'
      })
    }
  },
  watch: {
    classData: {
      deep: true,
      handler () {
        this.renderTable()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-radius {
    font-weight: bold;
    line-height: 50px;
    position: absolute;
    top: 5px;
    right: 5px;
    bottom: 5px;
    left: 5px;
    height: 50px;
    padding-left: 10px;
    cursor: pointer;
    text-align: left;
    border-radius: 5px;
    background-color: #eeeeee;

    &:hover {
      background-color: #9ffbcd;
    }

    &.starting {
      &::after {
        position: absolute;
        right: 5px;
        bottom: 4px;
        display: block;
        width: 18px;
        height: 12px;
        content: ' ';
        background-image: url("~@/assets/images/starting.gif");
      }
    }
  }
  /deep/ .el-table__header-wrapper {
    tr {
      height: 60px;
      color: #fff;
    }
  }
</style>
<style lang="scss">
  @import "&/default/var.scss";

  .el-table-course {
    border-radius: 5px;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.2);

    th {
      font-weight: normal;
      background: $primary-color;
      background: var(--primary-color);
      background-blend-mode: normal, normal;
    }

    th.today {
      background-color: #ffb400;
    }

    .el-table__body-wrapper {
      tr {
        height: 60px;

      }

      td.sort {
        i {
          position: absolute;
          top: 25px;
          right: 0;
          color: #f19149;
        }
      }
    }
  }
</style>
