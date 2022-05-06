<!-- 代码地址 -->
<template>
  <div>
    <svg-icon icon-class="gitee" @click="goto" />
  </div>
</template>

<script setup>
  const url = ref('https://gitee.com/crystalSummer/vue3-admin')

  function goto() {
    window.open(url.value)
  }
</script>
