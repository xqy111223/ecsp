<template>
  <div class="Dialog">
    <el-dialog :visible.sync="visible" :title="dialogTitle"  width="500px" :before-close="cancel">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="rule-form">
          <el-form-item label="角色名称：" prop="roleName">
            <el-input
              type="text"
              placeholder="请输入角色名称"
              v-model="ruleForm.roleName"
              maxlength="10"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input
              type="textarea"
              placeholder="请输入备注"
              v-model="ruleForm.remark"
              maxlength="30"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="功能：">
            <el-checkbox-group v-model="ruleForm.permissionArray">
              <el-checkbox v-for="item in dialogFunctions" :label="item.permissionId" :key="item.permissionId">
                {{item.permissionName}}
              </el-checkbox>
            </el-checkbox-group>
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
* Description Dialog
* Created By xuqingyu
* Created At 2019/9/25 15:30
*/
export default {
  name: 'RoleMgtDialog',
  props: {
    visible: Boolean,
    dialogTitle: String,
    dialogFunctions: Array,
  },
  data () {
    return {
      ruleForm: {
        roleId: '',
        roleName: '',
        remark: '',
        permissionArray: []
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        remark: [
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('update:visible', false)
      // .nextTick后的方法将回调延迟到下次DOM更新循环之后执行
      this.$nextTick(() => {
        // 关闭对话框清除验证和表单内容
        this.$refs.ruleForm.resetFields()
      })
    },
    confirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('confirmDialogForm', this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    viewContent (rowInfo) {
      this.ruleForm.roleId = rowInfo.frontRoleId
      this.ruleForm.roleName = rowInfo.roleName
      this.ruleForm.remark = rowInfo.remark
      this.ruleForm.permissionArray = []
      rowInfo.permissionArray.forEach((val) => {
        this.ruleForm.permissionArray.push(val.permissionId)
      })
    },
  }
}
</script>

<style scoped lang="scss">
  .Dialog {
    .rule-form{
      .el-form-item:last-child{
        margin-bottom: -20px;
      }
    }
  }
</style>
