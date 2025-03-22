import { defineStore } from 'pinia'

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    expenses: [],
  }),
  actions: {
    addExpense(expense) {
      this.expenses.push(expense)
    },
    deleteExpense(index) {
      this.expenses.splice(index, 1)
    },
  },
})
