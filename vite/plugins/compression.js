/**
 * @name createCompression
 * @description 资源压缩
 */
import compression from 'vite-plugin-compression'

export default function createCompression(env) {
  /**
   * verbose	boolean	true	是否在控制台输出压缩结果
   * filter	RegExp or (file: string) => boolean	DefaultFilter	指定哪些资源不压缩
   * disable	boolean	false	是否禁用
   * threshold	number	-	体积大于 threshold 才会被压缩,单位 b
   * algorithm	string	gzip	压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
   * ext	string	.gz	生成的压缩包后缀
   * compressionOptions	object	-	对应的压缩算法的参数
   * deleteOriginFile	boolean	-	压缩后是否删除源文件
   */
  const plugin = []
  plugin.push(
    compression({
      ext: '.gz',
      deleteOriginFile: false,
    }),
  )
  return plugin
}
