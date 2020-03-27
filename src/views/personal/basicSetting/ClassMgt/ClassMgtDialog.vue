<template>
  <div class="classmgt-dialog">
    <el-dialog :visible.sync="visible" :title="dialogTitle" width="400px" :before-close="cancel">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="rule-form">
          <el-form-item v-if="ruleForm.classId" label="年级：">
            <span>{{ruleForm.gradeName}}</span>
          </el-form-item>
          <el-form-item v-if="!ruleForm.classId" label="年级：" prop="gradeId">
            <el-select clearable size="date-flat" @change="getJoinYear" v-model="ruleForm.gradeId" placeholder="请选择">
              <el-option v-for="item in gradeList" :label="item.label" :value="item.value"
                         :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级名称：" prop="className">
            <el-input
              type="text"
              size="date-flat"
              placeholder="请输入班级名称"
              v-model="ruleForm.className"
              minlength="0"
              maxlength="10"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item v-if="!ruleForm.classId" label="入学年份：" prop="joinYear">
            <el-date-picker
              v-model="ruleForm.joinYear"
              size="date-flat"
              type="year"
              value-format="timestamp"
              placeholder="选择年">
            </el-date-picker>
          </el-form-item>
          <el-form-item v-if="ruleForm.classId" label="入学年份：">
            <span>{{formatYear(ruleForm.joinYear)}}</span>
          </el-form-item>
          <el-form-item v-if="ruleForm.classId" label="毕业年份：">
            <span>{{formatYear(ruleForm.gradeeYear)}}</span>
          </el-form-item>
          <el-form-item label="班主任：" prop="headTeacherLoginName">
            <tea-stu-selected
              :getSearchList="getHeadTeacherList"
              @getSelectedUserId="getHeadTeacherId"
              :loginName="ruleForm.headTeacherLoginName"
            >
            </tea-stu-selected>
          </el-form-item>
        </el-form>
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
* Description ClassMgtDialog
* Created By xuqingyu
* Created At 2019/11/4 11:42
*/
import TeaStuSelected from '@/components/personal/TeaStuSelected/index'
import { getTeacherList } from '@/api/personal/userMgt'
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'

export default {
  name: 'ClassMgtDialog',
  components: { TeaStuSelected },
  props: {
    getSearchList: Function,
    confirmDialogForm: Function,
    visible: Boolean,
    dialogTitle: String,
    gradeList: Array
  },
  data () {
    return {
      ruleForm: {
        schoolId: this.baseSchoolId,
        classId: '', // 新增，无classId
        className: '',
        gradeId: '',
        gradeName: '',
        joinYear: '',
        gradeeYear: '',
        headTeacherId: '',
        headTeacherLoginName: '',
      },
      rules: {
        gradeId: [
          { required: true, message: '请选择年级', trigger: 'blur' },
        ],
        className: [
          { required: true, min: 1, max: 10, message: '请输入班级名称', trigger: 'blur' },
        ],
        joinYear: [
          { required: true, message: '请选择入学年份', trigger: 'blur' },
        ],
        headTeacherLoginName: [
          { trigger: 'click' },
        ]
      }
    }
  },
  computed: { // 在计算属性中获取state中的状态数据，数据改变后会自动更新
    ...mapGetters([
      'baseSchoolId', // 学校id
    ]),
  },
  methods: {
    /**
     * @description: 回填弹框内容，编辑或新增信息
     * @param arguments 描述
     * @returns {}
     */
    viewContent (rowInfo) {
      // this.ruleForm = { ...this.ruleForm, ...rowInfo }
      this.ruleForm.classId = rowInfo.classId // 新增，无classId
      this.ruleForm.className = rowInfo.className
      this.ruleForm.gradeId = rowInfo.gradeId
      this.ruleForm.gradeName = rowInfo.gradeName
      this.ruleForm.joinYear = rowInfo.joinYear
      this.ruleForm.gradeeYear = rowInfo.gradeeYear
      this.ruleForm.headTeacherId = rowInfo.headTeacherId
      this.ruleForm.headTeacherLoginName = rowInfo.headTeacherLoginName
      console.log('this.ruleForm.headTeacherLoginName', this.ruleForm.headTeacherLoginName)
    },
    /**
     * @description: 入学/毕业年份时间搓，格式化成年份
     * @param arguments 描述
     * @returns {}
     */
    formatYear (time) {
      return dayjs(time).format('YYYY')
    },
    /**
     * @description: 根据入学年份，计算毕业年份并保存
     * @param arguments 描述
     * @returns {}
     */
    setGradeeYear () {
      const num = this.gradeList.length
      const yearNum = new Date(this.ruleForm.joinYear).getFullYear() + num
      this.ruleForm.gradeeYear = new Date(yearNum, 1, 1).getTime()
    },
    /**
     * @description: 每次选择年级时，重新计算入学年份
     * @param e 描述
     * @returns {}
     */
    getJoinYear (e) {
      const year = new Date().getFullYear() // 当前年份
      const flag = new Date().getMonth() > 5 ? 0 : 1 // 当前月份属于上半年还是下半年,上半年1，下半年0
      let sort = ''
      this.gradeList.map((item) => {
        if (item.value === e) {
          sort = item.sort
        }
      })
      const yearNum = year - flag - (sort - 1)
      this.ruleForm.joinYear = new Date(yearNum, 1, 1).getTime()
      this.$refs.ruleForm.validateField('joinYear')
    },
    /**
     * @description: 获取筛选框里班主任id
     * @param val 描述
     * @returns {}
     */
    getHeadTeacherId (val) {
      this.ruleForm.headTeacherId = val
    },
    /**
     * @description: 班主任selected框，搜索班主任列表
     * @param arguments 描述
     * @returns {}
     */
    async getHeadTeacherList (val) {
      const params = {}
      params.schoolId = this.baseSchoolId
      params.gradeId = this.ruleForm.gradeId
      params.userName = val
      const res = await getTeacherList(params)
      return res.list
    },
    /**
     * @description: 取消弹出层
     * @param arguments 描述
     * @returns {}
     */
    cancel () {
      this.$emit('update:visible', false)
      // .nextTick后的方法将回调延迟到下次DOM更新循环之后执行
      this.$refs.ruleForm.resetFields()
    },
    /**
     * @description: 提交表单
     * @param arguments 描述
     * @returns {}
     */
    confirm (formName) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (!this.ruleForm.classId) {
            this.setGradeeYear()
          }
          this.confirmDialogForm(this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
  .classmgt-dialog {
    .border-dashed {
      border: 1px dashed #ddd;
      padding: 0px 20px;
    }

    .rule-form {
      .el-form-item:last-child {
        margin-bottom: -20px;
      }
    }
  }
</style>
