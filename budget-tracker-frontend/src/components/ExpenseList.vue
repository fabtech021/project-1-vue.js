<template>
  <div class="expense-list">
    <h2>Expense List</h2>
    <ul>
      <li v-for="expense in expenses" :key="expense.id">
        {{ expense.category }} - Ksh {{ expense.amount }}
        <button @click="deleteExpense(expense.id)">🗑</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../api/api.js'

export default {
  setup() {
    const expenses = ref([])

    // Fetch expenses from backend
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/expenses')
        expenses.value = response.data
      } catch (error) {
        console.error('Error fetching expenses:', error)
      }
    }

    // Delete expense
    const deleteExpense = async (id) => {
      try {
        await api.delete(`/expenses/${id}`)
        fetchExpenses() // Refresh after deletion
      } catch (error) {
        console.error('Error deleting expense:', error)
      }
    }

    onMounted(fetchExpenses)

    return { expenses, deleteExpense }
  },
}
</script>

<style>
/* Expense List */
.expense-list {
  margin-top: 20px;
  padding: 20px;
}

/* Expense Card Styling */
.expense-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.expense-card {
  background: rgba(0, 136, 255, 0.1);
  border-left: 5px solid #0088ff;
  border-radius: 10px;
  padding: 15px;
  width: 250px;
  transition: transform 0.3s ease-in-out;
}

.expense-card:hover {
  transform: translateY(-5px);
}
</style>
