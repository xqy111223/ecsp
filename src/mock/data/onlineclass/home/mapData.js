/**
 * 地图统计数据
 * */
import Mock from 'mockjs'

export default function () {
  return Mock.mock({
    result: {
      areaName: '@county',
      areaCode: 'OC001',
      areaID: 'OC001000',
      subRegion: [
        {
          areaName: '上海',
          areaCode: 'OC001',
          areaID: 'OC001000'
        },
        {
          areaName: '北京',
          areaCode: 'OC001',
          areaID: 'OC001000'
        },
        {
          areaName: '武汉',
          areaCode: 'OC001',
          areaID: 'OC001000'
        }
      ],
      totalHour: [
        {
          speaker: '@natural(10,100)',
          listener: '@natural(10,1000)'
        }
      ],
      thisTerm: [
        {
          planCount: '@natural(20,200)',
          realCount: '@natural(100,1000)',
          speakerTeacher: '@natural(100,2312)',
          listenStudents: '@natural(100,112)'
        }
      ],
      thisWeek: [
        {
          planCount: '@natural(100,912)',
          realCount: '@natural(100,712)',
          speakerTeacher: '@natural(100,312)',
          listenStudents: '@natural(100,512)'
        }
      ]
    },
    status: '000000000'
  })
}
