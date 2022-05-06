import { settingsStore } from '@/store'
import defaultSettings from '@/settings'

/**
 * 动态修改浏览器标题
 */
export function useDynamicTitle() {
  const settings = settingsStore()
  if (settings.dynamicTitle) {
    document.title = settings.title + ' - ' + defaultSettings.title
  } else {
    document.title = defaultSettings.title
  }
}
