/**
 * @name createAutoRegistryComponents
 * @description 按需加载，自动引入组件
 */
import Components from 'unplugin-vue-components/vite'

export default function createAutoRegistryComponents() {
  return Components({
    // relative paths to the directory to search for components.
    // 指定搜索组件的目录的相对路径
    // dirs: ['src/components'],
    // valid file extensions for components.
    // 指定组件的有效文件扩展名
    // extensions: ['vue'],
    // search for subdirectories
    // 是否搜索子目录
    // deep: true,
    // resolvers for custom components
    // 自定义组件的解析器
    // resolvers: [],
    // generate `components.d.ts` global declarations,
    // also accepts a path for custom filename
    // 运行时会自动生成一个components.d.ts文件，默认路径是在根目录，还接受自定义文件名的路径
    // dts: false,
    // Allow subdirectories as namespace prefix for components.
    // 是否允许子目录作为组件的命名空间前缀，当遇到命名冲突的时候，可以将其设置成true
    // directoryAsNamespace: false,
    // Subdirectory paths for ignoring namespace prefixes
    // works when `directoryAsNamespace: true`
    // 当 directoryAsNamespace: true 时，可以在这里设置忽略命名空间前缀的子目录路径
    // globalNamespaces: [],
    // auto import for directives
    // default: `true` for Vue 3, `false` for Vue 2
    // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
    // To install Babel, run: `npm install -D @babel/parser @babel/traverse`
    // 自动引入指令， Vue 3默认是true
    // directives: true,
    // filters for transforming targets
    // 根据后缀或者文件夹过滤要引入的组件
    // include: [/\.vue$/, /\.vue\?vue/],
    // exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
  })
}
