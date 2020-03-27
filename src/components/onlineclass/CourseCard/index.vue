/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.26 10:24.
* @Author
* @Description 个人空间 - 首页 - 课程点播 - 课程信息卡 组件
**/
<template>
  <div class="course-card">
    <!-- 课程封面 -->
    <div class="header">
      <span class="font-small">{{ subjectName }}</span>
      <img :src="coverUrl" @error="loadError" ref="headPic">
    </div>
    <!-- 课程信息 -->
    <div class="content font-small color-label">
      <div class="title color-normal">{{ title }}</div>
      <!-- 老师 年级 -->
      <div class="course-tea"><span>{{ teacherName }}</span> <span>{{ classLevelName }}</span></div>
      <!-- 时间 -->
      <div class="course-time">
        <span>{{ startTime }}</span>
        <span class="ml20"><i class="el-icon-custom-play-time"></i>{{ time }}</span>
        <!-- 预览 -->
        <span class="ml20 inline-block"><i class="el-icon-custom-play-number"></i>{{ videoViewCount }} </span>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import defaultImg from '@/assets/images/course_default.png'

export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      default: null
    }
  },
  data () {
    return {}
  },
  computed: {
    /**
     *@Description
     *@Param
     *@Return 课程点播 - 课程名称.
     **/
    subjectName () {
      return this.course && this.course.courseName
    },
    /**
     *@Description
     *@Param
     *@Return 课程点播 - 课程封面.
     **/
    coverUrl () {
      return this.course && this.course.coverUrl
    },
    /**
     *@Description
     *@Param
     *@Return 课程点播 - 课程标题.
     **/
    title () {
      return this.course && this.course.subjectCustomName
    },
    /**
     *@Description
     *@Param
     *@Return 课程点播 - 课程 - 主讲老师姓名.
     **/
    teacherName () {
      return this.course && this.course.masterTeacherName
    },
    /**
     *@Description
     *@Param
     *@Return 课程点播 - 课程 - 年级.
     **/
    classLevelName () {
      return this.course && this.course.gradeCustomName
    },
    /**
     *@Description
     *@Param
     *@Return 课程点播 - 课程 - 实际开课时间.
     **/
    startTime () {
      return this.course && dayjs(this.course.realStartTime).format('YYYY-MM-DD')
    },
    /**
     *@Description
     *@Param
     *@Return 课程点播 - 课程 - 视屏总时长.
     **/
    time () {
      return this.course && this.secondsFormat(this.course.totalDuration)
    },
    /**
     *@Description
     *@Param
     *@Return 课程点播 - 课程 - 视频预览人数.
     **/
    videoViewCount () {
      return this.course && this.course.videoViewCount
    }
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 数字转时分秒.
     **/
    secondsFormat (sec) {
      let hour = Math.floor(sec / 3600)
      let minute = Math.floor((sec - hour * 3600) / 60)
      let second = sec - hour * 3600 - minute * 60
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      return hour + ':' + minute + ':' + second
    },
    /**
     *@Description
     *@Param
     *@Return 课程点播 - 课程 - 封面加载错误时候 使用默认图片.
     **/
    loadError () {
      this.$refs.headPic.src = defaultImg
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  // 课程信息卡 组件
  .course-card {
    position: relative;
    overflow: hidden;
    width: 273px;
    height: 260px;
    cursor: pointer;
    transition: all .24s ease-in-out;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    &:hover {
      transform: translateY(-10px)
    }
    // 课程封面区域
    > .header {
      height: 154px;
      background: #ddd;
      // 课程标题
      > span {
        line-height: 20px;
        position: absolute;
        top: 8px;
        left: 8px;
        padding: 0 8px;
        text-align: center;
        color: #fff;
        border-radius: 20px;
        background: rgba(0, 0, 0, 0.4);
      }
      // 课程封面
      > img {
        width: 100%;
        height: 100%;
      }
    }
    // 课程信息
    > .content {
      box-sizing: border-box;
      width: 100%;
      height: 106px;
      padding: 16px 16px 22px 16px;
      .title {
        font-size: 16px;
      }
      // 老师、年级
      .course-tea {
        margin: 15px 0px;
        span {
          margin-right: 15px;
        }
      }
      // 时间、预览
      .course-time {
        i {
          margin-right: 5px;
        }
      }
    }
    .ml20 {
      margin-left: 20px;
    }
  }
</style>
