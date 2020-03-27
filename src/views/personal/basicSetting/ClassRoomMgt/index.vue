<template>
  <div class="classroom-mgt">
    <page-header/>
    <div class="table-area">
      <div class="table-total">
        共<span class="blue">{{listData.total}}</span>条数据
        <span class="export-text-btn"><i class="el-icon-custom-export"></i>导出</span>
      </div>
      <el-table
        :data="listData.list"
        header-row-class-name="table-header-default"
        row-class-name="table-body-default"
        stripe
        style="width: 100%">
        <el-table-column
          label="教室名称"
          prop="roomName">
        </el-table-column>
        <el-table-column
          label="绑定班级"
          prop="bindClass"
          width="340">
          <template slot-scope="scope">
            <span v-if="scope.row.bindClass">{{scope.row.bindClass.gradeName + scope.row.bindClass.className}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="学生人数"
          prop="studentNum">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status"
          width="250">
          <template slot-scope="scope">
            <span class="status-normal" v-if="scope.row.status === 0">正常</span>
            <span class="status-closed" v-else>关闭</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="140">
          <template slot-scope="scope">
            <a @click="clickBtnEdit(scope.row)" color="primary" type="btn">编辑</a>
            <a @click="clickBtnBindClass(scope.row)" color="primary" type="btn">{{scope.row.bindClass ? '取消绑定' :
              '绑定班级'}}</a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="queryParams.pageNum"
        :hide-on-single-page="true" :page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 30]"
        :pager-count="5"
        :total="listData.total"
        @current-change="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        background
        class="pagination-right"
        layout="prev, pager, next, sizes, jumper,slot">
        <el-button type="primary">确定</el-button>
      </el-pagination>
    </div>
    <el-dialog
      :before-close="handleClose"
      :visible.sync="visible"
      title="编辑教室"
      width="420px">
      <el-form :model="ruleForm" :rules="rules" class="rule-form" ref="editRuleForm" label-width="100px">
        <el-form-item label="教室名称：" prop="roomName">
          <el-input
            maxlength="20"
            placeholder="请输入教室名称"
            size="date-flat"
            type="text"
            v-model="ruleForm.roomName"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="0">开启</el-radio>
            <el-radio :label="1">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学生人数：" prop="studentNum">
          <el-input placeholder="学生人数不能超过500" size="date-flat" v-model.number="ruleForm.studentNum"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="submitForm('editRuleForm')" size="mini" type="primary">确 定</el-button>
        <el-button @click="handleClose" size="mini">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      title="绑定班级"
      width="620px">
      <div class="class-selected-area">
        <div class="bd1-blue">
          <el-radio-group v-model="schoolClassId">
            <el-radio v-for="item in gradeList" @change="selectedSchoolClass(item)" :label="item.schoolClassId"
                      :key="item.schoolClassId">{{(item.gradeCustomName ? item.gradeCustomName : item.gradeName) +
              item.className}}
            </el-radio>
          </el-radio-group>
        </div>
        <div class="mt20">
          <el-tag closable type="default" v-if="schoolClassItem" @close="deleteSelectedClass">
            {{(schoolClassItem.gradeCustomName ? schoolClassItem.gradeCustomName : schoolClassItem.gradeName) +
            schoolClassItem.className}}
          </el-tag>
        </div>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button @click="settingBindClass" size="mini" type="primary">确 定</el-button>
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/*
* Description index
* Created By xuqingyu
* Created At 2019/10/15 13:37
*/
import PageHeader from '@/components/personal/PageHeader/index'
import { getClassroomDetail, getClassroomList, submitBindClass, submitEditClassroom } from '@/api/personal/basicSetting'
import { mapGetters } from 'vuex'

