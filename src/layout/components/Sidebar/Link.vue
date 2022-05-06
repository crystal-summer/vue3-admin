<template>
  <component :is="type" v-bind="linkProps()">
    <slot />
  </component>
</template>

<script setup>
  import { isExternal } from '@/utils/validate'

  const props = defineProps({
    to: {
      type: [String, Object],
      required: true,
    },
  })

  // 判断是否是外链
  const isExt = computed(() => {
    return isExternal(props.to)
  })

  const type = computed(() => {
    if (isExt.value) {
      // 外链 a 标签
      return 'a'
    }
    // 非外链
    return 'router-link'
  })

  function linkProps() {
    if (isExt.value) {
      // 外链属性
      return {
        href: props.to,
        target: '_blank',
        rel: 'noopener',
      }
    }
    // 路由属性
    return {
      to: props.to,
    }
  }
</script>
