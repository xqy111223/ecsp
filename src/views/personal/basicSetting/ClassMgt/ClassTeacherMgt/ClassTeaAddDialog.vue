<template>
  <div class="class-tea-add-dialog">
    <el-dialog :visible.sync="visible" :title="dialogTitle" width="640px" :before-close="cancel">
      <div>
        <el-form :inline="true" ref="ruleForm" label-width="60px" class="rule-form">
          <div class="item-div" v-for="(item, index) in itemArr" :key="index">
            <el-form-item label="教师：">
              <teacher-select :states="notClassTeachers" :item="item" :index='index' @updateId="updateId">
              </teacher-select>
            </el-form-item>
            <el-form-item label="学科：">
              <el-select v-model="item.subjectId" @change="updateSubject" clearable size="flat" placeholder="请选择学科">
                <el-option
                  v-for="item in subjectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <i class="el-icon-custom-delete icon-red" @click="deleteItem(index)"></i>
          </div>
        </el-form>
        <div class="add-btn-area">
          <span class="color-primary" @click="addInsert"><i class="el-icon-custom-add-course"></i>添加教师</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" @click="cancel">取 消</el-button>
          <el-button type="primary" size="mini" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
/*
* Description ClassStuAddDialog
* Created By xuqingyu
* Created At 2019/11/8 17:26
*/
import TeacherSelect from './TeacherSelect'
import { querySubjectOptions, queryUserOptions } from '@/api/personal/basicSetting'
import { mapGetters } from 'vuex'

export default {
  name: 'ClassTeaAddDialog',
  components: { TeacherSelect },
  props: {
    confirmDialogForm: Function,
    visible: Boolean,
    dialogTitle: String,
    classSubjectInfo: Array,
  },
  data () {
    return {
      itemArr: [
        { id: '', name: '', subjectId: '' },
        { id: '', name: '', subjectId: '' },
        { id: '', name: '', subjectId: '' },
        { id: '', name: '', subjectId: '' },
        { id: '', name: '', subjectId: '' }],
      ele: { id: '', name: '', subjectId: '' }, // 添加时的插入的数据对象
      subjectOptions: [],
      notClassTeachers: [],
    }
  },
  watch: {
    itemArr: function (newV, oldV) {
      this.itemArr = newV
    }
  },
  computed: {
    classId: function () {
      return +this.$route.params.id
    },
    ...mapGetters([
      'baseSchoolId', // 学校id
    ])
  },
  created () {
    this.getSubjectOptions()
    this.queryTeacherList()
  },
  methods: {
    updateSubject (val) {
      // console.log('this.itemArr', this.itemArr)
    },
    /**
     * @description: 更新选中的教师id
     * @param obj 描述
     * @returns {}
     */
    updateId (obj) {
      this.itemArr[obj.index].id = obj.val
      this.itemArr[obj.index].name = obj.name
      console.log('this.itemArr', this.itemArr)
    },
    /**
     * @description: 添加教师时查询教师，教师选项中不包括已添加的教师
     * @param arguments 描述
     * @returns {}
     */
    async queryTeacherList () {
      const params = {
        userType: 3,
        schoolId: this.baseSchoolId,
        status: 1,
        classId: ''
      }
      const res = await queryUserOptions(params) // 查本校老师
      const schoolAllTeachers = res.list
      const params2 = { ...params }
      params2.classId = this.classId
      const res2 = await queryUserOptions(params2) // 查本班老师
      const classTeachers = res2.list
      this.notClassTeachers = await schoolAllTeachers.filter(item => !classTeachers.includes(item))
      console.log('this.notClassTeachers', this.notClassTeachers)
    },
    /**
     * @description: 查询学科信息，学科选项中不包括已添加的教师的学科
     * @param arguments 描述
     * @returns {}
     */
    async getSubjectOptions () {
      const params = {
        schoolId: this.baseSchoolId,
        type: 'SBUJECT'
      }
      const subjectList = await querySubjectOptions(params)
      subjectList.forEach(item => {
        let flag = true
        this.classSubjectInfo.filter(i => {
          if (item.id === i.subjectId) {
            flag = false
          } else {
            return false
          }
        })
        if (flag) {
          this.subjectOptions.push({ value: item.id, label: item.name })
        }
      })
      // console.log('subjectList', subjectList)
      // console.log('this.subjectOptions', this.subjectOptions)
    },
    /**
     * @description: 删除行
     * @param index 描述
     * @returns {}
     */
    deleteItem (index) {
      this.itemArr.splice(index, 1)
      console.log('this.itemArr删除', this.itemArr)
    },
    /**
     * @description: 添加行
     * @param arguments 描述
     * @returns {}
     */
    addInsert () {
      this.ele.id = ''
      this.ele.name = ''
      this.ele.subjectId = ''
      console.log('this.ele', this.ele)
      this.itemArr.push(this.ele)
      console.log('this.itemArr', this.itemArr)
    },
    /**
     * @description: 添加教师selected框，搜索教师列表
     * @param arguments 描述
     * @returns {}
     */
    async getHeadTeacherList (val) {
      const params = {}
      params.schoolId = this.baseSchoolId
      params.gradeId = this.ruleForm.gradeId
      params.userName = val
    },
    /**
     * @description: 取消弹出层
     * @param arguments 描述
     * @returns {}
     */
    cancel () {
      this.$emit('update:visible', false)
      // .nextTick后的方法将回调延迟到下次DOM更新循环之后执行
    },
    /**
     * @description: 提交表单
     * @param arguments 描述
     * @returns {}
     */
    confirm (params) {
      const subjectArr = []
      const userIdArr = []
      const teacherSubjectInfo = []
      let tips = ''
      this.itemArr.map(item => {
        if (item.id && item.subjectId) {
          if (userIdArr.includes(item.id)) {
            tips = '教师不允许重复'
            return false
          } else {
            userIdArr.push(item.id)
          }
          if (subjectArr.includes(item.subjectId)) {
            tips = '学科不允许重复'
            return false
          } else {
            subjectArr.push(item.subjectId)
          }
          teacherSubjectInfo.push({ subjectId: item.subjectId, userId: item.id })
        }
      })
      if (tips === '') {
        const params = {
          classId: this.classId,
          teacherSubjectInfo: teacherSubjectInfo,
        }
        if (params.teacherSubjectInfo.length === 0) {
          this.$emit('update:visible', false)
        } else {
          this.confirmDialogForm(params)
          this.itemArr = [
            { id: '', name: '', subjectId: '' },
            { id: '', name: '', subjectId: '' },
            { id: '', name: '', subjectId: '' },
            { id: '', name: '', subjectId: '' },
            { id: '', name: '', subjectId: '' }]
        }
      } else {
        this.showMsgBox({
          message: tips,
          type: 'warning'
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
  .class-tea-add-dialog {
    /deep/ .el-form-item__content .index {
      display: inline-block;
    }

    /deep/ .el-form-item .el-input--flat {
      width: 180px;
    }

    .rule-form {
      .item-div {
        padding-top: 20px;
        border-bottom: 1px dashed #ddd;

        .el-form-item {
          margin-right: 25px;
        }
      }

      .item-div:first-child {
        padding-top: 0;
      }

      .item-div:last-child {
        border-bottom: none;
      }
    }

    .icon-red {
      font-size: 16px;
      color: red;
      line-height: 40px;
      float: right;
      margin-left: 20px;
    }

    .add-btn-area {
      padding: 20px;
      text-align: center;
      font-size: 14px;
      border: 1px dashed #ddd;

      span {
        cursor: pointer;
      }

      .el-icon-custom-add-course {
        margin-right: 10px;
      }
    }
  }
</style>
