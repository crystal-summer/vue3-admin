import { createPinia } from 'pinia'

import userStore from './modules/user'
import settingsStore from './modules/settings'
import appStore from './modules/app'
import tagsViewStore from './modules/tagsView'
import permissionStore from './modules/permission'

const pinia = createPinia()

export { userStore, settingsStore, appStore, tagsViewStore, permissionStore }
export default pinia
