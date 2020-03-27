/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2020.01.07 11:55.
* @Author
* @Description 首页 门户banner - 右侧地图 数据展示 - 组件
**/
<template>
  <div class="map-data-container">
    <el-row>
      <!-- 区域名称 -->
      <el-col :span="24" class="center big-title">
        <div class="grid-content">{{ this.mapDataInfo.areaName }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="center">
        <div class="grid-content btn-title">总课程开设情况</div>
      </el-col>
    </el-row>
    <el-row class="data-item">
      <el-col :span="14">
        <div class="grid-content ml-70">主讲课时数<span class="data-count" v-if="this.mapDataInfo.totalHour">{{ this.mapDataInfo.totalHour[0].speaker }}</span>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content">听讲课时数<span class="data-count" v-if="this.mapDataInfo.totalHour">{{ this.mapDataInfo.totalHour[0].listener }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="center">
        <div class="grid-content btn-title">本学期课程开设情况</div>
      </el-col>
    </el-row>
    <el-row class="data-item">
      <el-col :span="14">
        <div class="grid-content ml-70">计划课时数<span class="data-count" v-if="this.mapDataInfo.thisTerm">{{ this.mapDataInfo.thisTerm[0].planCount }}</span>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content">主讲教师数<span class="data-count" v-if="this.mapDataInfo.thisTerm">{{ this.mapDataInfo.thisTerm[0].realCount }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="data-item">
      <el-col :span="14">
        <div class="grid-content ml-70">实开课时数<span class="data-count" v-if="this.mapDataInfo.thisTerm">{{ this.mapDataInfo.thisTerm[0].speakerTeacher }}</span>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content">受益学生数<span class="data-count" v-if="this.mapDataInfo.thisTerm">{{ this.mapDataInfo.thisTerm[0].listenStudents }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="center">
        <div class="grid-content btn-title">本周课程开设情况</div>
      </el-col>
    </el-row>
    <el-row class="data-item">
      <el-col :span="14">
        <div class="grid-content ml-70">计划课时数<span class="data-count" v-if="this.mapDataInfo.thisWeek">{{ this.mapDataInfo.thisWeek[0].planCount }}</span>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content">主讲教师数<span class="data-count" v-if="this.mapDataInfo.thisWeek">{{ this.mapDataInfo.thisWeek[0].realCount }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row class="data-item">
      <el-col :span="14">
        <div class="grid-content ml-70">实开课时数<span class="data-count" v-if="this.mapDataInfo.thisWeek">{{ this.mapDataInfo.thisWeek[0].speakerTeacher }}</span>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content">受益学生数<span class="data-count" v-if="this.mapDataInfo.thisWeek">{{ this.mapDataInfo.thisWeek[0].listenStudents }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//  import { mapGetters, mapActions } from 'vuex'
// import { getMapData } from '@/api/onlineclass/portal'
export default {
  name: 'MapData',
  props: ['mapDataInfo'],
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  .map-data-container {
    font-size: 12px;
    height: 460px;
    margin-top: 10px;
    background-color: #1451E1;

    .ml-70 {
      margin-left: 70px;
    }

    .center {
      text-align: center;
    }

    .data-count {
      font-size: 24px;
      margin-left: 20px;
      color: rgba(255, 255, 255, 1)
    }

    .data-item {
      margin-top: 16px;
      margin-bottom: 10px;
      color: rgba(255, 255, 255, 0.6)
    }

    .big-title {
      font-family: "Adobe 黑体 Std R";
      font-size: 20px;
      font-weight: bold;
      line-height: 50px;
      height: 50px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    .btn-title {
      line-height: 30px;
      display: inline-block;
      width: 180px;
      height: 30px;
      margin-top: 16px;
      border-radius: 15px;
      background-color: #124BC5;
    }
  }
</style>
