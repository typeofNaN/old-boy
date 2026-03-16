import { DefaultTheme } from 'vitepress'
import { SIDEBAR_GROUP } from './constants'

export const sidebar: DefaultTheme.Sidebar = {
  [SIDEBAR_GROUP.thoseYears]: {
    base: '',
    items: [
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
        items: [{ text: '学前班', link: `${SIDEBAR_GROUP.thoseYears}study/preschool` }]
      }
    ]
  },
  [SIDEBAR_GROUP.thosePeople]: {
    base: '',
    items: [
      {
        text: '那些朋友',
        items: [{ text: '*勇', link: `${SIDEBAR_GROUP.thosePeople}friend/yong` }]
      }
    ]
  }
}
