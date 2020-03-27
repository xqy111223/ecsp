<template>
  <div class="teacher-mgt-dialog">
    <el-dialog :visible.sync="visible" :title="dialogTitle" width="470px" :before-close="cancel">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="rule-form">
          <el-form-item label="用户名：" prop="loginName">
            <el-input
              type="text"
              size="flat"
              placeholder="请输入用户名"
              v-model="ruleForm.loginName"
              maxlength="30"
            >
            </el-input>
          </el-form-item>
          <el-form-item v-if="!rowInfo.baseUserId" label="密码：" prop="password">
            <el-input
              type="text"
              size="flat"
              v-model="ruleForm.password"
              maxlength="18"
              placeholder="请输入密码"
              autocomplete="off">
            </el-input>
            <el-button size="mini" type="custom" class="no-radius" @click="randomPassword">随机密码</el-button>
          </el-form-item>
          <el-form-item v-if="rowInfo.baseUserId" label="密码：" prop="password2">
            <el-input
              type="text"
              size="flat"
              v-model="ruleForm.password2"
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
              v-model="ruleForm.userName"
              maxlength="20"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="学号：" prop="stuNo">
            <el-input
              type="text"
              size="flat"
              placeholder="请输入学号"
              v-model="ruleForm.stuNo"
              maxlength="30"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="入学年份：" prop="entranceYear">
            <el-date-picker
              v-model="ruleForm.entranceYear"
              size="date-flat"
              type="year"
              :picker-options="pickerOptions"
              value-format="timestamp"
              placeholder="选择年">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="年级班级：" prop="stuSchoolClassId">
            <el-cascader
              v-model="ruleForm.stuSchoolClassId"
              placeholder="请选择"
              size="flat"
              clearable
              :options="gradeList">
            </el-cascader>
          </el-form-item>
          <el-form-item label="手机号：" prop="mobile">
            <el-input size="flat" v-model="ruleForm.mobile" placeholder="请输入手机号" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item size="flat-large" label="电子邮箱：" prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input
              type="textarea"
              placeholder="请输入备注"
              v-model="ruleForm.remark"
              maxlength="30"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item v-if="rowInfo.baseUserId" label="状态：" prop="status">
            <el-radio-group v-model.number="ruleForm.status">
              <el-radio :label="0">关闭</el-radio>
              <el-radio :label="1">启用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" @click="cancel">取 消</el-button>
          <el-button type="primary" size="mini" @click="confirm('ruleForm')">确 定</el-button>
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
  name: 'StudentMgtDialog',
  props: {
    visible: Boolean,
    dialogTitle: String,
    gradeList: Array,
    rowInfo: Object,
    confirmDialogForm: Function
  },
  data () {
    const checkUserNameFn = (rule, value, callback) => {
      const val = value.trim()
      if (!val) {
        callback(new Error('用户名不能为空'))
      } else {
        if (!checkUserName(val)) {
          callback(new Error('用户名只可包含字母、数字、特殊符号,.;~!@#%^*()_+-=/'))
        } else {
          callback()
        }
      }
    }
    const checkPasswordFn = (rule, value, callback) => {
      const val = value.trim()
      if (!val) {
        callback(new Error('用户密码不能为空'))
      } else {
        if (!checkPassword(val)) {
          callback(new Error('密码必须包含大小写字母、数字、特殊符号,.;~!@#%^*()_+-=/'))
        } else {
          callback()
        }
      }
    }
    const checkPasswordFn2 = (rule, value, callback) => {
      const val = value.trim()
      if (val && !checkPassword(val)) {
        callback(new Error('密码必须包含大小写字母、数字、特殊符号,.;~!@#%^*()_+-=/'))
      } else {
        callback()
      }
    }
    const checkNameFn = (rule, value, callback) => {
      const val = value.trim()
      if (!val) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const checkPhoneFn = (rule, value, callback) => {
      const val = value.trim()
      if (val && !checkPhone(val)) {
        callback(new Error('手机号格式不正确！'))
      } else {
        callback()
      }
    }
    const checkEmailFn = (rule, value, callback) => {
      const val = value.trim()
      if (val && !checkEmail(val)) {
        callback(new Error('电子邮箱格式不正确！'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        baseUserId: '',
        loginName: '',
        userName: '',
        password: '',
        password2: '', // 编辑状态密码可以为空
        stuNo: '',
        entranceYear: '',
        stuSchoolClassId: '',
        mobile: '',
        email: '',
        remark: '',
        status: ''
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
        password2: [
          { min: 8, max: 18, message: '密码需要是8到18个英文字符', trigger: 'blur' },
          {
            validator: checkPasswordFn2,
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
        stuNo: [
          { trigger: 'blur' }
        ],
        entranceYear: [
          { required: true, message: '请选择入学年份', trigger: 'blur' },
        ],
        stuSchoolClassId: [
          { required: true, message: '请选择年级班级', trigger: 'change' },
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
        remark: [],
        status: []
      },
      pickerOptions: {
        disabledDate (time) {
          const oDate = new Date()
          oDate.setFullYear(oDate.getFullYear() - 12)
          oDate.getTime()
          return (time.getTime() < oDate.getTime()) || (time.getTime() > Date.now())
        }
      }
    }
  },
  watch: {
    rowInfo: function (newValue, oldValue) {
      this.ruleForm = newValue
    },
  },
  methods: {
    /**
     * @description: 点击——取消弹窗
     * @param arguments 描述
     * @returns {}
     */
    cancel () {
      this.$emit('update:visible', false)
      // .nextTick后的方法将回调延迟到下次DOM更新循环之后执行
      this.$nextTick(() => {
        // 关闭对话框清除验证和表单内容
        this.$refs.ruleForm.resetFields()
      })
    },
    /**
     * @description: 点击——弹窗提交确认按钮
     * @param arguments 描述
     * @returns {}
     */
    confirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirmDialogForm(this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * @description: 获取随机密码
     * @param arguments 描述
     * @returns {}
     */
    randomPassword () {
      this.ruleForm.password = utils.randomPassword()
      this.$refs.ruleForm.validateField('password')
    }
  }
}
</script>

<style scoped lang="scss">
  .teacher-mgt-dialog {
    /deep/ .el-cascader .el-input, /deep/ .el-input--date-flat .el-input__inner.el-input__inner {
      width: 150px;
    }
    .rule-form{
      .el-form-item:last-child{
        margin-bottom: -20px;
      }
    }
  }
</style>
