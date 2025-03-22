<template>
  <nav class="sidebar">
    <h2>Budget Tracker</h2>
    <ul>
      <li><router-link to="/">Dashboard</router-link></li>
      <li><router-link to="/expenses">Expenses</router-link></li>
      <li><router-link to="/analytics">Analytics</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: #2c3e50;
  color: white;
  padding: 20px;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar ul li {
  margin: 20px 0;
}
</style>
