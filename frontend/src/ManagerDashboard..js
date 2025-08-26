// ManagerDashboard.js
import React, { useState, useEffect } from "react";
// import { getPendingExpenses, decideExpense } from "./apiService";

function ManagerDashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const managerId = 2; // Manager ID - change as needed

  // Load expenses from API
  const loadExpenses = async () => {
    setLoading(true);
    setError("");
    
    try {
      // TODO: Replace with actual API call when apiService is ready
      // const data = await getPendingExpenses(managerId);
      // setExpenses(data);
      
      // For now, use test data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      setExpenses([
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
        {
          id: 9,
          userId: 7,
          managerId: 2,
          title: "Office Supplies",
          category: "Office",
          amount: 50,
          currency: "USD",
          description: "Stationery and supplies",
          status: "PENDING",
          receiptPath: null,
          dateIncurred: "2025-01-20",
          cratedAt: "2025-01-20T14:30:00",
        }
      ]);
    } catch (err) {
      setError(`Failed to load data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadExpenses();
  }, []);

  // Handle description change
  const handleDescriptionChange = (id, value) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, description: value } : expense
      )
    );
  };

  // Handle status change
  const handleStatusChange = (id, value) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, status: value } : expense
      )
    );
  };

  // Save data and send to API
  const handleSave = async (id) => {
    const expense = expenses.find((e) => e.id === id);
    setLoading(true);
    
    try {
      // TODO: Replace with actual API call when apiService is ready
      // await decideExpense(managerId, expense.id, expense.status, expense.description);
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      alert(`✅ Expense saved successfully!
Description: ${expense.description}
Status: ${expense.status}
Receipt: ${expense.receiptPath || "None"}`);
      
      // Refresh data
      await loadExpenses();
      
    } catch (err) {
      alert(`❌ Save error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="navbar">
        <h1 className="logo">Manager Dashboard</h1>
        <nav>
          <a href="#">Menu</a>
          <a href="#">Logout</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content manager-dashboard">
        <div className="card">
          {/* Header with refresh button */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}>
            <h2>Manager Dashboard</h2>
            <button
              onClick={loadExpenses}
              disabled={loading}
              style={{
                backgroundColor: "#4cb0af",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? "⏳ Loading..." : "🔄 Refresh"}
            </button>
          </div>

          {/* Error display */}
          {error && (
            <div style={{
              backgroundColor: "#fee2e2",
              border: "1px solid #fca5a5",
              color: "#dc2626",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "20px"
            }}>
              ⚠️ {error}
              <div style={{ fontSize: "0.85em", marginTop: "5px", color: "#7f1d1d" }}>
                Using test data for demonstration
              </div>
            </div>
          )}

          {/* Table */}
          <div className="table-container">
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
                    <td>${expense.amount}</td>
                    <td>{expense.currency}</td>
                    <td>{expense.dateIncurred}</td>
                    <td>{expense.cratedAt}</td>
                    <td>
                      {expense.receiptPath ? (
                        <a href={expense.receiptPath} target="_blank" rel="noopener noreferrer">
                          View Receipt
                        </a>
                      ) : (
                        <span style={{ color: "#666" }}>None</span>
                      )}
                    </td>
                    <td>
                      <select
                        value={expense.status}
                        onChange={(e) => handleStatusChange(expense.id, e.target.value)}
                        disabled={loading}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={expense.description}
                        placeholder="Enter description..."
                        onChange={(e) => handleDescriptionChange(expense.id, e.target.value)}
                        disabled={loading}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleSave(expense.id)}
                        disabled={loading}
                        style={{
                          backgroundColor: loading ? "#ccc" : "#4cb0af",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: loading ? "not-allowed" : "pointer"
                        }}
                      >
                        {loading ? "⏳" : "Save"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No data message */}
          {expenses.length === 0 && !loading && (
            <div style={{
              textAlign: "center",
              padding: "40px",
              color: "#666",
              fontSize: "18px"
            }}>
              No pending expenses found
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default ManagerDashboard;
