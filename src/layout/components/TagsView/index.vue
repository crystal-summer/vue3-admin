<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :data-path="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        class="tags-view-item"
        :style="activeStyle(tag)"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" @click.prevent.stop="closeSelectedTag(tag)">
          <close class="el-icon-close" style="width: 1em; height: 1em; vertical-align: middle" />
        </span>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">
        <refresh-right style="width: 1em; height: 1em" /> 刷新页面
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <close style="width: 1em; height: 1em" /> 关闭当前
      </li>
      <li @click="closeOthersTags"> <circle-close style="width: 1em; height: 1em" /> 关闭其他 </li>
      <li v-if="!isFirstView()" @click="closeLeftTags">
        <back style="width: 1em; height: 1em" /> 关闭左侧
      </li>
      <li v-if="!isLastView()" @click="closeRightTags">
        <right style="width: 1em; height: 1em" /> 关闭右侧
      </li>
      <li @click="closeAllTags(selectedTag)">
        <circle-close style="width: 1em; height: 1em" /> 全部关闭
      </li>
    </ul>
  </div>
</template>

<script setup>
  import ScrollPane from './ScrollPane'
  import { getNormalPath } from '@/utils'
  import { tagsViewStore, permissionStore, settingsStore } from '@/store'

  const visible = ref(false)
  const top = ref(0)
  const left = ref(0)
  const selectedTag = ref({})
  const affixTags = ref([])
  const scrollPaneRef = ref(null)

  const { proxy } = getCurrentInstance()
  const route = useRoute()
  const router = useRouter()

  const tagsView = tagsViewStore()
  const permission = permissionStore()
  const settings = settingsStore()

  const visitedViews = computed(() => tagsView.visitedViews)
  const routes = computed(() => permission.routes)
  const theme = computed(() => settings.theme)

  // 监听路由，路由发生改变，新增tags，并高亮当前tag
  watch(route, () => {
    addTags()
    moveToCurrentTag()
  })
  // 监听操作菜单显示，显示新增事件监听，不显示移除事件监听
  watch(visible, (value) => {
    if (value) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  })
  onMounted(() => {
    initTags()
    addTags()
  })
  // 是否是当前路由
  function isActive(r) {
    return r.path === route.path
  }
  // 当前路由样式
  function activeStyle(tag) {
    if (!isActive(tag)) return {}
    return {
      'background-color': theme.value,
      'border-color': theme.value,
    }
  }
  // 判断当前路由是否是附加的，比如首页
  function isAffix(tag) {
    return tag.meta && tag.meta.affix
  }
  // 判断是否是第一个tag
  function isFirstView() {
    try {
      return (
        selectedTag.value.fullPath === visitedViews.value[1].fullPath ||
        selectedTag.value.fullPath === '/dashboard'
      )
    } catch (err) {
      return false
    }
  }
  // 判断是否是最后一个tag
  function isLastView() {
    try {
      return (
        selectedTag.value.fullPath === visitedViews.value[visitedViews.value.length - 1].fullPath
      )
    } catch (err) {
      return false
    }
  }
  // 过滤附加affix的tag，如首页
  function filterAffixTags(routes, basePath = '') {
    let tags = []
    routes.forEach((route) => {
      if (route.meta && route.meta.affix) {
        const tagPath = getNormalPath(basePath + '/' + route.path)
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta },
        })
      }
      if (route.children) {
        const tempTags = filterAffixTags(route.children, route.path)
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags]
        }
      }
    })
    return tags
  }
  // 初始化tag - 过滤出附加的路由，新增进tags列表，页面顶部展示
  function initTags() {
    const res = filterAffixTags(routes.value)
    affixTags.value = res
    for (const tag of res) {
      // Must have tag name
      if (tag.name) {
        tagsView.addVisitedView(tag)
      }
    }
  }
  // 新增tag
  function addTags() {
    const { name } = route
    if (name) {
      tagsView.addView(route)
    }
    return false
  }
  // 高亮当前路由对应的tag，并滚动到那个位置
  function moveToCurrentTag() {
    nextTick(() => {
      for (const r of visitedViews.value) {
        if (r.path === route.path) {
          scrollPaneRef.value.moveToTarget(r)
          // when query is different then update
          if (r.fullPath !== route.fullPath) {
            tagsView.updateVisitedView(route)
          }
        }
      }
    })
  }
  // 刷新页面
  function refreshSelectedTag(view) {
    proxy.$tab.refreshPage(view)
  }

  // 关闭当前
  function closeSelectedTag(view) {
    proxy.$tab.closePage(view).then(({ visitedViews }) => {
      if (isActive(view)) {
        // 定位至下一个tag
        toLastView(visitedViews, view)
      }
    })
  }
  // 关闭右侧
  function closeRightTags() {
    proxy.$tab.closeRightPage(selectedTag.value).then((visitedViews) => {
      if (!visitedViews.find((i) => i.fullPath === route.fullPath)) {
        toLastView(visitedViews)
      }
    })
  }
  // 关闭左侧
  function closeLeftTags() {
    proxy.$tab.closeLeftPage(selectedTag.value).then((visitedViews) => {
      if (!visitedViews.find((i) => i.fullPath === route.fullPath)) {
        toLastView(visitedViews)
      }
    })
  }
  // 关闭其他
  function closeOthersTags() {
    router.push(selectedTag.value).catch(() => {})
    proxy.$tab.closeOtherPage(selectedTag.value).then(() => {
      moveToCurrentTag()
    })
  }
  // 全部关闭
  function closeAllTags(view) {
    proxy.$tab.closeAllPage().then(({ visitedViews }) => {
      if (affixTags.value.some((tag) => tag.path === route.path)) {
        return
      }
      toLastView(visitedViews, view)
    })
  }
  // 定位至下一个tag
  function toLastView(visitedViews, view) {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView) {
      router.push(latestView.fullPath)
    } else {
      // now the default is to redirect to the home page if there is no tags-view,
      // you can adjust it according to your needs.
      if (view.name === 'Dashboard') {
        // to reload home page
        router.replace({ path: '/redirect' + view.fullPath })
      } else {
        router.push('/')
      }
    }
  }
  // 打开操作菜单
  function openMenu(tag, e) {
    const menuMinWidth = 105
    const offsetLeft = proxy.$el.getBoundingClientRect().left // container margin left
    const offsetWidth = proxy.$el.offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const l = e.clientX - offsetLeft + 15 // 15: margin right

    if (l > maxLeft) {
      left.value = maxLeft
    } else {
      left.value = l
    }

    top.value = e.clientY
    visible.value = true
    selectedTag.value = tag
  }
  // 关闭操作菜单
  function closeMenu() {
    visible.value = false
  }
  // 滚动条滚动关闭操作菜单
  function handleScroll() {
    closeMenu()
  }
</script>

<style lang="scss" scoped>
  .tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    .tags-view-wrapper {
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        &:first-of-type {
          margin-left: 15px;
        }
        &:last-of-type {
          margin-right: 15px;
        }
        &.active {
          background-color: #42b983;
          color: #fff;
          border-color: #42b983;
          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 3000;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
</style>

<style lang="scss">
  //reset element css of el-icon-close
  .tags-view-wrapper {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
          width: 12px !important;
          height: 12px !important;
        }
      }
    }
  }
</style>
