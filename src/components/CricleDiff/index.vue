<template>
  <div id="circleDiff" class="container-circle">
    <div class="dot" :style="{backgroundColor:mainColor}" />
    <div class="pulse" :style="{borderColor:mainColor}" />
  </div>
</template>
<script>
export default {
  name: 'CricleDiff',
  props: {
    mainColor: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@keyframes warn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  25% {
    transform: scale(0.2);
    opacity: 0.3;
  }
  50% {
    transform: scale(0.4);
    opacity: 0.5;
  }
  // 75% {
  //   transform: scale(0.7);
  //   opacity: 0.3;
  // }
  100% {
    transform: scale(0.7);
    opacity: 0;
  }
}

.container-circle {
  position: relative;
  width: 30px;
  height: 30px;
  display: inline-block;
  margin-left: -15px;
  // border: 1px solid #000;
}
/* 保持大小不变的小圆圈  */
.dot {
  position: absolute;
  width: 6px;
  height: 6px;
  left: 50%;
  top: 50%;
  margin-top: -3px;
  margin-left: -3px;
  // -webkit-border-radius: 20px;
  // -moz-border-radius: 20px;
  // border: 2px solid red;
  // border-radius: 20px;
  background: #1890ff;
  border-radius: 50%;
  z-index: 2;
}
/* 产生动画（向外扩散变大）的圆圈  */
.pulse {
  position: absolute;
  width: 24px;
  height: 24px;
  left: 50%;
  top: 50%;
  margin-left: -12px;
  margin-top: -12px;
  border: 3px solid #1890ff;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  border-radius: 30px;
  z-index: 1;
  opacity: 0;
  -webkit-animation: warn 2s ease-out;
  -moz-animation: warn 2s ease-out;
  animation: warn 2s ease-out;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
</style>
