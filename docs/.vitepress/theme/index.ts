import { h, watch } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import { BASE_URL } from '../constants'
import Giscus from './components/giscus/index.vue'
import './rainbow.css'
import './vars.css'
// import './overrides.css'

let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Giscus)
    })
  },
  enhanceApp({ router }) {
    if (typeof window === 'undefined') return

    watch(
      () => router.route.data.relativePath,
      () => {
        updateHomePageStyle(location.pathname === BASE_URL)
      },
      { immediate: true }
    )
  }
} satisfies Theme

if (typeof window !== 'undefined') {
  // detect browser, add to class for conditional styling
  const ua = navigator.userAgent.toLowerCase()
  // const isMobile = /mobi|android|iphone|ipad|ipod/i.test(ua)

  // if (!isMobile) {
  if (ua.includes('chrome')) document.documentElement.classList.add('browser-chrome')
  else if (ua.includes('firefox')) document.documentElement.classList.add('browser-firefox')
  else if (ua.includes('safari')) document.documentElement.classList.add('browser-safari')
  // }
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    if (!document.documentElement.classList.contains('rainbow')) {
      document.documentElement.classList.add('rainbow')
    }

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}
