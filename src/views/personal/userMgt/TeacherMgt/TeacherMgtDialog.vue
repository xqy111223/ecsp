<template>
  <div class="teacher-mgt-dialog">
    <el-dialog :visible.sync="visible" :title="dialogTitle" width="500px" :before-close="cancel">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleFormDom" label-width="100px" class="rule-form">
          <el-form-item label="用户名：" prop="loginName">
            {{ruleForm.baseUserId}}
            <el-input
              type="text"
              size="flat"
              placeholder="请输入用户名"
              v-model.trim="ruleForm.loginName"
            >
            </el-input>
          </el-form-item>
          <el-form-item v-if="!ruleForm.baseUserId" label="密码：" prop="password">
            <el-input
              type="text"
              size="flat"
              v-model.trim="ruleForm.password"
              maxlength="18"
              placeholder="请输入密码"
              autocomplete="off">
            </el-input>
            <el-button size="mini" type="custom" class="no-radius" @click="randomPassword">随机密码</el-button>
          </el-form-item>
          <el-form-item v-if="ruleForm.baseUserId" label="密码：" prop="password">
            <el-input
              type="text"
              size="flat"
              v-model.trim="ruleForm.password"
              maxlength="18"
              placeholder="空表示未修改密码"
              autocomplete="off">
            </el-input>
            <el-button size="mini" type="custom" class="no-radius" @click="randomPassword">随机密码</el-button>
          </el-form-item>
          <el-form-item label="姓名：" prop="userName">
            <el-input
              type="text"
              size="flat"
              placeholder="请输入姓名"
              v-model.trim="ruleForm.userName"
              maxlength="20"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="班主任：" prop="valueStr">
            <el-cascader
              ref="headerClass"
              placeholder="请选择"
              size="flat"
              clearable
              :options="gradeList"
            >
            </el-cascader>
            <el-button size="mini" type="custom" class="no-radius" @click="selectedHeaderClassId">添加</el-button>
            <div class="selected-tag">
              <el-tag closable type="default" v-for="item in gradeClassInfo" :key="item.gradeId"
                      @close="handleCloseItemClass(item.schoolClassId)">
                {{item.className + item.gradeName}}
              </el-tag>
            </div>
          </el-form-item>
          <el-form-item label="任课信息：">
            <el-cascader
              ref="headerSubject"
              placeholder="请选择"
              size="flat"
              clearable
              :options="gradeSubjectList">
            </el-cascader>
            <el-button size="mini" type="custom" class="no-radius" @click="selectedHeaderSubjectId">添加</el-button>
            <div class="selected-tag">
              <el-tag closable type="default" v-for="item in headerSubjectInfo" :key="item.schoolClassId"
                      @close="handleCloseItemSubject(item)">
                {{item.className + item.gradeName + item.subjectName}}
              </el-tag>
            </div>
          </el-form-item>
          <el-form-item label="教师类型：" prop="isFamous">
            <el-radio-group v-model.number="ruleForm.isFamous">
              <el-radio :label="0">普通老师</el-radio>
              <el-radio :label="1">名师</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号：" prop="mobile">
            <el-input size="flat" v-model.trim="ruleForm.mobile" placeholder="请输入手机号" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item size="flat-large" label="电子邮箱：" prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input
              type="textarea"
              placeholder="请输入备注"
              v-model.trim="ruleForm.remark"
              maxlength="30"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item v-if="ruleForm.baseUserId" label="状态：" prop="status">
            <el-radio-group v-model.number="ruleForm.status">
              <el-radio :label="0">关闭</el-radio>
              <el-radio :label="1">启用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" @click="confirm()">取 消</el-button>
          <el-button type="primary" size="mini" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/*
* Description TeacherMgtDialog
* Created By xuqingyu
* Created At 2019/10/17 16:19
*/
import { checkEmail, checkPassword, checkPhone, checkUserName } from '@/utils/validate'
import * as utils from '@/utils'

