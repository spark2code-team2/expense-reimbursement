import React, { useState } from "react";

function ManagerDashboard() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      category: "MEAL",
      amount: 3.5,
      date: "2025-08-06",
      status: "Pending",
      note: "",
      receipt: "",
    },
     {
    id: 2,
    category: "TRAVEL",
    amount: 12.75,
    date: "2025-08-15",
    status: "Pending",
    note: "",
    receipt: "",
  },
  ]);

  const handleNoteChange = (id, value) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, note: value } : expense
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

  const handleReceiptChange = (id, file) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, receipt: file.name } : expense
      )
    );
  };

  const handleSave = (id) => {
    const expense = expenses.find((e) => e.id === id);
    console.log("Saved expense:", expense);
    alert(`Saved: Note="${expense.note}", Status="${expense.status}", Receipt="${expense.receipt}"`);
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

      <main className="main-content">
        <div className="card">
          <h2>The Manager Dashboard</h2>
          <table>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Receipt</th>
                <th>Status</th>
                <th>Note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.id}</td>
                  <td>{expense.category}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>
                  <td>
                    <input
                      type="file"
                      onChange={(e) =>
                        handleReceiptChange(expense.id, e.target.files[0])
                      }
                    />
                    {expense.receipt && <span>{expense.receipt}</span>}
                  </td>
                  <td>
                    <select
                      value={expense.status}
                      onChange={(e) =>
                        handleStatusChange(expense.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Registered">Registered</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={expense.note}
                      placeholder="Write note..."
                      onChange={(e) =>
                        handleNoteChange(expense.id, e.target.value)
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
