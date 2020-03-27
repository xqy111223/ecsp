<template>
  <div class="set-famous-dialog">
    <el-dialog :before-close="cancel" :title="dialogTitle" :visible.sync="visible" width="860px">
      <div>
        <el-form :inline="true" :model="queryParams" class="form-inline" label-width="85px">
          <el-form-item label="区域：">
            <select-region @change="handleAreaChange" v-model="queryParams.areaId"></select-region>
          </el-form-item>
          <el-form-item label="学校：">
            <school-select
              :getSearchList="getSearchSchoolList"
              @getSelectedId='searchSchoolId'>
            </school-select>
          </el-form-item>
          <el-form-item label="教师姓名：">
            <teacher-select
              :getSearchList="getTeacherListForSelected"
              @getSelectedId='searchTeacherName'>
            </teacher-select>
          </el-form-item>
        </el-form>
        <div :class="{'handle-list-area':true, 'empty-bg':!!!teacherList.length}">
          <el-pagination :current-page.sync="queryParams.index" :total="queryParams.total" class="fr mt10"
                         hide-on-single-page layout="prev,slot, next">
            <template v-slot>
              <span>{{queryParams.index}}/{{Math.ceil( queryParams.total / queryParams.size)}}</span>
            </template>
          </el-pagination>
          <el-checkbox-group @change="handleCheckedItems" v-model="checkedItems">
            <div class="layer-list">
              <div :key="item.baseUserId" class="layer-item" v-for="item in teacherList">
                <label v-if="item.baseUserId">
                  <img src="@/assets/images/000.png">
                  <div class="teacher-info">
                    <p>{{item.userName}}</p>
                    <p v-if="platformType === 0">{{item.baseSchoolName}}</p>
                  </div>
                  <el-checkbox :label="item.baseUserId" v-if="!item.flag">{{''}}</el-checkbox>
                  <span v-else class="selected-flag">已配</span>
                </label>
              </div>
            </div>
          </el-checkbox-group>
          <div class="result-arr mt10">
            <el-tag closable type="default" class="mr10"
                    @close="handleClose(item.baseUserId)"
                    v-for="item in checkedTeachers" :key="item.baseUserId">
              {{item.userName}}-{{platformType === 0 ? item.baseSchoolName : ''}}
            </el-tag>
          </div>
        </div>
      </div>
      <span class="dialog-footer" slot="footer">
          <el-button @click="cancel" size="mini" type="info">取 消</el-button>
          <el-button @click="confirm" size="mini" type="primary">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
/*
* Description setFamousDialog
* Created By xuqingyu
* Created At 2019/11/18 17:38
*/
import SchoolSelect from '@/views/personal/portalConfig/SchoolSelect'
import TeacherSelect from '@/views/personal/portalConfig/TeacherSelect'
import SelectRegion from '@/components/common/SelectRegion'
import { queryUserInfoList, searchSchoolList } from '@/api/personal/portalConfig'
import { getUserList } from '@/api/personal/userMgt'
import { mapGetters } from 'vuex'

