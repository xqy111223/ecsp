<template>
  <div class="student-class-info">
    <page-header></page-header>
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
            <p class="font-small"><span v-for="(i, index) in item.subjectInfo" :key="i.subjectId">{{(i.subjectCustomName?i.subjectCustomName:i.subjectName) + (index===item.subjectInfo.length-1?'':'、') }}</span>
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
          </div>
        </div>
      </div>
      <div class="block-control" @click="changeControl('student')" v-if="classMembers.studentInfo.length > 20">
        <i class="el-icon-caret-bottom" v-if="controlFlagS"></i>
        <i class="el-icon-caret-top" v-if="!controlFlagS"></i>
      </div>
    </div>
  </div>
</template>

<script>
/*
* Description index
* Created By xuqingyu
* Created At 2019/12/19 14:13
*/
import PageHeader from '@/components/personal/PageHeader/index'
import { getClassMembers, queryStudentClass } from '@/api/personal/classGroup'
import { mapGetters } from 'vuex'

export default {
  name: 'StudentClassInfo',
  props: {},
  components: { PageHeader },
  data () {
    return {
      controlFlagT: true,
      controlFlagS: true,
      classInfo: {},
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
  async created () {
    await this.initData()
  },
  mounted () {
    console.log('userId+++++++', this.userId)
    console.log('username+++++++', this.username)
    console.log('role+++++++', this.role)
    console.log('roleCode+++++++', this.roleCode)
  },
  methods: {
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
      if (this.role === 5) {
        this.classInfo = await queryStudentClass(params)
        if (this.classInfo && this.classInfo.schoolClassId) {
          params2.classId = this.classInfo.schoolClassId
          this.classMembers = await getClassMembers(params2)
        }
      }
      console.log('this.classInfo', this.classInfo)
      console.log('this.classMembers', this.classMembers)
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
