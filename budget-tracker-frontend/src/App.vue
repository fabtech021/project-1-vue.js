<template>
  <div :class="['app', { 'dark-mode': isDarkMode }]">
    <header>
      <h1 class="title">Budget Tracker</h1>
      <button @click="toggleDarkMode" class="dark-mode-toggle">
        {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
      </button>
    </header>

    <main class="dashboard">
      <!-- Expense Form -->
      <ExpenseForm @expense-added="fetchExpenses" />

      <!-- Expense List -->
      <ExpenseList :expenses="expenses" @expense-deleted="fetchExpenses" />

      <!-- Progress Bar -->
      <div class="progress-container">
        <h2>Budget Progress</h2>
        <div class="progress-bar">
          <div class="progress" :style="{ width: progress + '%' }"></div>
        </div>
        <p>{{ spent }} / {{ budget }} spent</p>
      </div>

      <!-- Doughnut Chart -->
      <div class="chart-container">
        <h2>Spending Trends</h2>
        <canvas ref="spendingChartCanvas"></canvas>
      </div>

      <!-- Income vs Expense Chart -->
      <div class="chart-container">
        <h2>Income vs. Expenses</h2>
        <canvas ref="incomeExpenseChartCanvas"></canvas>
      </div>

      <!-- AI Expense Suggestions -->
      <div class="ai-suggestions">
        <h2>AI Expense Suggestions</h2>
        <p v-if="suggestion">{{ suggestion }}</p>
        <button @click="generateSuggestion">Get Suggestion</button>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from 'vue'
import axios from 'axios'
import Chart from 'chart.js/auto'
import ExpenseForm from '@/components/ExpenseForm.vue'
import ExpenseList from '@/components/ExpenseList.vue'

export default {
  components: {
    ExpenseForm,
    ExpenseList,
  },
  setup() {
    const isDarkMode = ref(false)
    const expenses = ref([])
    const income = ref(2000)
    const budget = ref(1000)
    const spent = ref(0)
    const progress = ref(0)
    const spendingChartCanvas = ref(null)
    const incomeExpenseChartCanvas = ref(null)
    let spendingChart = null
    let incomeExpenseChart = null
    const suggestion = ref('')

    // Toggle Dark Mode
    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
      document.body.classList.toggle('dark-mode', isDarkMode.value)
    }

    // Fetch Expenses from Backend
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses')
        expenses.value = response.data
        spent.value = expenses.value.reduce((sum, expense) => sum + expense.amount, 0)
        progress.value = ((spent.value / budget.value) * 100).toFixed(1)
        await nextTick(updateCharts) // Ensure DOM is updated before rendering charts
      } catch (error) {
        console.error('Error fetching expenses:', error)
      }
    }

    // Doughnut Chart - Spending Trends
    const renderSpendingChart = () => {
      if (spendingChart) spendingChart.destroy()
      spendingChart = new Chart(spendingChartCanvas.value, {
        type: 'doughnut',
        data: {
          labels: ['Spent', 'Remaining'],
          datasets: [
            {
              data: [spent.value, budget.value - spent.value],
              backgroundColor: ['#ff4d4d', '#4CAF50'],
            },
          ],
        },
      })
    }

    // Line Chart - Income vs Expenses
    const renderIncomeExpenseChart = () => {
      if (incomeExpenseChart) incomeExpenseChart.destroy()
      incomeExpenseChart = new Chart(incomeExpenseChartCanvas.value, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Income',
              data: [1800, 1900, 2100, income.value],
              borderColor: '#4CAF50',
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Expenses',
              data: [400, 700, 900, spent.value],
              borderColor: '#ff4d4d',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
      })
    }

    // AI Expense Suggestion
    const generateSuggestion = () => {
      const suggestions = [
        'Try reducing dining out to save more.',
        'Consider switching to a budget-friendly phone plan.',
        'Look for discounted subscriptions to cut entertainment costs.',
        'Optimize grocery shopping by meal planning.',
        'Avoid impulse purchases by setting a 24-hour wait rule.',
      ]
      suggestion.value = suggestions[Math.floor(Math.random() * suggestions.length)]
    }

    // Update Charts
    const updateCharts = () => {
      renderSpendingChart()
      renderIncomeExpenseChart()
    }

    onMounted(fetchExpenses)
    watch(spent, updateCharts)

    return {
      isDarkMode,
      toggleDarkMode,
      expenses,
      spent,
      budget,
      income,
      progress,
      spendingChartCanvas,
      incomeExpenseChartCanvas,
      suggestion,
      generateSuggestion,
      fetchExpenses,
    }
  },
}
</script>

<style>
/* General Styling */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

/* Background Styling */
body {
  background: linear-gradient(135deg, #1e1e2f, #1a73e8);
  color: white;
  transition: background 0.5s ease-in-out;
}

body.dark-mode {
  background: linear-gradient(135deg, #0a0a0f, #0d47a1);
  color: #e0e0e0;
}

/* Main App */
.app {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
}

/* Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Dark Mode Toggle */
.dark-mode-toggle {
  padding: 10px 15px;
  cursor: pointer;
  background: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  transition:
    background 0.3s,
    transform 0.2s;
}

.dark-mode-toggle:hover {
  background: #0056b3;
  transform: scale(1.05);
}

/* Progress Bar */
.progress-container {
  margin-top: 20px;
  text-align: center;
}

.progress-bar {
  width: 80%;
  height: 20px;
  background: grey;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px auto;
}

.progress {
  height: 100%;
  background: #4caf50;
  transition: width 0.5s ease-in-out;
}

/* Charts */
.chart-container {
  margin-top: 30px;
}

/* AI Suggestions */
.ai-suggestions {
  margin-top: 30px;
}
</style>
