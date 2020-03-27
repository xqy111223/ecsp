/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.27 08:56.
* @Author
* @Description 个人空间 - 入口
**/
<template>
  <div class="personal-container">
    <div class="personal-wrapper">
      <div class="personal-nav">
        <div class="personal-info-card">
          <div :class="[dropDown?'expand':(dropDown=== null?'':'collapse')]" class="card-background-top">
            <p class="info-address">
              <span class="address-name"><i class="el-icon-custom-place"></i>苏州</span>
              <span @click="toggle" class="personal-info-tips">
                个人信息<i class="el-icon-caret-bottom"></i>
              </span>
            </p>
            <div class="personal-name">
              <img class="personal-photoes" src="@/assets/images/000.png">
              <p :class="{blue : !dropDown}">宋小兵</p>
            </div>
            <ul class="personal-info-list" v-if="dropDown">
              <li><i class="el-icon-custom-user"></i>Songxiaobing</li>
              <li><i class="el-icon-custom-handset"></i>18962036742</li>
              <li><i class="el-icon-custom-mailbox"></i>627910516@qq.com</li>
            </ul>
          </div>
          <div class="card-background-bottom"></div>
        </div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo">
          <el-menu-item-group
            :index="index"
            :key="index"
            v-for='(item,index) in personalMenus'>
            <template slot="title">
              <i :class="[item.icon]" class="iconfont"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              :index="menu.alias"
              :key="index+'-'+i"
              @click="changeMenus(menu.alias)"
              v-for="(menu,i) in item.list">
              <span>{{ menu.title }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </div>
      <div class="personal-content">
        <router-view class=""/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PersonalCenter',
  props: {},
  data () {
    return {
      dropDown: null,
      activeIndex: ''
    }
  },
  created () {
    this.initSelected()
  },
  computed: {
    ...mapGetters(['personalMenus']),
  },
  mounted () {
    this.SET_MAIN_HEIGHT(null)
  },
  methods: {
    ...mapActions(['SET_MAIN_HEIGHT']),
    toggle: function () {
      this.dropDown = !this.dropDown
    },
    changeMenus (path) {
      this.activeIndex = path
      this.$router.push(path)
    },
    initSelected () {
      const path = this.$route.path
      if (path !== '/') {
        this.activeIndex = path
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .personal-container {
    overflow: hidden;
    background: #f6f7fb;
    .personal-wrapper {
      box-sizing: border-box;
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      padding-top: 30px;
      /* 个人中心*菜单----start------ */
      .personal-nav {
        float: left;
        overflow: hidden;
        width: 230px;
        padding-bottom: 50px;
        background: #ffffff;
        /* 个人信息列表----start--- */
        .personal-info-card {
          position: relative;
          height: auto;
          margin-bottom: 100px;
          color: #fff;
          .info-address {
            font-size: 12px;
            padding: 20px 10px 40px 20px;
          }
          .personal-info-tips {
            float: right;
            cursor: pointer;
          }
          .iconarrow-down, .iconarrow-up {
            font-size: 12px;
            margin-left: 5px;
          }
          .icon-place {
            margin-right: 5px;
          }
          .card-background-top {
            position: relative;
            z-index: 2;
            min-height: 100px;
            background: #4B8CFF url("~@/assets/images/left_info_bg.png") top center no-repeat;
            &.expand {
              animation: expand 1s;
              animation-fill-mode: forwards;
            }
            &.collapse {
              animation: collapse 1s;
              animation-fill-mode: forwards;
            }
            .personal-name {
              position: absolute;
              z-index: 99;
              top: 85px;
              left: 50%;
              margin-left: -30px;
              text-align: center;
              .personal-photoes {
                display: inline-block;
                width: 56px;
                height: 56px;
                border: 2px solid #fff;
                border-radius: 28px;
              }
              .blue {
                color: #347eff;
              }
              > p {
                font-size: 18px;
              }
            }
            .personal-info-list {
              margin-top: 104px;
              padding-left: 40px;
              list-style: none;
              > li {
                font-size: 12px;
                line-height: 32px;
                list-style: none;
                > i {
                  font-size: 12px;
                  margin-right: 5px;
                  color: #ddd;
                }
              }
            }
          }
          .card-background-bottom {
            position: absolute;
            z-index: 0;
            bottom: -102px;
            left: -15px;
            width: 260px;
            height: 80px;
            margin-bottom: 80px;
            transition-duration: 500ms;
            border-bottom-right-radius: 50%;
            border-bottom-left-radius: 50%;
            background: #4B8CFF;
          }
        }
        /* 个人信息列表---end-- */
        .el-menu {
          border-right: 0px;
          .el-menu-item-group .iconfont {
            margin-right: 12px;
          }
          .el-menu-item-group > .el-menu-item-group__title {
            font-size: 12px;
            line-height: 22px;
            height: 22px;
            color: #888;
          }
          .el-menu-item-group__title > span {
            line-height: 22px;
            display: inline-block;
            height: 22px;
          }
          .el-menu-item {
            line-height: 33px;
            height: 33px;
          }
          .el-menu-item:hover, .el-menu-item:focus {
            background-color: transparent;
          }
          .el-menu-item > span {
            line-height: 26px;
            display: block;
            height: 26px;
            margin-left: 15px;
            text-indent: 30px;
            color: #444;
            border-radius: 13px;
          }
          .el-menu-item:hover > span {
            background: #e5edfd;
          }
          .el-menu-item.is-active > span {
            color: #fff;
            background: #327aff;
          }
        }
      }
      /* 个人中心*菜单----end------ */
      .personal-content {
        float: right;
        box-sizing: border-box;
        width: 960px;
        min-height: 710px;
        padding: 10px;
        background: #ffffff;
      }
    }
    /*展开动画*/
    @keyframes expand {
      from {
        height: 95px;
      }
      to {
        height: 300px;
      }
    }
    /*收缩动画*/
    @keyframes collapse {
      from {
        height: 300px;
      }
      to {
        height: 95px;
      }
    }
  }
</style>
