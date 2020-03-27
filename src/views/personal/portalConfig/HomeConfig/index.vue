<template>
  <div class="hone-config">
    <page-header></page-header>
    <div class="pd10">
      <p class="title-p">
        <span class="font-small">■</span>头部配置
      </p>
      <div class="checked-area">
        <span v-if="platformType === 0">
          <el-radio v-model="radio" label="0" @change="changeConfig">地图</el-radio>
          <el-radio v-model="radio" label="1" @change="changeConfig">banner图</el-radio>
        </span>
        <el-button size="mini" type="custom" class="no-radius fr" v-if="radio === '1'" @click="changeEnableBanner">
          <span v-if="enabledBanner === false">拖动排序</span>
          <span v-else>完成排序</span>
        </el-button>
      </div>
      <div class="map-area" v-if="radio === '0'">
        <img src="@/assets/images/map_icon.png">注：地图信息根据系统配置显示
      </div>
      <draggable
        :list="bannerList"
        :disabled="!enabledBanner"
        @start="dragging = true"
        @end="checkMoveBanner"
        class="drag-area" v-if="radio === '1'">
        <div :class="{'drag-item' :true, active:enabledBanner}" v-for="item in bannerList" :key="item.sort">
          <img v-if="item.id" src="@/assets/images/banner.jpg">
          <div v-if="item.id" class="layer-edit">
            <el-button size="mini" type="custom" round @click="clickBtnDeleteBanner(item.id)">删除</el-button>
            <el-button size="mini" type="custom" round @click="editBannerBtn(item)">编辑</el-button>
          </div>
          <div v-if="!item.id" class="layer-add" @click="addBannerBtn(item)">
            <i class="el-icon-custom-add"></i>
            <p>添加图片</p>
          </div>
        </div>
      </draggable>
      <p class="color-disable" v-if="radio === '1'">
        <span v-if="draggableFlag(bannerList)">注：系统已为您提供默认Banner图</span>
        <span v-if="enabledBanner === true"><i class="el-icon-custom-invalid-course color-primary"></i>选中Banner图移动，可以调整Banner图位置</span>
      </p>
      <p class="title-p">
        <span class="font-small">■</span>名师推荐
        <el-button size="mini" type="custom" class="no-radius fr" @click="changeEnable">
          <span v-if="enabled === false">拖动排序</span>
          <span v-else>完成排序</span>
        </el-button>
      </p>
      <draggable
        :list="teacherList"
        :disabled="!enabled"
        @start="dragging = true"
        @end="checkMoveFamous"
        class="drag-area drag-area-teacher">
        <div :class="{'drag-item' :true, active:enabled}" v-for="item in teacherList" :key="item.sort">
          <img v-if="item.id" :src="item.headPicUrl ? item.headPicUrl : ''" :onerror="errorHeadPic">
          <div v-if="item.id" class="teacher-info">
            <p>{{item.userName}}</p>
            <p v-if="platformType === 0">{{item.schoolName}}</p>
          </div>
          <div v-if="item.id" class="layer-edit">
            <el-button size="mini" type="custom" round @click="clickBtnDeleteFamous(item.id)">移出</el-button>
          </div>
          <div v-if="!item.id" class="layer-add" @click="addFamousBtn(item.sort)">
            <i class="el-icon-custom-add"></i>
            <p>添加名师</p>
          </div>
        </div>
      </draggable>
      <p class="color-disable">
        <span v-if="enabled === false">注：若少于4位名师，则首页不展示“名师推荐”区域</span>
        <span v-else><i class="el-icon-custom-invalid-course color-primary"></i>选中头像移动，可以调整名师位置</span>
      </p>
    </div>
    <set-banner-dialog
      :visible.sync="bannerVisible"
      :confirmDialogForm="confirmDialogForm"
      :bannerItem="bannerItem"
      :dialog-title="bannerDialogTitle">
    </set-banner-dialog>
    <set-famous-dialog
      :visible.sync="famousVisible"
      :famous-ids="famousIds"
      :confirmDialogForm="confirmSetFamous"
      :dialog-title="famousDialogTitle">
    </set-famous-dialog>
  </div>
