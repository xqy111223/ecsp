<template>
  <div class="course-info-box">
    <ul>
      <li>
        <span class="">上课时间</span>
        <div>2019-03-23</div>
      </li>
      <li>
        <span class="mt16">地区</span>
        <div>江苏省-苏州市-工业园区</div>
      </li>
      <li>
        <span class="mt16">主讲学校</span>
        <div>工业园区实验小学</div>
      </li>
      <li>
        <span class="mt16">听讲学校</span>
        <div>青剑湖实验小学、南京六合实验小学、苏州沧浪小学、星海学校、星港学校</div>
      </li>
      <li>
        <span class="mt16">知识点</span>
        <div>作文、语法、段落</div>
      </li>
      <li>
        <span class="mt16">课程简介</span>
        <div>3月14日晚，小米商城官方微博突然发布公告，由于备货不足，取消原定于第二天上午发售的小米9系列两款机型。小米同时表示，将加紧生产，正在尽最大努力进行备货。缺货引发了网友质疑，认为小米实在搞“饥饿营销”。</div>
      </li>
    </ul>
    <button v-if="!getStudyFlag" ref="studyBtn" @click="handleStudy">开始学习</button>
    <button v-else ref="studyBtn" @click="handleStudy">暂停学习</button>
  </div>
</template>

<script>
export default {
  name: 'BroadcastCourseInfo',
  data () {
    return {
      courseData: []
    }
  },
  created () {

  },
  mounted () {
  },
  computed: { // 在计算属性中获取state中的状态数据，数据改变后会自动更新
    getStudyFlag () {
      return this.$store.getters.studyFlag
    }
  },
  methods: {
    handleStudy () { // 控制开始学习按钮状态
      this.$store.commit('changeStudyState')
    }
  }
}
</script>

<style lang="scss" scoped>
  // 开始学习

  li {
    list-style: none;
  }

  .mt16 {
    margin-top: 16px;
  }

  .mt20 {
    margin-top: 20px;
  }

  .course-info-box {
    width: 230px;
    background-color: #ffffff;
    box-shadow: 0px 10px 12px 0px rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    border: solid 1px #dee2e4;
    ul {
      padding: 20px 18px 0 18px;
      li {
        border-bottom: dashed 1px #e0e0e0;
        font-size: 12px;
        & > span {
          display: inline-block;
          color: #999;
          margin-bottom: 6px;
        }
        & > div {
          color: #333;
          margin-bottom: 19px;
        }
      }
    }
    button {
      width: 190px;
      height: 40px;
      background-color: #40d688;
      border-radius: 2px;
      color: #fff;
      border: none;
      cursor: pointer;
      margin: 0 20px 20px 20px;
      outline: none;
    }
  }

  ul li:last-child {
    border-bottom: none;
  }
</style>
