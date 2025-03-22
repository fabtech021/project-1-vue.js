<template>
  <div class="chart">
    <h2>Expense Analytics</h2>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import { onMounted, ref } from 'vue'
import { useBudgetStore } from '@/store/budgetStore'

export default {
  setup() {
    const chartCanvas = ref(null)
    const store = useBudgetStore()

    onMounted(() => {
      new Chart(chartCanvas.value, {
        type: 'pie',
        data: {
          labels: store.expenses.map((e) => e.name),
          datasets: [
            {
              data: store.expenses.map((e) => e.amount),
              backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
            },
          ],
        },
      })
    })

    return { chartCanvas }
  },
}
</script>

<style scoped>
.chart {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
