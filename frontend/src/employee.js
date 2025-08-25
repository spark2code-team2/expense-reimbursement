import React, { useState, useEffect } from "react";
import "./App.css";
import { addExpense, getExpenses } from "./api";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [currentSection, setCurrentSection] = useState("menu");

  // Expense form states
  const [title, setTitle] = useState(""); 
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD"); 
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [receipt, setReceipt] = useState(null);

  // Navigation between sections
  const showSection = (section) => setCurrentSection(section);

  // Handle Add Expense (using API)
  const handleAddExpense = async () => {
    if (!title || !category || !amount || !date || !description) {
      alert("Please fill all required fields.");
      return;
    }

    if (receipt && receipt.size > 5 * 1024 * 1024) {
      alert("Receipt file is too large (max 5MB).");
      return;
    }

    try {
      const newExpense = await addExpense({
        title,
        category,
        amount,
        currency,
        date,
        description,
        receipt,
      });

      setExpenses([...expenses, newExpense]);
      alert("Expense submitted successfully!");
      showSection("viewExpenses");

      // Reset form
      setTitle("");
      setCategory("");
      setAmount("");
      setDate("");
      setDescription("");
      setReceipt(null);
    } catch (error) {
      alert("Error submitting expense: " + error.message);
    }
  };

  //  Load expenses when app starts
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadData();
  }, []);

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
            placeholder="Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="OMR">OMR</option>
          </select>
          <input
            type="date"
            value={date}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
          />
          <textarea
            placeholder="Description *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input type="file" onChange={(e) => setReceipt(e.target.files[0])} />
          <button onClick={handleAddExpense}>Submit Expense</button>
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
                  <th>Title</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Receipt</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{exp.title}</td>
                    <td>{exp.category}</td>
                    <td>{exp.amount}</td>
                    <td>{exp.currency}</td>
                    <td>{exp.date}</td>
                    <td>{exp.description}</td>
                    <td>{exp.receiptPath ? exp.receiptPath : "-"}</td>
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
