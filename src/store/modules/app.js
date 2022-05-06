import { defineStore } from 'pinia'

import Cookies from 'js-cookie'

const appStore = defineStore('app', {
  state: () => ({
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false,
      hide: false,
    },
    device: 'desktop',
    size: Cookies.get('size') || 'default',
  }),
  actions: {
    // 侧边栏显示/关闭 toggle 操作
    toggleSideBar() {
      if (this.sidebar.hide) {
        return false
      }
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    // 关闭侧边栏
    closeSideBar({ withoutAnimation }) {
      Cookies.set('sidebarStatus', 0)
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    // 判断当前设备是mobile or desktop
    toggleDevice(device) {
      this.device = device
    },
    // 设置element-plus组件尺寸大小
    setSize(size) {
      this.size = size
      Cookies.set('size', size)
    },
    // 侧边栏hide状态切换
    toggleSideBarHide(status) {
      this.sidebar.hide = status
    },
  },
})
export default appStore
