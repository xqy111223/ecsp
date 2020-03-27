/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.05 16:33.
* @Author
* @Description 个人空间 - 应用管理 - 实时轮训
**/
<template>
  <div class="real-time-training">
    <!-- 页头 -->
    <page-header></page-header>
    <!-- 查询区域 -->
    <div class="search-area">
      <el-form :inline="true" :model="form">

        <el-form-item label="区域：">
          <select-region @change="handleAreaChange" v-model="form.areaId"></select-region>
        </el-form-item>

        <el-form-item label="学校：">
          <el-select :loading="loading" :remote-method="remoteMethod" @change="handleSchoolChange" filterable placeholder="请输入关键词" remote size="flat" v-model="form.schoolId">
            <el-option :key="item.baseSchoolId" :value="item.schoolName" v-for="item in schoolOption">
              <span>{{ item.schoolName }}</span>
              <span class="ml10 fr">{{ item.areaName }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级：">
          <el-select @click="handleGradeChange" placeholder="请选择年级" size="flat" v-model="form.gradeId">
            <el-option :key="item.baseClassroomId" :label="item.roomName" :value="item.roomName" v-for="item in gradeOption"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学科：">
          <el-select placeholder="请选择学科" size="flat" v-model="form.subjectId">
            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in subjectOption"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上课模式：">
          <el-select placeholder="请选择" size="flat" v-model="form.modeCount">
            <el-option label="直播课程" value="0"></el-option>
            <el-option label="互动课堂一拖一" value="1"></el-option>
            <el-option label="互动课堂一拖二" value="2"></el-option>
            <el-option label="互动课堂一拖三" value="3"></el-option>
            <el-option label="互动课堂一拖四" value="4"></el-option>
            <el-option label="互动课堂一拖五及以上" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 轮训区域 -->
    <div :class="{'full-screen': fullActive}">
      <div class="table-total">
        <span class="mt15 fl">共<span class="color-primary">{{total}}</span>条视频</span>

        <el-pagination :current-page.sync="pager.index" :total="pager.total" class="pager-selected" layout="prev, slot, next">
          <template v-slot>
            <span class="text-wrap">{{`${pager.index}/${Math.ceil( pager.total / pager.size)}页`}}</span>
          </template>
        </el-pagination>

        <span class="fr">
          <span class="inline mt15">轮巡模式：
            <span v-show="round === '1'">自动轮巡<em class="color-primary">{{ timeInterval }}</em> 秒</span>
            <span v-show="round === '2'">手动轮巡</span>
          </span>
          <el-button @click="handleSetClick('round')" class="no-radius ml20" size="mini" type="custom">轮询设置</el-button>
          <el-button @click="handleSetClick('full')" class="no-radius ml20" size="mini" type="custom">{{ fullActive ? '取消全屏' : '全屏' }}</el-button>
        </span>
      </div>
      <!-- 课程列表区域 -->
      <ul class="card-list">
        <li :key="item.courseId" v-for="item in list">
          <span class="cl-drag">一拖{{ item.modeCount }}</span>
          <img :src="item.coverUrl">
          <transition name="fade">
            <div class="cl-info">
              <span class="fl">{{ item.masterSchoolName }}{{ item.liveTempCoverUrl}}</span>
              <span class="fr">{{ item.gradeBaseName }}-{{ item.courseName }}年级-学科</span>
              <p>{{ item.masterAreaNamePath }}</p>
            </div>
          </transition>
        </li>
      </ul>
    </div>
    <!-- 轮巡设置弹窗 -->
    <el-dialog :visible.sync="dialogVisible" title="轮巡设置" width="350px">
      <p>轮巡模式：
        <el-radio @change="handleRoundChange" label="1" v-model="round">自动轮巡</el-radio>
        <el-radio @change="handleRoundChange" label="2" v-model="round">手动轮巡</el-radio>
      </p>
      <p>间隔时间：
        <el-input class="w50" placeholder="请输入内容" v-model="timeInterval"></el-input>
        <span class="c9">最小值5，最大值120</span>
      </p>
      <span class="dialog-footer" slot="footer">
        <el-button @click="visible = false" size="mini" type="info">取 消</el-button>
        <el-button @click="handleDetermineClick" size="mini" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import PageHeader from '@/components/personal/PageHeader/' // 页头
import SelectRegion from '@/components/common/SelectRegion/' // 区域组件
import { courseCover, courseMgt, getSchoolData, gradeData } from '@/api/personal/appMgt'
// 获取学校、获取教室\节次-区域级别、上课时间数据-教室级别、课表数据

export default {
  name: 'RealTimeTraining',
  props: {},
  components: { PageHeader, SelectRegion },
  data () {
    return {
      list: [], // 课程数据
      total: 0,
      round: '1', // 轮巡方式
      form: { // 查询数据
        areaId: '',
        gradeId: '',
        schoolId: '',
        subjectId: '',
        modeCount: '',
      },
      loading: false, // 学校远程搜索
      gradeOption: [], // 年级数据
      schoolOption: [], // 学校数据
      subjectOption: [], // 学科数据
      timeInterval: 20, // 时间间隔
      fullActive: false, // 轮训区域 - 全屏
      dialogVisible: false, // 轮巡设置
      pager: { // 轮训使用的分页参数
        total: 84,
        index: 1,
        size: 10
      },
    }
  },
  created () {
    this.getCourseMgt()
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 课程管理 - 数据获取.
     **/
    getCourseMgt () {
      const params = {}
      courseMgt(params).then(res => {
        this.list = res.list
        this.total = res.total
        courseCover() // 删除
        setInterval(function () {
          res.list.forEach((val, index) => {
            val.liveTempCoverUrl = index
            // courseCover(val.liveTempCoverUrl).then(result => {
            //   console.log('封面地址result', result)
            // })
            console.log(val.liveTempCoverUrl)
          })
        }, 10000)

        // liveTempCoverUrl  直播课程封面下载地址
        console.log('课程管理****', res)
      })
    },
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 区域事件监听.
     **/
    handleAreaChange () {
      this.schoolData()
    },
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 获取学校.
     **/
    schoolData (name) {
      const params = {
        baseAreaId: this.form.areaId,
        baseSchoolId: '',
        directOnly: false, // 直属校
        platformOnly: false,
        schoolName: name
      }
      getSchoolData(params).then(res => {
        console.log('mock数据***', res)
        this.schoolOption = res.list
      })
    },
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 学校远程搜索函数.
     **/
    remoteMethod (query) {
      if (query.trim().length === 2 && this.schoolName.indexOf(query) > 0) {
        return false
      }
      if (query.trim().length > 1) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.schoolData(query)
        }, 200)
      } else {
        this.schoolOption = []
      }
    },
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 学校事件监听.
     **/
    handleSchoolChange (e) {
      console.log('实时轮训 - schoolId****', e)
    },
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 获取年级.
     **/
    getGradeData () {
      gradeData().then(res => {
        this.gradeOption = res
      })
    },
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 年级数据改变时触发学科查询.
     **/
    handleGradeChange () {
      this.getSubjectData()
    },
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 获取学科.
     **/
    getSubjectData () {
      // console.log('学科查询*****')
    },

    /**
     *@Description
     *@Param
     *@Return 轮训设置、全屏 - 按钮事件监听.
     **/
    handleSetClick (type) {
      if (type === 'round') { // 轮序设置
        this.dialogVisible = true
      } else { // 全屏
        this.fullActive = !this.fullActive
        console.log(this.fullActive)
      }
    },
    /**
     *@Description
     *@Param
     *@Return 轮训设置 - 轮训方式切换.
     **/
    handleRoundChange (e) {
      if (e === '1') {
        this.timeInterval = 20
      }
    },
    /**
     *@Description
     *@Param
     *@Return 轮训设置 - 输入框事件监听.
     **/
    handleDetermineClick () {
      if (this.timeInterval < 5 || this.timeInterval > 120) {
        this.timeInterval = 20
        this.$message.warning('时间间隔在5到120秒之间！')
        return false
      }
      this.dialogVisible = false
    },

    /**
     * @description: 点击分页切换查询行数
     * @param arguments 描述
     * @returns {}
     */
    handleSizeChange (val) {

    },
    /**
     * @description: 点击分页查询按钮
     * @param arguments 描述
     * @returns {}
     */
    handleCurrentChange (val) {

    }
  }
}
</script>
<style lang="scss" scoped>
  @import "index";
</style>
