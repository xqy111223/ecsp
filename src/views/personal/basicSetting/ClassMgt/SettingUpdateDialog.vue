<template>
  <div class="setting-update-dialog">
    <el-dialog :visible.sync="visible" :title="dialogTitle" width="400px" :before-close="cancel">
      <div class="content-area">
        <p>请选择班级统一自动升级的时间点</p>
        <p>
          <el-date-picker
            v-model="timeValue"
            size="date-flat"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            value-format="timestamp"
            clearable
            :picker-options="pickerOptions"
            placeholder="选择日期时间">
          </el-date-picker>
        </p>
        <p>
          <el-radio v-model="radio" :label="0">仅适用于本学年</el-radio>
          <el-radio v-model="radio" :label="1">适用于每学年</el-radio>
        </p>
        <p class="color-disable">注：由于班级升级数据量比较大，可能会有些延迟。</p>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" @click="cancel">取 消</el-button>
          <el-button type="primary" size="mini" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/*
* Description SettingUpdateDialog
* Created By xuqingyu
* Created At 2019/12/3 10:17
*/
export default {
  name: 'SettingUpdateDialog',
  props: {
    confirmDialogForm: Function,
    visible: Boolean,
    dialogTitle: String,
    upgradeInfo: Object,
  },
  data () {
    return {
      timeValue: '',
      radio: 0,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        },
      }
    }
  },
  watch: {
    upgradeInfo: function (newV, oldV) {
      this.timeValue = newV.upgradeTime
      this.radio = newV.upgradeType
    }
  },
  methods: {
    /**
     * @description: 取消弹出层
     * @param arguments 描述
     * @returns {}
     */
    cancel () {
      this.$emit('update:visible', false)
    },
    /**
     * @description: 提交表单
     * @param arguments 描述
     * @returns {}
     */
    confirm () {
      const obj = {
        upgradeTime: this.timeValue,
        upgradeType: this.radio
      }
      this.confirmDialogForm(obj)
    },
  }
}
</script>

<style scoped lang="scss">
  .setting-update-dialog {
    .content-area {
      p {
        margin-bottom: 20px;
      }
    }
  }
</style>
