/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.30 16:16.
* @Author
* @Description 个人空间 - 首页 - banner区域 组件
**/
<template>
  <header class="space-header">
    <div class="content">
      <!-- 头像 -->
      <el-avatar :size="62" :src="circleUrl" class="fl-avatar"></el-avatar>
      <!-- 个人信息 - 老师角色 -->
      <div class="role-wrap" v-if="this.roleCode === 'TEACHER'">
        <div class="space-info">
          <span class="name">宋大兵</span>
          <span class="badge">数学</span>
          <span class="badge">语文</span>
          <router-link to="/app_mgt/course_mgt_teacher"><span class="mini-btn">空间管理</span></router-link>
        </div>
        <!-- 学校班级 信息 -->
        <div class="space-info ellipsis mt5">
          <span class="ft16">阔地第一中心小学</span>
          <span class="ft14 ml30">三年级（1）班、三年级（2）班,三年级（1）班、三年级（2）班,三年级（1）班、三年级（2）班</span>
        </div>
      </div>
      <!-- 开课统计 信息 - 老师角色 -->
      <div class="count" v-if="this.roleCode === 'TEACHER'">
        <p>计划课时数<span class="fr">248</span></p>
        <p>实开课时数<span class="fr">458</span></p>
        <p>实开课时占比<span class="fr">76%</span></p>
      </div>
      <!-- 个人信息 - 家长角色 -->
      <div class="role-wrap role-family" v-if="this.roleCode === 'FAMILY'">
        <div class="mt5 fl">
          <span class="name">宋大兵家长</span>
          <router-link to="/class_group/class_info"><span class="mini-btn">空间管理</span></router-link>
        </div>
        <ul class="fa-children fl">
          <li class="selected">
            <p class="ft16">宋大兵</p>
            <p class="stu-class ft14">三年级（1）班</p>
          </li>
          <li>
            <p class="ft16">宋小兵</p>
            <p class="stu-class ft14">一年级（1）班</p>
          </li>
        </ul>
      </div>
      <!-- 个人信息 - 学生角色 -->
      <div class="role-wrap" v-if="this.roleCode === 'STUDENT'">
        <div class="space-info">
          <span class="name">宋大兵</span>
          <span class="badge">学生</span>
          <router-link to="/class_group/student_class_info"><span class="mini-btn">空间管理</span></router-link>
        </div>
        <div class="ellipsis mt5">
          <span class="ft16">阔地第一中心小学</span>
          <span class="ft14 ml30">三年级（1）班</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SpaceHeader',
  props: {},
  data () {
    return {
      circleUrl: require('@/assets/images/000.png'),
      // roleCode: 'TEACHER' // TEACHER、 FAMILY、 STUDENT
    }
  },
  computed: {
    ...mapGetters(['roleCode']) // 用户code
  },

  created () {
    this.printcode()
  },
  methods: {
    printcode () {
      console.log('this.roleCode', this.roleCode)
    }
  }
}
</script>

<style lang="scss" scoped>
  .mt5 {
    margin-top: 5px;
  }
  .ft14 {
    font-size: 14px;
  }
  .ft16 {
    font-size: 16px;
  }
  .ml30 {
    margin-left: 30px;
  }
  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: keep-all;
  }
  .space-header {
    overflow: hidden;
    background: url('~@/assets/images/header_bg.jpg') 0 0 no-repeat;
    .content {
      width: 1200px;
      margin: auto;
      color: #fff;
    }
    /* 头像 */
    .fl-avatar {
      float: left;
      margin-top: 36px;
      border: 2px solid #fff;
    }
    /* 个人信息 */
    .role-wrap {
      line-height: 20px;
      float: left;
      width: 450px;
      height: 97px;
      margin-top: 38px;
      margin-left: 20px;
      /* 个人、学校班级 信息 */
      /* 姓名 */
      .name {
        font-size: 24px;
        font-weight: bold;
      }
      /* 学科 */
      .badge {
        display: inline-block;
        height: 20px;
        margin: -4px 0px 3px 10px;
        //color:$primary-color;
        //color:var(--primary-color);
        padding: 0px 6px;
        vertical-align: middle;
        color: #3981ff;
        border-radius: 10px;
        background: #fff;
      }
      /* 空间跳转 按钮 */
      .mini-btn {
        display: inline-block;
        width: 80px;
        height: 20px;
        margin: 3px 0px 3px 30px;
        text-align: center;
        color: #fff;
        border: 1px solid #fff;
        outline: none;
        background: rgba(255, 255, 255, 0.1);
      }
      .mini-btn:hover {
        text-decoration: underline;
      }
    }
    /* 开课统计 信息 */
    .count {
      line-height: 30px;
      float: right;
      min-width: 150px;
      margin-top: 25px;
      color: #fff600;
    }
    /* 家长角色 信息 */
    .role-family {
      width: 1100px;
      height: 80px;
      margin-top: 50px;
      .fa-children {
        li {
          float: left;
          height: 80px;
          margin-left: 60px;
          .stu-class {
            padding: 8px 0;
          }
        }
      }
      .selected {
        font-weight: bold;
        position: relative;
        .stu-class {
          border-bottom: 2px solid #fff;
        }
        /* 选中角色 三角标识符 */
        ::before {
          position: absolute;
          bottom: 0px;
          left: 50%;
          width: 0;
          height: 0;
          margin-left: -6px;
          content: '';
          border: 6px solid #fff;
          border-color: transparent transparent #fff transparent;
        }
      }
    }
  }
</style>
