/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.20 11:09.
* @Author
* @Description 个人空间 - 应用管理 - 课程管理 - 学校
**/
<template>
  <div class="course-manage-school">
    <page-header></page-header>
    <div class="search-area">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline" label-width="85px">
        <el-form-item label="教室：">
          <el-select v-model="value" size="flat" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级：">
          <el-select v-model="value" size="flat" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学科：">
          <el-select v-model="value" size="flat" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主讲教师：">
          <el-select
            v-model="value"
            filterable
            remote
            reserve-keyword
            size="flat"
            placeholder="请至少输入两个字"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课模式：">
          <el-select v-model="value" size="flat" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授课情况：">
          <el-select v-model="value" size="flat" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门户展示：">
          <el-select v-model="value" size="flat" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课时间：">
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            size="flat"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="视频时长：">
          <el-input size="flat" style="width:70px" placeHolder="分钟"></el-input>
          —
          <el-input size="flat" style="width:70px" placeHolder="分钟"></el-input>
        </el-form-item>
        <el-form-item label="课程名称：">
          <el-input size="flat" placeHolder="请输入"></el-input>
          <el-button size="mini" type="success" class="ml20 mt5">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-area">
      <div class="table-total clearfix">
        共<span class="blue">{{total}}</span>条数据
        <el-button size="mini" type="custom" class="no-radius fr pl-delete-btn" v-if="!showSelection"
                   @click="clickBtnBatchDelete">批量删除
        </el-button>
        <el-button size="mini" type="custom" class="no-radius fr pl-delete-btn" v-if="showSelection"
                   @click="batchDeleteSubmit">删除
        </el-button>
        <el-button size="mini" type="custom" class="no-radius fr pl-delete-btn" v-if="showSelection"
                   @click="clickBtnCancle">取消操作
        </el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default"
        stripe
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          v-if="showSelection"
          width="35">
        </el-table-column>
        <el-table-column
          prop="time"
          label="评论时间">
        </el-table-column>
        <el-table-column
          prop="area"
          label="区域"
        >
        </el-table-column>
        <el-table-column
          prop="person"
          label="评论人">
        </el-table-column>
        <el-table-column
          prop="source"
          label="来源">
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="90">
          <template slot-scope="scope">
            <a type="btn" @click="clickBtnDelete(2,scope.row)" color="danger">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination-right"
        background layout="prev, pager, next, sizes, jumper,slot"
        :pager-count="5"
        @current-change="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        :current-page.sync="pageNum"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :hide-on-single-page="true"
        :total="total">
        <el-button type="primary">确定</el-button>
      </el-pagination>
    </div>
  </div>
</template>
<script>
/*
* Description index
* Created By xuqingyu
* Created At 2019/10/15 15:43
*/
import PageHeader from '@/components/personal/PageHeader/index'

export default {
  name: 'CourseMgtSchool',
  props: {},
  components: { PageHeader },
  data () {
    return {
      showSelection: false,
      multipleSelection: [],
      pageNum: 1, // 页码当前页
      pageSize: 20, // 页行数
      total: 555,
      tableData: [
        {
          time: '2019-02-01 09:12',
          area: '江苏省-苏州市-吴中区-阔地小学',
          person: '王乐启',
          source: '数学查缺补漏',
          content: '老师你真好'
        },
        {
          time: '2019-07-08 09:12',
          area: '江苏省-苏州市-吴中区-阔地小学',
          person: '王乐启',
          source: '数学查缺补漏',
          content: '老师你真好'
        },
        {
          time: '2019-06-01 09:12',
          area: '江苏省-苏州市-吴中区-阔地小学',
          person: '王乐启',
          source: '数学查缺补漏',
          content: '老师你真好'
        },
        {
          time: '2019-05-04 09:12',
          area: '江苏省-苏州市-吴中区-阔地小学',
          person: '王乐启',
          source: '数学查缺补漏',
          content: '老师你真好'
        },
        {
          time: '2019-03-04 09:12',
          area: '江苏省-苏州市-吴中区-阔地小学',
          person: '王乐启',
          source: '数学查缺补漏',
          content: '老师你真好'
        },
        {
          time: '2019-02-01 09:12',
          area: '江苏省-苏州市-吴中区-阔地小学',
          person: '王乐启',
          source: '数学查缺补漏',
          content: '老师你真好'
        },
        {
          time: '2019-01-05 09:12',
          area: '江苏省-苏州市-吴中区-阔地小学',
          person: '王乐启',
          source: '数学查缺补漏',
          content: '老师你真好'
        },
      ], // 表格数据
      queryParams: {},
      value2: '',
      activeName: 'first',
      value: '',
      radio: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      list: [],
      loading: false,
    }
  },
  methods: {
    /**
     * @description: 点击取消-批量删除按钮——取消操作
     * @param arguments 描述
     * @returns {}
     */
    clickBtnCancle () {
      this.showSelection = false
      this.$refs.multipleTable.clearSelection()
    },
    /**
     * @description: 点击批量删除确认删除按钮——提交批量删除
     * @param arguments 描述
     * @returns {}
     */
    batchDeleteSubmit () {
      const params = this.multipleSelection.map((item) => item.baseUserId)
      console.log(params)
      // await submitDeleteTeacher(params.join())
      // this.initTableData()
    },
    /**
     * @description: 点击批量删除按钮——操作表格
     * @param arguments 描述
     * @returns {}
     */
    clickBtnBatchDelete () {
      this.showSelection = true
    },
    /**
     * @description: 监测selection筛选框的改变
     * @param arguments 描述
     * @returns {}
     */
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    /**
     * @description: 点击删除角色按钮
     * @param row 描述 roleId
     * @returns {}
     */
    clickBtnDelete (style, row) {
      this.showConfirmBox({
        message: '是否确定删除？',
        title: '删除',
        type: 'warning',
        style: style || 0
      }).then((row) => {
        // submitDeleteUser(row.userId)
      }).catch(e => console.log('取消', e))
    },

    /**
     * @description: 点击分页切换查询行数
     * @param arguments 描述
     * @returns {}
     */
    handleSizeChange (val) {
      this.pageSize = val
    },
    /**
     * @description: 点击分页查询按钮
     * @param arguments 描述
     * @returns {}
     */
    handleCurrentChange (val) {
      this.pageNum = val
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style scoped lang="scss">
  .course-manage-school {
    .margin-10 {
      margin: auto 10px;
    }

    .clearfix:after {
      content: '';
      display: block;
      clear: both;
    }

    .mb20 {
      margin-bottom: 20px;
    }

    .fr {
      float: right;
    }

    .ml20 {
      margin-left: 20px;
    }

    .pl-delete-btn {
      margin-left: 20px;
    }

    .table-total {
      line-height: 24px;
      font-size: 12px;
      color: #666;
      margin-top: 20px;
      margin-bottom: 10px;

      .blue {
        color: #347eff;
      }
    }

    .search-area {
      @extend .margin-10;
      padding-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #dcdcdc;
      margin-bottom: 15px;
    }

    .table-area {
      @extend .margin-10;

      .export-text-btn {
        @extend .fr;
        font-size: 14px;
        color: #666;
        cursor: pointer;

        .iconfont {
          font-size: 14px;
          margin-right: 5px;
          color: #999;
        }
      }
    }

    .pagination-right {
      margin-top: 40px;
      text-align: right;
      margin-bottom: 40px;
    }
  }
</style>
