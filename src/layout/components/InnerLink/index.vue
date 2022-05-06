<!--  -->
<template>
  <div id="index"></div>
</template>

<script setup name="InnerLink">
  const form = reactive({})
  onBeforeMount(() => {
    console.log('组件挂载页面之前执行----onBeforeMount')
  })
  onMounted(() => {
    console.log('组件挂载到页面之后执行-------onMounted')
  })
</script>

<style scoped lang="scss"></style>
