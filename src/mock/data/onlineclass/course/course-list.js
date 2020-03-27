/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/4/30 14:05
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description
 */

/**
 * 课程中心-课程列表模拟数据
 */
import Mock from 'mockjs'

export default Mock.mock({
  message: 'ok',
  result: {
    endRow: 100,
    firstPage: 6,
    hasNextPage: true,
    hasPreviousPage: true,
    isFirstPage: false,
    isLastPage: false,
    lastPage: 13,
    'list|8-16': [{
      attentdeeList: [
        {
          areaInfo: {
            areaCode: '@zip',
            areaId: 23757,
            areaName: '@city',
            areaNamePath: '@county(true)',
            orgCode: '@zip'
          },
          attendeeType: 'MASTER',
          classroomInfo: {
            id: 83355,
            roomName: '一年级一班'
          },
          courseId: 62182,
          id: 74736,
          schoolInfo: {
            id: 48133,
            orgCode: '2124511',
            schoolName: '阔地小学'
          },
          teacherInfo: {
            email: '@email',
            headPic: '@image("250x250")',
            id: 37757,
            loginName: 'admin',
            mobile: '@mobile',
            phone: '@mobile',
            userName: '@cname'
          }
        }
      ],
      courseDate: 71344,
      courseExt: {
        courseDesc: '测试内容qnh5',
        courseId: 62642,
        courseName: '这是一节演示课程',
        coverType: '测试内容8b71',
        coverUrl: '@image',
        deleteTime: null,
        deleteUserInfo: {
          userId: 84146,
          userName: '测试内容4i2p'
        },
        gradInfo: {
          code: '测试内容by5c',
          id: 76423,
          name: '三年级'
        },
        subjectInfo: {
          code: '测试内容4507',
          id: 16712,
          name: '语文'
        },
        versionInfo: {
          id: 51865,
          name: '版本信息'
        },
        volumeInfo: {
          id: 60035,
          name: '分册信息'
        }
      },
      endTime: 24364,
      id: '@natural(100000,999999)',
      isvalid: 83230,
      lessonSeq: 21551,
      materialCount: 57884,
      mcuInfo: {
        classNumber: '测试内容93p3',
        courseId: 54574,
        ctrlPwd: '测试内容238f',
        domainType: '测试内容wjie',
        joinPwd: '测试内容eo3x',
        mcuRoomMark: '测试内容b614',
        mcuRoomName: '测试内容hqv1',
        mcuServerInfo: {
          configJson: '测试内容fhcn',
          id: 56165
        },
        mcuType: '测试内容bfw5',
        mcuVideoUploadedMessage: '测试内容7531',
        mcuVideoUploadedStatus: '测试内容701h'
      },
      modeCount: 83804,
      onlineTotalTime: 43845,
      realEndTime: '@now',
      realStartTime: '@now',
      selfDefine: 53734,
      startTime: '@now',
      status: '@natural(0,2)',
      videoTotalTime: 75100
    }],
    navigateFirstPage: 6,
    navigateLastPage: 13,
    navigatePages: 8,
    nextPage: 11,
    pageNum: 1,
    pageSize: 8,
    pageCount: '@natural(1,4)',
    total: '@natural(20,154)'
  },
  status: '000000000'
})
