/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/14 17:24
 *   @Author Waroom (yinmeng@codyy.com)
 *   @Description
 */
import Mock from 'mockjs'

export default Mock.mock({
  message: 'ok',
  'result|8-35': [{
    areaInfo: {
      areaId: '@zip',
      areaName: '@city',
      areaNamePath: '@county(true)',
    },
    headPic: '@image("250x250")',
    id: '@natural(2454564,987454124)',
    schoolInfo: {
      id: 48133,
      orgCode: '2124511',
      name: '阔地小学'
    },
    roleInfo: {
      id: 12312,
      roleCode: 'fdsaf',
      roleName: '管理员'
    },
    loginName: '@name',
    mobile: '@mobile',
    phone: '@mobile',
    userName: '@cname',
    studentExt: {
      classInfo: {
        classId: 'fdsaffdsa',
        className: '一年一班'
      },
      entranceYear: '',
      gradeInfo: {
        id: 123,
        code: 123,
        name: '一年级'
      },
      sectionInfo: {},
      stuNo: 'test123'
    }
  }],
  status: '000000000'
})
