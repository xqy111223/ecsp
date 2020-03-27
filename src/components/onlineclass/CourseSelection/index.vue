<template>
  <!-- 课程中心-课程筛选 -->
  <div class="course-selection">
    <div class="course-selection__container">
      <div class="course-selection__title font-normal">
        <slot></slot>
      </div>
      <div class="course-selection__filter">
        <el-form :rel="form" v-model="form" label-width="95px" @submit.native.prevent>
          <div class="item">
            <el-form-item label="年级：">
              <check-button :options="classLevelData" :value.sync="value.classId" :is-all="true"
                            @change="change"></check-button>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="学科：">
              <check-button :options="subjectData" :value.sync="value.subjectId" :is-all="true"
                            @change="change"></check-button>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="上课模式：">
              <check-button :options="liveModeData" :value.sync="value.liveMode" :is-all="true"
                            @change="change"></check-button>
            </el-form-item>
          </div>
          <div class="no-hover">
            <el-form-item label="关键词：">
              <el-input placeholder="行政区、学校、主讲教师、课程名称、知识点，至少2个字" v-model="keyword" @change="searchText"
                        suffix-icon="el-icon-search"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="cy-driver"></div>
        <div class="course-selection_choice">
          <el-form :rel="form" v-model="form" label-width="95px">
            <el-form-item label="已选择：">
              <span class="tag font-small color-label" v-for="item in selectedFilter" :key="'filter_'+ item.id"
                    @click="deleteFilter(item)">{{item.label}} <i class="el-icon-close"></i></span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { getClassLevelData, getSubjectData } from '@/api/common/index'
import CheckButton from './CheckButton/index'

export default {
  name: 'CourseSelection',
  components: { CheckButton },
  props: {
    subjectId: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      form: {},
      classLevelData: [],
      subjectData: [],
      liveModeData: [],
      keyword: '',
      value: {
        classId: '',
        subjectId: '',
        liveMode: '',
        text: ''
      },
      selectedFilter: []
    }
  },
  computed: {
    ...mapGetters(['baseAreaId', 'baseSchoolId'])
  },
  watch: {
    subjectId: {
      handler () {
        this.value.subjectId = this.subjectId
      },
      immediate: true
    },
    value: {
      deep: true,
      handler () {
        // 出发外层事件，将查询条件传出
        this.$emit('change', this.value)
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.getClassLevelData()
      this.getSubjectData()
      this.getLiveMode()
    },
    async getClassLevelData () {
      const result = await getClassLevelData(this.baseAreaId, this.clsSchoolId)
      return result
      // this.classLevelData = result && result.map(r => {
      //   return { id: r.baseClasslevelId, label: r.classlevelName, type: 'class' }
      // })
    },
    async getSubjectData () {
      const result = await getSubjectData()
      this.subjectData = result.map(r => {
        return { id: r.baseSubjectId, label: r.subjectName, type: 'subject' }
      })
      if (this.value.subjectId) {
        this.selectedFilter.push(this.subjectData.filter(r => r.id === this.value.subjectId)[0])
      }
    },
    getLiveMode () {
      this.liveModeData = [
        { id: 'LIVE', label: '直播课程', type: 'mode' },
        { id: 'INT_ONE', label: '互动课一拖一', type: 'mode' },
        { id: 'INT_TWO', label: '互动课一拖二', type: 'mode' },
        { id: 'INT_THREE', label: '互动课一拖三', type: 'mode' },
        { id: 'INT_FOUR', label: '互动课一拖四', type: 'mode' },
        { id: 'INT_FIVE', label: '互动课一拖五以上', type: 'mode' },
      ]
    },
    searchText () {
      // 查询关键字
      this.value.text = this.keyword
      if (!this.value.text || this.selectedFilter.some(s => s.type === 'keyword')) {
        // 移除文字
        this.selectedFilter.splice(this.selectedFilter.map(s => s.type).indexOf('keyword'), 1)
      }
      this.value.text && this.selectedFilter.push({ label: this.keyword, type: 'keyword' })
    },
    change (item) {
      if (item.id === null || this.selectedFilter.some(s => s.type === item.type)) {
        // 删除选项
        this.selectedFilter.splice(this.selectedFilter.map(s => s.type).indexOf(item.type), 1)
      }
      item.id && this.selectedFilter.push(item)
    },
    deleteFilter (item) {
      this.selectedFilter.splice(this.selectedFilter.map(s => s.type).indexOf(item.type), 1)
      // 删除实际选中值
      if (item.type === 'keyword') {
        this.keyword = this.value.text = ''
      } else if (item.type === 'mode') {
        this.value.liveMode = ''
      } else if (item.type === 'class') {
        this.value.classId = ''
      } else if (item.type === 'subject') {
        this.value.subjectId = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "index.scss";

</style>
<style lang="scss">
  .course-selection {
    .el-input__inner {
      height: 32px !important;
      line-height: 32px !important;
    }

    .el-input__icon {
      line-height: 32px;
    }
  }
</style>
