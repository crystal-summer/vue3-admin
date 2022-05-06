import { defineConfig } from 'vite'
import { resolve } from 'path'
import createVitePlugins from './vite/plugins'

function resolvePath(paths) {
  return resolve(__dirname, paths)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  return {
    // 项目中用到的插件集合
    plugins: createVitePlugins(command === 'build'),
    resolve: {
      // alias - 路径别名 https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        '@': resolvePath('src'),
      },
      // 导入时想要省略的扩展名列表 https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    // server - 本地开发相关配置
    server: {
      host: '0.0.0.0', // IP配置，支持从IP启动
      port: 3000, // 端口号
      open: true, // 自动打开浏览器
      // 接口代理
      proxy: {
        '/vue3-admin': {
          target: `http://vue.ruoyi.vip/prod-api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/vue3-admin/, ''),
        },
      },
    },
  }
})
