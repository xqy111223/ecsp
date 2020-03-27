/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.11.14 14:01.
* @Author
* @Description  个人空间 - 应用管理模块下的 - 数据mock
**/

import Mock from 'mockjs'

/**
 *@Description
 *@Param
 *@Return 获取 课表管理 - 学校 - mock数据.
 **/
export const schoolList = Mock.mock({
  message: '学校数据',
  status: '000000000',
  'result|4-15': [{
    'status|1': true,
    'baseAreaId|1-100': 100,
    'baseSchoolId|1-100': 100,
    'sourceSchoolCode|1-10': 10,
    schoolName: Mock.Random.cname() + '学校',
    areaName: Mock.mock('@county(true)'),
  }]
})
/**
 *@Description
 *@Param
 *@Return 获取 课表管理 - 教室 - mock数据.
 **/
export const classroomList = Mock.mock({
  message: '教室数据',
  status: '000000000',
  result: {
    'list|4-15': [{
      'status|1': true,
      'baseSchoolId|+1': 10000,
      'studentNum|50-1000': 500, // 学生数量
      'baseClassroomId|+1': 1000, // 教室ID
      roomName: Mock.Random.cname() + '教室',
    }]
  }
})
/**
 *@Description
 *@Param
 *@Return 获取 课表管理 - 教师 - mock数据.
 **/
export const teacherList = Mock.mock({
  message: '教师数据',
  status: '000000000',
  'result|4-20': [{
    baseUserId: '@id', // 用户ID
    areaPath: '用户所属区域',
    userName: Mock.Random.cname() + '老师',
  }]
})

/**
 *@Description
 *@Param 提交 接口 --------- 无用
 *@Return 获取 课表管理 - 设置上课时间 - mock数据.
 **/
export const timeList = Mock.mock({
  message: '设置上课时间数据',
  status: '000000000',
  result: {
    list: 'success'
  }
})
/**
 *@Description
 *@Param
 *@Return 获取 课表管理 - 教室上课时间、节次 - mock数据.
 **/
export const roomList = Mock.mock({
  message: '教室节次数据',
  status: '000000000',
  result: {
    list: [{
      id: '@id',
      sort: 1,
      dayPeriod: 'AM', // AM、PM,
      classroomId: '@id',
      endTime: new Date('2019,11,25 08:45').getTime(),
      startTime: new Date('2019,11,25 08:00').getTime()
    }, {
      id: '@id',
      sort: 2,
      dayPeriod: 'AM', // AM、PM,
      classroomId: '@id',
      endTime: new Date('2019,11,25 09:45').getTime(),
      startTime: new Date('2019,11,25 09:00').getTime()
    }, {
      id: '@id',
      sort: 3,
      dayPeriod: 'AM', // AM、PM,
      classroomId: '@id',
      endTime: new Date('2019,11,25 10:45').getTime(),
      startTime: new Date('2019,11,25 10:00').getTime()
    }, {
      id: '@id',
      sort: 4,
      dayPeriod: 'AM', // AM、PM,
      classroomId: '@id',
      endTime: new Date('2019,11,25 11:45').getTime(),
      startTime: new Date('2019,11,25 11:00').getTime()
    }, {
      id: '@id',
      sort: 1,
      dayPeriod: 'PM', // AM、PM,
      classroomId: '@id',
      endTime: new Date('2019,11,25 14:45').getTime(),
      startTime: new Date('2019,11,25 14:00').getTime()
    }, {
      id: '@id',
      sort: 2,
      dayPeriod: 'PM', // AM、PM,
      classroomId: '@id',
      endTime: new Date('2019,11,25 15:45').getTime(),
      startTime: new Date('2019,11,25 15:00').getTime()
    }, {
      id: '@id',
      sort: 3,
      dayPeriod: 'PM', // AM、PM,
      classroomId: '@id',
      endTime: new Date('2019,11,25 16:45').getTime(),
      startTime: new Date('2019,11,25 16:00').getTime()
    }, {
      id: '@id',
      sort: 4,
      dayPeriod: 'PM', // AM、PM,
      classroomId: '@id',
      endTime: new Date('2019,11,25 17:45').getTime(),
      startTime: new Date('2019,11,25 17:00').getTime()
    }]
  }
})

