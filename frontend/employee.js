import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [currentSection, setCurrentSection] = useState("menu");

  // Expense states
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [receipt, setReceipt] = useState(null);

  const showSection = (section) => setCurrentSection(section);

  const addExpense = () => {
    if (!category || !amount || !date) {
      alert("Please fill all required fields.");
      return;
    }
    if (receipt && receipt.size > 5 * 1024 * 1024) {
      alert("Receipt file is too large (max 5MB).");
      return;
    }

    setExpenses([
      ...expenses,
      {
        category,
        amount,
        date,
        status: "Pending",
        note: description,
        receiptName: receipt ? receipt.name : "",
      },
    ]);

    alert("Expense added successfully!");
    showSection("viewExpenses");

    // Reset form
    setCategory("");
    setAmount("");
    setDate("");
    setDescription("");
    setReceipt(null);
  };

  return (
    <div>
      <header>
        <h1>Employee Dashboard - Expense Tracker</h1>
        <nav>
          <a onClick={() => showSection("menu")}>Menu</a>
        </nav>
      </header>

      {/* Menu */}
      {currentSection === "menu" && (
        <div className="container">
          <h2>Choose an option</h2>
          <div className="menu">
            <button onClick={() => showSection("addExpense")}>Add an Expense</button>
            <button onClick={() => showSection("viewExpenses")}>View Submitted Expenses</button>
          </div>
        </div>
      )}

      {/* Add Expense */}
      {currentSection === "addExpense" && (
        <div className="container">
          <h2>Add Expense</h2>
          <input
            type="text"
            placeholder="Category *"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount *"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="date"
            value={date}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="file" onChange={(e) => setReceipt(e.target.files[0])} />
          <button onClick={addExpense}>Submit Expense</button>
        </div>
      )}

      {/* View Expenses */}
      {currentSection === "viewExpenses" && (
        <div className="container">
          <h2>Submitted Expenses</h2>
          {expenses.length === 0 ? (
            <p>No expenses submitted yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Note</th>
                  <th>Receipt</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{exp.category}</td>
                    <td>{exp.amount}</td>
                    <td>{exp.date}</td>
                    <td>{exp.status}</td>
                    <td>{exp.note}</td>
                    <td>{exp.receiptName || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
