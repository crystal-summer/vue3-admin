/**
 * @description 表单校验方法
 */

/**
 * 判断url是否是http或https
 * @param {string} path
 * @returns {Boolean}
 */
export function isHttp(url) {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
}

/**
 * 判断path是否为外链
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

// 非空，必填
export const notEmpty = (str) => ({ required: true, message: '请输入' + str, trigger: 'blur' })

// 筛选，必选
export const notSelect = (str) => ({ required: true, message: '请选择' + str, trigger: 'change' })

// 不能有空格
export const noBlank = () => ({ pattern: /^(\S)+$/, message: '不能有空格', trigger: 'blur' })

// 必须是数字
export const mustNumber = () => {
  return { type: 'number', message: `必须为数字`, trigger: 'blur' }
}

// 手机号 /^1[3456789]\d{9}$/
export const isPhone = () => ({
  pattern: /^1[3456789]\d{9}$/,
  message: '不是合法的手机号',
  trigger: 'blur',
})

// 链接
// export const isHttp = (str) => ({
//   required: true,
//   pattern: /^(http|https)\S*/,
//   message: '开头必须是http或者https',
//   trigger: 'blur',
// })

// 必须正整数
export const isInteger = (str) => {
  return { pattern: /^[0-9]+$/, message: str + `必须为整数`, trigger: 'blur' }
}

// 必须为数字，可以是小数（小数位不限）
export const isDecimal = () => {
  return { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: `必须为数字`, trigger: 'blur' }
}

// 必须为数字，可以是小数，但是必须是保留两位小数点的数字
export const isDecimalTwo = () => {
  return {
    pattern: /^[0-9]+(.[0-9]{2})?$/,
    message: `必须为数字,只可保留两位小数`,
    trigger: 'blur',
  }
}

// 必须为数字，可以是小数，小数位一位或者两位
export const isFloat2Num = () => {
  return {
    pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/,
    message: `必须为数值且最多两位小数`,
    trigger: 'blur',
  }
}

// 判断长度
export const lengthBetween = (start, end) => {
  return { min: start, max: end, message: `长度在 ${start} 到 ${end} 个字符`, trigger: 'blur' }
}
