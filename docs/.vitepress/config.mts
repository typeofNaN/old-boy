import { defineConfig } from 'vitepress'

import { BASE_URL } from './constants'
import { nav } from './nav'
import { sidebar } from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: BASE_URL,
  title: 'typeofNaN的30岁',
  description: 'A VitePress Site',
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: `${BASE_URL}favicon.ico`, type: 'image/x-icon' }]],
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc'
                }
              }
            }
          }
        }
      }
    },

    nav,

    notFound: {
      title: '页面未找到',
      quote: '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '前往首页',
      linkText: '带我回首页'
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容',

    outline: {
      label: '页面导航',
      level: 'deep'
    },

    lastUpdated: {
      text: '最后更新于'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    footer: {
      message: '由 VitePress 和 日月星辰 强力驱动 | 吾之臂躯，行针步线',
      copyright: '版权所有 © typeofNaN · 赣ICP备2023003304号-1'
    },

    sidebar,

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/typeofNaN/the-age-of-thirty'
      }
    ]
  },
  markdown: {
    container: {
      tipLabel: '“',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }
})
