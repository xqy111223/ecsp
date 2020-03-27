/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/4/3 16:34
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description  课程中心信息状态管理
 */

const course = {
  state: {
    videoFlag: 'main', // 课程点播，main是主讲教室视频，interactvive是互动画面视频
    studyFlag: false, // 开始学习按钮状态
    mainVideoPlayFlag: false,
    interVideoPlayFlag: false
  },
  getters: {
    videoFlag: state => state.videoFlag,
    studyFlag: state => state.studyFlag,
    mainVideoPlayFlag: state => state.mainVideoPlayFlag,
    interVideoPlayFlag: state => state.mainVideoPlayFlag
  },
  mutations: {
    changeStudyState (state) { // 修改学习按钮状态
      state.studyFlag = !state.studyFlag
    }
  },
  actions: {

  }
}

export default course
