<template>
  <div class="app-login">
    <div class="login-user" v-if="baseUserId">
      <el-avatar class="login-user-pic" :size="34" :src="circleUrl"></el-avatar>
      <el-dropdown trigger="click" class="login-user-opt" @visible-change="handleVisible" @command="handleCommand">
      <span class="el-dropdown-link">
        {{userName}}
        <i :class="iconClass"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-custom-space" command="personal">个人空间</el-dropdown-item>
          <el-dropdown-item icon="el-icon-custom-sign-out" command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <label class="login-btn primary" v-if="!baseUserId" @click="showLoginDialog">登录</label>
    <login-dialog :visible.sync="loginDialogShow"></login-dialog>
  </div>
</template>

<script>
/*
* Description Login
* Created By Chasen
* Created At 2019/9/20 10:45
*/
import { mapActions, mapGetters } from 'vuex'
import LoginDialog from '@/components/common/LoginDialog'
import { Logout } from '@/api/common/login'

export default {
  name: 'AppLogin',
  components: { LoginDialog },
  props: {},
  data () {
    return {
      loginDialogShow: false,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      dropActive: false
    }
  },
  computed: {
    ...mapGetters(['userName', 'baseUserId', 'roleCode', 'defaultPersonalNav', 'userInfo']),
    iconClass: function () {
      return {
        'el-icon-drop': true,
        'el-icon-custom-arrow-up': this.dropActive,
        'el-icon-custom-arrow-down': !this.dropActive
      }
    }
  },
  created () {

  },
  methods: {
    ...mapActions(['LOGOUT', 'SET_USER_INFO', 'CHANGE_ROLE', 'REMOVE_PERSONAL_ROUTERS']),
    showLoginDialog () {
      this.loginDialogShow = true
    },
    /**
     * 点击用户信息切换悬停效果
     * @param command
     */
    handleVisible (v) {
      this.dropActive = v
    },
    /**
     * 登录后的菜单事件集中处理
     * @param command
     */
    handleCommand (command) {
      const accessPersonalWeb = ['TEACHER', 'FAMILY', 'STUDENT'] // 这三个角色有个人空间页
      switch (command) {
        case 'personal': // 进入个人空间管理 或者老师学生家长跳转个人空间展示页
          if (accessPersonalWeb.indexOf(this.roleCode) > -1) {
            this.$router.push({ name: 'PersonalSpace' })
          } else {
            this.$router.push({ name: this.defaultPersonalNav })
          }
          break
        case 'logout': // 登出
          Logout().then(() => {
            debugger
            this.LOGOUT()
            window.location.reload()
          })
          // this.$router.push({ path: '/', query: { _t: new Date().getTime() } })
          // window.location.reload()
          break
      }
    },
  }
}
</script>

<style scoped lang="scss">
  .app-login {
    line-height: 60px;
    .login-btn {
      height: 60px;
      color: #ffffff;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        color: #bed1ff;
      }
    }
    .login-user {
      height: 60px;
      color: #ffffff;
      min-width: 160px;
      text-align: center;
      .login-user-pic {
        margin-top: 11px;
      }

      .login-user-opt {
        color: #ffffff;
        float: right;
        padding-right: 10px;
        cursor: pointer;
        min-width: 90px;
        text-align: left;
        outline: none;

        .el-dropdown-link {
          display: block;
          outline: none;
        }

        .el-icon-drop {
          font-size: 10px;
          margin-left: 10px;
        }
      }
    }
  }

  .el-dropdown-menu {
    padding: 0;
    border: none;
    border-radius: 0px;
    background-color: #347eff;
    -webkit-box-shadow: none;
    box-shadow: none;
    min-width: 160px;
    text-align: center;

    .el-dropdown-menu__item {
      line-height: 40px;
      color: #fff;
    }

    /deep/ .el-icon-custom-space, /deep/ .el-icon-custom-sign-out {
      margin-right: 10px;
    }

    .el-dropdown-menu__item:hover {
      background-color: #335cff;
      color: #fff;
    }
  }

  .el-popper {
    margin-top: 0px;

    /deep/ .popper__arrow {
      display: none;
    }
  }
</style>
