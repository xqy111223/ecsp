<template>
  <div class="class-info">
    <page-header></page-header>
    <el-tabs class="title-tabs" v-model="activeName" type="card" v-if="classInfo" @tab-click="handleClick">
      <el-tab-pane v-for="item in classInfo" :key="item.schoolClassId" :label="nameClass(item)"
                   :name="item.schoolClassId +''">
        <div class="person-type">
          <p class="font-normal type-title">班主任</p>
          <div class="person-card">
            <div class="block">
              <el-avatar shape="circle" :size="60" fit="fill"
                         :src="classMembers.headTeacherInfo[0].headPicUrl"></el-avatar>
              <div class="detail">
                <p class="font-normal" :title="classMembers.headTeacherInfo[0].userName">{{
                  classMembers.headTeacherInfo[0].userName }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="person-type">
          <p class="font-normal type-title">任课教师（{{classMembers.teachTeacherInfo.length}}人）</p>
          <div :class="{'person-card':true,'teacher-list':true,'auto':!controlFlagT}">
            <div class="block" v-for="item in classMembers.teachTeacherInfo" :key="item.baseUserId">
              <el-avatar shape="circle" :size="60" fit="fill" :src="item.headPicUrl"></el-avatar>
              <div class="detail">
                <p class="font-normal" :title="item.userName">{{ item.userName }}</p>
                <p class="font-small color-label">
                  <span v-for="(i, index) in item.subjectInfo" :key="i.subjectId">{{(i.subjectCustomName?i.subjectCustomName:i.subjectName) + (index===item.subjectInfo.length-1?'':'、') }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="block-control" @click="changeControl('teacher')" v-if="classMembers.teachTeacherInfo.length > 10">
            <i class="el-icon-caret-bottom" v-if="controlFlagT"></i>
            <i class="el-icon-caret-top" v-if="!controlFlagT"></i>
          </div>
        </div>
        <div class="person-type">
          <p class="font-normal type-title">学生（{{classMembers.studentInfo.length}}人）</p>
          <div :class="{'person-card':true,'auto':!controlFlagS}">
            <div class="block" v-for="item in classMembers.studentInfo" :key="item.baseUserId">
              <el-avatar shape="circle" :size="60" fit="fill" :src="item.headPicUrl"></el-avatar>
              <div class="detail">
                <p class="font-normal" :title="item.userName">{{ item.userName }}</p>
                <p class="font-small color-label">家长：<span :title="item.parentName">{{ item.parentName }}</span></p>
              </div>
            </div>
          </div>
          <div class="block-control" @click="changeControl('student')" v-if="classMembers.studentInfo.length > 20">
            <i class="el-icon-caret-bottom" v-if="controlFlagS"></i>
            <i class="el-icon-caret-top" v-if="!controlFlagS"></i>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/*
* Description index
* Created By Chasen (caoxin@codyy.com))
* Created At 2019/10/11 14:17
*/
import PageHeader from '@/components/personal/PageHeader/index'
import { getClassMembers, queryChildrenClass, queryTeacherClass } from '@/api/personal/classGroup'
import { mapGetters } from 'vuex'

export default {
  name: 'classInfo',
  props: {},
  components: { PageHeader },
  data () {
    return {
      controlFlagS: true,
      controlFlagT: true,
      classInfo: [],
      classMembers: {
        headTeacherInfo: [
          {
            baseUserId: '@id',
            headPicUrl: '@url',
            loginName: '@name',
            userName: '@cname'
          }
        ],
        studentInfo: [
          {
            baseUserId: '@id',
            headPicUrl: '@url',
            loginName: '@name',
            userName: '@cname',
            parentId: '@id',
            parentLoginName: '@name',
            parentName: '@cname',
          }
        ],
        teachTeacherInfo: [
          {
            baseUserId: '@id',
            headPicUrl: '@url',
            loginName: '@name',
            userName: '@cname',
            subjectInfo: [
              {
                subjectCustomName: '@word',
                subjectId: '@id',
                subjectName: '@cname'
              }
            ]
          }
        ]
      },
      activeName: null,
    }
  },
  computed: {
    ...mapGetters([
      'userId', // 用户id
      'username', // 用户姓名
      'role', // 角色类型
      'roleCode', // 角色类型
    ])
  },
  created () {
    this.initData()
  },
  mounted () {
    console.log('userId+++++++', this.userId)
    console.log('username+++++++', this.username)
    console.log('role+++++++', this.role)
    console.log('roleCode+++++++', this.roleCode)
  },
  methods: {
    /**
     * @description: 处理tab标签name,年级+班级
     * @param item 描述
     * @returns {}
     */
    nameClass (item) {
      if (this.role === 3) {
        return (item.gradeCustomName ? item.gradeCustomName : item.gradeName) + item.className
      } else if (this.role === 4) {
        return item.userName
      }
    },
    /**
     * @description: 初始化班级数据
     * @param arguments 描述
     * @returns {}
     */
    async initData () {
      const params = {
        userId: this.userId
      }
      const params2 = {}
      if (this.role === 3) {
        this.classInfo = await queryTeacherClass(params)
        if (this.classInfo && this.classInfo[0].schoolClassId) {
          params2.classId = this.classInfo[0].schoolClassId
          this.activeName = this.classInfo[0].schoolClassId + ''
          this.classMembers = await getClassMembers(params2)
        }
      } else if (this.role === 4) {
        this.classInfo = await queryChildrenClass(params)
        if (this.classInfo && this.classInfo[0].schoolClassId) {
          params2.classId = this.classInfo[0].schoolClassId
          this.activeName = this.classInfo[0].schoolClassId + ''
          this.classMembers = await getClassMembers(params2)
        }
      }
      console.log('this.classInfo', this.classInfo)
      console.log('this.classMembers', this.classMembers)
    },
    /**
     * @description: 点击tab切换班级
     * @param tab 描述
     * @returns {}
     */
    async handleClick (tab) {
      // console.log('tab.name', tab.name)
      const params = {
        classId: tab.name
      }
      this.classMembers = await getClassMembers(params)
      console.log('点击tab-this.classMembers', this.classMembers)
    },
    /**
     * @description: 点击切换学生区域展示更多
     * @param arguments 描述
     * @returns {}
     */
    changeControl (val) {
      if (val === 'teacher') {
        this.controlFlagT = !this.controlFlagT
      } else if (val === 'student') {
        this.controlFlagS = !this.controlFlagS
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./css.scss";
</style>
