<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script setup>
  const url = ref(
    'https://crystalsummer.gitee.io/2022/03/28/Vue3%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E6%A1%86%E6%9E%B6%E6%90%AD%E5%BB%BA/',
  )

  function goto() {
    window.open(url.value)
  }
</script>
