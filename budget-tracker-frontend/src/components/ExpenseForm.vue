<template>
  <form @submit.prevent="addExpense">
    <input v-model="category" type="text" placeholder="Category" required />
    <input v-model="amount" type="number" placeholder="Amount" required />
    <button type="submit">Add Expense</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import api from '../api/api.js' // Ensure this path is correct

export default {
  setup(_, { emit }) {
    const category = ref('')
    const amount = ref('')

    const addExpense = async () => {
      console.log('🚀 Add Expense clicked!') // Debugging log
      console.log('Category:', category.value, 'Amount:', amount.value) // Debug inputs

      if (!category.value || !amount.value) {
        alert('Please fill in all fields.') // Show an alert if inputs are empty
        return
      }

      try {
        const response = await api.post('/expenses', {
          category: category.value,
          amount: amount.value,
        })

        console.log('✅ Expense added successfully:', response.data)

        category.value = '' // Reset form
        amount.value = ''
        emit('expenseAdded') // Notify parent component
      } catch (error) {
        console.error('❌ Error adding expense:', error)
      }
    }

    return { category, amount, addExpense }
  },
}
</script>

<style scoped>
form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
button {
  background: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
