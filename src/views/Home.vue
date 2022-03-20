<template>
  <div class="home-container page-container">
    <img alt="Vue logo" class="vue-element-plus-logo" src="../assets/logo.png" />
    <img alt="Vue logo" class="vue-element-plus-logo-type" src="../assets/type.png" />
    <div class="page-title">Vue3 + TypeScript + Element Plus</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home'
})
</script>

<style lang="stylus" scoped>
.home-container {
  .vue-element-plus-logo {
    width 50%
  }
}

.home-container {
  .vue-element-plus-logo-type {
    width 15%
    margin-bottom 2.1rem
  }
}
</style>
