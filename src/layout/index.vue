<!-- 整体框架 -->
<template>
  <div :class="classObj" class="app-wrapper" :style="{ '--current-color': theme }">
    <!-- 手机上打开侧边栏的遮罩层 -->
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!-- 侧边栏 -->
    <sidebar v-if="!sidebar.hide" class="sidebar-container" />
    <!-- 内容区 -->
    <div :class="{ hasTagsView: needTagsView, sidebarHide: sidebar.hide }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <!-- 页面顶部配置 -->
        <navbar @setLayout="setLayout" />
        <!-- tagsViews -->
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <Settings ref="settingRef" />
    </div>
  </div>
</template>

<script setup name="layout">
  import { settingsStore, appStore } from '@/store'
  import { useWindowSize } from '@vueuse/core'
  import Sidebar from './components/Sidebar/index.vue'
  import { AppMain, Navbar, Settings, TagsView } from './components'

  const settings = settingsStore()
  // 主题色
  const theme = computed(() => settings.theme)
  // 是否显示 tagsView
  const needTagsView = computed(() => settings.tagsView)
  // 是否固定头部
  const fixedHeader = computed(() => settings.fixedHeader)

  const app = appStore()
  // 侧边栏数据
  const sidebar = computed(() => app.sidebar)
  // 当前设备
  const device = computed(() => app.device)
  // 根据侧边栏和当前设备定义不同的class
  const classObj = computed(() => ({
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === 'mobile',
  }))

  // 监听视窗大小，判断当前设备、设置侧边栏状态
  const { width, height } = useWindowSize()
  const WIDTH = 992 // refer to Bootstrap's responsive design

  watchEffect(() => {
    if (device.value === 'mobile' && sidebar.value.opened) {
      app.closeSideBar({ withoutAnimation: false })
    }
    if (width.value - 1 < WIDTH) {
      app.toggleDevice('mobile')
      app.closeSideBar({ withoutAnimation: true })
    } else {
      app.toggleDevice('desktop')
    }
  })

  // 点击手机打开侧边栏是显式的遮罩层，关闭侧边栏
  function handleClickOutside() {
    app.closeSideBar({ withoutAnimation: false })
  }

  const settingRef = ref(null)
  function setLayout() {
    settingRef.value.openSetting()
  }
</script>

<style scoped lang="scss">
  @import '@/assets/styles/mixin.scss';
  @import '@/assets/styles/variables.module.scss';
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$base-sidebar-width});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  .sidebarHide .fixed-header {
    width: 100%;
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
