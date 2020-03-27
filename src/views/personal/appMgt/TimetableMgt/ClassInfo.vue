/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.11.06 14:22.
* @Author
* @Description 个人中心 - 应用管理 - 课表管理 - 移入td浮层 - 更多课程信息 弹窗
**/
<template>
  <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" append-to-body title="课程信息" width="690px">
    <div class="cl-info">
      <div class="cl-project fl">
        <h5>{{ speaker.gradeCustomName }}</h5><!-- 年级 -->
        <h5 class="mt5">{{ speaker.subjectCustomName }}<!-- 课程 -->
          <span class="no-start" v-show="speaker.status === 0"><i class="el-icon-custom-not-start"></i> 未开始</span>
          <span class="cl-ing" v-show="speaker.status === 1"><i class="el-icon-custom-ing"></i>进行中</span>
          <span class="no-end" v-show="speaker.status === 2"><i class="el-icon-custom-end"></i>已结束</span>
        </h5>
        <p>{{ speaker.masterTeacherName }}({{ speaker.masterTeacherMobile }})</p><!-- 老师 -->
        <p>{{ speaker.masterSchoolName }}</p><!-- 学校 -->
        <p>{{ speaker.masterRoomName }}</p><!-- 教室 -->
      </div>
      <ul class="cl-url fl">
        <li>
          <p>观摩地址：</p>
          <span>www.baidu.com</span>
          <el-button class="no-radius" size="mini" type="custom">复制</el-button>
        </li>
        <li>
          <p>验证码：</p>
          <span>www.baidu.com</span>
          <el-button class="no-radius" size="mini" type="custom">复制</el-button>
        </li>
        <li>
          <p>观摩口令：</p>
          <span>www.baidu.com</span>
          <el-button class="no-radius" size="mini" type="custom">复制</el-button>
        </li>
      </ul>
    </div>
    <!-- 课程状态 -->
    <div class="cl-status">
      <div v-show="speaker.status === 1">
        <p class="mb10">您好，该课程正在直播中！</p>
        <el-button class="no-radius" size="mini" type="custom">观看直播</el-button>
      </div>

      <p class="mb10" v-if="speaker.totalDuration === 0">无录制课程</p>
      <el-button class="no-radius" size="mini" type="custom" v-if="speaker.totalDuration > 0 && speaker.status === 2">观看课程</el-button>
    </div>
    <!-- 课程列表 - 参与方信息 -->
    <dl class="cl-class">
      <dt class="mb10">听讲教室 <span>{{ list.length }}</span> 间</dt>
      <dd :key="item.courseId" v-for="item in list">
        <h4>{{ item.schoolInfo.name }}</h4><!-- 学校 -->
        <p>{{ item.roomInfo.name }}</p><!-- 教室 -->
        <p>{{ item.teacherInfo.userName }}({{ item.teacherInfo.mobile }})</p><!-- 老师 -->
        <!--当主讲教室的课结束的时候 才展示-->
        <div class="pb10" v-if="speaker.status === 2">
          <p class="cl-driver">听课时长：<span>{{ item.onlineTotalTime | formatTime  }} </span></p>
          听课情况：<span>{{ getStatus(item) }}</span>
        </div>
      </dd>
    </dl>
    <p class="cl-information">说明：满45分钟为有效授课/有效听课</p>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import { participate } from '@/api/personal/appMgt' // 获取指定课程参与方信息
