<!-- 侧边栏 - 菜单 -->
<template>
  <div v-if="!item.hidden">
    <!-- 无子菜单 - 外链的话是 a 链接 / 路由的话是 router-link -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <svg-icon :icon-class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
          <template #title
            ><span class="menu-title" :title="hasTitle(onlyOneChild.meta.title)">{{
              onlyOneChild.meta.title
            }}</span></template
          >
        </el-menu-item>
      </app-link>
    </template>

    <!-- 有子菜单 -->
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template v-if="item.meta" #title>
        <svg-icon :icon-class="item.meta && item.meta.icon" />
        <span class="menu-title" :title="hasTitle(item.meta.title)">{{ item.meta.title }}</span>
      </template>

      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup name="SidebarItem">
  import { isExternal } from '@/utils/validate'
  import { getNormalPath } from '@/utils'
  import AppLink from './Link'

  const props = defineProps({
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    // 路由完整路径
    basePath: {
      type: String,
      default: '',
    },
  })

  const onlyOneChild = ref({})

  function hasOneShowingChild(children = [], parent) {
    if (!children) {
      children = []
    }
    const showingChildren = children.filter((item) => {
      if (item.hidden) {
        return false
      } else {
        // Temp set(will be used if only has one showing child)
        onlyOneChild.value = item
        return true
      }
    })

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
      return true
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
      onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
      return true
    }

    return false
  }

  // 路径整合 - submenu index的唯一标识
  function resolvePath(routePath, routeQuery) {
    // isExternal 判断路径是否是外链
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(props.basePath)) {
      return props.basePath
    }
    if (routeQuery) {
      let query = JSON.parse(routeQuery)
      return { path: getNormalPath(props.basePath + '/' + routePath), query: query }
    }
    return getNormalPath(props.basePath + '/' + routePath)
  }

  // 菜单名称超过五个字设置title属性，鼠标悬停显示title
  function hasTitle(title) {
    if (title.length > 5) {
      return title
    } else {
      return ''
    }
  }
</script>

<style scoped lang="scss"></style>
