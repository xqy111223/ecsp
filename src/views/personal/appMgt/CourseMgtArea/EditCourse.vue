/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.04 16:02.
* @Author
* @Description 个人空间 - 应用管理 - 课程管理 - 课程编辑 - 弹窗
**/
<template>
  <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" title="编辑课程" width="958px">
    <el-form :model="form" label-width="100px" ref="form">
      <el-form-item label="课程名称：" v-show="areaOrSchoolType === 'MASTER'">
        <el-input class="form-name" maxlength="30" placeholder="请输入课程名称" resize="none" show-word-limit type="textarea" v-model="form.courseName"></el-input>
      </el-form-item>

      <el-form-item label="教材版本：" v-show="areaOrSchoolType === 'MASTER'">
        <el-select @change="handleVersionChange" placeholder="请选择版本" v-model="form.bookVersionId">
          <el-option :key="item.baseKnowledgeId" :label="item.customName" :value="item.editionId" v-for="item in versionOption">{{ item.customName || item.name }}</el-option>
        </el-select>

        <el-select placeholder="请选择分册" v-model="form.bookVolumeId">
          <el-option :key="item.baseKnowledgeId" :label="item.customName" :value="item.customName" v-for="item in volumeOption">{{ item.customName || item.name }}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="知识点：" v-show="areaOrSchoolType === 'MASTER'">
        <el-cascader :props="knowledgeOption" @change="handlePointChange" placeholder="请选择知识点" v-model="form.id"></el-cascader>

        <el-button @click="handleKnowledgeClick" size="mini" type="default">添加知识点</el-button>
        <ul>
          <li :key="item" class="info-list" v-for="(item, index) in pointOption">{{ item }} <i @click="handleDeleteClick(index)" class="el-icon-custom-delete1"></i></li>
        </ul>
      </el-form-item>

      <el-form-item label="课程简介：" v-show="areaOrSchoolType === 'MASTER'">
        <el-input class="form-desc" maxlength="100" placeholder="请输入课程简介" resize="none" show-word-limit type="textarea" v-model="form.courseDesc"></el-input>
      </el-form-item>

      <el-form-item label="门户展示：">
        <el-radio-group v-model="form.isPlatformDisplay">
          <el-radio :label="0">不展示</el-radio>
          <el-radio :label="1">展示</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="课程封面：">
        <el-radio-group v-model="form.coverType">
          <el-radio label="SYSTEM">系统视频截图</el-radio>
          <el-radio label="UPLOAD">上传本地图片</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <!-- 系统视频截图 -->
        <ul class="img-cover" v-show="form.coverType === 'SYSTEM'">
          <li>
            <el-radio :label="0" v-model="cover"></el-radio>
            <img src="http://file02.16sucai.com/d/file/2015/0408/779334da99e40adb587d0ba715eca102.jpg"/>
          </li>
          <li>
            <el-radio :label="1" v-model="cover"></el-radio>
            <img src="http://file02.16sucai.com/d/file/2015/0408/779334da99e40adb587d0ba715eca102.jpg"/>
          </li>
        </ul>
        <!-- 上传本地图片 -->
        <div class="up-cover" v-show="form.coverType === 'UPLOAD'">
          <el-upload
            :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :show-file-list="false"
            action="https://jsonplaceholder.typicode.com/posts/" class="avatar-uploader">
            <img :src="imageUrl" class="avatar" v-if="imageUrl">
            <p v-else>上传图片</p>
          </el-upload>
          <p>支持JPG、PNG、GIF、BMP、JPEG的图片格式 最大不超过4M</p>

        </div>
      </el-form-item>

    </el-form>

    <span class="dialog-footer" slot="footer">
      <el-button @click="handleOperationClick('cancel')" size="mini" type="info">取 消</el-button>
      <el-button @click="handleOperationClick" size="mini" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import {
  byCourse,
  courseUpdate,
  coverImg,
  coverNum,
  gradeData,
  pointData,
  serverData,
  serverInfoData
} from '@/api/personal/appMgt'
// 获取指定课程扩展信息、获取版本\分册、知识点、提交课程编辑信息、获取平台服务器列表、获取单个服务器详细信息、获取系统截图数量、获取系统截图地址
export default {
  name: 'editCourse',
  props: ['dialogVisible'],
  components: {},
  data () {
    return {
      imageUrl: 'http://file02.16sucai.com/d/file/2015/0408/779334da99e40adb587d0ba715eca102.jpg',
      // imageUrl: '',
      cover: 0, // 系统视频截图 选择索引
      form: {
        id: [], // 知识点ID
        userId: '', // 用户ID
        courseId: '', // 课程ID 必填
        platformId: '', // 平台ID
        courseName: '', // 课程名称
        courseDesc: '', // 课程简介
        bookGradeId: '', // 年级ID
        bookVolumeId: '', // 分册ID
        bookSubjectId: '', // 学科ID
        bookVersionId: '', // 版本ID
        coverUrl: '', // 系统截屏封面地址
        publicFlag: 0, // 是否上级公开：0：不公开；1公开
        isSpaceDisPlay: 0, // 是否空间展示：0：不展示；1展示
        coverType: 'SYSTEM', // 封面类型方式，本地上传：UPLOAD，系统截图：SYSTEM
        isPlatformDisplay: 0, // 是否门户展示：0：不展示；1展示
        knowledgePointIds: [], // 知识点ID列表
        localUploadCoverUrl: '', // 本地上传封面地址
      },

      volumeData: {}, // 请求分册的时候 使用的参数 - 父组件传过的查询条件
      pointOption: [], // 添加知识点 list
      volumeOption: [], // 分册数据
      versionOption: [], // 版本数据
      knowledgeOption: {
        lazy: true, // 动态加载子节点
        emitPath: false, // 选中节点时，返回节点值
        value: 'id', // 指定选项的值为
        label: 'name', // 指定选项标签
        lazyLoad: this.loadData,
        // lazyLoad (node, resolve) {
        //   const { level } = node
        //   setTimeout(() => {
        //     const nodes = Array.from({ length: level + 1 }).map(item => ({
        //       value: item.id,
        //       label: item.name,
        //       leaf: level >= 2
        //     }))
        //     // 通过调用resolve将子节点数据返回，通知组件数据加载完成
        //     resolve(nodes)
        //   }, 1000)
        // }
      }, // 知识点
      areaOrSchoolType: 'MASTER', // 主讲是否在此区域内
    }
  },
  watch: {},
  created () {
    this.getServerData() // 获取服务器列表
  },
  computed: {
    ...mapGetters(['basePlatformId', 'userId', 'baseAreaId', 'baseSchoolId']),
  },
  methods: {
    /**
     * 加载区域数据
     * @param node 为当前点击的节点
     * @param resolve 为数据加载完成的回调(必须调用)
     * @returns {Promise<void>}
     */
    async loadData (node, resolve) {
      console.log('node****', node)
      const params = {
        pid: '', // 父id
        areaId: this.volumeData.areaId, // 区域ID
        gradeId: this.volumeData.bookGradeId, // 年级id - pid为空时传
        schoolId: this.volumeData.masterSchoolId, // 学校ID
        subjectId: this.volumeData.bookSubjectId // 学科ID - pid为空时传
      }
      if (node.root) {
        params.pid = ''
      } else {
        params.pid = node.data.pid
      }
      let result = await pointData(params)
      result = result.map(val => {
        return {
          id: val.id,
          pid: val.pid,
          name: val.name,
          namePath: val.namePath,
          leaf: val.hasChildren === '1'
        }
      })
      if (!node.root) {
        result.unshift({
          leaf: true,
          name: '全部',
          id: node.id + Math.random(),
        })
      }
      resolve && resolve(result)
    },
    /**
     *@Description
     *@Param
     *@Return 获取 课程扩展信息 - 父组件调用.
     **/
    getByCourse (data, formData) {
      console.log('编辑数据', data, formData)
      this.volumeData = formData // 请求分册的时候 使用
      this.areaOrSchoolType = data.areaOrSchoolAttentdeeType
      const params = {
        areaId: formData.areaId, // 区域ID: areaId、schoolId必须有一个不为空，两个都有值时以schoolId为准
        courseId: data.courseId, // 课程ID
        platformId: this.basePlatformId, // 需要获取课程是否在平台门户是否展示时需要传入
        scholId: formData.masterSchoolId, // 学校
      }
      byCourse(params).then(res => {
        this.form = { ...this.form, ...res }
        console.log('编辑数据返回****', res)
      })
      this.getEditionVolume('edition') // 版本、分册
      this.getPointData(formData) // 知识点
      this.getCoverNum() // 获取系统截图数量
    },
    /**
     *@Description
     *@Param
     *@Return 版本、分册 select 切换事件.
     **/
    handleVersionChange (type) {
      console.log('type', type, this.form)
      this.getEditionVolume('volume') // 切换 - 版本  查询 - 分册
    },
    /**
     *@Description
     *@Param
     *@Return 获取版本、分册数据.
     **/
    getEditionVolume (type) {
      // console.log('form*****', this.form)
      const params = {
        areaId: this.volumeData.areaId, // 区域ID
        gradeId: this.volumeData.bookGradeId, // 年级id
        schoolId: this.volumeData.masterSchoolId, // 学校ID
        subjectId: this.volumeData.bookSubjectId // 学科ID
      }
      if (type === 'edition') {
        params.editionId = '' // 版本id
        params.type = 'EDITION' // 版本：EDITION 分册：VOLUME
      } else {
        params.type = 'VOLUME' // 版本：EDITION 分册：VOLUME
        params.editionId = this.form.bookVersionId
      }
      gradeData(params).then(res => {
        if (type === 'edition') { // 版本
          this.versionOption = res
          console.log('版本****', res)
        } else { // 分册
          this.volumeOption = res
          console.log('分册*****', res)
        }
      })
    },
    /**
     *@Description
     *@Param
     *@Return 知识点 change 事件监听.
     **/
    handlePointChange (e) {
      console.log('知识点change事件***', e)
    },
    /**
     *@Description
     *@Param
     *@Return 获取 知识点 数据.
     **/
    getPointData (pid) {
      const params = {
        pid: pid, // 父id
        areaId: this.volumeData.areaId, // 区域ID
        gradeId: this.volumeData.bookGradeId, // 年级id - pid为空时传
        schoolId: this.volumeData.masterSchoolId, // 学校ID
        subjectId: this.volumeData.bookSubjectId // 学科ID - pid为空时传
      }
      pointData(params).then(res => {
        console.log('知识点****', res)
        // this.knowledgeOption = res
      })
    },
    /**
     *@Description
     *@Param
     *@Return 添加知识点 - 点击事件.
     **/
    handleKnowledgeClick () {
      this.pointOption.push(this.form.id)
      console.log('添加知识点按钮****', this.form.id, this.pointOption)
    },
    /**
     *@Description
     *@Param
     *@Return 添加知识点 删除事件.
     **/
    handleDeleteClick (index) {
      this.pointOption.slice(index, 1)
      console.log('添加知识点 删除事件***', index)
    },
    /**
     *@Description
     *@Param
     *@Return 获取 系统截图 - 数量.
     **/
    async getCoverNum () {
      const params = {
        areaCode: '',
        resourceId: ''
      }
      const imgNum = await coverNum(params)
      let imgArr
      for (let i = 1; i < imgNum; i++) {
        const param = {
          seq: i,
          areaCode: '',
          resourceId: '',
        }
        imgArr = await coverImg(param)
      }
      console.log('系统截图数量****', imgNum, imgArr)
    },
    /**
     *@Description
     *@Param
     *@Return 弹窗 确定 取消 事件监听.
     **/
    handleOperationClick (type) {
      if (type === 'cancel') {
        this.$emit('getDialog')
      } else {
        courseUpdate(this.form).then(res => {
          this.$emit('getDialog')
          console.log('确定')
        })
      }
    },
    /**
     *@Description
     *@Param
     *@Return 获取平台 服务器列表、以及单个服务器的详细信息.
     **/
    async getServerData () {
      const result = await serverData({ basePlatformId: 'basePlatformId' })
      console.log('result****', result)
      const infoRes = await serverInfoData({ type: result.type })
      console.log('infoRes****', infoRes)
    },
    /**
     *@Description
     *@Param
     *@Return 上传文件之前的钩子函数，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
     **/
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    /**
     *@Description
     *@Param
     *@Return 文件上传成功时的钩子函数.
     **/
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    /**
     *@Description
     *@Param
     *@Return 弹窗 - 关闭 按钮.
     **/
    handleClose (e) {
      this.$emit('getDialog')
    },
  }
}
</script>
<style lang="scss" scoped>
  .form-name {
    width: 500px;
    height: 32px;
    /deep/ textarea {
      height: 100% !important;
    }
    /deep/ span.el-input__count {
      right: 5px;
      bottom: -12px;
      background: none;
    }
  }
  .form-desc {
    width: 740px;
    /deep/ textarea {
      min-height: 60px !important;
    }
    /deep/ span.el-input__count {
      right: 5px;
      bottom: -12px;
      background: none;
    }
  }
  /* 添加知识点 - 知识点列表 */
  .info-list {
    font-size: 12px;
    line-height: 10px;
    display: inline-block;
    margin-top: 10px;
    padding: 5px;
    color: #000;
    border-radius: 2px;
    background: #d3e6ff;
    i {
      margin-left: 5px;
      cursor: pointer;
      color: red;
    }
  }
  /* 系统截屏图片 */
  .img-cover {
    overflow: hidden;
    margin-right: -10px;
    li {
      position: relative;
      float: left;
      width: 150px;
      height: 85px;
      margin-right: 10px;
      margin-bottom: 10px;
      label {
        position: absolute;
        top: 3px;
        right: 2px;
        overflow: hidden;
        width: 16px;
        margin-right: 0;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  /* 本地上传图片 */
  .up-cover {
    width: 320px;
    height: 180px;
    text-align: center;
    border: 1px dashed #dcdcdc;
    button {
      margin: 45px auto 10px auto;
    }
    p {
      font-size: 12px;
      line-height: 25px;
      width: 260px;
      margin: 0 auto;
      color: #999;
    }
    .avatar-uploader {
      img {
        width: 100%;
        height: 100%;
      }
      p {
        width: 50px;
        padding: 0 18px;
        color: #333;
        border: 1px solid #B2B7BF;
        background: #f5f8fa;
        &:hover {
          background: #c2d8ff;
        }
      }
    }
  }
</style>
