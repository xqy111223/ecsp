/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.02 16:57.
* @Author
* @Description 个人空间 - 应用管理 - 评论管理
**/
<template>
  <div class="user-management">
    <!-- 页头 -->
    <page-header></page-header>
    <!-- 查询条件 -->
    <div class="search-area">
      评论人：
      <el-input placeholder="请输入评论人" size="flat" v-model="listQuery.userName"></el-input>
      <span class="ml10">评论内容：</span>
      <el-input placeholder="请输入评论内容" size="flat" v-model="listQuery.commentContext"></el-input>
      <el-button @click="handleSearchClick" size="mini" type="success">查询</el-button>
    </div>
    <!-- 评论列表区域 -->
    <div class="table-area">
      <div class="table-total">
        共<span class="blue">{{total}}</span>条数据
        <span class="fr">
          <el-button @click="handleOperationClick('cancel')" class="no-radius ml20" size="mini" type="custom" v-show="showSelection">取消操作</el-button>
          <el-button @click="handleOperationClick('delete')" class="no-radius ml20" size="mini" type="custom" v-show="showSelection">确定删除</el-button>
          <el-button :disabled="showSelection" @click="handleOperationClick('batch')" class="no-radius ml20" size="mini" type="custom">批量删除</el-button>
        </span>
      </div>
      <!-- 评论列表 table 区域 -->
      <el-table :data="list" @selection-change="handleSelectionChange" header-row-class-name="table-header-default" ref="multipleTable" stripe>
        <el-table-column type="selection" v-if="showSelection" width="45"></el-table-column>

        <el-table-column label="评论时间" prop="createTime"></el-table-column>

        <el-table-column label="区域" prop="area"></el-table-column>

        <el-table-column label="评论人" prop="userName"></el-table-column>

        <el-table-column label="来源" prop="source"></el-table-column>

        <el-table-column label="内容" prop="content"></el-table-column>

        <el-table-column fixed="right" label="操作" width="90">
          <template slot-scope="scope">
            <a @click="handleDelClick(scope.row)" color="danger" type="btn">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination :current-page.sync="listQuery.pageNum" :hide-on-single-page="true" :page-size="listQuery.pageSize" :page-sizes="[10, 20, 30]" :pager-count="5" :total="total"
                     @current-change="handleCurrentChange" @handleSizeChange="handleSizeChange" background class="pagination-right" layout="prev, pager, next, sizes, jumper,slot">
        <el-button type="primary">确定</el-button>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'
import PageHeader from '@/components/personal/PageHeader/'
import { commentList, commentDel } from '@/api/personal/appMgt'

export default {
  name: 'commentMgt',
  props: {},
  components: { PageHeader },
  data () {
    return {
      total: 0, // 数据总数
      list: [],
      listQuery: {
        pageNum: 1, // 页码当前页
        pageSize: 10, // 页行数
        courseId: '', // 课程的ID
        userName: '', // 评论人姓名
        commentContext: '', // 评论内容
        baseAreaId: this.baseAreaId, // 区域ID
        // baseSchoolId: this.baseSchoolId, // 学校，非必填，仅当在学校平台管理评论的时填写
      },
      showSelection: false, // 批量删除
      multipleSelection: [], // 批量操作选中项
    }
  },
  computed: {
    ...mapGetters(['baseAreaId', 'baseSchoolId']),
  },
  created () {
    this.getCommentList()
  },
  methods: {
    /**
     * @description: 查询 - 按钮事件监听
     * @param  描述
     * @returns {}
     */
    handleSearchClick () {
      this.getCommentList()
    },
    /**
     *@Description
     *@Param
     *@Return 获取评论 - 列表.
     **/
    getCommentList () {
      commentList(this.listQuery).then(res => {
        res.list.map(val => {
          val.createTime = dayjs(val.createTime).format('YYYY-MM-DD HH:mm')
        })
        this.list = res.list
        this.total = res.total
      })
    },
    /**
     * @description: 点击批量删除按钮——操作表格
     * @param arguments 描述
     * @returns {}
     */
    handleOperationClick (type) {
      if (type === 'batch') { // 批量按钮
        this.showSelection = true
      } else if (type === 'delete') { // 删除按钮
        if (this.multipleSelection.length === 0) {
          this.$message.warning('请选择要删除的评论！')
          return false
        } else {
          this.commentDelete()
        }
      } else { // 取消操作
        this.showSelection = false
        this.$refs.multipleTable.clearSelection()
      }
    },
    /**
     * @description: table - 操作区域 - 删除事件
     * @param row 描述 roleId
     * @returns {}
     */
    handleDelClick (row) {
      this.commentDelete(row)
    },
    /**
     *@Description
     *@Param
     *@Return 删除 提示方法.
     **/
    commentDelete (row) {
      const params = {
        commentIdList: []
      }
      if (row) {
        const commentId = row.id
        params.commentIdList.push(commentId)
      } else {
        this.multipleSelection.forEach(val => {
          const commentId = val.id
          params.commentIdList.push(commentId)
        })
      }
      this.showConfirmBox({
        message: '是否确定删除？',
        title: '删除',
        type: 'warning',
        style: 2
      }).then((row) => {
        console.log('params:', params)
        commentDel(params).then(res => {
          this.$message.success('删除成功！')
        })
      }).catch(e => console.log('取消', e))
    },
    /**
     * @description: 监测selection筛选框的改变
     * @param arguments 描述
     * @returns {}
     */
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    /**
     * @description: 点击分页切换查询行数
     * @param arguments 描述
     * @returns {}
     */
    handleSizeChange (val) {
      this.listQuery.pageSize = val
    },
    /**
     * @description: 点击分页查询按钮
     * @param arguments 描述
     * @returns {}
     */
    handleCurrentChange (val) {
      this.listQuery.pageNum = val
    },
  }
}
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
