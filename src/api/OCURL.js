/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/4/30 17:12
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description  互动课堂子平台URL集合(http://10.5.52.91:8888/swagger-ui.html,http://10.5.52.14/org/group.action?plid=61)
 */

const urls = {
  login: '/login', // 登录----2020.3.3完成
  logout: '/loginOut', // 登出---2020.3.4
  platform: '/index', // 获取平台信息----判断域名是否存在--2020.3.2完成
  getPlatformSetting: '/platform/setting', // 获取门户配置
  getUserInfo: '/token', // 前台token获取用户信息--2020.3.2
  getImageCode: '/getImageCode', // 获取验证码----2020.3.4完成
  /* -----------门户------------ */
  getModel: '/portal/model', // 获取门户模板配置信息
  getCourseModel: '/portal/course', // 获取课程门户配置信息 接口联调要删除
  getLiveModel: '/portal/live', // 获取直播门户配置信息 接口联调要删除
  getStatisticsModel: '/portal/statistics', // 获取统计门户配置信息 接口联调要删除
  getMapData: '/OCMap/model', // 获取地图统计数据
  getPortalSetting: '/portal/setting', // 获取门户头部配置 ------ 是否需要删除
  bannerUrl: '/portal/homepage/banners', // 门户首页 - 图片banner
  getMapSvg: '/index/getMapByAreaCode', // 获取地图svg数据
  getClassTableData: '/TJscheduleCount/getTJCountSchedule', // 获取区域首页课程表统计相关数据
  getClassTableDialogData: '/TJscheduleCount/getTJCountScheduleDialog', // 获取区域首页课程表弹出框数据
  getTeacherListData: '/homeTeacher/model', // 获取区域首页名师推荐相关数据 ------------------------- 后续排查是否 废弃
  famousUrl: '/portal/homepage/detail', // 门户首页 - 名师推荐
  getClassLevelData: '/knowledges/instances/types/list-by-types', // 获取所有年级数据、学科 ------------------------- 后续排查是否 废弃
  getSubjectData: '/portal/course/subject', // 获取学科数据，
  getCourseListData: '/portal/course/courseList', // 获取课程 - 点播列表数据 ------------------------- 后续查是否 废弃
  getCourseData: '/portal/course/course', // 获取课程列表数据
  getLivePeopleData: '/portal/live/watching', // 获取直播观众信息
  getBroadCommentData: '/protal/course/comment', // 获取评论
  /* -----------------个人空间------------------ */
  getPersonalRouter: '/personal/area/router', // 个人空间区域管理员路由
  getPersonalSchoolRouter: '/personal/school/router', // 学校
  getPersonalTeacherRouter: '/personal/teacher/router', // 教师
  getPersonalFamilyRouter: '/personal/family/router', // 家长
  getPersonalStudentRouter: '/personal/student/router', // 学生
  /* -----------------个人空间 ---- 首页 ------------------ */
  visitorsUrl: '/base/user/results', // 个人空间 - 首页 - 最近访客接口

  /* -----------------个人空间----应用管理---start------------------ */
  teacherUrl: '/base/user/results', // 课表管理 - 课表编辑听讲教室 - 教师获取
  setTimeUrl: '/coursetime/batch/add', // 课表管理 - 批量新增上课时间 - 设置上课时间
  cursorUrl: '/course/list/schedule', // 课表管理 - 区域、学校：课表管理以及学生、老师、家长空间课表
  semesterUrl: '/semesters/list/not/page', // 前台获取 - 学期列表
  vacationUrl: '/semesters/judge/vacation', // 判断日期是不是假期
  lessonUrl: '/coursetime/maxcount/byschoolorarea', // 课表管理 - 获取指定区域或学校上午下午的最大节次 - （首页区域、老师空间-学校使用）
  roomTimeUrl: '/coursetime/list/byroomid', // 课表管理 - 获取指定教室的上课时间 - 教室使用（课表管理、学生家长空间）
  participateUrl: '/courseattentdee/bycourseid', // 课表管理 - 获取指定课程 - 参与方信息
  byCourseUrl: '/courseext/bycourseid', // 课表管理、课程管理 - 获取指定课程 - 扩展信息
  courseUpdateUrl: '/courseext/update', // 课程管理 - 编辑课程扩展信息 - 扩展信息
  delCourseUrl: '/delete/bycourseidtime', // 课表管理 - 批量删除课程
  addCourseUrl: '/course/batch/add', // 课表管理 - 批量添加或者更新课程
  commentUrl: '/courseComment/loadCommentMangeList', // 评论管理 - 评论列表
  commentDelUrl: '/courseComment/batchDelete', // 评论管理 - 评论列表 - 删除
  gradeUrl: '/knowledges/instances/list', // 课程管理 - 获取年级、学科 - 级联条件查询
  pointUrl: '/knowledges/instances/point/list', // 课程管理 - 获取知识点
  courseMgtUrl: '/course/list/manager', // 课程管理 - 区域、学校、学生、教师、家长门户：首页课程点播；区域、学校门户：校园直播、课程中心；区域、学校、教师空间：课程管理、实时轮询

  serverUrl: '/base/platform/server/conf', // 课程管理 - 获取平台 服务器配置列表
  serverInfoUrl: '/base/platform/server/conf', // 课程管理 - 获取平台 单个服务器 详细信息 - 依赖于serverUrl
  // coverNumUrl: '/res/printscreen/getPrintscreenTotalNum.do', // 获取 视频资源 截图数量
  coverNumUrl: 'http://mnres2local.9itest.com:9005/reserver/res/printscreen/getPrintscreenTotalNum.do', // 获取课程 - 获取系统截图 接口
  coverImgUrl: '/res/showPrintScreen.do', // 获取视频资源 截图 URL地址
  uploadUrl: 'http://mnres2local.9itest.com:9005/reserver/res/1bd310655978440d953c74711adf207d/imageUpload.do?sizeLimit=5&validateCode=72652e8de31941d6b58e9', // 上传资源
  /* -----------------个人空间----应用管理---end------------------ */

  /* -----------------个人空间----用户管理---start------------------ */
  getRoleList: '/front/role/pages', // 用户管理-角色列表-----------------已调-------
  getRoleFunctions: '/front/role/permission', // 获取功能列表-----------------已调-------
  submitAddRole: '/front/role/add', // 添加角色提交-----------------已调-------
  submitEditRole: '/front/role/update', // 编辑角色提交-----------------已调-------
  submitDeleteRole: '/front/role/delete', // 删除角色提交-----------------已调-------
  getUserList: '/base/user/pages', // 用户管理-用户列表,userType：1是区域管理员,2是校级管理员,3是教师,4是学生,5是家长-----------------已调-------可提公共
  submitAddUser: '/base/user/add', // 添加用户提交-------------------已调-------
  submitEditUser: '/base/user/update', // 编辑用户提交------------------已调-------
  submitDeleteUser: '/base/user/delete', // 删除用户提交用户管理-教师管理-获取年级班级----已调-------
  getTeacherList: '/base/user/results', // 用户管理-教师管理列表-----------------已合并接口，后期可删除-------
  /* 公共接口，根据学校区域查询，年级，知识网络接口---级联查询 */
  getKnowledgeList: '/knowledges/instances/list', // 公共接口，获取知识网络列表-级联，传入type类型——学段：SEMESTER 年级：GRADE 学科：SUBJECT 版本：EDITION 分册：VOLUME---------------2020-1-7整合--已调通-----
  getKnowledgeListNC: 'knowledges/instances/types/user/list', // 公共接口，获取年级学科列表-不级联----------2020/2/14
  /* ------------- */
  getGradeClassList: '/base/class/classes', // 用户管理-根据年级-获取班级列表---------------2020-1-6在调---已调通-----

  getSubjectList: '/personal/getSubjectList', // 用户管理-教师管理-获取学科
  setFamousTeacher: '/base/user/famous', // 用户管理-教师管理-设为/取消名师  -----------------已调-------
  getUserDetailInfo: '/base/user/detail', // 用户管理（查询用户基本信息-公共接口）——教师管理——用户详情-----------------已调-------
  getStudentList: '/personal/getStudentList', // 用户管理-学生管理列表
  submitAddStudent: '/personal/submitAddStudent', // 用户管理-学生管理-添加学生提交
  submitEditStudent: '/personal/submitEditStudent', // 用户管理-学生管理-编辑学生提交
  submitDeleteStudent: '/personal/submitDeleteStudent', // 用户管理-学生管理-删除学生提交
  getParentList: '/personal/getParentList', // 用户管理-学生管理列表
  submitAddParent: '/personal/submitAddParent', // 用户管理-学生管理-添加学生提交
  submitEditParent: '/personal/submitEditParent', // 用户管理-学生管理-编辑学生提交
  submitDeleteParent: '/personal/submitDeleteParent', // 用户管理-学生管理-删除学生提交
  /* -----------------个人空间----用户管理---end------------------ */
  /* -----------------个人空间----基础设置---start------------------ */
  getClassroomList: '/personal/getClassroomList', // 基础设置-教室管理-获取教室列表
  getClassroomDetail: '/personal/getClassroomDetail', // 基础设置-教室管理-获取教室详情
  submitEditClassroom: '/personal/submitEditClassroom', // 基础设置-教室管理-编辑教室
  submitBindClass: '/personal/submitBindClass', // 基础设置-教室管理-绑定班级
  getGradeClassInfoList: '/personal//base/class/pages', // 基础设置-班级管理-获取班级列表
  submitAddOrEditClass: '/personal/submitAddOrEditClass', // 基础设置-班级管理-新增/编辑班级
  submitDeleteClass: '/personal/base/class/delete', //  基础设置-班级管理-删除班级
  submitUpgradeClass: '/personal/base/class/upgrade', // 基础设置-班级管理-班级升级
  submitDismissClass: '/personal/base/class/dissolution', // 基础设置-班级管理-班级解散
  getClassTeacherList: '/personal/base/class/teachers', // 基础设置-班级管理-获取班级任课老师列表
  getClassStudentList: '/personal/base/class/students', // 基础设置-班级管理-获取班级学生列表
  submitSelectedClassSubject: '/personal/base/class/subject', // 基础设置-班级管理-选择学科
  submitRemoveClassTeacher: '/personal/base/class/move', // 基础设置-班级管理-任课老师移出班级
  submitAddClassTeacher: '/personal/base/class/addteacher', // 基础设置-班级管理-添加任课教师
  submitAddClassStudent: '/personal/base/class/addstudent', // 基础设置-班级管理-添加班级学生
  submitSetClassMonitor: '/personal/submitSetClassMonitor', // 基础设置-班级管理-设置班长
  getNotClassStudentList: '/personal/getNotClassStudentList', // 基础设置-班级管理-查询不在此班级中的学生
  submitSetAutoUpgrade: '/personal/submitSetAutoUpgrade', // 基础设置-班级管理-设置自动升级
  getAutoUpgradeInfo: '/personal/getAutoUpgradeInfo', // 基础设置-班级管理-获取自动升级信息
  submitCancelAutoUpgrade: '/personal/submitCancelAutoUpgrade', // 基础设置-班级管理-取消自动升级
  queryClassDetail: '/personal/base/class/detail', // 基础设置-班级管理—根据Id查询班级详情
  /* -----------------个人空间----基础设置---end------------------ */
  /* -----------------个人空间----门户配置---start------------------ */
  getBannerConfig: '/portal/homepage/config', // 获取Banner配置项--首页是否展示banner，或地图----已调------
  setBannerConfig: '/portal/homepage/setup', // 设置Banner配置项--首页是否展示banner，或地图----已调------
  getBannerList: '/portal/homepage/banners', // 门户配置——获取banner列表
  submitAddBanner: '/portal/homepage/addbanner', // 门户配置——新增banner
  submitEditBanner: '/portal/homepage/editbanner', // 门户配置——编辑banner
  submitDeleteBanner: '/portal/homepage/delbanner', // 门户配置——删除banner
  submitExchangeBanner: '/portal/homepage/movebanner', // 门户配置——交换banner
  getFamousList: '/portal/homepage/famous', // 门户配置——获取名师推荐列表
  submitAddFamous: '/portal/homepage/addfamous', // 门户配置——新增名师推荐位
  submitDeleteFamous: '/portal/homepage/delfamous', // 门户配置——删除名师推荐位
  submitExchangeFamous: '/portal/homepage/movefamous', // 门户配置——交换名师推荐位
  /* -----------------个人空间----门户配置---end------------------ */
  /* -----------------个人空间----公用接口---start------------------ */
  queryUserOptions: '/base/user/list', // 个人空间，查询用户列表,筛选用户，教师，学生，家长--------selected
  querySubjectOptions: '/personal/querySubjectOptions', // 个人空间，根据学校，年级，查学科
  queryUserInfoList: '/base/user/results', // 查询用户基本信息列表，查询用户列表,筛选用户，教师，学生，家长-------普通查询框----
  searchSchoolList: '/base/school/list', // 门户配置——名师推荐——查询学校列表-------学校列表-可提公共
  /* -----------------个人空间----公用接口---end------------------ */
  /* -----------------个人空间---教学统计---start------------------ */
  queryPlatformTerm: '/semesters/list/not/page', // 个人空间，教学统计,——查询平台学期---------------------已调通----------------
  getClassStatistics: '/statistics/course', // 个人空间，教学统计,——查询区域开课分析---------------------已调通----------------
  getTeacherClassStatistics: '/statistics/teacher', // 个人空间，教学统计,——查询教师开课统计---------------------已调通----------------
  getGradeClassStatistics: '/statistics/grade', // 个人空间，教学统计,——查询年级开课统计---------------------已调通----------------
  getSubjectClassStatistics: '/statistics/subject', // 个人空间，教学统计,——查询学科开课统计---------------------已调通----------------
  statisticsMonthUrl: '/statistics/month', // 门户入口 - 教学统计 - 近N月开课统计(区域/学校 )
  statisticsSubjectUrl: '/statistics/subject', // 门户入口 - 教学统计 - 学科占比分析-实开课(区域/学校 )
  statisticsGradeUrl: '/statistics/grade', // 门户入口 - 教学统计 - 年级占比分析-实开课(区域/学校 )
  statisticsTeaUrl: '/statistics/teacher', // 门户入口 - 教学统计 - 教师开课排行-实开课（区域/学校）
  statisticsCourseUrl: '/statistics/course', // 门户入口 - 教学统计 -  区域开课分析

  /* -----------------个人空间----教学统计---end------------------ */
  /* -----------------个人空间----圈组--班级成员---start------------------ */
  queryTeacherClass: '/members/class/teacher', // 个人空间，教师空间，教师班级查找,不包括历史班级,教师任课和班主任班级,只会有status为0的数据
  getClassMembers: '/members/class/info', // 个人空间，获取——班级成员-班级信息---------------------已调通----------------
  queryStudentClass: '/members/class/student', // 个人空间，学生空间，学生班级查找---------------------已调通----------------
  queryChildrenClass: '/members/class/children', // 个人空间,家长空间，家长的孩子班级查找---------------------已调通----------------
  /* -----------------个人空间----圈组--班级成员---end------------------ */
  /* -------------公用--------------------- */
  // http://10.5.52.14/workspace/myWorkspace?projectId=306#9342 区域 学校
  // http://10.5.52.14/workspace/myWorkspace?projectId=306#8756 教室
  getAreaList: '/base/area/list', // 获取行政区域数据
  schoolUrl: '/base/school/list', // 获取学校接口地址
  classroomUrl: '/base/classroom/list', // 获取教室接口地址
}

export default urls
