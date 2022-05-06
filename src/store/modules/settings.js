import { defineStore } from 'pinia'

import variables from '@/assets/styles/variables.module.scss'
import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'

const storageSetting = localStorage.getItem('layout-setting') || ''

const settingsStore = defineStore('setting', {
  state: () => ({
    title: '',
    theme: storageSetting.theme || variables.primaryColor,
    sideTheme: storageSetting.sideTheme || defaultSettings.sideTheme,
    showSettings: defaultSettings.showSettings,
    topNav: storageSetting.topNav ? storageSetting.topNav : defaultSettings.topNav,
    tagsView: storageSetting.tagsView ? storageSetting.tagsView : defaultSettings.tagsView,
    fixedHeader: storageSetting.fixedHeader
      ? storageSetting.fixedHeader
      : defaultSettings.fixedHeader,
    sidebarLogo: storageSetting.sidebarLogo
      ? storageSetting.sidebarLogo
      : defaultSettings.sidebarLogo,
    dynamicTitle: storageSetting.dynamicTitle
      ? storageSetting.dynamicTitle
      : defaultSettings.dynamicTitle,
  }),
  actions: {
    // 修改布局设置
    changeSetting(data) {
      const { key, value } = data
      if (this.hasOwnProperty(key)) {
        this[key] = value
      }
    },
    // 设置网页标题
    setTitle(title) {
      this.title = title
      // 修改标题
      useDynamicTitle()
    },
  },
})

export default settingsStore
