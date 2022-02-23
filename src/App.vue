<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style  >
* {
  margin: 10px;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
.app__btns {
  display: flex;
  justify-content: space-between;
}
</style>