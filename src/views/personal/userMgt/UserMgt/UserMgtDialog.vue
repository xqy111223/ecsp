<template>
  <div class="user-mgt-dialog">
    <el-dialog :visible.sync="visible" :title="DialogTitle" width="500px" :before-close="cancel">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="rule-form">
          <el-form-item label="用户名：" prop="loginName">
            <el-input
              type="text"
              size="flat"
              placeholder="请输入用户名"
              v-model.trim="ruleForm.loginName"
              minlength="5"
              maxlength="30"
            >
            </el-input>
          </el-form-item>
          <el-form-item v-if="!rowInfo.baseUserId" label="密码：" prop="password">
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
          <el-form-item v-if="rowInfo.baseUserId" label="密码：" prop="password2">
            <el-input
              type="text"
              size="flat"
              v-model.trim="ruleForm.password2"
              maxlength="18"
              placeholder="空表示未修改密码"
              autocomplete="off">
            </el-input>
            <el-button size="mini" type="custom" class="no-radius" @click="randomPassword2">随机密码</el-button>
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
          <el-form-item label="手机号：" prop="mobile">
            <el-input size="flat" v-model.trim="ruleForm.mobile" placeholder="请输入手机号" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="固定电话：" prop="phone">
            <el-input size="flat" v-model.trim="ruleForm.phone" placeholder="请输入固定电话" maxlength="12"></el-input>
          </el-form-item>
          <el-form-item size="flat-large" label="电子邮箱：" prop="email">
            <el-input v-model.trim="ruleForm.email" placeholder="请输入邮箱地址"></el-input>
          </el-form-item>
          <el-form-item size="flat-large" label="备注：" prop="remark">
            <el-input
              type="textarea"
              placeholder="请输入备注"
              v-model.trim="ruleForm.remark"
              maxlength="30"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="角色：">
            <el-checkbox-group v-model="ruleForm.roleList" :class="{'border-dashed':!!platRoleList.length}">
              <el-checkbox v-for="item in platRoleList" :label="item.frontRoleId" :key="item.roleId">{{item.roleName}}
              </el-checkbox>
            </el-checkbox-group>
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
* Description UserMgtDialog
* Created By xuqingyu
* Created At 2019/9/26 14:22
*/
import { checkEmail, checkLandLine, checkPassword, checkPhone, checkUserName } from '@/utils/validate'
import * as utils from '@/utils'

export default {
  name: 'UserMgtDialog',
  props: {
    visible: Boolean,
    DialogTitle: String,
    platRoleList: Array,
    rowInfo: Object,
    confirmDialogForm: Function
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
    const checkPasswordFn2 = (rule, value, callback) => {
      if (value && !checkPassword(value)) {
        callback(new Error('密码必须包含大小写字母、数字、特殊符号,.;~!@#%^*()_+-=/'))
      } else {
        callback()
      }
    }
    const checkNameFn = (rule, value, callback) => {
      if (!value) {
        callback(new Error('姓名不能为空'))
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
    const checkLandLineFn = (rule, value, callback) => {
      if (value && !checkLandLine(value)) {
        callback(new Error('固定电话格式不正确！'))
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
      ruleForm: {
        baseUserId: '',
        loginName: '',
        userName: '',
        password: '',
        password2: '', // 编辑状态密码可以为空
        mobile: '',
        phone: '',
        email: '',
        remark: '',
        roleList: [],
        status: null,
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
        mobile: [
          {
            validator: checkPhoneFn,
            trigger: 'blur'
          },
        ],
        phone: [
          {
            validator: checkLandLineFn,
            trigger: 'blur'
          }
        ],
        email: [
          {
            validator: checkEmailFn,
            trigger: 'blur'
          },
        ],
        roleList: [],
        remark: '',
      }
    }
  },
  methods: {
    /**
     * @description: 取消弹出层
     * @param arguments 描述
     * @returns {}
     */
    cancel () {
      this.$emit('update:visible', false)
      // .nextTick后的方法将回调延迟到下次DOM更新循环之后执行
      // this.$refs.ruleForm.resetFields()
      this.$nextTick(() => {
        // 关闭对话框清除验证和表单内容
        this.$refs.ruleForm.resetFields()
      })
    },
    /**
     * @description: 提交表单
     * @param arguments 描述
     * @returns {}
     */
    confirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirmDialogForm(this.ruleForm)
          console.log('提交this.ruleForm', this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * @description: 回显内容
     * @param rowInfo 描述
     * @returns {}
     */
    viewContent (rowInfo) {
      this.ruleForm.userName = rowInfo.userName
      this.ruleForm.loginName = rowInfo.loginName
      this.ruleForm.baseUserId = rowInfo.baseUserId
      this.ruleForm.status = rowInfo.status
      this.ruleForm.email = rowInfo.email
      this.ruleForm.phone = rowInfo.phone
      this.ruleForm.mobile = rowInfo.mobile
      this.ruleForm.remark = rowInfo.remark
      this.ruleForm.roleList = []
      rowInfo.roleList && rowInfo.roleList.forEach((val) => {
        this.ruleForm.roleList.push(val.frontRoleId)
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
    },
    randomPassword2 () {
      this.ruleForm.password2 = utils.randomPassword()
      this.$refs.ruleForm.validateField('password2')
    }
  }
}
</script>

<style scoped lang="scss">
  .user-mgt-dialog {
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
