<template>
  <div class="stu-work-box mt20">
    <div class="box-title">
      <span class="line"></span>
      <span class="title">学生作品</span>
    </div>
    <el-scrollbar style="height: 100%">
      <div v-if="studentWorksData.length>0" class="no-stu-works"></div>
      <ul v-else>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  name: 'BroadcastStudentWork',
  data () {
    return {
      studentWorksData: []
    }
  }
}
</script>

<style lang="scss" scoped>
  li {
    list-style: none;
  }

  .mt20 {
    margin-top: 20px;
  }

  .stu-work-box {
    width: 230px;
    height: 370px;
    background-color: #ffffff;
    padding-top: 20px;
    overflow: hidden;
    .box-title {
      font-size: 0;
      .line {
        display: inline-block;
        width: 3px;
        height: 8px;
        background-color: #347eff;
        border-radius: 2px;
        margin-left: 19px;
        margin-right: 13px;
      }
      .title {
        font-size: 14px;
        color: #333;
      }
    }
    ul {
      li {
        display: inline-block;
        width: 80px;
        height: 60px;
        background-color: #f4f5f9;
        border: solid 1px #dcdcdc;
        margin-top: 20px;
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }

  /*样式穿透 采用deep*/
  /deep/ .el-scrollbar__wrap {
    overflow: auto;
  }

</style>