/**
 *@Description
 *@Param
 *@Return 获取 课表管理 - 区域、学校上午下午的最大节次 - mock数据.
 **/
export const lessonList = Mock.mock({
  message: '区域节次数据',
  status: '000000000',
  result: {
    list: [{
      'countMax|3-6': 4,
      dayPeriod: 'AM'
    }, {
      'countMax|3-8': 4,
      dayPeriod: 'PM'
    }]
  }
})
/**
 *@Description
 *@Param
 *@Return 获取课表 排课信息 - mock数据.
 **/
export const cursorList = Mock.mock({
  message: '课表数据',
  status: '000000000',
  result: {
    'list|20-70': [{
      courseId: '@id', // 课程ID
      'status|0-2': 0, // 课程状态：0:未开始，1：进行中，2：已结束
      'isvali|0-2': 1, // 是否有效：0：无效，1：有效，-1：未判定
      startTime: new Date().getTime() + Math.round(Math.random() * 10000000), // 计划开始时间
      endTime: new Date().getTime() + Math.round(Math.random() * 10000000), // 计划结束时间
      createAt: new Date().getTime() + Math.round(Math.random() * 10000000), // 创建时间
      realStartTime: new Date().getTime() + Math.round(Math.random() * 10000000), // 实际开始时间
      realEndTime: new Date().getTime() + Math.round(Math.random() * 10000000), // 实际结束时间
      'modeCount|1-5': 2, // 一拖几（接收教室数）
      'lessonSeq|1-4': 3, // 节次
      'selfDefine|0-1': 0, // 是否自主开课：0：否，1：是
      dayPeriod: '@date(A)', // AM、PM
      'crossDomainFlag|0-1': 1, // 是否跨域：0：否，1;是
      'totalDuration|0-45': 45, // 视频总时长
      courseDate: new Date('2019,11,25 16:45').getTime(), // 课程日期 - 那一天
      'time|46400-51944': 5000,
      'attendeeType|0-1': 1, // 参与方类型 MASTER、RECEIVE
      subjectCustomName: Mock.Random.ctitle(3, 5) + '学科名', // 自定义学科名称
      gradeCustomName: Mock.Random.cword('一二三四五六七八九十', 1, 2) + '年级', // 自定义年级名称
      masterTeacherHeadPic: '主讲老师头像信息', // 课程对应的主讲参与方信息 - 主讲老师头像信息
      masterTeacherName: Mock.Random.cname() + '老师', // 课程对应的主讲参与方信息 - 主讲老师名称
      masterRoomName: '主讲' + Mock.Random.cname() + '教室', // 课程对应的主讲参与方信息 - 主讲教室名称
      masterSchoolName: '主讲' + Mock.Random.cname() + '学校', // 课程对应的主讲参与方信息 - 主讲学校名称
      masterTeacherMobile: '139' + Mock.Random.natural(50000000, 90000000), // 课程对应的主讲参与方信息 - 主讲老师手机
    }]
  }
})
/**
 *@Description
 *@Param
 *@Return 获取 - 学期 - mock数据.
 **/
export const semesterList = Mock.mock({
  message: '学期',
  status: '000000000',
  result: {
    list: [{
      baseAreaId: '@id', // 区域ID
      baseTermId: '@id', // 学期id
      endDate: new Date('2020-12-30').getTime(), // 结束日期
      startDate: new Date('2020-01-01').getTime(), // 开始日期
      name: Mock.Random.cname() + '学期', // 学期名称
    }, {
      baseAreaId: '@id', // 区域ID
      baseTermId: '@id', // 学期id
      endDate: new Date('2019-12-30').getTime(), // 结束日期
      startDate: new Date('2019-12-23').getTime(), // 开始日期
      name: Mock.Random.cname() + '学期', // 学期名称
    }, {
      baseAreaId: '@id', // 区域ID
      baseTermId: '@id', // 学期id
      endDate: new Date('2019-12-22').getTime(), // 结束日期
      startDate: new Date('2019-12-16').getTime(), // 开始日期
      name: Mock.Random.cname() + '学期', // 学期名称
    }, {
      baseAreaId: '@id', // 区域ID
      baseTermId: '@id', // 学期id
      endDate: new Date('2019-12-15').getTime(), // 结束日期
      startDate: new Date('2019-12-01').getTime(), // 开始日期
      name: Mock.Random.cname() + '学期', // 学期名称
    }]
  }
})
/**
 *@Description
 *@Param
 *@Return 获取 - 日期是否是假期 - mock数据.
 **/
