<template>
  <div class="selected-subject-dialog">
    <el-dialog :visible.sync="visible" :title="dialogTitle" width="450px" :before-close="cancel">
      <el-checkbox-group v-model="checkList" class="subject-list">
        <el-checkbox v-for="item in subjectOptions" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" @click="cancel">取 消</el-button>
          <el-button type="primary" size="mini" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/*
* Description SelectedSubjectDialog.vue
* Created By xuqingyu
* Created At 2019/12/2 16:12
*/
import { querySubjectOptions } from '@/api/personal/basicSetting'

export default {
  name: 'SelectedSubjectDialog',
  props: {
    dialogTitle: String,
    confirmDialogForm: Function,
    visible: Boolean,
    rowSubjectIds: Array,
    rowTeacherId: Number,
  },
  data () {
    return {
      subjectOptions: [],
      checkList: []
    }
  },
  created () {
    this.getSubjectOptions()
  },
  watch: {
    rowSubjectIds: function (newV, oldV) {
      this.checkList = newV
    }
  },
  methods: {
    /**
     * @description: 学科选项包括本校全部学科，默认勾选该教师的学科
     * @param arguments 至少选择一个学科，才能【确定】，否则提示：至少选择一个学科
     * 如果勾选的学科已有任课教师，则自动将原任课教师的该学科取消掉，如果原任课教师没有任何学科了，则自动将原任课教师从该班级移除
     * @returns {}
     */
    async getSubjectOptions () {
      const params = {
        schoolId: this.baseSchoolId,
        type: 'SBUJECT'
      }
      const subjectList = await querySubjectOptions(params)
      subjectList.forEach(item => {
        this.subjectOptions.push({ value: item.id, label: item.name })
      })
      // console.log('this.subjectOptions', this.subjectOptions)
    },
    /**
     * @description: 取消弹出层
     * @param arguments 描述
     * @returns {}
     */
    cancel () {
      this.$emit('update:visible', false)
      // .nextTick后的方法将回调延迟到下次DOM更新循环之后执行
    },
    /**
     * @description: 提交表单
     * @param arguments 描述
     * @returns {}
     */
    confirm () {
      if (this.checkList.length < 1) {
        this.showConfirmBox({
          message: '至少选择一个学科',
          title: '提示',
          style: 0,
          type: 'warning',
        }).then(() => {
        }).catch(e => console.log('取消', e))
      } else {
        const obj = {
          subjectInfo: this.checkList,
          userId: this.rowTeacherId
        }
        this.confirmDialogForm(obj)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .selected-subject-dialog {
    .subject-list {
      .el-checkbox {
        display: inline-block;
        min-width: 25%;
        margin-bottom: 20px;
      }
    }
  }
</style>
