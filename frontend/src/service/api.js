import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

export const getExpenses = () => API.get('/api/admin/expenses');
export const exportExpensesCSV = () => API.get('/api/admin/export/csv', { responseType: 'blob' });
export const getUsers = () => API.get('/api/admin/users'); // future endpoints

export const getPendingExpenses = (managerId) =>
  API.get(`/api/manager/${managerId}/pending-expenses`);

export const decideExpense = (managerId, expenseId, decision, comments) =>
  API.post(`/api/manager/${managerId}/expenses/${expenseId}/decision`, {
    decision,
    comments,
  });

export default API;