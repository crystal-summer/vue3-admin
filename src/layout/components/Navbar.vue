<!-- 页面顶部配置  -->
<template>
  <div class="navbar">
    <!-- 侧边栏开关 -->
    <hamburger
      id="hamburger-container"
      :is-active="app.sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <!-- 面包屑 -->
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!settings.topNav" />
    <!-- 顶部导航 -->
    <top-nav id="topmenu-container" class="topmenu-container" v-if="settings.topNav" />

    <!-- 右侧操作中心 -->
    <div class="right-menu">
      <template v-if="app.device !== 'mobile'">
        <header-search id="header-search" class="right-menu-item" />

        <el-tooltip content="github源码地址" effect="dark" placement="bottom">
          <code-address
            icon="github"
            url="https://github.com/crystal-summer/vue3-admin"
            class="right-menu-item hover-effect"
          />
        </el-tooltip>

        <el-tooltip content="gitee源码地址" effect="dark" placement="bottom">
          <code-address class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-tooltip content="文档地址" effect="dark" placement="bottom">
          <code-doc class="right-menu-item hover-effect" />
        </el-tooltip>

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>
      <div class="avatar-container">
        <el-dropdown @command="handleCommand" class="right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <img :src="user.avatar" class="user-avatar" />
            <el-icon><caret-bottom /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/user/profile">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <el-dropdown-item command="setLayout">
                <span>布局设置</span>
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup name="Navbar">
  import Hamburger from '@/components/Hamburger'
  import Breadcrumb from '@/components/Breadcrumb'
  import TopNav from '@/components/TopNav'
  import HeaderSearch from '@/components/HeaderSearch'
  import CodeAddress from '@/components/Git/CodeAddress'
  import CodeDoc from '@/components/Git/Doc'
  import Screenfull from '@/components/Screenfull'
  import SizeSelect from '@/components/SizeSelect'
  import { settingsStore, appStore, userStore } from '@/store'
  import { ElMessageBox } from 'element-plus'

  const settings = reactive(settingsStore())
  const app = appStore()
  const user = userStore()

  // 点击hamburger-侧边栏开关
  function toggleSideBar() {
    app.toggleSideBar()
  }

  function handleCommand(command) {
    switch (command) {
      case 'setLayout':
        setLayout()
        break
      case 'logout':
        logout()
        break
      default:
        break
    }
  }

  function logout() {
    ElMessageBox.confirm('确定退出系统吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        user.LogOut().then(() => {
          location.href = '/dashboard'
        })
      })
      .catch(() => {})
  }

  const emits = defineEmits(['setLayout'])
  function setLayout() {
    emits('setLayout')
  }
</script>

<style scoped lang="scss">
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .topmenu-container {
      position: absolute;
      left: 50px;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;
      display: flex;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 40px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          i {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
