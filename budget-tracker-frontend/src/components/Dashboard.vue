<template>
  <div>
    <h1>Budget Dashboard</h1>
    <ExpenseForm @expense-added="emitExpensesUpdated" />
    <ExpenseList :expenses="expenses" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import ExpenseForm from '../components/ExpenseForm.vue'
import ExpenseList from '../components/ExpenseList.vue'
import api from '../api/api.js' // Ensure correct path

export default {
  components: {
    ExpenseForm,
    ExpenseList,
  },
  setup(_, { emit }) {
    const expenses = ref([])

    // Fetch expenses
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/expenses')
        expenses.value = response.data
      } catch (error) {
        console.error('Error fetching expenses:', error)
      }
    }

    // Emit event to notify App.vue that expenses changed
    const emitExpensesUpdated = () => {
      fetchExpenses()
      emit('expenses-updated') // Notify App.vue
    }

    onMounted(fetchExpenses)

    return { expenses, fetchExpenses, emitExpensesUpdated }
  },
}
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
