/**
 * @name install
 * @description 全局注册使用element-plus的icon
 */
import * as components from '@element-plus/icons-vue'

export default {
  install: (app) => {
    for (const key in components) {
      const componentConfig = components[key]
      app.component(componentConfig.name, componentConfig)
    }
  },
}
