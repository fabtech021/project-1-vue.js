<template>
  <header class="header">
    <h1>Dashboard</h1>
    <button @click="toggleTheme">🌙</button>
  </header>
</template>

<script>
export default {
  methods: {
    toggleTheme() {
      document.body.classList.toggle('dark-mode')
    },
  },
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: white;
  border-bottom: 1px solid #ddd;
}
.dark-mode {
  background: #1e1e1e;
  color: white;
}
</style>
