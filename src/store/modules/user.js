import { defineStore } from 'pinia'

import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo, logout } from '@/api/login'
import defAva from '@/assets/logo/logo.png'

const userStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
  }),
  actions: {
    // 登录
    Login(userInfo) {
      userInfo.username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((res) => {
            setToken(res.token)
            this.token = res.token
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.user
            const avatar = user.avatar ? user.avatar : defAva

            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.roles
              this.permissions = res.permissions
            } else {
              this.roles = ['ROLE_DEFAULT']
            }
            this.name = user.userName
            this.avatar = avatar
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 退出系统
    LogOut() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut() {
      return new Promise((resolve) => {
        this.token = ''
        removeToken()
        resolve()
      })
    },
  },
})

export default userStore
