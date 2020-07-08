<template>
  <div id="app">
    <Overview />
  </div>
</template>

<script>
import Overview from './components/Overview.vue'

export default {
  name: 'App',
  components: {
    Overview
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