export default {
  name: 'SetFamousDialog',
  components: { SchoolSelect, TeacherSelect, SelectRegion },
  props: {
    visible: Boolean,
    dialogTitle: String,
    famousIds: Array,
    confirmDialogForm: Function
  },
  created () {
  },
  computed: { // 在计算属性中获取state中的状态数据，数据改变后会自动更新
    ...mapGetters([
      'basePlatformId', // 平台id
      'platformType', // 0是区域,1是学校
      'baseAreaId', // 平台所属区域id
    ])
  },
  data () {
    return {
      checkedItems: [],
      queryParams: {
        areaId: '',
        schoolId: '',
        schoolName: '',
        userName: '',
        index: 1,
        total: 0,
        size: 16,
        isFamous: 1,
        userType: 3
      },
      teacherList: [],
      checkedTeachers: [],
    }
  },
  methods: {
    /**
     * @description: 点击选中标签中的关闭，取消选中
     * @param arguments 描述
     * @returns {}
     */
    handleClose (item) {
      this.checkedTeachers.splice(this.checkedItems.indexOf(item), 1)
      this.checkedItems.splice(this.checkedItems.indexOf(item), 1)
    },
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 区域事件监听.
     **/
    handleAreaChange () {
      this.getSearchSchoolList()
    },
    /**
     * @description: 查询教师列表，并添加是否已经是名师推荐后的标志flag
     * @param arguments 描述 schoolId或者userName必须有一个不为空，才会查询列表
     * @returns {}
     */
    async getSearchTeacherList () {
      const params = {
        areaId: this.queryParams.areaId || this.baseAreaId,
        schoolId: this.queryParams.schoolId,
        userName: this.queryParams.userName,
        isPaging: true,
        pageSize: this.queryParams.size,
        pageNum: this.queryParams.index,
        isFamous: this.queryParams.isFamous,
        userType: this.queryParams.userType,
        status: '',
      }
      if (!params.schoolId && !params.userName) {
        this.teacherList = []
      } else {
        const res = await getUserList(params)
        this.teacherList = res.list
        console.log('this.teacherList9999', this.teacherList)
        console.log('this.famousIds9999', this.famousIds)
        this.queryParams.total = res.total
      }
      this.teacherList && this.teacherList.forEach(val => {
        if (this.famousIds.includes(val.baseUserId)) {
          val.flag = true
        }
      })
    },
    /**
     * @description: 教师搜索框，搜索教师
     * @param val 描述
     * @returns {}
     */
    searchTeacherName (val) {
      this.queryParams.userName = val
      this.getSearchTeacherList()
    },
    /**
     * @description: 教师选择器查询教师列表
     * @param arguments 描述
     * @returns {}
     */
    async getTeacherListForSelected (query) {
      const params = {
        areaId: this.queryParams.areaId || this.baseAreaId,
        schoolId: this.queryParams.schoolId,
        userName: query || '',
        status: '',
        isFamous: this.queryParams.isFamous,
        userType: this.queryParams.userType
      }
      const res = await queryUserInfoList(params)
      return res
    },
    /**
     * @description: 监听学校筛选框，改变内容则查询教师列表
     * @param val 描述
     * @returns {}
     */
    searchSchoolId (val) {
      this.queryParams.schoolId = val
      if (val !== '') {
        this.getSearchTeacherList()
      }
    },
    /**
     * @description: 查询学校列表
     * @param arguments 描述
     * @returns {}
     */
    async getSearchSchoolList (query) {
      const params = {
        baseAreaId: this.queryParams.areaId || this.baseAreaId,
        schoolName: query || ''
      }
      const res = await searchSchoolList(params)
      return res
    },
    /**
     * @description: 点击选中头像selected框
     * @param arguments 描述
     * @returns {}
     */
    handleCheckedItems () {
      const selectedCount = this.famousIds.length
      const maxCount = 6 - selectedCount
      if (this.checkedItems.length > maxCount) {
        this.showMsgBox({
          message: `已配置${selectedCount}位名师，最多只能再添加${maxCount}位名师`,
          type: 'warning'
        })
        this.checkedItems.pop()
      } else {
        console.log('this.checkedItems1111', this.checkedItems)
        this.checkedTeachers = []
        this.checkedItems.filter(i => {
          this.teacherList.filter(item => {
            if (item.baseUserId === i) {
              this.checkedTeachers.push(item)
            }
          })
        })
        console.log('this.checkedTeachers', this.checkedTeachers)
      }
    },
    /**
     * @description: 点击取消按钮
     * @param arguments 描述
     * @returns {}
     */
    cancel () {
      this.$emit('update:visible', false)
      // .nextTick后的方法将回调延迟到下次DOM更新循环之后执行
    },
    /**
     * @description: 点击确定按钮，传出checkedItems中的id
     * @param arguments 描述
     * @returns {}
     */
    confirm () {
      console.log('this.checkedItems2222', this.checkedItems)
      this.confirmDialogForm(this.checkedItems)
      this.checkedItems = []
      this.teacherList = []
      this.checkedTeachers = []
      this.queryParams.total = 0
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./css.scss";
</style>
