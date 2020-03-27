<template>
  <el-header class="app-nav">
    <div class="app-nav-content">
      <el-menu :default-active="activeNavIndex"
               class="el-menu-nav" mode="horizontal"
               @select="handleSelect">
        <el-menu-item v-for="item in menus" :index="item.path" :key="item.path">
          <template slot="title">
            <i class="app-nav-icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
      </el-menu>
      <AppLogin class="app-login"></AppLogin>
    </div>
  </el-header>
</template>

<script>
import { mapGetters } from 'vuex'
import AppLogin from './AppLogin'

export default {
  name: 'appNav',
  components: { AppLogin },
  data () {
    return {
      menus: [{ index: 1, name: '首页', icon: 'el-icon-custom-home', path: '/' },
        { index: 2, name: '校园直播', icon: 'el-icon-custom-live', path: '/live' },
        { index: 3, name: '课程中心', icon: 'el-icon-custom-course', path: '/course' },
        { index: 4, name: '教学统计', icon: 'el-icon-custom-census', path: '/statistics' }]
    }
  },
  computed: {
    ...mapGetters(['activeNavIndex']),
  },
  created () {
  },
  methods: {
    handleSelect (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "&/default/var.scss";

  .app-nav {
    padding: 0;
    background: $primary-color;
    background: var(--main-bg-color);

    .app-nav-content {
      width: 1200px;
      margin: 0 auto;
      position: relative;

      .el-menu-nav {
        width: 440px;
        width: max-content;
        margin: 0 auto;
        background: none;
        border: none;

        .el-menu-item {
          color: #FFFFFF;
          width: 110px;
          text-align: center;
          padding: 0 20px;
          border: none;
          cursor: pointer;

          &:hover {
            background: $main-bg--hover-color;
            background: var(--main-bg--hover-color);
          }

          &.is-active {
            background: $main-bg--active-color;
            background: var(--main-bg--active-color);
            border: none;
            color: #FFFFFF;
          }

          > i {
            color: #ffffff;
          }
        }
      }

      .app-login {
        position: absolute;
        right: 20px;
        top: 0;
        height: 60px;
      }
    }

  }
</style>
