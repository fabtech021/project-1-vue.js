import { defineStore } from 'pinia'

export const useBudgetStore = defineStore('budget', {
  state: () => ({
    budget: 1000, // Default budget
    expenses: [],
  }),
  actions: {
    addExpense(expense) {
      this.expenses.push(expense)
    },
    setBudget(amount) {
      this.budget = amount
    },
  },
})