</template>
<script>
/*
* Description index
* Created By xuqingyu
* Created At 2019/11/5 11:32
*/
import {
  getBannerConfig,
  getBannerList,
  getFamousList,
  setBannerConfig,
  submitAddBanner,
  submitAddFamous,
  submitDeleteBanner,
  submitDeleteFamous,
  submitEditBanner,
  submitExchangeBanner,
  submitExchangeFamous,
} from '@/api/personal/portalConfig'
import PageHeader from '@/components/personal/PageHeader/index'
import draggable from 'vuedraggable'
import SetBannerDialog from './SetBannerDialog'
import SetFamousDialog from './SetFamousDialog'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeConfig',
  props: {},
  components: { SetBannerDialog, SetFamousDialog, PageHeader, draggable },
  data () {
    return {
      bannerVisible: false,
      bannerDialogTitle: '',
      famousVisible: false,
      famousDialogTitle: '',
      radio: 0,
      enabledBanner: false,
      enabled: false,
      dragging: '',
      bannerList: [],
      teacherList: [],
      bannerItem: {},
      teacherItem: {},
      famousIds: [],
      addFamousSort: '',
    }
  },
  filters: {},
  async created () {
    await this.getHeadConfig()
    this.initBannerList()
    this.initFamousList()
  },
  computed: { // 在计算属性中获取state中的状态数据，数据改变后会自动更新
    ...mapGetters([
      'basePlatformId', // 平台id
      'platformType', // 0是区域,1是学校
    ]),
    /**
     * @description:图片加载失败时添加默认图片
     * */
    errorHeadPic () {
      return 'this.src="' + require('@/assets/images/000.png') + '"'
    }
  },
  watch: {},
  methods: {
    /**
     * @description: 设置Banner配置项,展示地图 Or Banner
     * @param arguments 描述
     * @returns {}
     */
    async changeConfig (v) {
      const params = {
        basePlatformId: this.basePlatformId,
        configValue: parseInt(v)
      }
      try {
        await setBannerConfig(params)
        this.radio = v
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
    },
    /**
     * @description: 获取Banner配置项,展示地图 Or Banner
     * @param arguments 描述
     * @returns {}
     */
    async getHeadConfig () {
      const res = await getBannerConfig({ basePlatformId: this.basePlatformId })
      if (res) {
        this.radio = res.configValue.toString()
      }
    },
    /**
     * @description: 提交添加名师确认按钮弹窗——设置名师
     * @param arguments 描述
     * @returns {}
     */
    async confirmSetFamous (ids) {
      const params = {
        basePlatformId: this.basePlatformId,
        famousTeacher: []
      }
      if (ids.length === 1) {
        params.famousTeacher.push({ teacherId: ids[0], sort: this.addFamousSort })
      } else {
        const emptyArr = []
        this.teacherList.forEach(item => {
          if (item.id === '') {
            emptyArr.push(item.sort)
          }
        })
        ids.forEach((val, index) => {
          params.famousTeacher.push({ teacherId: val, sort: emptyArr[index] })
        })
      }
      // console.log('设置名师params', params)
      try {
        await submitAddFamous(params)
        await this.initFamousList()
      } catch (e) {
        this.$message({
          message: e.message,
          type: 'error'
        })
      }
      this.famousVisible = false
    },
    /**
     * @description: 点击移出名师按钮，确定
     * @param row 描述
     * @returns {}
     */
    clickBtnDeleteFamous (id) {
      this.showConfirmBox({
        message: '是否确定删除？',
        title: '删除',
        type: 'warning',
        style: 0
      }).then(async () => {
        await submitDeleteFamous({ id: id })
        await this.initFamousList()
      }).catch(e => {
        this.$message({
          message: e.message,
          type: 'error'
        })
      })
    },
    /**
     * @description: 点击删除banner按钮，确定
     * @param row 描述
     * @returns {}
     */
    clickBtnDeleteBanner (row) {
      this.showConfirmBox({
        message: '是否确定删除？',
        title: '删除',
        type: 'warning',
        style: 0
      }).then(() => {
        console.log('删除id', row)
        submitDeleteBanner(row)
      }).catch(e => console.log('取消', e))
    },
    /**
     * @description: 提交添加或编辑按钮
     * @param formInfo 描述
     * @returns {}
     */
    async confirmDialogForm (params) {
      if (params.id === '') {
        await submitAddBanner(params)
        this.bannerVisible = false
      } else {
        await submitEditBanner(params)
        this.bannerVisible = false
      }
    },
    /**
     * @description: 点击编辑Banner按钮
     * @param arguments 描述
     * @returns {}
     */
    editBannerBtn (item) {
      this.bannerVisible = true
      this.bannerDialogTitle = '编辑banner'
      this.bannerItem = item
      console.log('this.bannerItem', this.bannerItem)
    },
    /**
     * @description: 点击添加banner按钮
     * @param arguments 描述
     * @returns {}
     */
    addBannerBtn (item) {
      this.bannerVisible = true
      this.bannerDialogTitle = '新增banner'
      this.bannerItem = item
      // console.log('this.bannerItem', this.bannerItem)
    },
    /**
     * @description: 点击添加名师按钮
     * @param arguments 描述
     * @returns {}
     */
    addFamousBtn (val) {
      this.famousVisible = true
      this.famousDialogTitle = '新增名师'
      this.addFamousSort = val
      console.log('this.addFamousSort', this.addFamousSort)
    },
    /**
     * @description: 提交移动名师接口
     * @param arguments 描述
     * @returns {}
     */
    async submitMoveFamous (params) {
      try {
        await submitExchangeFamous(params)
      } catch (e) {
        this.showMsgBox({
          message: `${e.message}`,
          type: 'warning'
        })
        await this.initFamousList()
      }
    },
    /**
     * @description: 提交移动banner接口
     * @param arguments 描述
     * @returns {}
     */
    async submitMoveBanner (params) {
      await submitExchangeBanner(params)
      // const res = await submitExchangeBanner(params)
      // console.log('结果', res)
      // await this.initBannerList()
    },
    /**
     * @description: 点击拖动排序或完成排序，激活或锁定排序
     * @param arguments 描述
     * @returns {}
     */
    changeEnableBanner () {
      this.enabledBanner = !this.enabledBanner
    },
    /**
     * @description: 点击拖动图片保存
     * @param arguments 描述
     * @returns {}
     */
    checkMoveBanner (e) {
      const params = {
        basePlatformId: this.basePlatformId,
        moveBanner: {
          id: '',
          sort: ''
        },
        moveToBanner: {
          id: '',
          sort: ''
        }
      }
      const oldId = this.bannerList[e.newIndex].id
      const newId = this.bannerList[e.oldIndex].id
      if (oldId !== '' && newId !== '') {
        params.moveBanner.id = oldId
        params.moveBanner.sort = e.oldIndex + 1
        params.moveToBanner.id = newId
        params.moveToBanner.sort = e.newIndex + 1
        this.submitMoveBanner(params)
      } else if (oldId === '' && newId !== '') {
        params.moveBanner.id = newId
        params.moveBanner.sort = e.newIndex + 1
        params.moveToBanner.id = oldId
        params.moveToBanner.sort = e.oldIndex + 1
        this.submitMoveBanner(params)
      } else if (oldId !== '' && newId === '') {
        params.moveBanner.id = oldId
        params.moveBanner.sort = e.oldIndex + 1
        params.moveToBanner.id = newId
        params.moveToBanner.sort = e.newIndex + 1
        this.submitMoveBanner(params)
      } else {
        this.dragging = false
        return
      }
      this.dragging = false
    },
    /**
     * @description: 根据id判断是否列表有值
     * @param arr 描述
     * @returns {}
     */
    draggableFlag (arr) {
      const Arr = arr.filter(item =>
        item.id !== ''
      )
      const flag = !!Arr.length
      return !flag
    },
    /**
     * @description: 名师推荐拖动排序，激活按钮
     * @param arguments 描述
     * @returns {}
     */
    changeEnable () {
      this.enabled = !this.enabled
    },
    /**
     * @description: 名师推荐，检查排序结果请求接口保存
     * @param arguments 描述
     * @returns {}
     */
    checkMoveFamous (e) {
      const params = {
        basePlatformId: this.basePlatformId,
        moveFamous: {
          id: '',
          sort: '',
        },
        moveToFamous: {
          id: '',
          sort: '',
        },
      }
      // 拖动结束触发事件时，this.teacherList数据已经更新
      const oldId = this.teacherList[e.newIndex].id
      const newId = this.teacherList[e.oldIndex].id
      if (oldId !== '') {
        // 如果拖动的对象不为空，不管目标位置是否为空，参数正常使用
        params.moveFamous.id = oldId
        params.moveFamous.sort = e.oldIndex + 1
        params.moveToFamous.id = newId
        params.moveToFamous.sort = e.newIndex + 1
        console.log('movefamous', params)
        this.submitMoveFamous(params)
      } else if (oldId === '' && newId !== '') {
        // 如果拖动的对象为空，目标对象不为空，参数交换使用
        params.moveFamous.id = newId
        params.moveFamous.sort = e.newIndex + 1
        params.moveToFamous.id = oldId
        params.moveToFamous.sort = e.oldIndex + 1
        console.log('movefamous', params)
        this.submitMoveFamous(params)
      } else {
        // 如果拖动的对象为空，目标对象也为空，不请求接口
        this.dragging = false
        return
      }
      this.dragging = false
    },
    /**
     * @description: 初始化，获取banner列表
     * @param  描述
     * @returns {}
     */
    async initBannerList () {
      const params = {}
      params.basePlatformId = this.basePlatformId
      const res = await getBannerList()
      const Arr = [1, 2, 3, 4, 5]
      this.bannerList = Arr.map(item => {
        return { id: '', picUrl: '', jumpUrl: '', mobileUrl: '', sort: item }
      })
      this.bannerList.forEach((item) => {
        res.filter((i) => {
          if (item.sort === i.sort) {
            item.id = i.id
            item.picUrl = i.picUrl
            item.jumpUrl = i.jumpUrl
            item.mobileUrl = i.mobileUrl
          }
        })
      })
      // console.log('this.bannerList', this.bannerList)
    },
    /**
     * @description: 初始化名师列表
     * @param arguments 描述
     * @returns {}
     */
    async initFamousList () {
      const params = {
        basePlatformId: this.basePlatformId
      }
      const res = await getFamousList(params)
      const Arr = [1, 2, 3, 4, 5, 6]
      this.teacherList = Arr.map(item => {
        return { baseUserId: '', headPicUrl: '', id: '', schoolId: '', schoolName: '', sort: item, userName: '' }
      })
      this.famousIds = []
      this.teacherList.forEach((item) => {
        res.filter((i) => {
          if (item.sort === i.sort) {
            item.id = i.id
            item.baseUserId = i.baseUserId
            item.headPicUrl = i.headPicUrl
            item.schoolId = i.schoolId
            item.schoolName = i.schoolName
            item.userName = i.userName
            this.famousIds.push(i.baseUserId)
          }
        })
      })
      console.log('this.teacherList', this.teacherList)
      console.log('famousIds', this.famousIds)
    }
  }
}
</script>
<style scoped lang="scss">
  @import './css.scss';
</style>