export const vacationList = Mock.mock({
  message: '是否是假期',
  status: '000000000',
  'result|7': [{
    name: '节日', // 假期名称
    'isVacation|1': true, // 是否是假期
  }]
})
/**
 *@Description
 *@Param
 *@Return 获取 课表管理 - 指定教室 - 参与方信息 - mock数据.
 **/
export const participateList = Mock.mock({
  message: '指定教室参与方信息',
  status: '000000000',
  'result|7-50': [{
    'isvalid|0-1': 1, // 无效：0，有效：1，未上报：-1
    onlineTotalTime: 1575158, // 授课时长或听课时长
    joinTime: new Date('2019,11,20 17:00').getTime(),
    schoolInfo: {
      id: '@id',
      code: '@id',
      name: Mock.Random.cname() + '学校名称',
      namePath: 'namePath'
    },
    roomInfo: {
      id: '@id',
      code: '@id',
      name: Mock.Random.cname() + '教室名称',
      namePath: 'namePath'
    },
    teacherInfo: {
      userName: Mock.Random.cname() + '老师',
      mobile: '139' + Mock.Random.natural(50000000, 90000000),
      email: 'email',
      phone: 'phone',
      baseUserId: '@id',
      loginName: 'loginName',
      headPicUrl: 'headPicUrl',
    },
    areaInfo: {
      code: '测试内容3455',
      id: 33042,
      name: '测试内容5274',
      namePath: '测试内容938d'
    },
    courseId: '@id',
    attendeeId: '@id',
    attendeeType: 'MASTER',
  }],
})
/**
 *@Description
 *@Param
 *@Return 获取 课表管理、课程管理 - 指定教室扩展信息 - mock数据.
 **/
export const byCourseList = Mock.mock({
  message: '区域节次数据',
  status: '000000000',
  result: {
    courseDesc: '测试内容qy7b',
    courseId: 1111,
    courseName: '测试内容8g9m',
    coverType: 'SYSTEM', // 封面方式，本地上传：UPLOAD，系统截图：SYSTEM
    coverUrl: '测试内容7eua',
    gradeInfo: {
      id: 1111111,
      name: '阔地一年级',
      namePath: '测试内容m736'
    },
    guestCode: '测试内容22dr',
    knowledgePoints: [{
      createAt: 43201,
      modifyAt: 55207,
      pid: 22355,
      id: '11111111',
      idPath: '11111111',
      name: '语文',
      namePath: '语文'
    }, {
      createAt: 43201,
      modifyAt: 55207,
      pid: 22355,
      id: '22222222',
      idPath: '11111111-22222222',
      name: '拼音',
      namePath: '语文-拼音'
    }, {
      createAt: 43201,
      modifyAt: 55207,
      pid: 22355,
      id: '33333333',
      idPath: '11111111-22222222-33333333',
      name: '识字',
      namePath: '语文-拼音-识字'
    }, {
      createAt: 43201,
      modifyAt: 55207,
      pid: 22355,
      id: '44444444',
      idPath: '44444444',
      name: '数学',
      namePath: '数学'
    }],
    onlineTotalTime: 50,
    subjecInfo: {
      id: 3333333,
      name: '阔地语文',
      namePath: '测试内容c857'
    },
    versionInfo: {
      id: 5555555,
      name: '阔地版',
      namePath: '测试内容x7e5'
    },
    videoDelete: 44607,
    videoDeleteBy: 50201,
    videoDeleteTime: 54353,
    videoViewCount: 55825,
    volumeInfo: {
      id: 42736,
      name: '测试内容exg2',
      namePath: '测试内容jfn8'
    }
  },
})

