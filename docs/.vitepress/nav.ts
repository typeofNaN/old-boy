import { DefaultTheme } from 'vitepress'
import { SIDEBAR_GROUP } from './constants'

export const nav: DefaultTheme.NavItem[] = [
  {
    text: '那些年',
    link: `${SIDEBAR_GROUP.thoseYears}prologue/old-boy`,
    activeMatch: SIDEBAR_GROUP.thoseYears
  },
  {
    text: '那些人',
    link: `${SIDEBAR_GROUP.thosePeople}friend/yong`,
    activeMatch: SIDEBAR_GROUP.thosePeople
  }
]
