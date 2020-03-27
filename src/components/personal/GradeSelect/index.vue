/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.19 09:03.
* @Author
* @Description 个人空间 - 年级 选项组件
**/
<template>
  <el-select @change="handleGradeChange" placeholder="请选择年级" v-model="grade">
    <el-option :key="item.baseClassroomId" :label="item.roomName" :value="item.roomName" v-for="item in gradeOption"></el-option>
  </el-select>
</template>

<script>
import { mapGetters } from 'vuex'
import { gradeData } from '@/api/personal/appMgt' // 年级

export default {
  name: 'GradeSelect',
  props: [],
  data () {
    return {
      grade: '',
      gradeOption: []
    }
  },
  computed: {
    ...mapGetters(['platformType'])
  },
  watch: {},
  methods: {
    /**
     *@Description
     *@Param
     *@Return 年级 数据获取.
     **/
    getGradeData (data) {
      console.log(data)
      const params = {
        areaId: '', // 区域ID: areaId与schoolId不允许都为空；若都不为空，则优先查schoolId
        schoolId: '', // 学校ID
        types: 'GRADE', // 知识网络类型:学段：SEMESTER、 年级：GRADE、 学科：SUBJECT、 版本：EDITION、 分册：VOLUME、 知识点:POINT
      }
      gradeData(params).then(res => {
        console.log('年级数据组件*****', res)
      })
    },
    /**
     *@Description
     *@Param
     *@Return 年级 change 事件监听.
     **/
    handleGradeChange (e) {
      console.log('年级*****', e)
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
