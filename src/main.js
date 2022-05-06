import { createApp } from 'vue'
import App from './App.vue'

// element-plus
import '@/assets/styles/element-index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// element-plus 国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// svg图标
import elementIcons from '@/components/SvgIcon/svgicon'
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'

// 路由
import router from './router'

// 状态管理 - pinia
import store from './store'

// 全局样式
import '@/assets/styles/index.scss'

// Cookies
import Cookies from 'js-cookie'

// 注册指令
import plugins from './plugins'

import './permission'

import directive from './directive'

const app = createApp(App)

directive(app)

app
  .use(ElementPlus, { size: Cookies.get('size') || 'default', locale: zhCn })
  .use(elementIcons)
  .use(router)
  .use(store)
  .use(plugins)
  .component('svg-icon', SvgIcon)
  .mount('#app')
