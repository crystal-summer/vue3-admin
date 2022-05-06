/**
 * @name createAutoImport
 * @description 按需加载，自动引入api
 */
import autoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
  return autoImport({
    // targets to transformS
    // include: [
    //   /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    //   /\.vue$/, /\.vue\?vue/, // .vue
    //   /\.md$/, // .md
    // ],

    // global imports to register
    imports: ['vue', 'pinia', 'vue-router'],
    // 运行时会自动生成一个auto-imports.d.js文件，默认路径是在根目录，还接受自定义文件名的路径
    // 设置成false不生成该文件
    dts: false,
  })
}
