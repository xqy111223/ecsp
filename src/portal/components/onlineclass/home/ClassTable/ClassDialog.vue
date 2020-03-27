/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.31 16:33.
* @Author
* @Description 门户首页 - 课程表 模块 - 课程列表 组件
**/
<template>
  <el-dialog :visible.sync="dialogTableVisible" @closed="closed" class="class-dialog" title="课程列表" width="960px">
    <!-- 课程列表 - 查询 -->
    <el-form :inline="true" :model="form" class="bor-bottom">
      <el-form-item label="区域">
        <select-region :area-id="baseAreaId" @change="handleAreaChange" v-model="form.areaId"></select-region>
      </el-form-item>

      <el-form-item label="年级">
        <el-select placeholder="" size="flat" v-model="form.grade">
          <el-option :key="item.baseKnowledgeId" :label="item.customName || item.name" :value="item.baseKnowledgeId" v-for="item in gradeOption"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学科" size="flat">
        <el-select placeholder="" v-model="form.subject">
          <el-option :key="item.baseKnowledgeId" :label="item.customName || item.name" :value="item.baseKnowledgeId" v-for="item in subjectOption"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 课程列表 -->
    <span class="table-pager"> {{ dataList.length }} </span>
    <el-table :data="dataList" header-row-class-name="table-header-default" row-class-name="table-body-default" stripe>
      <el-table-column label="区域" prop="areaName"></el-table-column>
      <el-table-column label="学校" prop="schoolName" width="198"></el-table-column>
      <el-table-column label="主讲教师" prop="realName" width="106"></el-table-column>
      <el-table-column label="年级" prop="classlevelName" width="82"></el-table-column>
      <el-table-column label="学科" prop="subjectName" width="88"></el-table-column>
      <el-table-column label="状态" width="88">
        <template slot-scope="scope">
          <span :status="scope.row.status" class="radius-status"></span>{{ scope.row.status === 'INIT' ? '未开始': scope.row.status === 'END' ? '已结束' : '进行中'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="88">
        <template slot-scope="scope">
          <span class="pointer" v-if="scope.row.status === 'PROCESS' || (scope.row.status === 'END' && scope.row.hasVideo)">播放</span>
          <span class="color-disable" v-else-if="scope.row.status === 'END'">播放</span>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { gradeData } from '@/api/personal/appMgt' // 年级
import SelectRegion from '@/components/common/SelectRegion/'

export default {
  name: 'ClassDialog',
  components: { SelectRegion },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      form: {
        grade: '', // 年级
        areaId: '', // 地区
        subject: '',
      },
      gradeOption: [], // 年级集合
      subjectOption: [], // 學科集合
      baseAreaId: 0,
      dialogTableVisible: false,
    }
  },
  created () {
    this.getGradeSubject()
  },
  mounted () {
  },
  watch: {
    visible () {
      this.dialogTableVisible = this.visible
    }
  },
  computed: {
    ...mapGetters(['userId', 'baseSchoolId']), // baseAreaId
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 区域切换 事件监听.
     **/
    handleAreaChange (e) {
      console.log('区域***', e)
      this.getGradeSubject('grade') // 年級學科
    },
    /**
     *@Description
     *@Param
     *@Return 年級、學科 - 查詢.
     **/
    getGradeSubject (type) {
      // console.log('form*****', this.form)
      const params = {
        areaId: this.form.areaId, // 区域ID
        schoolId: this.baseSchoolId, // 学校ID
      }
      if (type === 'grade') {
        params.gradeId = ''
        params.type = 'GRADE' // 年级：GRADE 学科：SUBJECT
      } else {
        params.type = 'SUBJECT' // 年级：GRADE 学科：SUBJECT
        params.gradeId = this.form.grade
      }
      gradeData(params).then(res => {
        if (type === 'grade') {
          this.gradeOption = res
          // console.log('年级查询*****', res)
        } else {
          this.subjectOption = res
          // console.log('学科查询*****', res)
        }
      })
    },
    /**
     * @description: 关闭dialog
     * @param arguments 描述
     * @returns {}
     */
    closed () {
      this.$emit('update:visible', false)
    },
    /**
     * @description: 播放直播会录播视频
     * @param ` 描述
     * @returns {}
     */
    play (data) {
      // TODO
    }
  }
}
</script>
<style lang="scss" scoped>
  .class-dialog {
    /* 条数 */
    .table-pager {
      margin-top: 19px;
    }
    /* 状态栏 样式区 */
    .radius-status {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 7px;
      border-radius: 50%;
      background-color: #40d688;
      &[status=INIT] {
        background-color: #ff9500;
      }
      &[status=END] {
        background-color: #bbb;
      }
    }
    /* 播放 */
    .pointer {
      cursor: pointer;
    }
    /* 表格无数据时 底色 */
    /deep/ .el-table__empty-block {
      background: #fff;
    }
  }
  .bor-bottom {
    border-bottom: 1px dashed #dcdcdc;
  }
</style>
