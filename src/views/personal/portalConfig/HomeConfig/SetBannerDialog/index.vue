<template>
  <div class="set-banner-dialog">
    <el-dialog :visible.sync="visible" :title="dialogTitle" width="668px" :before-close="cancel">
      <el-form :model="formInline" :rules="rules" ref="ruleForm">
        <p>
          Banner图：
          <el-checkbox v-if="!!picUrl" v-model="phoneSet" class="fr">手机端banner设置</el-checkbox>
        </p>
        <div :class="{'img-area':true, 'img-empty':!!!picUrl, 'img-phone-set':phoneSet}">
          <el-button size="mini" type="custom" class="no-radius upload-btn" v-if="!phoneSet">
            <span v-if="picUrl"><i class="el-icon-refresh-right"></i>重新上传</span>
            <span v-else>上传图片</span>
            <input ref="inputFile" type="file" class="input-hidden" @change="selectedImg"
                   accept="image/jpeg,image/png,image/bmp">
          </el-button>
          <p class="empty-tips color-disable font-small" v-if="!phoneSet">
            注：建议尺寸1920*480px,仅支持JPG、PNG、BMP格式的图片，且文件小于5M</p>
          <div v-if="picUrl" class="phone-img-area"></div>
          <div v-drag="calculationImg" class="drag-div" :style="{left: x + 'px'}"></div>
          <img ref="loadedImg" class="pic-img" v-if="picUrl" :src="picUrl">
        </div>
        <canvas ref="imgCanvas" width="1920" height="480" class="img-canvas"></canvas>
        <canvas ref="mobileCanvas" width="1140" height="480" class="img-canvas2"></canvas>
        <p class="color-disable" v-if="(phoneSet === true && !!picUrl)"><i
          class="el-icon-custom-invalid-course color-primary"></i>左右拖动选框设置手机端banner</p>
        <p class="url-title">链接地址:</p>
        <el-form-item prop="aUrl">
          <el-input v-model="formInline.aUrl" prop="aUrl" class="pic-url" placeholder="请输入链接地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="info" size="mini" @click="cancel">取 消</el-button>
          <el-button type="primary" size="mini" @click="confirm('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
/*
* Description SetBannerDialog
* Created By xuqingyu
* Created At 2019/11/20 9:30
*/
import { isDomain } from '@/utils/validate'

