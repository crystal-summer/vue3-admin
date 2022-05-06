<!-- 代码地址 -->
<template>
  <div>
    <svg-icon :icon-class="icon" @click="goto" />
  </div>
</template>

<script setup>
  const props = defineProps({
    icon: {
      type: String,
      default: 'gitee',
    },
    url: {
      type: String,
      default: 'https://gitee.com/crystalSummer/vue3-admin',
    },
  })

  function goto() {
    window.open(props.url)
  }
</script>