/**
 *@Description
 *@Param
 *@Return 获取 课程管理 - 编辑课程 扩展信息 - mock数据.
 **/
export const courseUpdate = Mock.mock({
  message: '编辑课程扩展信息',
  result: {
    mes: '编辑课程 扩展信息 提交success'
  },
  status: '000000000',
})
/**
 *@Description
 *@Param
 *@Return 获取 课表管理 - 删除课程 - mock数据.
 **/
export const delCourseList = Mock.mock({
  message: '删除课程数据',
  result: {
    mes: '删除success'
  },
  status: '000000000',
})
/**
 *@Description
 *@Param
 *@Return 获取 课表管理 - 添加课程 - mock数据.
 **/
export const addCourseList = Mock.mock({
  message: '添加课程数据',
  result: {
    mes: '添加success'
  },
  status: '000000000',
})

/**
 *@Description
 *@Param
 *@Return 获取 评论管理 - 评论列表 - mock数据.
 **/
export const commentList = Mock.mock({
  message: '评论列表数据',
  result: {
    'list|15-50': [{
      id: '@id',
      userId: '@id',
      courseId: '@id',
      area: '@county',
      source: '@county',
      userName: '@cname',
      content: '@cparagraph',
      parentCommentId: '@id',
      rootCommentId: '@id',
      replyToUserId: '@id',
      userHeadPicUrl: '用户头像',
      replayToUserName: '回复用户名',
      createTime: new Date().getTime(),
      replayToUserHeadPicUrl: '回复头像地址',
    }],
    pageCount: 1,
    pageNum: 10,
    pageSize: 20,
    startRow: 1,
    'total|15-50': 20,
  },
  status: '000000000',
})
/**
 *@Description
 *@Param
 *@Return 获取 评论管理 - 评论列表 数据删除 - mock数据.
 **/
export const commentDel = Mock.mock({
  message: '评论列表删除数据',
  result: {
    mes: 'success'
  },
  status: '000000000',
})
/**
 *@Description
 *@Param
 *@Return 课程管理 - 获取年级、学科.
 **/
export const gradeSubject = Mock.mock({
  message: '年级、学科数据',
  'result|5-10': [{
    type: 'GRADE', // 学段：SEMESTER 年级：GRADE 学科：SUBJECT 版本：EDITION 分册：VOLUME
    areaId: '@id', // 区域ID
    gradeId: '@id', // 年级ID
    schoolId: '@id', // 学校ID
    volumeId: '@id', // 分册ID
    editionId: '@id', // 版本ID
    subjectId: '@id', // 学科ID
    semesterId: '@id', // 学段ID
    baseKnowledgeId: '@id', // 自身ID
    name: Mock.Random.cname() + '年级', // 年级、学科名称 -- 原名称
    customName: Mock.Random.cname() + '年级', // 年级、学科名称 --- 新名称 优先
  }],
  status: '000000000',
})
/**
 *@Description
 *@Param
 *@Return 课程管理 - 获取年级、学科.
 **/
export const pointList = Mock.mock({
  message: '年级、学科数据',
  'result|5-10': [{
    id: '@id', // 知识点id
    pid: '@id', // 父id
    name: Mock.Random.cname() + '知识点', // 知识点名称 -- 原名称
    namePath: Mock.Random.cname() + '-知识点',
  }],
  status: '000000000',
})
/**
 *@Description
 *@Param
 *@Return 获取 课程管理 - 区域、学校、学生、教师、家长门户：首页课程点播；区域、学校门户：校园直播、课程中心；区域、学校、教师空间：课程管理、实时轮询；后台课程回收站列表 - mock数据.
 **/
