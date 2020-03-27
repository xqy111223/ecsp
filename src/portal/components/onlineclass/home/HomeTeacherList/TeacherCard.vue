/**
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2020.01.06 14:41.
* @Author
* @Description TeacherCard
* Created By yinmeng@codyy.com
* Created At 2019/10/8 17:10
*/
<template>
  <div class="teacher-card">
    <div class="photo">
      <img :src="teacher.headPicUrl" @error="loadError">
    </div>
    <div class="info">
      <!-- 老师姓名 -->
      <div class="driver">{{ teacher.userName }}</div>

      <div class="font-small">{{ teacher.schoolName }}</div>

      <div v-if="teacher.headerSubjectInfo">
        <div :key="index" class="font-small" v-for="(val, index) in teacher.headerSubjectInfo">
          <span v-if="index < 2">{{ val.gradeCustomName || val.gradeName }}&nbsp; {{ val.subjectCustomName || val.subjectName }}</span>
          <span v-else-if="index === 2">...</span>
        </div>
      </div>
    </div>
    <div class="name color-normal">{{ teacher.userName }}</div>
    <div class="mini-logo">
      <img :src="teacher.headPicUrl" @error="loadError">
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherCard',
  props: {
    teacher: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      defaultPic: require('@/assets/images/000.png')
    }
  },
  methods: {
    loadError (evt) {
      evt.target.src = this.defaultPic
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "&/default/var.scss";

  .teacher-card {
    position: relative;
    overflow: hidden;
    width: 180px;
    height: 210px;
    cursor: pointer;
    border-radius: 5px;

    .photo {
      width: 180px;
      height: 180px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }

    .info {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 180px;
      height: 180px;
      transition: .15s;
      text-align: center;
      opacity: 0;
      color: white;
      border-radius: 5px;

      background-color: $primary-color;
      background-color: var(--primary-color);
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
      .font-small {
        line-height: 20px;
      }
      .driver {
        font-size: 16px;
        width: 160px;
        margin: 10px auto;
        padding: 10px 0;
        border-bottom: 1px solid #fff;
      }
    }

    &:hover {
      .mini-logo {
        bottom: 0px;
      }
      .name {
        display: none;
      }
      .info {
        opacity: 1;
      }
    }
    .name {
      margin-top: 9px;
      transition: .15s;
      text-align: center;
    }

    .mini-logo {
      position: absolute;
      bottom: -58px;
      left: 50%;
      overflow: hidden;
      box-sizing: border-box;
      width: 58px;
      height: 58px;
      margin-left: -29px;
      transition: .15s;
      border: 2px solid #fff;
      border-radius: 50%;
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
