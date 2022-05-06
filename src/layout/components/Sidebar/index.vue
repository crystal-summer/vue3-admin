<!-- 侧边栏 -->
<template>
  <div
    :class="{ 'has-logo': showLogo }"
    :style="{
      backgroundColor:
        sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground,
    }"
  >
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="
          sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground
        "
        :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
        :unique-opened="true"
        :active-text-color="theme"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup name="sidebar">
  import { settingsStore, permissionStore, appStore } from '@/store'
  import variables from '@/assets/styles/variables.module.scss'
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'

  // 当前路由
  const route = useRoute()

  const settings = settingsStore()
  // 是否展示侧边朗顶部logo
  const showLogo = computed(() => settings.sidebarLogo)
  // 侧边栏主题
  const sideTheme = computed(() => settings.sideTheme)
  // 主题色
  const theme = computed(() => settings.theme)

  const app = appStore()
  // 是否水平折叠收起菜单
  const isCollapse = computed(() => !app.sidebar.opened)

  const permission = permissionStore()
  // 侧边栏路由
  const sidebarRouters = computed(() => permission.sidebarRouters)

  // 高亮当前/指定菜单
  const activeMenu = computed(() => {
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  })
</script>

<style scoped lang="scss"></style>
