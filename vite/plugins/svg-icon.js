/**
 * @name createSvgIcon
 * @description 加载SVG文件，自动引入
 */
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

export default function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [resolve(process.cwd(), 'src/assets/icons/svg')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
    /**
     * 自定义插入位置
     * @default: body-last
     */
    // inject: 'body-last' | 'body-first',

    /**
     * custom dom id
     * @default: __svg__icons__dom__
     */
    // customDomId: '__svg__icons__dom__',

    // svg 压缩配置
    svgoOptions: isBuild,
  })
}