export default {
  name: 'floatLayer',
  props: ['dialogVisible', 'moreData'],
  data () {
    return {
      speaker: {
        courseId: '', // 课程ID
        status: 0, // 课程状态：0:未开始，1：进行中，2：已结束
        isvali: 1, // 是否有效：0：无效，1：有效，-1：未判定
        startTime: '', // 计划开始时间
        endTime: '', // 计划结束时间
        createAt: '', // 创建时间
        realStartTime: '', // 实际开始时间
        realEndTime: '', // 实际结束时间
        modeCount: 2, // 一拖几（接收教室数）
        lessonSeq: 3, // 节次
        selfDefine: 0, // 是否自主开课：0：否，1：是
        dayPeriod: '', // AM、PM
        crossDomainFlag: '', // 是否跨域：0：否，1;是
        totalDuration: '', // 视频总时长
        courseDate: '', // 课程日期 - 那一天
        attendeeType: 1, // 参与方类型 MASTER、RECEIVE
        subjectCustomName: '', // 自定义学科名称
        gradeCustomName: '', // 自定义年级名称
        masterTeacherHeadPic: '', // 课程对应的主讲参与方信息 - 主讲老师头像信息
        masterTeacherName: '', // 课程对应的主讲参与方信息 - 主讲老师名称
        masterRoomName: '', // 课程对应的主讲参与方信息 - 主讲教室名称
        masterSchoolName: '', // 课程对应的主讲参与方信息 - 主讲学校名称
        masterTeacherMobile: '', // 课程对应的主讲参与方信息 - 主讲老师手机
      },
      list: []
    }
  },
  watch: {
    moreData: function (newVal, oldVal) {
      this.speaker = newVal
      if (this.dialogVisible) {
        if (!this.areaId && !this.schoolId) {
          this.$message.warning('请选择区域或学校！')
          // this.handleClose()
          // return false
        } else {
        }
        this.getParticipate()
      }
    }
  },
  filters: {
    formatTime: function (ms) {
      const minutes = Math.round((ms % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.round((ms % (1000 * 60)) / 1000)
      return minutes + '分钟' + seconds + '秒'
    }
  },
  computed: {
    ...mapGetters(['userId', 'platformId', 'baseAreaId', 'baseSchoolId']),
  },
  created () {
  },
  methods: {
    /**
     *@Description 获取指定课程扩展信息 提交接口
     *@Param
     *@Return .
     **/
    getParticipate () {
      const params = {
        platformId: this.platformId, // 平台ID
        courseId: this.speaker.courseId, // 课程ID
        attendeeType: this.speaker.attendeeType, // 参与方类型(RECEIVE、MASTER)
      }
      participate(params).then(res => {
        this.list = res
        console.log('教室参与方信息***', res)
      })
    },
    /**
     *@Description
     *@Param
     *@Return 确定 - 取消 - 关闭 按钮.
     **/
    handleClose () {
      this.$emit('getDialog')
    },
    /**
     * @description: 方法说明
     * @param  循环当节课状态，并返回状态说明
     * @returns {}
     */
    getStatus (item) {
      if (item.isvalid === 1) {
        return '有效授课'
      } else if (item.isvalid === -1) {
        return '未上报'
      } else {
        return '无效授课'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  /* 年级学科 上半部分 */
  .cl-info {
    overflow: hidden;
    padding-bottom: 5px;
    border-bottom: 1px dashed #dcdcdc;
    .cl-project {
      width: 250px;
      h5 {
        font-size: 16px;
        font-weight: normal;
        color: #333;
        span {
          font-size: 14px;
          margin-left: 5px;
        }
        .no-start {
          color: #347eff;
        }
        .cl-ing {
          color: #00b24c;
        }
        .no-end {
          color: #3f474f;
        }
      }
      p {
        margin-top: 10px;
        color: #666;
      }
    }
    .cl-url {
      width: 370px;
      min-height: 110px;
      background: #f6f6f6;
      li {
        margin-bottom: 5px;
        > span {
          display: inline-block;
          max-width: 210px;
          color: #347eff;
        }
      }
      p {
        display: inline-block;
        width: 85px;
        text-align: right;
      }
    }
  }
  /* 当前课程状态 中部 */
  .cl-status {
    margin-bottom: 10px;
    padding: 20px 0;
    text-align: center;
    border-bottom: 1px dashed #dcdcdc;
  }
  /*  课程列表 下部份 */
  .cl-class {
    overflow: hidden;
    margin-right: -15px;
    dt span, dd span {
      color: #347eff;
    }
    dd {
      float: left;
      width: 175px;
      margin-right: 15px;
      margin-bottom: 15px;
      padding: 10px 10px 0 10px;
      border: 1px solid #dcdcdc;
      h4 {
        margin-bottom: 10px;
      }
      p {
        margin-bottom: 10px;
        color: #666;
      }
      .cl-driver {
        padding-top: 10px;
        border-top: 1px dashed #dcdcdc;
      }
    }
  }
  .cl-information {
    font-size: 12px;
    color: #999;
  }
</style>
