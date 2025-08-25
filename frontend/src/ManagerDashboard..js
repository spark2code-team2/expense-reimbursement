import React, { useState } from "react";
import { getPendingExpenses, decideExpense } from './service/api';


function ManagerDashboard() {
  const [expenses, setExpenses] = useState([
    {
      id: 8,
      userId: 6,
      managerId: 2,
      title: "expense for Food",
      category: "Food",
      amount: 15,
      currency: "USD",
      description: "Lunch meeting with client",
      status: "PENDING",
      receiptPath: "uploads/1756106809838.png",
      dateIncurred: "2025-09-15",
      cratedAt: "2025-08-25T11:26:49.922045",
    },
  ]);

  const handleDescriptionChange = (id, value) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, description: value } : expense
      )
    );
  };

  const handleStatusChange = (id, value) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, status: value } : expense
      )
    );
  };

  const handleSave = (id) => {
    const expense = expenses.find((e) => e.id === id);
    console.log("Saved expense:", expense);
    alert(
      `Saved:
      Description="${expense.description}",
      Status="${expense.status}",
      Receipt="${expense.receiptPath}"`
    );
  };

  return (
    <>
      <header className="navbar">
        <h1 className="logo">Manager Dashboard</h1>
        <nav>
          <a href="#">Menu</a>
          <a href="#">Logout</a>
        </nav>
      </header>

<style jsx>{`
  .main-content {
    padding: 1rem;
    overflow-x: auto; /* allows horizontal scroll if table is too wide */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed; /* makes columns fit evenly */
  }

  th, td {
    padding: 0.5rem;
    text-align: center;
    word-wrap: break-word; /* wrap long text */
  }

  input, select {
    width: 100%; /* fit in the cell */
    box-sizing: border-box;
  }

  .table-container {
    overflow-x: auto; /* ensures table fits inside container */
  }
`}</style>

     <main className="main-content manager-dashboard">
        <div className="card">
   <h2>The Manager Dashboard</h2>
<div className="table-container">
</div>
          <table>
            <thead>
              <tr>
                <th>Expense ID</th>
                <th>User ID</th>
                <th>Manager ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Date Incurred</th>
                <th>Created At</th>
                <th>Receipt</th>
                <th>Status</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.id}</td>
                  <td>{expense.userId}</td>
                  <td>{expense.managerId}</td>
                  <td>{expense.title}</td>
                  <td>{expense.category}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.currency}</td>
                  <td>{expense.dateIncurred}</td>
                  <td>{expense.cratedAt}</td>
                  <td>{expense.receiptPath && <span>{expense.receiptPath}</span>}</td>
                  <td>
                    <select
                      value={expense.status}
                      onChange={(e) =>
                        handleStatusChange(expense.id, e.target.value)
                      }
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="REGISTERED">REGISTERED</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={expense.description}
                      placeholder="Write description..."
                      onChange={(e) =>
                        handleDescriptionChange(expense.id, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(expense.id)}>Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default ManagerDashboard;
