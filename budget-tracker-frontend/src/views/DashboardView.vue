<template>
  <div class="dashboard">
    <Sidebar />
    <div class="content">
      <Header />
      <div class="widgets">
        <ExpenseForm />
        <ExpenseList />
        <ExpenseChart />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import ExpenseForm from '@/components/ExpenseForm.vue'
import ExpenseList from '@/components/ExpenseList.vue'
import ExpenseChart from '@/components/ExpenseChart.vue'

export default {
  components: { Sidebar, Header, ExpenseForm, ExpenseList, ExpenseChart },
}
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}
.content {
  flex: 1;
  padding: 20px;
  background-color: #f4f4f4;
}
.widgets {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
</style>
