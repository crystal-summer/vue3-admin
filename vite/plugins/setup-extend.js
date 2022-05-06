/**
 * @name createSetupExtend
 * @description 解决vue3下 script setup语法糖下 ，手动设置组件name不方便的问题
 */
import setupExtend from 'vite-plugin-vue-setup-extend'

export default function createSetupExtend() {
  return setupExtend()
}