export default {
  name: 'SetBannerDialog',
  props: {
    visible: Boolean,
    dialogTitle: String,
    confirmDialogForm: Function,
    bannerItem: Object
  },
  watch: {
    bannerItem (newVal, oldVal) {
      this.formInline.aUrl = newVal.jumpUrl
      this.formInline.id = newVal.id
      this.phoneSet = !!(newVal.mobileUrl)
      this.picUrl = newVal.picUrl
      this.sort = newVal.sort
      this.x = 122
    }
  },
  data () {
    const validateUrl = (rule, value, callback) => {
      const val = value.trim()
      if (val && !isDomain(val)) {
        callback(new Error('链接地址不正确！'))
      } else {
        callback()
      }
    }
    return {
      formInline: {
        aUrl: '',
        id: '',
        sort: '',
      },
      phoneSet: false,
      picUrl: '',
      mobileUrl: '',
      x: 122, // 默认X轴裁切位置
      y: 0, // 默认Y轴裁切位置
      rules: {
        aUrl: [
          { validator: validateUrl, trigger: 'blur' }
        ],
      }
    }
  },
  // 自定义指令
  directives: {
    drag: { // drag自定义指令
      bind: function (el, binding) {
        const odiv = el// el 当前元素
        odiv.onmousedown = (e) => {
          e.preventDefault()
          const disX = e.clientX - odiv.offsetLeft
          // const disY = e.clientY - odiv.offsetTop
          let left = e.clientX - disX
          let top = 0
          document.onmousemove = (e) => {
            e.stopPropagation()
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            left = e.clientX - disX
            if (left <= 0) {
              left = 0
            } else if (left >= 242) {
              left = 242
            }
            top = 0
            // 移动当前元素
            odiv.style.left = left + 'px'
            odiv.style.top = top + 'px'
            // 将此时的位置传出去
            // binding.value({ x: left, y: top })
          }
          document.onmouseup = (e) => {
            // 将此时的位置传出去
            binding.value({ x: left, y: top })
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  },
  methods: {
    /**
     * @description: canvas绘制原始图片为标准图片，保存并上传
     * @param x 描述
     * @returns {}
     */
    screenImg (x, y) {
      const myCanvas = this.$refs.imgCanvas
      const ctx = myCanvas.getContext('2d')
      const img = this.$refs.loadedImg
      // 清除画布
      ctx.clearRect(0, 0, 1920, 480)
      // canvas绘制原始图片为1920*480保存
      ctx.drawImage(img, 0, 0, 1920, 480)
      // canvas转为blob上传pc端canvas绘图和手机端截图
      // myCanvas.toBlob(function (blob) {
      //   // 图片ajax上传
      //   const xhr = new XMLHttpRequest()
      //   // 文件上传成功
      //   xhr.onreadystatechange = function () {
      //     if (xhr.status === 200) {
      //       // xhr.responseText就是返回的数据
      //     }
      //   }
      //   // 开始上传
      //   xhr.open('POST', 'upload.php', true)
      //   xhr.send(blob)
      // }, this.$refs.inputFile.files[0].type || 'image/png')
      // 勾选手机端banner设置,截图保存
      if (this.phoneSet) {
        const mobileCanvas = this.$refs.mobileCanvas
        const mobileCtx = mobileCanvas.getContext('2d')
        // 截图比例计算,保存myCanvas图片尺寸为1920*480，屏幕显示比例为600*150,实际/显示=3.2
        const cx = 3.2 * x
        const cy = 3.2 * y
        // 清除画布
        mobileCtx.clearRect(0, 0, 1920, 480)
        // canvas根据绘制的原始图片的canvas图片为源图，裁切1140*480的图片保存手机端使用
        mobileCtx.drawImage(myCanvas, cx, cy, 1140, 480, 0, 0, 1140, 480)
        // // canvas绘制手机端上传
        // mobileCanvas.toBlob(function (blob) {
        //   // 图片ajax上传
        //   const xhr = new XMLHttpRequest()
        //   // 文件上传成功
        //   xhr.onreadystatechange = function () {
        //     if (xhr.status === 200) {
        //       // xhr.responseText就是返回的数据
        //     }
        //   }
        //   // 开始上传
        //   xhr.open('POST', 'upload.php', true)
        //   xhr.send(blob)
        // }, this.$refs.inputFile.files[0].type || 'image/png')
      }
    },
    /**
     * @description: 截取图片的坐标
     * @param val 描述
     * @returns {}
     */
    calculationImg (val) {
      this.x = val.x
      this.y = val.y
      // console.log('val', val)
    },
    /**
     * @description: input[type=file]选中图片，回显本地图片
     * @param arguments 描述
     * @returns {}
     */
    selectedImg () {
      const file = this.$refs.inputFile.files[0]
      console.log('file', file)
      // 选择的文件是图片
      if (file.type.indexOf('image') === 0) {
        const reader = new FileReader()
        // 图片文件转换为base64
        reader.readAsDataURL(file)
        reader.onload = () => {
          // 显示图片
          this.picUrl = reader.result
        }
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
     * @description: 点击提交按钮
     * @param arguments 描述
     * @returns {}
     */
    confirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.picUrl) {
            this.screenImg(this.x, this.y)
            const params = {}
            params.id = this.formInline.id
            params.jumpUrl = this.formInline.aUrl
            params.sort = this.formInline.sort
            params.picUrl = this.picUrl
            params.mobileUrl = this.mobileUrl
            this.confirmDialogForm(params)
          } else {
            alert('请先上传图片')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
  @import "./css.scss";
</style>
