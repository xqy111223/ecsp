<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="handleClose"
    class="login-dialog"
    width="380px">
    <span class="login-title">用户登录</span>
    <span class="login-error">{{error}}</span>
    <span class="login-close" @click="handleClose"><i class="el-icon-error"></i></span>
    <el-form ref="loginForm" :model="form" :rules="rules" class="login-form">
      <el-form-item label="" prop="loginName">
        <el-input class="login-form--input" :clearable="true" v-model="form.loginName" autocomplete="off"
                  placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="" prop="passWord">
        <el-input class="login-form--input" :clearable="true" v-model="form.passWord" autocomplete="off"
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item v-if="showVerifyCode" class="form-item--verifyCode" label="" prop="validateCode">
        <el-input class="login-form--input" :clearable="true" v-model="form.validateCode" autocomplete="off"
                  placeholder="验证码" style="width:200px"></el-input>
        <el-image v-if="src" class="verify-code-img" :src="src" fit="cover" @click="changeVerifyCode">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox v-model="form.rememberMe">自动登录</el-checkbox>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="login-confirm" @click="handleLogin">登录</el-button>
    </span>
  </el-dialog>
</template>

<script>
/*
* Description 登录框
* Created By Chasen
* Created At 2019/9/20 13:41
*/
import { mapActions, mapGetters } from 'vuex'
import { checkUserName } from '@/utils/validate'
import { getUserInfo, Login } from '@/api/common/login'
import API_ROOT from './../../../../build/config'

export default {
  name: 'LoginDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        if (checkUserName(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的用户名'))
        }
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入正确的密码!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        loginName: 'zhuhao',
        passWord: '12345678',
        validateCode: null,
        rememberMe: true,
      },
      error: '',
      showVerifyCode: false,
      src: '',
      rules: {
        loginName: [
          { required: true, validator: validateUsername, trigger: 'blur' }
        ],
        passWord: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        validateCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    ...mapGetters(['token', 'basePlatformId'])
  },
  methods: {
    ...mapActions(['SET_TOKEN', 'SET_USER_INFO']),
    /**
     * @description: 方法说明
     * @returns {type}
     */
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        this.error = ''
        if (valid) {
          this.confirm(this.form)
        } else {
          return false
        }
      })
    },
    /**
     * @description: 关闭处理
     * @returns {type}
     */
    handleClose () {
      this.$refs.loginForm.resetFields()
      this.$emit('update:visible', false) // 双向绑定
    },
    /**
     * 验证码
     */
    async changeVerifyCode () {
      try {
        this.src = API_ROOT.API_ROOT + '/getImageCode?token=' + this.token + '&t=' + new Date().getTime()
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    /**
     * 登录获取token + 是否需要验证码
     * @param
     * @returns {Promise<void>}
     */
    async confirm (loginForm) {
      try {
        const loginParams = { ...loginForm, basePlatformId: this.basePlatformId }
        const res = await Login(loginParams)
        this.SET_TOKEN(res.token)
        const userInfo = await getUserInfo()
        userInfo.token = res.token
        this.SET_USER_INFO(userInfo)
        this.handleClose()
        this.$router.push({ path: this.$route.path, query: { _t: new Date().getTime() } })
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
        if (e.result) {
          this.showVerifyCode = e.result.isVerify
        }
        if (this.showVerifyCode) {
          this.changeVerifyCode()
        }
      }
    },
  }
}
</script>

<style scoped lang="scss">
  @import "&/default/var.scss";

  .login-dialog {
    /deep/ .el-dialog > .el-dialog__header {
      display: none;
    }

    /deep/ .el-dialog > .el-dialog__footer {
      padding-top: 0;
    }

    .login-close {
      position: absolute;
      width: 40px;
      right: -10px;
      height: 40px;
      top: -10px;
      font-size: 38px;
      background: #FFFFFF;
      border-radius: 40px;
      text-align: center;
      line-height: 43px;
      color: #347EFF;
      color: var(--primary-color);
      cursor: pointer;
    }

    .login-title {
      position: absolute;
      top: -25px;
      left: 50%;
      width: 112px;
      margin-left: -56px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      border-radius: 22px;
      height: 44px;
      line-height: 44px;
      @extend .cy-info;
    }

    .login-error{
      position: absolute;
      top: 45px;
      font-size: 12px;
      color: red;
    }

    .login-form {
      margin-top: 50px;
      /deep/ .login-form--input {
        input {
          height: 42px;
        }
      }
      /deep/ .el-form-item:last-child, /deep/ .el-form-item:nth-last-child(2) {
        margin-bottom: 8px;
      }
      .verify-code-img {
        float: right;
        width: 110px;
        max-height: 40px;
        margin-top: 2px;
        cursor: pointer;
        .image-slot {
          text-align: center;
        }
      }
    }

    .login-confirm {
      width: 320px;
      height: 50px;
      font-size: 16px;
    }
  }
</style>