export default {
  name: 'ClassRoomMgt',
  components: { PageHeader },
  props: {},
  data () {
    const checkStudentNum = (rule, value, callback) => {
      if (value > 500) {
        callback(new Error('学生人数不能超过500'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      visible: false,
      DialogTitle: '', // 弹出层标题
      queryParams: {
        isPaging: true, // 是否分页，true/false
        pageNum: 1, // 页码当前页
        pageSize: 20, // 页行数
        baseSchoolId: '', // 平台ID
      },
      listData: [], // 表格数据
      ruleForm: {
        roomName: '', // 教室名称string
        studentNum: '', // 学生人数number
        status: '', // 状态number
        baseClassroomId: '' // 教室ID，必填number
      },
      rules: {
        roomName: [
          { required: true, min: 1, max: 20, message: '请输入名教室称', trigger: 'blur' },
        ],
        status: [],
        studentNum: [
          { validator: checkStudentNum, trigger: 'blur' },
        ]
      },
      baseClassroomId: '', // 绑定班级时，教室ID,必填number
      schoolClassId: '', // 绑定班级时，班级ID,number
      schoolClassItem: '', // 绑定班级时，操作的班级信息
      gradeList: [
        {
          className: '1班',
          gradeCustomName: '二年级X',
          gradeId: 11,
          gradeName: '二年级',
          schoolClassId: 156,
        }, {
          className: '2班',
          gradeCustomName: '二年级X',
          gradeId: 12,
          gradeName: '二年级',
          schoolClassId: 157,
        }, {
          className: '1班',
          gradeCustomName: '',
          gradeId: 13,
          gradeName: '三年级',
          schoolClassId: 158,
        }, {
          className: '2班',
          gradeCustomName: '三年级X',
          gradeId: 14,
          gradeName: '三年级',
          schoolClassId: 159,
        }], // 年级班级数据
    }
  },
  created () {
    this.initTableData()
  },
  computed: { // 在计算属性中获取state中的状态数据，数据改变后会自动更新
    ...mapGetters([
      'baseSchoolId', // 学校id
    ])
  },
  methods: {
    /**
     * @description: 设置/取消——绑定班级——请求（同一个）接口——刷新列表
     * @param arguments 描述
     * @returns {}
     */
    async settingBindClass () {
      // console.log('绑定班级', this.baseClassroomId, this.schoolClassId)
      await submitBindClass(this.baseClassroomId, this.schoolClassId)
      this.dialogVisible = false
      this.initTableData()
    },
    /**
     * @description: 点击X删除选中的班级——选项
     * @param arguments 描述
     * @returns {}
     */
    deleteSelectedClass () {
      this.schoolClassItem = ''
      this.schoolClassId = ''
    },
    /**
     * @description: 选中绑定的班级——选项
     * @param item 描述
     * @returns {}
     */
    selectedSchoolClass (item) {
      this.schoolClassItem = item
    },
    /**
     * @description: 点击——绑定班级/取消绑定——按钮——显示弹出层
     * @param arguments 描述
     * @returns {}
     */
    clickBtnBindClass (rowInfo) {
      this.baseClassroomId = rowInfo.baseClassroomId
      this.schoolClassItem = ''
      this.schoolClassId = ''
      if (rowInfo.bindClass) {
        this.showConfirmBox({
          message: [
            '您是否需要取消',
            { text: `“${rowInfo.roomName}”`, type: 'primary' },
            '与',
            { text: `“${rowInfo.bindClass.gradeName + rowInfo.bindClass.className}”`, type: 'primary' },
            '的绑定关系，',
            '"',
            {
              text: '解绑操作无法恢复',
              type: 'danger'
            },
            '"',
            '，您是否还要继续？'
          ],
          title: '取消绑定',
          type: 'warning',
          style: 3
        }).then(() => {
          this.schoolClassId = ''
          this.settingBindClass()
          // console.log('取消绑定成功')
        }).catch(() => {
          // console.log('取消操作')
        })
      } else {
        this.dialogVisible = true
      }
    },
    /**
     * @description: 点击编辑用户——获取该行数据详情信息
     * @param rowInfo 行信息
     * @returns {}
     */
    async clickBtnEdit (rowInfo) {
      const res = await getClassroomDetail(rowInfo.baseClassroomId)
      this.ruleForm.baseClassroomId = rowInfo.baseClassroomId
      this.ruleForm = { ...this.ruleForm, ...res }
      this.visible = true
    },
    /**
     * @description: 编辑教室——提交——接口请求,刷新列表数据
     * @param arguments 描述
     * @returns {}
     */
    async editClassroomSubmit () {
      const params = { ...this.ruleForm }
      // console.log('编辑params', params)
      await submitEditClassroom(params)
      this.initTableData()
    },
    /**
     * @description: 弹出层——编辑班级——确认提交按钮
     * @param arguments 描述
     * @returns {}
     */
    async submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editClassroomSubmit()
          this.visible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * @description: 弹出层取消操作
     * @param arguments 描述
     * @returns {}
     */
    handleClose () {
      this.visible = false
      this.dialogVisible = false
      this.$refs.editRuleForm.resetFields()
    },
    /**
     * @description: 点击分页切换查询行数
     * @param arguments 描述
     * @returns {}
     */
    handleSizeChange (val) {
      this.pageSize = val
      this.initTableData()
    },
    /**
     * @description: 点击分页查询按钮
     * @param arguments 描述
     * @returns {}
     */
    handleCurrentChange (val) {
      this.pageNum = val
      this.initTableData()
    },
    /**
     * @description: 查询表格数据
     * @param arguments 描述
     * @returns {}
     */
    async initTableData () {
      this.queryParams.baseSchoolId = this.schoolClassId
      const params = { ...this.queryParams }
      const res = await getClassroomList(params)
      this.listData = res
    },
  }
}
</script>

<style lang="scss" scoped>
  .classroom-mgt {
    .bd1-blue {
      border: 1px solid #ddd;

      /deep/ .el-radio {
        margin: 10px;
      }
    }

    .mt20 {
      margin-top: 20px;
    }

    .margin-10 {
      margin: auto 10px;
    }

    .fr {
      float: right;
    }

    .table-total {
      font-size: 12px;
      color: #666;
      margin-top: 20px;
      margin-bottom: 10px;

      .blue {
        color: #347eff;
      }
    }

    .search-area {
      @extend .margin-10;
      padding-top: 20px;
      border-bottom: 1px dashed #dcdcdc;
    }

    .table-area {
      @extend .margin-10;

      .export-text-btn {
        @extend .fr;
        font-size: 14px;
        color: #666;
        cursor: pointer;

        .iconfont {
          font-size: 14px;
          margin-right: 5px;
          color: #999;
        }
      }
    }

    /deep/ .el-table__row {
      height: 40px;

      .cell {
        white-space: nowrap;
      }

      .status-normal, .status-closed {
        position: relative;
        padding-left: 10px;
      }

      .status-normal::before, .status-closed::before {
        position: absolute;
        left: 0;
        top: 50%;
        display: inline-block;
        margin-top: -3px;
        width: 6px;
        height: 6px;
        content: '';
        background-color: #61ca93;
        border-radius: 3px;
      }

      .status-closed::before {
        background-color: #BBB;
      }

      /deep/ .el-table__row a[type=btn] {
        margin: 0px 5px;
      }
    }

    .pagination-right {
      margin-top: 40px;
      text-align: right;
    }
  }
</style>