export const courseMgt = Mock.mock({
  message: '课程相关 公共接口',
  result: {
    'list|5-50': [{
      courseId: '@id', // 课程ID
      'isvali|0-1': 0, // 0：无效，1：有效
      coverType: 'UPLOAD', // 封面方式，本地上传：UPLOAD，系统截图：SYSTEM
      'publicFlag|0-1': 0, // 是否公开：0：不公开，1：公开
      'totalDuration|10-120': 50, // 视频总时长
      subjectBaseName: '学科基础', // 学科基础名称
      subjectCustomName: '学科自定义名称', // 学科自定义名称
      realEndTime: new Date().getTime(), // 实际结束时间
      realStartTime: new Date().getTime(), // 实际开始时间
      areaOrSchoolAttentdeeType: 'MASTER', // 课程在该平台的主讲或接收属性：MASTER:主讲，RECEIVE:接收
      allReceiveSchoolName: '接收学校字符串、接收学校字符串、接收学校字符串', // 接收学校字符串
      courseName: Mock.Random.cname() + '课程名称', // 课程名称
      masterSchoolName: Mock.Random.cname() + '学校', // 主讲学校名称
      masterTeacherName: Mock.Random.cname() + '老师', // 主讲教室名称
      gradeBaseName: Mock.Random.cword('一二三四五六七八九十', 1, 2) + '年级', // 年级基础名称
      gradeCustomName: Mock.Random.cword('一二三四五六七八九十', 1, 2) + '年级', // 年级自定义名称

      'modeCount|1-5': 2, // 一拖几（接收教室数）   ----  实时轮训
      liveTempCoverUrl: '课程封面地址下载',
      masterAreaNamePath: Mock.Random.city(),

      coverUrl: 'http://uploads.xuexila.com/allimg/1704/856-1F4051A027.jpg', // 课程封面地址 --- 空间首页 - 课程点播使用
      'videoViewCount|5-10': 5, // 课程视频观看次数
    }],
    lastResult: 0,
    firstResult: 0,
    maxResults: '', //
    pageNum: 0, // 当前页码
    pageSize: 10, // 每页显示条数
    startRow: '', //
    'pageCount|1-10': 5, // 总页数
    'total|15-40': 20, // 总条数
  },
  status: '000000000',
})
/**
 *@Description
 *@Param
 *@Return 获取 课程管理 - 获取平台 服务器配置列表.
 **/
export const serverList = Mock.mock({
  message: '服务器配置列表',
  result: {
    basePlatformId: '@id', // 平台ID
    'serverInherit|0-1': 0, // 是否继承：1-继承、0-自定义配置
    serverConfigs: [{ // 非跨域服务器配置
      type: '非跨域服务器配置', //
      serverId: '', //
      serverName: '', //
    }],
    crossDomainConfigs: [{ // 跨域服务器配置
      type: '跨域服务器配置', //
      serverId: '', //
      serverName: '', //
    }],
  },
  status: '000000000'
})
/**
 *@Description
 *@Param
 *@Return 获取 课程管理 - 获取平台 服务器配置 详情信息.
 **/
export const serverInfoList = Mock.mock({
  message: '服务器配置列表',
  result: {
    basePlatformId: '@id', // 平台ID
    'serverInherit|0-1': 0, // 是否继承：1-继承、0-自定义配置
    serverConfigs: [{ // 非跨域服务器配置
      type: '非跨域服务器配置', //
      serverId: '', //
      serverName: '', //
    }],
    crossDomainConfigs: [{ // 跨域服务器配置
      type: '跨域服务器配置', //
      serverId: '', //
      serverName: '', //
    }],
  },
  status: '000000000'
})
/**
 *@Description
 *@Param
 *@Return 获取 课程管理 - 获取平台 - 课程 - 视频资源 截图数量.
 **/
export const coverNumList = Mock.mock({
  message: '视频资源 截图数量',
  result: {
    'num|2-6': 3
  },
  status: '000000000'
})
/**
 *@Description
 *@Param
 *@Return 获取 课程管理 - 获取平台 - 课程 - 视频资源 截图数量.
 **/
export const coverImgList = Mock.mock({
  message: '视频资源 截图 地址',
  'result2-6': [{
    url: '@url'
  }],
  status: '000000000'
})
