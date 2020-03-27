/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.11.13 14:40.
* @Author
* @Description  个人空间 - 应用管理 - 课表管理 - 课表浮层内容 - 公共组件使用
**/
<template>
  <!-- 课表浮层 信息 -->
  <div class="cl-main">
    <div :class="['class-info', getClassName(classData)]">
      听课教室：{{ classData.length }} 间
      <i class="el-icon-custom-cross-region" v-show="classData[lessonSeq].crossDomainFlag"></i>
      <span class="class-status" v-show="classData[lessonSeq].status === 0"><i class="el-icon-custom-not-start"></i>未开始</span>
      <span class="class-status" v-show="classData[lessonSeq].status === 1"><i class="el-icon-custom-ing"></i>进行中</span>
      <span class="class-status" v-show="classData[lessonSeq].status === 2"><i class="el-icon-custom-end"></i>已结束</span>
      <!-- 浮层节次切换 -->
      <div class="cl-center" v-if="classData.length > 1">
        <i :class="['el-icon-custom-left', {'visibility': lessonSeq === 0}]" @click="handleSectionClick('prev')"></i>
        <p>第{{ lessonSeq + 1 }}节</p>
        <i :class="['el-icon-custom-right', {'visibility': lessonSeq === classData.length - 1}]" @click="handleSectionClick('next')"></i>
      </div>
      <!-- 浮层标题 -->
      <h6 class="cl-title">{{ classData[lessonSeq].subjectCustomName }}</h6>
      <p class="cl-info"><i class="el-icon-custom-grade"></i> {{ classData[lessonSeq].gradeCustomName }}</p>
      <p class="cl-info"><i class="el-icon-custom-people"></i>
        {{ classData[lessonSeq].masterTeacherName }} ({{ classData[lessonSeq].masterTeacherMobile}})
      </p>
      <p class="cl-info"><i class="el-icon-custom-school"></i>
        {{ classData[lessonSeq].masterSchoolName }} {{ classData[lessonSeq].masterRoomName }}
      </p>
      <p @click="handleMoreClick" class="cl-more" v-show="noMore">更多课程信息</p>
    </div>
    <!-- 在空间课表中不展示noMore:false、在课表管理中展示 -->
    <div v-show="noMore">
      <div class="del-edit" v-if="edit">
        <el-button class="no-radius" size="mini" type="custom"> 编辑</el-button>
        <el-button @click="handleDelClick" class="no-radius" size="mini" type="custom" v-show="classData[lessonSeq].status === 2"> 删除</el-button>
      </div>
      <div v-else>
        <el-button class="cl-btn live" v-show="classData[lessonSeq].status === 1"><i class="el-icon-custom-watch-live"></i> 观看直播</el-button>
        <el-button class="cl-btn curse" v-show="classData[lessonSeq].totalDuration > 0 && classData[lessonSeq].status === 2">
          <i class="el-icon-custom-watch-curse"></i> 观看课程
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ClassInformation',
  props: ['classData', 'edit', 'noMore'],
  data () {
    return {
      status: 1, // 课程状态
      lessonSeq: 0, // 节次
    }
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 课表信息 浮层 - 节次切换信息.
     **/
    handleSectionClick (e) {
      if (e === 'prev') {
        this.lessonSeq--
      } else {
        this.lessonSeq++
      }
    },
    /**
     *@Description
     *@Param
     *@Return 课表信息 浮层 - 更多课程信息 事件监听.
     **/
    handleMoreClick () {
      this.$emit('getMore', this.classData[this.lessonSeq])
    },
    /**
     *@Description 删除按钮
     *@Param
     *@Return .
     **/
    handleDelClick () {
      this.$emit('getDelete', this.classData[this.lessonSeq])
    },
    /**
     * @description: 方法说明
     * @param  循环出 节次、当天的列，并赋上 class
     * @returns {}
     */
    getClassName (item) {
      if (Array.isArray(item)) {
        if (item[this.lessonSeq].status === 1) {
          return 'ing'
        } else if (item[this.lessonSeq].status === 2) {
          return 'end'
        } else {
          return 'not'
        }
      }
    },
  }
}
</script>
<style lang="scss" scoped>
  .cl-main {
    .class-info {
      overflow: hidden;
      padding: 12px;
      color: #fff;
      border-radius: 16px;
    }
    .not {
      background: linear-gradient(0deg, #00ccff 0%, #0066ff 100%), linear-gradient(#1b7dff, #1b7dff);
      background-blend-mode: normal, normal;
    }
    .ing {
      background-image: linear-gradient(-55deg, #37e18c 0%, #00a54e 100%), linear-gradient(#1b7dff, #1b7dff);
      background-blend-mode: normal, normal;
    }
    .end {
      background-image: linear-gradient(60deg, #3b434b 0%, #5c6977 100%), linear-gradient(#1b7dff, #1b7dff);
      background-blend-mode: normal, normal;
    }
    /* 课程状态 */
    .class-status {
      float: right;
      i {
        margin-right: 5px;
      }
    }
    /*节次切换*/
    .cl-center {
      margin: 15px 0;
      text-align: center;
      .visibility {
        visibility: hidden !important;
      }
      i {
        line-height: 28px;
        display: inline-block;
        width: 46px;
        height: 28px;
        cursor: pointer;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.2);
      }
      p {
        font-size: 12px;
        line-height: 28px;
        display: inline-block;
        width: 100px;
        height: 28px;
        margin: 0 5px;
        letter-spacing: 1px;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.2);
      }
    }
    /* 浮层标题 */
    .cl-title {
      font-size: 16px;
      font-weight: normal;
      margin-top: 15px;
    }
    /* 课程信息 */
    .cl-info {
      font-size: 12px;
      margin-top: 14px;
      i {
        opacity: 0.5;
      }
    }
    /* 更多课程信息 */
    .cl-more {
      margin: 20px 0 8px 0;
      cursor: pointer;
      text-align: center;
      text-decoration: underline;
    }
    /* 浮层操作按钮 */
    .cl-btn {
      line-height: 32px;
      display: block;
      width: 126px;
      height: 32px;
      margin: 20px auto;
      padding: 0;
      color: #fff;
      border: none;
      border-radius: 16px;
      i {
        margin-right: 8px;
      }
    }
    .live {
      background: #00b24c;
    }
    .curse {
      background: #3f474f;
    }
    /* 编辑删除 */
    .del-edit {
      margin: 20px 0;
      text-align: center;
    }
  }
</style>
