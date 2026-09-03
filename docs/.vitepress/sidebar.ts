import { DefaultTheme } from 'vitepress'
import { SIDEBAR_GROUP } from './constants'

export const sidebar: DefaultTheme.Sidebar = {
  [SIDEBAR_GROUP.thoseYears]: [
    {
      text: '序章',
      items: [{ text: '老男孩', link: `${SIDEBAR_GROUP.thoseYears}prologue/old-boy` }]
    },
    {
      text: '你好，世界',
      items: [
        { text: '一场大雨', link: `${SIDEBAR_GROUP.thoseYears}life/rain` },
        { text: '这是家', link: `${SIDEBAR_GROUP.thoseYears}life/family` },
        { text: '我的老家，就住在这个屯', link: `${SIDEBAR_GROUP.thoseYears}life/hometown` },
        { text: '童年', link: `${SIDEBAR_GROUP.thoseYears}life/childhood` }
      ]
    },
    {
      text: '读书郎，上学堂',
      items: [
        { text: '学前班', link: `${SIDEBAR_GROUP.thoseYears}study/preschool` },
        { text: '他们都叫我小学生', link: `${SIDEBAR_GROUP.thoseYears}study/school-kid` },
        { text: '光荣啊！少先队员！', link: `${SIDEBAR_GROUP.thoseYears}study/young-pioneer` },
        { text: '即将来到的新学校', link: `${SIDEBAR_GROUP.thoseYears}study/new-school` },
        { text: '五改六', link: `${SIDEBAR_GROUP.thoseYears}study/five-to-six` }
      ]
    },
    {
      text: '龙中往事',
      items: []
    },
    {
      text: '平川记忆',
      items: []
    },
    {
      text: '嘿！江师大！',
      items: []
    }
  ],
  [SIDEBAR_GROUP.thosePeople]: [
    {
      text: '那些朋友',
      items: [{ text: '*勇', link: `${SIDEBAR_GROUP.thosePeople}friend/yong` }]
    }
  ]
}
