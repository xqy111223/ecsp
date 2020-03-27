/**
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.09.20 14:15.
* @Author
* @Description: 头像裁切
**/
<template>
  <div class="vue-cropper">
    <div>
      修改头像
    </div>

    <div class="test-button" style="border: 1px solid red">
      <el-button size="mini" type="custom" class="no-radius" icon="el-icon-custom-photo">本地图片</el-button>
      <input type="file" id="uploads" class="up-input" accept="image/png, image/jpeg, image/gif, image/jpg"
             @change="uploadImg($event)">

      <span class="cro-tips">注：仅支持JPG、PNG、BMP格式的图片，且文件小于5M</span>
    </div>
    <!-- 本地上传 -->
    <div class="show-info">
      <div class="cut-area">
        <vue-cropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :fixedBox="option.fixedBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :centerBox="option.centerBox"
          :high="option.high"
          :infoTrue="option.infoTrue"
          :maxImgSize="option.maxImgSize"
          @realTime="realTime"
          @imgLoad="imgLoad"
          @cropMoving="cropMoving"
          :enlarge="option.enlarge"
          :mode="option.mode"
        ></vue-cropper>
      </div>

      <div class="pre-area">
        <p>头像预览</p>
        <section class="pre-item">
          <div class="pre-views pre-views-lar">
            <i v-show="!option.img" class="el-icon-custom-photo1"></i>
            <img :src="previews.url" :style="previews.img">
          </div>
          <p>大尺寸头像（180像素x180像素 ）</p>
        </section>

        <section class="pre-item">
          <div class="pre-views pre-views-mid">
            <i v-show="!option.img" class="el-icon-custom-photo1"></i>
            <img :src="previews.url" :style="previews.img">
          </div>
          <p>小尺寸头像（50像素x50像素 ）</p>
        </section>

        <section class="pre-item">
          <div class="pre-views pre-views-sma">
            <i v-show="!option.img" class="el-icon-custom-photo1"></i>
            <img :src="previews.url" :style="previews.img">
          </div>
          <p>超小尺寸头像（30像素x30像素 ）</p>
        </section>
      </div>
    </div>
    <div class="pre-save">
      <el-button size="mini" type="primary"> 保存</el-button>
    </div>
  </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'

export default {
  name: 'HCropper',
  data: function () {
    return {
      previews: {}, // 预览
      option: {
        img: '', // 裁剪图片的地址
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        outputType: 'png', // 裁剪生成图片的格式
        info: true, // 裁剪框的大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度 === 只有自动截图 autoCrop 开启 才生效
        autoCropHeight: 150,
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: false, // 是否输出原图比例截图
        fixedBox: false, // 固定截图框大小 不允许改变
        canMove: false, // 上传图片是否可以移动 能否拖动图片
        canMoveBox: true, // 能否拖动截图框
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        high: true, // 是否按照设备的dpr 输出等比例图片
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        maxImgSize: 2000, // 限制图片最大宽度和高度 0-max
        enlarge: 1, // 图片根据截图框输出比例倍数 10-max(建议不要太大不然会卡死的呢)
        mode: 'contain', // 图片默认渲染方式 contain, cover, 100px, 100% auto
        cropData: {},
      },
      previewStyle1: {},
      previewStyle2: {},
      previewStyle3: {},
    }
  },
  components: {
    VueCropper
  },
  created () {
  },
  mounted () {
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 实时预览函数.
     **/
    realTime (data) {
      console.log('实时预览函数*****', data)
      const previews = data
      const h = 0.5
      const w = 0.2

      this.previewStyle1 = {
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: h
      }

      this.previewStyle2 = {
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: (100 / previews.w)
      }

      this.previewStyle3 = {
        width: previews.w + 'px',
        height: previews.h + 'px',
        overflow: 'hidden',
        margin: '0',
        zoom: w
      }
      this.previews = data
    },
    /**
     *@Description
     *@Param
     *@Return 图片上传函数.
     **/
    uploadImg (e) {
      console.log('上传*****', e)
      // 上传图片
      const file = e.target.files[0]
      const size = e.target.files[0].size
      console.log('size*****', size)
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value) || size > 5 * 1024 * 1024) {
        this.$message.warning('仅支持JPG、PNG、BMP格式的图片，且文件小于5M！')
        return false
      }
      const reader = new FileReader() // 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据

      reader.onload = e => {
        console.log('上传2*****', e)
        console.log('上传3*****', e.target)
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          console.log('new Blob([e.target.result])******', new Blob([e.target.result]), '****', e, e.target.result)
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
      }

      reader.readAsDataURL(file) // 转化为base64
      // reader.readAsArrayBuffer(file) // 转化为blob
    },
    /**
     *@Description
     *@Param
     *@Return 图片上传结果监听.
     **/
    imgLoad (msg) {
      console.log('imgLoad******', msg)
    },
    /**
     *@Description
     *@Param
     *@Return .
     **/
    cropMoving (data) {
      console.log('cropMoving******', data)
      this.option.cropData = data
    }
  }
}
</script>
<style lang="scss" scoped>
  .vue-cropper {
    width: 100%;
    margin: auto;
  }

  .test-button {
    position: relative;
    margin: 10px;
    border: 1px solid blue;
  }

  /* 上传文件提示 */
  .cro-tips {
    font-size: 12px;
    color: #999;
  }

  /*上传*/
  .up-input {
    position: absolute;
    left: 1px;
    width: 97px;
    height: 100%;
    opacity: 0.1;
    cursor: pointer;
    border: 1px solid red;
  }

  /*裁切预览区域*/
  .show-info {
    overflow: hidden;
  }

  .cut-area {
    width: 400px;
    height: 400px;
    float: left;
    background: #ddd;

    .vue-cropper {
      background-image: url("~@/assets/images/portrait.png"); // 替换 cropper 默认底色
    }
  }

  .pre-area {
    height: 400px;
    margin-left: 60px;
    padding-left: 60px;
    float: left;
    font-size: 14px;
    border-left: 1px solid #ebebeb;
  }

  /* 预览区域 */
  .pre-item {
    margin-top: 18px;

    p {
      margin-top: 8px;
      color: #999;
    }
  }

  .pre-views {
    position: relative;
    overflow: hidden;
    background: #ddd;

    i {
      position: absolute;
      width: 100%;
      text-align: center;
      color: #fff;
    }
  }

  .pre-views-lar {
    width: 180px;
    height: 180px;

    i {
      line-height: 180px;
      font-size: 80px;
    }
  }

  .pre-views-mid {
    width: 50px;
    height: 50px;

    i {
      line-height: 50px;
      font-size: 26px;
    }
  }

  .pre-views-sma {
    width: 30px;
    height: 30px;

    i {
      line-height: 30px;
    }
  }
  /* 保存 */
  .pre-save {
    margin-top: 60px;
    text-align: center;
  }
</style>