export default {
  name: 'TeacherMgtDialog',
  props: {
    visible: Boolean,
    dialogTitle: String,
    gradeList: Array,
    gradeSubjectList: Array,
    confirmDialogForm: Function,
    rowInfo: Object
  },
  data () {
    const checkUserNameFn = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else {
        if (!checkUserName(value)) {
          callback(new Error('用户名只可包含字母、数字、特殊符号,.;~!@#%^*()_+-=/'))
        } else {
          callback()
        }
      }
    }
    const checkPasswordFn = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户密码不能为空'))
      } else {
        if (!checkPassword(value)) {
          callback(new Error('密码必须包含大小写字母、数字、特殊符号,.;~!@#%^*()_+-=/'))
        } else {
          callback()
        }
      }
    }
    const checkNameFn = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const checkPhoneFn = (rule, value, callback) => {
      if (value && !checkPhone(value)) {
        callback(new Error('手机号格式不正确！'))
      } else {
        callback()
      }
    }
    const checkEmailFn = (rule, value, callback) => {
      if (value && !checkEmail(value)) {
        callback(new Error('电子邮箱格式不正确！'))
      } else {
        callback()
      }
    }
    return {
      gradeClassInfo: this.rowInfo.gradeClassInfo || [],
      headerSubjectInfo: this.rowInfo.headerSubjectInfo || [],
      headerClassIdArr: [],
      headerSubjectIdArr: [],
      ruleForm: {
        password: null
      },
      rules: {
        loginName: [
          { min: 5, max: 30, message: '用户名需要是5到30个英文字符', trigger: 'blur' },
          {
            required: true,
            validator: checkUserNameFn,
            trigger: 'blur'
          },
        ],
        password: [
          { min: 8, max: 18, message: '密码需要是8到18个英文字符', trigger: 'blur' },
          {
            required: true,
            validator: checkPasswordFn,
            trigger: 'blur'
          },
        ],
        userName: [
          {
            required: true,
            validator: checkNameFn,
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            validator: checkPhoneFn,
            trigger: 'blur'
          },
        ],
        email: [
          {
            validator: checkEmailFn,
            trigger: 'blur'
          },
        ],
        isFamous: [],
        remark: [],
        status: []
      }
    }
  },
  created () {

  },
  watch: {
    rowInfo: function (newVal, oldVal) {
      this.ruleForm = { ...this.ruleForm, ...newVal }
      this.gradeClassInfo = newVal.gradeClassInfo || []
      this.headerSubjectInfo = newVal.headerSubjectInfo || []
      this.headerClassIdArr = []
      this.headerSubjectIdArr = []
      this.gradeClassInfo.length > 0 && this.gradeClassInfo.forEach(item => {
        this.headerClassIdArr.push(item.schoolClassId)
      })
      this.headerSubjectInfo > 0 && this.headerSubjectInfo.forEach(item => {
        this.headerSubjectIdArr.push({
          gradeId: item.gradeId,
          schoolClassId: item.schoolClassId,
          subjectId: item.subjectId
        })
      })
    },
    dialogTitle: function (newVal) {
      if (newVal === '新增教师') {
        this.rules.password[1].required = true
      } else {
        this.rules.password[1].required = false
      }
    }
  },
  methods: {
    /**
     * 操作任课信息筛选项，点击x删除按钮
     * @param item
     */
    handleCloseItemSubject (item) {
      const nodeIdArr = { gradeId: item.gradeId, schoolClassId: item.schoolClassId, subjectId: item.subjectId }
      this.headerSubjectIdArr.splice(this.headerSubjectIdArr.indexOf(nodeIdArr), 1)
      this.headerSubjectInfo.splice(this.headerSubjectIdArr.indexOf(nodeIdArr), 1)
    },
    /**
     * 选择任课信息筛选框，点击添加按钮
     */
    selectedHeaderSubjectId () {
      const node = this.$refs.headerSubject.getCheckedNodes()
      if (node.length > 0) {
        const nodeIdArr = {
          gradeId: node[0].data.value,
          schoolClassId: node[0].parent.data.value,
          subjectId: node[0].parent.parent.data.value
        }
        // 防止重复提交
        if (JSON.stringify(this.headerSubjectIdArr).indexOf(JSON.stringify(nodeIdArr)) === -1) {
          this.headerSubjectIdArr.push({
            gradeId: node[0].data.value,
            schoolClassId: node[0].parent.data.value,
            subjectId: node[0].parent.parent.data.value
          })
          this.headerSubjectInfo.push({
            subjectName: node[0].data.label,
            gradeName: node[0].parent.data.label,
            className: node[0].parent.parent.data.label
          })
        }
        // console.log('headerSubjectInfo***********', this.headerSubjectInfo, node)
      }
    },
    /**
     * 操作班主任信息筛选项，点击X删除按钮
     * @param item
     */
    handleCloseItemClass (id) {
      this.gradeClassInfo.splice(this.headerClassIdArr.indexOf(id), 1)
      this.headerClassIdArr.splice(this.headerClassIdArr.indexOf(id), 1)
    },
    /**
     * 选择班主任信息筛选框，点击添加按钮
     */
    selectedHeaderClassId () {
      const node = this.$refs.headerClass.getCheckedNodes()
      // 防止重复提交
      if ((node.length > 0) && !this.headerClassIdArr.includes(node[0].data.value)) {
        this.gradeClassInfo.push({
          className: node[0].parent.data.label,
          schoolClassId: node[0].data.value,
          gradeName: node[0].data.label
        })
        this.headerClassIdArr.push(node[0].data.value)
      }
    },
    /**
     * 点击取消弹出层
     */
    cancel () {
      this.$emit('update:visible', false)
      // 关闭对话框清除验证和表单内容
      this.$refs.ruleFormDom.resetFields()
      // .nextTick后的方法将回调延迟到下次DOM更新循环之后执行
      this.$nextTick(() => {
        this.headerSubjectInfo = []
        this.gradeClassInfo = []
        this.headerClassIdArr = []
        this.headerSubjectIdArr = []
      })
    },
    /**
     * 点击弹出层确定提交按钮
     */
    confirm () {
      this.$refs.ruleFormDom.validate((valid) => {
        if (valid) {
          this.ruleForm = {
            ...this.ruleForm,
            headerClassId: this.headerClassIdArr.join(),
            headerSubjectId: this.headerSubjectIdArr
          }
          this.confirmDialogForm(this.ruleForm)
          this.$refs.ruleFormDom.resetFields()
        } else {
          console.log('error submit!!')
        }
      })
    },
    /**
     * 随机密码
     */
    randomPassword () {
      this.ruleForm.password = utils.randomPassword()
      this.$refs.ruleFormDom.validateField('password')
    }
  }
}
</script>

<style scoped lang="scss">
  .teacher-mgt-dialog {
    /deep/ .el-cascader .el-input {
      width: 150px;
    }

    .rule-form {
      .el-form-item:last-child {
        margin-bottom: -20px;
      }
    }

    .selected-tag {
      .el-tag {
        margin-right: 5px;
      }
    }
  }
</style>
