//employee dashboard
// api.js - central API helper for React frontend

const API_BASE_URL = "http://localhost:8080/api"; // Spring Boot backend base URL

// Add Expense (with file upload)
export async function addExpense(expenseData) {
  try {
    const formData = new FormData();
    formData.append("title", expenseData.title);
    formData.append("category", expenseData.category);
    formData.append("amount", expenseData.amount);
    formData.append("currency", expenseData.currency);
    formData.append("dateIncurred", expenseData.date);
    formData.append("description", expenseData.description);
    if (expenseData.receipt) {
      formData.append("receipt", expenseData.receipt);
    }

    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to submit expense");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Fetch all expenses
export async function getExpenses() {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch expenses");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
