<template>
  <div class="class-stu-add-dialog">
    <el-dialog :visible.sync="visible" :title="dialogTitle" width="540px" :before-close="cancel">
      <div>
        <el-form ref="ruleForm" label-width="60px" class="rule-form">
          <el-form-item label="学生：" v-for="(item, index) in itemArr" :key="index">
            <student-select :states="notClassStudents" :item="item" :index='index' @updateId="updateId">
            </student-select>
            <i class="el-icon-custom-delete icon-red" @click="deleteItem(index)"></i>
          </el-form-item>
        </el-form>
        <div class="add-btn-area">
          <span class="color-primary" @click="addInsert"><i class="el-icon-custom-add-course"></i>添加学生</span>
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
import StudentSelect from './StudentSelect'
import { queryUserOptions } from '@/api/personal/basicSetting'
import { mapGetters } from 'vuex'

export default {
  name: 'ClassStuAddDialog',
  components: { StudentSelect },
  props: {
    classId: Number,
    confirmDialogForm: Function,
    visible: Boolean,
    dialogTitle: String,
  },
  data () {
    return {
      notClassStudents: [], // 本校非本班学生
      itemArr: [{ id: '', name: '' }, { id: '', name: '' }, { id: '', name: '' }, { id: '', name: '' }, {
        id: '',
        name: ''
      }],
      ele: { id: '', name: '' }, // 添加时的插入的数据对象
    }
  },
  computed: { // 在计算属性中获取state中的状态数据，数据改变后会自动更新
    ...mapGetters([
      'baseSchoolId', // 学校id
    ])
  },

  created () {
    this.queryStudentList()
  },
  methods: {
    updateId (obj) {
      this.itemArr[obj.index].id = obj.val
      this.itemArr[obj.index].name = obj.name
      console.log('this.itemArr', this.itemArr)
    },
    /**
     * @description: 添加学生时查询学生，查本校非本班级学生
     * @param arguments 描述
     * @returns {}
     */
    async queryStudentList () {
      const params = {
        userType: 4,
        schoolId: this.baseSchoolId,
        status: 1,
        classId: ''
      }
      const res = await queryUserOptions(params) // 查本校学生
      const schoolAllStudents = res.list
      const params2 = { ...params }
      params2.classId = this.classId
      const res2 = await queryUserOptions(params2) // 查本校学生
      const classStudents = res2.list
      this.notClassStudents = await schoolAllStudents.filter(item => !classStudents.includes(item))
      // await console.log('this.notClassStudents', this.notClassStudents)
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
      console.log('this.ele', this.ele)
      this.itemArr.push(this.ele)
      console.log('this.itemArr', this.itemArr)
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
    confirm () {
      let uniqueFlag = true
      const params = {
        classId: this.classId,
        userIds: []
      }
      this.itemArr.forEach(item => {
        if (item.id !== '') {
          if (!params.userIds.includes(item.id)) {
            params.userIds.push(item.id)
          } else {
            uniqueFlag = false
          }
        }
      })
      if (uniqueFlag) {
        if (params.userIds.length === 0) {
          this.$emit('update:visible', false)
        } else {
          this.confirmDialogForm(params)
        }
        this.itemArr = [{ id: '', name: '' }, { id: '', name: '' }, { id: '', name: '' }, {
          id: '',
          name: ''
        }, { id: '', name: '' }]
      } else {
        this.showMsgBox({
          message: '学生不允许重复!',
          type: 'warning'
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
  .class-stu-add-dialog {
    /deep/ .el-form-item__content .index {
      display: inline-block;

      .el-input--date-flat .el-input__inner.el-input__inner {
        width: 380px;
      }
    }
    .rule-form {
      .el-form-item {
        padding-bottom: 20px;
        border-bottom: 1px dashed #ddd;
      }

      .el-form-item:last-child {
        border-bottom: none;
      }
    }

    .icon-red {
      font-size: 16px;
      color: red;
      line-height: 40px;
      float: right;
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
