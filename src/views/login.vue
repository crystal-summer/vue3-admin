<!-- 登录 -->
<template>
  <login-bg></login-bg>
  <div class="login">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      status-icon
      class="login-form"
    >
      <h3 class="title">vue3后台管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="账号" clearable prefix-icon="Avatar" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          clearable
          @keyup.enter.native="handleLogin"
          prefix-icon="Lock"
        />
      </el-form-item>
      <el-form-item class="img-code-item" v-if="captchaOnOff" prop="code">
        <el-input v-model="loginForm.code" placeholder="验证码" clearable>
          <template #prefix>
            <svg-icon icon-class="validCode"></svg-icon>
          </template>
        </el-input>
        <el-image :src="codeUrl" @click="getCode" class="login-code-img" fit="fill">
          <template #error>
            <div class="image-slot">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="loginForm.rememberMe" label="记住密码"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="handleLogin">{{
          !loading ? '登 录' : '登 录 中...'
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup name="Login">
  import LoginBg from '@/components/LoginBg/index.vue'
  import { getCodeImg } from '@/api/login'
  import Cookies from 'js-cookie'
  import { encrypt, decrypt } from '@/utils/jsencrypt'
  import { notEmpty } from '@/utils/validate'
  import { userStore } from '@/store'

  // 局部组件-登录背景
  defineComponent({ LoginBg })

  // 路由
  const router = useRouter()

  // 当前实例
  const { proxy } = getCurrentInstance()

  // 登录表单
  const loginForm = reactive({
    username: 'admin',
    password: 'admin123',
    rememberMe: false,
    code: '',
    uuid: '',
  })

  // 登录表单校验规则
  const loginRules = {
    username: [notEmpty('账号')],
    password: [notEmpty('密码')],
    code: [notEmpty('验证码')],
  }

  // 验证码开关
  const captchaOnOff = ref(true)
  // 验证图片url
  const codeUrl = ref('')

  // 登录状态
  const loading = ref(false)

  // 获取图片验证码和uuid
  const getCode = () => {
    getCodeImg().then((res) => {
      captchaOnOff.value = res.captchaOnOff ? true : res.captchaOnOff
      if (captchaOnOff.value) {
        codeUrl.value = 'data:image/gif;base64,' + res.img
        loginForm.uuid = res.uuid
      }
    })
  }

  // 从cookie中获取用户名密码
  const getCookie = () => {
    const username = Cookies.get('username')
    const password = Cookies.get('password')
    const rememberMe = Cookies.get('rememberMe')
    loginForm.username = username === undefined ? loginForm.username : username
    loginForm.password = password === undefined ? loginForm.password : decrypt(password)
    loginForm.rememberMe = rememberMe === undefined ? false : Boolean(rememberMe)
  }

  // 登录
  const handleLogin = () => {
    proxy.$refs.loginFormRef.validate((valid) => {
      if (valid) {
        loading.value = true
        if (loginForm.rememberMe) {
          Cookies.set('username', loginForm.username, { expires: 30 })
          Cookies.set('password', encrypt(loginForm.password).toString(), { expires: 30 })
          Cookies.set('rememberMe', loginForm.rememberMe.toString(), { expires: 30 })
        } else {
          Cookies.remove('username')
          Cookies.remove('password')
          Cookies.remove('rememberMe')
        }
        const user = userStore()
        // 调用action的登录方法
        user
          .Login(loginForm)
          .then(() => {
            router.push({ path: '/dashboard' })
          })
          .catch(() => {
            loading.value = false
            // 重新获取验证码
            if (captchaOnOff.value) {
              getCode()
            }
          })
      } else {
        return false
      }
    })
  }

  // 获取图片验证码和uuid
  getCode()
  // 从cookie中获取用户名密码
  getCookie()
</script>

<style scoped lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    &-form {
      border-radius: 6px;
      background: #ffffff;
      width: 400px;
      padding: 25px 25px 5px 25px;
      .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #707070;
      }
    }
  }
  :deep(.img-code-item) {
    .el-form-item__content {
      justify-content: space-between;
      .el-input {
        width: 65%;
      }
      .el-image {
        width: 30%;
        height: 32px;
        border-radius: 4px;
      }
    }
  }
</style>
